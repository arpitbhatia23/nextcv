import { validateWebhookSignature } from "razorpay";
import Payment from "@/modules/payment/model/payment.model";
import Resume from "@/modules/resume/models/resume.model";
import { User } from "@/modules/auth";
import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";
import { NextResponse } from "next/server";

import { apiError, apiResponse, dbConnect } from "@/shared";

export const webhook = async ({ rawBody, signature }) => {
  if (!signature) {
    throw new apiError(400, "Missing Razorpay webhook signature");
  }
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new apiError(500, "Razorpay webhook secret is not configured");
  }

  try {
    validateWebhookSignature(rawBody, signature, webhookSecret);
  } catch (error) {
    console.log(error);
    throw new apiError(400, "webhook signature validation failed");
  }

  // Parse body AFTER signature verification
  const body = JSON.parse(rawBody);

  const event = body.event;

  console.log("Razorpay webhook event:", event);
  if (event !== "payment.captured" && event !== "payment.failed") {
    return NextResponse.json(new apiResponse(200, "Event ignored"));
  }

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
  await dbConnect();

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
  await User.findByIdAndUpdate(payment.userId, {
    $addToSet: {
      payments: payment._id,
    },
  });

  return NextResponse.json(new apiResponse(200, "Payment successfully processed"));
};
