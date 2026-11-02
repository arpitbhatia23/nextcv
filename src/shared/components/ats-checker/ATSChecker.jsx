"use client";

import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  FileText,
  X,
  Loader2,
  AlertCircle,
  Search,
  Sparkles,
  BriefcaseBusiness,
  Shield,
  RotateCcw,
} from "lucide-react";
import ScoreDisplay from "./ScoreDisplay";
import { motion, AnimatePresence } from "framer-motion";
import safePostHog from "@/shared/utils/posthog";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_JD_LENGTH = 20000;

export default function ATSChecker() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // Informative rotating status messages for indeterminate loading
  const loadingMessages = [
    "Reading machine-extractable text from document...",
    "Scanning section structure, headings, and bullet points...",
    "Detecting contact information and profile handles...",
    "Evaluating action verbs and quantifiable achievements...",
    jobDescription.trim()
      ? "Matching technical keywords against job requirements..."
      : "Assessing ATS readability and content completeness...",
  ];

  useEffect(() => {
    let interval;
    if (analyzing) {
      interval = setInterval(() => {
        setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
      }, 2000);
    } else {
      setLoadingMessageIndex(0);
    }
    return () => clearInterval(interval);
  }, [analyzing, loadingMessages.length]);

  const analyzeFile = async uploadedFile => {
    if (!uploadedFile || analyzing) return;

    setAnalyzing(true);
    setError(null);
    setResult(null);

    // Track safe, non-sensitive analysis start
    try {
      safePostHog?.capture?.("ats_analysis_started", {
        hasJD: Boolean(jobDescription.trim()),
        fileType: uploadedFile.type || (uploadedFile.name.endsWith(".pdf") ? "pdf" : "docx"),
        fileSizeKb: Math.round(uploadedFile.size / 1024),
      });
    } catch {
      // Safe fallback
    }

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription.trim());
      }

      const res = await fetch("/api/ats-checker/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to analyze resume. Please try again.");
      }

      setResult(data);

      // Track safe completion
      try {
        safePostHog?.capture?.("ats_analysis_completed", {
          score: data.score,
          readabilityScore: data.dimensions?.readability?.score,
          hasJD: Boolean(jobDescription.trim()),
          jdMatchScore: data.dimensions?.jdMatch?.score || null,
        });
      } catch {
        // Safe fallback
      }
    } catch (err) {
      setError(
        err?.message ||
          "Network or server interruption occurred while scanning your resume. Please check your connection and try again."
      );

      try {
        safePostHog?.capture?.("ats_analysis_failed", {
          hasJD: Boolean(jobDescription.trim()),
        });
      } catch {
        // Safe fallback
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    const uploadedFile = acceptedFiles[0];
    if (!uploadedFile) return;

    if (uploadedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit. Please upload a smaller PDF or DOCX document.");
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setResult(null);

    try {
      safePostHog?.capture?.("ats_file_selected", {
        fileType: uploadedFile.type || (uploadedFile.name.endsWith(".pdf") ? "pdf" : "docx"),
        fileSizeKb: Math.round(uploadedFile.size / 1024),
      });
    } catch {
      // Safe fallback
    }
  }, []);

  const onDropRejected = useCallback(fileRejections => {
    if (fileRejections && fileRejections.length > 0) {
      const rejection = fileRejections[0];
      const errors = rejection.errors || [];
      if (errors.some(e => e.code === "file-too-large")) {
        setError("File size exceeds 5MB limit. Please upload a smaller document.");
      } else {
        setError("Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
    },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
    disabled: analyzing,
  });

  const removeFile = e => {
    e?.stopPropagation?.();
    if (analyzing) return;
    setFile(null);
    setResult(null);
    setError(null);
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = () => {
    if (!file) {
      setError("Please upload your resume file first.");
      return;
    }

    if (jobDescription.length > MAX_JD_LENGTH) {
      setError(
        `Job description is too long (maximum ${MAX_JD_LENGTH.toLocaleString()} characters).`
      );
      return;
    }

    analyzeFile(file);
  };

  const formatFileSize = bytes => {
    if (!bytes) return "0 KB";
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
    return `${Math.round(bytes / 1024)} KB`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white shadow-sm border border-slate-200 p-6 md:p-10">
        {/* Upload Dropzone Section */}
        {!file ? (
          <div
            {...getRootProps()}
            className={`relative flex flex-col items-center justify-center w-full h-72 border-2 border-dashed transition-all cursor-pointer ${
              isDragActive
                ? "border-indigo-600 bg-indigo-50/50 scale-[1.01]"
                : "border-slate-300 hover:border-indigo-500 hover:bg-slate-50/60"
            }`}
          >
            <label htmlFor="resume-file-input" className="sr-only">
              Upload resume file in PDF or DOCX format
            </label>
            <input
              id="resume-file-input"
              aria-label="Upload resume file in PDF or DOCX format"
              {...getInputProps()}
            />

            <div className="flex flex-col items-center text-center space-y-4 px-4">
              <div className="p-4 bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] shadow-xs">
                <UploadCloud className="w-8 h-8 text-indigo-600" aria-hidden="true" />
              </div>

              <div>
                <p className="text-base sm:text-lg font-bold text-[#071644]">
                  {isDragActive
                    ? "Drop your resume file here"
                    : "Drag & drop your resume here, or click to upload"}
                </p>

                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Supports PDF & DOCX (Max 5MB) • In-memory analysis • Your file is never saved or
                  shared
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-semibold font-mono">
                  PDF Format
                </span>

                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-semibold font-mono">
                  DOCX Format
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Uploaded File Pill */}
            <div className="flex items-center justify-between p-4 bg-indigo-50/80 border border-indigo-100 mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600">
                  <FileText className="w-6 h-6" aria-hidden="true" />
                </div>

                <div>
                  <p className="font-bold text-[#071644] text-sm sm:text-base truncate max-w-50 sm:max-w-xs">
                    {file.name}
                  </p>

                  <p className="text-xs text-indigo-600 font-medium">{formatFileSize(file.size)}</p>
                </div>
              </div>

              {!analyzing && (
                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove uploaded resume"
                  className="min-h-11 min-w-11 p-2 hover:bg-indigo-200/60 text-indigo-700 transition-colors text-xs font-semibold flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <X className="w-4 h-4" aria-hidden="true" />
                  Remove
                </button>
              )}
            </div>

            {/* Job Description Input (Only shown before analysis result) */}
            {!analyzing && !result && (
              <div className="mb-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="job-description"
                    className="flex items-center gap-2 text-sm font-bold text-[#071644]"
                  >
                    <BriefcaseBusiness className="w-4 h-4 text-indigo-600" />
                    Target Job Description
                  </label>

                  <span className="text-xs text-slate-400">Optional</span>
                </div>

                <textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={e => setJobDescription(e.target.value)}
                  placeholder="Paste the job description or role requirements here to check specific keyword matches, partial matches, and requirement coverage..."
                  rows={7}
                  disabled={analyzing}
                  className="w-full resize-y border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    Add a job post to see how your technical skills and responsibilities align with
                    the role.
                  </span>
                  <span
                    className={
                      jobDescription.length > MAX_JD_LENGTH ? "text-rose-600 font-bold" : ""
                    }
                  >
                    {jobDescription.length.toLocaleString()} / {MAX_JD_LENGTH.toLocaleString()}{" "}
                    chars
                  </span>
                </div>
              </div>
            )}

            {/* Analyze Trigger Button */}
            {!analyzing && !result && (
              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 transition-all shadow-sm hover:shadow-md disabled:opacity-60 cursor-pointer"
              >
                <Search className="w-5 h-5" />
                {jobDescription.trim() ? "Analyze Resume & Job Match" : "Analyze ATS Compatibility"}
              </button>
            )}
          </>
        )}

        {/* Error Alert with Retry */}
        {error && (
          <div className="mt-4 p-4 bg-rose-50 text-rose-800 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5 sm:mt-0" />
              <p className="font-medium leading-relaxed">{error}</p>
            </div>

            {file && !analyzing && (
              <button
                type="button"
                onClick={handleAnalyze}
                className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white text-xs font-semibold hover:bg-rose-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retry Scan
              </button>
            )}
          </div>
        )}

        {/* Honest Indeterminate Loading State */}
        {analyzing && (
          <div className="py-12 flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-indigo-600 animate-spin opacity-30 absolute inset-0" />
              <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center text-white shadow-sm">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>

            <div className="space-y-3 w-full">
              <p className="text-[#071644] font-bold text-base sm:text-lg tracking-tight">
                Analyzing Your Resume
              </p>

              {/* Indeterminate moving shimmer bar (honest, not pretending to know percentage) */}
              <div className="w-full h-1.5 bg-slate-100 overflow-hidden relative">
                <motion.div
                  className="h-full bg-indigo-600 absolute"
                  initial={{ left: "-40%", width: "40%" }}
                  animate={{ left: "100%" }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                />
              </div>

              <div className="min-h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={loadingMessageIndex}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs text-slate-500 font-medium"
                  >
                    {loadingMessages[loadingMessageIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="text-[11px] text-slate-400">
                In-memory scan • Text is processed securely and not stored
              </p>
            </div>
          </div>
        )}

        {/* Results Presentation */}
        <AnimatePresence>
          {result && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
            >
              <ScoreDisplay
                score={result.score}
                grade={result.grade}
                summary={result.summary}
                dimensions={result.dimensions}
                recommendations={result.recommendations}
                checks={result.checks}
                keywordGap={result.dimensions?.jdMatch || result.keywordGap}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trust & Privacy Notice */}
      <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-slate-400 px-2">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          Zero-retention scan: Your uploaded file is processed in memory and discarded.
        </span>
        <span>Supports text-based PDF and DOCX documents</span>
      </div>
    </div>
  );
}
