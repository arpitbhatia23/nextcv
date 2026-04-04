import { randomUUID } from "crypto";
import { client, createPayment, phonepeBuilder } from "../phonepe/service";

export const order = async ({ amount, resumeId, userId, discountAmount, couponCode }) => {
  const merchantOrderId = randomUUID();

  await createPayment({
    merchantOrderId,
    couponCode,
    discountAmount,
    amount,
    userId,
  });
  const redirectUrl = `${process.env.PHONE_PE_REDIRECT_URL}/status/?merchantId=${merchantOrderId}&resumeId=${resumeId}`;

  const request = await phonepeBuilder({ merchantOrderId, amount, redirectUrl });

  const res = await client.pay(request);
  return res;
};
