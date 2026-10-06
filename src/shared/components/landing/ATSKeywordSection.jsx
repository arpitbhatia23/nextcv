import Link from "next/link";
import { ArrowUpRight, Check, CircleAlert, FileSearch, ScanSearch } from "lucide-react";

const auditItems = [
  "Job-description keyword match",
  "Missing or partial skills",
  "Resume structure and sections",
  "Content clarity and relevance",
];

export default function ATSKeywordSection() {
  return (
    <section id="ats-checker" className="bg-[#17231f] py-20 text-[#f6f6f0] sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-16">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#b8c5a8]">
              <ScanSearch aria-hidden="true" className="h-4 w-4" /> Check against the role
            </p>
            <h2 className="mt-4 max-w-lg font-serif text-3xl leading-tight sm:text-4xl">
              Know what your resume is missing.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-[#c0c9c2]">
              Paste a job description to see where your resume aligns, which skills need attention,
              and what to improve before you apply.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {auditItems.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#e2e7e1]">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#b8c5a8]" />{" "}
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/ats-resume-checker"
              className="mt-8 inline-flex min-h-11 items-center gap-2  bg-[#e8e9db] px-4 py-2.5 text-sm font-semibold text-[#1d2b24] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17231f]"
            >
              Check My Resume <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="min-w-0  border border-white/15 bg-[#f8f8f4] p-4 text-[#202a23] shadow-[0_28px_80px_-44px_rgba(0,0,0,0.72)] sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3e5df] pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center bg-[#e8ebf3] text-[#455b9d]">
                  <FileSearch aria-hidden="true" className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold">Resume analysis</p>
                  <p className="text-[10px] text-[#747b73]">
                    Example analysis · not a candidate result
                  </p>
                </div>
              </div>
              <span className=" border border-[#d9ddd6] bg-white px-2.5 py-1 text-[10px] font-medium text-[#6b7269]">
                Software Engineer
              </span>
            </div>

            <div className="grid gap-4 py-5 sm:grid-cols-[0.7fr_1.3fr] sm:items-center">
              <div className="flex items-center gap-4 sm:block">
                <div className="flex h-19 w-19 shrink-0 items-center justify-center rounded-full border-[6px] border-[#dce2d5] border-t-[#50674f] text-xl font-semibold text-[#29392d]">
                  78
                </div>
                <div className="sm:mt-3">
                  <p className="text-xs font-semibold">Compatibility score</p>
                  <p className="mt-1 text-[10px] text-[#70776f]">A guide for targeted edits</p>
                </div>
              </div>
              <div className="border border-[#e3e5df] bg-white p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Keyword match</span>
                  <span className="font-semibold text-[#3e6247]">68%</span>
                </div>
                <div className="mt-2 h-1.5 bg-[#e9ebe6]">
                  <div className="h-full w-[68%]  bg-[#68836c]" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-[10px]">
                  <div>
                    <p className="mb-2 font-semibold text-[#727970]">YOUR RESUME</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["React", "JavaScript", "Node.js", "MongoDB"].map(skill => (
                        <span key={skill} className=" bg-[#edf2ec] px-2 py-1 text-[#3b5841]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-semibold text-[#727970]">JOB DESCRIPTION</p>
                    <div className="flex flex-wrap gap-1.5">
                      {["React", "TypeScript", "Node.js", "MongoDB", "Docker"].map(skill => (
                        <span
                          key={skill}
                          className={` px-2 py-1 ${skill === "TypeScript" || skill === "Docker" ? "border border-[#e4d4a8] bg-[#fff8e5] text-[#6c5b2e]" : "bg-[#edf2ec] text-[#3b5841]"}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-[#e3e5df] pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-center gap-2 text-xs font-semibold text-[#5e543d]">
                <CircleAlert aria-hidden="true" className="h-4 w-4" /> Missing in this example
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["TypeScript", "Docker"].map(skill => (
                  <span
                    key={skill}
                    className=" border border-[#e4d4a8] bg-[#fff8e5] px-2 py-1 text-[10px] text-[#6c5b2e]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
