import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import {
  FileText,
  IndianRupee,
  Plus,
  ArrowRight,
  Palette,
  Download,
  Sparkles,
  Zap,
  ShieldCheck,
  Rocket,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* Fonts: Fraunces for the letterhead display type, IBM Plex Mono for
   reference codes / labels / prices. Body stays on the default sans. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const UserDashboard = () => {
  const steps = [
    {
      title: "Choose & Create",
      description: "Pick a template and enter your details.",
      icon: <FileText className="w-5 h-5" style={{ color: "#1C2333" }} />,
    },
    {
      title: "Customize Style",
      description: "Tailor the layout to your industry.",
      icon: <Palette className="w-5 h-5" style={{ color: "#1C2333" }} />,
    },
    {
      title: "Pay & Download",
      description: "One-time payment for lifetime access.",
      icon: <Download className="w-5 h-5" style={{ color: "#1C2333" }} />,
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5" style={{ color: "#0F6E63" }} />,
      title: "ATS-Friendly",
      desc: "Optimized for recruiter filters.",
    },
    {
      icon: <Zap className="w-5 h-5" style={{ color: "#0F6E63" }} />,
      title: "Under 5 Mins",
      desc: "Blazing fast creation process.",
    },
    {
      icon: <IndianRupee className="w-5 h-5" style={{ color: "#0F6E63" }} />,
      title: "From ₹49",
      desc: "Transparent, one-time pricing.",
    },
  ];

  return (
    <div
      className="min-h-screen font-sans selection:bg-[#1C2333] selection:text-white"
      style={{ backgroundColor: "#F7F7F5", color: "#1C2333" }}
    >
      <FontImports />
      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
        {/* Letterhead */}
        <header className="pb-6 mb-12 border-b-2" style={{ borderColor: "#1C2333" }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <div className="font-mono text-[11px] tracking-widest" style={{ color: "#B3382C" }}>
                ELEVATE YOUR CAREER
              </div>
              <h1
                className="font-display text-2xl md:text-4xl font-medium leading-tight"
                style={{ color: "#1C2333" }}
              >
                Professional Resume Launchpad
              </h1>
              <p
                className="text-sm md:text-base max-w-2xl leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                Craft high-impact, HR-approved resumes in minutes. Fast, simple, and effective.
              </p>
            </div>
            <div>
              <Link href="/dashboard/my-resume">
                <button
                  className="px-5 py-2.5 rounded-none font-mono text-xs tracking-widest border transition-all"
                  style={{ borderColor: "#1C2333", color: "#1C2333", backgroundColor: "#FFFFFF" }}
                >
                  MY RESUMES
                </button>
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Primary CTA Card */}
            <Link href="/dashboard/builder" className="block group">
              <Card
                className="overflow-hidden border rounded-none shadow-none transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
              >
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4 text-white"
                      style={{ backgroundColor: "#1C2333" }}
                    >
                      <Plus size={22} strokeWidth={2} />
                    </div>
                    <div
                      className="font-mono text-[10px] tracking-widest mb-2"
                      style={{ color: "#6B7280" }}
                    >
                      REF · BUILD-01
                    </div>
                    <h2
                      className="font-display text-xl font-medium mb-4"
                      style={{ color: "#1C2333" }}
                    >
                      Create Your Masterpiece
                    </h2>
                    <p className="text-sm mb-6 leading-relaxed" style={{ color: "#6B7280" }}>
                      Start your journey with our expert-guided builder. It takes less than 5
                      minutes to generate a world-class resume.
                    </p>
                    <div className="flex items-center gap-6">
                      <div
                        className="px-8 py-4 text-white rounded-none font-medium text-sm flex items-center gap-2 transition-colors"
                        style={{ backgroundColor: "#B3382C" }}
                      >
                        Launch Builder
                        <Rocket className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col font-mono">
                        <span
                          className="font-bold text-sm leading-tight"
                          style={{ color: "#1C2333" }}
                        >
                          ₹49
                        </span>
                        <span
                          className="text-[10px] uppercase tracking-widest"
                          style={{ color: "#B7B5AC" }}
                        >
                          Starting at
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full hidden md:w-[40%] relative min-h-52 md:flex items-center justify-center p-6"
                    style={{ backgroundColor: "#F7F7F5" }}
                  >
                    <div
                      className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center rotate-6 z-10"
                      style={{
                        border: "1.5px dashed #B3382C",
                        color: "#B3382C",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <div className="text-center leading-none">
                        <div className="font-mono text-[8px] tracking-wider">PREMIUM</div>
                        <div
                          className="w-6 h-px mx-auto my-0.5"
                          style={{ backgroundColor: "#B3382C" }}
                        />
                        <div className="font-mono text-[7px] tracking-wider opacity-70">
                          TEMPLATE
                        </div>
                      </div>
                    </div>
                    <div
                      className="relative w-full aspect-3/4 shadow-2xl overflow-hidden border bg-white z-0"
                      style={{ borderColor: "#E4E2DC" }}
                    >
                      <Image
                        src="/premium_resume_mockup.png"
                        alt="Resume Showcase"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, 40vw"
                        className="object-cover opacity-95"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Step Guide */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h3
                  className="font-mono text-[10px] tracking-widest whitespace-nowrap"
                  style={{ color: "#B7B5AC" }}
                >
                  SUCCESS PATH
                </h3>
                <div className="h-px flex-1" style={{ backgroundColor: "#E4E2DC" }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 border shadow-none transition-all flex flex-col h-full group"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4"
                      style={{ backgroundColor: "#F7F7F5" }}
                    >
                      {step.icon}
                    </div>
                    <h4 className="font-display font-medium mb-2" style={{ color: "#1C2333" }}>
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7280" }}>
                      {step.description}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span
                        className="font-mono text-[10px] tracking-widest"
                        style={{ color: "#B7B5AC" }}
                      >
                        STEP 0{idx + 1}
                      </span>
                      <ArrowRight
                        className="w-4 h-4 transition-colors"
                        style={{ color: "#B7B5AC" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            {/* Cover Letter Card (replaces AI Chat Resume) */}
            <Link href="/dashboard/cover-letter" className="block group">
              <Card
                className="border rounded-none overflow-hidden shadow-none transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#1C2333", borderColor: "#1C2333" }}
              >
                <CardContent className="p-8 relative text-white">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Mail className="w-10 h-10" />
                  </div>
                  <div
                    className="inline-block font-mono text-[10px] tracking-widest px-2.5 py-1 mb-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                  >
                    PAIRS WITH YOUR RESUME
                  </div>
                  <h3 className="font-display text-lg font-medium mb-2">Cover Letters</h3>
                  <p className="text-sm mb-6" style={{ color: "#C7CBD6" }}>
                    Draft a tailored cover letter to send alongside your resume — matched in
                    minutes.
                  </p>
                  <div className="flex items-center text-sm font-mono tracking-wide group-hover:translate-x-1 transition-transform">
                    WRITE A COVER LETTER <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pricing Card */}
            <Card
              className="border rounded-none overflow-hidden shadow-none"
              style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
            >
              <CardContent className="p-8">
                <div className="p-3 w-fit mb-6" style={{ backgroundColor: "#F7F7F5" }}>
                  <IndianRupee className="w-6 h-6" style={{ color: "#1C2333" }} />
                </div>
                <h3 className="font-display font-medium mb-2" style={{ color: "#1C2333" }}>
                  Simple Pricing
                </h3>
                <p className="text-xs mb-8" style={{ color: "#6B7280" }}>
                  No subscriptions, no hidden fees.
                </p>
                <div className="flex items-baseline gap-2 mb-8 font-mono">
                  <span className="text-lg font-bold" style={{ color: "#1C2333" }}>
                    ₹49
                  </span>
                  <span className="text-sm font-medium" style={{ color: "#B3382C" }}>
                    /RESUME
                  </span>
                </div>
                <ul className="space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">{feature.icon}</div>
                      <div>
                        <div className="font-bold text-xs" style={{ color: "#1C2333" }}>
                          {feature.title}
                        </div>
                        <div className="text-[10px]" style={{ color: "#6B7280" }}>
                          {feature.desc}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-4 rounded-none font-medium transition-colors shadow-none text-white"
                  style={{ backgroundColor: "#1C2333" }}
                >
                  Get Started
                </button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card
              className="p-6 rounded-none border shadow-none"
              style={{ backgroundColor: "#FBFBF9", borderColor: "#E4E2DC" }}
            >
              <h4
                className="font-display font-medium text-sm mb-3 flex items-center gap-2"
                style={{ color: "#1C2333" }}
              >
                <Sparkles className="w-4 h-4" style={{ color: "#B3382C" }} />
                Pro Tip
              </h4>
              <p className="text-sm leading-relaxed italic" style={{ color: "#6B7280" }}>
                "Tailoring your resume with keywords from the job description can increase your
                chances by up to 60%."
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
