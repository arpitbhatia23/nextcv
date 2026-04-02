"use client";
import { pdfGenerator } from "@/shared/lib/pdfGenerator";
import { useEffect, useState } from "react";

export const useResumeGen = ({ formData, selectedTemplate }) => {
  const [pdfUrl, setPdfUrl] = useState("");
  useEffect(() => {
    if (!formData && !selectedTemplate) return;
    const pdfGen = new pdfGenerator(formData, selectedTemplate);
    let isMounted = true;
    pdfGen.createPdf().then(url => {
      if (isMounted) setPdfUrl(url);
    });

    return () => {
      isMounted = false;
      pdfGen.cleanUp();
    };
  }, [formData, selectedTemplate]);

  return { pdfUrl };
};
