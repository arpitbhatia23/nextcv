import Link from "next/link";
import { Check, Download, ShieldCheck, Zap, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Free Resume Builder Without Payment (PDF Download Guide 2026)",
  description:
    "Looking for a free resume builder without payment and PDF download? Learn how to create an ATS-friendly resume for free and when to upgrade for premium features.",
  keywords:
    "free resume builder without payment pdf, create cv online free download, how do i create a resume for free, best ai resume builder free, free resume maker india, download resume pdf free",
  alternates: {
    canonical: `https://www.nextcv.in/free-resume-builder-no-payment`,
  },
};

export default function FreeResumePage() {
  return (
    <main className="bg-white text-slate-900 font-sans">
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-6 lg:px-8 text-center bg-slate-50">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Free Resume Builder <br />
            <span className="text-indigo-600">Without Payment & PDF Download</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Stop falling for "free" tools that charge hidden fees. Here is the ultimate guide to creating a resume for free in 2026.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard/resume/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              Start Building For Free
            </Link>
            <Link
              href="/pricing"
              className="bg-white border border-slate-200 hover:border-indigo-600 text-slate-700 font-bold py-4 px-8 rounded-xl transition-all"
            >
              View Affordable Plans
            </Link>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto prose prose-slate prose-indigo">
        <h2 className="text-3xl font-bold">The Truth About "Free" Resume Builders</h2>
        <p>
          If you've ever spent an hour building your resume only to be hit with a "Pay $19.99 to Download" screen, you're not alone. Most international resume builders use this bait-and-switch tactic. 
        </p>
        <p>
          At <strong>NextCV</strong>, we believe in transparency. You can use our platform to build, preview, and format your resume entirely for free.
        </p>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8 not-prose rounded-r-xl">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="text-amber-600" />
            <h4 className="font-bold text-amber-900">Watch Out for "Free Trials"</h4>
          </div>
          <p className="text-amber-800 text-sm">
            Many sites offer a 14-day free trial for ₹1 (or $1) but automatically charge ₹1500+ every month después de that. Always check the fine print!
          </p>
        </div>

        <h2 className="text-3xl font-bold mt-12">How to Create a Resume for Free (Step-by-Step)</h2>
        <p>
          Follow these steps to ensure you don't pay a single rupee if you're on a tight budget:
        </p>
        <ol>
          <li>
            <strong>Use Google Docs Templates:</strong> They are 100% free. However, they are often not ATS-friendly.
          </li>
          <li>
            <strong>NextCV Free Preview:</strong> Build your resume on NextCV. You can use our AI features and templates to see how your resume looks before deciding to download the premium version.
          </li>
          <li>
            <strong>Formatting Matters:</strong> If you're building it manually, avoid images and complex columns as they break Applicant Tracking Systems.
          </li>
        </ol>

        <h2 className="text-3xl font-bold mt-12">NextCV: The Most Affordable Alternative in India</h2>
        <p>
          While we offer a premium download for a small one-time fee of ₹100, we provide value that free tools can't match:
        </p>
        <ul>
          <li><strong>ATS-Optimized PDF:</strong> Guaranteed to be readable by major Indian companies (TCS, Infosys, Accenture).</li>
          <li><strong>AI Bullet Points:</strong> Powered by Gemini to make you sound professional.</li>
          <li><strong>Premium Templates:</strong> Designs that stand out to human recruiters.</li>
        </ul>

        <div className="my-16 flex flex-col items-center text-center bg-indigo-900 text-white p-10 rounded-3xl not-prose">
          <h3 className="text-3xl font-bold mb-4 italic text-white">"Your resume is your ticket to a better life. Don't let a bad template hold you back."</h3>
          <p className="text-indigo-200 mb-8">Get a professional, ATS-ready resume for just ₹100 today.</p>
          <Link
            href="/dashboard/resume/new"
            className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold py-4 px-10 rounded-full transition-all text-lg"
          >
            Upgrade to Professional Resume
          </Link>
        </div>

        <h2 className="text-3xl font-bold mt-12">Frequently Asked Questions</h2>
        <div className="space-y-6 not-prose mt-8">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Can I download my resume for free in PDF?</h4>
            <p className="text-slate-600 text-sm">NextCV allows free previews. For a high-quality, ATS-optimized PDF without watermarks, we charge a nominal one-time fee of ₹100.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Is there any free AI resume builder?</h4>
            <p className="text-slate-600 text-sm">Most AI resume builders have costs because AI generation (GPT/Gemini) is expensive. NextCV offers the most affordable AI features in the Indian market.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">How do I create an ATS resume for free?</h4>
            <p className="text-slate-600 text-sm">Use standard fonts like Arial or Calibri, avoid tables, and use simple headings. For a guaranteed ATS-friendly structure, use NextCV's templates.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
