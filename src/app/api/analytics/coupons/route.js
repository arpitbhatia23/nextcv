import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/payment.model";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/options";
import { apiResponse } from "@/utils/apiResponse";
import apiError from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";

const handler = async (req) => {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    throw new apiError(403, "Unauthorized access");
  }

  const couponStats = await Payment.aggregate([
    {
      $match: {
        status: "complete", // Only consider completed payments
        couponCode: { $exists: true, $ne: null }, // Only where coupon was used
      },
    },
    {
      $group: {
        _id: "$couponCode",
        usageCount: { $sum: 1 },
        totalRevenue: { $sum: "$amount" }, // Amount is in paise usually, check if model stores it in rupees or paise
        totalDiscountGiven: { $sum: "$discountAmount" },
      },
    },
    {
      $sort: { usageCount: -1 },
    },
  ]);

  return NextResponse.json(
    new apiResponse(
      200,
      "Coupon analytics retrieved successfully",
      couponStats,
    ),
  );
};

export const POST = asyncHandler(handler);
