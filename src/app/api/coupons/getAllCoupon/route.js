import Coupon from "@/models/coupon";
import apiError from "@/shared/utils/apiError";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { getServerSession } from "next-auth";
import authOptions from "@/modules/auth/services/options";
import { NextResponse } from "next/server";
const handler = async () => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session?.user.role !== "admin") {
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
export const GET = asyncHandler(handler);
