import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import BuildButton from "@/shared/components/landing/BuildButton";

export default function ProductConversionBanner({
  badge = "Get Started",
  title = "Ready to build your standout resume?",
  description = "Join students, freshers, and professionals building ATS-ready resumes with NextCV. Free to build, one-time payment starting at ₹49.",
  primaryCtaText = "Build Your Resume",
  primaryCtaHref = "/dashboard/builder",
  secondaryCtaText = "Compare All Plans",
  secondaryCtaHref = "/pricing",
}) {
  return (
    <section className="bg-[#17201C] py-16 text-white sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className="inline-block border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#A4B5DE]">
              {badge}
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#A0A49F]">
              {description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#A0A49F]">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Free to build & preview
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                No monthly subscription
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                One-time payment from ₹49
              </span>
            </div>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
            {primaryCtaHref === "/dashboard/builder" ? (
              <BuildButton className="h-12 bg-[#465B9E] px-6 text-sm font-semibold text-white hover:bg-[#344B93]">
                {primaryCtaText}
              </BuildButton>
            ) : (
              <Link
                href={primaryCtaHref}
                className="inline-flex h-12 items-center justify-center gap-2 border border-transparent bg-[#465B9E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#344B93]"
              >
                {primaryCtaText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <Link
              href={secondaryCtaHref}
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {secondaryCtaText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

