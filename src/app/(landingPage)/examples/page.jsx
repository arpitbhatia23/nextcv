import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import { ArrowRight, BookOpen, CheckCircle2, Sparkles, Target, Zap } from "lucide-react";
import ExamplesGallery from "./ExamplesGallery";

export const metadata = createSeoMetadata({
  title: "Resume Examples for Freshers in India 2026 | NextCV",
  description:
    "Explore professional ATS resume examples for Indian job seekers. Find recruiter-approved resume samples for freshers, developers, data analysts, and MNC roles.",
  path: "/examples",
  keywords: [
    "resume examples",
    "resume examples for freshers",
    "resume template examples",
    "ats resume examples",
  ],
});

export default function ExamplesPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Examples",
    url: "https://www.nextcv.in/examples",
    isPartOf: {
      "@type": "WebSite",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
    mainEntity: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[28%] -top-20 h-112.5 w-150 rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
          <div className="absolute right-0 top-60 h-100 w-125 rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Recruiter-Approved Resume Samples 2026
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
              Professional Resume Examples for{" "}
              <span className="block bg-linear-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
                Indian Job Seekers
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
              Unsure what to write? Explore our interactive library of ATS-optimized resume examples
              tailored for Indian IT MNCs, startups, and campus placements.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                Create Your Custom Resume <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Interactive Examples Gallery Component */}
          <div className="mt-16 max-w-7xl mx-auto">
            <ExamplesGallery />
          </div>
        </section>

        {/* Pro Tips Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-14 border border-slate-200 shadow-sm space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
                How To Use These Resume Examples
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Follow these three essential strategies to transform template inspiration into job
                interview invites.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">1. Align Keywords</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Extract key technical skills and tools from your desired job posting and integrate
                  them into your summary and skills sections.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">2. Quantify Achievements</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Replace general duties with hard numbers (e.g., "Increased page speed by 40%",
                  "Built app used by 5,000+ students").
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">3. Use NextCV AI Builder</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Avoid manual formatting issues in Word. Use NextCV to generate a clean, 100%
                  ATS-ready PDF instantly for ₹399.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Text Content */}
        <section className="py-16 px-6 max-w-4xl mx-auto text-slate-600 space-y-6 z-10 relative">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-[#071644]">
              Fast-Track Your Job Search With ATS Examples
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              Starting with a blank page is intimidating. Reviewing industry-tested resume samples
              helps you visualize how successful candidates structure work experience, academic
              projects, and technical skills for recruiters at TCS, Infosys, Wipro, and Accenture.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-[#071644] rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Build Your Personalized Resume Now
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Turn template inspiration into your own ATS resume in under 5 minutes for just ₹399.
            </p>
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                Create My Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
