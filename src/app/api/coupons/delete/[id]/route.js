import authOptions from "@/app/api/auth/options";
import Coupon from "@/models/coupon";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const handler = async (req, { params }) => {
  const { id } = await params;
  if (!id) {
    throw new apiError(400, "Coupon ID is required");
  }

  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session && session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized acess");
  }
  await Coupon.findByIdAndDelete(id);

  return NextResponse.json(
    new apiResponse(200, "Coupon deleted successfully"),
    { status: 200 }
  );
};

export const DELETE = asyncHandler(handler);
