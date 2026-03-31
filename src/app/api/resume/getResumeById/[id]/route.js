import { requiredAuth } from "@/shared";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { apiResponse } from "@/shared/utils/apiResponse";
import { NextResponse } from "next/server";
import { getResumeById } from "@/modules/resume";

const handler = async (req, { params }) => {
  const { id } = await params;
  await dbConnect();
  await requiredAuth();
  const resumeData = await getResumeById({ id });
  return NextResponse.json(new apiResponse(200, "resume found sucessfull", resumeData), {
    status: 200,
  });
};

export const GET = asyncHandler(handler);
