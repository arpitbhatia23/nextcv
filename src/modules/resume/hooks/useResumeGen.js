"use client";

import { useEffect, useState } from "react";

export const useResumeGen = ({ formData, selectedTemplate }) => {
  const [pdfUrl, setPdfUrl] = useState("");

  useEffect(() => {
    if (!formData || !selectedTemplate) return;

    let isMounted = true;
    let pdfGen;

    const generate = async () => {
      const { pdfGenerator } = await import("@/shared/lib/pdfGenerator");

      pdfGen = new pdfGenerator(formData, selectedTemplate);

      const url = await pdfGen.createPdf();

      if (isMounted) {
        setPdfUrl(url);
      }
    };

    generate();

    return () => {
      isMounted = false;
      pdfGen?.cleanUp?.();
    };
  }, [formData, selectedTemplate]);

  return { pdfUrl };
};
