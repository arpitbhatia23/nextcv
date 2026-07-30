import CoverLetter from "@/modules/cover-letter/model/cover-letter.model";
import { order } from "@/modules/cover-letter/services/order";
import { apiResponse, requiredAuth } from "@/shared";
import { ApiError } from "@google/genai";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const createCoverLetterOrder = async data => {
  const session = await requiredAuth();
  const userId = session.user.id;
  const amount = 7900;
  if (!data.draftId) {
    const coverletter = await CoverLetter.create({
      ...data,
      userId: userId,
    });
    if (!coverletter) {
      throw new ApiError(500, "some thing went wrong while creating coverleter");
    }
    console.log("create coverleter");
  }
  console.log(data.draftId);
  const coverletter = await CoverLetter.findById(new mongoose.Types.ObjectId(data.draftId));
  console.log("find coverletter");
  const res = await order({ userId, amount, coverLetterId: coverletter._id });

  return NextResponse.json(new apiResponse(200, "Order initiated", res));
};
