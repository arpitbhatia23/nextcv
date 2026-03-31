import { asyncHandler } from "@/shared/utils/asyncHandler";
import apiError from "@/shared/utils/apiError";
import { NextResponse } from "next/server";
import { apiResponse } from "@/shared/utils/apiResponse";
import Resume from "@/modules/resume/models/resume.model";
import dbConnect from "@/shared/utils/dbConnect";
import { createResume } from "@/modules/resume/services/createResume";
import { requiredAuth } from "@/shared";
import { order } from "@/modules/payment/services/order";

const handler = async req => {
  await dbConnect();
  const reqData = await req.json();

  const {
    amount,
    name,
    phone,
    email,
    address,
    linkedin,
    github,
    portfolio,
    jobRole,
    summary,
    experience = [],
    skills = [],
    education = [],
    projects = [],
    ResumeType,
    isDraft = false,
    draftId,
    certificates,
    couponCode,
    discountAmount,
  } = reqData;
  const session = await requiredAuth();
  const userId = session.user._id;
  let resumeId = null;
  if (isDraft) {
    if (!draftId) {
      throw new apiError(400, "Draft id is required");
    }
    const resume = await Resume.findById(draftId);
    if (!resume) {
      throw new apiError(404, "Draft not found");
    }
    resumeId = resume._id;
  } else {
    resumeId = await createResume({
      userId,
      ResumeType,
      phone,
      name,
      email,
      address,
      linkedin,
      github,
      skills,
      portfolio,
      summary,
      education,
      experience,
      projects,
      jobRole,
      certificates,
    });
  }
  const res = await order({
    amount,
    resumeId,
    couponCode,
    discountAmount,
    userId,
  });
  return NextResponse.json(new apiResponse(200, "order initate", res));
};

export const POST = asyncHandler(handler);
