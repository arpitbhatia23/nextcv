import React from "react";
import { CheckCircle2, AlertCircle, Briefcase, Zap } from "lucide-react";

const SEOSection = () => {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6">
                Best Resume Format for Freshers in India (2025–2026)
              </h2>
              <p className="text-slate-600 mb-6 text-xs">
                Navigating the competitive Indian job market for 2026 requires more than just a list
                of your degrees. recruiters at top firms like{" "}
                <strong>TCS, Accenture, and LTIMindtree</strong> now use sophisticated Applicant
                Tracking Systems (ATS) that favor specific formats.
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <h3 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  The Ideal Structure
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="font-bold text-indigo-600">01.</span>
                    <strong>Header:</strong> Name, professional email, phone, and LinkedIn.
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-indigo-600">02.</span>
                    <strong>Summary:</strong> 2-3 lines highlighting your top projects or skill
                    sets.
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-indigo-600">03.</span>
                    <strong>Technical Skills:</strong> Role-specific keywords (e.g., React, Java,
                    SQL).
                  </li>
                  <li className="flex gap-2">
                    <span className="font-bold text-indigo-600">04.</span>
                    <strong>Projects:</strong> Detailed breakdown of what you built and the impact.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-4">
                ATS-Friendly Resume Structure Explained
              </h3>
              <p className="text-slate-600 text-xs  mb-4">
                An ATS-friendly resume for India isn't about fancy designs—it's about{" "}
                <strong>readability</strong>. NextCV ensures your resume uses a single-column
                layout, standard fonts, and machine-readable text sections that pass any screening
                tool used by Indian HR teams.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="bg-indigo-900 rounded-3xl p-5 sm:p-10 text-white shadow-xl shadow-indigo-900/20">
              <h3 className="text-sm sm:text-lg font-bold mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                Indian ATS-Friendly Resume Keywords
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold sm:font-bold text-indigo-300 mb-2 uppercase text-xs tracking-widest">
                    Tech Roles
                  </h4>
                  <p className="text-indigo-100 text-xs italic">
                    Java, Spring Boot, React.js, Python, AWS, Docker, Git, Data Structures, Agile.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold sm:font-bold text-indigo-300 mb-2 uppercase text-xs tracking-widest">
                    Non-Tech / Management
                  </h4>
                  <p className="text-indigo-100 text-xs italic">
                    Market Research, Data Analytics, CRM (Salesforce), Project Management, Excel
                    (Macros).
                  </p>
                </div>
                <div className="pt-4 border-t border-indigo-800">
                  <p className="text-xs sm:text-sm text-indigo-200">
                    <strong>Tip:</strong> Always mention "TCS NQT" or specific certifications if you
                    are applying for campus placements.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-red-500" />
                Common Mistakes Freshers Make
              </h3>
              <ul className="space-y-4">
                {[
                  "Using images or logos that ATS cannot read.",
                  "Saving resumes as images (PNG/JPG) instead of text-searchable PDFs.",
                  "Failing to quantify achievements (e.g., 'Improved performance by 20%').",
                  "Using a multi-column layout that confuses tracking software.",
                ].map((mistake, i) => (
                  <li key={i} className="flex gap-3  text-xs sm:text-sm text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    {mistake}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* New SEO Driven Sections */}
        <div className="mt-20 space-y-20">
          {/* Section 1: ATS-Friendly Resume Builder for Indian Companies */}
          <div>
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 mb-6">
              ATS-Friendly Resume Builder for Indian Companies
            </h2>
            <p className="text-slate-600 mb-6 text-xs sm:text-sm">
              NextCV is optimized for the strict Applicant Tracking Systems used by India's top IT
              and consulting firms. Our templates ensure you pass the initial screening at companies
              like <strong>TCS, Infosys, Wipro, HCL, Cognizant, and Capgemini</strong>. We
              automatically format your resume to meet their ATS requirements.
            </p>
          </div>

          {/* Section 2: Resume Templates for Freshers */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-sm sm:text-lg font-bold text-slate-900 mb-6">
              Resume Templates for Freshers
            </h2>
            <p className="text-slate-600 mb-6 text-lg sm:text-sm">
              Whether you are applying for off-campus placements or university drives, our templates
              are categorized by degree to highlight what matters most:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {["BTech", "BCA", "MCA", "MBA", "BCom", "MCom"].map(degree => (
                <div
                  key={degree}
                  className="flex items-center gap-2 p-2 bg-indigo-50/50 rounded-lg border border-indigo-100 text-indigo-700 "
                >
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  {degree} Resume Format
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 & 4 Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 mb-4">
                Why Recruiters Reject Resumes
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3 text-xs sm:text-sm text-slate-700">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                  <span>
                    <strong>ATS Parsing Issues:</strong> Using complex layouts that the system can't
                    read.
                  </span>
                </li>
                <li className="flex gap-3 text-xs sm:text-sm text-slate-700">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                  <span>
                    <strong>Formatting Mistakes:</strong> Incorrect margins, illegible fonts, or
                    missing contact info.
                  </span>
                </li>
                <li className="flex gap-3 text-xs sm:text-sm text-slate-700">
                  <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                  <span>
                    <strong>Keyword Mismatch:</strong> Failing to include exact skills mentioned in
                    the job description.
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 mb-4">
                Resume Formats for Indian Hiring
              </h2>
              <p className="text-slate-600 mb-4 text-xs sm:text-sm">
                Indian recruiters prefer clean, readable documents. NextCV follows the strict
                guidelines required for maximum ATS compatibility:
              </p>
              <ul className="space-y-3">
                {[
                  "Single-column layout",
                  "100% ATS-friendly text",
                  "No complex tables",
                  "No graphics or icons",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center bg-indigo-50 rounded-xl p-4 sm:p-12 border border-indigo-100">
          <Zap className="w-5 sm:w-10 h-5 sm:h-10 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            How NextCV Helps Freshers in India
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto mb-8 text-xs sm:text-sm">
            We’ve analyzed thousands of job descriptions from top Indian companies to build
            <strong> the best resume maker for campus placements</strong>. Get hired faster with
            re-optimized templates for the 2026 hiring season.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white rounded-full text-xs sm:text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              TCS Resume Builder
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-xs sm:text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              Accenture Friendly
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-xs sm:text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              LTI Mindtree Format
            </span>
            <span className="px-4 py-2 bg-white rounded-full text-xs sm:text-sm font-medium text-slate-700 shadow-sm border border-slate-200">
              NQT Prepared
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOSection;
