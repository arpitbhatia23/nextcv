import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
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

  const deleted = await SharedResume.findOneAndDelete({ userId, resumeId: targetResumeId });
  if (!deleted) {
    throw new apiError(404, "Shared resume not found");
  }

  return NextResponse.json(
    new apiResponse(200, "Shared resume link deleted successfully", { deleted: true }),
    { status: 200 }
  );
};

export default deleteSharedResume;
