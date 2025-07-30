import authOptions from "@/app/api/auth/options";
import Coupon from "@/models/coupon";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const handler = async (req, { params }) => {
  const { isActive } = await req.json();
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session && session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized acess");
  }

  if (!id && !isActive) {
    throw new apiError(400, "id and isactive is required");
  }

  const data = await Coupon.findByIdAndUpdate(
    id,
    { $set: { isActive: isActive } },
    { new: true }
  );

  return NextResponse.json(
    new apiResponse(200, "Coupon status updated successfully", data)
  );
};
export const PUT = asyncHandler(handler);
