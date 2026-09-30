import { createPortfolio } from "@/modules/portfolio/services/createportfolio";
import { asyncHandler } from "@/shared";

const handler = async req => {
  return await createPortfolio({ req });
};

export const POST = asyncHandler(handler);
