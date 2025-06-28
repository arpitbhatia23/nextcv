import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";

const { default: authOptions } = require("@/app/api/auth/options");
const { default: Resume } = require("@/models/resume.model");
const { default: apiError } = require("@/utils/apiError");
const { apiResponse } = require("@/utils/apiResponse");
const { getServerSession } = require("next-auth");
const { NextResponse } = require("next/server");

const handler = async (req, { params }) => {
  const { id } = await params;
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session && !session.user) {
    throw new apiError(401, "unauthorized user");
  }

  const resumeData = await Resume.findById(id);

  if (!resumeData) {
    throw new apiError(404, "resume not found");
  }
  return NextResponse.json(
    new apiResponse(200, "resume found sucessfull", resumeData),
    { status: 200 }
  );
};

export const GET = asyncHandler(handler);
