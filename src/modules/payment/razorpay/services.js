import Payment from "../model/payment.model";
import { razorpay } from "./client";

export const razorpaybuilder = async ({ amount }) => {
  console.log({
    key_id: process.env.RAZORPAY_CLIENT_ID,
    key_secret: Boolean(process.env.RAZORPAY_CLIENT_SECRET),
  });
  const request = await razorpay.orders.create({
    amount: amount,
    currency: "INR",
    receipt: `nextcv_${Date.now()}`,
  });
  console.log(request);
  return request;
};
export const createPayment = async ({
  amount,
  couponCode,
  discountAmount,
  userId,
  merchantOrderId,
  resumeId,
  coverLetterId,
  productType = "resume",
}) => {
  const payment = await Payment.create({
    merchantOrderId: merchantOrderId,
    amount: amount / 100,
    userId: userId,
    resumeId: resumeId,
    couponCode: couponCode || null,
    coverletterId: coverLetterId || null,
    productType,
    discountAmount: discountAmount ? parseFloat(discountAmount) : 0,
  });

  return payment;
};
