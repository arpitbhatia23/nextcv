import React from "react";
import ATSChecker from "@/components/ats-checker/ATSChecker";
import { CheckCircle2, Search, Briefcase } from "lucide-react";

export const metadata = {
  title: "Free ATS Resume Checker for Freshers in India | Check Score Online",
  description:
    "Check your resume ATS score for free. Best ATS checker for freshers in India. optimized for TCS, Infosys, Wipro, and other top MNCs. No login required.",
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
    "ats checker vs resume builder",
    "free alternative to paid ats resume scan",
    "is ats resume checker accurate",
    "ats resume for tcs freshers",
    "ats score required for infosys",
    "how to make resume ats friendly for wipro",
    "ats resume format for hcl technologies",
    "ats check for accenture india",
    "ats resume checker for btech cse",
    "ats resume score for mba freshers",
    "ats friendly resume for mechanical engineer fresher",
    "campus placement resume ats check",
    "resume ats score for 2026 batch",
  ],
};

const ATSCheckerPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/50 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium mb-6 border border-green-100">
            <CheckCircle2 className="w-4 h-4" />
            <span>Updates for 2026 Hiring Season</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Free ATS Resume Checker for <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-blue-600">
              Freshers in India
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            Don't let an algorithm reject your application. Upload your resume
            and get an instant ATS score analysis, tailored for Indian
            recruitment standards (TCS, Infosys, Wipro, etc.).
          </p>

          <ATSChecker />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Company Specifics */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Crack the Code for MNCs
              </h2>
            </div>
            <p className="text-slate-600 mb-4">
              Top Indian companies have specific criteria for screening resumes.
              Our tool checks against common patterns used by:
            </p>
            <ul className="grid grid-cols-2 gap-3 text-slate-700 font-medium">
              {[
                "TCS",
                "Infosys",
                "Wipro",
                "HCL Technologies",
                "Accenture",
                "Tech Mahindra",
              ].map((company, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {company}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-500 mt-6 italic">
              * Note: We are not affiliated with these companies. Scoring is
              based on general industry standards.
            </p>
          </div>

          {/* Student Focused */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Search className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                Why Scores Matter for Freshers?
              </h2>
            </div>
            <p className="text-slate-600 mb-4">
              For campus placements and off-campus drives, ATS scores are
              critical because of the volume of applicants.
            </p>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>B.Tech/CSE:</strong> Highlights project keywords and
                  technical stacks.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>MBA Freshers:</strong> Focuses on leadership and soft
                  skill terminology.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span className="text-slate-700">
                  <strong>Mechanical/Civil:</strong> Ensures core engineering
                  competencies are visible.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Why is my resume not getting shortlisted?",
                a: "It's likely due to low ATS compatibility. If your resume uses complex formatting, graphics, or lacks specific keywords found in the job description, the ATS may reject it before a human sees it.",
              },
              {
                q: "How to increase ATS score of resume?",
                a: "Use standard headings (Experience, Education), standard fonts, and ensure your file is text-readable (not an image). Include relevant keywords from the job description.",
              },
              {
                q: "Is NextCV ATS checker accurate?",
                a: "We simulate the parsing logic used by major ATS platforms to give you a realistic estimate of how well your resume will be read.",
              },
              {
                q: "Is this tool free for freshers?",
                a: "Yes, our ATS resume checker is completely free for freshers and experienced professionals in India.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-slate-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ATSCheckerPage;
