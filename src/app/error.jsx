"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCcw, Home, AlertCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";
import * as Sentry from "@sentry/nextjs";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-100/50 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-xl w-full">
        {/* Animated Error Icon */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-white rounded-3xl shadow-2xl shadow-rose-100 border border-rose-50 flex items-center justify-center text-rose-500">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-rose-600 rounded-xl flex items-center justify-center text-white shadow-lg"
            >
              <AlertCircle className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Something Went Wrong
          </h1>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            Our systems encountered an unexpected glitch. Don't worry, our engineers have been notified and are already looking into it.
          </p>

          {error && (
            <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-10 text-left overflow-hidden">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Technical Details</p>
              <p className="text-xs font-mono text-rose-600 break-all bg-rose-50 p-3 rounded-xl border border-rose-100">
                {error.message || "Unknown runtime error occurred"}
              </p>
            </div>
          )}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => reset()}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-2 group"
          >
            <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-black text-sm transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
        </motion.div>
      </div>

      {/* Security Badge */}
      <div className="mt-16 flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em]">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Encrypted Session Protections Active
      </div>
    </div>
  );
}
