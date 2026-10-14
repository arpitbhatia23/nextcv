import { User } from "@/modules/auth";
import { SharedResume } from "../model/shared-resume";
import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { redis } from "@/shared/utils/Redis";
import { NextResponse } from "next/server";

export const getSharedResumeStatus = async ({ req, resumeId }) => {
  let targetResumeId = resumeId;

  if (req) {
    try {
      const url = new URL(req.url, "http://localhost");
      const paramId = url.searchParams.get("resumeId") || url.searchParams.get("id");
      if (paramId) targetResumeId = paramId;
    } catch {
      // ignore URL parsing errors
    }
  }

  if (!targetResumeId) {
    throw new apiError(400, "resumeId is required");
  }

  const session = await requiredAuth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new apiError(401, "Unauthorized");
  }

  const cacheKey = `sharedresume:status:${userId}:${targetResumeId}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(
        new apiResponse(200, "Shared resume status fetched successfully", JSON.parse(cached)),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Redis get error for shared resume status:", error);
  }

  await dbConnect();

  // Validate user ownership of the resume
  const userOwnsResume = await User.exists({ _id: userId, resume: targetResumeId });
  if (!userOwnsResume) {
    throw new apiError(403, "You do not have permission to access this resume");
  }

  const record = await SharedResume.findOne({ userId, resumeId: targetResumeId }).lean();

  try {
    await redis.set(cacheKey, JSON.stringify(record || null), "EX", 300);
  } catch (error) {
    console.error("Redis set error for shared resume status:", error);
  }

  return NextResponse.json(
    new apiResponse(200, "Shared resume status fetched successfully", record || null),
    { status: 200 }
  );
};

export default getSharedResumeStatus;
