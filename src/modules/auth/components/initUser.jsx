"use client";

import { userStore } from "@/store/user.store";
import { useEffect } from "react";

export function InitUser({ session }) {
  const setUser = userStore(state => state.setUser);

  useEffect(() => {
    if (session?.user) {
      setUser(session.user);
    } else {
      setUser({
        id: "guest",
        name: "Guest User",
        email: null,
        image: null,
        isGuest: true,
        role: "guest",
      });
    }
  }, [session]);

  return null;
}
