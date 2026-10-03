"use client";

import { WatermarkLayer } from "@/modules/payment/components/WatermarkLayer";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFPreview = ({ pdfUrl, variant = "desktop", paid = false }) => {
  const [numPages, setNumPages] = useState(null);

  const isMobile = variant === "mobile";
  const isCoverLetter = variant === "cover-letter";

  const pageWidth = isMobile ? 280 : isCoverLetter ? 420 : 400;

  const containerPadding = isMobile ? "p-4" : isCoverLetter ? "p-3 sm:p-4" : "p-5 sm:p-6 md:p-8";

  return (
    <div
      className={`
        relative
        flex
        w-full
        justify-center
        overflow-auto
        bg-[#F8F7F3]
        ${containerPadding}
      `}
      onContextMenu={e => e.preventDefault()}
      aria-label={isCoverLetter ? "Cover letter preview" : "Resume preview"}
    >
      {pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<PDFLoadingState isMobile={isMobile} isCoverLetter={isCoverLetter} />}
          error={<PDFErrorState isMobile={isMobile} isCoverLetter={isCoverLetter} />}
        >
          {/* 
            Fixed preview viewport.
            Multiple pages scroll vertically inside this area
            instead of increasing the entire page height.
          */}
          <div
            className={`
              w-full
              overflow-y-auto
              overflow-x-hidden
              rounded-xl
              border
              border-[#E3E2DC]
              bg-[#F1F0EB]
              ${isMobile ? "max-h-[65vh]" : isCoverLetter ? "max-h-[72vh]" : "max-h-[75vh]"}
            `}
          >
            <div
              className={`
                flex
                w-full
                flex-col
                items-center
                ${isMobile || isCoverLetter ? "gap-3 p-3" : "gap-5 p-4 sm:p-5"}
              `}
            >
              {Array.from({
                length: numPages || 0,
              }).map((_, idx) => (
                <div key={idx} className="relative shrink-0">
                  {/* Page */}
                  <div
                    className="
                      overflow-hidden
                      bg-white
                      border
                      border-[#E3E2DC]
                      shadow-[0_12px_35px_rgba(23,32,28,0.10)]
                    "
                  >
                    <Page
                      pageNumber={idx + 1}
                      width={pageWidth}
                      className="block max-w-full bg-white"
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>

                  {/* Watermark */}
                  {!paid && <WatermarkLayer />}
                </div>
              ))}
            </div>
          </div>
        </Document>
      ) : (
        <PDFEmptyState isMobile={isMobile} isCoverLetter={isCoverLetter} />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Loading State                                                              */
/* -------------------------------------------------------------------------- */

const PDFLoadingState = ({ isMobile, isCoverLetter }) => {
  return (
    <div
      className="
        flex
        w-full
        items-center
        justify-center
        bg-[#F8F7F3]
        p-8
        sm:p-12
      "
      role="status"
      aria-live="polite"
    >
      {isMobile ? (
        <div className="flex items-center gap-2 text-sm text-[#66706B]">
          <span
            className="
              h-4
              w-4
              animate-spin
              rounded-full
              border-2
              border-[#E3E2DC]
              border-t-[#465B9E]
            "
          />
          <span>Loading preview...</span>
        </div>
      ) : (
        <div
          className="
            flex
            flex-col
            items-center
            gap-4
            rounded-2xl
            border
            border-[#E3E2DC]
            bg-white
            px-8
            py-10
            shadow-[0_10px_40px_rgba(23,32,28,0.06)]
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#EEF0F7]
            "
          >
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

          <div className="text-center">
            <p className="text-sm font-medium text-[#17201C]">Rendering preview</p>

            <p className="mt-1 text-xs text-[#66706B]">
              {isCoverLetter ? "Preparing your cover letter..." : "Preparing your resume..."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Empty State                                                                */
/* -------------------------------------------------------------------------- */

const PDFEmptyState = ({ isMobile, isCoverLetter }) => {
  return (
    <div
      className={`
        flex
        items-center
        justify-center
        border
        border-[#E3E2DC]
        bg-white
        text-center
        ${
          isMobile
            ? "min-h-60 w-full"
            : isCoverLetter
              ? "min-h-145 w-105 max-w-full"
              : "min-h-175 w-100 max-w-full"
        }
      `}
      role="status"
      aria-live="polite"
    >
      <div className="px-6">
        <div
          className="
            mx-auto
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#F1F0EB]
          "
        >
          <div
            className="
              h-3
              w-3
              rounded-full
              bg-[#465B9E]
              opacity-70
            "
          />
        </div>

        <p className="mt-4 text-sm font-medium text-[#17201C]">
          {isCoverLetter ? "Loading cover letter preview" : "Loading resume preview"}
        </p>

        <p className="mt-1 text-xs text-[#66706B]">Please wait a moment...</p>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Error State                                                                */
/* -------------------------------------------------------------------------- */

const PDFErrorState = ({ isMobile, isCoverLetter }) => {
  return (
    <div
      className="
        flex
        min-h-60
        w-full
        items-center
        justify-center
        border
        border-[#E3E2DC]
        bg-white
        p-6
        text-center
      "
      role="alert"
    >
      <div>
        <div
          className="
            mx-auto
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[#F1F0EB]
            text-[#66706B]
          "
        >
          !
        </div>

        <p className="mt-4 text-sm font-medium text-[#17201C]">Unable to load preview</p>

        <p className="mt-1 text-xs text-[#66706B]">
          {isCoverLetter
            ? "The cover letter preview could not be rendered."
            : "The resume preview could not be rendered."}
        </p>
      </div>
    </div>
  );
};

export default PDFPreview;
