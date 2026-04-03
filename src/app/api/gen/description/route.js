import { asyncHandler } from "@/shared/utils/asyncHandler";

import { aiDescriptionGenerator } from "@/modules/ai/services/aidescription";
import { apiError, checkRateLimit } from "@/shared";

export const maxDuration = 30;

export async function handler(req) {
  const headers = Object.fromEntries(req.headers); // convert Headers to plain object
  const ip = headers["x-forwarded-for"] || req.ip || "unknown";
  const allowed = await checkRateLimit(ip);
  if (!allowed) throw new apiError(429, "Too many requests. Please try again later.");

  const { type, data } = await req.json();
  return await aiDescriptionGenerator({ type, data });
}

export const POST = asyncHandler(handler);
