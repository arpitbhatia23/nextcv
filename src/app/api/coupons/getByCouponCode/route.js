import { getCouponById } from "@/modules/coupon";
import { asyncHandler } from "@/shared";
import { dbConnect } from "@/shared";

const handler = async req => {
  const { couponCode } = await req.json();
  await dbConnect();
  return await getCouponById({ couponCode });
};

export const POST = asyncHandler(handler);
