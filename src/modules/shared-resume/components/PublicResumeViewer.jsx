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
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

// Configure pdfjs worker
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

  // Measure container for responsive page width
  useEffect(() => {
    const updateWidth = () => {
      if (viewerContainerRef.current) {
        const available = viewerContainerRef.current.clientWidth - 48;
        // Optimal max reading width for A4 aspect ratio is ~760px - 820px
        const optimal = Math.min(Math.max(available, 280), 820);
        setContainerWidth(optimal);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Generate PDF from resume data
  useEffect(() => {
    let isMounted = true;

    const generate = async () => {
      try {
        setLoading(true);
        const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");
        const pdfGen = new pdfGenerator(resume, resume?.ResumeType, { type: "resume" });
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

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      setCopied(true);
      toast.success("Public link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleDownload = async () => {
    if (!pdfGenRef.current || downloading) return;
    try {
      setDownloading(true);
      toast.info("Preparing PDF download...");
      await pdfGenRef.current.downloadPdf();
      toast.success("Download started!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to download PDF");
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!pdfUrl) return;
    const printWindow = window.open(pdfUrl, "_blank");
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    }
  };

  const zoomIn = () => setScale(s => Math.min(Number((s + 0.15).toFixed(2)), 1.6));
  const zoomOut = () => setScale(s => Math.max(Number((s - 0.15).toFixed(2)), 0.65));
  const resetZoom = () => setScale(1);

  const pageWidth = Math.round(containerWidth * scale);

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Subtle architectural background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            radial-linear(ellipse at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 60%),
            linear-linear(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-linear(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 36px 36px, 36px 36px",
        }}
      />

      {/* Top Professional Navigation Bar */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0B0F17]/85 border-b border-white/10 px-4 sm:px-6 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Candidate Identity */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20 shrink-0">
              {resume?.name ? resume.name.charAt(0).toUpperCase() : "R"}
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0B0F17] rounded-full" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-semibold text-white tracking-tight truncate">
                  {resume?.name || "Professional"}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <ShieldCheck className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                {resume?.jobRole ? (
                  <>
                    <Briefcase className="w-3 h-3 shrink-0" />
                    <span>{resume.jobRole}</span>
                  </>
                ) : (
                  <span>Verified Resume</span>
                )}
                {numPages && (
                  <span className="text-slate-500 hidden md:inline">
                    • {numPages} {numPages === 1 ? "page" : "pages"}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Zoom Controls (hidden on small mobile) */}
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-lg p-1 text-slate-300">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.65}
                title="Zoom Out"
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={resetZoom}
                title="Reset Zoom"
                className="px-2 text-xs font-mono font-medium hover:text-white transition-colors"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={zoomIn}
                disabled={scale >= 1.6}
                title="Zoom In"
                className="p-1.5 hover:bg-white/10 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Print button */}
            <button
              onClick={handlePrint}
              disabled={!pdfUrl}
              title="Print Resume"
              className="hidden sm:inline-flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors disabled:opacity-40"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-slate-200 hover:text-white transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>Share</span>
                </>
              )}
            </button>

            {/* Download PDF CTA */}
            <button
              onClick={handleDownload}
              disabled={!pdfUrl || downloading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              <Download className={`w-3.5 h-3.5 ${downloading ? "animate-bounce" : ""}`} />
              <span className="hidden sm:inline">
                {downloading ? "Downloading..." : "Download PDF"}
              </span>
              <span className="sm:hidden">{downloading ? "..." : "PDF"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Viewer Canvas */}
      <main
        ref={viewerContainerRef}
        className="flex-1 relative flex flex-col items-center justify-start py-8 sm:py-12 px-3 sm:px-6 pb-36 overflow-x-auto"
      >
        {loading ? (
          <div className="my-auto flex flex-col items-center gap-4 py-24 text-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 animate-ping" />
              <div className="relative w-16 h-16 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-500/25">
                <FileCheck className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-white">
                Rendering Professional Document
              </h2>
              <p className="text-xs text-slate-400">Compiling high-resolution vector layout...</p>
            </div>
          </div>
        ) : pdfUrl ? (
          <div className="flex flex-col items-center transition-all duration-200">
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              loading={
                <div className="w-[320px] sm:w-150 h-200 bg-white/5 border border-white/10 rounded-lg animate-pulse flex items-center justify-center">
                  <p className="text-xs text-slate-400">Loading document canvas...</p>
                </div>
              }
              error={
                <div className="p-8 text-center bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  Failed to render resume. Please refresh the page or try again.
                </div>
              }
            >
              {Array.from({ length: numPages || 1 }).map((_, idx) => (
                <div key={idx} className="relative group mb-8 last:mb-0">
                  {/* Subtle paper depth shadow and border */}
                  <div
                    className="relative bg-white rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden transition-transform duration-300"
                    style={{ width: pageWidth }}
                  >
                    <Page
                      pageNumber={idx + 1}
                      width={pageWidth}
                      className="bg-white"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>

                  {/* Page indicator pill */}
                  {numPages && numPages > 1 && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#111622]/90 border border-white/10 text-[10px] font-mono text-slate-400 shadow-md">
                      Page {idx + 1} of {numPages}
                    </div>
                  )}
                </div>
              ))}
            </Document>
          </div>
        ) : (
          <div className="my-auto py-24 text-center">
            <p className="text-sm text-slate-400">Unable to load document.</p>
          </div>
        )}
      </main>

      {/* NextCV Professional Branding Bar at Bottom (Fixed Dock) */}
      <footer className="fixed bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl bg-[#0F141C]/90 backdrop-blur-xl border border-white/15 p-3 sm:p-4 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_20px_rgba(99,102,241,0.15)] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6">
          {/* Subtle linear accent along the top border */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-linear-to-r from-transparent via-indigo-500 to-transparent opacity-80" />

          {/* Left: Branding & Tagline */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 group shrink-0"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white/10 border border-white/20 p-1 flex items-center justify-center group-hover:border-indigo-400/60 transition-colors">
                <Image
                  src="/logos/nextcvlogolight.png"
                  alt="NextCV logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight text-white group-hover:text-indigo-300 transition-colors">
                    NextCV
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-400 px-1.5 py-0.2 rounded bg-indigo-500/10 border border-indigo-500/20">
                    Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden xs:block">
                  Created with NextCV ATS Resume Builder
                </p>
              </div>
            </Link>
          </div>

          {/* Right: CTA to create your own resume */}
          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="text-xs text-slate-400 hidden lg:inline">
              Need a standout resume like this?
            </span>
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:via-indigo-500 hover:to-violet-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              <span>Build Your Resume Free</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
