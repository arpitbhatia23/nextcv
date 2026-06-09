import { apiError, requiredAuth } from "@/shared";
import Resume from "../models/resume.model";
import { redis } from "@/shared/utils/Redis";

export const updateResume = async ({ id, updateData }) => {
  const session = await requiredAuth();

  const cacheKey = `resumes:user:${session.user.id}`;

  const updatedResume = await Resume.findByIdAndUpdate(
    id,
    { $set: updateData },
    { returnDocument: "after", runValidators: true }
  );

  if (!updatedResume) {
    throw new apiError(404, "Resume not found");
  }

  await redis.del(cacheKey);

  return updatedResume;
};
