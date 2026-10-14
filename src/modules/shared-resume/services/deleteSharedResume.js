import { User } from "@/modules/auth";
import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { redis } from "@/shared/utils/Redis";
import { SharedResume } from "../model/shared-resume";
import { NextResponse } from "next/server";

export const deleteSharedResume = async ({ req, resumeId }) => {
  let targetResumeId = resumeId;

  if (req) {
    try {
      const url = new URL(req.url, "http://localhost");
      const paramId = url.searchParams.get("resumeId") || url.searchParams.get("id");
      if (paramId) targetResumeId = paramId;
      if (!targetResumeId) {
        const body = await req.json();
        if (body.resumeId) targetResumeId = body.resumeId;
      }
    } catch {
      // ignore
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

  await dbConnect();

  const userOwnsResume = await User.exists({ _id: userId, resume: targetResumeId });
  if (!userOwnsResume) {
    throw new apiError(403, "You do not have permission to delete this resume link");
  }

  const deleted = await SharedResume.findOneAndDelete({ userId, resumeId: targetResumeId });
  if (!deleted) {
    throw new apiError(404, "Shared resume not found");
  }

  // Invalidate Redis cache
  try {
    if (deleted.slug) {
      await redis.del(`sharedresume:slug:${deleted.slug.toLowerCase().trim()}`);
    }
    await redis.del(`sharedresume:status:${userId}:${targetResumeId}`);
  } catch (err) {
    console.error("Redis cache invalidation error in deleteSharedResume:", err);
  }

  return NextResponse.json(
    new apiResponse(200, "Shared resume link deleted successfully", { deleted: true }),
    { status: 200 }
  );
};

export default deleteSharedResume;
