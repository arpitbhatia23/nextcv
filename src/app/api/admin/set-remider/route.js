import { sendReminder } from "@/modules/admin";
import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";

const getHandler = async req => {
  await dbConnect();
  const url = new URL(req?.url || "http://localhost", "http://localhost");
  const dryRun = url.searchParams.get("dryRun") === "true";
  const force = url.searchParams.get("force") === "true";
  const limitParam = url.searchParams.get("limit");
  const limit = limitParam ? parseInt(limitParam, 10) : null;
  const targetUserId = url.searchParams.get("userId") || null;
  const maxRemindersParam = url.searchParams.get("maxReminders");
  const maxReminders = maxRemindersParam ? parseInt(maxRemindersParam, 10) : 3;

  return await sendReminder({
    dryRun,
    force,
    limit,
    targetUserId,
    maxReminders,
  });
};

const postHandler = async req => {
  await dbConnect();
  let body = {};
  try {
    body = await req.json();
  } catch {
    body = {};
  }
  return await sendReminder(body);
};

export const GET = asyncHandler(getHandler);
export const POST = asyncHandler(postHandler);
