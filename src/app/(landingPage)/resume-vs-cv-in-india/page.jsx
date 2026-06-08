import React from "react";
import Link from "next/link";
import { FileText, Download, Star, Zap, CheckCircle2, ArrowRight, BookOpen, Award, Layout } from "lucide-react";

export const metadata = {
  title: "Resume vs CV in India: What's the Difference in 2026? | NextCV",
  description: "What is the difference between a CV and a Resume in India? Discover which document you should submit for Indian corporate job applications in 2026.",
  keywords: ["cv vs resume in india","is cv and resume same in india","difference between cv and resume in india","resume vs cv in india job applications","india cv and resume used interchangeably","cv aur resume mein kya difference hai"],
  alternates: {
    canonical: `https://www.nextcv.in/resume-vs-cv-in-india`,
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
      "name": "Is a CV and resume the same in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In casual conversation, yes. However, technically a resume is a brief 1-2 page summary of skills, while a CV is a detailed, multi-page academic and professional record."
      }
    },
    {
      "@type": "Question",
      "name": "Should freshers use a CV or a resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Freshers applying for corporate jobs (like IT, Finance, or Marketing) should strictly use a 1-page resume."
      }
    },
    {
      "@type": "Question",
      "name": "When should I submit a CV?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Submit a CV when applying for academic positions, scientific research, fellowships, or medical roles where detailed publication history is required."
      }
    },
    {
      "@type": "Question",
      "name": "What does CV stand for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CV stands for 'Curriculum Vitae', which is Latin for 'course of life'."
      }
    },
    {
      "@type": "Question",
      "name": "Why do Indian recruiters ask for a CV when they mean a resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a cultural quirk. In India, 'Send me your CV' usually just means 'Send me your resume'. Always send a 1-2 page document unless instructed otherwise."
      }
    },
    {
      "@type": "Question",
      "name": "Does NextCV build resumes or CVs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NextCV primarily builds highly optimized, concise resumes perfect for the Indian corporate and IT sectors."
      }
    },
    {
      "@type": "Question",
      "name": "Are ATS systems better at reading resumes or CVs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "ATS systems can read both, but they are configured to look for specific keywords and concise skills commonly found in standard resumes."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Biodata?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Biodata is an outdated format focusing heavily on personal details (religion, marital status, physical traits) and should not be used for modern corporate jobs."
      }
    }
  ]
};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-indigo-200">
        
        {/* Dynamic Hero Section with Gradients & Illustration placeholder */}
        <section className="relative bg-white pt-32 pb-24 overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white opacity-80"></div>
          
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 text-sm font-bold mb-6 border border-indigo-100 shadow-sm">
                <Award className="w-4 h-4" />
                Expert Career Guide
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                Resume vs CV in India: Understanding the Key Differences
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                What is the difference between a CV and a Resume in India? Discover which document you should submit for Indian corporate job applications in 2026.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold py-4 px-8 rounded-2xl text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-600/40 hover:-translate-y-0.5 transition-all"
                >
                  <Download className="w-5 h-5" />
                  Create Free Resume
                </Link>
              </div>
            </div>
            
            {/* Hero Graphic / Abstract UI element */}
            <div className="hidden lg:flex relative justify-center items-center">
              <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-indigo-200/50 via-purple-200/50 to-emerald-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
              <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-white/50 backdrop-blur-sm w-full max-w-md transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Layout className="text-indigo-600 w-6 h-6" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-slate-200 rounded-full mb-2"></div>
                    <div className="h-3 w-24 bg-slate-100 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-slate-100 rounded-full"></div>
                  <div className="h-4 w-5/6 bg-slate-100 rounded-full"></div>
                  <div className="h-4 w-4/6 bg-slate-100 rounded-full"></div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-500"></div>
                    <div className="w-8 h-8 rounded-full bg-emerald-500 -ml-4"></div>
                  </div>
                  <div className="h-8 w-24 bg-indigo-50 rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid lg:grid-cols-12 gap-12">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-a:text-indigo-600">
              {/* Generated Outline Content */}
              
          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              Are CV and Resume Used Interchangeably in India?
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Are CV and Resume Used Interchangeably in India?</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              The Definition of a Resume
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>The Definition of a Resume</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Length, Focus, and Purpose
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing length, focus, and purpose strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              The Definition of a CV (Curriculum Vitae)
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>The Definition of a CV (Curriculum Vitae)</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Detailed Academic and Research Focus
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing detailed academic and research focus strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              When to Use a Resume in India
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>When to Use a Resume in India</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Corporate Roles (IT, MNCs, Startups)
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing corporate roles (it, mncs, startups) strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              When to Use a CV in India
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>When to Use a CV in India</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Academia, Fellowships, and Research
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing academia, fellowships, and research strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Frequently Asked Questions</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      </div></section>

            </div>

            {/* FAQs */}
            <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-0"></div>
              <h2 className="text-3xl font-extrabold mb-8 text-slate-900 relative z-10 flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 relative z-10">
                
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Is a CV and resume the same in India?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  In casual conversation, yes. However, technically a resume is a brief 1-2 page summary of skills, while a CV is a detailed, multi-page academic and professional record.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Should freshers use a CV or a resume?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Freshers applying for corporate jobs (like IT, Finance, or Marketing) should strictly use a 1-page resume.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  When should I submit a CV?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Submit a CV when applying for academic positions, scientific research, fellowships, or medical roles where detailed publication history is required.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  What does CV stand for?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  CV stands for 'Curriculum Vitae', which is Latin for 'course of life'.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Why do Indian recruiters ask for a CV when they mean a resume?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  It is a cultural quirk. In India, 'Send me your CV' usually just means 'Send me your resume'. Always send a 1-2 page document unless instructed otherwise.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Does NextCV build resumes or CVs?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  NextCV primarily builds highly optimized, concise resumes perfect for the Indian corporate and IT sectors.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Are ATS systems better at reading resumes or CVs?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  ATS systems can read both, but they are configured to look for specific keywords and concise skills commonly found in standard resumes.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  What is a Biodata?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  A Biodata is an outdated format focusing heavily on personal details (religion, marital status, physical traits) and should not be used for modern corporate jobs.
                </p>
              </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-8">
              {/* Sidebar CTA */}
              <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-3xl p-8 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3">
                  <Zap className="w-48 h-48" />
                </div>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Build an ATS-Friendly Resume in 5 Mins</h3>
                <p className="text-indigo-100 mb-6 text-sm leading-relaxed relative z-10">
                  Stop worrying about formatting. Use our AI builder to automatically pass HR screening and get hired faster.
                </p>
                <Link 
                  href="/"
                  className="block w-full text-center bg-white text-indigo-700 font-bold py-4 rounded-xl hover:bg-indigo-50 transition-colors shadow-sm relative z-10"
                >
                  Start Building Now
                </Link>
              </div>

              {/* Internal Links Sidebar */}
              
          <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl mt-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 relative z-10">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              Related Resources
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 relative z-10">
              <li>
                <Link href="/" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">Home</span>
                </Link>
              </li>
              <li>
                <Link href="/indian-resume-format" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">indian resume format</span>
                </Link>
              </li>
            </ul>
          </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
