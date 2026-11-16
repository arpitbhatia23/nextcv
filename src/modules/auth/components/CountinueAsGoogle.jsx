"use client";

import { useEffect } from "react";
import { getSession, signIn } from "next-auth/react";

const CountinueAsGoogle = ({ clientId }) => {
  useEffect(() => {
    if (!clientId) return;

    let cancelled = false;
    let script;

    const initializePrompt = () => {
      if (cancelled || !window.google?.accounts?.id) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: async ({ credential }) => {
          if (!credential || cancelled) return;

          const result = await signIn("google-one-tap", {
            idToken: credential,
            callbackUrl: "/dashboard/builder",
            redirect: false,
          });

          if (result?.ok && result.url) {
            window.location.assign(result.url);
          }
        },
        cancel_on_tap_outside: true,
      });
      window.google.accounts.id.prompt();
    };

    getSession().then(session => {
      if (cancelled || session) return;

      if (window.google?.accounts?.id) {
        initializePrompt();
        return;
      }

      script = document.getElementById("google-identity-services");
      if (!script) {
        script = document.createElement("script");
        script.id = "google-identity-services";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", initializePrompt, { once: true });
    });

    return () => {
      cancelled = true;
      script?.removeEventListener("load", initializePrompt);
    };
  }, [clientId]);

  return null;
};

export default CountinueAsGoogle;
