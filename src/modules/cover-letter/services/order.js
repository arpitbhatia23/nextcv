import { client, createPayment, phonepeBuilder } from "@/modules/payment/phonepe/service";
import { randomUUID } from "crypto";

export const order = async ({ userId, amount, coverLetterId }) => {
  const merchantOrderId = randomUUID();
  const redirectUrl = `${process.env.PHONE_PE_REDIRECT_URL}/status/?merchantId=${merchantOrderId}`;
  console.log(coverLetterId);
  await createPayment({
    amount,
    coverLetterId,
    userId,
    merchantOrderId,
    productType: "cover-letter",
  });
  const request = await phonepeBuilder({ merchantOrderId, amount, redirectUrl });
  const res = await client.pay(request);
  return res;
};
