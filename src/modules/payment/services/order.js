import { createPayment } from "../phonepe/service";
import { razorpaybuilder } from "../razorpay/services";

export const order = async ({ amount, resumeId, userId, discountAmount, couponCode }) => {
  const res = await razorpaybuilder({ amount });
  await createPayment({
    amount,
    couponCode,
    discountAmount,
    resumeId,
    discountAmount,
    userId,
    merchantOrderId: res.id,
  });
  return res;
};
