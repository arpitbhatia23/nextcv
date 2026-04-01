import Resume from "@/components/Resume";
import { client } from "../phonepe/service";
import { User } from "@/modules/auth";
import { NextResponse } from "next/server";
import Payment from "../model/payment.model";
import { apiError } from "@/shared";

export const PaymentStatus = async ({
  merchantOrderId,
  userId,
  discountAmount,
  resumeID,
  couponCode,
}) => {
  const response = await client.getOrderStatus(merchantOrderId);
  if (response.state === "COMPLETED") {
    const isPaymentAllreadyDone = await Payment.findOne({
      transcationId: response?.paymentDetails[0]?.transactionId,
    });
    if (isPaymentAllreadyDone) {
      return NextResponse.redirect(
        `${process.env.BASE_URL}/dashboard/download?resumeId=${resumeID}`
      );
    }
    const payment = await createPayment({ response, couponCode, discountAmount });
    const updateResume = await Resume.findByIdAndUpdate(
      resumeID,
      {
        $set: {
          status: "paid",
        },
      },
      { new: true }
    );
    await User.findByIdAndUpdate(userId, {
      $push: {
        payments: payment._id,
      },
    });
    if (!updateResume) {
      throw new apiError(500, "something went wrong while updateins resume status");
    }

    return NextResponse.redirect(`${process.env.BASE_URL}/dashboard/download?resumeId=${resumeID}`);
  } else {
    return NextResponse.redirect(`${process.env.BASE_URL}/payement/fails?status=fail`);
  }
};
