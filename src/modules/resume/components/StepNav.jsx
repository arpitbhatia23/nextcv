"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  User,
  GraduationCap,
  Settings,
  Briefcase,
  Code,
  Award,
  CheckCircle,
} from "lucide-react";
import useResumeStore from "@/store/useResumeStore";

const stepsConfig = [
  { key: "template", label: "Template", icon: FileText },
  { key: "basicInfo", label: "Basic Info", icon: User },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "skills", label: "Skills", icon: Settings },
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "projects", label: "Projects", icon: Code },
  { key: "certificate", label: "Certificates", icon: Award },
  { key: "summary", label: "Summary", icon: FileText },
  { key: "review", label: "Review", icon: CheckCircle },
];

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

export default function StepNav() {
  const pathname = usePathname();
  const router = useRouter();
  const formData = useResumeStore(state => state.formData);
  const selectedTemplate = useResumeStore(state => state.selectedTemplate);
  const [saveStatus, setSaveStatus] = useState("saved");

  useEffect(() => {
    const savingTimer = setTimeout(() => setSaveStatus("saving"), 0);
    const savedTimer = setTimeout(() => setSaveStatus("saved"), 350);

    return () => {
      clearTimeout(savingTimer);
      clearTimeout(savedTimer);
    };
  }, [formData, selectedTemplate]);

  // 🔍 Find current step index
  const currentStep = useMemo(() => {
    return stepsConfig.findIndex(step => pathname.includes(step.key));
  }, [pathname]);

  const progress = useMemo(() => {
    return ((currentStep + 1) / stepsConfig.length) * 100;
  }, [currentStep]);

  const handleNavigation = index => {
    if (stepsConfig[index].key === "template") {
      router.push("/dashboard/builder/");
    } else if (index <= currentStep) {
      router.push(`/dashboard/builder/${stepsConfig[index].key}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#E3E2DC]">
      <FontImports />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Row */}
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <h2 className="font-display font-medium text-base text-[#17201C]">
              Resume Studio
            </h2>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#E3E2DC]" />
            <span className="hidden sm:inline-block font-mono text-[11px] text-[#66706B] tracking-wider">
              ATS-OPTIMIZED
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className={`font-mono text-[10px] tracking-wider flex items-center gap-1.5 ${
                saveStatus === "saving" ? "text-[#66706B]" : "text-emerald-700"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  saveStatus === "saving" ? "bg-amber-500 animate-pulse" : "bg-emerald-600"
                }`}
              />
              {saveStatus === "saving" ? "SAVING..." : "SAVED LOCALLY"}
            </div>
            <div className="font-mono text-[10px] tracking-widest text-[#8A908B]">
              STEP {currentStep + 1} OF {stepsConfig.length}
            </div>
          </div>
        </div>

        {/* Progress Bar (GPU optimized) */}
        <div className="h-1 overflow-hidden bg-[#E3E2DC] rounded-full">
          <div
            className="h-full bg-[#465B9E] transition-transform duration-300 origin-left rounded-full"
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex items-center gap-2 sm:gap-4 py-3 overflow-x-auto scrollbar-hide">
          {stepsConfig.map((step, index) => {
            const Icon = step.icon;

            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isAccessible = index <= currentStep;

            return (
              <button
                key={step.key}
                onClick={() => handleNavigation(index)}
                disabled={!isAccessible}
                className={`group flex items-center gap-2 py-1 px-2.5 rounded-xl transition-all duration-200 shrink-0 select-none ${
                  isActive
                    ? "bg-[#EEF0F7] text-[#465B9E] font-medium"
                    : isCompleted
                      ? "text-[#17201C] hover:bg-[#F1F0EB]"
                      : isAccessible
                        ? "text-[#5B625C] hover:bg-[#F1F0EB]"
                        : "text-[#8A908B] cursor-not-allowed opacity-60"
                }`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center rounded-lg border text-xs transition-colors ${
                    isActive
                      ? "bg-white border-[#465B9E] text-[#465B9E]"
                      : isCompleted
                        ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                        : isAccessible
                          ? "bg-white border-[#E3E2DC] text-[#66706B]"
                          : "bg-[#F8F7F3] border-[#E3E2DC] text-[#8A908B]"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-3.5 h-3.5" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>

                <span className="font-sans text-xs tracking-wide">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
