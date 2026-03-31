import Resume from "@/modules/resume/models/resume.model";
import User from "@/models/user.model";
import apiError from "@/shared/utils/apiError";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { NextResponse } from "next/server";
import { apiResponse } from "@/shared/utils/apiResponse";
import dbConnect from "@/shared/utils/dbConnect";
import { requiredAuth } from "@/shared";
import { saveResumeAsDraft } from "@/modules/resume";

const handler = async req => {
  // ✅ Connect DB once
  await dbConnect();

  const data = await req.json();
  // ✅ Session check
  const session = await requiredAuth();

  const userId = session.user._id;
  await saveResumeAsDraft({ data, userId });
  return NextResponse.json(new apiResponse(201, "Draft generated successfully"));
};

export const POST = asyncHandler(handler);
