import React from "react";
import { CheckCircle2, Search, Briefcase, ShieldCheck, Sparkles, ArrowRight, Zap, FileText } from "lucide-react";
import ATSChecker from "@/shared/components/ats-checker/ATSChecker";
import Link from "next/link";

export const metadata = {
  title: "Free ATS Resume Checker for Freshers in India 2026 | Check Score Online",
  description:
    "Best ATS checker for freshers in India. Learn why ATS rejects resumes in India and how to fix them. Optimized for TCS, Infosys, and 2026 hiring standards.",
  keywords: [
    "free ats resume checker for freshers in india",
    "check if my resume is ats friendly free",
    "ats score checker online india",
    "resume ats score free tool 2026",
    "free ats resume scan for freshers",
    "how to check resume ats score online",
    "best ats checker for indian jobs",
    "ats resume checker for campus placements",
    "free resume scanner for it jobs india",
    "ats friendly resume test online",
    "nextcv ats checker free",
    "best free ats checker in india",
  ],
  alternates: {
    canonical: `https://www.nextcv.in/ats-resume-checker`,
  },
};

export default function ATSCheckerPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-[28%] -top-20 h-[450px] w-[600px] rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
        <div className="absolute right-0 top-60 h-[400px] w-[500px] rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            <span>Updated for 2026 Placement Season</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
            ATS-Friendly Resume Checker for{" "}
            <span className="block bg-gradient-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
              Freshers in India 2026
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
            Ever wondered <strong className="text-slate-900">why ATS rejects resumes in India and how to fix it</strong>?
            Upload your resume and get an instant ATS score analysis tailored for Indian recruitment standards.
          </p>

          <div className="pt-2">
            <ATSChecker />
          </div>
        </div>
      </section>

      {/* MNC & Role Highlights Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Company Specifics */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#071644]">Crack the Code for Indian MNCs</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Top Indian IT recruiters use automated screening algorithms. Our checker scans against standard patterns used by:
            </p>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-700 font-semibold text-xs sm:text-sm pt-2">
              {["TCS Digital", "Infosys", "Wipro", "HCL Tech", "Accenture", "Tech Mahindra"].map(
                (company, i) => (
                  <li key={i} className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-xl shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <span>{company}</span>
                  </li>
                )
              )}
            </ul>
            <p className="text-xs text-slate-400 pt-2 italic">
              * Note: Scoring is based on general recruiter parsing rules across Indian IT & corporate standards.
            </p>
          </div>

          {/* Student Focused */}
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#071644]">Why ATS Scores Matter For Freshers?</h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              In high-volume campus drives, a low ATS parsing score means automatic rejection before any recruiter reads your application.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 pt-2">
              <li className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">B.Tech / CSE / BCA:</strong> Scans technical stack keywords, framework lists, and GitHub project metrics.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">MBA / Business Freshers:</strong> Scans for project leadership, Agile terms, and KPI achievements.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-white p-3 rounded-xl border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Core Engineering:</strong> Validates domain certifications, CAD software, and site experience terms.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">Frequently Asked Questions</h2>
          <p className="text-slate-600 text-sm">Everything you need to know about ATS scoring for Indian jobs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: "Why is my resume not getting shortlisted?",
              a: "It's likely due to low ATS compatibility. If your resume uses complex multi-layered graphics or lacks specific keywords found in job descriptions, the ATS may reject it.",
            },
            {
              q: "How to increase ATS score of my resume?",
              a: "Use clean single/double-column layouts, standard headings (Education, Projects, Work History), and quantifiable bullet points generated by NextCV AI.",
            },
            {
              q: "Is NextCV ATS checker accurate?",
              a: "Yes, we simulate the exact parsing logic used by top Indian corporate ATS platforms to give you a realistic estimate.",
            },
            {
              q: "How much does a resume cost on NextCV?",
              a: "NextCV operates on a transparent pay-per-resume model ranging from ₹49 to ₹399 depending on the template selected. No monthly auto-renewals.",
            },
          ].map((faq, i) => (
            <div
              key={i}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2"
            >
              <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-[#071644] rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl text-white">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Build A High-Scoring ATS Resume Today
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
            Choose from our recruiter-approved templates starting at ₹49 to ₹399 per resume with zero subscriptions.
          </p>
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
            >
              Build Resume Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
