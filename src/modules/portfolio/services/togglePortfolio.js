import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { portfolio } from "../model/portfolio";
import { NextResponse } from "next/server";

export const togglePortfolio = async ({ req, resumeId, isPublic }) => {
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

  const record = await portfolio.findOne({ userId, resumeId: targetResumeId });
  if (!record) {
    throw new apiError(404, "Portfolio not found for this resume");
  }

  record.isPublic = typeof targetIsPublic === "boolean" ? targetIsPublic : !record.isPublic;
  await record.save();

  return NextResponse.json(
    new apiResponse(
      200,
      record.isPublic ? "Portfolio is now live and public" : "Portfolio is paused and private",
      record
    ),
    { status: 200 }
  );
};

export default togglePortfolio;
