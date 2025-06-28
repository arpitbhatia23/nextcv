import Resume from "@/models/resume.model";
import apiError from "@/utils/apiError";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { Env, StandardCheckoutClient } from "pg-sdk-node";

const clientId = process.env.PHONE_PE_CLIENT_ID;
const clinetSecret = process.env.PHONE_PE_CLIENT_SECRET;
const clientVersion = process.env.PHONE_PE_CLIENT_VERSION;
const env = Env.SANDBOX;
const client = StandardCheckoutClient.getInstance(
  clientId,
  clinetSecret,
  clientVersion,
  env
);
const handler = async (req) => {
  const searchParams = req.nextUrl.searchParams;
  await dbConnect();
  const merchantOrderId = searchParams.get("merchantOrderId");
  const userId = searchParams.get("userId");
  const resumeID = searchParams.get("resumeId");

  const response = await client.getTransactionStatus(merchantOrderId);
  if (response.state === "COMPLETED") {
    const updateResume = await Resume.findByIdAndUpdate(
      resumeID,
      {
        $set: {
          status: "paid",
        },
      },
      { new: true }
    );
    if (!updateResume) {
      throw new apiError(
        500,
        "something went wrong while updateins resume status"
      );
    }

    return NextResponse.redirect(
      `${process.env.BASE_URL}/dashboard/download?resumeId=${resumeID}`
    );
  } else {
    return NextResponse.redirect(`${process.env.BASE_URL}/fail`);
  }
};

export const { POST, GET } = asyncHandler(handler);
