import Coupon from "@/models/coupon";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { NextResponse } from "next/server";
const handler = async () => {
  console.log("dflkdfndkfldjfldskj");
  const coupons = await Coupon.find();
  if (!coupons || coupons.length === 0) {
    throw new apiError(400, " coupons not found");
  }
  return NextResponse.json(
    new apiResponse(200, "Coupons fetched successfully", coupons),
    { status: 200 },
  );
};
export const GET = asyncHandler(handler);
