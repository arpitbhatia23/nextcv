import { deleteCoupon } from "@/modules/coupon";
import apiError from "@/shared/utils/apiError";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
const handler = async (req, { params }) => {
  const { id } = await params;
  if (!id) {
    throw new apiError(400, "Coupon ID is required");
  }

  await dbConnect();
  return await deleteCoupon({ id });
};

export const DELETE = asyncHandler(handler);
