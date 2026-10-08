"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, FileText, Upload } from "lucide-react";
import { useState } from "react";
import useResumeStore from "@/store/useResumeStore";
import dynamic from "next/dynamic";
const ImportResume = dynamic(() => import("./ImportResume"));
export default function ResumeStartPage() {
  const router = useRouter();
  const [showImport, setShowImport] = useState(false);

  const handleCreate = () => {
    router.push("/dashboard/builder/template-selection");
  };

  if (showImport) {
    return (
      <div className="min-h-screen bg-[#F8F7F3]">
        <ImportResume
          onBack={() => setShowImport(false)}
          onImportComplete={resume => {
            console.log(resume);
            if (resume.data) {
              useResumeStore.getState().updateForm(resume.data);
            }
            router.push("/dashboard/builder/template-selection");
          }}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col justify-start px-6 py-6">
        {/* Header */}
        <header className="mx-auto w-full max-w-xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#5268B6]">
            Resume Builder
          </p>

          <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            How would you like to start?
          </h1>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#5B625C]">
            Create a new resume from scratch or bring your existing resume to NextCV.
          </p>
        </header>

        {/* Options Grid */}
        <section className="mx-auto mt-10 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
          {/* Create from scratch */}
          <button
            type="button"
            onClick={handleCreate}
            className="group flex flex-col border border-[#E3E3DD] bg-white p-7 text-left transition duration-200 hover:border-[#5268B6]"
          >
            {/* Icon + Badge row */}
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center border border-[#E3E3DD] bg-[#F8F7F3]">
                <FileText size={19} strokeWidth={1.7} className="text-[#344B93]" />
              </div>
              <span className="text-xs font-medium text-[#8A8F89]">New</span>
            </div>

            {/* Title + Desc */}
            <div className="mt-7">
              <h2 className="text-base font-semibold tracking-tight">Create from scratch</h2>
              <p className="mt-2 text-sm leading-6 text-[#646A64]">
                Start blank and build each section step by step in the NextCV builder.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center text-sm font-semibold text-[#344B93]">
              Start building
              <ArrowRight
                size={15}
                className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </div>
          </button>

          {/* Import existing */}
          <button
            type="button"
            onClick={() => setShowImport(true)}
            className="group flex flex-col border border-[#5268B6] bg-white p-7 text-left transition duration-200 hover:bg-[#F5F6FB]"
          >
            {/* Icon + Badge row */}
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center bg-[#344B93]">
                <Upload size={19} strokeWidth={1.7} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-[#344B93]">Recommended</span>
            </div>

            {/* Title + Desc */}
            <div className="mt-7">
              <h2 className="text-base font-semibold tracking-tight">Import existing resume</h2>
              <p className="mt-2 text-sm leading-6 text-[#646A64]">
                Upload your resume and NextCV will automatically fill your information into the
                builder.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center text-sm font-semibold text-[#344B93]">
              Import resume
              <ArrowRight
                size={15}
                className="ml-1.5 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </div>
          </button>
        </section>

        {/* Footer note */}
        <p className="mx-auto mt-8 max-w-md text-center text-xs leading-5 text-[#8A8F89]">
          Already have a resume? Import it to save time — you can review and edit every section
          before finishing.
        </p>
      </div>
    </main>
  );
}
