"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import useResumeStore from "@/store/useResumeStore";
import { Paintbrush, User, Code, Zap, CheckCircle } from "lucide-react";
import Logo2 from "./Logo2";

// Dynamic imports for the new V4 steps
const TemplateSelectorV3 = dynamic(() => import("./TemplateSelectorV3"), {
  ssr: false,
});
const Step2_CoreDetails = dynamic(() => import("./resumestepsv4/Step2_CoreDetails"), {
  ssr: false,
});
const Step3_TechProfile = dynamic(() => import("./resumestepsv4/Step3_TechProfile"), {
  ssr: false,
});
const Step4_AdditionalInfo = dynamic(() => import("./resumestepsv4/Step4_AdditionalInfo"), {
  ssr: false,
});
const FinalStepV2 = dynamic(() => import("./resumesteps/FinalStep"), {
  ssr: false,
});

const ResumeV4 = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward

  const formData = useResumeStore(state => state.formData);
  const updateForm = useResumeStore(state => state.updateForm);

  const resumeSteps = [
    { component: TemplateSelectorV3, title: "Design", icon: Paintbrush },
    { component: Step2_CoreDetails, title: "Core", icon: User },
    { component: Step3_TechProfile, title: "Tech", icon: Code },
    { component: Step4_AdditionalInfo, title: "Impact", icon: Zap },
    { component: FinalStepV2, title: "Review", icon: CheckCircle },
  ];

  const next = () => {
    setDirection(1);
    setStep(prev => Math.min(prev + 1, resumeSteps.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const previous = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToStep = stepIndex => {
    setDirection(stepIndex > step ? 1 : -1);
    setStep(stepIndex);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = ((step + 1) / resumeSteps.length) * 100;
  const StepComponents = resumeSteps[step]?.component;

  const variants = {
    enter: direction => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: direction => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 selection:bg-indigo-100">
      {/* Dynamic Glass Header */}
      <header className="sticky z-50 top-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-transparent p-4 rounded-2xl hidden md:flex ">
                <Logo2 size={36} color="#4f46e5" />
              </div>
              <div className="flex items-center gap-3 md:hidden">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-sm">V4</span>
                </div>
                <span className="font-bold text-slate-900">Resume Builder</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right hidden sm:block ">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">
                  Overall Completion
                </div>
                <div className="text-sm font-black text-slate-900">
                  Step {step + 1} / {resumeSteps.length}
                </div>
              </div>
              <div className="relative group">
                <div className="w-24 md:w-48 h-3 bg-slate-200/50 rounded-full overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-linear-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"
                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Stepper */}
      <nav className="bg-white/50 border-b border-slate-100 mb-12 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 min-w-max md:min-w-0">
            {resumeSteps.map((stepInfo, index) => {
              const Icon = stepInfo.icon;
              const isActive = index === step;
              const isCompleted = index < step;

              return (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`relative flex flex-col items-center gap-2 group transition-all duration-300 ${
                    isActive ? "scale-110" : "hover:-translate-y-1"
                  }`}
                >
                  <div
                    className={`w-6 md:w-12 h-6 md:h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 relative ${
                      isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100"
                        : isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-white border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-3 md:w-6 h-3 md:h-6" />
                    ) : (
                      <Icon className="w-3 md:w-6 h-3 md:h-6 stroke-[2.5]" />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeStepV4"
                        className="absolute -bottom-1 -right-1 w-2 md:w-4 h-2 md:h-4 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center"
                      >
                        <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                      </motion.div>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? "text-indigo-900" : "text-slate-400"}`}
                  >
                    {stepInfo.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content with Transitions */}
      <div
        className={` mx-auto px-4 md:px-6 ${step === resumeSteps.length - 1 ? "max-w-400" : "max-w-7xl"}
`}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 p-2 md:p-8 ">
              {StepComponents && (
                <StepComponents
                  next={next}
                  previous={previous}
                  formData={formData}
                  updateForm={updateForm}
                  onSelect={next}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ResumeV4;
