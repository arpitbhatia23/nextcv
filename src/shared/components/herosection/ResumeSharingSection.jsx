"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Share2,
  Copy,
  Check,
  Globe,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Smartphone,
  Eye,
  CheckCircle2,
  Crown,
} from "lucide-react";
import { toast } from "sonner";

export default function ResumeSharingSection() {
  const [copied, setCopied] = useState(false);
  const sampleUrl = "https://nextcv.in/r/aurpit-bhatia-1stjca";

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(sampleUrl);
      setCopied(true);
      toast.success("Sample resume link copied!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="resume-sharing" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      {/* Background Glows matching NextCV aesthetic */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute right-[10%] -top-20 h-96 w-96 rounded-full bg-[#eef2ff] opacity-70 blur-[100px]" />
        <div className="absolute left-[5%] bottom-0 h-80 w-80 rounded-full bg-[#f2f4ff] opacity-80 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f2f3ff] border border-[#e4e7ff] text-[#3730d8] text-xs sm:text-sm font-semibold">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            Exclusive to Premium & Elite Templates
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071644] tracking-tight leading-tight">
            Share Your Resume with a{" "}
            <span className="bg-linear-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
              Verified Live Web Link
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#365184] leading-relaxed max-w-2xl mx-auto">
            Skip messy PDF attachments and broken email formatting. Generate a fast, professional,
            and verified live web portfolio link with one click — exclusive for{" "}
            <strong className="text-indigo-600">Premium (₹199)</strong> and{" "}
            <strong className="text-indigo-600">Elite (₹399)</strong> template users.
          </p>
        </div>

        {/* Feature Grid & Interactive Demo */}
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Feature Highlights */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0 text-indigo-600">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#071644]">
                    Instant Public Share Link
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Get your personalized URL (
                    <code className="text-indigo-600 font-medium">nextcv.in/r/your-name</code>)
                    ready to post on LinkedIn, WhatsApp recruiter chats, and your portfolio.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 text-emerald-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#071644]">
                    Verified Authenticity Badge
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Recruiters see an official NextCV verified checkmark confirming ATS compliance,
                    correct structure, and original credentials.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 text-purple-600">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#071644]">
                    Mobile & Recruiter Friendly
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Opens instantly on smartphones and tablets. Hiring managers can review your
                    experience on the go and download the high-res PDF anytime.
                  </p>
                </div>
              </div>
            </div>

            {/* Tier Callout Card */}
            <div className="p-5 rounded-2xl bg-linear-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-100">
              <div className="flex items-center gap-2 mb-2">
                <Crown className="w-4 h-4 text-indigo-700" />
                <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  Supported Tiers
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                Resume sharing link generation is automatically enabled whenever you create a resume
                using our <strong className="text-indigo-900 font-semibold">Premium (₹199)</strong>{" "}
                or <strong className="text-indigo-900 font-semibold">Elite (₹399)</strong> catalog
                templates.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-indigo-200 text-xs font-bold text-indigo-700 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Premium Tier (₹199)
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-indigo-200 text-xs font-bold text-indigo-700 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Elite Tier (₹399)
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.02]"
              >
                View Premium & Elite Pricing <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Realistic Live Link Card Mockup */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-lg rounded-3xl bg-slate-900 p-2 sm:p-3 shadow-2xl shadow-indigo-950/20 border border-slate-800">
              {/* Browser Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-700/60 rounded-full px-3 py-1 text-[11px] text-slate-300 font-mono w-64 truncate">
                  <Globe className="w-3 h-3 text-indigo-400 shrink-0" />
                  <span className="truncate">{sampleUrl}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <button
                    onClick={handleCopy}
                    title="Copy sample link"
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mock Resume Viewer Canvas */}
              <div className="bg-[#0B0F17] rounded-2xl p-5 sm:p-6 text-white space-y-4">
                {/* Status Bar */}
                <div className="flex items-center justify-between bg-indigo-950/40 border border-indigo-800/40 rounded-xl px-3.5 py-2">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                      Verified Public Resume
                    </span>
                  </div>
                  <span className="text-[10px] font-medium bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                    Elite Template
                  </span>
                </div>

                {/* Candidate Summary Card */}
                <div className="bg-[#121824] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
                        Aurpit bhatia
                        <ShieldCheck className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                      </h4>
                      <p className="text-xs text-indigo-300 font-medium">
                        Full Stack SDE • React, Node.js, AWS
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">ATS SCORE</span>
                      <span className="text-sm font-bold text-emerald-400">96 / 100</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Passionate software engineer experienced with high-concurrency microservices,
                    scalable frontend architecture, and cloud deployment.
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["Next.js", "TypeScript", "PostgreSQL", "Docker", "REST APIs"].map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Share Strip */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleCopy}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied to Clipboard!" : "Copy Share Link"}</span>
                  </button>

                  <Link
                    href="/pricing"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-300" />
                    <span>Get Access</span>
                  </Link>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 px-1">
                  <span>⚡ Zero attachment file limits</span>
                  <span>🔒 Secure live hosting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
