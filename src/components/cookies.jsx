"use client";

import GoogleAnalytics from "@/app/anlatyics";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [consent, setConsent] = useState("");

  useEffect(() => {
    const savedConsent = localStorage.getItem("cookie-consent");
    if (!savedConsent) {
      setShow(true);
    } else {
      setConsent(savedConsent);
    }
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
      {consent === "accepted" && <GoogleAnalytics />}

      {show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl bg-white text-gray-800 p-6 rounded-2xl shadow-2xl border border-gray-200 z-50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm leading-relaxed">
              We use cookies to improve your experience and analyze traffic. You
              can accept or reject non-essential cookies.
            </p>

            <div className="flex gap-3 shrink-0">
              <button
                onClick={rejectCookies}
                className="px-4 py-2 text-sm rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Reject
              </button>

              <button
                onClick={acceptCookies}
                className="px-5 py-2 text-sm rounded-xl bg-black text-white hover:bg-gray-900 transition shadow"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
