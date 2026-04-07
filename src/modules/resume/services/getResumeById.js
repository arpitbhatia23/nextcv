import { apiError, dbConnect } from "@/shared";
import mongoose from "mongoose";
import Resume from "../models/resume.model";
import { redis } from "@/shared/utils/Redis";

export const getResumeById = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "invalid resume id");
  }
  const cacheKey = `resumebyID:${id}`;
  console.time("redis");
  const cached = await redis.get(cacheKey);
  console.timeEnd("redis");
  if (cached) {
    return JSON.parse(cached);
  }

  await dbConnect();

  const resumeData = await Resume.findById(id);

  if (!resumeData) {
    throw new apiError(404, "resume not found");
  }

  await redis.set(cacheKey, JSON.stringify(resumeData), "EX", 1200);

  return resumeData;
};
