import { FileText, Plus, Sparkles } from "lucide-react";
import BuildButton from "./BuildButton";

export default function CoverLetterSection() {
  return (
    <section className="border-y border-[#e5e2d9] bg-[#f0efe9] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:px-10">
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
            <Sparkles aria-hidden="true" className="h-4 w-4" /> Complete the application
          </p>
          <h2 className="mt-3 max-w-xl font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
            One resume. One role. One tailored letter.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-[#626962]">
            Bring your resume and the job description together to draft a cover letter for the role
            and company you’re applying to. Review and personalize it before sending.
          </p>
          <div className="mt-6">
            <BuildButton callbackUrl="/dashboard/cover-letter">Create Cover Letter</BuildButton>
          </div>
        </div>

        <div className="rounded-2xl border border-[#deddd6] bg-white p-4 shadow-sm sm:p-5">
          <div className="flex items-center gap-2 border-b border-[#ebeae5] pb-3 text-xs font-semibold text-[#374138]">
            <FileText aria-hidden="true" className="h-4 w-4 text-[#5268a8]" /> Application inputs
          </div>
          <div className="grid gap-2 py-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
            <div className="rounded-xl border border-[#e4e5df] bg-[#fafaf8] p-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#737b72]">
                Your resume
              </span>
              <p className="mt-1 text-xs font-medium text-[#303a32]">Experience & skills</p>
            </div>
            <Plus aria-hidden="true" className="mx-auto h-4 w-4 text-[#929890] sm:mx-0" />
            <div className="rounded-xl border border-[#e4e5df] bg-[#fafaf8] p-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#737b72]">
                Job description
              </span>
              <p className="mt-1 text-xs font-medium text-[#303a32]">Role requirements</p>
            </div>
            <Plus aria-hidden="true" className="mx-auto h-4 w-4 text-[#929890] sm:mx-0" />
            <div className="rounded-xl border border-[#d9deeb] bg-[#f4f6fa] p-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-[#66749d]">
                Target role
              </span>
              <p className="mt-1 text-xs font-medium text-[#303a32]">Company & position</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#e7e5dc] bg-[#fbfaf6] p-4">
            <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#737b72]">
              Example letter preview
            </p>
            <p className="mt-3 font-serif text-sm text-[#303a32]">Dear Hiring Team,</p>
            <p className="mt-2 text-xs leading-5 text-[#656d64]">
              I’m interested in the [role] position at [company]. My experience with [relevant
              project or skill] has prepared me to contribute to your team...
            </p>
            <p className="mt-3 text-[10px] text-[#7a8078]">
              Personalize every detail before sending.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
