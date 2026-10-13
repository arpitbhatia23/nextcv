import { deletePortfolio } from "@/modules/portfolio/services/deletePortfolio";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await deletePortfolio({ req });
};

export const DELETE = asyncHandler(handler);
export const POST = asyncHandler(handler);
