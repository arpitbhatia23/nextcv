"use client";
import FinalStep from "@/components/resumesteps/FinalStep";
import useResumeStore from "@/store/useResumeStore";
import React from "react";

const page = () => {
  const data = useResumeStore((state) => state.formData);
  return (
    <div className="max-h-full">
      <FinalStep formData={data}></FinalStep>
    </div>
  );
};

export default page;
