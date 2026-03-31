import { register } from "@/modules/auth/";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const handler = async req => {
  await dbConnect();
  const data = await req.json();
  await register(data);
  return NextResponse.json(new apiResponse(201, "user register sucessfull"), {
    status: 200,
  });
};

export const POST = asyncHandler(handler);
