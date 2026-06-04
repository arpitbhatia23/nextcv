import { ResumeGenerator } from "@/modules/ai/utils/resumeDescriptionGenereation";
import { apiError, apiResponse } from "@/shared";
import { NextResponse } from "next/server";

export const aiDescriptionGenerator = async ({ type, data }) => {
  const generator = ResumeGenerator[type];

  if (!generator) {
    throw new apiError(400, "Invalid AI generation type");
  }

  const jobDescription = data?.jobDescription || "";
  const result = await generator(data, jobDescription);

  if (!result || result.trim().length <= 0) {
    throw new apiError(500, "Something went wrong while generating content");
  }

  return NextResponse.json(new apiResponse(200, "Response generated successfully", result), {
    status: 200,
  });
};
