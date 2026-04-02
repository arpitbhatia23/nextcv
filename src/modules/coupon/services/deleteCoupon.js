import { apiError, apiResponse, requiredAuth } from "@/shared";
import { NextResponse } from "next/server";
import Coupon from "../models/coupon";

export const deleteCoupon = async ({ id }) => {
  const session = await requiredAuth();
  if (session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized acess");
  }
  await Coupon.findByIdAndDelete(id);

  return NextResponse.json(new apiResponse(200, "Coupon deleted successfully"), { status: 200 });
};
