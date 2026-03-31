import { User } from "@/modules/auth";
import { apiError } from "@/shared";
import mongoose from "mongoose";

export const getAllResume = async ({ userId }) => {
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
  return resumes;
};
