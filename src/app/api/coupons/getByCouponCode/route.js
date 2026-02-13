import Coupon from "@/models/coupon";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/options";
import Payment from "@/models/payment.model";
const handler = async (req) => {
  let { couponCode } = await req.json();
  await dbConnect();
  if (!couponCode) {
    throw new apiError(400, "coupon code is required");
  }
  const session = await getServerSession(authOptions);

  const normalizeCode = couponCode?.toLowerCase();
  if (!session) {
    throw new apiError(401, "unauthorized");
  }
  const userId = session?.user?._id;
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
  return NextResponse.json(
    new apiResponse(200, "coupon fetch sucessfully ", coupon),
    { status: 200 },
  );
};

export const POST = asyncHandler(handler);
