import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, XCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const ScoreDisplay = ({ score, missingKeywords = [], recommendations = [] }) => {
  const getScoreColor = (value) => {
    if (value >= 80) return "text-green-600";
    if (value >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (value) => {
    if (value >= 80) return "bg-green-100";
    if (value >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getStatus = (value) => {
    if (value >= 80) return "Excellent";
    if (value >= 60) return "Good";
    return "Needs Improvement";
  };

  const status = getStatus(score);

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mt-8">
      <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {/* Score Circle */}
        <div className="flex flex-col items-center justify-center md:border-r border-slate-100 pr-0 md:pr-12">
          <div className="relative w-48 h-48 flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 192 192">
              <circle
                className="text-slate-100"
                strokeWidth="12"
                stroke="currentColor"
                fill="transparent"
                r="88"
                cx="96"
                cy="96"
              />
              <motion.circle
                className={getScoreColor(score)}
                strokeWidth="12"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - score / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="88"
                cx="96"
                cy="96"
                initial={{ strokeDashoffset: 2 * Math.PI * 88 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 88 * (1 - score / 100),
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center inset-0 justify-center">
              <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
                {score}
              </span>
              <span className="text-slate-400 text-xs uppercase tracking-wide mt-1">
                ATS Score
              </span>
            </div>
          </div>
          <div
            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${getScoreBg(
              score
            )} ${getScoreColor(score)}`}
          >
            {status}
          </div>
        </div>

        {/* Detailed Feedback */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              ATS Analysis Report
            </h3>
            <div className="space-y-3">
              {recommendations && recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50">
                    <div className="mt-0.5">
                      {rec.type === "success" ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : rec.type === "warning" ? (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div>
                        <p className="text-slate-700 font-medium text-sm">{rec.title}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{rec.message}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 italic text-sm">
                  Complete the scan to see recommendations.
                </p>
              )}
            </div>
          </div>

          {missingKeywords && missingKeywords.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Missing Keywords Detected
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.slice(0, 10).map((keyword, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-xs font-medium border border-red-100 flex items-center gap-1"
                  >
                   <XCircle className="w-3 h-3" /> {keyword}
                  </span>
                ))}
                {missingKeywords.length > 10 && (
                  <span className="px-2.5 py-1 rounded-md bg-slate-50 text-slate-500 text-xs border border-slate-100">
                    +{missingKeywords.length - 10} more
                  </span>
                )}
              </div>
            </div>
          )}

          {score < 75 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-bold text-indigo-900 text-sm">
                  Low ATS Score? Try our Resume Builder
                </h4>
                <p className="text-indigo-700/80 text-xs mt-1">
                  Use our ATS-friendly templates to boost your score instantly.
                </p>
              </div>
              <Link
                href="/dashboard/resume"
                className="shrink-0 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
              >
                Create Free Resume <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScoreDisplay;
