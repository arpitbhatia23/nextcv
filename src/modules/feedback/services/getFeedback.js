import { apiError, apiResponse, requiredAuth } from "@/shared";
import Feedback from "../model/feedback.model";
import { NextResponse } from "next/server";
import { redis } from "@/shared/utils/Redis";

export const getFeedback = async () => {
  const session = await requiredAuth();
  const cacheKey = `feedbacks`;

  if (session.user.role !== "admin") {
    throw new apiError(403, "Unauthorized access");
  }
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  const feedback = await Feedback.find({})
    .populate("userId", "name email")
    .sort({ createdAt: -1 })
    .limit(50);

  await redis.set(cacheKey, JSON.stringify(feedback), "EX", 1200);
  return NextResponse.json(new apiResponse(200, "Feedback retrieved successfully", feedback));
};
