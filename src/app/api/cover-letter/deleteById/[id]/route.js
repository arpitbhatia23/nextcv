import dbConnect from "@/shared/utils/dbConnect";
import apiError from "@/shared/utils/apiError";

import { NextResponse } from "next/server";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { requiredAuth } from "@/shared";
import { deleteCoverLetterById } from "@/modules/cover-letter/services/deleteCoverLetterByID";
const handler = async (req, { params }) => {
  await dbConnect();
  const { id } = await params;
  // const searchParams = req.nextUrl.searchParams;
  // const id = searchParams.get("id");

  if (!id) {
    throw new apiError(400, "coverletter ID is required");
  }
  const session = await requiredAuth();

  const userId = session.user.id;
  await deleteCoverLetterById({ id, userId });
  return NextResponse.json(new apiResponse(200, "coverletter deleted successfully"));
};
export const DELETE = asyncHandler(handler);
