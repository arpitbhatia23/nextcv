import Payment from "@/modules/payment/model/payment.model";
import apiError from "@/shared/utils/apiError";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authOptions from "../../../../modules/auth/services/options";
import { requiredAuth } from "@/shared";
import { getTranscationData } from "@/modules/payment";
const handler = async () => {
  await dbConnect();
  await getTranscationData();
};

export const GET = asyncHandler(handler);
