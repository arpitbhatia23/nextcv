import Link from "next/link";
import {
  FileSearch,
  CheckCircle2,
  Zap,
  SearchCheck,
  TextSearch,
  LayoutTemplate,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Instant score analysis",
    description: "Get an immediate ATS compatibility score for your resume.",
    icon: SearchCheck,
  },
  {
    title: "Keyword gap detection",
    description: "Identify important job keywords missing from your resume.",
    icon: TextSearch,
  },
  {
    title: "Formatting check",
    description: "Detect formatting and structure issues that may affect ATS parsing.",
    icon: LayoutTemplate,
  },
  {
    title: "Improvement tips",
    description: "Receive practical suggestions to strengthen your resume.",
    icon: Lightbulb,
  },
];

const ATSFeatureSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Top divider */}
      <div className="absolute left-0 top-0 h-px w-full bg-linear-to-r from-transparent via-slate-300 to-transparent" />

      {/* Background decoration */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading content */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <Zap className="h-4 w-4" />
            <span>New Free Tool</span>
          </div>

          <h2 className="mb-6 text-lg font-bold leading-tight text-slate-900 sm:text-xl">
            Is Your Resume <span className="text-indigo-600">ATS-Friendly?</span>
          </h2>

          <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
            Wondering{" "}
            <strong>
              <Link
                href="/blogs/why-90-of-indian-resumes-fail-ats-in-2025-and-how-to-fix-yours-in-10-minutes"
                className="text-indigo-600 hover:underline"
              >
                why ATS rejects resumes in India
              </Link>
            </strong>{" "}
            and how to fix it? Over 75% of resumes are filtered out by Applicant Tracking Systems
            before a human ever sees them. Our{" "}
            <strong>ATS-friendly resume builder for freshers in India</strong> helps you beat the
            bots with keyword-optimized,{" "}
            <strong>professional resume formats for Indian freshers in 2026</strong>. Get your
            resume ready for top companies with an{" "}
            <strong>
              <Link
                href="/blogs/best-ai-resume-builder-free-online-the-complete-resume-and-cv-guide-for-job-seekers-2026"
                className="text-indigo-600 hover:underline"
              >
                AI-powered resume builder for Indian fresh graduates
              </Link>
            </strong>
            .
          </p>
        </div>

        {/* Feature cards */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(feature => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-xs font-semibold text-slate-900 sm:text-sm">{feature.title}</h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA section */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
            <div>
              <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                <CheckCircle2 className="h-5 w-5 text-green-500" />

                <p className="text-xs font-semibold text-slate-900 sm:text-sm">
                  Free ATS resume analysis
                </p>
              </div>

              <p className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                Upload your resume and receive actionable suggestions in seconds. No signup
                required.
              </p>
            </div>

            <Link
              href="/ats-resume-checker"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-indigo-600 p-2 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-indigo-200 sm:px-8"
            >
              Check My Resume Score
              <FileSearch className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Bottom trust points */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500 sm:text-sm">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            No signup required
          </span>

          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Instant analysis
          </span>

          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Free to use
          </span>

          <Link
            href="/ats-resume-checker"
            className="flex items-center gap-1 font-medium text-indigo-600 hover:underline"
          >
            Start checking
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ATSFeatureSection;
