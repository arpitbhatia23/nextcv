"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AuthOverlay } from "../components/AuthOverlay";

const HEARTBEAT_INTERVAL = 60 * 1000;

export function useAuthGuard() {
  const { status, data } = useSession();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const pingLastActive = async () => {
      try {
        await fetch("/api/user/heartbeat", {
          method: "POST",
          cache: "no-store",
        });
      } catch (error) {
        console.error("Heartbeat update failed:", error);
      }
    };

    pingLastActive();
    const intervalId = setInterval(pingLastActive, HEARTBEAT_INTERVAL);

    const handleVisibility = () => {
      if (!document.hidden) {
        pingLastActive();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [status, data?.user?.id]);

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
