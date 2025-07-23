import apiError from "@/utils/apiError";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const handler = async (req, { params }) => {
  const id = await params.id;

  if (!id) {
    throw new apiError(400, "Resume ID is required");
  }
  await dbConnect();
  const updateData = await req.json();

  // Update only the provided fields
  const updatedResume = await Resume.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  console.log(updatedResume);

  if (!updatedResume) {
    throw new apiError(404, "Resume not found");
  }

  return NextResponse.json(
    new apiResponse(200, "Resume updated successfully", updatedResume),
    { status: 200 }
  );
};

export const PATCH = asyncHandler(handler);
