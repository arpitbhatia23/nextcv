import { asyncHandler } from "@/utils/asyncHandler";

const { apiResponse } = require("@/utils/apiResponse");
const { default: mongoose } = require("mongoose");
const { NextResponse } = require("next/server");

const handler = async () => {
  const dbConnect = mongoose.connect(`${process.env.MONGODB_URI}/nextcv`);

  await dbConnect.connection.db.admin.ping();

  return NextResponse.json(new apiResponse(), { status: 200 });
};

export const GET = asyncHandler(handler);
