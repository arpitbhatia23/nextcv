"use client";

import { useEffect } from "react";
import Link from "next/link";
import safePostHog from "@/shared/utils/posthog";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    safePostHog.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="relative flex min-h-screen flex-col overflow-hidden bg-white text-slate-900">
          {/* Header */}
          <header className="flex h-20 items-center justify-between border-b border-slate-100 px-6 sm:px-12 lg:px-20">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
                N
              </div>
              <span className="text-xl font-bold tracking-tight">
                Next<span className="text-blue-600">CV</span>
              </span>
            </Link>

            <Link
              href="/"
              className="text-sm font-medium text-slate-500 transition hover:text-blue-600"
            >
              Back to homepage
            </Link>
          </header>

          {/* Main content */}
          <section className="relative flex flex-1 items-center px-6 py-16 sm:px-12 lg:px-20">
            <div className="pointer-events-none absolute right-0 top-1/2 hidden h-120 w-120 -translate-y-1/2 rounded-full bg-blue-50/70 lg:block" />

            <div className="relative grid w-full max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
              {/* Text content */}
              <div className="max-w-xl">
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3.5 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-red-600">
                    Application error
                  </span>
                </div>

                <h1 className="text-5xl font-extrabold leading-[1.12] tracking-tight sm:text-6xl">
                  Oops!
                  <span className="mt-2 block text-blue-600">Something went wrong.</span>
                </h1>

                <p className="mt-7 max-w-lg text-base leading-8 text-slate-500 sm:text-lg">
                  We ran into an unexpected problem while loading your experience. Your work matters
                  to us, and we're working to make things right.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={reset}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
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
                    Try again
                  </button>

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
                  >
                    Go to homepage
                  </Link>
                </div>

                {error?.digest && (
                  <p className="mt-8 text-xs text-slate-400">Error reference: {error.digest}</p>
                )}
              </div>

              {/* Illustration */}
              <div className="relative hidden items-center justify-center lg:flex">
                <div className="relative flex h-105 w-full max-w-120 items-center justify-center rounded-xl border border-blue-100 bg-[#F7F9FF]">
                  <div className="absolute left-10 top-10 h-3 w-3 rounded-full bg-blue-300" />
                  <div className="absolute right-14 top-20 h-2 w-2 rounded-full bg-blue-400" />
                  <div className="absolute bottom-16 left-16 h-2 w-2 rounded-full bg-blue-300" />

                  <div className="relative flex flex-col items-center">
                    <div className="flex h-36 w-36 items-center justify-center rounded-xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5">
                      <svg viewBox="0 0 100 100" fill="none" className="h-20 w-20">
                        <path
                          d="M50 12 88 80H12L50 12Z"
                          fill="#EFF6FF"
                          stroke="#2563EB"
                          strokeWidth="4"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M50 36V55"
                          stroke="#2563EB"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="68" r="3" fill="#2563EB" />
                      </svg>
                    </div>

                    <p className="mt-8 text-xl font-bold text-slate-800">
                      Page temporarily unavailable
                    </p>
                    <p className="mt-2 text-sm text-slate-500">Let's get you back on track.</p>
                  </div>

                  <div className="absolute -bottom-5 right-8 rounded-2xl border border-slate-100 bg-white px-5 py-3 shadow-lg shadow-slate-900/5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                          <path
                            d="M12 3v18M3 12h18"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">Keep moving forward</p>
                        <p className="text-[11px] text-slate-400">Your next opportunity awaits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col gap-3 border-t border-slate-100 px-6 py-6 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-20">
            <p>© {new Date().getFullYear()} NextCV. Built for your next career move.</p>
            <p>We appreciate your patience.</p>
          </footer>
        </main>
      </body>
    </html>
  );
}
