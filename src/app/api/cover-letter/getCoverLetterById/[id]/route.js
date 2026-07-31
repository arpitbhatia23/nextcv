import { dbConnect, requiredAuth } from "@/shared";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { apiResponse } from "@/shared/utils/apiResponse";
import { NextResponse } from "next/server";
import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";

const handler = async (req, { params }) => {
  const { id } = await params;
  await requiredAuth();
  await dbConnect();
  const CoverLetterdata = await CoverLetter.findById(id);
  return NextResponse.json(new apiResponse(200, "resume found sucessfull", CoverLetterdata), {
    status: 200,
  });
};

export const GET = asyncHandler(handler);
