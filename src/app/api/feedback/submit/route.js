import dbConnect from "@/shared/utils/dbConnect";

import { asyncHandler } from "@/shared/utils/asyncHandler";
import { submitFeedback } from "@/modules/feedback/services/submitFeedback";

const handler = async req => {
  await dbConnect();

  const { rating, comment, resumeId } = await req.json();
  return await submitFeedback({ resumeId, comment, rating });
};

export const POST = asyncHandler(handler);
