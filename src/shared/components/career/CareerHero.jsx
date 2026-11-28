import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, BookOpen } from "lucide-react";

export function CareerHero({ title, eyebrow, description, readTime, category, author, updatedAt }) {
  return (
    <header className="relative overflow-hidden border-b border-black/10 bg-[#F7F4EA] pt-12 pb-16 sm:pt-16 sm:pb-24">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-[38%] border-l border-black/popacity-70 bg-[linear-gradient(90deg,transparent_49.8%,rgba(0,0,0,.06)_50%,transparent_50.2%)] bg-size:[48px_48px]"
      />

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
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-black">
              {eyebrow || "CAREER GUIDE"}
            </span>

            {category && (
              <>
                <span className="text-black/30">•</span>
                <span className="text-xs font-medium uppercase tracking-wider text-black/60">
                  {category}
                </span>
              </>
            )}

            {readTime && (
              <>
                <span className="text-black/30">•</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-black/60">
                  <Clock className="h-3.5 w-3.5" />
                  {readTime} min read
                </span>
              </>
            )}
          </div>

          {/* Main Title */}
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.02] tracking-[-0.045em] text-black sm:text-5xl lg:text-7xl">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="mt-6 max-w-3xl text-base leading-8 text-black/65 sm:text-lg sm:leading-8">
              {description}
            </p>
          )}

          {(author || updatedAt) && (
            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#777A75]">
              {author && (
                <span>
                  Reviewed by <strong className="font-semibold text-[#4F5650]">{author}</strong>
                </span>
              )}
              {author && updatedAt && <span aria-hidden="true">•</span>}
              {updatedAt && (
                <time dateTime={updatedAt}>
                  Updated{" "}
                  {new Date(`${updatedAt}T00:00:00`).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              )}
            </div>
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
