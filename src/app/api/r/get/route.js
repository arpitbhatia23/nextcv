import { getSharedResumeBySlug } from "@/modules/shared-resume/services/getSharedResumeBySlug";
import { apiError, apiResponse, asyncHandler } from "@/shared";
import { NextResponse } from "next/server";

const handler = async req => {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  if (!slug) {
    throw new apiError(400, "slug parameter is required");
  }

  const result = await getSharedResumeBySlug(slug);
  if (!result) {
    throw new apiError(404, "Shared resume not found or is private");
  }

  return NextResponse.json(new apiResponse(200, "Shared resume fetched successfully", result), {
    status: 200,
  });
};

export const GET = asyncHandler(handler);
