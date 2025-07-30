import Payment from "@/models/payment.model";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../auth/options";
const handler = async (req) => {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session && session?.user.role !== "admin") {
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

export const GET = asyncHandler(handler);
