import { apiError } from "@/shared";
import Resume from "../models/resume.model";
import { redis } from "@/shared/utils/Redis";

export const updateResume = async ({ id, updateData }) => {
  const cacheKey = `resumebyID:${id}`;

  const updatedResume = await Resume.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedResume) {
    throw new apiError(404, "Resume not found");
  }

  await redis.set(cacheKey, JSON.stringify(updatedResume), "EX", 1200);

  return updatedResume;
};
