import { toogleCoupon } from "@/modules/coupon";

import { asyncHandler } from "@/shared";

const handler = async (req, { params }) => {
  const { isActive } = await req.json();
  const { id } = await params;
  return await toogleCoupon({ id, isActive });
};
export const PUT = asyncHandler(handler);
