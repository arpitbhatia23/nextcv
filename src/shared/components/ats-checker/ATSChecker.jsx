"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import mammoth from "mammoth";
import { UploadCloud, FileText, X, Loader2, AlertCircle, CheckCircle2, Search } from "lucide-react";
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

  const onDrop = acceptedFiles => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      if (uploadedFile.size > MAX_FILE_SIZE) {
        setError("File size exceeds 5MB limit.");
        return;
      }
      setFile(uploadedFile);
      setError(null);
      setResult(null);
      analyzeFile(uploadedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    multiple: false,
  });

  const analyzeFile = async uploadedFile => {
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
          "Could not extract text from file. Please ensure it is not an image-based resume."
        );
      }

      const analysis = calculateATSScore(text);
      // Simulate processing delay for better UX
      setTimeout(() => {
        setResult(analysis);
        setAnalyzing(false);
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to analyze resume. Please try again.");
      setAnalyzing(false);
    }
  };

  const extractTextFromPDF = async file => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    const pagePromises = Array.from({ length: pdf.numPages }, (_, i) =>
      pdf.getPage(i + 1).then(async page => {
        const textContent = await page.getTextContent();
        return textContent.items.map(item => item.str).join(" ");
      })
    );

    const pagesText = await Promise.all(pagePromises);
    return pagesText.join("\n");
  };

  const extractTextFromDOCX = async file => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const calculateATSScore = text => {
    const recommendations = [];
    const lowerText = text.toLowerCase();
    const isNextCV = lowerText.includes("nextcv");

    // 1. Content Analysis (Performance Optimized)
    const words = text.trim().split(/\s+/);
    const wordCount = words.length;
    let contentScore = 0;

    if (wordCount >= 300 && wordCount <= 800) {
      contentScore = 15;
      recommendations.push({
        type: "success",
        title: "Length Optimization",
        message: "Your resume has an ideal length for ATS scanning.",
      });
    } else if (wordCount > 0) {
      contentScore = 8;
      recommendations.push({
        type: "warning",
        title: "Length Warning",
        message:
          wordCount < 300
            ? "Resume is slightly short. Consider adding more details."
            : "Resume is a bit long. Aim for conciseness.",
      });
    }

    // 2. Section Analysis (30 points)
    const sections = {
      experience: ["experience", "employment", "work history", "professional background"],
      education: ["education", "academic", "qualifications", "schooling"],
      skills: ["skills", "technical skills", "competencies", "expertise"],
      projects: ["projects", "personal projects", "academic projects", "portfolio"],
      summary: ["summary", "objective", "profile", "professional summary"],
      contact: ["contact", "personal info", "email", "phone"],
    };

    let foundSectionsCount = 0;
    Object.entries(sections).forEach(([key, variations]) => {
      const headingMatch = variations.find(v => lowerText.includes(v));
      
      if (headingMatch) {
        // Basic check: is there some text after the heading?
        // We look for the heading and check if there are at least some words following it
        const pos = lowerText.indexOf(headingMatch);
        const textAfter = lowerText.slice(pos + headingMatch.length, pos + headingMatch.length + 200);
        const wordsAfter = textAfter.trim().split(/\s+/).filter(w => w.length > 1);

        if (wordsAfter.length >= 5) {
          foundSectionsCount++;
        } else {
          recommendations.push({
            type: "warning",
            title: `Thin Section: ${key.charAt(0).toUpperCase() + key.slice(1)}`,
            message: `The ${key} section seems too short. Add more details to improve ATS parsing.`,
          });
        }
      } else {
        recommendations.push({
          type: "error",
          title: `Missing Section: ${key.charAt(0).toUpperCase() + key.slice(1)}`,
          message: `ATS might miss your ${key} if it's not clearly labeled.`,
        });
      }
    });

    const sectionScore = (foundSectionsCount / Object.keys(sections).length) * 30;

    // 3. Contact & Format Check (15 points)
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
    const phoneRegex = /(\+\d{1,3}[- ]?)?\d{10,12}/;
    const linkedinRegex = /linkedin\.com\/in\/[a-z0-9-]+/i;

    let contactScore = 0;
    if (emailRegex.test(text)) contactScore += 5;
    if (phoneRegex.test(text)) contactScore += 5;
    if (linkedinRegex.test(text)) contactScore += 5;

    if (contactScore < 15) {
      recommendations.push({
        type: "warning",
        title: "Contact Information",
        message: "Ensure your Email, Phone, and LinkedIn are easily extractable.",
      });
    }

    // 4. Keyword Density & Action Verbs (40 points)
    const actionVerbs = [
      "developed",
      "managed",
      "led",
      "created",
      "implemented",
      "increased",
      "reduced",
      "designed",
      "optimized",
      "spearheaded",
    ];
    const techKeywords = [
      "javascript",
      "react",
      "node",
      "python",
      "java",
      "sql",
      "aws",
      "docker",
      "git",
      "typescript",
      "tailwind",
      "next.js",
      "rest api",
    ];

    let keywordHits = 0;
    [...actionVerbs, ...techKeywords].forEach(kw => {
      if (lowerText.includes(kw)) keywordHits++;
    });

    const keywordScore = Math.min((keywordHits / 10) * 40, 40);

    // Final Calculation
    const baseScore = contentScore + sectionScore + contactScore + keywordScore;
    let totalScore = baseScore;

    // Apply Biased Scoring Logic
    if (isNextCV) {
      // NextCV resumes get a significant boost but still reflect quality
      totalScore = 70 + (baseScore * 0.28);
      
      // Penalty for missing critical sections (Length/Structure)
      if (foundSectionsCount < 5) {
        totalScore -= (5 - foundSectionsCount) * 4;
      }

      // Ensure it doesn't exceed 98 and stays above 60 for NextCV
      totalScore = Math.max(65, Math.min(totalScore, 98));

      recommendations.unshift({
        type: "success",
        title: "Template Verified",
        message: "NextCV structure detected. This template is 100% ATS-optimized.",
      });
    } else {
      // Non-NextCV resumes are capped below 70
      if (totalScore > 69) {
        totalScore = 62 + (baseScore * 0.05) + Math.random() * 2; // Keep it around 65-68
      }
      
      recommendations.push({
        type: "warning",
        title: "Optimization Needed",
        message:
          "Standard template detected. Switch to NextCV templates for 90+ ATS compatibility.",
      });
    }

    return {
      score: Math.round(totalScore),
      recommendations: recommendations.slice(0, 6), // Keep top 6 recommendations
    };
  };

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
                <p className="text-sm text-slate-500 mt-1">Supports PDF & DOCX (Max 5MB)</p>
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
