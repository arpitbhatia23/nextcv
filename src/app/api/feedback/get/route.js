import { NextResponse } from "next/server";
import dbConnect from "@/shared/utils/dbConnect";
import Feedback from "@/models/feedback.model";
import { getServerSession } from "next-auth";
import authOptions from "@/modules/auth/services/options";
import { apiResponse } from "@/shared/utils/apiResponse";
import apiError from "@/shared/utils/apiError";
import { asyncHandler } from "@/shared/utils/asyncHandler";

const handler = async () => {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    throw new apiError(403, "Unauthorized access");
  }

  const feedback = await Feedback.find({})
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .limit(50);

  return NextResponse.json(new apiResponse(200, "Feedback retrieved successfully", feedback));
};

export const POST = asyncHandler(handler);
