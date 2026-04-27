import dbConnect from "@/shared/utils/dbConnect";
import apiError from "@/shared/utils/apiError";

import { NextResponse } from "next/server";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { requiredAuth } from "@/shared";
import { deleteResumeById } from "@/modules/resume";
import { redis } from "@/shared/utils/Redis";
const handler = async req => {
  await dbConnect();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    throw new apiError(400, "Resume ID is required");
  }
  const session = await requiredAuth();

  const userId = session.user.id;
  const cacheKey = `resumes:user:${userId}`;
  console.log(id);
  await deleteResumeById({ id, userId });
  redis.del(cacheKey);
  return NextResponse.json(new apiResponse(200, "Resume deleted successfully"));
};
export const DELETE = asyncHandler(handler);
