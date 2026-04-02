import { asyncHandler } from "@/shared/utils/asyncHandler";

import { aiDescriptionGenerator } from "@/modules/ai/services/aidescription";

export const maxDuration = 30;

export async function handler(req) {
  const { type, data } = await req.json();
  return await aiDescriptionGenerator({ type, data });
}

export const POST = asyncHandler(handler);
