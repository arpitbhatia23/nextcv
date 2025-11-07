import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { ResumeGenerator } from "@/utils/resumeDescriptionGenereation";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function handler(req) {
  const { type, data } = await req.json();

  const description = ResumeGenerator[type];

  const bullets = description(data);
  if (bullets.length <= 0) {
    throw new apiError(500, "something went wrong while gerating bulets");
  }
  return NextResponse.json(
    new apiResponse(200, "response gen sucessfully ", bullets),
    { status: 200 }
  );
}

export const POST = asyncHandler(handler);
