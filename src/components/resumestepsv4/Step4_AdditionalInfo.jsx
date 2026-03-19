"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import CertificateSection from "./sections/CertificateSection";
import SummarySection from "./sections/SummarySection";

const Step4_AdditionalInfo = ({ next, previous }) => {
  const summaryRef = useRef(null);

  const handleNext = async () => {
    if (summaryRef.current) {
      const isValid = await summaryRef.current.validate();
      if (!isValid) return; // Summary is required (min 20 chars usually)
    }
    next();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-10"
    >
      <div>
        <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">
          Additional Info & Impact
        </h2>
        <p className="text-slate-500 mt-2 text-sm md:text-lg">
          Add certifications and synthesize your career summary.
        </p>
      </div>

      <div className="space-y-16">
        {/* Certificates */}
        <section>
          <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">1</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Certifications & Awards</h3>
          </div>
          <CertificateSection />
        </section>

        {/* Summary */}
        <section>
          <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">2</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Career Summary</h3>
          </div>
          <SummarySection ref={summaryRef} />
        </section>
      </div>

      <div className="pt-8 mt-10 border-t border-slate-100 flex justify-between gap-4">
        <Button
          onClick={previous}
          variant="ghost"
          className="h-12 md:h-14 px-6 md:px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> Tech Profile
        </Button>
        <Button
          onClick={handleNext}
          className="h-12 md:h-14 px-8 md:px-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-emerald-100 transition-all"
        >
          Go to Final Review <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default Step4_AdditionalInfo;
