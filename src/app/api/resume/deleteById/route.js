import dbConnect from "@/utils/dbConnect";
import apiError from "@/utils/apiError";
import authOptions from "../../auth/options";
import { getServerSession } from "next-auth";
import Resume from "@/models/resume.model";
import { NextResponse } from "next/server";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
const handler = async (req) => {
  await dbConnect();
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    throw new apiError(400, "Resume ID is required");
  }
  const session = await getServerSession(authOptions);

  if (!session && !session.user) {
    throw new apiError(403, "Unauthorized");
  }

  await Resume.findByIdAndDelete(id);

  return NextResponse.json(new apiResponse(200, "Resume deleted successfully"));
};
export const DELETE = asyncHandler(handler);
