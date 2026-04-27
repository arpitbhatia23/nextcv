import { asyncHandler } from "@/shared/utils/asyncHandler";
import dbConnect from "@/shared/utils/dbConnect";
import { requiredAuth } from "@/shared";
import { saveResumeAsDraft } from "@/modules/resume";

const handler = async req => {
  // ✅ Connect DB once
  await dbConnect();

  const data = await req.json();
  // ✅ Session check
  const session = await requiredAuth();

  const userId = session.user.id;
  return await saveResumeAsDraft({ data, userId });
};

export const POST = asyncHandler(handler);
