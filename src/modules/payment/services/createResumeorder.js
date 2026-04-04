import Coupon from "@/modules/coupon/models/coupon";
import Resume from "@/modules/resume/models/resume.model";
import { createResume } from "@/modules/resume/services/createResume";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import { apiError, apiResponse, requiredAuth } from "@/shared";
import { order } from "./order";
import { NextResponse } from "next/server";
import { createPayment } from "../phonepe/service";

export const createResuemOrder = async ({ reqData }) => {
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
  console.log(isDraft);
  if (isDraft) {
    if (!isDraft) throw new apiError(400, "Draft id is required");
    const resume = await Resume.findById(isDraft);
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

  const templateData = getTemplateByName(ResumeType);
  if (!templateData) throw new apiError(400, "Invalid Resume Type");

  let originalAmount = templateData.priceDiscounted || 0;

  // 3️⃣ Apply coupon if exists
  let finalAmount = originalAmount;
  let discountAmount;
  if (couponCode) {
    const coupon = await Coupon.findOne({ couponCode: couponCode });
    if (coupon) {
      if (coupon.type === "percentage") {
        discountAmount = (originalAmount * coupon.discount) / 100;
        finalAmount = originalAmount * (1 - coupon.discount / 100);
      } else if (coupon.type === "amount") {
        finalAmount = originalAmount - coupon.discount;
        discountAmount = (originalAmount * coupon.discount) / 100;
      }
    }
  }

  // 4️⃣ Ensure amount is not negative and round it
  finalAmount = Math.max(Math.round(finalAmount) * 100, 0);

  // 5️⃣ Create order
  const res = await order({
    amount: finalAmount,
    resumeId,
    discountAmount,
    couponCode,
    userId,
  });

  return NextResponse.json(new apiResponse(200, "Order initiated", res));
};
