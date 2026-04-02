import Payment from "@/modules/payment/model/payment.model";
import { apiError, apiResponse, requiredAuth } from "@/shared";
import { NextResponse } from "next/server";

export const couponAnalytics = async () => {
  const session = await requiredAuth();
  if (session.user.role !== "admin") {
    throw new apiError(401, "Unauthorized access");
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
    new apiResponse(200, "Coupon analytics retrieved successfully", couponStats)
  );
};
