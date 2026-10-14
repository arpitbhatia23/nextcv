import Resume from "@/modules/resume/models/resume.model";
import { SharedResume } from "@/modules/shared-resume/model/shared-resume";
import { dbConnect } from "@/shared";
import { redis } from "@/shared/utils/Redis";
import { portfolio } from "../model/portfolio";

export const getPortfolioBySlug = async slug => {
  if (!slug) return null;

  const cleanSlug = slug.toLowerCase().trim();
  const cacheKey = `portfolio:slug:${cleanSlug}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error("Redis get error for portfolio slug:", error);
  }

  await dbConnect();

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

  const result = {
    sharedPortfolio: JSON.parse(JSON.stringify(record)),
    resume: JSON.parse(JSON.stringify(resume)),
  };

  try {
    await redis.set(cacheKey, JSON.stringify(result), "EX", 1800);
  } catch (error) {
    console.error("Redis set error for portfolio slug:", error);
  }

  return result;
};

export const getSharedResumeBySlug = getPortfolioBySlug;
