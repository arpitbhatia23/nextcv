import Link from "next/link";
import {
  Users,
  Zap,
  CheckCircle2,
  Heart,
  Sparkles,
  ShieldCheck,
  Rocket,
  ArrowRight,
  Code2,
  Palette,
  FileSearch,
  FileText,
  Globe,
  Share2,
  Mail,
} from "lucide-react";
import { createSeoMetadata } from "@/shared/utils/seo";

export const metadata = createSeoMetadata({
  title: "About NextCV: India's ₹49 AI Resume Builder & Story | NextCV",
  description:
    "Meet NextCV—built in India to replace ₹2,000/mo resume traps with ₹49 one-time ATS resumes, free AI ATS scoring, cover letters & portfolio sites.",
  path: "/about-us",
  keywords: [
    "about nextcv",
    "what is nextcv",
    "nextcv founders",
    "ai resume builder india",
    "resume builder for freshers india",
    "49 rs resume builder",
  ],
});

export const revalidate = 86400; // 1 day

const ecosystemTools = [
  {
    icon: FileText,
    title: "AI Resume Builder",
    desc: "Draft STAR-format bullets with Gemini AI and export ATS-friendly PDFs from ₹49 via UPI.",
    href: "/ai-resume-builder",
  },
  {
    icon: FileSearch,
    title: "Free ATS Resume Checker",
    desc: "Scan your resume against any job description for free to fix missing keywords and parser gaps.",
    href: "/ats-resume-checker",
  },
  {
    icon: Mail,
    title: "AI Cover Letter Generator",
    desc: "Turn your resume and target job posting into a tailored cover letter for ₹79 one-time.",
    href: "/ai-cover-letter-generator",
  },
  {
    icon: Share2,
    title: "Shareable Web Resume",
    desc: "Get a permanent public link (/r/yourname) to share effortlessly on LinkedIn and WhatsApp.",
    href: "/shareable-resume",
  },
  {
    icon: Globe,
    title: "1-Click Portfolio Website",
    desc: "Convert your structured resume into a clean personal portfolio site (/p/yourname) in seconds.",
    href: "/resume-to-portfolio",
  },
  {
    icon: Sparkles,
    title: "ATS Resume Templates",
    desc: "Browse single-column and modern layouts tuned for Indian freshers, IT roles, and MNCs.",
    href: "/templates",
  },
];

export default function AboutPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": "https://www.nextcv.in/about-us#page",
        name: "About NextCV",
        url: "https://www.nextcv.in/about-us",
        description:
          "Meet NextCV—built in India to replace ₹2,000/mo resume traps with ₹49 one-time ATS resumes, free AI ATS scoring, cover letters & portfolio sites.",
        inLanguage: "en-IN",
        isPartOf: {
          "@type": "WebSite",
          name: "NextCV",
          url: "https://www.nextcv.in",
        },
        mainEntity: {
          "@id": "https://www.nextcv.in/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://www.nextcv.in/#organization",
        name: "NextCV",
        url: "https://www.nextcv.in",
        logo: "https://www.nextcv.in/logo.png",
        description:
          "Indian AI career platform offering ATS-friendly resume building from ₹49 one-time via UPI, free AI ATS checking, cover letters, shareable resume links, and 1-click portfolio websites.",
        areaServed: "IN",
        knowsAbout: [
          "ATS Resume Formatting",
          "AI Resume Building",
          "Indian Campus Placements",
          "Career Portfolio Websites",
        ],
        founder: [
          {
            "@type": "Person",
            name: "Aurpit",
            jobTitle: "Co-Founder & Lead Developer",
          },
          {
            "@type": "Person",
            name: "Tamanna",
            jobTitle: "Co-Founder & Product Lead",
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.nextcv.in/about-us#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.nextcv.in/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About Us",
            item: "https://www.nextcv.in/about-us",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute left-[28%] -top-20 h-112.5 w-150 bg-indigo-100 opacity-50 blur-[100px]" />
          <div className="absolute right-0 top-60 h-100 w-125 bg-indigo-100 opacity-50 blur-[110px]" />
        </div>

        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-6 max-w-7xl mx-auto z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
              <Users className="w-4 h-4 text-indigo-600" />
              Built by Students, For Indian Job Seekers
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071644] tracking-tight leading-[1.15]">
              We make professional ATS resumes{" "}
              <span className="block bg-linear-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                affordable for everyone.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#365184] max-w-2xl mx-auto leading-relaxed">
              NextCV is India&apos;s accessible{" "}
              <span className="font-semibold text-slate-900">AI Career Platform</span>. Built to
              replace expensive ₹2,000/month subscriptions with transparent one-time UPI plans
              ranging from <span className="font-bold text-indigo-600">₹49 to ₹399</span> per resume
              depending on template.
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/ai-resume-builder"
                className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                Build Your Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-all"
              >
                View Transparent Pricing
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-12 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-border py-5 text-sm text-muted-foreground">
            <span>Build, edit &amp; ATS-scan for free</span>
            <span aria-hidden="true" className="text-border-strong">
              ·
            </span>
            <span>₹49–₹399 one-time download plans via UPI</span>
            <span aria-hidden="true" className="text-border-strong">
              ·
            </span>
            <span>Zero recurring subscriptions</span>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-slate-50 p-8 md:p-14 border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-indigo-600 text-sm font-semibold">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> The NextCV Story
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
                  Why We Built NextCV
                </h2>
                <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    We started as BCA students in India who experienced the frustrating job hunt
                    firsthand: foreign resume builders let you spend an hour typing, only to lock
                    your PDF behind a $24/month credit card subscription.
                  </p>
                  <p>
                    We believed Indian students and job seekers deserved better: an intelligent,{" "}
                    <span className="font-semibold text-slate-900">
                      ATS-verified resume builder
                    </span>{" "}
                    with native UPI checkout for the price of a coffee.
                  </p>
                  <p>
                    That promise birthed NextCV: Gemini AI writing assistance, free AI ATS score
                    checking, shareable web resumes, and 1-click portfolios—with one-time PDF plans
                    starting from{" "}
                    <span className="font-bold text-indigo-600">₹49 up to ₹399</span> depending on
                    the template selected.
                  </p>
                </div>
              </div>

              {/* Visual Comparison Card */}
              <div className="bg-white border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    NextCV plan model
                  </span>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
                    Pay Per Resume
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-50 border border-slate-200">
                    <span className="text-sm font-medium text-slate-600">
                      Build, edit &amp; ATS check
                    </span>
                    <span className="text-sm font-semibold text-primary">Free</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-indigo-50 border border-indigo-200 shadow-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span className="text-sm font-bold text-[#071644]">Download plans</span>
                    </div>
                    <span className="text-base font-extrabold text-indigo-600">
                      ₹49 – ₹399 once
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 pt-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Unlimited edits &amp; AI bullet regenerations for your template</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Native Google Pay, PhonePe, Paytm UPI &amp; RuPay support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero automatic auto-renewals or credit card traps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Values */}
        <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">Our Core Mission</h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Democratizing career opportunities across India by placing world-class AI career
              tools in the hands of every student and professional.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="w-6 h-6 text-indigo-600" />,
                bg: "bg-indigo-50 border-indigo-100",
                title: "AI writing assistance",
                desc: "Draft professional summaries and quantified STAR experience bullets with Gemini AI, then review and refine every line.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
                bg: "bg-emerald-50 border-emerald-100",
                title: "ATS-verified structure",
                desc: "Clean vector PDFs engineered for Workday, Darwinbox, Taleo, and Naukri Resdex, paired with our free AI ATS checker.",
              },
              {
                icon: <Heart className="w-6 h-6 text-pink-600" />,
                bg: "bg-pink-50 border-pink-100",
                title: "Honest & Transparent",
                desc: "Zero hidden subscription traps. Pay once via UPI from ₹49 to ₹399 depending on your selected template.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 p-8 hover:border-indigo-300 hover:shadow-md transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-full ${item.bg} border flex items-center justify-center mb-6`}
                >
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NextCV Career Ecosystem */}
        <section className="py-16 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">
              What We Build: The NextCV Ecosystem
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Everything you need to go from draft resume to shortlisted interview—built in one
              connected workflow.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemTools.map(tool => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-slate-50 border border-slate-200 p-6 hover:bg-white hover:border-indigo-300 hover:shadow-sm transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600">
                    Explore tool <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Founders Spotlight */}
        <section className="py-20 px-6 max-w-5xl mx-auto z-10 relative">
          <div className="text-center mb-16 space-y-2">
            <div className="inline-flex items-center gap-2 text-indigo-600 text-sm font-semibold">
              <Rocket className="w-4 h-4 text-indigo-600" /> The Team
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#071644]">Meet the Founders</h2>
            <p className="text-slate-600 text-sm">
              The builders behind NextCV committed to empowering Indian job seekers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Founder 1: Aurpit */}
            <div className="bg-slate-50 border border-slate-200 p-8 relative overflow-hidden group hover:border-indigo-300 transition-all shadow-sm">
              <div className="w-16 h-16 bg-indigo-600 mx-auto md:mx-0 mb-6 flex items-center justify-center text-2xl font-extrabold text-white shadow-md">
                A
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Aurpit</h3>
              <p className="text-indigo-600 text-sm font-semibold mb-4 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Co-Founder &amp; Lead Developer
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Full-stack engineer passionate about scalable architecture, AI prompt engineering,
                and building tools that empower students across Tier-1, Tier-2, and Tier-3 cities.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-mono">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-mono">
                  AI Systems
                </span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-mono">
                  Full Stack
                </span>
              </div>
            </div>

            {/* Founder 2: Tamanna */}
            <div className="bg-slate-50 border border-slate-200 p-8 relative overflow-hidden group hover:border-emerald-300 transition-all shadow-sm">
              <div className="w-16 h-16 bg-emerald-600 mx-auto md:mx-0 mb-6 flex items-center justify-center text-2xl font-extrabold text-white shadow-md">
                T
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Tamanna</h3>
              <p className="text-emerald-600 text-sm font-semibold mb-4 flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> Co-Founder &amp; Product Lead
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Product and UX strategist dedicated to crafting seamless document design, intuitive
                clear resume layouts, and accessible interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-mono">
                  Product Design
                </span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-mono">
                  UX Architecture
                </span>
                <span className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-mono">
                  ATS Research
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Footer Section */}
        <section className="py-20 px-6 max-w-7xl mx-auto z-10 relative">
          <div className="bg-[#071644] p-10 md:p-14 text-center space-y-6 shadow-xl relative overflow-hidden text-white">
            <h2 className="text-2xl sm:text-4xl font-extrabold">
              Ready to create an ATS resume that gets interviews?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
              Join thousands of Indian job seekers who crafted winning resumes on NextCV starting
              from just ₹49 to ₹399 one-time via UPI.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/ai-resume-builder"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg transition-all hover:scale-105"
              >
                Create Resume Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/ats-resume-checker"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all"
              >
                Check Resume ATS Score Free
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
