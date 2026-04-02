import dbConnect from "@/shared/utils/dbConnect";

import { asyncHandler } from "@/shared/utils/asyncHandler";
import { getFeedback } from "@/modules/feedback";

const handler = async () => {
  await dbConnect();
  return await getFeedback();
};

export const POST = asyncHandler(handler);
