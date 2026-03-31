import authOptions from "@/modules/auth/services/options";
import Coupon from "@/models/coupon";
import apiError from "@/shared/utils/apiError";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const handler = async (req, { params }) => {
  const { id } = await params;
  if (!id) {
    throw new apiError(400, "Coupon ID is required");
  }

  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session || session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized acess");
  }
  await Coupon.findByIdAndDelete(id);

  return NextResponse.json(new apiResponse(200, "Coupon deleted successfully"), { status: 200 });
};

export const DELETE = asyncHandler(handler);
