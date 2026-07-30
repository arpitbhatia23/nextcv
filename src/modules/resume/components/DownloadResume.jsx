"use client";

import FeedbackModal from "@/modules/feedback/components/FeedbackModal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import { toast } from "sonner";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useResumeGen } from "@/modules/resume/hooks/useResumeGen";
import PDFPreview from "./pdfPreview";

export default function DownloadPageContent({ resumeId, coverLetterId }) {
  const docType = resumeId ? "resume" : "coverLetter";
  const docId = resumeId || coverLetterId;

  const [docData, setDocData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    const fetchDocData = async () => {
      setLoading(true);

      try {
        const endpoint =
          docType === "resume"
            ? `/api/resume/getResumeById/${docId}`
            : `/api/cover-letter/getCoverLetterById/${docId}`;

        const res = await axios.get(endpoint);

        if (res.data.success) {
          setDocData(res.data.data);
        } else {
          toast.error(res.data.message || "Something went wrong");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || err.message || "Something went wrong");
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
          selectedTemplate: docData.ResumeType || "classic",
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

  return (
    <div className="min-h-screen bg-[#FBFAF7] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        {/* Folder tab */}
        <div className="ml-6 inline-block bg-[#D9C9A3] px-4 py-1.5 rounded-t-md">
          <span className="font-mono text-[11px] tracking-[0.2em] text-[#23201B]">
            {label} · CLAIM TICKET
          </span>
        </div>

        {/* Folder body */}
        <div className="relative bg-[#D9C9A3] rounded-tr-md rounded-b-md shadow-[0_8px_24px_rgba(35,32,27,0.15)] p-5 sm:p-8">
          {/* Header row: ticket id + stamp */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl text-[#23201B] leading-tight">
                Your {docType === "resume" ? "resume" : "cover letter"} is ready
              </h1>
              <p className="font-mono text-xs text-[#5B6B63] mt-1 tracking-wide">ID · {ticketId}</p>
            </div>

            <div
              className={`shrink-0 border-2 rounded-sm px-3 py-1.5 -rotate-6 font-mono text-xs font-bold tracking-[0.15em] ${
                status === "READY"
                  ? "border-[#A6352C] text-[#A6352C]"
                  : "border-[#5B6B63] text-[#5B6B63]"
              }`}
            >
              {status}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-0">
            {/* Preview: paper sheet */}
            <div className="w-full md:w-2/3 flex justify-center">
              <div className="w-full bg-white rounded-sm shadow-inner overflow-auto max-h-[75vh] p-3">
                {loading ? (
                  <div className="font-mono text-sm text-[#5B6B63] text-center py-16">
                    Fetching your file…
                  </div>
                ) : pdfUrl ? (
                  <PDFPreview pdfUrl={pdfUrl} paid={true} variant="cover-letter" />
                ) : (
                  <div className="font-mono text-sm text-[#5B6B63] text-center py-16">
                    No preview available.
                  </div>
                )}
              </div>
            </div>

            {/* Tear line */}
            <div className="hidden md:flex items-stretch justify-center px-4">
              <div className="border-l-2 border-dashed border-[#23201B]/25" />
            </div>
            <div className="md:hidden border-t-2 border-dashed border-[#23201B]/25 my-6" />

            {/* Ticket stub / action */}
            <div className="w-full md:w-1/3 flex flex-col justify-center gap-4">
              <div className="font-mono text-[11px] text-[#5B6B63] tracking-wide">
                FILE
                <div className="font-sans text-sm text-[#23201B] mt-0.5">{fileName}</div>
              </div>

              <button
                onClick={handleDownload}
                disabled={!pdfUrl}
                className="w-full bg-[#23201B] text-[#FBFAF7] font-mono text-sm tracking-wide py-3 px-6 rounded-sm hover:bg-[#3a352c] transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                DOWNLOAD PDF ↓
              </button>

              <p className="font-sans text-xs text-[#5B6B63] text-center leading-relaxed">
                Save a copy now — this ticket won't reprint itself.
              </p>
            </div>
          </div>
        </div>
      </div>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        resumeId={docId}
      />
    </div>
  );
}
