"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
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

export default function StepNav() {
  const pathname = usePathname();
  const router = useRouter();

  // 🔍 Find current step index
  const currentStep = useMemo(() => {
    return stepsConfig.findIndex(step => pathname.includes(step.key));
  }, [pathname]);

  const progress = useMemo(() => {
    return ((currentStep + 1) / stepsConfig.length) * 100;
  }, [currentStep]);

  const handleNavigation = index => {
    if (stepsConfig[index].key == "template") {
      router.push("/dashboard/builder/");
    } else if (index <= currentStep) {
      router.push(`/dashboard/builder/${stepsConfig[index].key}`);
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-8xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between h-14">
          <h2 className="text-sm font-semibold text-slate-800">Resume Builder</h2>

          <div className="text-xs text-slate-500">
            Step {currentStep + 1} of {stepsConfig.length}
          </div>
        </div>

        {/* Progress Bar (GPU optimized) */}
        <div className="h-1 bg-slate-200 rounded overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-transform duration-300 origin-left"
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex gap-6 py-3 overflow-x-auto">
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
                className={`flex items-center gap-2 transition whitespace-nowrap
                  ${isActive && "text-indigo-600"}
                  ${isCompleted && "text-emerald-600"}
                  ${!isAccessible && "text-slate-400 cursor-not-allowed"}
                `}
              >
                <div
                  className={`w-7 h-7 flex items-center justify-center rounded-full border
                    ${isActive && "bg-indigo-50 border-indigo-200"}
                    ${isCompleted && "bg-emerald-50 border-emerald-200"}
                    ${!isAccessible && "border-slate-200"}
                  `}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                <span className="text-sm font-medium">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
