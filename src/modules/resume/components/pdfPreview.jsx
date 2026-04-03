"use client";
import { WatermarkLayer } from "@/modules/payment/components/WatermarkLayer";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

const PDFPreview = ({ pdfUrl, variant = "desktop", paid = false }) => {
  const [numPages, setNumPages] = useState(null);

  const isMobile = variant === "mobile";

  return (
    <div
      className={`relative flex justify-center ${isMobile ? "p-4" : "p-6 md:p-8"} overflow-auto`}
      onContextMenu={e => e.preventDefault()}
    >
      {pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={
            isMobile ? (
              <div className="text-slate-400 text-sm animate-pulse">Loading Preview...</div>
            ) : (
              <div className="flex flex-col items-center gap-3 p-12 bg-white rounded-xl shadow-sm border">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-slate-500 animate-pulse">Rendering Resume...</p>
              </div>
            )
          }
        >
          {Array.from({ length: numPages || 0 }).map((_, idx) => (
            <div key={idx} className={isMobile ? "mb-2 relative" : "mb-4 relative"}>
              <Page
                pageNumber={idx + 1}
                width={isMobile ? 280 : 600}
                className="bg-white shadow-md max-w-full"
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
              {!paid && <WatermarkLayer />}
            </div>
          ))}
        </Document>
      ) : (
        <div
          className={`bg-white animate-pulse rounded-sm shadow-sm border ${
            isMobile ? "h-60 w-full" : "h-200 w-150"
          }`}
        />
      )}
    </div>
  );
};

export default PDFPreview;
