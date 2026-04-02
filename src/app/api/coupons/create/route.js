import { asyncHandler, apiError, dbConnect, requiredAuth } from "@/shared";
import { createCoupon } from "@/modules/coupon";
const handler = async req => {
  let { couponCode, discount, expiry, type } = await req.json();

  if (!couponCode && !discount && !expiry && !type) {
    throw new apiError(400, "Missing required fields: couponCode, discount, or expiry");
  }
  await dbConnect();

  const session = await requiredAuth();
  if (session?.user.role !== "admin") {
    throw new apiError(401, "unauthorized acess");
  }
  return await createCoupon({ couponCode, discount, expiry, type });
};

export const POST = asyncHandler(handler);
