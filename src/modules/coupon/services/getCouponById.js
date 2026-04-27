import { apiError, apiResponse, requiredAuth } from "@/shared";
import Coupon from "../models/coupon";
import Payment from "@/modules/payment/model/payment.model";
import { NextResponse } from "next/server";

export const getCouponById = async ({ couponCode }) => {
  if (!couponCode) {
    throw new apiError(400, "coupon code is required");
  }
  const session = await requiredAuth();
  const normalizeCode = couponCode?.toLowerCase();

  const userId = session?.user?.id;
  const coupon = await Coupon.findOne({
    couponCode: normalizeCode,
  });

  if (!coupon) {
    throw new apiError(404, "coupon not found");
  }
  if (normalizeCode === "first20") {
    const isAlreadyUsed = await Payment.findOne({
      userId: userId,
      couponCode: normalizeCode,
    });
    if (isAlreadyUsed) {
      throw new apiError(401, "You have already used this coupon");
    }
  }

  const now = Date.now();
  const isExpiry = now > new Date(coupon.expiry).getTime();
  if (isExpiry) {
    throw new apiError(400, "coupon code is expiry");
  }

  if (!coupon.isActive) {
    throw new apiError(400, "coupon code deactivate");
  }
  return NextResponse.json(new apiResponse(200, "coupon fetch sucessfully ", coupon), {
    status: 200,
  });
};
