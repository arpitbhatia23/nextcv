import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function CareerCTA({ title }) {
  return (
    <section className="mt-12 border-t border-[#E3E3DD] bg-[#F8F7F3]">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
          NEXTCV CAREER PLATFORM
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl tracking-[-0.03em] text-[#17201C] sm:text-5xl">
          Build a job-winning resume for this role.
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#646A64]">
          Create, edit and optimize your resume with NextCV's ATS-friendly builder and expert role-specific guidance.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/dashboard/builder"
            className="inline-flex items-center gap-2 bg-[#465B9E] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#344B93]"
          >
            Create Your Resume
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <Link
            href="/career"
            className="inline-flex items-center gap-2 border border-[#DCDDD7] bg-white/50 px-7 py-3.5 text-sm font-medium text-[#17201C] transition hover:border-[#465B9E]"
          >
            Explore All Career Guides
          </Link>
        </div>
      </div>
    </section>
  );
}

