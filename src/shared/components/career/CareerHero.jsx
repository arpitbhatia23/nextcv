import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, BookOpen } from "lucide-react";

export function CareerHero({ title, eyebrow, description, readTime, category }) {
  return (
    <header className="relative border-b border-[#E3E3DD] bg-[#F8F7F3] pt-12 pb-16 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Breadcrumb / Back Link */}
        <div className="mb-8">
          <Link
            href="/career"
            className="inline-flex items-center gap-2 text-sm text-[#646A64] transition hover:text-[#344B93]"
          >
            <ArrowLeft className="h-4 w-4" />
            All Career Guides
          </Link>
        </div>

        <div className="max-w-4xl">
          {/* Eyebrow & Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#465B9E]">
              {eyebrow || "CAREER GUIDE"}
            </span>

            {category && (
              <>
                <span className="text-[#C9C7C0]">•</span>
                <span className="text-xs font-medium uppercase tracking-wider text-[#646A64]">
                  {category}
                </span>
              </>
            )}

            {readTime && (
              <>
                <span className="text-[#C9C7C0]">•</span>
                <span className="inline-flex items-center gap-1 text-xs text-[#777A75]">
                  <Clock className="h-3.5 w-3.5" />
                  {readTime} min read
                </span>
              </>
            )}
          </div>

          {/* Main Title */}
          <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-[-0.035em] text-[#17201C] sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="mt-6 max-w-3xl text-base leading-8 text-[#5B625C] sm:text-lg sm:leading-8">
              {description}
            </p>
          )}

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/dashboard/builder"
              className="inline-flex items-center gap-2 bg-[#17201C] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#344B93]"
            >
              Build Your Resume Free
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/templates"
              className="inline-flex items-center gap-2 border border-[#DCDDD7] bg-white/50 px-6 py-3.5 text-sm font-medium text-[#17201C] transition hover:border-[#465B9E] hover:text-[#344B93]"
            >
              <BookOpen className="h-4 w-4 text-[#465B9E]" />
              View Resume Templates
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

