import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  IndianRupee,
  Plus,
  Timer,
  CheckCircle2,
  ArrowRight,
  Palette,
  Download,
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
    },
    {
      title: "Customize Style",
      description: "Tailor the layout to your industry.",
      icon: <Palette className="w-5 h-5 text-emerald-600" />,
      color: "bg-emerald-50",
    },
    {
      title: "Pay & Download",
      description: "One-time payment for lifetime access.",
      icon: <Download className="w-5 h-5 text-amber-600" />,
      color: "bg-amber-50",
    },
  ];

  const features = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      title: "ATS-Friendly",
      desc: "Designed to pass resume filters.",
    },
    {
      icon: <Timer className="w-5 h-5 text-blue-500" />,
      title: "Under 5 Mins",
      desc: "Instant professional results.",
    },
    {
      icon: <IndianRupee className="w-5 h-5 text-orange-500" />,
      title: "Just ₹100",
      desc: "No subscriptions, pay once.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 lg:p-12 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <Badge
                variant="outline"
                className="mb-4 border-indigo-200 text-indigo-700 bg-indigo-50/50 px-3 py-1 text-xs font-semibold tracking-wide uppercase"
              >
                Welcome to NextCV
              </Badge>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
                Professional Resume <span className="text-indigo-600">Launchpad</span>
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                Empower your career growth with high-impact, HR-approved resumes. Fast, simple, and
                effective.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/dashboard/my-resume">
                <button className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                  My Resumes
                </button>
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Action Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Primary CTA Card */}
            <Link href="/dashboard/resumeform" className="block group">
              <Card className="overflow-hidden border-0 shadow-2xl shadow-indigo-200/40 rounded-3xl transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-indigo-300/50">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="flex-1 p-8 md:p-12 bg-white flex flex-col justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform duration-500">
                      <Plus size={32} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                      Create Your Masterpiece
                    </h2>
                    <p className="text-slate-500 text-lg mb-8 leading-relaxed">
                      Start your journey with our expert-guided form builder. It takes less than 5
                      minutes to generate a world-class resume.
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 flex items-center gap-3 group-hover:bg-indigo-700 transition-colors">
                        Launch Builder
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-slate-400 font-medium">Just ₹100</span>
                    </div>
                  </div>
                  <div className="w-full hidden md:w-[45%] bg-slate-50 relative min-h-75 overflow-hidden md:flex items-center justify-center p-8">
                    <div className="absolute inset-0 bg-linear-to-br from-indigo-500/5 to-transparent z-10" />
                    <div className="relative w-full aspect-3/4 shadow-[0_20px_50px_rgba(79,70,229,0.15)] rounded-t-xl overflow-hidden transform rotate-2 translate-y-8 group-hover:rotate-0 group-hover:translate-y-4 transition-all duration-700 border border-slate-200/50 bg-white">
                      <Image
                        src="/infografhic.webp"
                        alt="Resume Showcase"
                        height={500}
                        width={500}
                        priority
                        className="object-cover object-top opacity-95"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Step Guide */}
            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                Success Path <div className="h-px flex-1 bg-slate-200" />
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-slate-200 transition-all flex flex-col h-full ring-1 ring-slate-100 ring-offset-0"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-5`}
                    >
                      {step.icon}
                    </div>
                    <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                    <div className="mt-auto pt-4 flex items-center text-xs font-bold text-slate-300 uppercase tracking-tighter">
                      Step 0{idx + 1}
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
              <Card className="border-0 bg-linear-to-br from-purple-600 to-indigo-700 text-white rounded-3xl overflow-hidden shadow-xl shadow-purple-200 transition-all duration-300 group-hover:scale-[1.02]">
                <CardContent className="p-8 relative">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Palette className="w-24 h-24 rotate-12" />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-white/20 text-white border-0 hover:bg-white/30 backdrop-blur-sm">
                      EXPERIMENTAL
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">AI Chat Resume</h3>
                  <p className="text-purple-100 text-sm mb-6 leading-relaxed">
                    Short on time? Use our AI assistant to generate a professional resume in seconds
                    via chat.
                  </p>
                  <div className="flex items-center text-sm font-bold group-hover:translate-x-2 transition-transform">
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
                <h3 className="text-2xl font-bold mb-3">Simple Pricing</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  No subscriptions or hidden fees. Only pay when you're ready to download.
                </p>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-extrabold tracking-tighter">₹100</span>
                  <span className="text-indigo-400 font-semibold font-mono text-xl">/RESUME</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex gap-3">
                      <div className="shrink-0 mt-1">{feature.icon}</div>
                      <div>
                        <div className="font-bold text-sm">{feature.title}</div>
                        <div className="text-xs text-slate-400">{feature.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-bold hover:bg-slate-100 transition-colors shadow-lg shadow-black/20">
                  Get Started Now
                </button>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="border border-slate-200 bg-white rounded-3xl shadow-sm">
              <CardContent className="p-6">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-indigo-500" />
                  Pro Tip
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed italic">
                  "Tailoring your resume with keywords from the job description can increase your
                  chances of landing an interview by up to 60%."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
