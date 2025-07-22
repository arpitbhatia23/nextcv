"use client";
import React, { useEffect, useState } from "react";
import BasicInfoStep from "./resumesteps/BasicInfoStep";
import SummaryStep from "./resumesteps/SummaryStep";
import EducationStep from "./resumesteps/EducationStep";
import SkillStep from "./resumesteps/SkillStep";
import ExpricenceStep from "./resumesteps/ExpricenceStep";
import FinalStep from "./resumesteps/FinalStep";
import ProjectsStep from "./resumesteps/ProjectsStep";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

import {
  Briefcase,
  CheckCircle,
  ClockFading,
  Code,
  FileText,
  GraduationCap,
  Settings,
  User,
} from "lucide-react";
import Logo2 from "./Logo2";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Resume = () => {
  const [step, setStep] = useState(0);
  const resumeSteps = [
    {
      component: BasicInfoStep,
      title: "Basic Info",
      icon: User,
      description: "Personal details",
    },
    {
      component: EducationStep,
      title: "Education",
      icon: GraduationCap,
      description: "Academic background",
    },
    {
      component: SkillStep,
      title: "Skills",
      icon: Settings,
      description: "Technical & soft skills",
    },
    {
      component: ExpricenceStep,
      title: "Experience",
      icon: Briefcase,
      description: "Work history",
    },

    {
      component: ProjectsStep,
      title: "Projects",
      icon: Code,
      description: "Portfolio projects",
    },
    {
      component: SummaryStep,
      title: "Summary",
      icon: FileText,
      description: "Professional summary",
    },
    {
      component: FinalStep,
      title: "Review",
      icon: CheckCircle,
      description: "Final review",
    },
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

  const [formdata, setFormdata] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    jobRole: "",
    summary: "",
    experience: [],
    skills: [],
    education: [],
    projects: [],
  });

  const updateForm = (data) => {
    setFormdata((prev) => ({
      ...prev,
      ...data,
    }));
  };
  console.log(formdata);
  const progress = ((step + 1) / resumeSteps.length) * 100;

  const StepComponents = resumeSteps[step]?.component;
  return (
    <div>
      <Card className=" rounded-none  border-0 bg-transparent backdrop-blur-sm px-2 shadow-none">
        <CardHeader>
          <CardTitle className={"flex justify-between items-center"}>
            <Logo2 size={60} />
            <span className="text-sm font-medium text-white bg-gradient-to-b from-indigo-600 to-purple-600   px-3 py-1 rounded-full">
              {Math.round(progress)}% Complete
            </span>
          </CardTitle>
          <Progress value={progress} className="h-2 bg-gray-200" />
        </CardHeader>
        <CardContent className="p--2">
          <div className="space-y-6">
            {/* Step Indicators */}
            <div className="flex justify-between items-center overflow-x-auto pb-2">
              {resumeSteps.map((stepInfo, index) => {
                const Icon = stepInfo.icon;
                const isActive = index === step;
                const isCompleted = index < step;
                const isAccessible = index <= step;

                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center min-w-0 flex-1 cursor-pointer transition-all duration-200 ${
                      isAccessible
                        ? "hover:scale-105"
                        : "cursor-not-allowed opacity-50"
                    }`}
                    onClick={() => isAccessible && goToStep(index)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200 ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="hidden sm:block text-center min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${
                          isActive
                            ? "text-blue-600"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-500"
                        }`}
                      >
                        {stepInfo.title}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {stepInfo.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <StepComponents
        next={next}
        previous={previous}
        formData={formdata}
        updateForm={updateForm}
      />
    </div>
  );
};
export default Resume;
