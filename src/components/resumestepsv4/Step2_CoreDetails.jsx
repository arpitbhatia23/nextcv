"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import BasicInfoSection from "./sections/BasicInfoSection";
import ExperienceSection from "./sections/ExperienceSection";
import EducationSection from "./sections/EducationSection";

const Step2_CoreDetails = ({ next, previous }) => {
  const basicInfoRef = useRef(null);

  const handleNext = async () => {
    // Optionally validate basic info before proceeding
    if (basicInfoRef.current) {
      const isValid = await basicInfoRef.current.validate();
      if (!isValid) return; // Stop if basic info is missing
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
          Core Identity & Experience
        </h2>
        <p className="text-slate-500 mt-2 text-sm md:text-lg">
          Let's build your professional foundation.
        </p>
      </div>

      <div className="space-y-16">
        {/* Basic Info */}
        <section>
          <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Personal Details</h3>
          </div>
          <BasicInfoSection ref={basicInfoRef} />
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Professional History</h3>
          </div>
          <ExperienceSection />
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-4 mb-6 pb-2 border-b border-slate-100">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-800">Academic Background</h3>
          </div>
          <EducationSection />
        </section>
      </div>

      <div className="pt-8 mt-10 border-t border-slate-100 flex justify-between gap-4">
        <Button
          onClick={previous}
          variant="ghost"
          className="h-12 md:h-14 px-6 md:px-8 rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
        >
          <ArrowLeft className="mr-2 w-5 h-5" /> Back to Templates
        </Button>
        <Button
          onClick={handleNext}
          className="h-12 md:h-14 px-8 md:px-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl md:rounded-2xl font-black shadow-xl shadow-indigo-100 transition-all"
        >
          Technical Profile <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default Step2_CoreDetails;
