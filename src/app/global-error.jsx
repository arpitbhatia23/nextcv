"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error(error);

    if (process.env.NODE_ENV === "production") {
      import("@sentry/nextjs").then(Sentry => {
        Sentry.captureException(error);
      });
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="max-w-xl w-full">
            <div className="mx-auto mb-8 w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center text-4xl">
              ⚠️
            </div>

            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
              Critical System Interruption
            </h1>

            <p className="text-slate-400 text-base mb-10 leading-relaxed">
              A critical error occurred. The issue has been reported.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold text-sm"
              >
                Try Again
              </button>

              <Link
                href="/"
                className="px-8 py-4 bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-sm"
              >
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
