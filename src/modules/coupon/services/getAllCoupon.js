import { apiError, apiResponse, requiredAuth } from "@/shared";
import Coupon from "../models/coupon";
import { NextResponse } from "next/server";

export const getAllCoupon = async () => {
  const session = await requiredAuth();
  if (session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized access");
  }
  const coupons = await Coupon.find();
  if (!coupons || coupons.length === 0) {
    throw new apiError(400, " coupons not found");
  }
  return NextResponse.json(new apiResponse(200, "Coupons fetched successfully", coupons), {
    status: 200,
  });
};
