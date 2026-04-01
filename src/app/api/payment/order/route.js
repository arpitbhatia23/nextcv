import { createResuemOrder } from "@/modules/payment/services/createResumeorder";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";

const handler = async req => {
  await dbConnect();
  const reqData = await req.json();
  return await createResuemOrder({ reqData });
  // 2️⃣ Get template price
};

export const POST = asyncHandler(handler);
