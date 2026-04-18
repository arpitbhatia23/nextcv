import { User } from "@/modules/auth";
import Resume from "../models/resume.model";
import { apiError } from "@/shared";
export const deleteResumeById = async ({ id, userId }) => {
  const resume = await Resume.findOne({
    _id: id,
  });

  if (!resume) {
    throw new apiError(404, "Resume not found");
  }
  await Resume.deleteOne({ _id: id });
  await User.findByIdAndUpdate(userId, { $pull: { resume: id } });
};
