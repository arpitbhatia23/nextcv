"use client";

import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { templates } from "@/utils/template";
import { dummyResumeData } from "@/data/dummyResumeData";
import { Download, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

/* ================================
   TEMPLATE PROFILE MAP
================================ */

const templateProfileMap = {
  modernTemplate: "tech",
  ModernFullStack: "tech",
  TechDark: "tech",
  GoogleTech: "tech",
  MicrosoftCorp: "tech",
  AmazonOperations: "tech",
  MetaSocial: "tech",
  TcsDigital: "tech",
  InfosysSystem: "tech",
  WiproModern: "tech",
  HclTech: "tech",
  MahindraRise: "tech",
  IbmClassic: "tech",
  AccentureConsult: "tech",
  CapgeminiFlow: "tech",
  CiscoNet: "tech",
  OracleDb: "tech",
  SapEnterprise: "tech",
  NetflixCulture: "tech",

  ClinicalTrial: "medical",
  MedicalNurse: "medical",

  GoldmanFinance: "finance",
  JpmorganChase: "finance",
  DeloitteAudit: "finance",

  MarketingCreative: "creative",
  CreativeTeal: "creative",
  AppleCreative: "creative",
  InfographicLite: "creative",

  LegalProfessional: "legal",
  AcademicTeacher: "academic",
  SalesGrowth: "sales",

  ExecutiveGray: "management",
  BoldHeader: "management",
  SidebarLeft: "management",
  CompactModern: "management",

  classicTemplate: "default",
  MinimalistTemplate: "default",
  MordenBluesidebar: "default",
  ProfessionalClean: "default",
};

/* ================================
   MAIN COMPONENT
================================ */

export default function TemplatePreviewPage() {
  const [previewUrls, setPreviewUrls] = useState({});
  const [loadingMap, setLoadingMap] = useState({});

  /* ================================
     GENERATE PREVIEW BLOBS
  ================================= */

  useEffect(() => {
    let isMounted = true;

    const generatePreviews = async () => {
      const results = {};

      for (const template of templates) {
        try {
          const profileKey = templateProfileMap[template.key] || "default";

          const data = dummyResumeData[profileKey];
          console.log("this my data", data);
          const Component = template.component;

          const blob = await pdf(<Component data={data} />).toBlob();

          const url = URL.createObjectURL(blob);
          results[template.key] = url;
        } catch (err) {
          console.error(`Error generating preview for ${template.key}`, err);
        }
      }

      if (isMounted) setPreviewUrls(results);
    };

    generatePreviews();

    return () => {
      isMounted = false;

      // cleanup URLs
      Object.values(previewUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  /* ================================
     DOWNLOAD HANDLER
  ================================= */

  const handleDownload = async (template) => {
    try {
      setLoadingMap((prev) => ({
        ...prev,
        [template.key]: true,
      }));

      const profileKey = templateProfileMap[template.key] || "default";

      const data = dummyResumeData[profileKey];
      const Component = template.component;
      console.log(data);
      const blob = await pdf(<Component data={data} />).toBlob();

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${template.key}_preview.pdf`;
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setLoadingMap((prev) => ({
        ...prev,
        [template.key]: false,
      }));
    }
  };

  /* ================================
     UI
  ================================= */

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">
            Template Gallery
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Browse professionally designed resume templates. Each template uses
            role-specific example data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {templates.map((template) => {
            const profileKey = templateProfileMap[template.key] || "default";

            const pdfUrl = previewUrls[template.key];

            return (
              <div
                key={template.key}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 flex flex-col h-300"
              >
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">
                      {template.label}
                    </h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 rounded-full text-slate-500 capitalize">
                      {profileKey} Profile
                    </span>
                  </div>

                  <button
                    onClick={() => handleDownload(template)}
                    disabled={loadingMap[template.key]}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
                  >
                    {loadingMap[template.key] ? (
                      <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
                    ) : (
                      <Download className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* PDF Preview */}
                <div className="flex-1 bg-slate-200">
                  {pdfUrl ? (
                    <Document
                      file={pdfUrl}
                      loading={
                        <div className="flex flex-col items-center gap-3 p-12 bg-white rounded-xl shadow-sm border border-slate-100">
                          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                          <p className="text-sm font-medium text-slate-500 animate-pulse">
                            Rendering Resume...
                          </p>
                        </div>
                      }
                      error={
                        <div className="text-red-500 bg-white p-4 rounded-lg shadow-sm">
                          Failed to load preview
                        </div>
                      }
                    >
                      <div className="mb-4 last:mb-0">
                        <Page
                          pageNumber={1}
                          width={600}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                          className="bg-white"
                        />
                      </div>
                    </Document>
                  ) : (
                    <div className="h-200 w-150 bg-white animate-pulse rounded-sm shadow-sm border border-slate-200" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
