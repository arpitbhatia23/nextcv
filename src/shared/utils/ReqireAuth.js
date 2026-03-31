import { authOptions } from "@/modules/auth";
import { getServerSession } from "next-auth";
import apiError from "./apiError";

export const requiredAuth = () => {
  const session = getServerSession(authOptions);

  if (!session && !session?.user) {
    throw new apiError(401, "unauthorized user");
  }
  return session;
};
