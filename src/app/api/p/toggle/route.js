import { togglePortfolio } from "@/modules/portfolio/services/togglePortfolio";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await togglePortfolio({ req });
};

export const POST = asyncHandler(handler);
export const PATCH = asyncHandler(handler);
