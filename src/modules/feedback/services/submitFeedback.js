import { apiError, apiResponse, requiredAuth } from "@/shared";
import Feedback from "../model/feedback.model";
import { NextResponse } from "next/server";

export const submitFeedback = async ({ rating, comment, resumeId }) => {
  if (!rating) {
    throw new apiError(400, "Rating is required");
  }

  const session = await requiredAuth();
  let userId = session.user._id;

  const feedback = await Feedback.create({
    userId,
    rating,
    comment,
    resumeId,
  });

  return NextResponse.json(new apiResponse(201, "Feedback submitted successfully", feedback));
};
