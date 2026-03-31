import { NextResponse } from "next/server";
import dbConnect from "@/shared/utils/dbConnect";
import Feedback from "@/models/feedback.model";
import { getServerSession } from "next-auth";
import authOptions from "@/modules/auth/services/options";
import { apiResponse } from "@/shared/utils/apiResponse";
import apiError from "@/shared/utils/apiError";
import { asyncHandler } from "@/shared/utils/asyncHandler";

const handler = async req => {
  await dbConnect();

  const { rating, comment, resumeId } = await req.json();

  if (!rating) {
    throw new apiError(400, "Rating is required");
  }

  const session = await getServerSession(authOptions);
  let userId = null;
  if (session && session.user) {
    userId = session.user._id;
  }

  const feedback = await Feedback.create({
    userId,
    rating,
    comment,
    resumeId,
  });

  return NextResponse.json(new apiResponse(201, "Feedback submitted successfully", feedback));
};

export const POST = asyncHandler(handler);
