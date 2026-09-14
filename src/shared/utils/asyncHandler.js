import { NextResponse } from "next/server";
import * as sentry from "@sentry/nextjs";
export const asyncHandler = handler => {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      console.log("error", error);

      sentry.captureException(error);
      await sentry.flush(2000);
      return NextResponse.json(error.message || " Internal Server Error", {
        status: error.status || 500,
      });
    }
  };
};
