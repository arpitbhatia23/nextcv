import Resume from "@/modules/resume/models/resume.model";
import { SharedResume } from "@/modules/shared-resume/model/shared-resume";
import { dbConnect } from "@/shared";

export const getSharedResumeBySlug = async slug => {
  if (!slug) return null;

  await dbConnect();

  const sharedResume = await SharedResume.findOne({
    slug: slug.toLowerCase().trim(),
    isPublic: true,
  }).lean();

  if (!sharedResume) return null;

  const resume = await Resume.findById(sharedResume.resumeId).lean();
  if (!resume) return null;

  return {
    sharedResume: JSON.parse(JSON.stringify(sharedResume)),
    resume: JSON.parse(JSON.stringify(resume)),
  };
};
