import { deleteSharedResume } from "@/modules/shared-resume/services/deleteSharedResume";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await deleteSharedResume({ req });
};

export const DELETE = asyncHandler(handler);
export const POST = asyncHandler(handler);
