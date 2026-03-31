import Coupon from "@/models/coupon";
import apiError from "@/shared/utils/apiError";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../modules/auth/services/options";
const handler = async req => {
  let { couponCode, discount, expiry, type } = await req.json();

  if (!couponCode && !discount && !expiry && !type) {
    throw new apiError(400, "Missing required fields: couponCode, discount, or expiry");
  }
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized acess");
  }
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

export const POST = asyncHandler(handler);
