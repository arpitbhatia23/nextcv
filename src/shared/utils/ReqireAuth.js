import "server-only";

import authOptions from "@/modules/auth/services/options";
import { getServerSession } from "next-auth";
import apiError from "./apiError";

export const requiredAuth = async () => {
  const session = await getServerSession(authOptions);

  if (!session && !session?.user) {
    throw new apiError(401, "unauthorized user");
  }
  return session;
};
