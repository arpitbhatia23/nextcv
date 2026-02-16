"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileSearch, CheckCircle2, Zap } from "lucide-react";

const ATSFeatureSection = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>New Free Tool</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              Is Your Resume{" "}
              <span className="text-indigo-600">ATS-Friendly?</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              75% of resumes are rejected by Applicant Tracking Systems (ATS)
              before a human ever sees them. Our free tool checks your resume
              against key ATS criteria.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Instant score analysis",
                "Keyword gap detection",
                "Formatting & structure check",
                "Personalized improvement tips",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link
              href="/ats-resume-checker"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200"
            >
              Check My Resume Score
              <FileSearch className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-2xl" />
            <div className="relative bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8">
              {/* Mockup of the score display */}
              <div className="flex flex-col items-center">
                <div className="relative w-40 h-40 mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-slate-100"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="80"
                      cy="80"
                    />
                    <circle
                      className="text-green-500"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={2 * Math.PI * 70 * (1 - 0.85)}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="70"
                      cx="80"
                      cy="80"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-slate-800">
                      85
                    </span>
                    <span className="text-xs uppercase text-slate-400 font-semibold">
                      Score
                    </span>
                  </div>
                </div>

                <div className="w-full space-y-3">
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-3/4 rounded-full" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 font-medium">Keywords</span>
                    <span className="text-indigo-600 font-bold">Good</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full rounded-full" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 font-medium">
                      Formatting
                    </span>
                    <span className="text-green-600 font-bold">Perfect</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ATSFeatureSection;
