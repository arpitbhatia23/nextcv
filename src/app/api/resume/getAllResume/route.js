import { NextResponse } from "next/server";
import { apiResponse } from "@/shared/utils/apiResponse";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import { requiredAuth } from "@/shared";
import { getAllResume } from "@/modules/resume";
const handler = async () => {
  const session = await requiredAuth();

  const userId = session.user.id;
  const resumes = await getAllResume({ userId });

  return NextResponse.json(new apiResponse(200, "Resumes fetched successfully", resumes[0]), {
    status: 200,
  });
};

export const GET = asyncHandler(handler);
