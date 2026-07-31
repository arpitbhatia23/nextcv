import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";
import { apiError, apiResponse, asyncHandler, dbConnect, requiredAuth } from "@/shared";
import { NextResponse } from "next/server";

const handler = async req => {
  const { data } = await req.json();
  await dbConnect();
  const session = await requiredAuth();

  const userId = session.user.id;

  const draft = await CoverLetter.create({ ...data, userId: userId });
  if (!draft) {
    throw new apiError(500, "something went wrong while saving draft");
  }
  return NextResponse.json(new apiResponse(200, "draft save sucess fully", draft._id));
};

export const POST = asyncHandler(handler);
