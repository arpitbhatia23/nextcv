import Resume from "@/modules/resume/models/resume.model";
import { SharedResume } from "@/modules/shared-resume/model/shared-resume";
import { dbConnect } from "@/shared";
import { redis } from "@/shared/utils/Redis";

export const getSharedResumeBySlug = async slug => {
  if (!slug) return null;

  const cleanSlug = slug.toLowerCase().trim();
  const cacheKey = `sharedresume:slug:${cleanSlug}`;

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error("Redis get error for shared resume slug:", error);
  }

  await dbConnect();

  const sharedResume = await SharedResume.findOne({
    slug: cleanSlug,
    isPublic: true,
  }).lean();

  if (!sharedResume) return null;

  const resume = await Resume.findById(sharedResume.resumeId).lean();
  if (!resume) return null;

  const result = {
    sharedResume: JSON.parse(JSON.stringify(sharedResume)),
    resume: JSON.parse(JSON.stringify(resume)),
  };

  try {
    await redis.set(cacheKey, JSON.stringify(result), "EX", 1800);
  } catch (error) {
    console.error("Redis set error for shared resume slug:", error);
  }

  return result;
};
