import React from "react";
import Link from "next/link";
import { FileText, Download, Star, Zap, CheckCircle2, ArrowRight, BookOpen, Award, Layout } from "lucide-react";

export const metadata = {
  title: "ATS Resume Best Practices 2026: Get Past the Bots | NextCV",
  description: "Learn the top ATS resume best practices for 2026. Discover how to format, optimize, and structure your resume to beat Applicant Tracking Systems in India.",
  keywords: ["ats resume best practices 2026","ats resume optimization 2026","ats friendly resume guidelines","best practices ats friendly resume 2026","resume ats best practices","ats compatible resume best practices"],
  alternates: {
    canonical: `https://www.nextcv.in/ats-resume-best-practices`,
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
      "name": "What are ATS resume best practices in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main best practices are using standard fonts, simple layouts without graphics, exact keyword matching from the job description, and saving the document as a PDF."
      }
    },
    {
      "@type": "Question",
      "name": "Why do companies use ATS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Companies use ATS to manage high volumes of applications efficiently by automatically parsing and scoring resumes based on keyword relevance."
      }
    },
    {
      "@type": "Question",
      "name": "Should I use PDF or Word for ATS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A PDF is generally preferred as it preserves your formatting, but only if the ATS can parse PDFs. NextCV's ATS-friendly PDFs are fully parsable."
      }
    },
    {
      "@type": "Question",
      "name": "How important are keywords in an ATS resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Extremely important. If your resume lacks the exact keywords or technical skills required for the role, the ATS will likely reject it."
      }
    },
    {
      "@type": "Question",
      "name": "Can ATS read columns?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most modern ATS can read columns, but it's risky. A single-column layout is the safest and most reliable format for ATS."
      }
    },
    {
      "@type": "Question",
      "name": "Are templates with graphics ATS friendly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Graphics, charts, and icons confuse the ATS parser and can result in critical information being dropped."
      }
    },
    {
      "@type": "Question",
      "name": "Does font size matter for ATS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Stick to standard sizes (10-12 points) to ensure readability for both the ATS and the human recruiter."
      }
    },
    {
      "@type": "Question",
      "name": "How can I check if my resume is ATS friendly?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can use NextCV's built-in ATS resume checker to scan your resume for parsability and keyword optimization."
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
              <h1 className="text-sm sm:text-lg font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-[1.1]">
                Ultimate ATS Resume Best Practices for 2026
              </h1>
              <p className="text-sm sm:text-base text-slate-600 mb-10 leading-relaxed max-w-2xl">
                Learn the top ATS resume best practices for 2026. Discover how to format, optimize, and structure your resume to beat Applicant Tracking Systems in India.
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
            <h2 className="text-lg sm:text-xl  mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              What Are Applicant Tracking Systems (ATS)?
            </h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed relative z-10">
              Explore the core principles of <strong>What Are Applicant Tracking Systems (ATS)?</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-lg sm:text-xl  mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              Why You Need an ATS-Optimized Resume in 2026
            </h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed relative z-10">
              Explore the core principles of <strong>Why You Need an ATS-Optimized Resume in 2026</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-lg sm:text-xl  mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              Top 7 ATS Resume Best Practices
            </h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed relative z-10">
              Explore the core principles of <strong>Top 7 ATS Resume Best Practices</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  1. Use Standard Section Headings
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 1. use standard section headings strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  2. Optimize for Relevant Keywords
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 2. optimize for relevant keywords strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  3. Keep the Formatting Clean and Simple
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 3. keep the formatting clean and simple strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  4. Choose an ATS-Friendly Font
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 4. choose an ats-friendly font strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  5. Save and Submit as a PDF
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 5. save and submit as a pdf strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  6. Avoid Tables, Headers, and Footers
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 6. avoid tables, headers, and footers strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-13 sm:-left-15 top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-lg font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  7. Tailor Your Resume for Every Application
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 7. tailor your resume for every application strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-lg sm:text-xl  mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              How NextCV Can Automate Your ATS Optimization
            </h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed relative z-10">
              Explore the core principles of <strong>How NextCV Can Automate Your ATS Optimization</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-lg sm:text-xl  mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-indigo-100 text-indigo-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 mb-6 text-sm leading-relaxed relative z-10">
              Explore the core principles of <strong>Frequently Asked Questions</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      </div></section>

            </div>

            {/* FAQs */}
            <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-16 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full z-0"></div>
              <h2 className="text-lg  mb-8 text-slate-900 relative z-10 flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
                  <FileText className="w-6 h-6" />
                </div>
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 relative z-10">
                
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  What are ATS resume best practices in 2026?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  The main best practices are using standard fonts, simple layouts without graphics, exact keyword matching from the job description, and saving the document as a PDF.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  Why do companies use ATS?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Companies use ATS to manage high volumes of applications efficiently by automatically parsing and scoring resumes based on keyword relevance.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  Should I use PDF or Word for ATS?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  A PDF is generally preferred as it preserves your formatting, but only if the ATS can parse PDFs. NextCV's ATS-friendly PDFs are fully parsable.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  How important are keywords in an ATS resume?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Extremely important. If your resume lacks the exact keywords or technical skills required for the role, the ATS will likely reject it.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  Can ATS read columns?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Most modern ATS can read columns, but it's risky. A single-column layout is the safest and most reliable format for ATS.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  Are templates with graphics ATS friendly?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  No. Graphics, charts, and icons confuse the ATS parser and can result in critical information being dropped.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  Does font size matter for ATS?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Yes. Stick to standard sizes (10-12 points) to ensure readability for both the ATS and the human recruiter.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-lg leading-none">Q.</span>
                  How can I check if my resume is ATS friendly?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  You can use NextCV's built-in ATS resume checker to scan your resume for parsability and keyword optimization.
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
                <h3 className="text-lg font-bold mb-4 relative z-10">Build an ATS-Friendly Resume in 5 Mins</h3>
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
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              Related Resources
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 relative z-10">
              <li>
                <Link href="/ats-friendly-resume-meaning" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">ats friendly resume meaning</span>
                </Link>
              </li>
              <li>
                <Link href="/common-ats-resume-mistakes" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">common ats resume mistakes</span>
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
