import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  ArrowRight,
  Sparkles,
  Wand2,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Cpu,
  HelpCircle,
} from "lucide-react";
import AIPlayground from "./AIPlayground";

export const metadata = createSeoMetadata({
  title: "AI Resume Writer for Freshers in India | NextCV",
  description:
    "Use NextCV's AI resume writer to create professional summaries, achievement bullets, skills, and project descriptions for Indian job applications.",
  path: "/ai-writer",
  keywords: [
    "ai resume writer",
    "ai resume maker",
    "ai resume builder",
    "ai resume builder free",
    "resume maker ai",
  ],
});

export default function AIWriterPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[28%] -top-20 h-112.5 w-q50 rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
        <div className="absolute right-0 top-60 h-100 w-125rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Powered by Gemini AI 2.5 Flash
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
            AI Resume Writer &{" "}
            <span className="block bg-linear-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
              Bullet Generator
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
            Eliminate writer's block instantly. NextCV's intelligent AI crafts high-impact
            summaries, quantified work achievements, and ATS skill keywords tailored to Indian job
            roles.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              Start Writing With AI <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/templates"
              className="px-8 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-all"
            >
              Browse Resume Templates
            </Link>
          </div>
        </div>

        {/* Live Interactive AI Playground */}
        <div className="mt-16 max-w-5xl mx-auto">
          <AIPlayground />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-indigo-600 text-sm font-semibold">
            <Cpu className="w-4 h-4 text-indigo-600" /> Three Simple Steps
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">How The AI Writer Works</h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From zero to an ATS-optimized resume in under 3 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Enter Your Job Title",
              desc: "Provide your target role (e.g., Software Engineer, Data Analyst, Product Manager) and key tools you use.",
            },
            {
              step: "02",
              title: "AI Generates Bullet Points",
              desc: "Gemini AI analyzes top MNC job descriptions to draft quantified achievements with strong action verbs.",
            },
            {
              step: "03",
              title: "One-Click Resume Insert",
              desc: "Review suggestions, customize metric numbers, and insert directly into your ATS template.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 p-8 rounded-3xl relative overflow-hidden group hover:border-indigo-300 transition-all shadow-sm"
            >
              <div className="text-4xl font-extrabold text-indigo-100 group-hover:text-indigo-200 transition-colors mb-4 font-mono">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-slate-50 rounded-3xl p-8 md:p-14 border border-slate-200 shadow-sm space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
              Why Use AI Resume Writing?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Supercharge your job application response rate with intelligent keyword matching.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Wand2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Action Verb Enhancement</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Replaces passive statements like "helped with coding" with high-impact phrases like
                "Spearheaded microservice development, reducing latency by 35%."
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">ATS Keyword Optimization</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Automatically includes high-ranking recruiter keywords specific to Indian tech &
                corporate giants like TCS, Infosys, Wipro, and Accenture.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Zero Grammar Errors</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ensures flawless spelling, professional tone, active voice, and consistent tense
                throughout your entire resume document.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Contextual Customization</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                You maintain total control. The AI offers smart suggestions, while you tailor metric
                figures and specific project names to your background.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-slate-700 space-y-6 z-10 relative">
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-[#071644]">
            Why AI Resume Writers Are Essential for Freshers in India
          </h2>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600">
            The Indian job market is immensely competitive. Recruiters receive hundreds of resumes
            for single openings at MNCs and startups. An AI resume builder acts as your automated
            career coach, transforming basic project descriptions into compelling achievement
            bullets that capture HR attention.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Overcoming Resume Writer's Block</h3>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600">
            Many students struggle to express their technical skills in formal English. Instead of
            spending hours pondering how to frame a final-year project, NextCV AI provides instant
            suggestions tailored to your degree and tech stack.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071644] flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Everything you need to know about NextCV's AI Writer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "What does the AI Writer generate?",
              a: "It generates professional summaries, work experience bullet points, key technical skills, and project descriptions optimized for your target job title.",
            },
            {
              q: "Is the AI output unique?",
              a: "Yes! Content is generated dynamically based on your role and tech choices. You can easily edit and add your exact metric numbers.",
            },
            {
              q: "Does this cost extra on NextCV?",
              a: "No! Access to our AI Writer features is included in our simple ₹399 one-time payment with no subscription trap.",
            },
            {
              q: "Is using AI on a resume allowed?",
              a: "Absolutely. Recruiters encourage clear, professional language. AI is a tool to help express your genuine experiences effectively.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-2"
            >
              <h4 className="font-bold text-slate-900 text-base">{item.q}</h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-[#071644] rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl text-white">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Write Your ATS Resume With AI Today
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Build a high-impact, professional resume in under 5 minutes for just ₹399.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
            >
              Try AI Writer Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
