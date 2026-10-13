import { toggleSharedResume } from "@/modules/shared-resume/services/toggleSharedResume";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await toggleSharedResume({ req });
};

export const POST = asyncHandler(handler);
export const PATCH = asyncHandler(handler);
