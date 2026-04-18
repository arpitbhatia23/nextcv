import { requiredAuth } from "@/shared";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { apiResponse } from "@/shared/utils/apiResponse";
import { NextResponse } from "next/server";
import { getResumeById } from "@/modules/resume";

const handler = async (req, { params }) => {
  const { id } = await params;
  console.time("auth");
  await requiredAuth();
  console.timeEnd("auth");
  console.time("function");
  const resumeData = await getResumeById({ id });
  console.timeEnd("function");
  return NextResponse.json(new apiResponse(200, "resume found sucessfull", resumeData), {
    status: 200,
  });
};

export const GET = asyncHandler(handler);
