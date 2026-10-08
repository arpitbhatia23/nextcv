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
  Play,
} from "lucide-react";
import useResumeStore from "@/store/useResumeStore";

const stepsConfig = [
  { key: "start", label: "Start", icon: Play },
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

    .font-display {
      font-family: 'Fraunces', serif;
    }

    .font-mono {
      font-family: 'IBM Plex Mono', monospace;
    }
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

  const currentStep = useMemo(() => {
    if (pathname === "/dashboard/builder" || pathname === "/dashboard/builder/") {
      return 0;
    }

    const builderPath = pathname.replace("/dashboard/builder/", "");

    const index = stepsConfig.findIndex(step => step.key === builderPath);

    return index >= 0 ? index : 1;
  }, [pathname]);

  const progress = useMemo(() => {
    return ((currentStep + 1) / stepsConfig.length) * 100;
  }, [currentStep]);

  const handleNavigation = index => {
    const step = stepsConfig[index];

    if (!step) return;

    if (step.key === "start") {
      router.push("/dashboard/builder");
      return;
    }

    if (step.key === "template") {
      router.push("/dashboard/builder/template-selection");
      return;
    }

    if (index <= currentStep) {
      router.push(`/dashboard/builder/${step.key}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 border-b border-[#E3E2DC] bg-white/90 backdrop-blur-xl">
      <FontImports />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Row */}
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-base font-medium text-[#17201C]">Resume Studio</h2>

            {/* plain dot — keeping rounded-full only on this decorative dot */}
            <span className="hidden h-1.5 w-1.5 rounded-full bg-[#E3E2DC] sm:inline-block" />

            <span className="hidden font-mono text-[11px] tracking-wider text-[#66706B] sm:inline-block">
              ATS-OPTIMIZED
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Save Status */}
            <div
              className={`flex items-center gap-1.5 font-mono text-[10px] tracking-wider ${
                saveStatus === "saving" ? "text-[#66706B]" : "text-emerald-700"
              }`}
            >
              {/* status dot — rounded-full only here */}
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  saveStatus === "saving" ? "animate-pulse bg-amber-500" : "bg-emerald-600"
                }`}
              />

              {saveStatus === "saving" ? "SAVING..." : "SAVED LOCALLY"}
            </div>

            {/* Step Counter */}
            <div className="font-mono text-[10px] tracking-widest text-[#8A908B]">
              STEP {currentStep + 1} OF {stepsConfig.length}
            </div>
          </div>
        </div>

        {/* Progress Bar — kept as bar, no rounding */}
        <div className="h-px overflow-hidden bg-[#E3E2DC]">
          <div
            className="h-full origin-left bg-[#465B9E] transition-transform duration-300"
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="scrollbar-hide flex items-center gap-1 overflow-x-auto py-3 sm:gap-2">
          {stepsConfig.map((step, index) => {
            const Icon = step.icon;

            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isAccessible = index <= currentStep;

            return (
              <button
                key={step.key}
                type="button"
                onClick={() => handleNavigation(index)}
                disabled={!isAccessible}
                className={`group flex shrink-0 select-none items-center gap-2 px-2.5 py-1.5 transition-all duration-200 ${
                  isActive
                    ? "bg-[#EEF0F7] font-medium text-[#465B9E]"
                    : isCompleted
                      ? "text-[#17201C] hover:bg-[#F1F0EB]"
                      : isAccessible
                        ? "text-[#5B625C] hover:bg-[#F1F0EB]"
                        : "cursor-not-allowed text-[#8A908B] opacity-60"
                }`}
              >
                {/* Step icon box — square, no rounding */}
                <div
                  className={`flex h-6 w-6 items-center justify-center border text-xs transition-colors ${
                    isActive
                      ? "border-[#465B9E] bg-white text-[#465B9E]"
                      : isCompleted
                        ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                        : isAccessible
                          ? "border-[#E3E2DC] bg-white text-[#66706B]"
                          : "border-[#E3E2DC] bg-[#F8F7F3] text-[#8A908B]"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
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
