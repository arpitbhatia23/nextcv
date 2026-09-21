import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import { Check, ShieldCheck, Zap, Download, HelpCircle, ArrowRight, Sparkles, Star } from "lucide-react";

export const metadata = createSeoMetadata({
  title: "Resume Builder Pricing in India | From \u20B949 to \u20B9399 | NextCV",
  description:
    "See NextCV's transparent pay-per-resume pricing in India. Create an ATS-friendly resume for free and pay once per download from \u20B949 to \u20B9399 depending on template selection.",
  path: "/pricing",
  keywords: [
    "resume builder pricing india",
    "resume builder price india",
    "best resume builder india",
    "ats resume builder",
  ],
});

export const revalidate = 3600;

export default function PricingPage() {
  const features = [
    "Unlimited Edits & AI Generations",
    "100% ATS-Friendly Recruiter Templates",
    "High-Resolution PDF Download",
    "Pay-Per-Resume (No Subscription Trap)",
    "Instant Payment via UPI / GPay / Cards",
    "Watermark-Free Export",
    "Priority Email Support",
    "Full Access to Gemini AI Writer",
  ];

  const faqs = [
    {
      question: "How does NextCV pricing work?",
      answer:
        "NextCV works on a transparent pay-per-resume model. You can build and preview your resume for free, and pay once per download ranging from ₹49 to ₹399 depending on the template selected. No recurring monthly subscriptions!",
    },
    {
      question: "How much does a resume cost in India?",
      answer:
        "A professional resume in India can cost anywhere from ₹1,000 for a freelancer to ₹10,000 for agency packages. NextCV provides professional AI-powered ATS resume templates ranging from ₹49 to ₹399 per resume.",
    },
    {
      question: "Is it worth paying for a resume builder?",
      answer:
        "Yes! NextCV provides recruiter-tested ATS optimization, premium designs, and Gemini AI writing assistance. These features significantly increase your interview callback rate, making the small ₹49 – ₹399 investment highly valuable.",
    },
    {
      question: "Can I create a resume for free?",
      answer:
        "Yes, you can edit and preview your resume for free. When you are ready to export your high-resolution ATS PDF without watermarks, you pay a single one-time fee starting from ₹49.",
    },
    {
      question: "What is the difference between free and paid resume builders?",
      answer:
        "Free builders often lock files behind mandatory monthly subscriptions (₹800+/mo) or add ugly watermarks. NextCV uses a simple pay-per-resume model with zero recurring surprises.",
    },
    {
      question: "What is the most affordable ATS resume builder in India?",
      answer:
        "NextCV is one of the most affordable professional resume builders in India, offering recruiter-approved ATS templates starting from ₹49 up to ₹399 with no hidden monthly auto-renewals.",
    },
  ];

  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-[28%] -top-20 h-[450px] w-[600px] rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
          <div className="absolute right-0 top-60 h-[400px] w-[500px] rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
        </div>

        {/* Hero Header */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              Pay-Per-Resume Model • Zero Auto-Renewals
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
              Affordable ATS Resume Pricing in{" "}
              <span className="block bg-gradient-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
                India
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
              Pay once per resume when you are ready to download. Pricing varies from <strong className="text-indigo-600">₹49 to ₹399</strong> depending on the template chosen from our catalog. No forced monthly subscriptions!
            </p>
          </div>
        </section>

        {/* Main Pricing Card Section */}
        <section className="pb-24 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Starter Template Tier */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between shadow-xs hover:border-indigo-300 transition-all">
              <div>
                <div className="mb-4">
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">STARTER TEMPLATES</span>
                  <h2 className="text-2xl font-bold text-[#071644] mt-3">Basic ATS Templates</h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-1">Clean, standard layouts perfect for freshers and campus placement drives.</p>
                </div>

                <div className="flex items-baseline mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">₹49 – ₹149</span>
                  <span className="text-slate-500 text-xs font-medium ml-2">/ per resume</span>
                </div>

                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> TCS, Infosys, Wipro Fresher Formats
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> 100% ATS Passed Structure
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" /> High-Res PDF Export
                  </li>
                </ul>
              </div>

              <Link
                href="/templates"
                className="w-full block bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-center text-sm transition-all"
              >
                Browse Starter Templates
              </Link>
            </div>

            {/* Premium Template Tier */}
            <div className="rounded-3xl p-1 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl hover:scale-[1.01] transition-transform">
              <div className="bg-white rounded-[22px] p-8 h-full flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-950 font-black px-4 py-1.5 rounded-bl-2xl text-[11px] uppercase tracking-wider flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-yellow-950" /> MOST POPULAR
                </div>

                <div>
                  <div className="mb-4 pt-1">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">PREMIUM CATALOG</span>
                    <h2 className="text-2xl font-bold text-[#071644] mt-3">Advanced & Corporate</h2>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">Google, Microsoft, Amazon, Executive & Creative designer layouts.</p>
                  </div>

                  <div className="flex items-baseline mb-6">
                    <span className="text-slate-400 line-through text-sm mr-2">₹999</span>
                    <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">₹199 – ₹399</span>
                    <span className="text-slate-500 text-xs font-medium ml-2">/ per resume</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-xs sm:text-sm text-slate-700">
                    {features.slice(0, 5).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/templates"
                  className="w-full block bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold py-3.5 rounded-xl text-center text-sm shadow-md transition-all"
                >
                  Browse Premium Catalog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Why NextCV Trust Cards */}
        <section className="py-20 bg-slate-50 border-y border-slate-200 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#071644] mb-14">
              Why Job Seekers Prefer NextCV
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center text-red-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">No Monthly Subscription Traps</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  International competitors silently charge ₹1,200+ every month. NextCV charges per resume (₹49 - ₹399) — no unexpected credit card charges.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Instant High-Res Export</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Once created, your PDF is stored securely. Download clean ATS formats fully compatible with TCS, Infosys, and Wipro portals.
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-center text-purple-600">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Gemini AI Included</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Don't pay thousands to freelancers. Generate quantified bullet points and professional summaries included in the template price.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Comparison Table Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">Resume Writing Cost Comparison in India</h2>
              <p className="text-slate-600 text-sm">Compare NextCV against freelancers and traditional agencies.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white border border-slate-200 rounded-3xl overflow-hidden text-xs sm:text-sm shadow-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-700 border-b border-slate-200 text-left">
                    <th className="p-4 sm:p-5 font-bold">Service Category</th>
                    <th className="p-4 sm:p-5 font-bold">Average Price</th>
                    <th className="p-4 sm:p-5 font-bold">Turnaround Time</th>
                    <th className="p-4 sm:p-5 font-bold">ATS Guarantee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="bg-indigo-50/50 border-l-4 border-l-indigo-600">
                    <td className="p-4 sm:p-5 font-bold text-[#071644] flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" /> NextCV Pay-Per-Resume
                    </td>
                    <td className="p-4 sm:p-5 font-extrabold text-indigo-600">₹49 – ₹399 / RESUME</td>
                    <td className="p-4 sm:p-5 font-semibold text-emerald-700">Instant (3 Mins)</td>
                    <td className="p-4 sm:p-5 font-bold text-emerald-700">100% Passed</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-medium">Freelance Writer</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">₹1,500 – ₹3,500</td>
                    <td className="p-4 sm:p-5">3 – 5 Days</td>
                    <td className="p-4 sm:p-5 text-slate-500">Varies</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-medium">Resume Writing Agency</td>
                    <td className="p-4 sm:p-5 font-semibold text-slate-900">₹4,000 – ₹10,000+</td>
                    <td className="p-4 sm:p-5">1 – 2 Weeks</td>
                    <td className="p-4 sm:p-5 text-slate-500">Manual Check</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-medium">Subscription Builders</td>
                    <td className="p-4 sm:p-5 font-semibold text-red-500">₹999 / Month Recurring</td>
                    <td className="p-4 sm:p-5">Instant</td>
                    <td className="p-4 sm:p-5 text-slate-500">Varies</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Bilingual Hindi Trust Banner */}
        <section className="py-16 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 text-white space-y-6 shadow-xl">
            <h2 className="text-2xl font-bold">Resume Banane Mein Kitna Paisa Lagta Hai?</h2>
            <div className="space-y-4 text-slate-300 text-xs sm:text-sm">
              <p>
                Agar aap search kar rahe hain ki ek professional <strong className="text-white">ATS resume banane me kitna paisa lagta hai</strong>, toh yahan clear comparison hai:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 font-sans">
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <span className="text-slate-400 block text-xs">Free Resume (Word/Docs)</span>
                  <span className="text-xl font-bold text-slate-200">₹0</span>
                </div>
                <div className="bg-indigo-900 p-4 rounded-2xl border border-indigo-700">
                  <span className="text-indigo-200 block text-xs font-semibold">NextCV Template Catalog</span>
                  <span className="text-xl font-extrabold text-indigo-300">₹49 – ₹399 / RESUME</span>
                </div>
                <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700">
                  <span className="text-slate-400 block text-xs">Human Writing Service</span>
                  <span className="text-xl font-bold text-slate-200">₹1,500 – ₹5,000+</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Accordions Section */}
        <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative border-t border-slate-100">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644] flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm">Everything you need to know about NextCV's pay-per-resume model.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Footer Banner */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-[#071644] rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Create Your ATS Resume From ₹49 to ₹399
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Join 50,000+ Indian freshers and developers who upgraded their job search with NextCV.
            </p>
            <div>
              <Link
                href="/templates"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                Choose A Template & Build <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
