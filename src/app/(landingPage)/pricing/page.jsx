import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  Check,
  ShieldCheck,
  Zap,
  Download,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Star,
  Globe,
  Crown,
  X,
  FileText,
  Layers,
} from "lucide-react";

export const metadata = createSeoMetadata({
  title: "Resume Builder Pricing in India | All Tiers from ₹49 to ₹399 | NextCV",
  description:
    "See NextCV's transparent pay-per-resume pricing in India. Basic (₹49), Standard (₹99), Premium (₹199), and Elite (₹399). Public Resume Sharing live web links included for Premium and Elite tiers.",
  path: "/pricing",
  keywords: [
    "resume builder pricing india",
    "resume builder price india",
    "best resume builder india",
    "ats resume builder",
    "resume sharing link",
    "nextcv pricing tiers",
  ],
});

export const revalidate = 3600;

export default function PricingPage() {
  const faqs = [
    {
      question: "Which tiers include the Public Resume Sharing Link?",
      answer:
        "The live Resume Sharing option is included with all Premium (₹199) and Elite (₹399) catalog templates. It generates a verified public web link (nextcv.in/r/your-slug) that you can share directly on LinkedIn, WhatsApp, or email with zero attachment limits.",
    },
    {
      question: "How do I access and generate an AI Cover Letter?",
      answer:
        "You can access the AI Cover Letter builder directly from your dashboard or after finalizing your resume. Simply select your saved resume, input the target company name and job description, customize your tone (Professional, Enthusiastic, or Concise), and download an ATS-matched high-res PDF in seconds.",
    },
    {
      question: "How does NextCV pricing work?",
      answer:
        "NextCV works on a transparent pay-per-resume model. You can build, edit, and preview your resume completely free. You only pay a single one-time fee ranging from ₹49 to ₹399 when downloading your watermark-free ATS PDF.",
    },
    {
      question: "What are the differences between Basic, Standard, Premium, and Elite tiers?",
      answer:
        "Basic (₹49) provides a clean modern fresher layout. Standard (₹99) includes TCS, Infosys, and Wipro recruiter formats. Premium (₹199) unlocks 20+ corporate/sidebar designs plus the Live Resume Sharing Web Link. Elite (₹399) includes FAANG & Wall Street layouts, dark mode styles, priority ATS parsing, and the Live Resume Sharing link.",
    },
    {
      question: "Is there any recurring monthly subscription?",
      answer:
        "No! Unlike international builders that silently charge ₹800–₹1,500 every month on auto-renewal, NextCV has zero recurring subscriptions. You only pay once per resume.",
    },
    {
      question: "Can I edit my resume after purchasing?",
      answer:
        "Yes, you have full access to your created resume in your NextCV dashboard to update your information, refine AI bullet points, and re-download whenever needed.",
    },
  ];

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
          <div className="absolute left-[28%] -top-20 h-112 w-150 rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
          <div className="absolute right-0 top-60 h-100 w-125 rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
        </div>

        {/* Hero Header */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Pay-Per-Resume Model • 4 Transparent Tiers • Zero Auto-Renewals
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
              Affordable ATS Resume Pricing in{" "}
              <span className="bg-linear-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
                India
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
              Build and preview for free. Pay once per resume starting from{" "}
              <strong className="text-indigo-600">₹49 to ₹399</strong>. Public Resume Sharing links
              included with <strong className="text-indigo-600">Premium & Elite</strong> tiers.
            </p>
          </div>
        </section>

        {/* All 4 Pricing Tiers Section */}
        <section className="pb-24 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {/* TIER 1: Basic */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-indigo-300 hover:shadow-md transition-all">
              <div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-full uppercase tracking-wider">
                    Basic Tier
                  </span>
                  <h2 className="text-xl font-bold text-[#071644] mt-3">Clean Modern</h2>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Essential clean ATS layout for campus placements and college submissions.
                  </p>
                </div>

                <div className="flex items-baseline mb-6">
                  <span className="text-slate-400 line-through text-xs sm:text-sm mr-2">₹99</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹49
                  </span>
                  <span className="text-slate-500 text-xs font-medium ml-1.5">/ resume</span>
                </div>

                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md mb-6 inline-block">
                  Save ₹50 (50% Off)
                </div>

                <ul className="space-y-3 mb-8 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Single-Column ATS Format</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% ATS Passed Structure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>High-Resolution PDF Download</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant UPI & Card Checkout</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 line-through">
                    <X className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>Public Resume Sharing Link</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 line-through">
                    <X className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>AI Cover Letter Generator</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/templates"
                className="w-full block bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-center text-xs sm:text-sm transition-all shadow-xs"
              >
                Browse Basic (₹49)
              </Link>
            </div>

            {/* TIER 2: Standard */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-indigo-300 hover:shadow-md transition-all">
              <div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-full uppercase tracking-wider border border-blue-100">
                    Standard Pack
                  </span>
                  <h2 className="text-xl font-bold text-[#071644] mt-3">Service MNCs</h2>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    TCS Digital, Infosys, Compact Modern, and Classic layouts for IT mass hiring.
                  </p>
                </div>

                <div className="flex items-baseline mb-6">
                  <span className="text-slate-400 line-through text-xs sm:text-sm mr-2">₹199</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹99
                  </span>
                  <span className="text-slate-500 text-xs font-medium ml-1.5">/ resume</span>
                </div>

                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md mb-6 inline-block">
                  Save ₹100 (50% Off)
                </div>

                <ul className="space-y-3 mb-8 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>TCS, Infosys & Wipro Formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Gemini AI Bullet Optimizer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Recruiter Tested Layout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>High-Resolution PDF Download</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 line-through">
                    <X className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>Public Resume Sharing Link</span>
                  </li>
                  <li className="flex items-center gap-2 text-slate-400 line-through">
                    <X className="w-4 h-4 text-slate-300 shrink-0" />
                    <span>AI Cover Letter Generator</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/templates"
                className="w-full block bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-center text-xs sm:text-sm transition-all shadow-xs"
              >
                Browse Standard (₹99)
              </Link>
            </div>

            {/* TIER 3: Premium (🔥 Most Popular with Resume Sharing) */}
            <div className="rounded-3xl p-1 bg-linear-to-b from-indigo-500 via-indigo-600 to-purple-600 shadow-xl hover:scale-[1.02] transition-transform flex flex-col">
              <div className="bg-white rounded-[22px] p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-950 font-black px-3.5 py-1 rounded-bl-xl text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Star className="w-3 h-3 fill-yellow-950" /> MOST POPULAR
                </div>

                <div>
                  <div className="mb-4 pt-1">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[11px] font-bold rounded-full border border-indigo-100 uppercase tracking-wider">
                      Premium Catalog
                    </span>
                    <h2 className="text-xl font-bold text-[#071644] mt-3">Corporate & Roles</h2>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Amazon, Deloitte, Accenture, IBM, Oracle, plus specialized industry layouts.
                    </p>
                  </div>

                  <div className="flex items-baseline mb-6">
                    <span className="text-slate-400 line-through text-xs sm:text-sm mr-2">
                      ₹399
                    </span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                      ₹199
                    </span>
                    <span className="text-slate-500 text-xs font-medium ml-1.5">/ resume</span>
                  </div>

                  <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md mb-6 inline-block">
                    Save ₹200 (50% Off)
                  </div>

                  <ul className="space-y-3 mb-8 text-xs text-slate-700">
                    {/* Highlighted Resume Sharing Feature */}
                    <li className="flex items-start gap-2 bg-indigo-50/90 border border-indigo-200 text-indigo-950 font-bold p-2.5 rounded-xl shadow-2xs">
                      <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <span>Verified Resume Sharing Link (nextcv.in/r/...)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>1-Click LinkedIn & WhatsApp Sharing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>20+ Corporate & Sidebar Layouts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Specialized Roles (Tech, Legal, Health)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Unlimited Gemini AI Writer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>High-Resolution PDF Download</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/templates"
                  className="w-full block bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 rounded-xl text-center text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all"
                >
                  Choose Premium (₹199)
                </Link>
              </div>
            </div>

            {/* TIER 4: Elite (👑 All Templates + Resume Sharing + AI Cover Letter) */}
            <div className="border-2 border-indigo-600 bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl hover:scale-[1.02] transition-transform relative">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white font-black px-3.5 py-1 rounded-bl-xl text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Crown className="w-3 h-3 text-amber-300" /> HIGH SUCCESS
              </div>

              <div>
                <div className="mb-4 pt-1">
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[11px] font-bold rounded-full border border-purple-100 uppercase tracking-wider">
                    Elite Catalog
                  </span>
                  <h2 className="text-xl font-bold text-[#071644] mt-3">Top Tech & FAANG</h2>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Google, Microsoft, Meta, Goldman Sachs, NavyEdge, and TechDark templates.
                  </p>
                </div>

                <div className="flex items-baseline mb-6">
                  <span className="text-slate-400 line-through text-xs sm:text-sm mr-2">₹799</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    ₹399
                  </span>
                  <span className="text-slate-500 text-xs font-medium ml-1.5">/ resume</span>
                </div>

                <div className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md mb-6 inline-block">
                  Save ₹400 (50% Off)
                </div>

                <ul className="space-y-3 mb-8 text-xs text-slate-700">
                  {/* Highlighted Resume Sharing Feature */}
                  <li className="flex items-start gap-2 bg-indigo-50/90 border border-indigo-200 text-indigo-950 font-bold p-2.5 rounded-xl shadow-2xs">
                    <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>Verified Resume Sharing Link (nextcv.in/r/...)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>1-Click LinkedIn & WhatsApp Sharing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>FAANG & Wall Street Tested Designs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Dark Mode & Modern Infographic Formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>AI Cover Letter Integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority ATS Algorithm Tuning</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/templates"
                className="w-full block bg-[#071644] hover:bg-slate-900 text-white font-extrabold py-3.5 rounded-xl text-center text-xs sm:text-sm shadow-md transition-all"
              >
                Choose Elite (₹399)
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlight Strip for Resume Sharing & Cover Letter */}
        <section className="py-12 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Live Sharing Box */}
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Globe className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-white border border-indigo-200 px-2.5 py-0.5 rounded-full inline-block">
                  Available in Premium & Elite
                </span>
                <h3 className="text-lg font-bold text-[#071644]">Live Resume Sharing Option</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Recruiters get an instant live web link (
                  <code className="text-indigo-600 font-mono">nextcv.in/r/slug</code>). No broken
                  file conversions or large email attachments. Viewable on any phone or desktop with
                  one-click PDF export.
                </p>
              </div>
            </div>

            {/* AI Cover Letter Box */}
            <div className="bg-purple-50/60 border border-purple-100 rounded-3xl p-6 sm:p-8 flex items-start gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-white border border-purple-200 px-2.5 py-0.5 rounded-full inline-block">
                  Role-Targeted Generation
                </span>
                <h3 className="text-lg font-bold text-[#071644]">AI Cover Letter Integration</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Tailor your job application in 5 easy steps. Select your resume, enter the target
                  company and job description, customize tone, and download a matching PDF cover
                  letter ready to submit.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why NextCV Trust Cards */}
        <section className="py-20 bg-slate-50 border-y border-slate-200 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#071644] mb-14">
              Why Job Seekers Prefer NextCV
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">No Monthly Subscription Traps</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  International competitors silently charge ₹1,200+ every month. NextCV charges per
                  resume (₹49 - ₹399) — zero unexpected credit card debits.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Instant High-Res Export</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Once created, your PDF is stored securely. Download clean ATS formats fully
                  compatible with TCS, Infosys, and Wipro portals.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Gemini AI Included</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Don't pay thousands to freelancers. Generate quantified bullet points and
                  professional summaries included in the template price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison Table Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
                Resume Writing Cost Comparison in India
              </h2>
              <p className="text-slate-600 text-sm">
                Compare NextCV tiers against freelancers and traditional agencies.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white border border-slate-200 rounded-3xl overflow-hidden text-xs sm:text-sm shadow-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-left">
                    <th className="p-4 sm:p-5 font-bold">Service Category</th>
                    <th className="p-4 sm:p-5 font-bold">Price Range</th>
                    <th className="p-4 sm:p-5 font-bold">Public Share Link</th>
                    <th className="p-4 sm:p-5 font-bold">ATS Guarantee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="bg-indigo-50/40">
                    <td className="p-4 sm:p-5 font-bold text-[#071644] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> NextCV Basic Tier
                    </td>
                    <td className="p-4 sm:p-5 font-extrabold text-indigo-600">₹49</td>
                    <td className="p-4 sm:p-5 text-slate-400">PDF Only</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">100% Passed</td>
                  </tr>
                  <tr className="bg-indigo-50/40">
                    <td className="p-4 sm:p-5 font-bold text-[#071644] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> NextCV Standard Pack
                    </td>
                    <td className="p-4 sm:p-5 font-extrabold text-indigo-600">₹99</td>
                    <td className="p-4 sm:p-5 text-slate-400">PDF Only</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">100% Passed</td>
                  </tr>
                  <tr className="bg-indigo-50/60 border-l-4 border-l-indigo-600">
                    <td className="p-4 sm:p-5 font-bold text-[#071644] flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> NextCV Premium
                      (Most Popular)
                    </td>
                    <td className="p-4 sm:p-5 font-extrabold text-indigo-600">₹199</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">
                      ✓ Included (nextcv.in/r/...)
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">100% Passed</td>
                  </tr>
                  <tr className="bg-indigo-50/60 border-l-4 border-l-indigo-600">
                    <td className="p-4 sm:p-5 font-bold text-[#071644] flex items-center gap-2">
                      <Crown className="w-4 h-4 text-indigo-600" /> NextCV Elite (Top Tech & FAANG)
                    </td>
                    <td className="p-4 sm:p-5 font-extrabold text-indigo-600">₹399</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">
                      ✓ Included (nextcv.in/r/...)
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">100% Passed</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-medium">Freelance Writer</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">₹1,500 – ₹3,500</td>
                    <td className="p-4 sm:p-5 text-slate-400">None</td>
                    <td className="p-4 sm:p-5 text-slate-500">Varies</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-medium">Resume Writing Agency</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">₹4,000 – ₹10,000+</td>
                    <td className="p-4 sm:p-5 text-slate-400">None</td>
                    <td className="p-4 sm:p-5 text-slate-500">Manual Check</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-medium">Subscription Builders</td>
                    <td className="p-4 sm:p-5 font-semibold text-red-500">
                      ₹999 / Month Recurring
                    </td>
                    <td className="p-4 sm:p-5 text-slate-500">Monthly locked</td>
                    <td className="p-4 sm:p-5 text-slate-500">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bilingual Hindi Trust Banner */}
        <section className="py-16 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 text-white space-y-6 shadow-xl">
            <h2 className="text-2xl font-bold">Resume Banane Mein Kitna Paisa Lagta Hai?</h2>
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm">
              <p>
                Agar aap search kar rahe hain ki ek professional{" "}
                <strong className="text-white">ATS resume banane me kitna paisa lagta hai</strong>,
                toh yahan clear comparison hai:
              </p>
              <div className="grid sm:grid-cols-4 gap-4 font-sans">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <span className="text-slate-400 block text-xs">Free Preview</span>
                  <span className="text-xl font-bold text-slate-200">₹0</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <span className="text-slate-400 block text-xs">Basic & Standard</span>
                  <span className="text-xl font-bold text-slate-200">₹49 – ₹99</span>
                </div>
                <div className="bg-indigo-900 p-4 rounded-2xl border border-indigo-700">
                  <span className="text-indigo-200 block text-xs font-semibold">
                    Premium & Elite (+ Live Share Link)
                  </span>
                  <span className="text-xl font-extrabold text-indigo-300">₹199 – ₹399</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <span className="text-slate-400 block text-xs">Agency Service</span>
                  <span className="text-xl font-bold text-slate-200">₹1,500 – ₹5,000+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordions Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative border-t border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644] flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know about NextCV tiers, live sharing, and cover letters.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer Banner */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-[#071644] rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Create Your ATS Resume From ₹49 to ₹399
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Join 12,000+ Indian freshers and developers who upgraded their job search with NextCV.
            </p>
            <div>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                Choose A Template & Build <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
