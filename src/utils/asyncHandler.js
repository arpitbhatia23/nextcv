import { NextResponse } from "next/server";

export const asycHandler = (handler) => {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (error) {
      NextResponse.json(error.message || " Internal Server Error", {
        status: error.status || 500,
      });
    }
  };
};
