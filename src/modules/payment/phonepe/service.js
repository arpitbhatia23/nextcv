import { StandardCheckoutClient, StandardCheckoutPayRequest } from "pg-sdk-node";
import Payment from "../model/payment.model";
import { clientId, clinetSecret, clientVersion, env } from "./client";

export const client = StandardCheckoutClient.getInstance(
  clientId,
  clinetSecret,
  clientVersion,
  env
);

export const createPayment = async ({ response, couponCode, discountAmount, userId }) => {
  const payment = await Payment.create({
    transcationId: response?.paymentDetails[0]?.transactionId,
    paymentMode: response?.paymentDetails[0]?.paymentMode,
    amount: response?.amount / 100,
    userId: userId,
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
