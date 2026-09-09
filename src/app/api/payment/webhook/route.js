import { NextResponse } from "next/server";

import Payment from "@/modules/payment/model/payment.model";
import Resume from "@/modules/resume/models/resume.model";
import { User } from "@/modules/auth";
import { apiError, apiResponse, asyncHandler, dbConnect } from "@/shared";
import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";
import { razorpay } from "@/modules/payment/razorpay/client";

export async function handler(req) {
  await dbConnect(); // ✅ add await

  const body = await req.json();

  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    throw new apiError(400, "Missing Razorpay webhook signature");
  }
  const rawBody = await req.text();

  // 3. Generate expected signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  // 4. Verify signature
  if (signature !== expectedSignature) {
    throw new apiError(400, "Invalid Razorpay webhook signature");
  }

  const { event } = body;

  if (event !== "payment.captured" && event !== "payment.failed") {
    return NextResponse.json(new apiResponse(200, "Event ignored"));
  }
  const paymentEntity = event.payload?.payment?.entity;

  const razorpaypayment = await razorpay.payments.fetch(paymentEntity.id);

  const merchantOrderId = razorpaypayment.order_id;
  const transactionId = razorpaypayment.id;
  const paymentMode = razorpaypayment.method;

  // ❌ FAILED FLOW
  if (razorpaypayment.status !== "captured") {
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
  if (payment.productType === "resume") {
    await Resume.findByIdAndUpdate(payment.resumeId, {
      $set: { status: "paid" },
    });
  }
  if (payment.productType === "cover-letter") {
    await CoverLetter.findByIdAndUpdate(payment.coverletterId, {
      $set: { status: "paid" },
    });
  }

  // ✅ Update User (prevent duplicates)
  await User.findByIdAndUpdate(payment.userId, {
    $addToSet: { payments: payment._id },
  });

  return NextResponse.json(new apiResponse(200, "success"));
}

export const POST = asyncHandler(handler);
