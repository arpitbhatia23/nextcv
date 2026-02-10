import Payment from "@/models/payment.model";
import Resume from "@/models/resume.model";
import User from "@/models/user.model";
import apiError from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { Env, StandardCheckoutClient } from "pg-sdk-node";
import authOptions from "../../auth/options";

const clientId = process.env.PHONE_PE_CLIENT_ID;
const clinetSecret = process.env.PHONE_PE_CLIENT_SECRET;
const clientVersion = process.env.PHONE_PE_CLIENT_VERSION;
const env =
  process.env.NODE_ENV === "production" ? Env.PRODUCTION : Env.SANDBOX;
const client = StandardCheckoutClient.getInstance(
  clientId,
  clinetSecret,
  clientVersion,
  env,
);
const handler = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  await dbConnect();
  const merchantOrderId = searchParams.get("merchantId");
  const resumeID = searchParams.get("resumeId");
  const response = await client.getOrderStatus(merchantOrderId);
  const session = await getServerSession(authOptions);
  if (!session && !session?.user) {
    throw new apiError(401, "unauthorizes access");
  }
  const userId = session.user._id;
  const couponCode = searchParams.get("couponCode");
  const discountAmount = searchParams.get("discountAmount");
  console.log(couponCode);
  if (response.state === "COMPLETED") {
    console.log("payment insitate");
    const payment = await Payment.create({
      transcationId: response?.paymentDetails[0]?.transactionId,
      paymentMode: response?.paymentDetails[0]?.paymentMode,
      amount: response?.amount / 100,
      userId: userId,
      couponCode: couponCode || null,
      discountAmount: discountAmount ? parseFloat(discountAmount) : 0,
    });

    const updateResume = await Resume.findByIdAndUpdate(
      resumeID,
      {
        $set: {
          status: "paid",
        },
      },
      { new: true },
    );
    await User.findByIdAndUpdate(userId, {
      $push: {
        payments: payment._id,
      },
    });
    if (!updateResume) {
      throw new apiError(
        500,
        "something went wrong while updateins resume status",
      );
    }

    return NextResponse.redirect(
      `${process.env.BASE_URL}/dashboard/download?resumeId=${resumeID}`,
    );
  } else {
    return NextResponse.redirect(
      `${process.env.BASE_URL}/payement/fails?status=fail`,
    );
  }
};

export const GET = asyncHandler(handler);
export const POST = asyncHandler(handler);
