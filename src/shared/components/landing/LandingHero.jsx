import Link from "next/link";
import { ArrowDownRight, Check, FileText, WandSparkles } from "lucide-react";
import BuildButton from "./BuildButton";

const proofPoints = ["Students & freshers", "Career changers", "Working professionals"];

export default function LandingHero() {
  return (
    <section className="relative isolate border-b border-[#e7e5df] bg-[#F8F7F3] pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(#b9b7ae_0.65px,transparent_0.65px)] bg-size-[20px_20px] mask-[linear-gradient(to_bottom,black,transparent_75%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-14 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:gap-10 lg:px-10 lg:pb-20">
        <div className="max-w-xl">
          <p className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#465b9e]">
            <span className="h-px w-7 bg-[#465b9e]" /> A clearer path from resume to application
          </p>
          <h1 className="font-serif text-[2.7rem] leading-[1.03] text-[#17201C] sm:text-6xl lg:text-[3.5rem] xl:text-[3.75rem]">
            Build a resume that <span className="text-[#344b93]">matches the job.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#5b625c] sm:text-lg">
            Create your resume, compare it with a job description, find what is missing, and improve
            your application with AI.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuildButton className="w-full sm:w-auto" />
            <Link
              href="/ats-resume-checker"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#c9cbc8] bg-white/70 px-5 py-3 text-sm font-semibold text-[#26342c] transition-colors hover:border-[#8995bd] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6] focus-visible:ring-offset-2"
            >
              Check My Resume <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-xs text-[#646a64]">
            Free to build <span aria-hidden="true">·</span> One-time payment{" "}
            <span aria-hidden="true">·</span> No subscription
          </p>

          <div className="mt-10 border-t border-[#dfddd6] pt-5">
            <p className="text-xs font-semibold text-[#29352e]">Made for every stage of a career</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#666d66]">
              {proofPoints.map(point => (
                <li key={point} className="inline-flex items-center gap-1.5">
                  <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#5268a8]" /> {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-167.5 lg:ml-auto">
          <div className="absolute -inset-4 -z-10 rounded-4xl bg-[#e9e8e0] sm:-inset-6" />
          <div className="overflow-hidden rounded-3xl border border-[#d9d8d1] bg-white shadow-[0_24px_70px_-42px_rgba(31,42,35,0.45)]">
            <div className="flex items-center justify-between border-b border-[#eeede8] px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <FileText aria-hidden="true" className="h-4 w-4 text-[#455b9d]" />
                <span className="text-xs font-semibold text-[#303a32]">Example workspace</span>
              </div>
              <span className="rounded-md bg-[#f3f4f8] px-2 py-1 text-[10px] font-medium text-[#59668f]">
                Product preview
              </span>
            </div>
            <div className="grid gap-4 bg-[#f7f8f7] p-3 sm:grid-cols-[1fr_0.78fr] sm:gap-5 sm:p-5">
              <article className="min-w-0 rounded-xl border border-[#e1e3df] bg-white p-4 shadow-sm sm:p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#6573a4]">
                  Resume draft
                </p>
                <p className="mt-3 font-serif text-xl leading-tight text-[#1e2922] sm:text-2xl">
                  Jordan Lee
                </p>
                <p className="mt-1 text-[10px] text-[#68716a]">Software Engineer · Bengaluru</p>
                <div className="mt-4 h-px bg-[#e7e8e3]" />
                <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-[#354986]">
                  Profile
                </p>
                <p className="mt-1.5 text-[10px] leading-4 text-[#606861]">
                  Builds reliable web products with a focus on thoughtful interfaces and
                  maintainable systems.
                </p>
                <p className="mt-4 text-[9px] font-bold uppercase tracking-widest text-[#354986]">
                  Experience
                </p>
                <p className="mt-1.5 text-[10px] font-semibold text-[#344038]">
                  Frontend Developer
                </p>
                <div className="mt-2 space-y-1.5">
                  <span className="block h-1.5 w-full rounded bg-[#e8eae6]" />
                  <span className="block h-1.5 w-[90%] rounded bg-[#e8eae6]" />
                  <span className="block h-1.5 w-[76%] rounded bg-[#e8eae6]" />
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["React", "JavaScript", "Node.js"].map(skill => (
                    <span
                      key={skill}
                      className="rounded-md border border-[#e3e5e1] px-2 py-1 text-[9px] text-[#59615b]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>

              <div className="flex min-w-0 flex-col gap-3">
                <article className="rounded-xl border border-[#e1e3df] bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[9px] font-semibold uppercase tracking-widest text-[#737970]">
                        Example ATS analysis
                      </p>
                      <p className="mt-1 text-2xl font-semibold text-[#25352c]">
                        82<span className="text-xs font-medium text-[#777e77"> / 100</span>
                      </p>
                    </div>
                    <span className="rounded-md bg-[#edf3ed] px-2 py-1 text-[9px] font-semibold text-[#3d6948]">
                      Review ready
                    </span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-[#eaede8]">
                    <div className="h-full w-[82%] rounded-full bg-[#526b9a]" />
                  </div>
                  <p className="mt-2 text-[10px] text-[#717870]">
                    Compare your resume to a specific role
                  </p>
                </article>
                <article className="rounded-xl border border-[#eadcae] bg-[#fffdf5] p-4 shadow-sm">
                  <p className="text-[9px] font-semibold uppercase tracking-widest text-[#746a4c]">
                    Keyword gap · example
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {["TypeScript", "Docker", "REST API"].map(skill => (
                      <span
                        key={skill}
                        className="rounded-md border border-[#eadcae] bg-white px-2 py-1 text-[9px] text-[#615941]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-start gap-2 border-t border-[#eee5cb] pt-3 text-[10px] leading-4 text-[#62604f]">
                    <WandSparkles
                      aria-hidden="true"
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#596ba1]"
                    />
                    <span>Suggestions help you describe relevant experience more clearly.</span>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
