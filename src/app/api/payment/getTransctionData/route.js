import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";

import { getTranscationData } from "@/modules/payment";
const handler = async () => {
  await dbConnect();
  return await getTranscationData();
};

export const GET = asyncHandler(handler);
