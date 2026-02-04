import { asyncHandler } from "@/utils/asyncHandler";
import { apiResponse } from "@/utils/apiResponse";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

const handler = async () => {
  // Connect only if not already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(`${process.env.MONGODB_URI}/nextcv`);
  }

  // Ping database
  await mongoose.connection.db.admin().ping();

  return NextResponse.json(new apiResponse(true, "Database connected"), {
    status: 200,
  });
};

export const GET = asyncHandler(handler);
