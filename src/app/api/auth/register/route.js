import User from "@/models/user.model";
import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const handler = async (req) => {
  await dbConnect();
  const { email, password } = await req.json();
  if ([email, password].some((field) => field.trim() === "")) {
    throw new apiError(400, "all fields are required");
  }

  const existeduser = await User.findOne({ email: email });
  if (existeduser) {
    throw new apiError(400, "user is already exits");
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const newuser = await User.create({
    email: email,
    password: hashpassword,
    role: "admin",
  });
  if (!newuser) {
    throw new apiError(500, "something went wrong while registering user");
  }
  return NextResponse.json(new apiResponse(201, "user register sucessfull"), {
    status: 200,
  });
};

export const POST = asyncHandler(handler);
