import dbConnect from "@/shared/utils/dbConnect";

import { asyncHandler } from "@/shared/utils/asyncHandler";
import { couponAnalytics } from "@/modules/admin/services/couponAnalytics";

const handler = async () => {
  await dbConnect();
  return await couponAnalytics();
};

export const POST = asyncHandler(handler);
