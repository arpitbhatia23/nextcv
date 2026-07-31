import { apiError, dbConnect } from "@/shared";
import { redis } from "@/shared/utils/Redis";
import CoverLetter from "../model/cover-letter.model";
import mongoose from "mongoose";

export const getAllCoverLetter = async ({ userId }) => {
  console.log(userId);
  const cacheKey = `cover-letter:user:${userId}`;
  const cached = await redis.get(cacheKey);

  //   if (cached) {
  //     return JSON.parse(cached);
  //   }

  console.log("cover-letter not chaced");
  await dbConnect();
  const coverletters = await CoverLetter.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },

    {
      $facet: {
        draft: [{ $match: { status: "draft" } }],
        paid: [{ $match: { status: "paid" } }],
      },
    },
  ]);

  console.log();
  if (coverletters.length <= 0) {
    throw new apiError(404, "No resumes found");
  }
  await redis.set(cacheKey, JSON.stringify(coverletters), "EX", 1200);

  return coverletters;
};
