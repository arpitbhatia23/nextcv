"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);

    if (process.env.NODE_ENV === "production") {
      import("@sentry/nextjs").then(Sentry => {
        Sentry.captureException(error);
      });
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-xl w-full">
        <div className="mx-auto mb-8 w-20 h-20 bg-white rounded-3xl shadow border border-rose-100 flex items-center justify-center text-4xl">
          ⚠️
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
          Something Went Wrong
        </h1>

        <p className="text-slate-500 text-base mb-8 leading-relaxed">
          An unexpected error occurred. The issue has been reported.
        </p>

        {error?.message && (
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 text-left">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
              Technical Details
            </p>
            <p className="text-xs font-mono text-rose-600 break-all bg-rose-50 p-3 rounded-xl">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-sm"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-bold text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
