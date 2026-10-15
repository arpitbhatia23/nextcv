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
  Leaf,
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

const stepEncouragement = {
  start: {
    title: "Your next opportunity starts here.",
    description: "Build a clear, professional resume one step at a time. You’ve got this.",
  },
  template: {
    title: "Choose a design that feels like you.",
    description:
      "Pick a template that presents your strengths clearly. You can focus on your details next.",
  },
  basicInfo: {
    title: "Let recruiters know who you are.",
    description:
      "Add accurate contact details so employers can reach you about the right opportunity.",
  },
  education: {
    title: "Give your learning the spotlight.",
    description:
      "Add your education and qualifications—even projects and coursework can help show your potential.",
  },
  skills: {
    title: "Show the skills you bring to the role.",
    description: "Add relevant technical and professional skills that match the jobs you want.",
  },
  experience: {
    title: "Turn your experience into impact.",
    description: "Focus on what you did, the tools you used, and the results you helped achieve.",
  },
  projects: {
    title: "Let your work speak for you.",
    description:
      "Projects are a great way to demonstrate practical skills, especially early in your career.",
  },
  certificate: {
    title: "Add proof of what you’ve learned.",
    description: "Include relevant certifications and courses that strengthen your application.",
  },
  summary: {
    title: "Bring your professional story together.",
    description:
      "Write a focused summary that connects your strengths with the opportunities you’re targeting.",
  },
  review: {
    title: "You’re close—let’s make it application-ready.",
    description:
      "Review every section, check your details, and make sure your resume reflects your best work.",
  },
};

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
    setSaveStatus("saving");
    const savedTimer = setTimeout(() => setSaveStatus("saved"), 350);
    return () => clearTimeout(savedTimer);
  }, [formData, selectedTemplate]);

  const currentStep = useMemo(() => {
    if (pathname === "/dashboard/builder" || pathname === "/dashboard/builder/") {
      return 0;
    }
    const builderPath = pathname.replace("/dashboard/builder/", "");
    const index = stepsConfig.findIndex(step => step.key === builderPath);
    return index >= 0 ? index : 1;
  }, [pathname]);

  const progress = useMemo(() => ((currentStep + 1) / stepsConfig.length) * 100, [currentStep]);

  const currentStepInfo =
    stepEncouragement[stepsConfig[currentStep]?.key] ?? stepEncouragement.start;

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
    <div className="sticky top-0 z-40 border-b border-[#DDE3D9] bg-white/95 backdrop-blur-xl">
      <FontImports />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <h2 className="font-display whitespace-nowrap text-base font-medium text-[#263A2A]">
              Resume Studio
            </h2>
            <span className="hidden h-1.5 w-1.5 bg-[#DDE3D9] sm:inline-block" />
            <span className="hidden font-mono text-[11px] tracking-wider text-[#667466] sm:inline-block">
              ATS-OPTIMIZED
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div
              aria-live="polite"
              className={`flex items-center gap-1.5 font-mono text-[10px] tracking-wider ${
                saveStatus === "saving" ? "text-[#687568]" : "text-[#356344]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 ${
                  saveStatus === "saving" ? "animate-pulse bg-amber-500" : "bg-[#3F7950]"
                }`}
              />
              <span className="hidden sm:inline">
                {saveStatus === "saving" ? "UPDATING DRAFT" : "DRAFT SAVED LOCALLY"}
              </span>
              <span className="sm:hidden">{saveStatus === "saving" ? "SAVING" : "SAVED"}</span>
            </div>
            <div className="font-mono text-[10px] tracking-widest text-[#788477]">
              {currentStep + 1}/{stepsConfig.length}
            </div>
          </div>
        </div>

        <div
          className="h-1 overflow-hidden bg-[#E7EBE4]"
          role="progressbar"
          aria-label="Resume completion progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-full origin-left bg-[#456B4A] transition-transform duration-300"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>

        <nav
          aria-label="Resume builder steps"
          className="scrollbar-hide flex items-center gap-1 overflow-x-auto py-3 sm:gap-2"
        >
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
                aria-current={isActive ? "step" : undefined}
                className={`group flex shrink-0 select-none items-center gap-2 px-2.5 py-1.5 transition-colors duration-200 ${
                  isActive
                    ? "bg-[#EAF0E8] font-medium text-[#344B38]"
                    : isCompleted
                      ? "text-[#344B38] hover:bg-[#F0F4EE]"
                      : isAccessible
                        ? "text-[#5B695B] hover:bg-[#F0F4EE]"
                        : "cursor-not-allowed text-[#8A9388] opacity-60"
                }`}
              >
                <span
                  className={`flex h-6 w-6 items-center justify-center border text-xs transition-colors ${
                    isActive
                      ? "border-[#456B4A] bg-[#456B4A] text-white"
                      : isCompleted
                        ? "border-[#B8D0B8] bg-[#EAF3E8] text-[#356344]"
                        : isAccessible
                          ? "border-[#DDE3D9] bg-white text-[#667466]"
                          : "border-[#E3E7E0] bg-[#F8F9F6] text-[#8A9388]"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="font-sans text-xs tracking-wide">{step.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex items-start gap-3 border-t border-[#EDF0EA] py-3 sm:items-center">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center bg-[#EAF0E8] text-[#456B4A] sm:mt-0">
            <Leaf className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-semibold leading-5 text-[#2F4632]">
              {currentStepInfo.title}
            </p>
            <p className="mt-0.5 text-xs leading-5 text-[#687568] sm:text-[13px]">
              {currentStepInfo.description}
            </p>
          </div>
          <span className="ml-auto hidden shrink-0 font-mono text-[10px] tracking-wider text-[#72806F] md:block">
            {Math.round(progress)}% COMPLETE
          </span>
        </div>
      </div>
    </div>
  );
}
