import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { FileText, IndianRupee, Plus, ArrowRight, Palette, Download, Sparkles, Zap, ShieldCheck, Rocket, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const UserDashboard = () => {
  const steps = [
    { title: "Choose & Create", description: "Pick a template and enter your details.", icon: <FileText className="w-5 h-5 text-[#465B9E]" /> },
    { title: "Customize Style", description: "Tailor the layout to your industry.", icon: <Palette className="w-5 h-5 text-[#465B9E]" /> },
    { title: "Pay & Download", description: "One-time payment for lifetime access.", icon: <Download className="w-5 h-5 text-[#465B9E]" /> },
  ];

  const features = [
    { icon: <ShieldCheck className="w-5 h-5 text-[#465B9E]" />, title: "ATS-Friendly", desc: "Optimized for recruiter filters." },
    { icon: <Zap className="w-5 h-5 text-[#465B9E]" />, title: "Under 5 Mins", desc: "Blazing fast creation process." },
    { icon: <IndianRupee className="w-5 h-5 text-[#465B9E]" />, title: "From ₹49", desc: "Transparent, one-time pricing." },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-[#465B9E] selection:text-white bg-[#F8F7F3] text-[#17201C]">
      <FontImports />
      <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
        <header className="pb-6 mb-12 border-b border-[#E3E2DC]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-3">
              <div className="font-mono text-[11px] tracking-widest text-[#465B9E]">YOUR WORKSPACE</div>
              <h1 className="font-display text-2xl md:text-4xl font-medium leading-tight text-[#17201C]">Build resumes that get noticed.</h1>
              <p className="text-sm md:text-base max-w-2xl leading-relaxed text-[#66706B]">Craft high-impact, HR-approved resumes in minutes. Fast, simple, and effective.</p>
            </div>
            <div>
              <Link href="/dashboard/my-resume">
                <button className="rounded-xl border border-[#E3E2DC] bg-white text-[#17201C] hover:bg-[#F1F0EB] font-sans text-sm font-medium px-4 py-2 transition-all">
                  MY RESUMES
                </button>
              </Link>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-10">
            {/* Primary CTA Card */}
            <Link href="/dashboard/builder" className="block group">
              <Card className="overflow-hidden border border-[#E3E2DC] rounded-2xl shadow-[0_10px_40px_rgba(23,32,28,0.06)] bg-white transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <div className="flex-1 p-8 flex flex-col justify-center">
                    <div className="w-10 h-10 flex items-center justify-center mb-4 text-white bg-[#465B9E] rounded-xl">
                      <Plus size={22} strokeWidth={2} />
                    </div>
                    <div className="font-mono text-[10px] tracking-widest mb-2 text-[#66706B]">REF · BUILD-01</div>
                    <h2 className="font-display text-xl font-medium mb-4 text-[#17201C]">Create Your Masterpiece</h2>
                    <p className="text-sm mb-6 leading-relaxed text-[#66706B]">Start your journey with our expert-guided builder. It takes less than 5 minutes to generate a world-class resume.</p>
                    <div className="flex items-center gap-6">
                      <div className="bg-[#465B9E] hover:bg-[#344B93] text-white rounded-xl px-6 py-3 font-sans font-medium text-sm transition-colors flex items-center gap-2">
                        Launch Builder<Rocket className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col font-mono">
                        <span className="font-bold text-sm leading-tight text-[#17201C]">₹49</span>
                        <span className="text-[10px] uppercase tracking-widest text-[#8A908B]">Starting at</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full hidden md:w-[40%] relative min-h-52 md:flex items-center justify-center p-6 bg-[#F8F7F3]">
                    <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full flex items-center justify-center rotate-6 z-10 border-[1.5px] border-dashed border-[#B3382C] text-[#B3382C] bg-white">
                      <div className="text-center leading-none">
                        <div className="font-mono text-[8px] tracking-wider">PREMIUM</div>
                        <div className="w-6 h-px mx-auto my-0.5 bg-[#B3382C]" />
                        <div className="font-mono text-[7px] tracking-wider opacity-70">TEMPLATE</div>
                      </div>
                    </div>
                    <div className="relative w-full aspect-3/4 shadow-2xl overflow-hidden border border-[#E3E2DC] bg-white z-0">
                      <Image src="/premium_resume_mockup.png" alt="Resume Showcase" fill priority sizes="(max-width: 768px) 100vw, 40vw" className="object-cover opacity-95" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Step Guide */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-mono text-[10px] tracking-widest whitespace-nowrap text-[#8A908B]">HOW IT WORKS</h3>
                <div className="h-px flex-1 bg-[#E3E2DC]" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-[#E3E2DC] bg-white transition-all flex flex-col h-full group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-[#EEF0F7]">{step.icon}</div>
                    <h4 className="font-display font-medium mb-2 text-[#17201C]">{step.title}</h4>
                    <p className="text-sm leading-relaxed text-[#5B625C]">{step.description}</p>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-widest text-[#465B9E]">STEP 0{idx + 1}</span>
                      <ArrowRight className="w-4 h-4 transition-colors text-[#465B9E]" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/dashboard/cover-letter" className="block group">
              <Card className="rounded-2xl border border-[#17201C] overflow-hidden shadow-none transition-all duration-200 hover:-translate-y-1 bg-[#17201C]">
                <CardContent className="p-8 relative text-white">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Mail className="w-10 h-10" /></div>
                  <div className="inline-block font-mono text-[10px] tracking-widest px-2.5 py-1 mb-4 bg-white/10 rounded">PAIRS WITH YOUR RESUME</div>
                  <h3 className="font-display text-lg font-medium mb-2">Cover Letters</h3>
                  <p className="text-sm mb-6 text-[#C7CBD6]">Draft a tailored cover letter to send alongside your resume — matched in minutes.</p>
                  <div className="flex items-center text-sm font-mono tracking-wide group-hover:translate-x-1 transition-transform">WRITE A COVER LETTER <ArrowRight className="ml-2 w-4 h-4" /></div>
                </CardContent>
              </Card>
            </Link>

            <Card className="rounded-2xl border border-[#E3E2DC] overflow-hidden shadow-none bg-white">
              <CardContent className="p-8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 bg-[#EEF0F7]">
                  <IndianRupee className="w-5 h-5 text-[#465B9E]" />
                </div>
                <h3 className="font-display font-medium mb-2 text-[#17201C]">Simple Pricing</h3>
                <p className="text-xs mb-8 text-[#5B625C]">No subscriptions, no hidden fees.</p>
                <div className="flex items-baseline gap-2 mb-8 font-mono">
                  <span className="text-lg font-bold text-[#17201C]">₹49</span>
                  <span className="text-sm font-medium text-[#465B9E]">/RESUME</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {features.map((feature, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className="shrink-0 mt-0.5">{feature.icon}</div>
                      <div>
                        <div className="font-bold text-xs text-[#17201C]">{feature.title}</div>
                        <div className="text-[10px] text-[#5B625C]">{feature.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl font-medium transition-colors shadow-none text-white bg-[#465B9E] hover:bg-[#344B93]">Get Started</button>
              </CardContent>
            </Card>

            <Card className="p-6 rounded-2xl border border-[#C8CDD9] bg-[#EEF0F7] shadow-none">
              <h4 className="font-sans font-semibold text-sm mb-3 flex items-center gap-2 text-[#344B93]">
                <Sparkles className="w-4 h-4 text-[#465B9E]" /> Pro Tip
              </h4>
              <p className="text-sm leading-relaxed italic text-[#465B9E]/80">"Tailoring your resume with keywords from the job description can increase your chances by up to 60%."</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
