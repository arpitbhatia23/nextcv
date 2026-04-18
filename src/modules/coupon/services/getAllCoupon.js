import { apiError, apiResponse, requiredAuth } from "@/shared";
import Coupon from "../models/coupon";
import { NextResponse } from "next/server";
import { redis } from "@/shared/utils/Redis";

export const getAllCoupon = async () => {
  const session = await requiredAuth();
  if (session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized access");
  }
  const cachedKey = `allcoupon`;
  const cached = await redis.get(cachedKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const coupons = await Coupon.find();
  if (!coupons || coupons.length === 0) {
    throw new apiError(400, " coupons not found");
  }
  await redis.set(cachedKey, JSON.stringify(coupons), "EX", 1200);
  return NextResponse.json(new apiResponse(200, "Coupons fetched successfully", coupons), {
    status: 200,
  });
};
