import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Check } from "lucide-react";
import BuildButton from "./BuildButton";

const valuePoints = ["Free to build and edit", "One-time payment", "Downloads from ₹49"];

export default function LandingHero() {
  return (
    <section className="relative overflow-hidden border-b border-[#e7e5df] bg-[#F8F7F3] pt-24 sm:pt-28 lg:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 sm:px-8 sm:pb-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12 lg:px-10 lg:pb-24">
        <div className="relative z-10 max-w-xl">
          <p className="inline-flex items-center gap-2 border border-[#deded7] bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#465b9e]">
            Resume builder for India
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.08] text-[#17201C] sm:text-5xl lg:text-[3.5rem]">
            Build an ATS-Friendly Resume with AI. Get Ready for Your Next Job.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-[#5b625c]">
            Create a professional resume with AI-powered writing, modern templates and
            job-description matching. Built for Indian freshers, students and professionals.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BuildButton className="w-full sm:w-auto">Build My Resume</BuildButton>
            <Link
              href="/ats-resume-checker"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#c9cbc8] bg-white/80 px-5 py-3 text-sm font-semibold text-[#26342c] transition-colors hover:border-[#8995bd] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6] focus-visible:ring-offset-2"
            >
              Check My Resume <ArrowDownRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#dfddd6] pt-5 text-xs text-[#555e56]">
            {valuePoints.map(point => (
              <li key={point} className="inline-flex items-center gap-1.5">
                <Check aria-hidden="true" className="h-3.5 w-3.5 text-[#5268a8]" />
                {point}
              </li>
            ))}
            <li className="w-full pl-5 text-[#737a72] sm:w-auto sm:pl-0">
              No monthly subscription
            </li>
          </ul>
        </div>

        <figure className="mx-auto w-full max-w-3xl lg:ml-auto">
          <div className="relative aspect-16/10 overflow-hidden border border-[#deded7] bg-white shadow-[0_28px_70px_-42px_rgba(31,42,35,0.42)]">
            <Image
              src="/products/resume-builder/resume-editor.png"
              alt="NextCV resume builder showing the guided steps for creating a resume"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-[#697068]">
            <span>Inside the NextCV resume builder</span>
            <Link
              href="/ai-resume-builder"
              className="font-semibold text-[#344b93] underline decoration-[#aeb8d5] underline-offset-4 hover:text-[#26366d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
            >
              See how it works
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
