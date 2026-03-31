import { randomUUID } from "crypto";
import { client, phonepeBuilder } from "../phonepe/service";

export const order = async ({ amount, couponCode, discountAmount, resumeId, userId }) => {
  const merchantOrderId = randomUUID();
  const redirectUrl = `${process.env.PHONE_PE_REDIRECT_URL}/status/?merchantId=${merchantOrderId}&userId=${userId}&resumeId=${resumeId}&couponCode=${couponCode || ""}&discountAmount=${discountAmount || 0}`;

  const request = await phonepeBuilder({ merchantOrderId, amount, redirectUrl });

  const res = await client.pay(request);
  return res;
};
