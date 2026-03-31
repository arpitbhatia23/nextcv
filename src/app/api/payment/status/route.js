import Payment from "@/modules/payment/model/payment.model";
import Resume from "@/modules/resume/models/resume.model";
import User from "@/models/user.model";
import apiError from "@/shared/utils/apiError";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { NextResponse } from "next/server";
import { client, createPayment } from "@/modules/payment/phonepe/service";
import { requiredAuth } from "@/shared";

const handler = async req => {
  const searchParams = req.nextUrl.searchParams;
  await dbConnect();
  const merchantOrderId = searchParams.get("merchantId");
  const resumeID = searchParams.get("resumeId");
  const response = await client.getOrderStatus(merchantOrderId);
  const session = await requiredAuth();
  const userId = session.user._id;
  const couponCode = searchParams.get("couponCode");
  const discountAmount = searchParams.get("discountAmount");
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

export const GET = asyncHandler(handler);
export const POST = asyncHandler(handler);
