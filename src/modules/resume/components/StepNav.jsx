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

/* Fonts: Fraunces for the wordmark, IBM Plex Mono for labels and
   step counter — matches the rest of the builder. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const NAVY = "#1C2333";
const RUST = "#B3382C";
const MUTED = "#6B7280";
const FAINT = "#B7B5AC";
const BORDER = "#E4E2DC";
const BG = "#F7F7F5";
const WHITE = "#FFFFFF";

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
    <div
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{ backgroundColor: "rgba(255,255,255,0.9)", borderColor: BORDER }}
    >
      <FontImports />
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between h-14">
          <h2 className="font-display font-medium text-sm" style={{ color: NAVY }}>
            Resume Builder
          </h2>

          <div className="font-mono text-[10px] tracking-widest" style={{ color: MUTED }}>
            STEP {currentStep + 1} OF {stepsConfig.length}
          </div>
        </div>

        {/* Progress Bar (GPU optimized) */}
        <div className="h-1 overflow-hidden" style={{ backgroundColor: BORDER }}>
          <div
            className="h-full transition-transform duration-300 origin-left"
            style={{
              backgroundColor: RUST,
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

            const textColor = isActive
              ? RUST
              : isCompleted
                ? "#3F7A5C"
                : !isAccessible
                  ? FAINT
                  : MUTED;

            return (
              <button
                key={step.key}
                onClick={() => handleNavigation(index)}
                disabled={!isAccessible}
                className={`flex items-center gap-2 transition whitespace-nowrap font-mono text-xs tracking-widest ${
                  !isAccessible ? "cursor-not-allowed" : ""
                }`}
                style={{ color: textColor }}
              >
                <div
                  className="w-7 h-7 flex items-center justify-center rounded-none border"
                  style={{
                    backgroundColor: isActive ? BG : isCompleted ? "#EEF3EE" : WHITE,
                    borderColor: isActive ? RUST : isCompleted ? "#3F7A5C" : BORDER,
                  }}
                >
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                <span className="uppercase">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
