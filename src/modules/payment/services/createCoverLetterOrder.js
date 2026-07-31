import Coupon from "@/modules/coupon/models/coupon";
import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";
import { order } from "@/modules/cover-letter/services/order";
import { apiResponse, requiredAuth } from "@/shared";
import { ApiError } from "@google/genai";
import { NextResponse } from "next/server";

export const createCoverLetterOrder = async data => {
  const session = await requiredAuth();
  const userId = session.user.id;

  const { couponCode, productType, ...coverLetterData } = data;

  let coverletter;

  if (!data.draftId) {
    coverletter = await CoverLetter.create({
      ...coverLetterData,
      userId,
    });

    if (!coverletter) {
      throw new ApiError(500, "Something went wrong while creating cover letter");
    }

    console.log("created cover letter");
  } else {
    coverletter = await CoverLetter.findById(data.draftId);

    if (!coverletter) {
      throw new ApiError(404, "Cover letter draft not found");
    }

    console.log("found draft cover letter");
  }

  let originalAmount = 100;
  let discount = 0;
  let finalAmount = originalAmount;
  let discountAmount;
  if (couponCode) {
    const coupon = await Coupon.findOne({ couponCode: couponCode });
    if (coupon) {
      if (coupon.type === "percentage") {
        discountAmount = (originalAmount * coupon.discount) / 100;
        finalAmount = originalAmount * (1 - coupon.discount / 100);
        discount = (originalAmount * coupon.discount) / 100;
      } else if (coupon.type === "amount") {
        finalAmount = originalAmount - coupon.discount;
        discount = coupon.discount;
      }
    }
  }

  finalAmount = Math.max(Math.round(finalAmount) * 100, 0);

  const res = await order({
    userId,
    amount: finalAmount,
    discountAmount,
    coverLetterId: coverletter._id,
    couponCode,
    discountAmount: discount,
    productType: productType,
  });

  return NextResponse.json(new apiResponse(200, "Order initiated", res));
};
