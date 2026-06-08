import React from "react";
import Link from "next/link";
import { FileText, Download, Star, Zap, CheckCircle2, ArrowRight, BookOpen, Award, Layout } from "lucide-react";

export const metadata = {
  title: "Best Resume Format in India 2026 (Free Templates & Examples)",
  description: "Discover the latest resume format for India in 2026. Download professional, standard, and ATS-friendly templates used by top Indian MNCs.",
  keywords: ["resume format india 2026","best resume format india 2026","professional resume format india","standard resume format india 2026","latest resume format 2026 india","resume format in india"],
  alternates: {
    canonical: `https://www.nextcv.in/resume-format-india`,
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
      "name": "What is the standard resume format in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The standard is a reverse-chronological, ATS-friendly format emphasizing technical skills, education, and relevant experience, avoiding outdated 'biodata' elements."
      }
    },
    {
      "@type": "Question",
      "name": "How many pages should an Indian resume be?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For freshers, strictly 1 page. For professionals with 5+ years of experience, a 2-page resume is acceptable."
      }
    },
    {
      "@type": "Question",
      "name": "Should I include my marital status on an Indian resume?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. In modern Indian corporate culture, personal details like marital status, religion, and father's name are no longer required."
      }
    },
    {
      "@type": "Question",
      "name": "Is it mandatory to put a photo on a resume in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, unless explicitly requested by the employer (e.g., hospitality, aviation), photos should be omitted to maintain ATS compatibility."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between a CV and a Resume in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "In India, the terms are often used interchangeably, though a CV traditionally refers to a longer academic document, while a resume is a concise professional summary."
      }
    },
    {
      "@type": "Question",
      "name": "Should I add a declaration at the end?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, adding a declaration at the bottom of the resume is an outdated practice and wastes valuable space."
      }
    },
    {
      "@type": "Question",
      "name": "What fonts are accepted in India?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Professional, clean fonts like Arial, Calibri, Roboto, or Times New Roman are the standard in India."
      }
    },
    {
      "@type": "Question",
      "name": "How can I create an Indian resume format?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Use NextCV's intelligent resume builder to automatically format your details into an industry-standard Indian template."
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
                The Standard Resume Format in India for 2026
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                Discover the latest resume format for India in 2026. Download professional, standard, and ATS-friendly templates used by top Indian MNCs.
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
              What Makes the Indian Job Market Unique?
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>What Makes the Indian Job Market Unique?</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
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
              The Evolution of the Indian Resume Format
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>The Evolution of the Indian Resume Format</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  Moving Away from the 'Biodata'
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing moving away from the 'biodata' strategically improves formatting and boosts ATS parsability for this section.
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
              Standard Sections in an Indian Resume
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Standard Sections in an Indian Resume</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
            </p>
            <div className="pl-4 sm:pl-12 border-l border-slate-100 relative z-10 space-y-6">
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  1. Contact Info & LinkedIn
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 1. contact info & linkedin strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  2. Professional Summary
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 2. professional summary strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  3. Core Competencies
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 3. core competencies strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  4. Experience / Projects
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 4. experience / projects strategically improves formatting and boosts ATS parsability for this section.
                </p>
              </div>
      
              <div className="relative">
                <div className="absolute -left-[3.25rem] sm:-left-[3.75rem] top-1 bg-white border-2 border-slate-200 rounded-full w-4 h-4"></div>
                <h3 className="text-xl font-bold mb-2 text-indigo-950 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-500" />
                  5. Education Details
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Implementing 5. education details strategically improves formatting and boosts ATS parsability for this section.
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
              Resume Length Guidelines in India
            </h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed relative z-10">
              Explore the core principles of <strong>Resume Length Guidelines in India</strong>. Understanding these concepts is critical for freshers aiming to build a high-converting, ATS-friendly resume.
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
                  What is the standard resume format in India?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  The standard is a reverse-chronological, ATS-friendly format emphasizing technical skills, education, and relevant experience, avoiding outdated 'biodata' elements.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  How many pages should an Indian resume be?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  For freshers, strictly 1 page. For professionals with 5+ years of experience, a 2-page resume is acceptable.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Should I include my marital status on an Indian resume?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  No. In modern Indian corporate culture, personal details like marital status, religion, and father's name are no longer required.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Is it mandatory to put a photo on a resume in India?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  No, unless explicitly requested by the employer (e.g., hospitality, aviation), photos should be omitted to maintain ATS compatibility.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  What is the difference between a CV and a Resume in India?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  In India, the terms are often used interchangeably, though a CV traditionally refers to a longer academic document, while a resume is a concise professional summary.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  Should I add a declaration at the end?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  No, adding a declaration at the bottom of the resume is an outdated practice and wastes valuable space.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  What fonts are accepted in India?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Professional, clean fonts like Arial, Calibri, Roboto, or Times New Roman are the standard in India.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-indigo-200 transition-colors">
                <h3 className="font-bold text-slate-900 text-lg flex items-start gap-3">
                  <span className="text-indigo-500 font-black text-2xl leading-none">Q.</span>
                  How can I create an Indian resume format?
                </h3>
                <p className="text-slate-600 mt-3 ml-8 leading-relaxed">
                  Use NextCV's intelligent resume builder to automatically format your details into an industry-standard Indian template.
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
                <Link href="/fresher-resume-format-india" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">fresher resume format india</span>
                </Link>
              </li>
              <li>
                <Link href="/ats-friendly-resume-format-india" className="flex items-center gap-2 p-4 rounded-xl bg-slate-800 hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white" />
                  <span className="font-medium capitalize text-sm">ats friendly resume format india</span>
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
