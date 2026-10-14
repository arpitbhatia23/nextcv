import { getPortfolioStatus } from "@/modules/portfolio/services/getPortfolioStatus";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await getPortfolioStatus({ req });
};

export const GET = asyncHandler(handler);

