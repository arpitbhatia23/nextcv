"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ClarityComponent = dynamic(() => import("./clearity"), { ssr: false });
const GoogleAnalytics = dynamic(() => import("@/app/anlatyics"), {
  ssr: false,
});

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState("");

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");

    if (savedConsent) {
      setConsent(savedConsent);
      return;
    }

    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    setShow(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setConsent("rejected");
    setShow(false);
  };

  return (
    <>
      {consent === "accepted" && (
        <>
          <GoogleAnalytics />
          <ClarityComponent />
        </>
      )}

      {show && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-xl bg-white text-gray-800 px-4 py-3 rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs leading-snug">
              We use cookies to improve experience and analyze traffic.
            </p>

            <div className="flex gap-2 shrink-0">
              <button
                onClick={rejectCookies}
                className="px-3 py-1.5 text-xs rounded-lg border border-gray-300 hover:bg-gray-100 transition"
              >
                Reject
              </button>

              <button
                onClick={acceptCookies}
                className="px-4 py-1.5 text-xs rounded-lg bg-black text-white hover:bg-gray-900 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
