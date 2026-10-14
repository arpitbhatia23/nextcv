import { User } from "@/modules/auth";
import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { redis } from "@/shared/utils/Redis";
import { SharedResume } from "../model/shared-resume";
import { NextResponse } from "next/server";

export const toggleSharedResume = async ({ req, resumeId, isPublic }) => {
  let targetResumeId = resumeId;
  let targetIsPublic = isPublic;

  if (req) {
    try {
      const body = await req.json();
      if (body.resumeId) targetResumeId = body.resumeId;
      if (typeof body.isPublic === "boolean") targetIsPublic = body.isPublic;
    } catch {
      // ignore body parsing errors
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
    throw new apiError(403, "You do not have permission to modify this resume");
  }

  const record = await SharedResume.findOne({ userId, resumeId: targetResumeId });
  if (!record) {
    throw new apiError(404, "Shared resume not found");
  }

  record.isPublic = typeof targetIsPublic === "boolean" ? targetIsPublic : !record.isPublic;
  await record.save();

  // Invalidate Redis cache
  try {
    await redis.del(`sharedresume:slug:${record.slug.toLowerCase().trim()}`);
    await redis.del(`sharedresume:status:${userId}:${targetResumeId}`);
  } catch (err) {
    console.error("Redis cache invalidation error in toggleSharedResume:", err);
  }

  return NextResponse.json(
    new apiResponse(
      200,
      record.isPublic
        ? "Resume sharing is now active and public"
        : "Resume sharing is paused and private",
      record
    ),
    { status: 200 }
  );
};

export default toggleSharedResume;
