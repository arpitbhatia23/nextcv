"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Building2,
  Download,
  Check,
  Send,
  Target,
  Wand2,
} from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
export default function CoverLetterSection() {
  const steps = [
    {
      step: "01",
      title: "Select Your Resume",
      description:
        "Select your completed or saved ATS resume from the NextCV dashboard so the AI can extract your real skills, experience, and projects.",
      icon: FileText,
      badge: "Step 1",
    },
    {
      step: "02",
      title: "Open Cover Letter Tool",
      description:
        "Go to the 'Cover Letter' option from your dashboard sidebar menu, or access it directly after downloading your resume.",
      icon: Sparkles,
      badge: "Step 2",
    },
    {
      step: "03",
      title: "Add Target Company & Role",
      description:
        "Enter the company name (e.g. TCS, Amazon, Deloitte) and paste the exact job description for the role you're applying for.",
      icon: Building2,
      badge: "Step 3",
    },
    {
      step: "04",
      title: "Select Tone & Length",
      description:
        "Choose your desired voice (Professional, Enthusiastic, or Direct) and desired letter length (Short, Medium, or Detailed).",
      icon: Sliders,
      badge: "Step 4",
    },
    {
      step: "05",
      title: "Generate & Download PDF",
      description:
        "Click 'Generate Cover Letter'. Gemini AI synthesizes your background with the job requirements into a recruiter-winning PDF ready to send.",
      icon: Download,
      badge: "Step 5",
    },
  ];

  return (
    <section
      id="cover-letter-feature"
      className="relative py-20 sm:py-28 bg-slate-50 overflow-hidden border-y border-slate-200"
    >
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[20%] -top-24 h-96 w-96 rounded-full bg-indigo-100/50 blur-[100px]" />
        <div className="absolute right-[5%] bottom-0 h-80 w-80 rounded-full bg-purple-100/50 blur-[110px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs sm:text-sm font-semibold">
            <Wand2 className="w-4 h-4 text-indigo-600" />
            AI Cover Letter Feature
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071644] tracking-tight leading-tight">
            Tailor Your Application with an{" "}
            <span className="bg-linear-to-r from-[#4338f4] to-[#2563eb] bg-clip-text text-transparent">
              AI-Generated Cover Letter
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#365184] leading-relaxed max-w-2xl mx-auto">
            Hiring managers are 2.5x more likely to shortlist candidates with a personalized cover
            letter. Follow these simple steps to access and generate your interview-winning cover
            letter in seconds.
          </p>
        </div>

        {/* 5 Steps to Access & Generate Card Flow */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-sm sm:text-base font-bold text-[#071644] uppercase tracking-wider">
              How to Access & Generate in 5 Easy Steps
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-indigo-300 transition-all flex flex-col justify-between group"
                >
                  {/* Top indicator & step number */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[#071644] mb-2 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-semibold text-indigo-600">{item.badge}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:translate-x-1 group-hover:text-indigo-600 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Feature Demo Box */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left: Key Benefits */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <Target className="w-3.5 h-3.5 text-emerald-600" />
                Matched to Job Description
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#071644]">
                Why Use NextCV's AI Cover Letter Builder?
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>Zero Starting from Scratch:</strong> Your resume projects and metrics
                    automatically populate into professional narrative paragraphs.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>ATS & HR Keyword Optimization:</strong> Analyzes the company's job
                    posting to include the exact required hard and soft skills.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>Cohesive Design Matching:</strong> Download a formatted letterhead PDF
                    that matches your resume fonts and styling seamlessly.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-700">
                    <strong>Custom Tone Calibration:</strong> Switch between formal corporate,
                    enthusiastic startup, or concise technical tones with one click.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => signIn("google", { callbackUrl: "/dashboard/cover-letter" })}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-102"
                >
                  Generate Cover Letter Now <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
                <Link
                  href="/pricing"
                  className="text-xs sm:text-sm font-semibold text-[#071644] hover:text-indigo-600 px-4 py-2 transition-colors"
                >
                  See Pricing Details →
                </Link>
              </div>
            </div>

            {/* Right: Realistic Letterhead Preview Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#FAF9F5] border border-amber-900/10 rounded-2xl p-6 sm:p-8 shadow-md relative font-sans">
                {/* Letter Header */}
                <div className="border-b border-slate-200/80 pb-4 mb-4 flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Pooja Sharma</h4>
                    <p className="text-xs text-indigo-600 font-medium">
                      Software Engineer • Bangalore
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      pooja.sharma@email.com • +91 98765 43210
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded">
                      Classic Template
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Application Date: Today</p>
                  </div>
                </div>

                {/* Recipient */}
                <div className="mb-4 text-xs text-slate-700 space-y-0.5">
                  <p className="font-semibold text-slate-900">Hiring Manager</p>
                  <p className="text-slate-600">Amazon Development Centre, India</p>
                  <p className="text-[11px] text-slate-500">
                    Re: Application for Software Development Engineer (SDE-1)
                  </p>
                </div>

                {/* Letter Body Preview */}
                <div className="space-y-2.5 text-[11px] sm:text-xs text-slate-700 leading-relaxed">
                  <p>Dear Hiring Team,</p>
                  <p>
                    I am writing to express my strong interest in the{" "}
                    <strong>Software Development Engineer (SDE-1)</strong> position at Amazon. With
                    hands-on experience in building scalable REST APIs in Node.js and interactive
                    frontends in React, I am confident in my ability to contribute directly to your
                    team's customer-obsessed engineering standards.
                  </p>
                  <p className="hidden sm:block">
                    In my recent projects, I architected a low-latency checkout pipeline that
                    reduced server response times by 35% and integrated Redis caching for 10,000+
                    simulated users...
                  </p>
                  <p>
                    Thank you for your time and consideration. I look forward to discussing how my
                    technical background aligns with Amazon's engineering vision.
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900">Sincerely,</p>
                    <p className="text-slate-600">Pooja Sharma</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 font-medium">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Matched 6/6 Job Keywords</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
