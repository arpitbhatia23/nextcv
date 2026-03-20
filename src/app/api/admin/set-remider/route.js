import User from "@/models/user.model";
import { ReminderEmail } from "@/templates/email/remiderEmail";
import { apiResponse } from "@/utils/apiResponse";
import { asyncHandler } from "@/utils/asyncHandler";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
const handler = async () => {
  await dbConnect();

  const users = await User.find({
    resume: { $size: 0 },
    $or: [{ reminderCount: { $lt: 3 } }, { reminderCount: { $exists: false } }],
  });

  const promises = users.map(async user => {
    await ReminderEmail(user.email, user.name);

    user.reminderCount = (user.reminderCount || 0) + 1;
    await user.save();
  });

  await Promise.all(promises);

  return NextResponse.json(new apiResponse(200, "remider send scuesfully"));
};

export const GET = asyncHandler(handler);
