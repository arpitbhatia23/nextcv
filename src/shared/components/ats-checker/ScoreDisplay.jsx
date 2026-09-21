import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

const ScoreDisplay = ({ score, recommendations = [] }) => {
  const isNextCV = score >= 90;

  const getScoreColor = (value) => {
    if (value >= 90) return "text-indigo-600";
    if (value >= 80) return "text-emerald-600";
    if (value >= 60) return "text-amber-600";
    return "text-rose-600";
  };

  const getScoreBg = (value) => {
    if (value >= 90) return "bg-indigo-50 border-indigo-200";
    if (value >= 80) return "bg-emerald-50 border-emerald-200";
    if (value >= 60) return "bg-amber-50 border-amber-200";
    return "bg-rose-50 border-rose-200";
  };

  const getStatus = (value) => {
    if (value >= 90) return "ATS Perfected";
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Average";
    return "Critically Low";
  };

  const status = getStatus(score);

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Score Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
          {isNextCV && (
            <div className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-200">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> ATS Verified
            </div>
          )}

          <div className="relative w-52 h-52 flex items-center justify-center mb-6">
            <svg
              className="w-full h-full transform -rotate-90 filter drop-shadow-xs"
              viewBox="0 0 192 192"
            >
              <circle
                className="text-slate-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="86"
                cx="96"
                cy="96"
              />
              <motion.circle
                className={getScoreColor(score)}
                strokeWidth="10"
                strokeDasharray={2 * Math.PI * 86}
                strokeDashoffset={2 * Math.PI * 86 * (1 - score / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="86"
                cx="96"
                cy="96"
                initial={{ strokeDashoffset: 2 * Math.PI * 86 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 86 * (1 - score / 100) }}
                transition={{ duration: 2, ease: "circOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center inset-0 justify-center">
              <span className={`text-6xl font-extrabold tracking-tighter ${getScoreColor(score)}`}>
                {score}
              </span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                ATS Compatibility
              </span>
            </div>
          </div>

          <div
            className={`px-6 py-2 rounded-2xl text-xs sm:text-sm font-extrabold uppercase tracking-wider border ${getScoreBg(score)} ${getScoreColor(score)}`}
          >
            {status}
          </div>

          <p className="text-slate-500 text-xs text-center mt-6 leading-relaxed max-w-70">
            {isNextCV
              ? "Your resume is highly optimized for modern ATS algorithms. You are ready to apply!"
              : "Significant improvements needed. Standard templates often fail ATS scans due to poor formatting."}
          </p>
        </div>

        {/* Detailed Analysis */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-[#071644] flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Sparkles className="w-4 h-4" />
              </div>
              Critical Analysis Report
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all"
                >
                  <div className="mt-0.5 shrink-0">
                    {rec.type === "success" ? (
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    ) : rec.type === "warning" ? (
                      <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                        <XCircle className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-slate-900 font-bold text-xs sm:text-sm leading-tight mb-1">
                      {rec.title}
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed">{rec.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {!isNextCV && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#071644] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
            >
              <div className="space-y-1 text-center md:text-left">
                <h4 className="font-bold text-white text-lg tracking-tight">
                  Want a <span className="text-indigo-400">90+ ATS Score</span>?
                </h4>
                <p className="text-slate-300 text-xs">
                  Switch to NextCV templates built for high-performance job applications starting at ₹49.
                </p>
              </div>
              <Link
                href="/"
                className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                Build Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
