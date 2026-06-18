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
  title: "7 Common ATS Resume Mistakes & How to Fix Them | NextCV",
  description: "Avoid these common ATS resume mistakes that lead to automatic rejections. Learn how to fix formatting, keywords, and layout issues.",
  keywords: ["common ats resume mistakes","common ats resume mistakes to avoid","common mistakes in ats resumes","ats resume rejection rate","ats formatting mistakes","common ats resume mistakes and fixes"],
  alternates: {
    canonical: "https://www.nextcv.in/common-ats-resume-mistakes",
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
      "name": "What are the most common ATS resume mistakes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The most common mistakes are using graphics, complex layouts, incorrect file formats, and failing to include job-specific keywords."
      }
    },
    {
      "@type": "Question",
      "name": "Why did the ATS reject my resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It likely rejected it because the parser couldn't read your formatting, or your resume lacked the necessary keywords to meet the minimum score."
      }
    },
    {
      "@type": "Question",
      "name": "Are Canva resumes ATS friendly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most Canva resumes are highly graphic and use complex layouts, making them very unfriendly to Applicant Tracking Systems."
      }
    },
    {
      "@type": "Question",
      "name": "Is it a mistake to use a 2-page resume for ATS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For freshers, a 2-page resume is a mistake as human recruiters prefer brevity, though the ATS itself can parse multiple pages."
      }
    },
    {
      "@type": "Question",
      "name": "Does spelling matter to an ATS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! An ATS cannot recognize misspelled keywords, meaning you will lose credit for that skill entirely."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use abbreviations on my resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is best to spell out the term first and put the abbreviation in parentheses, like 'Search Engine Optimization (SEO)'."
      }
    },
    {
      "@type": "Question",
      "name": "How do tables affect ATS parsing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tables often cause the ATS to read text vertically instead of horizontally, completely scrambling your work experience and skills."
      }
    },
    {
      "@type": "Question",
      "name": "How can I fix my ATS resume mistakes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Switch to a clean, text-based single-column template from NextCV and align your skills with the target job description."
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
              {"7 Common ATS Resume Mistakes Destroying Your Chances"}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              {"Avoid these common ATS resume mistakes that lead to automatic rejections. Learn how to fix formatting, keywords, and layout issues."}
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
                {"Why Good Candidates Get Rejected by ATS"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Why Good Candidates Get Rejected by ATS"}
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
                {"Mistake #1: Using Complex, 'Creative' Templates"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Mistake #1: Using Complex, 'Creative' Templates"}
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
                {"Mistake #2: Saving in the Wrong File Format"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Mistake #2: Saving in the Wrong File Format"}
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
                {"Mistake #3: Ignoring the Exact Job Keywords"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Mistake #3: Ignoring the Exact Job Keywords"}
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
                {"Mistake #4: Using Unconventional Section Headings"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Mistake #4: Using Unconventional Section Headings"}
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
                {"Mistake #5: Burying Information in Headers/Footers"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Mistake #5: Burying Information in Headers/Footers"}
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
                {"Mistake #6: Using Tables and Columns"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Mistake #6: Using Tables and Columns"}
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
                {"Mistake #7: Spelling Errors and Typos"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"Mistake #7: Spelling Errors and Typos"}
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
                {"How NextCV Prevents These Mistakes"}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  {"How NextCV Prevents These Mistakes"}
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

            <span>{"What are the most common ATS resume mistakes?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"The most common mistakes are using graphics, complex layouts, incorrect file formats, and failing to include job-specific keywords."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Why did the ATS reject my resume?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"It likely rejected it because the parser couldn't read your formatting, or your resume lacked the necessary keywords to meet the minimum score."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Are Canva resumes ATS friendly?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Most Canva resumes are highly graphic and use complex layouts, making them very unfriendly to Applicant Tracking Systems."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Is it a mistake to use a 2-page resume for ATS?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"For freshers, a 2-page resume is a mistake as human recruiters prefer brevity, though the ATS itself can parse multiple pages."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Does spelling matter to an ATS?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Yes! An ATS cannot recognize misspelled keywords, meaning you will lose credit for that skill entirely."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"Can I use abbreviations on my resume?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"It is best to spell out the term first and put the abbreviation in parentheses, like 'Search Engine Optimization (SEO)'."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"How do tables affect ATS parsing?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Tables often cause the ATS to read text vertically instead of horizontally, completely scrambling your work experience and skills."}
          </p>
        </article>
      
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>{"How can I fix my ATS resume mistakes?"}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            {"Switch to a clean, text-based single-column template from NextCV and align your skills with the target job description."}
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
            
              <li>
                <Link
                  href="/ats-friendly-resume-checklist"
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-800/70 p-3 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                >
                  <span className="min-w-0 capitalize">
                    {"Ats Friendly Resume Checklist"}
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
