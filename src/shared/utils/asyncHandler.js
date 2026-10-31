import { posthog } from "@/modules/ai/utils/aiConfig";
import { NextResponse } from "next/server";
export const asyncHandler = handler => {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      try {
        console.log(error);
        posthog.captureException(error, "server-anonymous", {
          url: req?.nextUrl?.pathname || req?.url,
          method: req?.method,
          source: "nextcv-api",
        });
      } catch {
        // Don't let PostHog errors mask the original error
      }
      return NextResponse.json(error.message || " Internal Server Error", {
        status: error.status || 500,
      });
    }
  };
};
