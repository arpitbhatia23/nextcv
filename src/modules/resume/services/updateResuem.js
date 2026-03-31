import { apiError } from "@/shared";
import Resume from "../models/resume.model";

export const updateResume = async ({ id, updateData }) => {
  const updatedResume = await Resume.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedResume) {
    throw new apiError(404, "Resume not found");
  }
  return updateResume;
};
