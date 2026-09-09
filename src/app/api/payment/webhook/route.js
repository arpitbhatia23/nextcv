import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

import Payment from "@/modules/payment/model/payment.model";
import Resume from "@/modules/resume/models/resume.model";
import { User } from "@/modules/auth";
import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";

import { apiError, apiResponse, asyncHandler, dbConnect } from "@/shared";

export async function handler(req) {
  await dbConnect();

  // IMPORTANT:
  // Read the raw body only once.
  const rawBody = await req.text();

  const signature = req.headers.get("x-razorpay-signature");

  if (!signature) {
    throw new apiError(400, "Missing Razorpay webhook signature");
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    throw new apiError(500, "Razorpay webhook secret is not configured");
  }

  // Generate expected signature
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  // Verify signature
  if (signature !== expectedSignature) {
    throw new apiError(400, "Invalid Razorpay webhook signature");
  }

  // Parse body AFTER signature verification
  const body = JSON.parse(rawBody);

  const event = body.event;

  console.log("Razorpay webhook event:", event);

  // Only process required events
  if (event !== "payment.captured" && event !== "payment.failed") {
    return NextResponse.json(new apiResponse(200, "Event ignored"));
  }

  // Razorpay payment entity
  const paymentEntity = body.payload?.payment?.entity;

  if (!paymentEntity) {
    throw new apiError(400, "Payment entity not found");
  }

  const merchantOrderId = paymentEntity.order_id;
  const transactionId = paymentEntity.id;
  const paymentMode = paymentEntity.method;

  if (!merchantOrderId) {
    throw new apiError(400, "Razorpay order ID not found");
  }

  console.log("merchantOrderId:", merchantOrderId);
  console.log("transactionId:", transactionId);
  console.log("payment status:", paymentEntity.status);

  // ============================================
  // FAILED PAYMENT
  // ============================================

  if (event === "payment.failed") {
    await Payment.findOneAndUpdate(
      { merchantOrderId },
      {
        $set: {
          status: "FAILED",
          transcationId: transactionId || null,
          paymentMode: paymentMode || null,
        },
      }
    );

    return NextResponse.json(new apiResponse(200, "Payment failed updated"));
  }

  // ============================================
  // CAPTURED PAYMENT
  // ============================================

  if (paymentEntity.status !== "captured") {
    return NextResponse.json(new apiResponse(200, "Payment not captured"));
  }

  // ============================================
  // IDEMPOTENCY
  // ============================================

  if (transactionId) {
    const existingPayment = await Payment.findOne({
      transcationId: transactionId,
    });

    if (existingPayment) {
      console.log("Payment already processed:", transactionId);

      return NextResponse.json(new apiResponse(200, "Already processed"));
    }
  }

  // ============================================
  // UPDATE PAYMENT
  // ============================================

  const payment = await Payment.findOneAndUpdate(
    { merchantOrderId },
    {
      $set: {
        status: "SUCCESS",
        transcationId: transactionId,
        paymentMode: paymentMode,
      },
    },
    {
      new: true,
    }
  );

  console.log("Updated payment:", payment);

  if (!payment) {
    throw new apiError(404, "Payment not found");
  }

  // ============================================
  // UPDATE RESUME
  // ============================================

  if (payment.productType === "resume") {
    await Resume.findByIdAndUpdate(payment.resumeId, {
      $set: {
        status: "paid",
      },
    });
  }

  // ============================================
  // UPDATE COVER LETTER
  // ============================================

  if (payment.productType === "cover-letter") {
    await CoverLetter.findByIdAndUpdate(payment.coverletterId, {
      $set: {
        status: "paid",
      },
    });
  }

  // ============================================
  // UPDATE USER
  // ============================================

  await User.findByIdAndUpdate(payment.userId, {
    $addToSet: {
      payments: payment._id,
    },
  });

  return NextResponse.json(new apiResponse(200, "Payment successfully processed"));
}

// Razorpay webhook
export const POST = asyncHandler(handler);

// Optional endpoint health check
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Razorpay webhook endpoint is active",
  });
}
