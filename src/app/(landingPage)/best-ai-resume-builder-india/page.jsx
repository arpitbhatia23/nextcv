import Link from "next/link";
import { Check, Download, ShieldCheck, Zap, Star, Trophy } from "lucide-react";

export const metadata = {
  title: "Best AI Resume Builder India (Free vs Paid) – NextCV vs Others",
  description:
    "Find the best AI resume builder in India for 2026. Compare feature sets, ATS optimization, and pricing. Learn why NextCV is the top choice for Indian freshers.",
  keywords:
    "best ai resume builder india, top resume builder 2026, free vs paid resume builders, ai powered cv maker india, ats optimized resume builder",
  alternates: {
    canonical: `https://www.nextcv.in/best-ai-resume-builder-india`,
  },
};

export default function AIResumeIndiaPage() {
  const comparisonData = [
    { feature: "AI Writing Assistant", nextcv: true, other: "Varies" },
    { feature: "ATS-Friendly Templates", nextcv: true, other: "Often not" },
    { feature: "One-Time Payment", nextcv: true, other: "Subscription" },
    { feature: "India Specific Layouts", nextcv: true, other: "No" },
    { feature: "Affordability (₹100)", nextcv: true, other: "₹800 - ₹1500" },
  ];

  return (
    <main className="bg-white text-slate-900 font-sans">
      {/* Hero */}
      <section className="relative pt-24 pb-12 px-6 lg:px-8 text-center bg-indigo-50 border-b border-indigo-100">
        <div className="mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <Trophy className="w-4 h-4" /> Rated #1 for Indian Freshers
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Best AI Resume Builder in <span className="text-indigo-600 underline">India</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto italic">
            "Stop wasting time formatting. Let AI build your perfect resume in 2026."
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard/resume/new"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30"
            >
              Start Building Now
            </Link>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-20 px-6 lg:px-8 max-w-4xl mx-auto prose prose-slate prose-indigo">
        <h2 className="text-3xl font-bold">The Top Choice for Job Seekers in India</h2>
        <p>
          In 2026, AI has changed the recruitment landscape. Most major Indian companies use automated systems to filter out resumes. To stand out, you need more than just a template; you need an <strong>AI-powered partner</strong>.
        </p>

        <h2 className="text-3xl font-bold mt-12">NextCV vs. Other Resume Builders</h2>
        <div className="overflow-x-auto not-prose my-10 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-900">Feature</th>
                <th className="p-4 font-bold text-indigo-600 bg-indigo-50/50">NextCV</th>
                <th className="p-4 font-bold text-slate-400">Other Brands</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-slate-700 text-sm font-medium">{row.feature}</td>
                  <td className="p-4 text-indigo-600 bg-indigo-50/30">
                    {row.nextcv ? <Check className="w-5 h-5" /> : "—"}
                  </td>
                  <td className="p-4 text-slate-500 text-sm">{row.other}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-bold mt-12">Why AI Resumes are Essential Now</h2>
        <p>
          Recruiters at companies like <strong>TCS, Infosys, and HCL</strong> get thousands of applications per day. AI helps you bridge that gap:
        </p>
        <ul>
          <li><strong>Keyword Matching:</strong> AI scans your job description and inserts the keywords recruiters are searching for.</li>
          <li><strong>Quantifiable Achievements:</strong> Our AI (powered by Gemini) turns "I did marketing" into "Increased lead generation by 45% over 6 months."</li>
          <li><strong>Grammar & Tone:</strong> Every sentence is checked for professionalism and impact.</li>
        </ul>

        <div className="bg-slate-900 text-white p-8 rounded-3xl my-12 not-prose">
          <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Star className="text-yellow-400 fill-yellow-400" /> Professional Edge
          </h3>
          <p className="text-slate-300 mb-6">
            While most tools are built for the US or European markets, NextCV is optimized for the Indian corporate culture and recruitment standards.
          </p>
          <Link
            href="/dashboard/resume/new"
            className="text-white hover:text-indigo-300 font-bold border-b-2 border-indigo-500 transition-colors"
          >
            Create My AI Resume Now →
          </Link>
        </div>

        <h2 className="text-3xl font-bold mt-12">Is It Worth Paying for AI?</h2>
        <p>
          Many job seekers hesitate to pay for tools. However, international builders charge high recurring fees. 
          <strong> NextCV charges a one-time fee of ₹100</strong>, which is less than the cost of a lunch in most Indian cities. For that price, you get:
        </p>
        <ol>
          <li>Professional AI bullet suggestions.</li>
          <li>Access to 20+ ATS-friendly templates.</li>
          <li>Instant PDF downloads in high resolution.</li>
        </ol>

        <h2 className="text-3xl font-bold mt-12">Verdict for 2026</h2>
        <p>
          If you are looking for the <strong>best AI resume builder in India</strong> that is affordable, effective, and tailored to local job markets, NextCV is the top choice. Our commitment to students and professionals has made us the go-to platform for over 10,000+ happy users.
        </p>
        <div className="mt-16 flex flex-col items-center text-center">
          <Link
            href="/dashboard/resume/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-5 px-12 rounded-2xl transition-all shadow-xl hover:shadow-indigo-500/50 text-xl"
          >
            Get Hired Faster with NextCV AI
          </Link>
          <p className="mt-4 text-slate-500 text-sm">Join 10,000+ successful job seekers.</p>
        </div>
      </section>
    </main>
  );
}
