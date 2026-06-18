import React from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Zap,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export const metadata = {
  title: "Best Resume Builder in India 2026 (Free for Freshers) | NextCV",
  description: "Looking for the best resume builder in India for 2026? NextCV is a free resume maker specifically designed to help Indian freshers pass ATS screening instantly.",
  keywords: ["best resume builder india 2026","free resume maker for freshers","online resume maker for indian freshers","best resume maker in india","fresher resume builder","resume maker for fresher"],
  alternates: {
    canonical: "https://www.nextcv.in/best-resume-builder-india-2026",
  },
};

export const revalidate = 86400;

export default function SEOPage() {
  const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the best resume builder in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NextCV is considered the best resume builder in India because it focuses entirely on ATS-friendly formatting tailored for Indian corporate and MNC standards."
      }
    },
    {
      "@type": "Question",
      "name": "Is NextCV a free resume maker for freshers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! NextCV offers powerful, completely free resume templates that are heavily optimized for freshers looking for their first job."
      }
    },
    {
      "@type": "Question",
      "name": "Why shouldn't I use Canva to build my resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While Canva offers beautiful designs, their resumes often fail Applicant Tracking Systems (ATS) due to complex graphics and non-standard text parsing."
      }
    },
    {
      "@type": "Question",
      "name": "Does a resume builder save time?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. It eliminates the hours spent tweaking margins, aligning text, and fixing formatting issues in Microsoft Word."
      }
    },
    {
      "@type": "Question",
      "name": "Are the templates customizable?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NextCV templates offer professional customization that strictly stays within the boundaries of what is acceptable to ATS algorithms."
      }
    },
    {
      "@type": "Question",
      "name": "Can I download my resume as a PDF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, PDF format is the industry standard for job applications, and NextCV exports your resume as a clean, machine-readable PDF."
      }
    },
    {
      "@type": "Question",
      "name": "Does the builder write my resume for me?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While you must input your details, smart builders like NextCV offer contextual suggestions and keyword tracking to optimize your content."
      }
    },
    {
      "@type": "Question",
      "name": "How do I know if my generated resume is good?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NextCV provides an instant ATS score to verify your resume's strength against targeted job descriptions."
      }
    }
  ]
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white pb-14 pt-28 sm:pb-20 sm:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(224,231,255,0.85),transparent_42%)]" />

          <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
              <Award aria-hidden="true" className="h-4 w-4" />
              Expert Career Guide
            </div>

            <h1 className="mx-auto max-w-3xl text-xl font-bold leading-snug tracking-tight text-slate-900">
              {"The Best Resume Builder in India for Freshers in 2026"}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              {"Looking for the best resume builder in India for 2026? NextCV is a free resume maker specifically designed to help Indian freshers pass ATS screening instantly."}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg sm:w-auto"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Create Free Resume
              </Link>

              <Link
                href="/ats-resume-checker"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 sm:w-auto"
              >
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                Check ATS Score
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-emerald-500"
                />
                Free to start
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-indigo-500"
                />
                Ready in minutes
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-blue-500"
                />
                ATS-friendly formats
              </span>
            </div>
          </div>
        </section>

        {/* Page content */}
        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          {/* Main article */}
          <div className="space-y-8 lg:col-span-8">
            
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-blue-500" />

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Zap aria-hidden="true" className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                {"Why You Need a Dedicated Resume Builder"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Why You Need a Dedicated Resume Builder"}
                </strong>
                . These concepts can help freshers create a clearer,
                ATS-friendly and recruiter-focused resume.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
      
            </div>
          </section>
        
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500" />

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Zap aria-hidden="true" className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                {"Features of the Best Resume Builders"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Features of the Best Resume Builders"}
                </strong>
                . These concepts can help freshers create a clearer,
                ATS-friendly and recruiter-focused resume.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
      
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
          <h3 className="flex items-start gap-2 text-base font-bold leading-snug text-slate-900 sm:text-lg">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
            />

            <span>{"ATS Verification Built-In"}</span>
          </h3>

          <p className="mt-2 pl-7 text-sm leading-7 text-slate-600">
            {"Apply ats verification built-in carefully to improve clarity, ATS readability and the overall presentation of your resume."}
          </p>
        </div>
      
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
          <h3 className="flex items-start gap-2 text-base font-bold leading-snug text-slate-900 sm:text-lg">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
            />

            <span>{"Industry-Specific Templates"}</span>
          </h3>

          <p className="mt-2 pl-7 text-sm leading-7 text-slate-600">
            {"Apply industry-specific templates carefully to improve clarity, ATS readability and the overall presentation of your resume."}
          </p>
        </div>
      
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
          <h3 className="flex items-start gap-2 text-base font-bold leading-snug text-slate-900 sm:text-lg">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
            />

            <span>{"One-Click Formatting"}</span>
          </h3>

          <p className="mt-2 pl-7 text-sm leading-7 text-slate-600">
            {"Apply one-click formatting carefully to improve clarity, ATS readability and the overall presentation of your resume."}
          </p>
        </div>
      
            </div>
          </section>
        
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-blue-500" />

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Zap aria-hidden="true" className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                {"NextCV vs Canva vs Traditional Word"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"NextCV vs Canva vs Traditional Word"}
                </strong>
                . These concepts can help freshers create a clearer,
                ATS-friendly and recruiter-focused resume.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
      
            </div>
          </section>
        
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-emerald-500 to-teal-500" />

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Zap aria-hidden="true" className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                {"The Hidden Costs of 'Free' Resume Makers"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"The Hidden Costs of 'Free' Resume Makers"}
                </strong>
                . These concepts can help freshers create a clearer,
                ATS-friendly and recruiter-focused resume.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
      
            </div>
          </section>
        
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-indigo-500 to-blue-500" />

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Zap aria-hidden="true" className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                {"Frequently Asked Questions"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Frequently Asked Questions"}
                </strong>
                . These concepts can help freshers create a clearer,
                ATS-friendly and recruiter-focused resume.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
      
        </div>
      </section>
    

            
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-indigo-50" />

              <div className="relative z-10 mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </div>

                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="relative z-10 space-y-3">
                
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"What is the best resume builder in India?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"NextCV is considered the best resume builder in India because it focuses entirely on ATS-friendly formatting tailored for Indian corporate and MNC standards."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Is NextCV a free resume maker for freshers?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Yes! NextCV offers powerful, completely free resume templates that are heavily optimized for freshers looking for their first job."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Why shouldn't I use Canva to build my resume?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"While Canva offers beautiful designs, their resumes often fail Applicant Tracking Systems (ATS) due to complex graphics and non-standard text parsing."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Does a resume builder save time?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Absolutely. It eliminates the hours spent tweaking margins, aligning text, and fixing formatting issues in Microsoft Word."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Are the templates customizable?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Yes, NextCV templates offer professional customization that strictly stays within the boundaries of what is acceptable to ATS algorithms."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Can I download my resume as a PDF?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Yes, PDF format is the industry standard for job applications, and NextCV exports your resume as a clean, machine-readable PDF."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Does the builder write my resume for me?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"While you must input your details, smart builders like NextCV offer contextual suggestions and keyword tracking to optimize your content."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"How do I know if my generated resume is good?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"NextCV provides an instant ATS score to verify your resume's strength against targeted job descriptions."}
          </p>
        </article>
      
              </div>
            </section>
            
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-indigo-800 p-5 text-white shadow-lg shadow-indigo-900/15 sm:p-6">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <Zap
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </div>

                  <h2 className="text-lg font-bold leading-snug">
                    Build an ATS-Friendly Resume in Minutes
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-indigo-100">
                    Create a professional resume without worrying about
                    formatting, structure or ATS compatibility.
                  </p>

                  <Link
                    href="/"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-50"
                  >
                    Start Building Now

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </Link>
                </div>
              </div>

              
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
              <BookOpen aria-hidden="true" className="h-4 w-4" />
            </div>

            <h2 className="text-lg font-bold">
              Related Resources
            </h2>
          </div>

          <ul className="space-y-2">
            
              <li>
                <Link
                  href="/"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-800/70 p-3 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                >
                  <span className="min-w-0 capitalize">
                    {"Free Resume Builder"}
                  </span>

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-indigo-300 transition-transform group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              </li>
            
              <li>
                <Link
                  href="/ats-resume-best-practices"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-800/70 p-3 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                >
                  <span className="min-w-0 capitalize">
                    {"Ats Resume Best Practices"}
                  </span>

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-indigo-300 transition-transform group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              </li>
            
          </ul>
        </div>
      
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
