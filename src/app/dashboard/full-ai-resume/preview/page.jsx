"use client";
import FinalStep from "@/components/resumesteps/FinalStep";
import useResumeStore from "@/store/useResumeStore";
import React from "react";

const page = () => {
  const data = useResumeStore((state) => state.formData);
  return (
    <div className="h-[calc(100vh-64px)] bg-slate-50">
      <FinalStep formData={data} />
    </div>
  );
};

export default page;
