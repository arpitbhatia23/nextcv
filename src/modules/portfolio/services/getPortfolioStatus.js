import { User } from "@/modules/auth";
import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { redis } from "@/shared/utils/Redis";
import { portfolio } from "../model/portfolio";
import { NextResponse } from "next/server";

export const getPortfolioStatus = async ({ req, resumeId }) => {
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

  const cacheKey = `portfolio:status:${userId}:${targetResumeId}`;
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json(
        new apiResponse(200, "Portfolio status fetched successfully", JSON.parse(cached)),
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Redis get error for portfolio status:", error);
  }

  await dbConnect();

  // Validate user ownership of the resume
  const userOwnsResume = await User.exists({ _id: userId, resume: targetResumeId });
  if (!userOwnsResume) {
    throw new apiError(403, "You do not have permission to access this resume's portfolio");
  }

  const record = await portfolio.findOne({ userId, resumeId: targetResumeId }).lean();

  try {
    await redis.set(cacheKey, JSON.stringify(record || null), "EX", 300);
  } catch (error) {
    console.error("Redis set error for portfolio status:", error);
  }

  return NextResponse.json(
    new apiResponse(200, "Portfolio status fetched successfully", record || null),
    { status: 200 }
  );
};

export default getPortfolioStatus;

