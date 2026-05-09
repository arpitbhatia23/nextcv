"use client";
import React from "react";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden px-6">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Logo / Icon */}

        {/* Text Content */}
        <div>
          <h1 className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter mb-4 opacity-10">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
            Oops! It seems the page you're looking for has vanished into the digital void. Let's get
            you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-black text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        {/* Search Suggestion */}
        <div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-16 flex items-center gap-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest"
        >
          <Search className="w-4 h-4" />
          Try searching for "ATS Checker" or "Templates"
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center opacity-30 pointer-events-none">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
          NextCV Professional Engine
        </p>
      </div>
    </div>
  );
}
