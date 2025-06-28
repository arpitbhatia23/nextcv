"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { templates } from "@/utils/template";
import { pdf } from "@react-pdf/renderer";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const DownloadPage = () => {
  const [resumeData, setResumeData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const fetchResumeData = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `/api/resume/getResumeById/${resumeId || "685f95aa2764bb4f72bf36e7"}`
      );
      if (res.data.success) {
        setResumeData(res.data.data);
      } else {
        setError("Failed to fetch resume data.");
      }
    } catch (err) {
      setError("Error fetching resume data.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResumeData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let currentUrl = null;
    const generatePdf = async () => {
      if (!resumeData) return;
      const selected = templates.find((t) => t.key === resumeData?.ResumeType);
      if (!selected) {
        setError("Template not found.");
        return;
      }
      const TemplateComponent = selected.component;
      const blob = await pdf(<TemplateComponent data={resumeData} />).toBlob();
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      currentUrl = url;
    };
    generatePdf();
    return () => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
    };
  }, [resumeData]);

  const handleDownload = () => {
    if (!pdfUrl) return;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "resume.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex flex-col items-center justify-center px-2 py-8">
      <Card className="w-full max-w-3xl rounded-xl shadow-lg bg-white/30">
        <CardTitle className="text-center text-2xl font-bold mt-4 mb-2 text-blue-700">
          Resume Preview & Download
        </CardTitle>
        <CardContent className="flex flex-col md:flex-row gap-6 items-center justify-center">
          <div className="w-full md:w-2/3 flex justify-center">
            {loading ? (
              <div className="text-gray-500 text-lg py-12">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-lg py-12">{error}</div>
            ) : pdfUrl ? (
              <div className="border rounded shadow overflow-auto bg-gray-100 max-h-[80vh]">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                  loading={<div className="p-8">Loading PDF...</div>}
                >
                  {Array.from(new Array(numPages), (el, idx) => (
                    <Page
                      key={`page_${idx + 1}`}
                      pageNumber={idx + 1}
                      width={350}
                      className="mx-auto my-2"
                    />
                  ))}
                </Document>
              </div>
            ) : (
              <div className="text-gray-500 text-lg py-12">
                No preview available.
              </div>
            )}
          </div>
          <div className="w-full md:w-1/3 flex flex-col items-center gap-4">
            <button
              onClick={handleDownload}
              disabled={!pdfUrl}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition disabled:opacity-50"
            >
              Download PDF
            </button>
            <div className="text-xs text-gray-400 text-center">
              Your resume is ready! Click the button to download.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadPage;
