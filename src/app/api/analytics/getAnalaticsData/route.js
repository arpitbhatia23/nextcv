import dbConnect from "@/shared/utils/dbConnect";

import { asyncHandler } from "@/shared/utils/asyncHandler";
import { getAllAnalytics } from "@/modules/admin/services/getAllAnalatics";
import { apiError } from "@/shared";

// Helper function to get date range based on time filter

const handler = async req => {
  const { searchParams } = new URL(req.url);
  const timeRange = searchParams.get("timeRange") || "all";
  const customStart = searchParams.get("customStart");
  const customEnd = searchParams.get("customEnd");

  try {
    await dbConnect();
    return await getAllAnalytics({ timeRange, customStart, customEnd });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw new apiError(500, "Failed to fetch analytics data");
  }
};

export const GET = asyncHandler(handler);
