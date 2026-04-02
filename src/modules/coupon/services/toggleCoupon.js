import { apiError, apiResponse, requiredAuth } from "@/shared";
import Coupon from "../models/coupon";
import { NextResponse } from "next/server";

export const toogleCoupon = async ({ isActive, id }) => {
  const session = await requiredAuth();

  if (session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized acess");
  }

  if (!id && !isActive) {
    throw new apiError(400, "id and isactive is required");
  }

  const data = await Coupon.findByIdAndUpdate(id, { $set: { isActive: isActive } }, { new: true });

  return NextResponse.json(new apiResponse(200, "Coupon status updated successfully", data));
};
