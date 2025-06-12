"use client";
import React, { useState } from "react";
import BasicInfoStep from "./resumesteps/BasicInfoStep";
import SummaryStep from "./resumesteps/SummaryStep";
import EducationStep from "./resumesteps/EducationStep";
import SkillStep from "./resumesteps/SkillStep";
import ExpricenceStep from "./resumesteps/ExpricenceStep";
import FinalStep from "./resumesteps/FinalStep";
import ProjectsStep from "./resumesteps/ProjectsStep";

const Resume = () => {
  const [step, setStep] = useState(0);
  const resumeSteps = [
    BasicInfoStep,
    SummaryStep,
    EducationStep,
    SkillStep,
    ExpricenceStep,
    ProjectsStep,
    FinalStep,
  ];
  const next = () => {
    setStep((prev) => Math.min(prev + 1, resumeSteps.length - 1));
  };
  const previous = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const [fromdata, setFromdata] = useState({
    name: "",
    phone_no: "",
    email: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    jobrole: "",
    summary: "",
    exprience: [
      {
        comapanyName: "",
        Position: "",
        startDate: "",
        endDate: "",
      },
    ],
    skill: [],
    education: [
      {
        institute: "",
        degree: "",
        startYear: "",
        endYear: "",
      },
    ],

    projects: [
      {
        projectTitle: "",
        projectFeatures: "",
        Tech: "",
        link: "",
      },
    ],
  });

  const updateForm = (data) => {
    setFromdata((prev) => ({
      ...prev,
      ...data,
    }));
  };
  console.log(fromdata);

  const StepComponents = resumeSteps[step];
  return (
    <div>
      <StepComponents
        next={next}
        previous={previous}
        fromdata={fromdata}
        updateForm={updateForm}
      />
    </div>
  );
};

export default Resume;
