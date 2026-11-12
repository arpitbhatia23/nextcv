"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { AuthOverlay } from "../components/AuthOverlay";

export function useAuthGuard() {
  const { status } = useSession();
  const [showAuth, setShowAuth] = useState(false);

  const requireAuth = callback => {
    if (status === "loading") return false;

    if (status !== "authenticated") {
      setShowAuth(true);
      return false;
    }

    if (callback) callback();

    return true;
  };

  const authOverlay = <AuthOverlay open={showAuth} onClose={() => setShowAuth(false)} />;

  return {
    requireAuth,
    authOverlay,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    closeAuth: () => setShowAuth(false),
  };
}
