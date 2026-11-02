"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  XCircle,
  FileText,
  Target,
  Lightbulb,
  Sparkles,
  ShieldCheck,
  Search,
  Info,
} from "lucide-react";

// ======================================================
// GENERAL HELPERS
// ======================================================

const clampScore = value => {
  const number = Number(value);

  if (!Number.isFinite(number)) return 0;

  return Math.min(100, Math.max(0, Math.round(number)));
};

const humanize = value =>
  String(value || "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());

const getKeywordName = item => {
  if (typeof item === "string") return item;

  if (!item || typeof item !== "object") return "";

  return item.keyword || item.name || item.term || item.text || item.value || "";
};

const getScoreColor = score => {
  if (score >= 80) return "#16A34A";
  if (score >= 60) return "#2563EB";
  if (score >= 40) return "#D97706";
  return "#DC2626";
};

const getScoreLabel = score => {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Very good";
  if (score >= 60) return "Good";
  if (score >= 40) return "Needs improvement";
  return "Needs attention";
};

// ======================================================
// SEVERITY HELPERS
// ======================================================

const getSeverity = severity => {
  const normalized = String(severity || "info").toLowerCase();

  if (["high", "critical", "error", "urgent"].includes(normalized)) {
    return "high";
  }

  if (["medium", "warning", "moderate"].includes(normalized)) {
    return "medium";
  }

  if (["low", "success", "minor", "suggestion"].includes(normalized)) {
    return "low";
  }

  return "info";
};

const getSeverityStyles = severity => {
  switch (severity) {
    case "high":
      return {
        icon: XCircle,
        iconColor: "text-red-600",
        background: "bg-red-50",
        border: "border-red-100",
        label: "High priority",
        labelColor: "text-red-700",
      };

    case "medium":
      return {
        icon: AlertTriangle,
        iconColor: "text-amber-600",
        background: "bg-amber-50",
        border: "border-amber-100",
        label: "Medium priority",
        labelColor: "text-amber-700",
      };

    case "low":
      return {
        icon: Lightbulb,
        iconColor: "text-emerald-600",
        background: "bg-emerald-50",
        border: "border-emerald-100",
        label: "Suggestion",
        labelColor: "text-emerald-700",
      };

    default:
      return {
        icon: Info,
        iconColor: "text-blue-600",
        background: "bg-blue-50",
        border: "border-blue-100",
        label: "Information",
        labelColor: "text-blue-700",
      };
  }
};

// ======================================================
// RECOMMENDATION HELPERS
// ======================================================

const normalizeRecommendations = data => {
  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.recommendations)) {
    return data.recommendations;
  }

  if (Array.isArray(data?.items)) {
    return data.items;
  }

  if (Array.isArray(data?.results)) {
    return data.results;
  }

  return [];
};

const getRecommendationCategory = item => {
  if (!item || typeof item !== "object") return "";

  return String(item.category || item.type || "").trim();
};

const getRecommendationTitle = item => {
  if (typeof item === "string") return item;

  if (!item || typeof item !== "object") {
    return "Resume improvement";
  }

  const category = getRecommendationCategory(item).toLowerCase();

  // Prefer actual title fields over category/type.
  const candidates = [
    item.title,
    item.heading,
    item.name,
    item.label,
    item.recommendationTitle,
    item.issueTitle,
    item.message,
    item.suggestion,
    item.recommendation,
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== "string" || !candidate.trim()) continue;

    const value = candidate.trim();

    // Do not display "content", "jd", "contact", etc. as the title.
    if (
      value.toLowerCase() === category ||
      value.toLowerCase() === String(item.type || "").toLowerCase()
    ) {
      continue;
    }

    return value;
  }

  return category ? humanize(category) : "Resume improvement";
};

const getRecommendationDescription = item => {
  if (!item || typeof item !== "object") return "";

  const title = getRecommendationTitle(item).toLowerCase();

  const fields = [
    "description",
    "details",
    "explanation",
    "reason",
    "feedback",
    "action",
    "improvement",
    "fix",
    "tip",
    "issue",
    "text",
  ];

  for (const field of fields) {
    const value = item[field];

    if (typeof value === "string" && value.trim()) {
      if (value.trim().toLowerCase() !== title) {
        return value.trim();
      }
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nested = value.description || value.message || value.text || value.suggestion;

      if (typeof nested === "string" && nested.trim()) {
        return nested.trim();
      }
    }
  }

  return "";
};

const getRecommendationSeverity = item => {
  if (!item || typeof item !== "object") return "info";

  return getSeverity(item.severity || item.priority || item.level);
};

// ======================================================
// KEYWORD HELPERS
// ======================================================

const getKeywordArray = (source, keys) => {
  for (const key of keys) {
    if (Array.isArray(source?.[key])) {
      return source[key];
    }
  }

  return [];
};

const getNumericCount = (source, keys, fallback) => {
  for (const key of keys) {
    const value = source?.[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return Math.max(0, value);
    }
  }

  return fallback;
};

const normalizeKeywordData = keywordGap => {
  const source = keywordGap || {};

  const matchedItems = getKeywordArray(source, [
    "matched",
    "found",
    "matchedKeywords",
    "foundKeywords",
  ]);

  const partialItems = getKeywordArray(source, [
    "partial",
    "partiallyMatched",
    "partialKeywords",
    "partiallyMatchedKeywords",
  ]);

  const missingItems = getKeywordArray(source, [
    "missing",
    "notFound",
    "missingKeywords",
    "unmatchedKeywords",
  ]);

  const matchedCount = getNumericCount(
    source,
    ["matchedCount", "matchedKeywordsCount", "foundCount"],
    matchedItems.length
  );

  const partialCount = getNumericCount(
    source,
    ["partialCount", "partialKeywordsCount", "partiallyMatchedCount"],
    partialItems.length
  );

  const missingCount = getNumericCount(
    source,
    ["missingCount", "missingKeywordsCount", "notFoundCount"],
    missingItems.length
  );

  const calculatedTotal = matchedCount + partialCount + missingCount;

  const apiTotal = Number(source.totalKeywords);

  const totalKeywords = Number.isFinite(apiTotal) && apiTotal > 0 ? apiTotal : calculatedTotal;

  const hasData =
    calculatedTotal > 0 ||
    matchedItems.length > 0 ||
    partialItems.length > 0 ||
    missingItems.length > 0;

  const coverage =
    totalKeywords > 0 ? Math.round(((matchedCount + partialCount * 0.5) / totalKeywords) * 100) : 0;

  return {
    matchedItems,
    partialItems,
    missingItems,
    matchedCount,
    partialCount,
    missingCount,
    totalKeywords,
    coverage,
    hasData,
  };
};

// ======================================================
// SCORE GAUGE
// ======================================================

function ScoreGauge({ score }) {
  const normalizedScore = clampScore(score);
  const color = getScoreColor(normalizedScore);

  const radius = 65;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="relative flex h-40 w-40 shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 160 160"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label={`Resume score: ${normalizedScore} out of 100`}
      >
        <circle cx="80" cy="80" r={radius} fill="none" stroke="#E9EAF1" strokeWidth="11" />

        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="11"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-4xl font-bold tracking-tight text-gray-950"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {normalizedScore}
        </motion.span>

        <span className="mt-0.5 text-xs font-medium text-gray-500">out of 100</span>
      </div>
    </div>
  );
}

// ======================================================
// STAT CARD
// ======================================================

function StatCard({ icon: Icon, label, value, description, color = "blue" }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-500">{label}</span>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            colorStyles[color] || colorStyles.blue
          }`}
        >
          <Icon size={17} />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-950">{value}</p>

      <p className="mt-1 text-xs text-gray-500">{description}</p>
    </div>
  );
}

// ======================================================
// RECOMMENDATION CARD
// ======================================================

function RecommendationCard({ recommendation }) {
  const severity = getRecommendationSeverity(recommendation);
  const styles = getSeverityStyles(severity);
  const Icon = styles.icon;

  const title = getRecommendationTitle(recommendation);
  const description = getRecommendationDescription(recommendation);
  const category = getRecommendationCategory(recommendation);

  return (
    <div
      className={`rounded-2xl border ${styles.border} bg-white p-4 transition-shadow hover:shadow-sm`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.background}`}
        >
          <Icon size={18} className={styles.iconColor} />
        </div>

        <div className="min-w-0 flex-1">
          {/* TITLE AND SEVERITY */}

          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>

            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles.background} ${styles.labelColor}`}
            >
              {styles.label}
            </span>
          </div>

          {/* DESCRIPTION */}

          {description && <p className="mt-2 text-sm leading-6 text-gray-600">{description}</p>}

          {/* CATEGORY - DISPLAYED ONLY ONCE */}

          {category && (
            <span className="mt-3 inline-flex rounded-md bg-gray-100 px-2 py-1 text-[10px] font-medium capitalize text-gray-500">
              {humanize(category)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// KEYWORD LIST
// ======================================================

function KeywordList({ title, items = [], type }) {
  const styles = {
    matched: {
      icon: CheckCircle2,
      color: "text-emerald-600",
      background: "bg-emerald-50",
    },
    partial: {
      icon: AlertTriangle,
      color: "text-amber-600",
      background: "bg-amber-50",
    },
    missing: {
      icon: XCircle,
      color: "text-red-600",
      background: "bg-red-50",
    },
  };

  const style = styles[type] || styles.matched;
  const Icon = style.icon;

  const validItems = items.filter(item => getKeywordName(item));

  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${style.background}`}>
          <Icon size={15} className={style.color} />
        </div>

        <h4 className="text-sm font-semibold text-gray-800">{title}</h4>

        <span className="ml-auto text-xs font-medium text-gray-400">{validItems.length}</span>
      </div>

      {validItems.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {validItems.map((item, index) => {
            const name = getKeywordName(item);

            return (
              <span
                key={`${name}-${index}`}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium ${style.background} ${style.color}`}
              >
                {name}
              </span>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-gray-400">
          {type === "missing" ? "No missing keywords identified." : "No keywords in this category."}
        </p>
      )}
    </div>
  );
}

// ======================================================
// MAIN SCORE DISPLAY
// ======================================================

export default function ScoreDisplay({
  score,
  grade,
  summary,
  recommendations = [],
  checks = [],
  jdMatchScore,
  keywordGap,
}) {
  const [activeFilter, setActiveFilter] = useState("all");

  const normalizedScore = clampScore(score);
  const scoreColor = getScoreColor(normalizedScore);

  const recommendationItems = useMemo(
    () => normalizeRecommendations(recommendations),
    [recommendations]
  );

  const keywordData = useMemo(() => normalizeKeywordData(keywordGap), [keywordGap]);

  const filteredRecommendations = useMemo(() => {
    if (activeFilter === "all") return recommendationItems;

    return recommendationItems.filter(item => getRecommendationSeverity(item) === activeFilter);
  }, [recommendationItems, activeFilter]);

  const severityCounts = useMemo(() => {
    return recommendationItems.reduce(
      (counts, item) => {
        const severity = getRecommendationSeverity(item);
        counts[severity] += 1;
        return counts;
      },
      {
        high: 0,
        medium: 0,
        low: 0,
        info: 0,
      }
    );
  }, [recommendationItems]);

  const readability = !Array.isArray(checks)
    ? checks?.readability || checks?.dimensions?.readability || null
    : null;

  const readabilityScore =
    typeof readability?.score === "number" ? clampScore(readability.score) : null;

  const checkItems = Array.isArray(checks) ? checks : [];

  const hasJdMatch = typeof jdMatchScore === "number" || keywordData.hasData;

  const safeJdMatchScore =
    typeof jdMatchScore === "number"
      ? clampScore(jdMatchScore)
      : typeof keywordGap?.score === "number"
        ? clampScore(keywordGap.score)
        : null;

  const filters = [
    {
      id: "all",
      label: "All",
      count: recommendationItems.length,
    },
    {
      id: "high",
      label: "High",
      count: severityCounts.high,
    },
    {
      id: "medium",
      label: "Medium",
      count: severityCounts.medium,
    },
    {
      id: "low",
      label: "Suggestions",
      count: severityCounts.low,
    },
    {
      id: "info",
      label: "Info",
      count: severityCounts.info,
    },
  ];
  console.log(recommendations);

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* ==========================================
          SCORE OVERVIEW
      ========================================== */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm"
      >
        <div className="p-5 sm:p-7">
          <div className="flex flex-col items-center gap-6 sm:flex-row">
            <ScoreGauge score={normalizedScore} />

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span
                  className="rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    color: scoreColor,
                    backgroundColor: `${scoreColor}12`,
                  }}
                >
                  {getScoreLabel(normalizedScore)}
                </span>

                {grade && (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                    Grade {grade}
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Your resume analysis
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600">
                {summary ||
                  "Your resume has been analyzed. Review the findings and recommendations below to identify opportunities for improvement."}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  Resume analysis
                </span>

                <span className="text-gray-300">•</span>

                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
                  <FileText size={14} />
                  Actionable feedback
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 border-t border-gray-100 bg-gray-50/70 p-4 sm:grid-cols-3 sm:p-5">
          <StatCard
            icon={Target}
            label="Resume score"
            value={`${normalizedScore}/100`}
            description="Overall content assessment"
            color="blue"
          />

          <StatCard
            icon={Lightbulb}
            label="Recommendations"
            value={recommendationItems.length}
            description="Areas to review and improve"
            color="purple"
          />

          <StatCard
            icon={Search}
            label="JD keyword match"
            value={
              safeJdMatchScore !== null
                ? `${safeJdMatchScore}%`
                : keywordData.hasData
                  ? `${keywordData.matchedCount} matched`
                  : "Not checked"
            }
            description={
              hasJdMatch
                ? "Based on the supplied job description"
                : "Add a job description to compare"
            }
            color="green"
          />
        </div>
      </motion.section>

      {/* ==========================================
          DOCUMENT READABILITY
      ========================================== */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={19} />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">Document readability</h3>

              <p className="text-xs text-gray-500">
                PDF/DOCX text extraction and formatting checks
              </p>
            </div>
          </div>

          {readabilityScore !== null && (
            <span className="text-xl font-bold text-gray-900">{readabilityScore}/100</span>
          )}
        </div>

        {readability ? (
          <div className="mt-5 space-y-3">
            {typeof readability.textExtractable === "boolean" && (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-600">Text extraction</span>

                <span
                  className={`flex items-center gap-1.5 text-sm font-semibold ${
                    readability.textExtractable ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {readability.textExtractable ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}

                  {readability.textExtractable ? "Extractable" : "Issue detected"}
                </span>
              </div>
            )}

            {typeof readability.cleanFormatting === "boolean" && (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-gray-50 px-4 py-3">
                <span className="text-sm text-gray-600">Document formatting</span>

                <span
                  className={`flex items-center gap-1.5 text-sm font-semibold ${
                    readability.cleanFormatting ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {readability.cleanFormatting ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertTriangle size={16} />
                  )}

                  {readability.cleanFormatting ? "No detected issue" : "Needs review"}
                </span>
              </div>
            )}

            {Array.isArray(readability.issues) && readability.issues.length > 0 && (
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <p className="mb-2 text-sm font-semibold text-amber-800">Detected issues</p>

                <ul className="space-y-2">
                  {readability.issues.map((issue, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-amber-800">
                      <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(readability.recommendations) &&
              readability.recommendations.length > 0 && (
                <div className="space-y-2">
                  {readability.recommendations.map((item, index) => (
                    <p key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <Info size={15} className="mt-0.5 shrink-0 text-blue-500" />
                      {item}
                    </p>
                  ))}
                </div>
              )}
          </div>
        ) : (
          <div className="mt-5 flex items-start gap-3 rounded-xl bg-gray-50 p-4">
            <Info size={17} className="mt-0.5 shrink-0 text-gray-400" />

            <p className="text-sm leading-6 text-gray-500">
              Document readability details are not available for this analysis.
            </p>
          </div>
        )}
      </motion.section>

      {/* ==========================================
          JOB DESCRIPTION MATCH
      ========================================== */}

      {hasJdMatch && (
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Target size={19} />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Job description match</h3>

                <p className="text-xs text-gray-500">Keyword comparison with your target role</p>
              </div>
            </div>

            {safeJdMatchScore !== null && (
              <div className="text-left sm:text-right">
                <p className="text-3xl font-bold text-gray-950">{safeJdMatchScore}%</p>

                <p className="text-xs text-gray-500">Keyword match score</p>
              </div>
            )}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-emerald-50 p-4">
              <p className="text-2xl font-bold text-emerald-700">{keywordData.matchedCount}</p>

              <p className="mt-1 text-xs font-medium text-emerald-700">Matched keywords</p>
            </div>

            <div className="rounded-xl bg-amber-50 p-4">
              <p className="text-2xl font-bold text-amber-700">{keywordData.partialCount}</p>

              <p className="mt-1 text-xs font-medium text-amber-700">Partial matches</p>
            </div>

            <div className="rounded-xl bg-red-50 p-4">
              <p className="text-2xl font-bold text-red-700">{keywordData.missingCount}</p>

              <p className="mt-1 text-xs font-medium text-red-700">Missing keywords</p>
            </div>
          </div>

          {keywordData.totalKeywords > 0 && (
            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                <span>Weighted keyword coverage</span>

                <span>
                  {keywordData.coverage}% · {keywordData.totalKeywords} keywords
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="flex h-full">
                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width: `${
                        (keywordData.matchedCount / (keywordData.totalKeywords || 1)) * 100
                      }%`,
                    }}
                  />

                  <div
                    className="h-full bg-amber-400"
                    style={{
                      width: `${
                        ((keywordData.partialCount * 0.5) / (keywordData.totalKeywords || 1)) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                Exact matches count fully; partial matches count half.
              </p>
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 gap-3">
            <KeywordList title="Matched keywords" items={keywordData.matchedItems} type="matched" />

            <KeywordList
              title="Partially matched"
              items={keywordData.partialItems}
              type="partial"
            />

            <KeywordList title="Missing keywords" items={keywordData.missingItems} type="missing" />
          </div>

          <p className="mt-4 text-xs leading-5 text-gray-400">
            Keyword matching indicates content relevance. It does not guarantee ATS ranking or
            interview selection. Only include skills and experience that accurately reflect your
            background.
          </p>
        </motion.section>
      )}

      {/* ==========================================
          RESUME CHECKS
      ========================================== */}

      {checkItems.length > 0 && (
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-4 font-semibold text-gray-900">Resume checks</h3>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {checkItems.map((check, index) => {
              const passed = check?.passed ?? check?.success ?? check?.status === "passed";

              return (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl border border-gray-100 p-4"
                >
                  {passed ? (
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                  )}

                  <div>
                    <p className="font-medium text-gray-900">
                      {check?.title || check?.name || check?.label || `Check ${index + 1}`}
                    </p>

                    {(check?.message || check?.description) && (
                      <p className="mt-1 text-sm text-gray-500">
                        {check.message || check.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ==========================================
          IMPROVEMENT RECOMMENDATIONS
      ========================================== */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Sparkles size={18} />
              </div>

              <h3 className="text-lg font-bold text-gray-950">Improvement recommendations</h3>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Focus on these changes to strengthen your resume.
            </p>
          </div>

          <span className="text-xs font-medium text-gray-400">
            {recommendationItems.length} recommendations
          </span>
        </div>

        {recommendationItems.length > 0 ? (
          <>
            {/* FILTERS */}

            <div className="-mx-1 mt-5 overflow-x-auto px-1 pb-2">
              <div className="flex w-max gap-2">
                {filters.map(filter => {
                  const selected = activeFilter === filter.id;

                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                        selected
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {filter.label}

                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                          selected ? "bg-white/15 text-white" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {filter.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARDS */}

            <div className="mt-3 space-y-3">
              {filteredRecommendations.length > 0 ? (
                filteredRecommendations.map((recommendation, index) => (
                  <motion.div
                    key={
                      recommendation?.id ||
                      `${recommendation?.category || "recommendation"}-${index}`
                    }
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: Math.min(index * 0.04, 0.2),
                    }}
                  >
                    <RecommendationCard recommendation={recommendation} />
                  </motion.div>
                ))
              ) : (
                <div className="rounded-xl bg-gray-50 px-4 py-8 text-center">
                  <CheckCircle2 size={25} className="mx-auto text-emerald-500" />

                  <p className="mt-2 text-sm font-semibold text-gray-800">
                    No recommendations in this category
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Try another filter to see more feedback.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="mt-5 rounded-xl bg-gray-50 p-6 text-center">
            <CheckCircle2 size={28} className="mx-auto text-emerald-500" />

            <p className="mt-3 text-sm font-semibold text-gray-800">No recommendations available</p>

            <p className="mt-1 text-xs text-gray-500">
              There are no additional recommendations in this analysis.
            </p>
          </div>
        )}
      </motion.section>

      {/* ==========================================
          NEXTCV CTA
      ========================================== */}

      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="relative overflow-hidden rounded-3xl bg-gray-950 p-6 text-white shadow-lg sm:p-8"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-purple-200">
              <Sparkles size={13} />
              Take the next step
            </div>

            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Make your resume stronger.
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-300">
              Use NextCV to create and improve your resume with AI writing assistance, professional
              templates and a live preview.
            </p>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-400" />
                Free to build and edit
              </span>

              <span className="flex items-center gap-1.5">
                <Check size={13} className="text-emerald-400" />
                One-time payment
              </span>
            </div>
          </div>

          <div className="w-full shrink-0 sm:w-auto">
            <Link
              href="/dashboard/builder"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-gray-950 transition-all hover:bg-purple-50 hover:shadow-lg sm:w-auto"
            >
              Improve My Resume
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>

            <p className="mt-3 text-center text-[11px] text-gray-400 sm:text-right">
              Start building your resume
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
