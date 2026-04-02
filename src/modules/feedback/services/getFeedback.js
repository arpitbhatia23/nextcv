import { apiError, apiResponse, requiredAuth } from "@/shared";
import Feedback from "../model/feedback.model";
import { NextResponse } from "next/server";

export const getFeedback = async () => {
  const session = await requiredAuth();

  if (session.user.role !== "admin") {
    throw new apiError(403, "Unauthorized access");
  }

  const feedback = await Feedback.find({})
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .limit(50);

  return NextResponse.json(new apiResponse(200, "Feedback retrieved successfully", feedback));
};
