import { apiError, apiResponse, dbConnect, requiredAuth } from "@/shared";
import { portfolio } from "../model/portfolio";
import { NextResponse } from "next/server";

export const deletePortfolio = async ({ req, resumeId }) => {
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

  const deleted = await portfolio.findOneAndDelete({ userId, resumeId: targetResumeId });
  if (!deleted) {
    throw new apiError(404, "Portfolio not found");
  }

  return NextResponse.json(
    new apiResponse(200, "Portfolio deleted successfully", { deleted: true }),
    { status: 200 }
  );
};

export default deletePortfolio;
