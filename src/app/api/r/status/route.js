import { getSharedResumeStatus } from "@/modules/shared-resume/services/getSharedResumeStatus";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await getSharedResumeStatus({ req });
};

export const GET = asyncHandler(handler);

