import { NextResponse } from "next/server";

import Payment from "@/modules/payment/model/payment.model";
import Resume from "@/modules/resume/models/resume.model";
import { User } from "@/modules/auth";
import { apiError, apiResponse, asyncHandler } from "@/shared";
import { client } from "@/modules/payment/phonepe/service";

export async function handler(req) {
  // ⚠️ IMPORTANT: raw body required
  const rawBody = await req.text();

  // 🔐 Authorization header from PhonePe
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    throw new apiError(400, "Missing authorization header");
  }

  // 🔐 Validate callback using SDK
  const callbackResponse = client.validateCallback(
    process.env.PHONEPE_WEBHOOK_USERNAME,
    process.env.PHONEPE_WEBHOOK_PASSWORD,
    authorization,
    rawBody
  );

  const { type, payload } = callbackResponse;

  // 🎯 Only handle successful payment
  if (type !== "CHECKOUT_ORDER_COMPLETED") {
    return NextResponse.json(new apiResponse(400, "order not complete"));
  }

  const merchantOrderId = payload.originalMerchantOrderId;
  const transactionId = payload.paymentDetails?.[0]?.transactionId;
  const paymentMode = payload.paymentDetails?.[0]?.paymentMode;

  // 🛑 Idempotency check
  const existing = await Payment.findOne({ transcationId: transactionId });
  if (existing) {
    return NextResponse.json();
  }

  // ✅ Update Payment
  const payment = await Payment.findOneAndUpdate(
    {
      merchantOrderId: merchantOrderId,
    },
    {
      $set: {
        status: "SUCCESS",
        transcationId: transactionId,
        paymentMode: paymentMode,
      },
    },
    { returnDocument: "after" }
  );

  if (!payment) {
    throw new apiError(400, "payment not found");
  }

  // ✅ Update Resume
  await Resume.findByIdAndUpdate(payment.resumeId, {
    $set: { status: "paid" },
  });

  // ✅ Update User
  await User.findByIdAndUpdate(payment.userId, {
    $push: { payments: payment._id },
  });

  return NextResponse.json(new apiResponse(200, "sucess"));
}

export const POST = asyncHandler(handler);
