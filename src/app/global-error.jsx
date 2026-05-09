"use client";
import React, { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { motion } from "framer-motion";
import { ShieldAlert, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center text-white selection:bg-rose-500/30">
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[160px] opacity-50" />
          </div>

          <div className="relative z-10 max-w-xl w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mb-10 flex justify-center"
            >
              <div className="w-24 h-24 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 flex items-center justify-center text-rose-500 shadow-2xl shadow-rose-900/20">
                <ShieldAlert className="w-12 h-12" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-linear-to-b from-white to-white/60">
                Critical System <br /> Interruption
              </h1>
              <p className="text-slate-400 text-lg mb-12 leading-relaxed">
                A critical error occurred in the application core. Our security systems have isolated the fault.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => reset()}
                className="px-10 py-5 bg-white text-slate-900 rounded-3xl font-black text-sm transition-all shadow-xl shadow-white/10 flex items-center justify-center gap-3 hover:scale-105 active:scale-95"
              >
                <RefreshCcw className="w-4 h-4" />
                Initialize Recovery
              </button>
              <Link
                href="/"
                className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-3xl font-black text-sm transition-all flex items-center justify-center gap-3"
              >
                <Home className="w-4 h-4" />
                Return to Port
              </Link>
            </motion.div>
          </div>

          <div className="absolute bottom-12 left-0 w-full flex flex-col items-center gap-4 opacity-40">
            <div className="h-px w-24 bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/50">
              NextCV Kernel Protection
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}

