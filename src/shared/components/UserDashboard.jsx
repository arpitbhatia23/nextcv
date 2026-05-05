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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const UserDashboard = () => {
  const steps = [
    {
      title: "Choose & Create",
      description: "Pick a template and enter your details.",
      icon: <FileText className="w-5 h-5 text-indigo-600" />,
      color: "bg-indigo-50",
      borderColor: "border-indigo-100",
    },
    {
      title: "Customize Style",
      description: "Tailor the layout to your industry.",
      icon: <Palette className="w-5 h-5 text-purple-600" />,
      color: "bg-purple-50",
      borderColor: "border-purple-100",
    },
    {
      title: "Pay & Download",
      description: "One-time payment for lifetime access.",
      icon: <Download className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-50",
      borderColor: "border-emerald-100",
    },
  ];

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      title: "ATS-Friendly",
      desc: "Optimized for recruiter filters.",
    },
    {
      icon: <Zap className="w-5 h-5 text-blue-600" />,
      title: "Under 5 Mins",
      desc: "Blazing fast creation process.",
    },
    {
      icon: <IndianRupee className="w-5 h-5 text-orange-600" />,
      title: "From ₹49",
      desc: "Transparent, one-time pricing.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 p-4 md:p-8 lg:p-12 font-sans selection:bg-indigo-100 selection:text-indigo-900 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 text-[10px] font-bold tracking-widest uppercase"
              >
                Elevate Your Career
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Professional Resume <span className="text-indigo-600">Launchpad</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl leading-relaxed font-light">
                Craft high-impact, HR-approved resumes in minutes. Fast, simple, and effective.
              </p>
            </div>
            <div>
              <Link href="/dashboard/my-resume">
                <button className="px-6 py-3 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  My Resumes
                </button>
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-10">
            {/* Primary CTA Card */}
            <Link href="/dashboard/builder" className="block group">
              <Card className="overflow-hidden border-0 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl  border-slate-100 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-300">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 text-white shadow-lg shadow-indigo-200">
                      <Plus size={32} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                      Create Your Masterpiece
                    </h2>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed font-light">
                      Start your journey with our expert-guided builder. It takes less than 5
                      minutes to generate a world-class resume.
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
                        Launch Builder
                        <Rocket className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-indigo-600 font-bold text-lg leading-tight">₹49</span>
                        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">
                          Starting at
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full hidden md:w-[40%] bg-slate-50 relative min-h-75 md:flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent z-0" />
                    <div className="relative w-full aspect-3/4 shadow-2xl rounded-xl overflow-hidden border border-slate-200/50 bg-white z-10">
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
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                  Success Path
                </h3>
                <div className="h-px flex-1 bg-slate-200" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`bg-white p-6 rounded-2xl border ${step.borderColor} shadow-sm hover:shadow-md transition-all flex flex-col h-full group`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4`}
                    >
                      {step.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed font-light">
                      {step.description}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        Step 0{idx + 1}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            {/* AI Resume Card */}
            <Link href="/dashboard/full-ai-resume" className="block group">
              <Card className="border-0 bg-linear-to-br from-purple-600 to-indigo-700 text-white rounded-3xl overflow-hidden shadow-xl shadow-purple-100 transition-all duration-300 hover:shadow-purple-200 hover:-translate-y-0.5">
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-20 h-20" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 mb-4 text-[10px]">
                    EXPERIMENTAL
                  </Badge>
                  <h3 className="text-2xl font-bold mb-2">AI Chat Resume</h3>
                  <p className="text-purple-100 text-sm mb-6 font-light">
                    Generate a professional resume in seconds via our AI chat assistant.
                  </p>
                  <div className="flex items-center text-sm font-bold group-hover:translate-x-1 transition-transform">
                    Try AI Assistant <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Pricing Card */}
            <Card className="border-0 bg-slate-900 text-white rounded-3xl overflow-hidden shadow-xl">
              <CardContent className="p-8">
                <div className="p-3 w-fit bg-indigo-500 rounded-xl mb-6">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">Simple Pricing</h3>
                <p className="text-slate-400 text-xs mb-8 font-light">
                  No subscriptions, no hidden fees.
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-extrabold text-white">₹49</span>
                  <span className="text-indigo-400 font-bold text-sm">/RESUME</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">{feature.icon}</div>
                      <div>
                        <div className="font-bold text-xs text-white">{feature.title}</div>
                        <div className="text-[10px] text-slate-400">{feature.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-colors shadow-lg">
                  Get Started
                </button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Pro Tip
              </h4>
              <p className="text-sm text-slate-500 leading-relaxed font-light italic">
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
