import Resume from "@/modules/resume/models/resume.model";
import { SharedResume } from "@/modules/shared-resume/model/shared-resume";
import { dbConnect } from "@/shared";
import { portfolio } from "../model/portfolio";

export const getPortfolioBySlug = async slug => {
  if (!slug) return null;

  await dbConnect();

  const cleanSlug = slug.toLowerCase().trim();

  // Try portfolio collection first
  let record = await portfolio
    .findOne({
      slug: cleanSlug,
      isPublic: true,
    })
    .lean();

  // Fallback to SharedResume collection for unified experience
  if (!record) {
    record = await SharedResume.findOne({
      slug: cleanSlug,
      isPublic: true,
    }).lean();
  }

  if (!record) return null;

  const resume = await Resume.findById(record.resumeId).lean();
  if (!resume) return null;

  return {
    sharedPortfolio: JSON.parse(JSON.stringify(record)),
    resume: JSON.parse(JSON.stringify(resume)),
  };
};

export const getSharedResumeBySlug = getPortfolioBySlug;
