"use client";
import FinalStep from "@/modules/resume/components/resumesteps/FinalStep";
import useResumeStore from "@/store/useResumeStore";

const Page = () => {
  const data = useResumeStore(state => state.formData);
  return (
    <div className="h-[calc(100vh-64px)] bg-slate-50">
      <FinalStep formData={data} />
    </div>
  );
};

export default Page;
