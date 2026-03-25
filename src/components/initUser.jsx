"use client";

import { userStore } from "@/store/user.store";
import { useEffect } from "react";

export function InitUser({ session }) {
  const setUser = userStore(state => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    }
  }, [session]);

  return null;
}
