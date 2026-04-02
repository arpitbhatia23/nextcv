import { sendReminder } from "@/modules/admin";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
const handler = async () => {
  await dbConnect();
  return await sendReminder();
};

export const GET = asyncHandler(handler);
