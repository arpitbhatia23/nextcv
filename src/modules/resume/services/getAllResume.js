import { User } from "@/modules/auth";
import { apiError, dbConnect } from "@/shared";
import { redis } from "@/shared/utils/Redis";
import mongoose from "mongoose";

export const getAllResume = async ({ userId }) => {
  const cacheKey = `resumes:user:${userId}`;
  console.time("redis");
  const cached = await redis.get(cacheKey);
  console.timeEnd("redis");

  if (cached) {
    return JSON.parse(cached);
  }

  console.log("resuem not chaced");
  await dbConnect();
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
  await redis.set(cacheKey, JSON.stringify(resumes), "EX", 1200);

  return resumes;
};
