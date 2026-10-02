"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Document, Page, pdfjs } from "react-pdf";
import {
  Download,
  Share2,
  Check,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Briefcase,
  FileCheck,
  ArrowRight,
  Printer,
} from "lucide-react";
import { toast } from "sonner";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export default function PublicResumeViewer({ resume }) {
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1);
  const [copied, setCopied] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);

  const pdfGenRef = useRef(null);
  const viewerContainerRef = useRef(null);

  /*
   * =====================================================
   * RESPONSIVE PDF WIDTH
   * =====================================================
   */

  useEffect(() => {
    const updateWidth = () => {
      if (!viewerContainerRef.current) return;

      const available = viewerContainerRef.current.clientWidth - 48;

      const optimal = Math.min(Math.max(available, 280), 820);

      setContainerWidth(optimal);
    };

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  /*
   * =====================================================
   * GENERATE PDF
   * =====================================================
   */

  useEffect(() => {
    let isMounted = true;

    const generate = async () => {
      try {
        setLoading(true);

        const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");

        const pdfGen = new pdfGenerator(resume, resume?.ResumeType, {
          type: "resume",
        });

        pdfGenRef.current = pdfGen;

        const url = await pdfGen.createPdf();

        if (isMounted) {
          setPdfUrl(url);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error generating resume PDF:", err);

        if (isMounted) {
          setLoading(false);
          toast.error("Failed to render resume preview");
        }
      }
    };

    if (resume) {
      generate();
    }

    return () => {
      isMounted = false;

      pdfGenRef.current?.cleanUp?.();
    };
  }, [resume]);

  /*
   * =====================================================
   * COPY PUBLIC LINK
   * =====================================================
   */

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";

      if (!url) return;

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }

      setCopied(true);

      toast.success("Resume link copied to clipboard");

      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  /*
   * =====================================================
   * DOWNLOAD
   * =====================================================
   */

  const handleDownload = async () => {
    if (!pdfGenRef.current || downloading) {
      return;
    }

    try {
      setDownloading(true);

      toast.info("Preparing PDF download...");

      await pdfGenRef.current.downloadPdf();

      toast.success("Download started");
    } catch (err) {
      console.error(err);

      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  /*
   * =====================================================
   * PRINT
   * =====================================================
   */

  const handlePrint = () => {
    if (!pdfUrl) return;

    const printWindow = window.open(pdfUrl, "_blank");

    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  /*
   * =====================================================
   * ZOOM
   * =====================================================
   */

  const zoomIn = () => {
    setScale(s => Math.min(Number((s + 0.15).toFixed(2)), 1.6));
  };

  const zoomOut = () => {
    setScale(s => Math.max(Number((s - 0.15).toFixed(2)), 0.65));
  };

  const resetZoom = () => {
    setScale(1);
  };

  const pageWidth = Math.round(containerWidth * scale);

  /*
   * =====================================================
   * RENDER
   * =====================================================
   */

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#17201C] font-sans selection:bg-[#465B9E]/15 selection:text-[#17201C] flex flex-col">
      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <header className="sticky top-0 z-50 border-b border-[#E3E2DC]/90 bg-[#F8F7F3]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-17 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Candidate identity */}

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DCE1F0] bg-[#EEF0F7] text-sm font-semibold text-[#465B9E]">
              {resume?.name ? resume.name.charAt(0).toUpperCase() : "R"}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-sm font-semibold tracking-tight text-[#17201C] sm:text-base">
                  {resume?.name || "Professional"}
                </h1>

                {numPages && (
                  <span className="hidden shrink-0 rounded-full border border-[#E3E2DC] bg-white px-2 py-0.5 text-[10px] font-medium text-[#66706B] sm:inline-flex">
                    {numPages} {numPages === 1 ? "page" : "pages"}
                  </span>
                )}
              </div>

              <p className="flex min-w-0 items-center gap-1.5 truncate text-xs text-[#66706B]">
                {resume?.jobRole ? (
                  <>
                    <Briefcase className="h-3 w-3 shrink-0 text-[#465B9E]" aria-hidden="true" />

                    <span className="truncate">{resume.jobRole}</span>
                  </>
                ) : (
                  <span>Professional Resume</span>
                )}
              </p>
            </div>
          </div>

          {/* Toolbar */}

          <div className="flex shrink-0 items-center gap-2">
            {/* Zoom */}

            <div className="hidden items-center rounded-xl border border-[#E3E2DC] bg-white p-1 text-[#66706B] shadow-[0_4px_18px_rgba(23,32,28,0.04)] md:flex">
              <button
                type="button"
                onClick={zoomOut}
                disabled={scale <= 0.65}
                title="Zoom out"
                aria-label="Zoom out"
                className="rounded-lg p-1.5 transition-colors hover:bg-[#F1F0EB] hover:text-[#17201C] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/30"
              >
                <ZoomOut className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={resetZoom}
                title="Reset zoom"
                aria-label="Reset zoom"
                className="min-w-12 px-2 text-xs font-medium tabular-nums text-[#5B625C] transition-colors hover:text-[#465B9E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/30"
              >
                {Math.round(scale * 100)}%
              </button>

              <button
                type="button"
                onClick={zoomIn}
                disabled={scale >= 1.6}
                title="Zoom in"
                aria-label="Zoom in"
                className="rounded-lg p-1.5 transition-colors hover:bg-[#F1F0EB] hover:text-[#17201C] disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/30"
              >
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Print */}

            <button
              type="button"
              onClick={handlePrint}
              disabled={!pdfUrl}
              title="Print resume"
              aria-label="Print resume"
              className="hidden h-9 w-9 items-center justify-center rounded-xl border border-[#E3E2DC] bg-white text-[#66706B] transition-all hover:border-[#C8CDD9] hover:bg-[#FAFAF8] hover:text-[#17201C] disabled:pointer-events-none disabled:opacity-40 sm:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/30"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
            </button>

            {/* Share */}

            <button
              type="button"
              onClick={handleCopyLink}
              aria-label={copied ? "Resume link copied" : "Share resume"}
              aria-pressed={copied}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-[#E3E2DC] bg-white px-3 text-xs font-semibold text-[#17201C] transition-all hover:border-[#C8CDD9] hover:bg-[#FAFAF8] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/30 sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-[#465B9E]" aria-hidden="true" />

                  <span className="hidden sm:inline">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5 text-[#66706B]" aria-hidden="true" />

                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {/* Download */}

            <button
              type="button"
              onClick={handleDownload}
              disabled={!pdfUrl || downloading}
              aria-busy={downloading}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#465B9E] px-3.5 text-xs font-semibold text-white shadow-[0_6px_20px_rgba(70,91,158,0.18)] transition-all hover:bg-[#344B93] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/40 focus-visible:ring-offset-2 sm:text-sm"
            >
              <Download
                className={`h-3.5 w-3.5 ${downloading ? "animate-bounce" : ""}`}
                aria-hidden="true"
              />

              <span className="hidden sm:inline">
                {downloading ? "Downloading..." : "Download Resume"}
              </span>

              <span className="sm:hidden">{downloading ? "..." : "PDF"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* =================================================
          PDF VIEWER
      ================================================= */}

      <main
        ref={viewerContainerRef}
        className="relative flex flex-1 flex-col items-center overflow-x-auto px-3 py-8 pb-36 sm:px-6 sm:py-12"
      >
        {/* Very subtle editorial background */}

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45] bg-[radial-gradient(circle_at_50%_0%,rgba(70,91,158,0.07),transparent_38%)]"
          aria-hidden="true"
        />

        {loading ? (
          /* =============================================
             LOADING STATE
          ============================================== */

          <div className="relative my-auto flex flex-col items-center gap-5 py-24 text-center">
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#DCE1F0] bg-white shadow-[0_10px_35px_rgba(23,32,28,0.07)]">
              <div className="absolute inset-2 rounded-xl border-2 border-[#465B9E]/15" />

              <div className="h-6 w-6 animate-spin rounded-full border-[2.5px] border-[#465B9E] border-t-transparent" />
            </div>

            <div className="space-y-1.5">
              <h2 className="font-serif text-xl font-medium text-[#17201C]">
                Preparing your resume
              </h2>

              <p className="text-xs text-[#66706B]">Generating a high-quality preview...</p>
            </div>
          </div>
        ) : pdfUrl ? (
          /* =============================================
             PDF
          ============================================== */

          <div className="relative z-10 flex flex-col items-center">
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div
                  className="flex items-center justify-center rounded-xl border border-[#E3E2DC] bg-white shadow-[0_12px_40px_rgba(23,32,28,0.07)]"
                  style={{
                    width: pageWidth,
                    minHeight: Math.round(pageWidth * 1.414),
                  }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#465B9E] border-t-transparent" />

                    <p className="text-xs text-[#66706B]">Loading resume...</p>
                  </div>
                </div>
              }
              error={
                <div className="max-w-md rounded-2xl border border-[#E3E2DC] bg-white p-8 text-center shadow-[0_12px_40px_rgba(23,32,28,0.06)]">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-[#F1F0EB] text-[#465B9E]">
                    <FileCheck className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h2 className="mt-4 font-serif text-xl font-medium text-[#17201C]">
                    Preview unavailable
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#66706B]">
                    We couldn't render this resume preview. Please refresh the page and try again.
                  </p>
                </div>
              }
            >
              {Array.from({
                length: numPages || 1,
              }).map((_, idx) => (
                <div key={idx} className="group relative mb-8 last:mb-0 sm:mb-10">
                  {/* Resume paper */}

                  <div
                    className="relative overflow-hidden rounded-[2px] bg-white shadow-[0_18px_55px_-16px_rgba(23,32,28,0.24),0_0_0_1px_rgba(23,32,28,0.09)] transition-shadow duration-300 group-hover:shadow-[0_22px_65px_-16px_rgba(23,32,28,0.28),0_0_0_1px_rgba(23,32,28,0.11)]"
                    style={{
                      width: pageWidth,
                    }}
                  >
                    <Page
                      pageNumber={idx + 1}
                      width={pageWidth}
                      className="bg-white"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>

                  {/* Page indicator */}

                  {numPages && numPages > 1 && (
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#E3E2DC] bg-white px-3 py-1 text-[10px] font-medium tabular-nums text-[#66706B] shadow-[0_4px_15px_rgba(23,32,28,0.08)]">
                      Page {idx + 1} of {numPages}
                    </div>
                  )}
                </div>
              ))}
            </Document>
          </div>
        ) : (
          /* =============================================
             EMPTY STATE
          ============================================== */

          <div className="relative my-auto py-24 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E3E2DC] bg-white text-[#465B9E]">
              <FileCheck className="h-5 w-5" aria-hidden="true" />
            </div>

            <h2 className="mt-5 font-serif text-xl font-medium text-[#17201C]">
              Resume preview unavailable
            </h2>

            <p className="mt-2 text-sm text-[#66706B]">Please refresh the page and try again.</p>
          </div>
        )}
      </main>

      {/* =================================================
          FLOATING NEXTCV CTA
      ================================================= */}

      <footer className="fixed bottom-4 left-3 right-3 z-40 sm:bottom-5 sm:left-5 sm:right-5">
        <div className="relative mx-auto flex max-w-4xl items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[#DCDAD3] bg-white/95 px-4 py-3 shadow-[0_18px_55px_rgba(23,32,28,0.13)] backdrop-blur-xl sm:px-5 sm:py-3.5">
          {/* Subtle accent */}

          <div className="absolute left-0 top-0 h-full w-0.75 bg-[#465B9E]" aria-hidden="true" />

          {/* Brand */}

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 items-center gap-3 pl-1 group"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#E3E2DC] bg-[#F8F7F3] p-1.5 transition-colors group-hover:border-[#C8CDD9]">
              <Image
                src="/logos/nextcvlogo.png"
                alt="NextCV"
                width={22}
                height={22}
                className="object-contain opacity-70"
              />
            </div>

            <div className="hidden min-w-0 sm:block">
              <span className="block text-sm font-semibold tracking-tight text-[#17201C] transition-colors group-hover:text-[#465B9E]">
                NextCV
              </span>

              <span className="block truncate text-[11px] text-[#8A908B]">
                Professional resumes, made simple
              </span>
            </div>
          </Link>

          {/* CTA */}

          <div className="flex shrink-0 items-center gap-3">
            <span className="hidden text-xs text-[#66706B] lg:inline">
              Create your own professional resume
            </span>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#17201C] px-3.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#2B3530] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#465B9E]/40 focus-visible:ring-offset-2 sm:px-4 sm:text-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#AAB5D9]" aria-hidden="true" />

              <span className="hidden xs:inline">Build Your Resume</span>

              <span className="xs:hidden">Build Resume</span>

              <ArrowRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
