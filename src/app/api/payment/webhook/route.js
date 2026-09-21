import { NextResponse } from "next/server";
import { asyncHandler } from "@/shared";
import { webhook } from "@/modules/payment/services/webhook";

export async function handler(req) {
  const rawBody = await req.text();

  const signature = req.headers.get("x-razorpay-signature");

  return await webhook({ rawBody, signature });
}

// Razorpay webhook
export const POST = asyncHandler(handler);

// Optional endpoint health check
export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Razorpay webhook endpoint is active",
  });
}
