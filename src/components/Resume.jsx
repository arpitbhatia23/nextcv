"use client";
import React, { useState } from "react";
import BasicInfoStep from "./resumesteps/BasicInfoStep";
import SummaryStep from "./resumesteps/SummaryStep";
import EducationStep from "./resumesteps/EducationStep";
import SkillStep from "./resumesteps/SkillStep";
import ExpricenceStep from "./resumesteps/ExpricenceStep";
import FinalStep from "./resumesteps/FinalStep";
import CertificateStep from "./resumesteps/Certificate";
import ProjectsStep from "./resumesteps/ProjectsStep";

import {
  Award,
  Briefcase,
  CheckCircle,
  Code,
  FileText,
  GraduationCap,
  Settings,
  User,
} from "lucide-react";
import Logo2 from "./Logo2";
import useResumeStore from "@/store/useResumeStore";

const Resume = () => {
  const [step, setStep] = useState(0);
  const formData = useResumeStore((s) => s.formData);
  const updateForm = useResumeStore((s) => s.updateForm);
  const clearDraft = useResumeStore((s) => s.clearStorage);

  const resumeSteps = [
    { component: BasicInfoStep, title: "Basic Info", icon: User },
    { component: EducationStep, title: "Education", icon: GraduationCap },
    { component: SkillStep, title: "Skills", icon: Settings },
    { component: ExpricenceStep, title: "Experience", icon: Briefcase },
    { component: ProjectsStep, title: "Projects", icon: Code },
    { component: CertificateStep, title: "Certifications", icon: Award },
    { component: SummaryStep, title: "Summary", icon: FileText },
    { component: FinalStep, title: "Review", icon: CheckCircle },
  ];

  const next = () => {
    setStep((prev) => Math.min(prev + 1, resumeSteps.length - 1));
  };
  const previous = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };
  const goToStep = (stepIndex) => {
    setStep(stepIndex);
  };

  const progress = ((step + 1) / resumeSteps.length) * 100;
  const StepComponents = resumeSteps[step]?.component;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo2 size={40} color="#0f172a" />
              <div className="hidden md:block h-6 w-px bg-slate-200" />
              <h1 className="hidden md:block text-sm font-semibold text-slate-900">
                Resume Builder
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-xs font-medium text-slate-500">
                Step {step + 1} of {resumeSteps.length}
              </div>
              <div className="w-32 md:w-48 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Steps Navigation - Horizontal */}
      <div className="bg-white border-b border-slate-100 mb-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 min-w-max">
          <div className="flex items-center py-4 gap-8">
            {resumeSteps.map((stepInfo, index) => {
              const Icon = stepInfo.icon;
              const isActive = index === step;
              const isCompleted = index < step;
              const isAccessible = index <= step;

              return (
                <button
                  key={index}
                  onClick={() => isAccessible && goToStep(index)}
                  className={`flex items-center gap-2 group outline-none transition-colors ${
                    isActive
                      ? "text-indigo-600"
                      : isCompleted
                        ? "text-emerald-600"
                        : "text-slate-400"
                  } ${!isAccessible && "opacity-50 cursor-not-allowed"}`}
                  disabled={!isAccessible}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                      isActive
                        ? "bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm"
                        : isCompleted
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                          : "bg-white border-slate-200 text-slate-400 group-hover:border-slate-300"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${isActive ? "text-indigo-900" : ""}`}
                  >
                    {stepInfo.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`mx-auto px-4 md:px-6 ${step === resumeSteps.length - 1 ? "max-w-400" : "max-w-4xl"}`}
      >
        <StepComponents
          next={next}
          previous={previous}
          formData={formData}
          updateForm={updateForm}
        />
      </div>
    </div>
  );
};
export default Resume;
