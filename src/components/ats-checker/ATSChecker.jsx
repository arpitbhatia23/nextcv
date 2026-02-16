"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import mammoth from "mammoth";
import { UploadCloud, FileText, X, Loader2, AlertCircle } from "lucide-react";
import ScoreDisplay from "./ScoreDisplay";
import { motion, AnimatePresence } from "framer-motion";

// Set worker source for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      if (uploadedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      console.log(uploadedFile);
      setFile(uploadedFile);
      setError(null);
      setResult(null);
      analyzeFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  const analyzeFile = async (uploadedFile) => {
    setAnalyzing(true);
    try {
      let text = "";
      if (uploadedFile.type === "application/pdf") {
        text = await extractTextFromPDF(uploadedFile);
      } else if (
        uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        text = await extractTextFromDOCX(uploadedFile);
      }

      if (!text || text.trim().length === 0) {
        throw new Error(
          "Could not extract text from file. Please ensure it is not an image-based resume.",
        );
      }

      const analysis = calculateATSScore(text);
      // Simulate processing delay for better UX
      setTimeout(() => {
        setResult(analysis);
        setAnalyzing(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to analyze resume. Please try again.");
      setAnalyzing(false);
    }
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      fullText += pageText + "\n";
    }
    return fullText;
  };

  const extractTextFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const calculateATSScore = (text) => {
    let score = 0;
    const recommendations = [];
    // const missingKeywords = [];
    const lowerText = text.toLowerCase();

    // 1. Content Length Check (10 points)
    const wordCount = text.split(/\s+/).length;
    if (wordCount >= 200 && wordCount <= 1000) {
      score += 10;
      recommendations.push({
        type: "success",
        title: "Word Count",
        message: "Optimal word count (200-1000 words).",
      });
    } else if (wordCount < 200) {
      recommendations.push({
        type: "error",
        title: "Word Count",
        message: "Resume is too short. Add more detail.",
      });
    } else {
      recommendations.push({
        type: "warning",
        title: "Word Count",
        message: "Resume might be too long.",
      });
    }

    // 2. Section Headers Check (30 points)
    const essentialSections = [
      "experience",
      "education",
      "skills",
      "projects",
      "summary",
      "contact",
    ];
    let foundSections = 0;
    essentialSections.forEach((section) => {
      if (lowerText.includes(section)) {
        foundSections++;
      }
    });

    const sectionScore = (foundSections / essentialSections.length) * 30;
    score += sectionScore;

    if (foundSections === essentialSections.length) {
      recommendations.push({
        type: "success",
        title: "Sections",
        message: "All essential sections found.",
      });
    } else {
      recommendations.push({
        type: "warning",
        title: "Sections",
        message: `Found ${foundSections}/${essentialSections.length} essential sections. Ensure you have clear headers.`,
      });
    }

    // 3. Contact Info Check (15 points)
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+\d{1,3}[- ]?)?\d{10}/;

    if (emailRegex.test(text)) score += 10;
    if (phoneRegex.test(text)) score += 5;

    if (!emailRegex.test(text) || !phoneRegex.test(text)) {
      recommendations.push({
        type: "error",
        title: "Contact Info",
        message: "Missing email or phone number.",
      });
    } else {
      recommendations.push({
        type: "success",
        title: "Contact Info",
        message: "Contact information detected.",
      });
    }

    // 4. Keyword Analysis (45 points)
    // Common tech and soft skills keywords
    const commonKeywords = [
      "javascript",
      "python",
      "java",
      "react",
      "node",
      "sql",
      "communication",
      "teamwork",
      "leadership",
      "problem solving",
      "agile",
      "project management",
      "html",
      "css",
      "git",
      "analysis",
      "development",
      "design",
    ];

    let keywordCount = 0;
    commonKeywords.forEach((keyword) => {
      if (lowerText.includes(keyword)) {
        keywordCount++;
      }
    });

    // Cap keyword score contribution
    const keywordScore = Math.min((keywordCount / 5) * 45, 45); // detecting 5+ keywords gives full points here for simplicity
    score += keywordScore;

    if (keywordCount < 5) {
      recommendations.push({
        type: "warning",
        title: "Keywords",
        message: "Low keyword density. Add more relevant skills.",
      });
    } else {
      recommendations.push({
        type: "success",
        title: "Keywords",
        message: "Good usage of action keywords.",
      });
    }

    // Normalize score to integer
    return {
      score: Math.round(score),
      // missingKeywords: missingKeywords.slice(0, 8), // Show top 8 missing
      recommendations,
    };
  };

  const removeFile = (e) => {
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
            className={`relative flex flex-col items-center justify-center w-full h-64 rounded-xl border-2 border-dashed transition-all cursor-pointer
              ${
                isDragActive
                  ? "border-indigo-500 bg-indigo-50/50"
                  : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
              }
            `}
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
                <p className="text-sm text-slate-500 mt-1">
                  Supports PDF & DOCX (Max 5MB)
                </p>
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
                <p className="text-xs text-indigo-600">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
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
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-slate-600 font-medium animate-pulse">
              Analyzing your resume...
            </p>
            <p className="text-slate-400 text-sm mt-2">
              Checking formatting, keywords, and sections
            </p>
          </div>
        )}

        <AnimatePresence>
          {result && !analyzing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <ScoreDisplay
                score={result.score}
                // missingKeywords={result.missingKeywords}
                recommendations={result.recommendations}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ATSChecker;
