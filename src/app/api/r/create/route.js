import { createSharedResume } from "@/modules/shared-resume/services/createSharedResuem";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await createSharedResume({ req });
};

export const POST = asyncHandler(handler);
