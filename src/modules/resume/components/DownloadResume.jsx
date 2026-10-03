"use client";

import FeedbackModal from "@/modules/feedback/components/FeedbackModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useResumeGen } from "@/modules/resume/hooks/useResumeGen";
import PDFPreview from "./pdfPreview";
import { Check, Download, FileText, LayoutDashboard, Share2 } from "lucide-react";
import ShareResumeModal from "@/modules/shared-resume/components/ShareResumeModal";
import dynamic from "next/dynamic";
import { getTemplateByName } from "@/modules/resume/services/templateMap";

const SharePortfolioModal = dynamic(
  () => import("@/modules/portfolio/components/SharePortfolioModal")
);

export default function DownloadPageContent({ resumeId, coverLetterId }) {
  const docType = resumeId ? "resume" : "coverLetter";
  const docId = resumeId || coverLetterId;

  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  useEffect(() => {
    const fetchDocData = async () => {
      setLoading(true);

      try {
        const endpoint =
          docType === "resume"
            ? `/api/resume/getResumeById/${docId}`
            : `/api/cover-letter/getCoverLetterById/${docId}`;

        const res = await axios.get(endpoint);

        if (res?.data?.success) {
          setDocData(res.data.data);
        } else {
          toast.error(res?.data?.message || "Something went wrong");
        }
      } catch (err) {
        toast.error(err?.response?.data?.message || err?.message || "Something went wrong");
      }

      setLoading(false);
    };

    fetchDocData();
  }, [docId, docType]);

  const pdfDataReady = docType === "resume" ? docData && docData.ResumeType : Boolean(docData);

  const { pdfUrl } = useResumeGen(
    pdfDataReady
      ? {
          formData: docData,
          selectedTemplate: docData?.ResumeType || "classic",
          type: docType === "resume" ? "resume" : "cover-letter",
        }
      : {}
  );

  const handleDownload = () => {
    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = docType === "resume" ? "resume.pdf" : "cover-letter.pdf";

    link.click();
  };

  const label = docType === "resume" ? "RESUME" : "COVER LETTER";

  const fileName = docType === "resume" ? "resume.pdf" : "cover-letter.pdf";

  const ticketId = docId ? docId.slice(-8).toUpperCase() : "--------";

  const status = pdfUrl ? "READY" : loading ? "PROCESSING" : "NO FILE";

  // Resume tier — only relevant for resumes.
  const templateTier = docData?.ResumeType
    ? getTemplateByName(docData.ResumeType)?.tier?.toLowerCase()
    : null;

  const isPremiumOrElite = templateTier === "premium" || templateTier === "elite";

  const isElite = templateTier === "elite";

  return (
    <div className="min-h-screen bg-[#F8F7F3] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* ---------------------------------------------------------------- */}
        {/* Page Header                                                       */}
        {/* ---------------------------------------------------------------- */}

        <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF0F7]">
                <FileText className="h-4 w-4 text-[#465B9E]" strokeWidth={1.8} />
              </div>

              <span className="font-mono text-[10px] font-medium tracking-[0.16em] text-[#66706B]">
                {label} · DOCUMENT
              </span>
            </div>

            <h1 className="font-serif text-3xl leading-tight tracking-[-0.02em] text-[#17201C] sm:text-4xl">
              Your {docType === "resume" ? "resume" : "cover letter"} is ready
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#5B625C]">
              Your document has been prepared and is ready to download or share.
            </p>
          </div>

          {/* Document status */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.12em] text-[#8A908B]">
              ID · {ticketId}
            </span>

            <StatusBadge status={status} />
          </div>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* Main Workspace                                                    */}
        {/* ---------------------------------------------------------------- */}

        <section
          className="
            overflow-hidden
            rounded-3xl
            border
            border-[#E3E2DC]
            bg-white
            shadow-[0_10px_40px_rgba(23,32,28,0.06)]
          "
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* ------------------------------------------------------------ */}
            {/* Document Preview                                               */}
            {/* ------------------------------------------------------------ */}

            <div className="min-w-0 border-b border-[#E3E2DC] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-[#E7E5DF] px-5 py-4 sm:px-7">
                <div>
                  <p className="text-sm font-medium text-[#17201C]">Document preview</p>

                  <p className="mt-0.5 text-xs text-[#66706B]">{fileName}</p>
                </div>

                {status === "READY" && (
                  <div className="flex items-center gap-1.5 text-xs text-[#66706B]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#465B9E]" />
                    Ready
                  </div>
                )}
              </div>

              <div className="min-h-155 bg-[#F1F0EB] p-3 sm:p-5 md:p-7">
                {loading ? (
                  <PreviewLoading />
                ) : pdfUrl ? (
                  <div className="flex min-h-140 items-start justify-center overflow-hidden">
                    <PDFPreview pdfUrl={pdfUrl} paid={true} variant="cover-letter" />
                  </div>
                ) : (
                  <PreviewEmpty />
                )}
              </div>
            </div>

            {/* ------------------------------------------------------------ */}
            {/* Actions Panel                                                  */}
            {/* ------------------------------------------------------------ */}

            <aside className="flex flex-col bg-white">
              <div className="flex-1 p-5 sm:p-7">
                {/* File information */}
                <div className="mb-8">
                  <p className="mb-3 font-mono text-[10px] font-medium tracking-[0.14em] text-[#8A908B]">
                    DOCUMENT
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F1F0EB]">
                      <FileText className="h-5 w-5 text-[#465B9E]" strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-[#17201C]">{fileName}</p>

                      <p className="mt-0.5 text-xs text-[#66706B]">
                        {docType === "resume" ? "Professional resume" : "Cover letter"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary action */}
                <div className="space-y-3">
                  <button
                    onClick={handleDownload}
                    disabled={!pdfUrl}
                    className="
                      flex
                      min-h-12
                      w-full
                      items-center
                      justify-center
                      gap-2.5
                      rounded-xl
                      bg-[#465B9E]
                      px-5
                      py-3
                      text-sm
                      font-medium
                      text-white
                      transition-colors
                      duration-200
                      hover:bg-[#344B93]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#465B9E]/30
                      disabled:cursor-not-allowed
                      disabled:opacity-40
                    "
                  >
                    <Download className="h-4 w-4" strokeWidth={1.8} />
                    Download PDF
                  </button>

                  {/* Share Resume */}
                  {docType === "resume" && isPremiumOrElite && (
                    <button
                      onClick={() => setIsShareOpen(true)}
                      disabled={!docData}
                      className="
                          flex
                          min-h-11
                          w-full
                          items-center
                          justify-center
                          gap-2.5
                          rounded-xl
                          border
                          border-[#E3E2DC]
                          bg-white
                          px-5
                          py-2.5
                          text-sm
                          font-medium
                          text-[#17201C]
                          transition-colors
                          duration-200
                          hover:border-[#C8CDD9]
                          hover:bg-[#FAFAF8]
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#465B9E]/30
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                    >
                      <Share2 className="h-4 w-4 text-[#465B9E]" strokeWidth={1.8} />
                      Share resume
                    </button>
                  )}

                  {/* Share Portfolio */}
                  {docType === "resume" && isElite && (
                    <button
                      onClick={() => setIsPortfolioOpen(true)}
                      disabled={!docData}
                      className="
                        flex
                        min-h-11
                        w-full
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        border
                        border-[#E3E2DC]
                        bg-[#F8F7F3]
                        px-5
                        py-2.5
                        text-sm
                        font-medium
                        text-[#17201C]
                        transition-colors
                        duration-200
                        hover:border-[#C8CDD9]
                        hover:bg-[#F1F0EB]
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#465B9E]/30
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                      "
                    >
                      <LayoutDashboard className="h-4 w-4 text-[#465B9E]" strokeWidth={1.8} />
                      Share portfolio
                    </button>
                  )}
                </div>

                {/* Divider */}
                <div className="my-8 h-px bg-[#E7E5DF]" />

                {/* Document details */}
                <div>
                  <p className="mb-4 font-mono text-[10px] font-medium tracking-[0.14em] text-[#8A908B]">
                    DETAILS
                  </p>

                  <div className="space-y-4">
                    <DetailRow label="Format" value="PDF" />

                    <DetailRow label="Status" value={status} />

                    {docType === "resume" && templateTier && (
                      <DetailRow label="Template" value={docData?.ResumeType || "Standard"} />
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom note */}
              <div className="border-t border-[#E7E5DF] bg-[#F8F7F3] p-5 sm:p-7">
                <div className="flex gap-3">
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white">
                    <Check className="h-3.5 w-3.5 text-[#465B9E]" strokeWidth={2} />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[#17201C]">
                      Keep a copy of your document
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#66706B]">
                      Download your PDF so you always have an offline copy ready to send.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Feedback */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsFeedbackOpen(true)}
            className="
              text-xs
              text-[#66706B]
              underline-offset-4
              transition-colors
              hover:text-[#17201C]
              hover:underline
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#465B9E]/30
            "
          >
            Have feedback about this document?
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Modals                                                              */}
      {/* ------------------------------------------------------------------ */}

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        resumeId={docId}
      />

      <ShareResumeModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        resume={docData}
      />

      <SharePortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        resume={docData}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }) {
  const isReady = status === "READY";

  return (
    <div
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        font-mono
        text-[9px]
        font-medium
        tracking-[0.12em]
        ${
          isReady
            ? "border-[#C9D0E5] bg-[#EEF0F7] text-[#465B9E]"
            : "border-[#E3E2DC] bg-[#F1F0EB] text-[#66706B]"
        }
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${isReady ? "bg-[#465B9E]" : "bg-[#8A908B]"}
        `}
      />

      {status}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail Row                                                                 */
/* -------------------------------------------------------------------------- */

function DetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-[#66706B]">{label}</span>

      <span className="max-w-42.5 truncate text-right text-xs font-medium text-[#17201C]">
        {value}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview Loading                                                            */
/* -------------------------------------------------------------------------- */

function PreviewLoading() {
  return (
    <div
      className="
        flex
        min-h-140
        items-center
        justify-center
      "
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white">
          <span
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-[#D9DDEB]
              border-t-[#465B9E]
            "
          />
        </div>

        <p className="mt-4 text-sm font-medium text-[#17201C]">Preparing your document</p>

        <p className="mt-1 text-xs text-[#66706B]">This may take a moment...</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Preview Empty                                                              */
/* -------------------------------------------------------------------------- */

function PreviewEmpty() {
  return (
    <div className="flex min-h-140 items-center justify-center">
      <div className="text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white">
          <FileText className="h-5 w-5 text-[#8A908B]" strokeWidth={1.6} />
        </div>

        <p className="mt-4 text-sm font-medium text-[#17201C]">No preview available</p>

        <p className="mt-1 text-xs text-[#66706B]">Your document could not be previewed.</p>
      </div>
    </div>
  );
}
