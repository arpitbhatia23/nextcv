"use client";

import { useEffect } from "react";
import Link from "next/link";
import safePostHog from "@/shared/utils/posthog";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.log(error);
    safePostHog.captureException(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] bg-[#F8FAFC] px-5 py-12 sm:px-8">
      <div className="mx-auto flex min-h-[60vh] max-w-5xl flex-col justify-center">
        {/* Error panel */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Page error
              </span>
            </div>
            <span className="text-xs text-slate-400">Error 500</span>
          </div>

          {/* Main content */}
          <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-xl">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                  <path
                    d="M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                We couldn't load this page.
              </h1>

              <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
                Something unexpected interrupted this page. Your resume data is not intentionally
                changed by this error. Please try loading the page again.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path
                      d="M20 7v5h-5M4.5 16a8 8 0 0 0 13.7 2.3L20 16M4 12a8 8 0 0 1 13.7-6.3L20 8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Reload this page
                </button>

                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Return to dashboard
                </Link>
              </div>
            </div>

            {/* Status illustration */}
            <div className="hidden h-44 w-44 items-center justify-center rounded-full bg-slate-50 md:flex">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-slate-200 bg-white shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" className="h-14 w-14 text-slate-300">
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path d="M3 9h18M8 4v5" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M12 13v3m0 1.5v.01"
                    stroke="#E11D48"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Panel footer */}
          <div className="border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:px-8">
            <p className="text-xs text-slate-400">
              {error?.digest
                ? `Reference ID: ${error.digest}`
                : "The error has been reported to help us improve NextCV."}
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} NextCV
        </p>
      </div>
    </main>
  );
}
