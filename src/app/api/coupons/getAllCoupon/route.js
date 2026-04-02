import { getAllCoupon } from "@/modules/coupon";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";

const handler = async () => {
  await dbConnect();
  return await getAllCoupon();
};
export const GET = asyncHandler(handler);
