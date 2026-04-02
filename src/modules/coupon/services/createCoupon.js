import Coupon from "@/modules/coupon/models/coupon";
import { apiError, apiResponse } from "@/shared";
import { NextResponse } from "next/server";

export const createCoupon = async ({ couponCode, discount, expiry, type }) => {
  couponCode = couponCode.trim();
  const isCouponExist = await Coupon.findOne({ couponCode: couponCode });

  if (isCouponExist) {
    throw new apiError(400, "Coupon already exists");
  }

  const coupon = await Coupon.create({
    couponCode,
    discount,
    expiry,
    type,
  });

  if (!coupon) {
    throw new apiError(500, "Failed to create coupon");
  }
  return NextResponse.json(new apiResponse(200, "coupon created sucessfully ", coupon), {
    status: 200,
  });
};
