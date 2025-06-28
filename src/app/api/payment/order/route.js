import { asyncHandler } from "@/utils/asyncHandler";
import {
  Env,
  StandardCheckoutClient,
  StandardCheckoutPayRequest,
} from "pg-sdk-node";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import authOptions from "../../auth/options";
import apiError from "@/utils/apiError";
import { NextResponse } from "next/server";
import { apiResponse } from "@/utils/apiResponse";
import Resume from "@/models/resume.model";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user.model";
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
  await dbConnect();
  const reqData = await req.json();

  const {
    amount,
    name,
    phone,
    email,
    address,
    linkedin,
    github,
    portfolio,
    jobRole,
    summary,
    experience,
    skills,
    education,
    projects,
    ResumeType,
  } = reqData;
  const session = await getServerSession(authOptions);
  if (!session && !session.user) {
    throw new apiError(401, "unauthorizes access");
  }
  const userId = session.user._id;
  const resume = await Resume.create({
    status: "draft",
    ResumeType: ResumeType,
    phone_no: phone,
    name: name,
    email: email,
    address: address,
    linkedin: linkedin || "",
    github: github || "",
    portfolio: portfolio || "",
    summary: summary,
    skills: skills || "",
    education: education || "",
    experience: experience || "",
    projects: projects || "",
    jobRole: jobRole,
  });
  if (!resume) {
    throw new apiError(500, "something wrong went while saving resume");
  }

  const addResumeIdToUserModel = await User.findByIdAndUpdate(
    userId,
    {
      $push: {
        resume: resume._id,
      },
    },
    { new: true }
  );
  if (!addResumeIdToUserModel) {
    throw new apiError(
      500,
      "something went wrong while add resuem id to user model"
    );
  }

  const merchantOrderId = randomUUID();
  const redirectUrl = `${process.env.PHONE_PE_REDIRECT_URL}/status/?merchantId=${merchantOrderId}&userId=${userId}&resumeId=${resume._id}`;

  const request = StandardCheckoutPayRequest.builder()
    .merchantOrderId(merchantOrderId)
    .amount(amount)
    .redirectUrl(redirectUrl)
    .build();

  const res = await client.pay(request);
  return NextResponse.json(new apiResponse(200, "order initate", res));
};

export const POST = asyncHandler(handler);
