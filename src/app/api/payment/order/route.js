import { createCoverLetterOrder } from "@/modules/payment/services/createCoverLetterOrder";
import { createResuemOrder } from "@/modules/payment/services/createResumeorder";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";

const handler = async req => {
  await dbConnect();
  const { ...data } = await req.json();
  console.log(data);
  const { productType, ...reqData } = data;
  if (productType === "resume") {
    return await createResuemOrder({ reqData });
  } else if (productType === "cover-letter") {
    console.log(reqData);
    return createCoverLetterOrder(reqData);
  }
  // 2️⃣ Get template price
};

export const POST = asyncHandler(handler);
