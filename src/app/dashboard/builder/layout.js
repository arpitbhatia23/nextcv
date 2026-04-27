// app/resume/layout.js

import StepNav from "@/modules/resume/components/StepNav";

export default function ResumeLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <StepNav />
      <div className="max-w-8xl mx-auto p-2 md:p-10">{children}</div>
    </div>
  );
}
