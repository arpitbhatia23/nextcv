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
} from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import ATSChecker from "@/shared/components/ats-checker/ATSChecker";

const pageTitle = "Free ATS Resume Checker & Score Checker | NextCV";
const pageDescription =
  "Check your resume with NextCV's free ATS resume checker. Review formatting, resume sections, and relevant job-description keywords before applying.";
const pageUrl = "https://www.nextcv.in/ats-resume-checker";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "ATS resume checker",
    "free ATS resume checker",
    "resume ATS checker",
    "resume ATS score checker",
    "ATS friendly resume checker",
    "resume compatibility checker",
    "ATS resume checker with job description",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.nextcv.in/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "NextCV Free ATS Resume Checker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: ["https://www.nextcv.in/opengraph-image.png"],
  },
};

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
    a: "An ATS resume checker reviews aspects of your resume such as text readability, section structure, formatting, and, where supported, keyword alignment with a job description. It helps identify potential issues before applying.",
  },
  {
    q: "How can I check my ATS resume score for free?",
    a: "Upload your resume to a checker that offers a free scan and review its feedback. NextCV's ATS checker scan is free to use. Interpret any score according to the checks performed by the tool.",
  },
  {
    q: "What does the NextCV ATS resume checker evaluate?",
    a: "The checker is designed to review resume text readability, standard sections, contact details, content clarity, and job-description keyword alignment where supported. Review the results shown for your file.",
  },
  {
    q: "Can I check my resume against a job description?",
    a: "If job-description matching is available in the checker, provide the job post alongside your resume to review relevant skills and requirements that appear to match or may be missing. Only add details that accurately represent your background.",
  },
  {
    q: "Is a 90% ATS score good?",
    a: "There is no universal ATS score standard used by every employer or checker. Interpret a score using the tool's scoring method and review the underlying feedback rather than relying on the number alone.",
  },
  {
    q: "Is PDF or DOCX better for an ATS resume?",
    a: "Both text-based PDFs and DOCX files can be suitable. Follow the employer's file-format instructions and check that your resume text can be extracted in a sensible reading order.",
  },
  {
    q: "Does a high ATS score guarantee an interview?",
    a: "No. A checker can identify potential formatting or content issues, but employers also consider qualifications, experience, application requirements, and recruiter judgment. No score guarantees an interview.",
  },
  {
    q: "Is the NextCV ATS resume checker free?",
    a: "NextCV's ATS checker scan and resume builder preview are free to use. Premium resume template exports have one-time payment options ranging from ₹49 to ₹399, with no recurring monthly subscription.",
  },
];

const guideLinks = [
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
    description: "Explore clean resume layouts with recognizable sections and readable formatting.",
    href: "/templates",
    icon: FileText,
  },
  {
    title: "Resume Examples by Industry",
    description:
      "Explore resume examples for software, data, marketing, operations, and other career paths.",
    href: "/examples",
    icon: ListChecks,
  },
  {
    title: "Career & Interview Guides",
    description: "Find practical resources for interviews, cover letters, and career development.",
    href: "/career",
    icon: BookOpen,
  },
];

const formattingTips = [
  {
    title: "Use a clean, readable layout",
    description:
      "A simple layout makes your information easier to follow. Check that columns, tables, text boxes, and decorative elements do not disrupt the reading order.",
  },
  {
    title: "Choose standard section headings",
    description:
      "Use familiar labels such as Work Experience, Technical Skills, Projects, and Education rather than overly creative section names.",
  },
  {
    title: "Match your resume to the role",
    description:
      "Use relevant terms from the job description when they accurately describe your skills, projects, qualifications, or experience. Avoid keyword stuffing.",
  },
  {
    title: "Write specific bullet points",
    description:
      "Explain your contribution and its outcome. Include numbers or measurable results only when they are accurate and can be substantiated.",
  },
];

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
      name: "ATS Resume Checker",
      item: pageUrl,
    },
  ],
};

const cardClass =
  " border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md";

const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2  px-6 py-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2";

export default function ATSCheckerPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Script
        id="ats-checker-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, breadcrumbSchema]),
        }}
      />

      {/* Background accents */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-[15%] h-96 w-96  bg-indigo-100/70 blur-3xl" />
        <div className="absolute -right-32 top-80 h-96 w-96  bg-blue-100/60 blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2  border border-indigo-100 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700 sm:text-sm">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Free resume scan · Practical feedback
            </div>

            <h1 className="mt-6 text-3xl  font-display  leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Free ATS Resume Checker & Resume Score Checker
            </h1>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Check your resume before applying with NextCV&apos;s free ATS resume checker. Review
              text readability, resume sections, contact details, and formatting issues. Where
              job-description matching is supported, identify relevant keywords that may need
              attention.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-slate-500 sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                PDF and DOCX support, as available
              </span>
              <span aria-hidden="true" className="hidden text-slate-300 sm:inline">
                ·
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                No guaranteed ATS outcomes
              </span>
            </div>
          </div>

          {/* Keep the existing checker component and give its surrounding area a rounded container. */}
          <div className="mx-auto mt-10 max-w-5xl  border border-slate-200 bg-white p-3 shadow-xl shadow-indigo-950/5 sm:mt-12 sm:p-6 lg:p-8">
            <div className="mb-4 flex flex-col gap-2 border-b border-slate-100 px-2 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-950 sm:text-xl">Check your resume</h2>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Upload your file and follow the checker&apos;s instructions.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-1.5  bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                Free scan
              </span>
            </div>
            <ATSChecker />
          </div>

          <p className="mt-5 text-center text-xs leading-5 text-slate-500">
            A checker provides guidance, not an official employer score or an interview guarantee.
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
              What Does an ATS Resume Checker Check?
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Use resume checker feedback to spot potential readability, structure, and content
              issues before submitting your application. The exact checks depend on the features
              available in the tool.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationPillars.map(pillar => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className={cardClass}>
                  <div className="flex h-11 w-11 items-center justify-center  border border-indigo-100 bg-indigo-50 text-indigo-700">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-slate-950">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{pillar.description}</p>
                </article>
              );
            })}

            <article className="flex flex-col  bg-slate-950 p-6 text-white shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center  bg-white/10 text-indigo-300">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-base font-bold">Turn Feedback into Improvements</h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-slate-300">
                Review the feedback, improve unclear sections, strengthen your bullet points, and
                make sure your resume reflects the role&apos;s genuine requirements.
              </p>
              <Link
                href="/templates"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition hover:text-white"
              >
                Browse resume templates
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* Score explanation */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Understand the results
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              What Your Resume ATS Score Means
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              An ATS score is a diagnostic indicator, not a universal employer rating. Interpret it
              alongside the specific feedback provided by your resume checker.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className=" border border-emerald-200 bg-emerald-50/60 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center  bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">
                  What a Strong Result Can Indicate
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                A positive result may indicate readable text, recognizable section headings,
                accessible contact details, and relevant content for the role you are targeting.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Text is readable and appears in a sensible order.",
                  "Sections such as Education, Skills, and Experience are clear.",
                  "Relevant skills appear naturally where they apply.",
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

            <article className=" border border-amber-200 bg-amber-50/60 p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center  bg-amber-100 text-amber-700">
                  <AlertTriangle className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-slate-950">Important Limitations</h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Employers use different applicant tracking systems and recruitment workflows. A
                general-purpose checker cannot reproduce every employer&apos;s configuration or
                predict a hiring decision.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "A score is guidance, not a hiring endorsement.",
                  "Recruiters assess qualifications and relevant experience.",
                  "Keyword stuffing can make a resume less useful to people.",
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

      {/* Job description matching */}
      <section className="border-y border-slate-100 bg-slate-50/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Tailor your application
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Check Your Resume Against a Job Description
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              A job-specific resume review can help you assess how your skills and experience relate
              to a vacancy. Use this workflow only where job-description matching is supported by
              the checker.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Review required skills",
                description:
                  "Identify the tools, qualifications, and role requirements listed in the job post.",
              },
              {
                number: "02",
                title: "Find possible gaps",
                description:
                  "Review relevant terms that may be missing or unclear, if matching is supported.",
              },
              {
                number: "03",
                title: "Make accurate updates",
                description:
                  "Add relevant details only when they reflect your real skills, projects, or experience.",
              },
            ].map(item => (
              <article key={item.number} className={cardClass}>
                <span className="inline-flex h-10 min-w-10 items-center justify-center  bg-indigo-50 px-3 text-sm font-bold text-indigo-700">
                  {item.number}
                </span>
                <h3 className="mt-4 text-base font-bold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4  border border-indigo-100 bg-white p-6 sm:flex-row sm:items-center sm:p-7">
            <div>
              <h3 className="font-bold text-slate-950">Need a cleaner resume layout?</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Explore resume templates with clear, readable section structures.
              </p>
            </div>
            <Link
              href="/templates"
              className={`${buttonClass} shrink-0 bg-indigo-600 text-white hover:bg-indigo-700`}
            >
              View templates
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Formatting tips and fresher guidance */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Practical checklist
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              How to Make Your Resume ATS-Friendly
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Use a clear structure and relevant content to make your resume easier for software and
              people to review. Always follow the employer&apos;s application instructions.
            </p>

            <div className="mt-7 space-y-4">
              {formattingTips.map((tip, index) => (
                <article
                  key={tip.title}
                  className="flex gap-4  border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center  bg-indigo-50 text-sm font-bold text-indigo-700">
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

          <aside className=" border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center  bg-indigo-100 text-indigo-700">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  India-specific advice
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-950 sm:text-2xl">
                  ATS Resume Tips for Freshers in India
                </h2>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-600">
              Students and recent graduates can focus on education, projects, internships,
              certifications, and skills relevant to the role. You do not need to invent work
              experience to create a useful entry-level resume.
            </p>

            <div className="mt-6 space-y-3">
              {[
                {
                  title: "Engineering and IT",
                  text: "Highlight relevant languages, frameworks, databases, projects, and GitHub or live-demo links.",
                },
                {
                  title: "Business and non-technical roles",
                  text: "Describe relevant coursework, responsibilities, teamwork, tools, and outcomes where you have evidence.",
                },
                {
                  title: "Certifications",
                  text: "Include relevant course names, issuing institutions, and completion dates where useful.",
                },
              ].map(item => (
                <div key={item.title} className=" border border-slate-200 bg-white p-4">
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
      <section className="border-y border-slate-100 bg-slate-50/70 px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-700">
              Keep improving
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              ATS-Friendly Resume Templates, Formats & Examples
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Explore resume format guides, templates, and examples for different career stages and
              job applications in India.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guideLinks.map(guide => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group flex h-full flex-col  border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <div className="flex h-11 w-11 items-center justify-center  bg-indigo-50 text-indigo-700 transition group-hover:bg-indigo-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950 transition group-hover:text-indigo-700">
                    {guide.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">
                    {guide.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 border-t border-slate-100 pt-4 text-sm font-semibold text-indigo-700">
                    Read guide
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
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2  border border-indigo-100 bg-indigo-50 px-3.5 py-2 text-xs font-semibold text-indigo-700">
              <HelpCircle className="h-4 w-4" aria-hidden="true" />
              Questions and answers
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
              Frequently Asked Questions About ATS Resume Checkers
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Learn how resume checkers work, interpret results, and improve your application
              without relying on a score alone.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {faqItems.map(faq => (
              <details
                key={faq.q}
                className="group  border border-slate-200 bg-white p-5 shadow-sm transition open:border-indigo-200 open:bg-indigo-50/30 sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold leading-6 text-slate-950 marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 [&::-webkit-details-marker]:hidden">
                  <span>{faq.q}</span>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center  border border-slate-200 text-lg font-normal text-indigo-700 transition group-open:rotate-45 group-open:border-indigo-200">
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
        <div className="relative mx-auto max-w-7xl overflow-hidden  bg-slate-950 px-6 py-12 text-center text-white shadow-xl shadow-slate-950/10 sm:px-10 sm:py-16">
          <div
            className="pointer-events-none absolute -right-16 -top-24 h-64 w-64  bg-indigo-500/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64  bg-blue-500/20 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center  border border-white/15 bg-white/10 text-indigo-200">
              <Sparkles className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-2xl font-extrabold tracking-tight sm:text-4xl">
              Ready to Improve Your Resume?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Review your resume, make focused improvements, and choose a clear template for your
              next application. Premium template exports range from ₹49 to ₹399 as one-time
              payments, with no monthly subscription.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/templates"
                aria-label="Explore ATS-friendly resume templates"
                className={`${buttonClass} w-full bg-indigo-500 text-white shadow-lg shadow-indigo-950/20 hover:bg-indigo-400 sm:w-auto`}
              >
                Explore Resume Templates
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/pricing"
                className={`${buttonClass} w-full border border-white/20 bg-white/5 text-white hover:bg-white/10 sm:w-auto`}
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
