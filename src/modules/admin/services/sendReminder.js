import { User } from "@/modules/auth";
import { apiResponse } from "@/shared";
import { ReminderEmail } from "@/templates/email/remiderEmail";
import { NextResponse } from "next/server";

export const sendReminder = async () => {
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
