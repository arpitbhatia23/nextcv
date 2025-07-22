import { getServerSession } from "next-auth";
import authOptions from "../../auth/options";
import { ApiError } from "next/dist/server/api-utils";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user.model";
import apiError from "@/utils/apiError";
import { NextResponse } from "next/server";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import mongoose from "mongoose";
const handler = async (req) => {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (!session && !session.user) {
    throw new ApiError(401, "Unauthorized");
  }

  const userId = session.user._id;

  console.log(userId);
  const resumes = await User.aggregate([
    [
      {
        $match:
          /**
           * query: The query in MQL.
           */
          {
            _id: new mongoose.Types.ObjectId(userId),
          },
      },
      {
        $lookup: {
          from: "resumes",
          localField: "resume",
          foreignField: "_id",
          as: "resumedata",
        },
      },
      {
        $unwind: {
          path: "$resumedata",
        },
      },
      {
        $facet: {
          draft: [
            {
              $match: {
                "resumedata.status": "draft",
              },
            },
            { $project: { resumedata: 1, _id: 0 } },
          ],
          paid: [
            {
              $match: {
                "resumedata.status": "paid",
              },
            },
            { $project: { resumedata: 1, _id: 0 } },
          ],
        },
      },
    ],
  ]);

  if (resumes.length <= 0) {
    throw new apiError(404, "No resumes found");
  }

  return NextResponse.json(
    new apiResponse(200, "Resumes fetched successfully", resumes[0]),
    { status: 200 }
  );
};

export const GET = asyncHandler(handler);
