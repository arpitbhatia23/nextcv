import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const ScoreDisplay = ({ score, recommendations = [] }) => {
  const isNextCV = score >= 90;

  const getScoreColor = value => {
    if (value >= 90) return "text-indigo-600";
    if (value >= 80) return "text-emerald-600";
    if (value >= 60) return "text-amber-600";
    return "text-rose-600";
  };

  const getScoreBg = value => {
    if (value >= 90) return "bg-indigo-50 border-indigo-100";
    if (value >= 80) return "bg-emerald-50 border-emerald-100";
    if (value >= 60) return "bg-amber-50 border-amber-100";
    return "bg-rose-50 border-rose-100";
  };

  const getStatus = value => {
    if (value >= 90) return "ATS Perfected";
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Average";
    return "Critically Low";
  };

  const status = getStatus(score);

  return (
    <div className="w-full mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Score Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl shadow-slate-200/50 flex flex-col items-center justify-center relative overflow-hidden">
          {isNextCV && (
            <div className="absolute top-4 right-4 bg-indigo-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg shadow-indigo-200">
              <CheckCircle className="w-3 h-3" /> Verified Template
            </div>
          )}

          <div className="relative w-56 h-56 flex items-center justify-center mb-8">
            <svg
              className="w-full h-full transform -rotate-90 filter drop-shadow-sm"
              viewBox="0 0 192 192"
            >
              <circle
                className="text-slate-50"
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
              <span className={`text-7xl font-black tracking-tighter ${getScoreColor(score)}`}>
                {score}
              </span>
              <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                ATS Compatibility
              </span>
            </div>
          </div>

          <div
            className={`px-6 py-2 rounded-2xl text-sm font-black uppercase tracking-wider border-2 ${getScoreBg(score)} ${getScoreColor(score)}`}
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
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-50 rounded-xl flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-indigo-600" />
              </div>
              Critical Analysis Report
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="mt-1">
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
                    <p className="text-slate-900 font-bold text-sm leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                      {rec.title}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed">{rec.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {!isNextCV && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-1 rounded-4xl bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 shadow-xl shadow-indigo-200/50"
            >
              <div className="bg-white/95 backdrop-blur-sm rounded-[1.8rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <h4 className="font-black text-slate-900 text-lg tracking-tight">
                    Want a <span className="text-indigo-600">90+ Score</span>?
                  </h4>
                  <p className="text-slate-500 text-xs font-medium">
                    Switch to NextCV templates. Built for high-performance job applications.
                  </p>
                </div>
                <Link
                  href="/dashboard/resume"
                  className="w-full md:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black rounded-2xl transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group"
                >
                  Build for Free{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
