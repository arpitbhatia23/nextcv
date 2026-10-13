import React from "react";
import {
  CheckCircle2,
  FileText,
  AlertTriangle,
  Search,
  ArrowRight,
  ShieldCheck,
  Layers,
  ListChecks,
  Sparkles,
  BookOpen,
  HelpCircle,
} from "lucide-react";
import ATSChecker from "@/shared/components/ats-checker/ATSChecker";
import Link from "next/link";

export const metadata = {
  title: "ATS Resume Checker – Check Your ATS Score | NextCV",
  description:
    "Check your resume's ATS compatibility online. Identify formatting issues, review relevant keywords and find practical ways to improve your resume before applying for jobs.",
  keywords: [
    "ATS resume checker",
    "check ATS score",
    "resume compatibility test",
    "ATS resume scanner",
    "resume formatting check",
    "job description keyword match",
    "free ATS score test",
    "resume parser check",
  ],
  alternates: {
    canonical: "https://www.nextcv.in/ats-resume-checker",
  },
  openGraph: {
    title: "ATS Resume Checker – Check Your ATS Score | NextCV",
    description:
      "Check your resume's ATS compatibility online. Identify formatting issues, review relevant keywords and find practical ways to improve your resume before applying for jobs.",
    url: "https://www.nextcv.in/ats-resume-checker",
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.nextcv.in/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ATS Resume Checker – Check Your ATS Score | NextCV",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS Resume Checker – Check Your ATS Score | NextCV",
    description:
      "Check your resume's ATS compatibility online. Identify formatting issues, review relevant keywords and find practical ways to improve your resume before applying for jobs.",
    images: ["https://www.nextcv.in/opengraph-image.png"],
  },
};

const evaluationPillars = [
  {
    icon: FileText,
    title: "Text Extractability & Format Hygiene",
    description:
      "Verifies that your PDF or DOCX file has selectable, machine-readable text instead of flattened images, scanned layers, or multi-column layout glitches that confuse parsers.",
  },
  {
    icon: Layers,
    title: "Standard Section Headings",
    description:
      "Confirms standard headings recruiters expect: Summary, Education, Skills, Projects, and Work Experience. Creative or unconventional titles can cause automated parsers to skip entire sections.",
  },
  {
    icon: ShieldCheck,
    title: "Contact Details & Profile Links",
    description:
      "Checks for essential recruiter contact information including an active email, phone number, and clickable profiles (LinkedIn, GitHub, or portfolio).",
  },
  {
    icon: ListChecks,
    title: "Content Length & Action Verbs",
    description:
      "Evaluates overall word count (target: 350–850 words) and screens for measurable action verbs (developed, engineered, optimized) that substantiate candidate experience.",
  },
  {
    icon: Search,
    title: "Job Description Keyword Match",
    description:
      "When a job posting is provided, the tool compares technical skills and role requirements to identify matched, partial, and missing keywords.",
  },
];

const faqItems = [
  {
    q: "What is an ATS and how does it screen applications?",
    a: "An Applicant Tracking System (ATS) is software used by recruiters and hiring teams to organize, search, and screen job applications. It parses uploaded files into structured fields such as contact details, education, skills, and work experience so recruiters can filter candidates by relevant qualifications.",
  },
  {
    q: "What does the NextCV ATS score evaluate?",
    a: "The score evaluates technical parseability (extractable text from PDF or DOCX), standard section headings, presence of required contact details, document length balance, action verb usage, and optional keyword match percentage against a target job description.",
  },
  {
    q: "Does a high ATS score guarantee a job interview?",
    a: "No. A high score confirms your document is cleanly formatted and contains relevant keywords for automated parsers, but hiring decisions depend on human recruiter evaluation, qualification depth, portfolio strength, and specific role requirements.",
  },
  {
    q: "Which file format is best for applicant tracking systems: PDF or Word?",
    a: "Standard text-based PDF files and Word (.docx) documents are both widely supported. Modern applicant tracking systems parse text-based PDFs accurately while preserving consistent visual layout across all operating systems.",
  },
  {
    q: "How does the optional job description keyword match work?",
    a: "When you paste a job posting alongside your file, the analyzer identifies essential technical skills and qualifications in the description, then checks your document for direct and partial matches to highlight missing keywords.",
  },
  {
    q: "How much does NextCV cost?",
    a: "The ATS checker scan and resume builder preview are free to use. Premium resume template exports are available through transparent one-time payments ranging from ₹49 to ₹399 with no recurring monthly subscriptions.",
  },
];

const guideLinks = [
  {
    title: "ATS-Friendly Resume Format India",
    description:
      "Formatting standards, margin rules, and section structure for Indian recruitment.",
    href: "/ats-friendly-resume-format-india",
  },
  {
    title: "Fresher Resume Format Guide",
    description: "Step-by-step resume advice for college graduates and entry-level applicants.",
    href: "/fresher-resume-format-india",
  },
  {
    title: "MNC Resume Format for Freshers",
    description:
      "Tailoring technical skills, projects, and coursework for IT and enterprise campus hiring.",
    href: "/mnc-resume-format-for-freshers",
  },
  {
    title: "ATS-Optimized Resume Templates",
    description: "Explore clean single-column templates designed for reliable ATS parsing.",
    href: "/templates",
  },
  {
    title: "Resume Examples by Industry",
    description:
      "Browse vetted examples across software engineering, data, marketing, and operations.",
    href: "/examples",
  },
  {
    title: "Career & Interview Guides",
    description:
      "Comprehensive guides on technical interviews, cover letters, and career transitions.",
    href: "/career",
  },
];

export default function ATSCheckerPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(item => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute left-[28%] -top-20 h-112.5 w-125 bg-[#eef2ff] opacity-70 blur-[100px]" />
        <div className="absolute right-0 top-60 h-100 w-125 bg-[#eef4ff] opacity-80 blur-[110px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-28 pb-14 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-indigo-600" aria-hidden="true" />
            <span>Updated for 2026 Hiring & Placement Standards</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
            Free ATS Resume Checker & Compatibility Test
          </h1>

          <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
            Upload your resume to check text readability, essential sections, contact information,
            and keyword alignment against job requirements before submitting applications.
          </p>

          <div className="pt-2">
            <ATSChecker />
          </div>
        </div>
      </section>

      {/* Evaluation Pillars Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative border-t border-slate-100">
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
            What the NextCV ATS Checker Evaluates
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Our diagnostic scan examines structural hygiene, parsing accessibility, and keyword
            relevance without overpromising automated outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evaluationPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 p-6 border border-slate-200 shadow-xs space-y-3 flex flex-col justify-start"
              >
                <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-base font-bold text-[#071644]">{pillar.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}

          {/* Quick Summary Card */}
          <div className="bg-[#071644] text-white p-6 border border-[#071644] shadow-xs space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-indigo-300">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-white">Actionable Diagnostic Feedback</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Receive specific recommendations on missing sections, weak bullet points, and
                keyword gaps so you can make focused edits.
              </p>
            </div>
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white transition-colors pt-2"
            >
              Browse ATS-Ready Templates <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Realistic Score Explanation & Limitations */}
      <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative bg-slate-50/70 border-y border-slate-200">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
              Understanding Your Score and Its Limitations
            </h2>
            <p className="text-slate-600 text-sm">
              An ATS compatibility test helps catch preventable parsing errors, but recruiter
              evaluation involves human judgment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-base">
                <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                <h3>What a High Score Represents</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                A strong score indicates that automated applicant systems can reliably parse your
                text, identify standard section boundaries, locate contact credentials, and match
                keywords with the job description. It confirms document readability and formatting
                clarity.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                  <span>Clean single-column parsing without garbled text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                  <span>Unambiguous headings (Education, Experience, Skills)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-1.5 shrink-0" />
                  <span>Natural inclusion of role-specific technical skills</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-7 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-base">
                <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                <h3>Important Limitations to Keep in Mind</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Different companies utilize different applicant tracking platforms (Workday, Taleo,
                Greenhouse, iCIMS, or custom internal portals) with varying recruiter search
                criteria. No automated tool can guarantee an interview callback or mimic every
                proprietary employer algorithm.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-1">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0" />
                  <span>Scoring is diagnostic guidance, not a hiring endorsement</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0" />
                  <span>Human recruiters assess depth of experience and cultural fit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 shrink-0" />
                  <span>Avoid artificial keyword stuffing, which harms recruiter review</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Formatting & Placement Preparation */}
      <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
              Practical Formatting Guidelines for Reliable Parsing
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              When applying through online career portals or campus drives, simple layout decisions
              make a substantial difference in how cleanly software extracts candidate data.
            </p>

            <div className="space-y-4 pt-2">
              <div className="p-4 bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  1. Prefer Clean, Single-Column Layouts
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Multi-column grids, complex tables, and text boxes can cause parsers to read text
                  out of sequence or merge unrelated paragraphs.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  2. Use Standard, Clear Section Titles
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Stick with recognized headings like “Work Experience”, “Technical Skills”, and
                  “Education” instead of stylistic phrases like “Where I have been” or “Toolbox”.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200">
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  3. Align Keywords to Real Experience
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Carefully mirror key tools and technologies mentioned in the job description in
                  your project summaries and bullet points without falsifying qualifications.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5 bg-slate-50 p-8 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600">
                <BookOpen className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#071644]">
                Preparing for High-Volume Recruitment
              </h2>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              During high-volume campus hiring and off-campus enterprise drives, recruiting teams
              receive hundreds or thousands of submissions per opening. Parsers filter for baseline
              qualifications, required degrees, and core technology stacks before recruiters review
              shortlisted profiles.
            </p>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 pt-2">
              <li className="flex gap-3 items-start bg-white p-3.5 border border-slate-200">
                <CheckCircle2
                  className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-slate-900">Engineering & IT:</strong> Highlight core
                  languages, database technologies, and verifiable project links (GitHub/live demo).
                </span>
              </li>
              <li className="flex gap-3 items-start bg-white p-3.5 border border-slate-200">
                <CheckCircle2
                  className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-slate-900">Business & Management:</strong> Detail project
                  scope, methodologies, team collaboration, and measurable outcomes.
                </span>
              </li>
              <li className="flex gap-3 items-start bg-white p-3.5 border border-slate-200">
                <CheckCircle2
                  className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span>
                  <strong className="text-slate-900">Certifications & Training:</strong> Explicitly
                  state course titles, accredited institutions, and completion years.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Internal Guides & Resources Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
            Helpful Career & Resume Resources
          </h2>
          <p className="text-slate-600 text-sm">
            Explore our curated guides and ATS-optimized templates to continue improving your job
            application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guideLinks.map((guide, idx) => (
            <Link
              key={idx}
              href={guide.href}
              className="group p-6 bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{guide.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                Read guide <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto z-10 relative border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-indigo-600 font-semibold text-xs uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm">
            Common questions about applicant tracking systems, scoring methodology, and resume
            formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqItems.map((faq, i) => (
            <div key={i} className="bg-slate-50 p-6 border border-slate-200 shadow-xs space-y-2.5">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">{faq.q}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="bg-[#071644] p-10 md:p-14 text-center space-y-6 shadow-xl text-white">
          <h2 className="text-2xl sm:text-4xl font-extrabold">
            Ready to Build an ATS-Optimized Resume?
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Choose from professionally formatted templates designed for clear parsing, with one-time
            download options from ₹49 to ₹399 and zero monthly subscriptions.
          </p>
          <div>
            <Link
              href="/templates"
              aria-label="Explore ATS resume templates"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105 min-h-11"
            >
              Explore Templates <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
