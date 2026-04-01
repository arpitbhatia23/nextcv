import { apiError, apiResponse, requiredAuth } from "@/shared";
import Payment from "../model/payment.model";
import { NextResponse } from "next/server";

export const getTranscationData = async () => {
  const session = await requiredAuth();

  if (session?.user.role !== "admin") {
    throw new apiError(401, "unauthroizes access");
  }

  const data = await Payment.find();

  if (data.length === 0) {
    throw new apiError(404, "payment not found");
  }

  return NextResponse.json(new apiResponse(200, "data fetch sucefully", data), {
    status: 200,
  });
};
