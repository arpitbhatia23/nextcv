import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  HelpCircle,
  Layers,
  ListChecks,
  Search,
  ShieldCheck,
  Sparkles,
  Lock,
  Wand2,
} from "lucide-react";

import Link from "next/link";
import Script from "next/script";
import ATSChecker from "@/shared/components/ats-checker/ATSChecker";
import { createSeoMetadata } from "@/shared/utils/seo";

export const metadata = createSeoMetadata({
  title: "Free ATS Resume Checker: Scan & Check ATS Score | NextCV",
  description:
    "Scan your resume with our free AI ATS checker. Upload PDF or DOCX for an instant ATS score, formatting review, and job-description keyword match in seconds.",
  path: "/ats-resume-checker",
  keywords: [
    "ATS resume checker",
    "free ATS resume checker",
    "resume ATS checker",
    "resume ATS score checker",
    "check ats score free",
    "ats resume scanner",
    "ATS friendly resume checker",
    "resume compatibility checker",
    "ATS resume checker with job description",
    "ats score test online",
  ],
});

const evaluationPillars = [
  {
    icon: FileText,
    title: "Resume Text & Formatting",
    description:
      "Review whether your PDF or DOCX contains readable, extractable text. Complex layouts, text boxes, and scanned pages may affect how information is interpreted.",
  },
  {
    icon: Layers,
    title: "Standard Resume Sections",
    description:
      "Check for familiar headings such as Education, Skills, Projects, and Work Experience so important information is easier to find.",
  },
  {
    icon: ShieldCheck,
    title: "Contact Details & Profile Links",
    description:
      "Review essential details such as your email address and phone number, plus relevant LinkedIn, GitHub, or portfolio links.",
  },
  {
    icon: ListChecks,
    title: "Content Clarity & Action Verbs",
    description:
      "Look for concise bullet points explaining what you built, improved, managed, or achieved. Add measurable outcomes when you can support them.",
  },
  {
    icon: Search,
    title: "Job Description Keyword Match",
    description:
      "When job-description matching is supported, review relevant skills and requirements that appear to match or may be missing from your resume.",
  },
];

const faqItems = [
  {
    q: "What is an ATS resume checker?",
    a: "An ATS resume checker evaluates how well Applicant Tracking Systems (ATS) can parse and interpret your resume. It analyzes text readability, section structure, layout formatting, and keyword alignment with specific job postings.",
  },
  {
    q: "How can I check my ATS resume score for free?",
    a: "Upload your resume in PDF or DOCX format to NextCV's free ATS checker. The tool scans your document in seconds and provides a comprehensive score breakdown with actionable suggestions.",
  },
  {
    q: "What is considered a good ATS score?",
    a: "A score of 80% or higher is considered interview-ready, indicating strong readability and high keyword relevancy. Scores between 60% and 79% usually have readable layouts but lack targeted technical keywords. Scores below 60% often have structural blockers like tables, text boxes, or non-extractable text.",
  },
  {
    q: "Why do resumes fail ATS scans?",
    a: "Resumes typically fail ATS scans due to multi-column tables, graphics, text boxes, contact information hidden inside headers or footers, non-standard section headers (e.g. 'My Journey' instead of 'Experience'), and missing job description keywords.",
  },
  {
    q: "What does the NextCV ATS resume checker evaluate?",
    a: "The checker reviews resume text readability, standard section headers, contact details, action verbs, measurable outcomes, and job-description keyword match.",
  },
  {
    q: "Can I check my resume against a job description?",
    a: "Yes. Simply paste the target job description alongside your resume upload. NextCV will compare your skills and experience against the job post to highlight matched and missing keywords.",
  },
  {
    q: "Is PDF or DOCX better for an ATS resume?",
    a: "Both text-based PDFs and DOCX files work well. A vector-rendered PDF is ideal because it preserves exact typography and formatting across all operating systems. Avoid scanned image-based PDFs.",
  },
  {
    q: "Does a high ATS score guarantee an interview?",
    a: "No. An ATS checker ensures your resume gets past machine parsing filters, but human recruiters evaluate relevant achievements, cultural fit, and project depth before calling you for an interview.",
  },
  {
    q: "Is the NextCV ATS resume checker free?",
    a: "Yes. NextCV's ATS checker scan and real-time diagnostic are 100% free to use. When you are ready to export new ATS-compliant resume templates, one-time plans start from ₹49 with zero monthly subscriptions.",
  },
];

const guideLinks = [
  {
    title: "ATS-Friendly Resume Builder",
    description:
      "Create a single-column, recruiter-approved ATS resume from scratch with real-time preview.",
    href: "/ats-resume-builder",
    icon: Wand2,
  },
  {
    title: "ATS-Friendly Resume Format for India",
    description:
      "Learn how to structure a resume with clear sections and readable formatting for Indian job applications.",
    href: "/ats-friendly-resume-format-india",
    icon: FileText,
  },
  {
    title: "Fresher Resume Format Guide",
    description:
      "Build a resume around your education, projects, skills, internships, and early career experience.",
    href: "/fresher-resume-format-india",
    icon: BookOpen,
  },
  {
    title: "MNC Resume Format for Freshers",
    description:
      "Present technical skills, projects, coursework, and relevant experience for entry-level roles.",
    href: "/mnc-resume-format-for-freshers",
    icon: Layers,
  },
  {
    title: "ATS-Friendly Resume Templates",
    description:
      "Explore clean resume layouts with recognizable sections and machine-readable formatting.",
    href: "/templates",
    icon: FileText,
  },
  {
    title: "AI Cover Letter Builder",
    description:
      "Generate an ATS-tailored cover letter that matches the keywords of your target job description.",
    href: "/ai-cover-letter-builder",
    icon: ListChecks,
  },
];

const formattingTips = [
  {
    title: "Use a clean, single-column layout",
    description:
      "A simple single-column layout ensures ATS parsers read your content in the intended chronological order. Avoid multi-column grids and floating text boxes.",
  },
  {
    title: "Choose standard section headings",
    description:
      "Use recognized labels such as Work Experience, Technical Skills, Projects, and Education so ATS software accurately files your information.",
  },
  {
    title: "Match keywords to the job description",
    description:
      "Incorporate required tools, technologies, and methodologies directly from the job posting wherever they accurately describe your real background.",
  },
  {
    title: "Write quantifiable bullet points",
    description:
      "Lead with strong action verbs (Architected, Implemented, Streamlined) and support your accomplishments with measurable numbers and metrics.",
  },
];

const commonBlockers = [
  {
    title: "Tables & Multi-Column Layouts",
    text: "ATS parsers read horizontally across pages. Tables and multi-column designs frequently scramble your text into unreadable sentences.",
  },
  {
    title: "Contact Info in Headers/Footers",
    text: "Many ATS tools ignore header and footer zones entirely, stripping your phone number, email address, and LinkedIn profile from the application.",
  },
  {
    title: "Graphics, Icons & Skill Bars",
    text: "Skill rating bars (e.g. 4/5 stars) and graphical icons cannot be parsed by ATS algorithms and waste valuable resume space.",
  },
  {
    title: "Scanned / Image-Based PDFs",
    text: "If you cannot highlight and copy text with your cursor, the ATS sees a blank page, resulting in immediate rejection.",
  },
  {
    title: "Creative Non-Standard Headings",
    text: "Headings like 'Where I've Been' or 'Core Competencies' may cause the parser to miss your entire work history or technical toolkit.",
  },
];

const cardClass =
  "border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md";

const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";

export default function ATSCheckerPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "NextCV Free ATS Resume Checker",
        url: "https://www.nextcv.in/ats-resume-checker",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        description:
          "Free AI-powered ATS resume checker that evaluates formatting, extractability, section headings, and job-description keyword match.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "INR",
        },
        featureList: [
          "Instant ATS Score Calculation",
          "PDF and DOCX File Parsing",
          "Job Description Keyword Match",
          "Section Headings & Contact Details Review",
          "Formatting & Layout Diagnostic",
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map(item => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
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
            name: "ATS Resume Checker",
            item: "https://www.nextcv.in/ats-resume-checker",
          },
        ],
      },
    ],
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* Background accents */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-[15%] h-96 w-96 bg-indigo-100/70 blur-3xl" />
        <div className="absolute -right-32 top-80 h-96 w-96 bg-blue-100/60 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 sm:text-sm">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              100% Free resume scan · Real-time feedback
            </div>

            <h1 className="mt-6 font-display text-3xl leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Free ATS Resume Checker: Scan & Score Your Resume Online
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Check your resume against real Applicant Tracking System criteria for free. Upload
              your PDF or DOCX to review machine readability, layout compatibility, section headers,
              and match keywords against any job description.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#ats-checker"
                className={`${buttonClass} w-full bg-indigo-600 text-white hover:bg-indigo-700 sm:w-auto`}
              >
                Scan My Resume Free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                href="/templates"
                className={`${buttonClass} w-full border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 sm:w-auto`}
              >
                Explore ATS Templates
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                PDF & DOCX support (up to 5MB)
              </span>

              <span aria-hidden="true" className="hidden text-slate-300 sm:inline">
                ·
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                No login required for initial scan
              </span>

              <span aria-hidden="true" className="hidden text-slate-300 sm:inline">
                ·
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-emerald-600" />
                100% Private & secure analysis
              </span>
            </div>
          </div>

          {/* Checker widget */}
          <div
            id="ats-checker"
            className="mx-auto mt-10 max-w-5xl border border-slate-200 bg-white p-3 shadow-xl shadow-indigo-950/5 sm:mt-12 sm:p-6 lg:p-8"
          >
            <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 px-2 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950 sm:text-xl">
                  Instant Resume Scan & ATS Score Analysis
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Upload your resume file and optionally paste a job description for targeted keyword
                  matching.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-1.5 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Free instant scan
              </span>
            </div>

            <ATSChecker />

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                100% Private & Secure — Processed in memory, never shared publicly
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-slate-600">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                Compatible with Workday, Taleo, Greenhouse, Lever & SAP SuccessFactors
              </span>
            </div>
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            A checker provides diagnostic guidance to improve readability and keyword alignment
            prior to job submission.
          </p>
        </div>
      </section>

      {/* Evaluation features */}
      <section className="border-t border-slate-100 bg-slate-50/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              What gets reviewed
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              What Does an ATS Resume Checker Actually Scan?
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Applicant Tracking Systems parse documents through text-extraction engines before
              human recruiters ever read them. Here is what NextCV evaluates in your file:
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationPillars.map(pillar => {
              const Icon = pillar.icon;

              return (
                <article key={pillar.title} className={cardClass}>
                  <div className="flex h-11 w-11 items-center justify-center border border-indigo-100 bg-indigo-50 text-indigo-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-950">{pillar.title}</h3>

                  <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.description}</p>
                </article>
              );
            })}

            <article className="flex flex-col bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center bg-white/10 text-indigo-300">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-base font-bold">Turn Feedback into an Interview-Ready Resume</h3>

              <p className="mt-2 flex-1 text-sm leading-7 text-slate-300">
                Review your diagnostic score, fix structural blockers, strengthen impact verbs, and
                switch to a single-column layout optimized for high ATS pass rates.
              </p>

              <Link
                href="/ats-resume-builder"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-white"
              >
                Use ATS Resume Builder
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Score explanation & benchmark tiers */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Understand your results
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Understanding Your ATS Resume Score (Scoring Tiers)
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              An ATS score is a quantitative benchmark of how smoothly your resume is extracted,
              categorized, and matched against industry job standards.
            </p>
          </div>

          {/* Scoring Tiers Grid */}
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="border border-emerald-200 bg-emerald-50/60 p-6 shadow-sm">
              <span className="inline-block bg-emerald-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                80 – 100 Score
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950">Interview-Ready</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Clean single-column layout, standard headings, complete contact info, and high
                keyword density. Ready to submit to corporate job portals.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Full machine compatibility
              </div>
            </div>

            <div className="border border-amber-200 bg-amber-50/60 p-6 shadow-sm">
              <span className="inline-block bg-amber-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                60 – 79 Score
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950">Needs Minor Polish</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Readable structure, but missing role-specific keywords or measurable bullet points.
                Add technical skills from the target job posting.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-800">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                Keyword alignment recommended
              </div>
            </div>

            <div className="border border-rose-200 bg-rose-50/60 p-6 shadow-sm">
              <span className="inline-block bg-rose-600 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                Below 60 Score
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-950">High Risk of Rejection</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Critical parsing issues detected: multi-column tables, text boxes, graphics, or
                non-standard section titles that confuse ATS bots.
              </p>
              <Link
                href="/ats-resume-builder"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 hover:text-rose-900"
              >
                Rebuild with ATS template <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-bold text-slate-950">
                  What a Strong Result Indicates
                </h3>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                A high score indicates readable text, recognizable section headings, accessible
                contact details, and relevant technical competencies for the role you are targeting.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "Text is cleanly extracted in proper reading order.",
                  "Sections such as Education, Skills, and Experience are recognized.",
                  "Relevant keywords and technologies appear naturally in project bullets.",
                ].map(tip => (
                  <li
                    key={tip}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"
                  >
                    <CheckCircle2
                      className="mt-1 h-4 w-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </article>

            <article className="border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-amber-100 text-amber-700">
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                </div>

                <h3 className="text-lg font-bold text-slate-950">Important ATS Limitations</h3>
              </div>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Different companies use different applicant tracking systems and custom workflows.
                A checker provides automated quality assurance, not a guaranteed interview offer.
              </p>

              <ul className="mt-5 space-y-3">
                {[
                  "A score is diagnostic guidance, not an endorsement of candidate quality.",
                  "Human hiring managers review depth of experience and problem-solving ability.",
                  "Avoid keyword stuffing: it flags human readers and harms your credibility.",
                ].map(tip => (
                  <li
                    key={tip}
                    className="flex items-start gap-2.5 text-sm leading-6 text-slate-700"
                  >
                    <AlertTriangle
                      className="mt-1 h-4 w-4 shrink-0 text-amber-600"
                      aria-hidden="true"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* Common Blockers */}
      <section className="border-t border-slate-100 bg-slate-50/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Avoid rejection
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              5 Common Formatting Mistakes That Trigger ATS Rejection
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Over 70% of resumes never reach a human recruiter due to avoidable formatting errors.
              Keep an eye out for these 5 common traps:
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {commonBlockers.map((blocker, idx) => (
              <div key={blocker.title} className={cardClass}>
                <span className="flex h-8 w-8 items-center justify-center bg-rose-100 text-xs font-black text-rose-700">
                  0{idx + 1}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-950">{blocker.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{blocker.text}</p>
              </div>
            ))}

            <div className="flex flex-col justify-between border border-indigo-200 bg-indigo-50/60 p-6 shadow-sm">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                  <CheckCircle2 className="h-4 w-4" /> NextCV Solution
                </span>
                <h3 className="mt-3 text-base font-bold text-slate-950">Guaranteed ATS Compliance</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Our resume templates are engineered specifically to avoid all 5 parsing pitfalls.
                </p>
              </div>
              <Link
                href="/ats-resume-builder"
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-indigo-700 hover:text-indigo-900"
              >
                Build ATS-Friendly Resume <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Job description matching */}
      <section className="border-t border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Tailor your application
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Match Your Resume Against Any Job Description
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Tailoring your resume for each application dramatically improves interview callbacks.
              Paste the vacancy details into the checker to see matching and missing keywords.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Extract role keywords",
                description:
                  "Identify required tools, tech stacks, qualifications, and role keywords in the job post.",
              },
              {
                number: "02",
                title: "Identify keyword gaps",
                description:
                  "Review which high-value skills or tools are missing or understated in your current resume text.",
              },
              {
                number: "03",
                title: "Update experience authentically",
                description:
                  "Incorporate missing skills and keywords naturally into your bullet points where you have real experience.",
              },
            ].map(item => (
              <article key={item.number} className={cardClass}>
                <span className="inline-flex h-10 min-w-10 items-center justify-center bg-indigo-50 px-3 text-sm font-bold text-indigo-700">
                  {item.number}
                </span>

                <h3 className="mt-4 text-base font-bold text-slate-950">{item.title}</h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 border border-indigo-100 bg-slate-50 p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="font-bold text-slate-950">Pair with an ATS-friendly cover letter</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Generate a tailored cover letter that matches the exact keywords of your target job post.
              </p>
            </div>

            <Link
              href="/ai-cover-letter-builder"
              className={`${buttonClass} shrink-0 bg-indigo-600 text-white hover:bg-indigo-700`}
            >
              Generate AI Cover Letter
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Formatting tips and fresher guidance */}
      <section className="border-t border-slate-100 bg-slate-50/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Practical checklist
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              How to Make Your Resume 100% ATS-Friendly (Checklist)
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              Use a clean structure and relevant content to make your resume easy for software
              parsers and human recruiters to evaluate.
            </p>

            <div className="mt-7 space-y-4">
              {formattingTips.map((tip, index) => (
                <article
                  key={tip.title}
                  className="flex gap-4 border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-indigo-50 text-sm font-bold text-indigo-700">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="font-bold text-slate-950">{tip.title}</h3>

                    <p className="mt-1.5 text-sm leading-7 text-slate-600">{tip.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-indigo-100 text-indigo-700">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  India Job Market Advice
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">
                  ATS Resume Tips for Freshers in India
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              College graduates and entry-level applicants can prioritize education, capstone
              projects, internships, technical coursework, and certifications.
            </p>

            <div className="mt-6 space-y-3">
              {[
                {
                  title: "Engineering and IT Freshers",
                  text: "Highlight languages, frameworks, DBMS, academic projects, and live GitHub or deployment links.",
                },
                {
                  title: "Commerce & Non-Technical Graduates",
                  text: "Emphasize accounting tools, financial analysis, Excel proficiency, academic accomplishments, and teamwork.",
                },
                {
                  title: "Certifications & Coursework",
                  text: "List recognized certificates (AWS, Google, Coursera), issuing bodies, and completion credentials.",
                },
              ].map(item => (
                <div key={item.title} className="border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-bold text-slate-950">{item.title}</h3>

                  <p className="mt-1.5 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            <Link
              href="/fresher-resume-format-india"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
            >
              Read the fresher resume guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      {/* Internal links */}
      <section className="border-y border-slate-100 bg-white px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Keep improving
            </span>

            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              ATS-Friendly Resume Templates, Formats & Tools
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Explore format guides, templates, and career resources designed to help you secure
              interviews in India and globally.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guideLinks.map(guide => {
              const Icon = guide.icon;

              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex h-full flex-col border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <div className="flex h-11 w-11 items-center justify-center bg-indigo-50 text-indigo-700 transition group-hover:bg-indigo-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-950 transition group-hover:text-indigo-700">
                    {guide.title}
                  </h3>

                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
                    {guide.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-indigo-700">
                    Explore
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Frequently asked questions
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Frequently Asked Questions About ATS Resume Checkers
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Learn how resume checkers work, interpret your scores, and ensure machine readability
              before applying.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqItems.map(faq => (
              <details
                key={faq.q}
                className="group border border-slate-200 bg-white p-5 shadow-sm transition open:border-indigo-200 open:bg-indigo-50/30 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold leading-6 text-slate-950 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-slate-200 text-lg font-normal text-indigo-700 transition group-open:rotate-45 group-open:border-indigo-200">
                    +
                  </span>
                </summary>

                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="relative mx-auto max-w-7xl overflow-hidden bg-slate-950 px-6 py-12 text-center text-white shadow-xl shadow-slate-950/10 sm:px-10 sm:py-16">
          <div
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 bg-indigo-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 bg-blue-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center border border-white/15 bg-white/10 text-indigo-200">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>

            <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Build an ATS-Compliant Resume?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Use our AI-assisted resume builder to generate a single-column, recruiter-approved ATS
              resume. Pay once starting from ₹49 when downloading your unwatermarked PDF—no recurring
              subscriptions.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/ats-resume-builder"
                aria-label="Build ATS-friendly resume"
                className={`${buttonClass} w-full bg-indigo-500 text-white shadow-lg shadow-indigo-950/20 hover:bg-indigo-400 sm:w-auto`}
              >
                Build ATS Resume Now
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href="/templates"
                className={`${buttonClass} w-full border border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto`}
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
