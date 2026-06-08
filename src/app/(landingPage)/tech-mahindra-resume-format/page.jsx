import React from "react";
import Link from "next/link";
import { FileText, Download, Star, Zap, CheckCircle2, ArrowRight, BookOpen, Award, Layout } from "lucide-react";

export const metadata = {
  title: "Tech Mahindra Resume Format for Freshers (2026) | NextCV",
  description: "Download the approved Tech Mahindra resume format. Learn exactly what skills and sections to include to get hired at Tech Mahindra in 2026.",
  keywords: ["tech mahindra resume format","tech mahindra resume format for freshers","resume for tech mahindra","tech mahindra cv format","ats id tech mahindra","tech mahindra fresher resume"],
  alternates: {
    canonical: `https://www.nextcv.in/tech-mahindra-resume-format`,
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
      "name": "What is the standard Tech Mahindra resume format?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is a straightforward, one-page, ATS-optimized document highlighting core programming skills, academics, and relevant projects."
      }
    },
    {
      "@type": "Question",
      "name": "What technical skills does Tech Mahindra look for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Skills in Java, Oracle, Telecom networking basics, Cloud computing, and software testing are very desirable."
      }
    },
    {
      "@type": "Question",
      "name": "Is an objective statement necessary for Tech Mahindra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, a concise 2-line objective statement helps set the tone and immediately highlights your career goals."
      }
    },
    {
      "@type": "Question",
      "name": "Does Tech Mahindra use an ATS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, they use an Applicant Tracking System to efficiently filter out unqualified candidates from massive talent pools."
      }
    },
    {
      "@type": "Question",
      "name": "How do I make my resume stand out for Tech Mahindra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on measurable project outcomes, specific technologies used, and any certifications relevant to IT services or telecom."
      }
    },
    {
      "@type": "Question",
      "name": "Should I include my full postal address?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, just your city and state are required. Full addresses are unnecessary on modern resumes."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use a two-column resume for Tech Mahindra?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is not recommended. Single-column resumes perform much better in ATS parsers used by companies like Tech Mahindra."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I build a Tech Mahindra format resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use NextCV's intelligent builder to generate a perfectly formatted, ATS-compliant resume in minutes."
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
                How to Craft the Perfect Tech Mahindra Resume Format
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                Download the approved Tech Mahindra resume format. Learn exactly what skills and sections to include to get hired at Tech Mahindra in 2026.
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
              Core Values of Tech Mahindra Recruitment
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Core Values of Tech Mahindra Recruitment</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
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
              Structuring Your Resume
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Structuring Your Resume</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Highlighting Telecom and IT Skills
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing highlighting telecom and it skills strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Showcasing Practical Experience
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing showcasing practical experience strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
                <Zap className="w-6 h-6" />
              </span>
              Formatting for the Tech Mahindra ATS
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Formatting for the Tech Mahindra ATS</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
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
              Common Mistakes in IT Services Resumes
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Common Mistakes in IT Services Resumes</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      </div></section>

          <section className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mt-10 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
            <div className="absolute -right-10 -top-10 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <Star className="w-48 h-48" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5 text-slate-900 flex items-center gap-3 relative z-10">
              <span className="bg-emerald-100 text-emerald-600 p-2 rounded-xl">
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
                  What is the standard Tech Mahindra resume format?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  It is a straightforward, one-page, ATS-optimized document highlighting core programming skills, academics, and relevant projects.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  What technical skills does Tech Mahindra look for?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Skills in Java, Oracle, Telecom networking basics, Cloud computing, and software testing are very desirable.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Is an objective statement necessary for Tech Mahindra?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Yes, a concise 2-line objective statement helps set the tone and immediately highlights your career goals.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Does Tech Mahindra use an ATS?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Yes, they use an Applicant Tracking System to efficiently filter out unqualified candidates from massive talent pools.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  How do I make my resume stand out for Tech Mahindra?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Focus on measurable project outcomes, specific technologies used, and any certifications relevant to IT services or telecom.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Should I include my full postal address?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  No, just your city and state are required. Full addresses are unnecessary on modern resumes.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Can I use a two-column resume for Tech Mahindra?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  It is not recommended. Single-column resumes perform much better in ATS parsers used by companies like Tech Mahindra.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Where can I build a Tech Mahindra format resume?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Use NextCV's intelligent builder to generate a perfectly formatted, ATS-compliant resume in minutes.
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
                <Link href="/hcl-resume-format-for-freshers" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">hcl resume format for freshers</span>
                </Link>
              </li>
              <li>
                <Link href="/infosys-resume-format-for-freshers" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">infosys resume format for freshers</span>
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
