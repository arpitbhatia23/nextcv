import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import { ArrowRight, Check, FileText, Globe2, Link2, Sparkles, WandSparkles } from "lucide-react";
import BuildButton from "@/shared/components/landing/BuildButton";

export const metadata = createSeoMetadata({
  title: "Resume, AI Writing & Portfolio Tools | NextCV Product",
  description:
    "Build a resume, improve descriptions with AI, share a professional resume link, and create a portfolio from your resume with NextCV.",
  path: "/product",
  keywords: ["NextCV product", "AI resume writing", "resume sharing", "resume portfolio"],
});

const features = [
  {
    number: "01",
    icon: WandSparkles,
    title: "Describe your work with AI",
    description:
      "Draft professional summaries, experience bullets, project descriptions, and skills suggestions from the information you provide. Review and edit each suggestion before using it.",
    action: "Explore AI Writer",
    href: "/ai-writer",
    visual: "writing",
  },
  {
    number: "02",
    icon: Link2,
    title: "Share more than an attachment",
    description:
      "Publish a resume as a web link and share it in applications, email, WhatsApp, or your LinkedIn profile. Resume sharing is included with Premium and Elite plans.",
    action: "Compare plans",
    href: "/pricing",
    visual: "sharing",
  },
  {
    number: "03",
    icon: Globe2,
    title: "Turn your resume into a portfolio",
    description:
      "Use your resume information as the foundation for an online professional portfolio with your profile, experience, projects, skills, and education. Portfolio creation is included with Elite.",
    action: "Explore portfolio builder",
    href: "/p",
    visual: "portfolio",
  },
];

function FeatureVisual({ type }) {
  if (type === "writing") {
    return (
      <div className="rounded-2xl border border-[#deded7] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-[#ecebe5] pb-4">
          <span className="flex items-center gap-2 text-xs font-semibold text-[#303a32]">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-[#344b93]" /> AI writing example
          </span>
          <span className="text-[10px] text-[#737a72]">Review before using</span>
        </div>
        <p className="mt-4 text-[10px] font-semibold uppercase tracking-widest text-[#737a72]">
          Your project notes
        </p>
        <p className="mt-2 rounded-lg bg-[#f5f4ee] p-3 text-xs leading-5 text-[#626a65]">
          Built a dashboard, improved page loading, worked with the design team.
        </p>
        <div className="mt-4 rounded-xl border border-[#d9dce5] bg-[#f4f5f8] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#5268a8]">
            Suggested description · example
          </p>
          <p className="mt-2 text-xs leading-5 text-[#303a32]">
            Improved dashboard usability by refining key page flows and collaborating with design to
            make important information easier to scan.
          </p>
        </div>
      </div>
    );
  }

  if (type === "sharing") {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#deded7] bg-white shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[#ecebe5] px-4 py-3">
          <span className="flex items-center gap-2 text-xs font-semibold text-[#303a32]">
            <Link2 aria-hidden="true" className="h-4 w-4 text-[#344b93]" /> Example resume link
          </span>
          <span className="rounded-md bg-[#eef0f5] px-2 py-1 text-[10px] text-[#344b93]">
            Preview
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e1e5f0] font-serif text-sm text-[#344b93]">
              JD
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-serif text-lg text-[#202a23]">Professional profile</p>
              <p className="mt-1 text-xs text-[#737a72]">
                Experience · projects · skills · education
              </p>
            </div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#e2e0d9] bg-[#faf9f6] px-3 py-2.5 text-xs text-[#59615b]">
            <Globe2 aria-hidden="true" className="h-4 w-4 shrink-0 text-[#5268a8]" />
            <span className="truncate">nextcv.in/r/your-name</span>
          </div>
          <p className="mt-3 text-[10px] text-[#737a72]">
            Illustrative link format, not a live profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#deded7] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between border-b border-[#ecebe5] pb-4">
        <span className="flex items-center gap-2 text-xs font-semibold text-[#303a32]">
          <Globe2 aria-hidden="true" className="h-4 w-4 text-[#344b93]" /> Portfolio preview ·
          example
        </span>
        <span className="text-[10px] text-[#737a72]">From your resume</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e1e5f0] font-serif text-sm text-[#344b93]">
          JD
        </div>
        <div>
          <p className="text-xs font-semibold text-[#303a32]">Your professional profile</p>
          <p className="mt-0.5 text-[10px] text-[#737a72]">One online destination for your work</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        {["About", "Experience", "Projects", "Skills"].map(item => (
          <div
            key={item}
            className="rounded-lg border border-[#e2e0d9] bg-[#faf9f6] px-3 py-3 text-xs font-medium text-[#4d574f]"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <section className="border-b border-[#e2e0d9] pt-28 sm:pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-10 lg:pb-20">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#344b93]">
              <FileText aria-hidden="true" className="h-4 w-4" /> One connected career toolkit
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.05] text-[#17201C] sm:text-5xl lg:text-6xl">
              One resume. More ways to move forward.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#626a65]">
              Build your resume, use AI to describe your experience, share a polished web version,
              and make a portfolio from the information you already entered.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BuildButton className="w-full sm:w-auto" />
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#c9cbc3] bg-white/70 px-5 py-3 text-sm font-semibold text-[#303a32] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6] focus-visible:ring-offset-2"
              >
                See plans <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-[#737a72]">
              Free to build · One-time plans · No monthly subscription
            </p>
          </div>
          <div className="rounded-3xl border border-[#deded7] bg-white p-4 shadow-[0_22px_60px_-44px_rgba(31,42,35,0.55)] sm:p-5">
            <div className="flex items-center justify-between border-b border-[#ecebe5] pb-3">
              <span className="text-xs font-semibold text-[#303a32]">Example workspace</span>
              <span className="text-[10px] text-[#737a72]">Resume → AI → share</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { icon: FileText, label: "Resume", text: "Your experience and projects" },
                { icon: Sparkles, label: "AI writing", text: "Clearer descriptions to review" },
                { icon: Globe2, label: "Online profile", text: "Share your work by link" },
              ].map(({ icon: Icon, label, text }, index) => (
                <div
                  key={label}
                  className="relative rounded-xl border border-[#e2e0d9] bg-[#faf9f6] p-3"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-[#5268a8]" />
                  <p className="mt-3 text-xs font-semibold text-[#303a32]">{label}</p>
                  <p className="mt-1 text-[10px] leading-4 text-[#737a72]">{text}</p>
                  {index < 2 && (
                    <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full border border-[#e2e0d9] bg-white text-[9px] text-[#5268a8] sm:flex">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-[#737a72]">
              Illustrative product flow, not a customer result.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#344b93]">
              The product, in three parts
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
              Your career story, ready for the next step.
            </h2>
          </div>
          <div className="mt-9 divide-y divide-[#e7e6e0] border-y border-[#e7e6e0]">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.number}
                  className="grid gap-7 py-8 md:grid-cols-[0.78fr_1.22fr] md:items-center md:gap-12"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#8a9089]">
                      <span>{feature.number}</span>
                      <Icon aria-hidden="true" className="h-5 w-5 text-[#5268a8]" />
                    </div>
                    <h3 className="mt-4 font-serif text-2xl text-[#202a23]">{feature.title}</h3>
                    <p className="mt-3 max-w-lg text-sm leading-6 text-[#626a65]">
                      {feature.description}
                    </p>
                    <Link
                      href={feature.href}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#344b93] underline decoration-[#aeb8d5] underline-offset-4 hover:text-[#263b82] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
                    >
                      {feature.action} <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                  <FeatureVisual type={feature.visual} />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#17231f] py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b8c5a8]">
              Start with what you need
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">
              Build free. Add the tools that fit.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#c0c9c2]">
              Resume links are part of Premium and Elite; portfolios are included with Elite. All
              plans are one-time purchases.
            </p>
          </div>
          <Link
            href="/pricing"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#e8e9db] px-5 py-3 text-sm font-semibold text-[#1d2b24] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#17231f]"
          >
            Compare plans <Check aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
