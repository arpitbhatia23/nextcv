import Payment from "@/modules/payment/model/payment.model";
import apiError from "@/shared/utils/apiError";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../modules/auth/services/options";
const handler = async () => {
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
