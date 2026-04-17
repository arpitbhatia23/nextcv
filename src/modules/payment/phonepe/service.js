import { StandardCheckoutClient, StandardCheckoutPayRequest } from "pg-sdk-node";
import Payment from "../model/payment.model";
import { clientId, clinetSecret, clientVersion, env } from "./client";

export const client = StandardCheckoutClient.getInstance(
  clientId,
  clinetSecret,
  clientVersion,
  env
);

export const createPayment = async ({
  amount,
  couponCode,
  discountAmount,
  userId,
  merchantOrderId,
  resumeId,
}) => {
  const payment = await Payment.create({
    merchantOrderId: merchantOrderId,
    amount: amount / 100,
    userId: userId,
    resumeId: resumeId,
    couponCode: couponCode || null,
    discountAmount: discountAmount ? parseFloat(discountAmount) : 0,
  });

  return payment;
};

export const phonepeBuilder = async ({ merchantOrderId, amount, redirectUrl }) => {
  const request = StandardCheckoutPayRequest.builder()
    .merchantOrderId(merchantOrderId)
    .amount(Math.round(amount))
    .redirectUrl(redirectUrl)
    .build();

  return request;
};
