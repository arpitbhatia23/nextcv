import Coupon from "@/models/coupon";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const handler = async (req) => {
  let { couponCode } = await req.json();
  console.log(couponCode);
  dbConnect();
  if (!couponCode) {
    throw new apiError(400, "coupon code is required");
  }

  const coupon = await Coupon.findOne({ couponCode: couponCode });

  if (!coupon) {
    throw new apiError(404, "coupon not found");
  }

  const now = Date.now();
  const isExpiry = now > new Date(coupon.expiry).getTime();
  if (isExpiry) {
    throw new apiError(400, "coupon code is expiry");
  }

  if (!coupon.isActive) {
    throw new apiError(400, "coupon code deactivate");
  }
  return NextResponse.json(
    new apiResponse(200, "coupon fetch sucessfully ", coupon),
    { status: 200 }
  );
};

export const POST = asyncHandler(handler);
