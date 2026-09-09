import { razorpaybuilder, createPayment } from "@/modules/payment/razorpay/services";

export const order = async ({ userId, amount, coverLetterId, couponCode, discountAmount }) => {
  const res = await razorpaybuilder({ amount });

  await createPayment({
    amount,
    coverLetterId,
    userId,
    merchantOrderId: res.id,
    productType: "cover-letter",
    couponCode,
    discountAmount,
  });
  return res;
};
