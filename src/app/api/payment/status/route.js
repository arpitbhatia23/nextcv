import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { requiredAuth } from "@/shared";
import { PaymentStatus } from "@/modules/payment";

const handler = async req => {
  const body = await req.json();
  await dbConnect();
  const session = await requiredAuth();
  const userId = session.user.id;
  return await PaymentStatus({ body, userId });
};

export const GET = asyncHandler(handler);
export const POST = asyncHandler(handler);
