// coupon cod req
// if EMPTY
// find in database
// if not found error
// else
// check expiry
// if expired error
// send coupon data to front

import Coupon from "@/models/coupon";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";

import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/options";
async function handler(req) {
  await dbConnect();

  const session = getServerSession(authOptions);
  if (!session && !session.user) {
    return new NextResponse(apiError("Unauthorized"), 401);
  }

  const { couponCode } = await req.json();
  if (!couponCode) {
    throw new apiError("Coupon code is required", 400);
  }
  const coupon = await Coupon.findOne({
    couponCode: couponCode,
  });
  if (!coupon) {
    throw new apiError(404, "Coupon not found");
  }

  if (new Date(Coupon.expiry) < new Date()) {
    throw new apiError("Coupon has expired", 400);
  }
  // send coupon data to front
  return NextResponse.json(
    new apiResponse(200, "coupon received", { couponCode })
  );
}
export const GET = asyncHandler(handler);
