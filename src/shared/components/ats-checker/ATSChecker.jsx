"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, X, Loader2, AlertCircle, CheckCircle2, Search } from "lucide-react";
import ScoreDisplay from "./ScoreDisplay";
import { motion, AnimatePresence } from "framer-motion";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function ATSChecker() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeFile = async uploadedFile => {
    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await fetch("/api/ats-checker/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to analyze resume.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to analyze resume. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const onDrop = useCallback(acceptedFiles => {
    const uploadedFile = acceptedFiles[0];

    if (!uploadedFile) return;

    if (uploadedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setFile(uploadedFile);
    setError(null);
    setResult(null);
    analyzeFile(uploadedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: false,
  });

  const removeFile = e => {
    e.stopPropagation();
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
        {!file || error ? (
          <div
            {...getRootProps()}
            className={`relative flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
              isDragActive
                ? "border-indigo-500 bg-indigo-50/50"
                : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
            }`}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-indigo-50 rounded-full text-indigo-600">
                <UploadCloud className="w-8 h-8" />
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-700">
                  {isDragActive
                    ? "Drop your resume here"
                    : "Drag & drop your resume, or click to select"}
                </p>
                <p className="text-sm text-slate-500 mt-1">Supports PDF & DOCX Max 5MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-xl border border-indigo-100 mb-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <FileText className="w-6 h-6" />
              </div>

              <div>
                <p className="font-semibold text-indigo-900 truncate max-w-50 sm:max-w-xs">
                  {file.name}
                </p>
                <p className="text-xs text-indigo-600">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>

            {!analyzing && (
              <button
                onClick={removeFile}
                className="p-1.5 hover:bg-indigo-200/50 rounded-full text-indigo-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-100 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {analyzing && (
          <div className="py-12 flex flex-col items-center justify-center max-w-sm mx-auto text-center">
            <div className="relative w-20 h-20 mb-6">
              <Loader2 className="w-full h-full text-indigo-600 animate-spin absolute inset-0 opacity-20" />

              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center text-white">
                  <Search className="w-6 h-6" />
                </div>
              </motion.div>
            </div>

            <div className="space-y-4 w-full">
              <p className="text-slate-900 font-black text-lg tracking-tight">
                AI Engine Running...
              </p>

              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-indigo-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                />
              </div>

              <div className="space-y-2">
                {[
                  "Parsing document structure...",
                  "Extracting semantic keywords...",
                  "Validating industry standards...",
                  "Finalizing compatibility score...",
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.4 }}
                    className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest"
                  >
                    <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                    {text}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        <AnimatePresence>
          {result && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ScoreDisplay score={result.score} recommendations={result.recommendations} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
