import { ResumeGenerator } from "@/modules/ai/utils/resumeDescriptionGenereation";
import { apiError, apiResponse } from "@/shared";
import { NextResponse } from "next/server";

export const aiDescriptionGenerator = async ({ type, data }) => {
  const description = ResumeGenerator[type];

  const bullets = await description(data);
  if (bullets.length <= 0) {
    throw new apiError(500, "something went wrong while gerating bulets");
  }

  return NextResponse.json(new apiResponse(200, "response gen sucessfully ", bullets), {
    status: 200,
  });
};
