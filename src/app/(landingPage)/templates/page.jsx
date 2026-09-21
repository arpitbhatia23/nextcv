import React from "react";
import { createSeoMetadata } from "@/shared/utils/seo";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight, CheckCircle2, Sparkles, Layout, ShieldCheck, FileCheck, HelpCircle } from "lucide-react";

const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));

export const metadata = createSeoMetadata({
  title: "ATS Resume Templates for Freshers in India | NextCV",
  description:
    "Explore ATS-friendly resume templates for Indian job seekers. Create professional resumes for freshers and experienced roles with pay-per-resume pricing from ₹49 to ₹399.",
  path: "/templates",
  keywords: [
    "resume templates",
    "resume template",
    "free resume templates",
    "best resume template",
    "best resume template for freshers",
    "ats best resume template",
  ],
});

export default function TemplatesPage() {
  const faqs = [
    {
      q: "Which is the best resume format for freshers in India?",
      a: "The reverse-chronological format is best for freshers in India, placing education, tech stack, and academic projects at the top.",
    },
    {
      q: "Are all NextCV templates ATS-friendly?",
      a: "Yes, 100% of our templates are tested against major Applicant Tracking Systems (Workday, Taleo, Greenhouse, Darwinbox) used by MNCs.",
    },
    {
      q: "How much does it cost to download a resume?",
      a: "You can create and preview your resume for free, and download high-resolution PDFs with pay-per-resume pricing ranging from ₹49 to ₹399 depending on the template selected. No subscription traps!",
    },
    {
      q: "Do these templates work for IT & Software jobs?",
      a: "Absolutely! We have dedicated templates designed specifically to highlight programming languages, frameworks, GitHub links, and hackathons.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nextcv.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ATS Resume Templates for Freshers in India",
        item: "https://www.nextcv.in/templates",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-[28%] -top-20 h-[450px] w-[600px] rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
          <div className="absolute right-0 top-60 h-[400px] w-[500px] rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
        </div>

        {/* Hero Header */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <Layout className="w-4 h-4 text-indigo-600" />
              Recruiter-Tested ATS Templates 2026
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
              ATS-Friendly Resume Templates for{" "}
              <span className="block bg-gradient-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
                Indian Job Seekers
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
              Designed specifically for campus placements, IT freshers, and experienced professionals in India. Pay per resume ranging from{" "}
              <span className="font-bold text-indigo-600">₹49 to ₹399</span> depending on template.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                Build Resume Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Interactive Dynamic Templates Component */}
        <section className="py-12 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-white border border-slate-200 p-6 sm:p-10 rounded-3xl shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-2xl font-bold text-[#071644]">Explore ATS Resume Designs</h2>
                <p className="text-xs sm:text-sm text-slate-500">Pick a template to start editing in our AI builder</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Recruiter Approved
              </div>
            </div>

            <Templates />
          </div>
        </section>

        {/* Feature Matrix Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-14 border border-slate-200 shadow-sm space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
                Why NextCV Templates Outperform MS Word
              </h2>
              <p className="text-slate-600 text-sm sm:text-base">
                Generic docx files fail ATS parsers. Our templates are engineered for automated recruitment algorithms.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Clean Structure</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  No complex tables or graphic elements that confuse ATS parsers. Perfect text hierarchy for Workday & Darwinbox.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">AI Content Generator</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Generates quantified bullet points directly inside the template layout, saving hours of typing.
                </p>
              </div>

              <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Pay-Per-Resume (₹49 – ₹399)</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Download high-resolution PDF documents with single pay-per-resume pricing based on template. Zero subscriptions!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644] flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">Got questions about our templates? We've got answers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-2">
                <h3 className="text-base font-bold text-slate-900">{faq.q}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Guides Links */}
        <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative border-t border-slate-100">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#071644]">Popular ATS Resume Guides</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
              {[
                { label: "TCS Resume Format", href: "/tcs-resume-format-for-freshers" },
                { label: "Infosys Resume Format", href: "/infosys-resume-format-for-freshers" },
                { label: "Wipro Resume Format", href: "/wipro-resume-format-for-freshers" },
                { label: "ATS Resume Guide", href: "/ats-friendly-resume-format-india" },
                { label: "Fresher Resume Format", href: "/fresher-resume-format-india" },
                { label: "Resume Examples", href: "/examples" },
                { label: "Pricing Details", href: "/pricing" },
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 hover:text-indigo-600 hover:border-indigo-300 transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-[#071644] rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Select A Template & Build Your Resume
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Create an ATS-friendly resume starting from ₹49 to ₹399 depending on your selected template.
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
      </main>
    </>
  );
}
