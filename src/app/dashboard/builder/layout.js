// app/resume/layout.js

import StepNav from "@/modules/resume/components/StepNav";

export default function ResumeLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <StepNav />
      <div className="max-w-6xl mx-auto p-3 md:p-6">{children}</div>
    </div>
  );
}
