import { NextResponse } from "next/server";

import Payment from "@/modules/payment/model/payment.model";
import Resume from "@/modules/resume/models/resume.model";
import { User } from "@/modules/auth";
import { apiError, apiResponse, asyncHandler, dbConnect } from "@/shared";
import { client } from "@/modules/payment/phonepe/service";

export async function handler(req) {
  await dbConnect(); // ✅ add await

  const rawBody = await req.text();
  const authorization = req.headers.get("authorization");

  if (!authorization) {
    throw new apiError(400, "Missing authorization header");
  }

  const callbackResponse = client.validateCallback(
    process.env.PHONEPE_WEBHOOK_USERNAME,
    process.env.PHONEPE_WEBHOOK_PASSWORD,
    authorization,
    rawBody
  );

  const { type, payload } = callbackResponse;

  const merchantOrderId = payload.merchantOrderId;
  const transactionId = payload.paymentDetails?.[0]?.transactionId;
  const paymentMode = payload.paymentDetails?.[0]?.paymentMode;

  // ❌ FAILED FLOW
  if (type === "CHECKOUT_ORDER_FAILED") {
    await Payment.findOneAndUpdate(
      { merchantOrderId },
      {
        $set: {
          status: "FAILED",
          transcationId: transactionId || null, // keep your field name if schema same
          paymentMode: paymentMode || null,
        },
      }
    );

    return NextResponse.json(new apiResponse(200, "failed updated"));
  }

  // 🎯 Only handle success
  if (type !== "CHECKOUT_ORDER_COMPLETED") {
    return NextResponse.json(new apiResponse(400, "order not complete"));
  }

  console.log("merchantOrderId:", merchantOrderId);

  // 🛑 Idempotency check
  if (transactionId) {
    const existing = await Payment.findOne({ transcationId: transactionId });
    if (existing) {
      return NextResponse.json(new apiResponse(200, "already processed"));
    }
  }

  // ✅ Update Payment
  const payment = await Payment.findOneAndUpdate(
    { merchantOrderId },
    {
      $set: {
        status: "SUCCESS",
        transcationId: transactionId,
        paymentMode: paymentMode,
      },
    },
    { returnDocument: "after" }
  );

  console.log("payment", payment);

  if (!payment) {
    throw new apiError(400, "payment not found");
  }

  // ✅ Update Resume
  await Resume.findByIdAndUpdate(payment.resumeId, {
    $set: { status: "paid" },
  });

  // ✅ Update User (prevent duplicates)
  await User.findByIdAndUpdate(payment.userId, {
    $addToSet: { payments: payment._id },
  });

  return NextResponse.json(new apiResponse(200, "success"));
}

export const POST = asyncHandler(handler);
