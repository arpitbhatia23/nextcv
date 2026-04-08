import { randomUUID } from "crypto";
import { client, createPayment, phonepeBuilder } from "../phonepe/service";

export const order = async ({ amount, couponCode, discountAmount, resumeId, userId }) => {
  const merchantOrderId = randomUUID();
  const redirectUrl = `${process.env.PHONE_PE_REDIRECT_URL}/status/?merchantId=${merchantOrderId}`;
  console.log(resumeId);
  await createPayment({
    amount,
    couponCode,
    discountAmount,
    resumeId,
    discountAmount,
    userId,
    merchantOrderId,
  });

  const request = await phonepeBuilder({ merchantOrderId, amount, redirectUrl });

  const res = await client.pay(request);
  return res;
};
