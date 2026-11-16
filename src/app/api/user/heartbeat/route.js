import { NextResponse } from "next/server";
import { apiResponse, asyncHandler, requiredAuth } from "@/shared";
import dbConnect from "@/shared/utils/dbConnect";
import User from "@/modules/auth/models/user.model";

const handler = async () => {
  const session = await requiredAuth();
  await dbConnect();

  const now = new Date();

  await User.findByIdAndUpdate(
    session.user.id,
    {
      lastActive: now,
      lastLogin: now,
    },
    { new: true }
  );

  return NextResponse.json(new apiResponse(200, "User activity updated", null), {
    status: 200,
  });
};

export const POST = asyncHandler(handler);
