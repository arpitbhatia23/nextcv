import { aiResuemGenerator } from "@/modules/ai/services/aiResume";
import { asyncHandler } from "@/shared/utils/asyncHandler";

// API Route handler
const handler = async req => {
  const { resumeData } = await req.json();
  return await aiResuemGenerator({ resumeData });
};

export const POST = asyncHandler(handler);
