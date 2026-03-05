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
const ExpricenceStep = dynamic(
  () => import("./resumestepsv2/ExpricenceStepV2"),
  {
    ssr: false,
    loading: () => <Loading />,
  },
);
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

import Logo2 from "./Logo2";
import useResumeStore from "@/store/useResumeStore";
import Loading from "@/app/loading";
// const Tour = dynamic(() => import("@/components/Tour"), { ssr: false });

const ResumeV2 = () => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward
  const formData = useResumeStore((s) => s.formData);
  const updateForm = useResumeStore((s) => s.updateForm);

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
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, resumeSteps.length - 1));
  };
  const previous = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  };
  const goToStep = (stepIndex) => {
    setDirection(stepIndex > step ? 1 : -1);
    setStep(stepIndex);
  };

  // const getTourSteps = () => {
  //   const commonSteps = [
  //     {
  //       target: "#tour-resume-progress-v2",
  //       content:
  //         "Track your progress here. This is the optimized V2 experience.",
  //       disableBeacon: true,
  //     },
  //   ];

  //   const stepSpecificSteps = {
  //     0: [
  //       {
  //         target: "#tour-resume-form-v2",
  //         content: "Start by filling in your identity and branding.",
  //       },
  //       {
  //         target: "#tour-social-links-v2",
  //         content: "Add your digital presence to help recruiters find you.",
  //       },
  //       {
  //         target: "#tour-resume-preview-v2",
  //         content: "See your resume update in real-time as you type.",
  //       },
  //     ],
  //     1: [
  //       {
  //         target: "#tour-education-form-v2",
  //         content: "Input your academic background here.",
  //       },
  //       {
  //         target: "#tour-ai-button-v2",
  //         content: "Use AI to polish your coursework and achievements.",
  //       },
  //       {
  //         target: "#tour-education-list-v2",
  //         content: "Your educational timeline will appear here.",
  //       },
  //     ],
  //     2: [
  //       {
  //         target: "#tour-skills-form-v2",
  //         content: "Map your core competencies and technical depth.",
  //       },
  //       {
  //         target: "#tour-skills-list-v2",
  //         content: "Visualize your skill set as it grows.",
  //       },
  //     ],
  //     3: [
  //       {
  //         target: "#tour-experience-form-v2",
  //         content: "Chronicle your professional journey and career chapters.",
  //       },
  //       {
  //         target: "#tour-ai-button-v2",
  //         content: "Elevate your job descriptions with AI-powered suggestions.",
  //       },
  //       {
  //         target: "#tour-experience-list-v2",
  //         content: "Your career path is visualized here.",
  //       },
  //     ],
  //     4: [
  //       {
  //         target: "#tour-projects-form-v2",
  //         content: "Showcase your technical depth with real-world projects.",
  //       },
  //       {
  //         target: "#tour-ai-button-v2",
  //         content: "Augment your project descriptions for maximum impact.",
  //       },
  //       {
  //         target: "#tour-projects-list-v2",
  //         content: "Your innovation portfolio index.",
  //       },
  //     ],
  //     5: [
  //       {
  //         target: "#tour-certificates-form-v2",
  //         content: "Validate your skills with official credentials.",
  //       },
  //       {
  //         target: "#tour-certificates-list-v2",
  //         content: "Your verified achievement list.",
  //       },
  //     ],
  //     6: [
  //       {
  //         target: "#tour-summary-form-v2",
  //         content: "Draft a powerful executive pitch for your career.",
  //       },
  //       {
  //         target: "#tour-ai-button-v2",
  //         content: "Synthesize a professional summary using AI.",
  //       },
  //     ],
  //     7: [
  //       {
  //         target: "#tour-template-selection-v2",
  //         content: "Choose from our high-resolution architectural templates.",
  //       },
  //       {
  //         target: "#tour-final-preview-v2",
  //         content: "The final blueprint of your professional career.",
  //       },
  //       {
  //         target: "#tour-coupon-section-v2",
  //         content: "Apply promo codes for exclusive discounts.",
  //       },
  //       {
  //         target: "#tour-payment-section-v2",
  //         content: "Unlock your high-resolution PDF and launch your career.",
  //       },
  //     ],
  //   };

  //   const nextStepInfo =
  //     step < 7
  //       ? [
  //           {
  //             target: "#tour-next-button-v2",
  //             content:
  //               "Solidify your progress and advance to the next strategy.",
  //           },
  //         ]
  //       : [];

  //   return [
  //     ...(step === 0 ? commonSteps : []),
  //     ...(stepSpecificSteps[step] || []),
  //     ...nextStepInfo,
  //   ];
  // };

  // const currentTourSteps = getTourSteps();

  const progress = ((step + 1) / resumeSteps.length) * 100;
  const StepComponents = resumeSteps[step]?.component;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 selection:bg-indigo-100">
      {/* Dynamic Glass Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="bg-transparent p-4 rounded-2xl hidden md:flex ">
                <Logo2 size={36} color="#4f46e5" />
              </div>
              {/* <div className="hidden md:block">
                <h1 className="text-lg font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-indigo-900 to-indigo-600">
                  NextCV{" "}
                  <span className="text-indigo-600 font-medium">Pro</span>
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Version 2.0 Enhanced
                </p>
              </div> */}
            </div>

            <div
              className="flex items-center gap-6"
              id="tour-resume-progress-v2"
            >
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

      {/* Modern Stepper */}
      <nav className="bg-white/50 border-b border-slate-100 mb-12 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4 min-w-max md:min-w-0">
            {resumeSteps.map((stepInfo, index) => {
              const Icon = stepInfo.icon;
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
                        layoutId="activeStep"
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
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-slate-100 p-2 md:p-8 ">
              <StepComponents
                next={next}
                previous={previous}
                formData={formData}
                updateForm={updateForm}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Navigation Controls (Mobile optimized)
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 md:hidden">
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

      {/* <Tour steps={currentTourSteps} tourId={`resume-v2-step-${step}`} /> */}
    </div>
  );
};

export default ResumeV2;
