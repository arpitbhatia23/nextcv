import { User } from "@/modules/auth";
import { NextResponse } from "next/server";
import Payment from "../model/payment.model";
import { apiError, apiResponse } from "@/shared";
import Resume from "@/modules/resume/models/resume.model";
import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";
import { razorpay } from "../razorpay/client";
export const PaymentStatus = async ({ body, userId }) => {
  const { razorpay_payment_id, razorpay_order_id } = body;

  if ((!razorpay_payment_id, !razorpay_order_id)) {
    throw new apiError(400, "razorpay payment and order id is required");
  }

  const response = await razorpay.payments.fetch(razorpay_payment_id);
  console.log(response);
  if (response.status === "captured") {
    const isPaymentAllreadyDone = await Payment.findOne({
      transcationId: response?.id,
    });

    if (isPaymentAllreadyDone) {
      console.log("oder alread updae by webhook");
      if (isPaymentAllreadyDone.productType === "resume") {
        return NextResponse.json(
          new apiResponse(200, "success", {
            redirecturl: `${process.env.BASE_URL}/dashboard/download?resumeId=${updateResume._id}`,
          })
        );
      } else {
        return NextResponse.json(
          new apiResponse(200, "success", {
            redirecturl: `${process.env.BASE_URL}/dashboard/download?coverLetterId=${updatedCoverLetter._id}`,
          })
        );
      }
    }

    const payment = await Payment.findOneAndUpdate(
      {
        merchantOrderId: response.order_id,
      },
      {
        $set: {
          status: "SUCCESS",
          transcationId: response?.id,
          paymentMode: response?.method,
        },
      },
      { returnDocument: "after" }
    );
    if (payment.productType === "resume") {
      const updateResume = await Resume.findByIdAndUpdate(
        payment.resumeId,
        {
          $set: {
            status: "paid",
          },
        },
        { returnDocument: "after" }
      );
      if (!updateResume) {
        throw new apiError(500, "something went wrong while updateins resume status");
      }
      await User.findByIdAndUpdate(userId, {
        $push: {
          payments: payment._id,
        },
      });

      return NextResponse.json(
        new apiResponse(200, "success", {
          redirecturl: `${process.env.BASE_URL}/dashboard/download?resumeId=${updateResume._id}`,
        })
      );
    }
    console.log(payment);
    if (payment.productType === "cover-letter") {
      const updatedCoverLetter = await CoverLetter.findByIdAndUpdate(
        payment.coverletterId,
        {
          $set: {
            status: "paid",
          },
        },
        { returnDocument: "after" }
      );

      if (!updatedCoverLetter) {
        throw new apiError(500, "something went wrong while updateins covverletterr status");
      }
      await User.findByIdAndUpdate(userId, {
        $push: {
          payments: payment._id,
        },
      });

      return NextResponse.json(
        new apiResponse(200, "success", {
          redirecturl: `${process.env.BASE_URL}/dashboard/download?coverLetterId=${updatedCoverLetter._id}`,
        })
      );
    }
  } else {
    return NextResponse.json(
      new apiResponse(200, "success", {
        redirecturl: `${process.env.BASE_URL}/payement/fails?status=fail`,
      })
    );
  }
};
