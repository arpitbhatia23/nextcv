import { apiError } from "@/shared";
import mongoose from "mongoose";
import Resume from "../models/resume.model";

export const getResumeById = async ({ id }) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new apiError(400, "invalid resume id");
  }

  const resumeData = await Resume.findById(id);

  if (!resumeData) {
    throw new apiError(404, "resume not found");
  }

  return resumeData;
};
