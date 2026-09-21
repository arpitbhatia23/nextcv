import Link from "next/link";
import {
  Users,
  Zap,
  CheckCircle2,
  Heart,
  Sparkles,
  ShieldCheck,
  Target,
  Rocket,
  ArrowRight,
  Code2,
  Palette,
} from "lucide-react";
import { createSeoMetadata } from "@/shared/utils/seo";

export const metadata = createSeoMetadata({
  title: "About NextCV | AI Resume Builder for Freshers in India",
  description:
    "Learn about NextCV, an AI-powered ATS resume builder helping Indian freshers and job seekers create professional resumes from ₹49 to ₹399 per resume.",
  path: "/about-us",
  keywords: ["nextcv", "ai resume builder india", "resume builder for freshers"],
});

export const revalidate = 86400; // 1 day

export default function AboutPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About us",
    url: "https://www.nextcv.in/about-us",
    isPartOf: {
      "@type": "WebSite",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
    mainEntity: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 -z-0">
          <div className="absolute left-[28%] -top-20 h-[450px] w-[600px] rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
          <div className="absolute right-0 top-60 h-[400px] w-[500px] rounded-full bg-[#eef4ff] opacity-80 blur-[110px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <Users className="w-4 h-4 text-indigo-600" />
              Built by Students, For Indian Job Seekers
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
              We make professional ATS resumes{" "}
              <span className="block bg-gradient-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
                affordable for everyone.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
              NextCV is India's most accessible{" "}
              <span className="font-semibold text-slate-900">AI Resume Builder</span>. Built to eliminate expensive monthly subscriptions with a flexible pay-per-resume model ranging from{" "}
              <span className="font-bold text-indigo-600">₹49 to ₹399</span> per resume depending on template.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                Build Your Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-all"
              >
                View Transparent Pricing
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl text-center hover:border-indigo-300 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#3730d8]">₹49 – ₹399</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-2">
                Pay Per Resume
              </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl text-center hover:border-emerald-300 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600">100%</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-2">
                ATS Friendly
              </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl text-center hover:border-violet-300 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-violet-600">50K+</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-2">
                Resumes Generated
              </div>
            </div>

            <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl text-center hover:border-pink-300 transition-colors">
              <div className="text-3xl sm:text-4xl font-extrabold text-pink-600">4.9 ★</div>
              <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mt-2">
                Student Rating
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-slate-50 rounded-3xl p-8 md:p-14 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> The NextCV Story
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
                  Why We Built NextCV?
                </h2>
                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    We started as BCA students in India who experienced the frustrating job hunt firsthand:{" "}
                    <span className="font-semibold text-slate-900">existing resume builders are exorbitantly expensive</span>.
                    Most popular platforms charge recurring fees of ₹500 to ₹1,200 every single month — a heavy burden for students and freshers.
                  </p>
                  <p>
                    We believed job seekers deserved better: a clean, intelligent, and{" "}
                    <span className="font-semibold text-slate-900">ATS-optimized resume generator</span> for the price of a coffee.
                  </p>
                  <p>
                    That promise birthed NextCV: Premium AI features, recruiter-tested templates, and full customization starting from{" "}
                    <span className="font-bold text-indigo-600">₹49 up to ₹399 per resume</span> depending on the template selected.
                  </p>
                </div>
              </div>

              {/* Visual Comparison Card */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    NextCV vs Traditional Builders
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-100">
                    Pay Per Resume
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-sm font-medium text-slate-600">Traditional Builders</span>
                    <span className="text-sm font-bold text-red-500">₹999 / month recurring</span>
                  </div>

                  <div className="flex justify-between items-center p-4 rounded-xl bg-indigo-50 border border-indigo-200 shadow-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-bold text-[#071644]">NextCV Template Catalog</span>
                    </div>
                    <span className="text-base font-extrabold text-indigo-600">₹49 – ₹399 / RESUME</span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited edits & AI bullet regenerations for your template</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero automatic auto-renewals or credit card traps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tested for MNC ATS systems (TCS, Infosys, Wipro, Accenture)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Values */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">Our Core Mission</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Democratizing career opportunities across India by placing world-class AI career tools in the hands of every student.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-600" />,
                bg: "bg-indigo-50 border-indigo-100",
                title: "Lightning Fast AI",
                desc: "Craft impactful professional summaries and experience bullet points in under 3 minutes using Gemini AI.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                bg: "bg-emerald-50 border-emerald-100",
                title: "100% ATS Guaranteed",
                desc: "Our clean single & multi-column layouts are pre-screened to pass recruiter ATS algorithms flawlessly.",
              },
              {
                icon: <Heart className="w-6 h-6 text-pink-600" />,
                bg: "bg-pink-50 border-pink-100",
                title: "Honest & Transparent",
                desc: "No hidden subscription traps. Pay per resume from ₹49 to ₹399 depending on your selected template.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} border flex items-center justify-center mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Founders Spotlight */}
        <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="text-center mb-16 space-y-2">
            <div className="inline-flex items-center gap-2 text-indigo-600 text-sm font-semibold">
              <Rocket className="w-4 h-4 text-indigo-600" /> The Team
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">Meet the Founders</h2>
            <p className="text-slate-600 text-sm">The builders behind NextCV committed to empowering Indian job seekers.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Founder 1: Aurpit */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative overflow-hidden group hover:border-indigo-300 transition-all shadow-sm">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto md:mx-0 mb-6 flex items-center justify-center text-2xl font-extrabold text-white shadow-md">
                A
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Aurpit</h3>
              <p className="text-indigo-600 text-sm font-semibold mb-4 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Co-Founder & Lead Developer
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Full-stack engineer passionate about scalable architecture, AI prompt engineering, and building tools that empower students across Tier-1, Tier-2, and Tier-3 cities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full font-mono">Next.js</span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full font-mono">AI Systems</span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full font-mono">Full Stack</span>
              </div>
            </div>

            {/* Founder 2: Tamanna */}
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-3xl relative overflow-hidden group hover:border-emerald-300 transition-all shadow-sm">
              <div className="w-16 h-16 bg-emerald-600 rounded-2xl mx-auto md:mx-0 mb-6 flex items-center justify-center text-2xl font-extrabold text-white shadow-md">
                T
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Tamanna</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-4 flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> Co-Founder & Product Lead
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Product and UX strategist dedicated to crafting seamless document design, intuitive recruiter-approved layouts, and accessible interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full font-mono">Product Design</span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full font-mono">UX Architecture</span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs rounded-full font-mono">ATS Research</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-[#071644] rounded-3xl p-10 md:p-14 text-center space-y-6 shadow-xl relative overflow-hidden text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Ready to create an ATS resume that gets interviews?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Join thousands of Indian job seekers who crafted winning resumes on NextCV starting from just ₹49 to ₹399 per resume.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                Create Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
