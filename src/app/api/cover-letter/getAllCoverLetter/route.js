import { getAllCoverLetter } from "@/modules/cover-letter/services/getallCoverletter";
import { apiResponse, asyncHandler, requiredAuth } from "@/shared";
import { NextResponse } from "next/server";

const handler = async () => {
  const session = await requiredAuth();

  const userId = session.user.id;
  const coverleter = await getAllCoverLetter({ userId });
  console.log(coverleter.paid);
  return NextResponse.json(new apiResponse(200, "Resumes fetched successfully", coverleter[0]), {
    status: 200,
  });
};

export const GET = asyncHandler(handler);
