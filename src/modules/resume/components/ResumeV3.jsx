"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
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

const BasicInfoStep = dynamic(() => import("./resumestepsv2/BasicInfoStepV2"), {
  ssr: false,
  loading: () => <Loading />,
});
const SummaryStep = dynamic(() => import("./resumestepsv2/SummaryStepV2"), {
  ssr: false,
  loading: () => <Loading />,
});
const EducationStep = dynamic(() => import("./resumestepsv2/EducationStepV2"), {
  ssr: false,
  loading: () => <Loading />,
});
const SkillStep = dynamic(() => import("./resumestepsv2/SkillStepV2"), {
  ssr: false,
  loading: () => <Loading />,
});
const ExpricenceStep = dynamic(() => import("./resumestepsv2/ExpricenceStepV2"), {
  ssr: false,
  loading: () => <Loading />,
});
const FinalStep = dynamic(() => import("./resumestepsv2/FinalStepV2"), {
  ssr: false,
  loading: () => <Loading />,
});
const CertificateStep = dynamic(() => import("./resumestepsv2/CertificateV2"), {
  ssr: false,
  loading: () => <Loading />,
});
const ProjectsStep = dynamic(() => import("./resumestepsv2/ProjectsStepV2"), {
  ssr: false,
  loading: () => <Loading />,
});

import Logo2 from "@/shared/components/Logo2";
import useResumeStore from "@/store/useResumeStore";
import Loading from "@/app/loading";
import TemplateSelectorV3 from "./TemplateSelectorV3";
// const Tour = dynamic(() => import("@/components/Tour"), { ssr: false });

const ResumeV3 = () => {
  // start on the final template selection step so users see template 3 (final) first
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward
  const formData = useResumeStore(s => s.formData);
  const updateForm = useResumeStore(s => s.updateForm);

  const resumeSteps = [
    {
      component: TemplateSelectorV3,
      title: "Select Template",
      icon: FileText,
    },
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
    setDirection(1);
    setStep(prev => Math.min(prev + 1, resumeSteps.length - 1));
  };
  const previous = () => {
    setDirection(-1);
    setStep(prev => Math.max(prev - 1, 0));
  };
  const goToStep = stepIndex => {
    setDirection(stepIndex > step ? 1 : -1);
    setStep(stepIndex);
  };

  // const getTourSteps = () => {
  //   const commonSteps = [
  //     {
  //       target: "#tour-resume-progress-v3",
  //       content: "Track your progress here. This is the V3 experience.",
  //       disableBeacon: true,
  //     },
  //   ];

  //   const stepSpecificSteps = {
  //     0: [
  //       {
  //         target: "#tour-resume-form-v3",
  //         content: "Start by filling in your identity and branding.",
  //       },
  //       {
  //         target: "#tour-social-links-v3",
  //         content: "Add your digital presence to help recruiters find you.",
  //       },
  //       {
  //         target: "#tour-resume-preview-v3",
  //         content: "See your resume update in real-time as you type.",
  //       },
  //     ],
  //     7: [
  //       {
  //         target: "#tour-template-selection-v3",
  //         content: "Choose a high-resolution template first.",
  //       },
  //       {
  //         target: "#tour-final-preview-v3",
  //         content: "Preview the chosen template immediately.",
  //       },
  //     ],
  //   };

  //   const nextStepInfo =
  //     step < resumeSteps.length - 1
  //       ? [
  //           {
  //             target: "#tour-next-button-v3",
  //             content:
  //               "Solidify your progress and advance to the next strategy.",
  //           },
  //         ]
  //       : [];

  //   return [
  //     ...(step === 7 ? commonSteps : []),
  //     ...(stepSpecificSteps[step] || []),
  //     ...nextStepInfo,
  //   ];
  // };

  // const currentTourSteps = getTourSteps();

  const progress = ((step + 1) / resumeSteps.length) * 100;
  const StepComponents = resumeSteps[step]?.component;

  const variants = {
    enter: direction => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: direction => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 selection:bg-indigo-100">
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                <Logo2 size={36} color="#4f46e5" />
              </div>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-indigo-900 to-indigo-600">
                  NextCV <span className="text-indigo-600 font-medium">Form 3</span>
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Version 3 — Template-first workflow
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6" id="tour-resume-progress-v3">
              <div className="text-right hidden sm:block">
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

      <nav className="bg-white/50 border-b border-slate-100 mb-12 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 min-w-max md:min-w-0">
            {resumeSteps.map((stepInfo, index) => {
              const Icon = stepInfo?.icon || User;
              const isActive = index === step;
              const isCompleted = index < step;
              const isAccessible = index <= step;

              return (
                <button
                  key={index}
                  onClick={() => isAccessible && goToStep(index)}
                  disabled={!isAccessible}
                  className={`relative flex flex-col items-center gap-2 group transition-all duration-300 ${
                    isActive ? "scale-110" : ""
                  } ${!isAccessible ? "opacity-30 grayscale cursor-not-allowed" : "hover:-translate-y-1"}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 relative ${
                      isActive
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-100"
                        : isCompleted
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "bg-white border-slate-200 text-slate-400 group-hover:border-indigo-300 group-hover:text-indigo-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6 stroke-[2.5]" />
                    )}

                    {isActive && (
                      <motion.div
                        layoutId="activeStep"
                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full flex items-center justify-center"
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

      <div
        className={`mx-auto px-4 md:px-6 relative ${step === resumeSteps.length - 1 ? "max-w-8xl" : "max-w-7xl"}`}
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
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 p-8 ">
              <StepComponents
                next={next}
                previous={previous}
                formData={formData}
                updateForm={updateForm}
                onSelect={next}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 md:hidden">
          {step > 0 && (
            <button
              onClick={previous}
              className="p-4 bg-white rounded-full shadow-lg border border-slate-100 text-slate-600"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {step < resumeSteps.length - 1 && (
            <button
              onClick={next}
              className="px-8 py-4 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200 font-bold flex items-center gap-2"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div> */}
      </div>

      {/* <Tour steps={currentTourSteps} tourId={`resume-v3-step-${step}`} /> */}
    </div>
  );
};

export default ResumeV3;
