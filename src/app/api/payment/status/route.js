import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { requiredAuth } from "@/shared";
import { PaymentStatus } from "@/modules/payment";

const handler = async req => {
  const searchParams = req.nextUrl.searchParams;
  await dbConnect();
  const merchantOrderId = searchParams.get("merchantId");
  const resumeID = searchParams.get("resumeId");
  const couponCode = searchParams.get("couponCode");
  const session = await requiredAuth();
  const userId = session.user._id;
  const discountAmount = searchParams.get("discountAmount");
  return await PaymentStatus({ merchantOrderId, resumeID, couponCode, discountAmount, userId });
};

export const GET = asyncHandler(handler);
export const POST = asyncHandler(handler);
