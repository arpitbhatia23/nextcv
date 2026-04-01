import { asyncHandler } from "@/shared/utils/asyncHandler";
import apiError from "@/shared/utils/apiError";
import { NextResponse } from "next/server";
import { apiResponse } from "@/shared/utils/apiResponse";
import Resume from "@/modules/resume/models/resume.model";
import dbConnect from "@/shared/utils/dbConnect";
import { createResume } from "@/modules/resume/services/createResume";
import { requiredAuth } from "@/shared";
import { order } from "@/modules/payment";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import Coupon from "@/models/coupon";

const handler = async req => {
  await dbConnect();
  const reqData = await req.json();

  const {
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
  } = reqData;

  const session = await requiredAuth();
  const userId = session.user._id;

  // 1️⃣ Create or get draft resume
  let resumeId = null;
  if (isDraft) {
    if (!draftId) throw new apiError(400, "Draft id is required");
    const resume = await Resume.findById(draftId);
    if (!resume) throw new apiError(404, "Draft not found");
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

  // 2️⃣ Get template price
  const templateData = getTemplateByName(ResumeType);
  if (!templateData) throw new apiError(400, "Invalid Resume Type");

  let originalAmount = templateData.priceDiscounted || 0;

  // 3️⃣ Apply coupon if exists
  let finalAmount = originalAmount;
  if (couponCode) {
    const coupon = await Coupon.findOne({ couponCode: couponCode });
    if (coupon) {
      if (coupon.type === "percentage") {
        finalAmount = originalAmount * (1 - coupon.discount / 100);
      } else if (coupon.type === "amount") {
        finalAmount = originalAmount - coupon.discount;
      }
    }
  }

  // 4️⃣ Ensure amount is not negative and round it
  finalAmount = Math.max(Math.round(finalAmount), 0);

  // 5️⃣ Create order
  const res = await order({
    amount: finalAmount,
    resumeId,
    couponCode,
    userId,
  });

  return NextResponse.json(new apiResponse(200, "Order initiated", res));
};

export const POST = asyncHandler(handler);
