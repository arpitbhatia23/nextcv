import { client, createPayment } from "../phonepe/service";
import { User } from "@/modules/auth";
import { NextResponse } from "next/server";
import Payment from "../model/payment.model";
import { apiError } from "@/shared";
import Resume from "@/modules/resume/models/resume.model";
export const PaymentStatus = async ({ merchantOrderId, userId }) => {
  const response = await client.getOrderStatus(merchantOrderId);
  if (response.state === "COMPLETED") {
    const isPaymentAllreadyDone = await Payment.findOne({
      transcationId: response?.paymentDetails[0]?.transactionId,
    });
    if (isPaymentAllreadyDone) {
      return NextResponse.redirect(
        `${process.env.BASE_URL}/dashboard/download?resumeId=${isPaymentAllreadyDone.resumeId}`
      );
    }

    const payment = await Payment.findOneAndUpdate(
      {
        merchantOrderId: merchantOrderId,
        status: "PENDING",
      },
      {
        $set: {
          status: "SUCCESS",
          transcationId: response?.paymentDetails[0]?.transactionId,
          paymentMode: response?.paymentDetails[0]?.paymentMode,
        },
      },
      { returnDocument: "after" }
    );
    console.log(payment);
    const updateResume = await Resume.findByIdAndUpdate(
      payment.resumeId,
      {
        $set: {
          status: "paid",
        },
      },
      { returnDocument: "after" }
    );
    await User.findByIdAndUpdate(userId, {
      $push: {
        payments: payment._id,
      },
    });
    if (!updateResume) {
      throw new apiError(500, "something went wrong while updateins resume status");
    }

    return NextResponse.redirect(
      `${process.env.BASE_URL}/dashboard/download?resumeId=${updateResume._id}`
    );
  } else {
    return NextResponse.redirect(`${process.env.BASE_URL}/payement/fails?status=fail`);
  }
};
