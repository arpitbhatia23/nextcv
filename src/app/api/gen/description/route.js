import apiError from "@/shared/utils/apiError";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { ResumeGenerator } from "@/shared/utils/resumeDescriptionGenereation";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function handler(req) {
  const { type, data } = await req.json();

  const description = ResumeGenerator[type];

  const bullets = await description(data);
  if (bullets.length <= 0) {
    throw new apiError(500, "something went wrong while gerating bulets");
  }

  return NextResponse.json(new apiResponse(200, "response gen sucessfully ", bullets), {
    status: 200,
  });
}

export const POST = asyncHandler(handler);
