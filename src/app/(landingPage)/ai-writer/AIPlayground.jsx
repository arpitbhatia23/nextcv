"use client";

import { useState } from "react";
import { Sparkles, Wand2, Copy, Check, RefreshCw, ArrowRight, Bot, Zap } from "lucide-react";
import Link from "next/link";

const ROLE_SAMPLES = {
  "Software Engineer": {
    summary:
      "Results-driven Software Engineer with expertise in React, Next.js, Node.js, and cloud deployments. Proven track record of optimizing REST API latency by 45% and building scalable microservices.",
    bullets: [
      "Engineered high-throughput RESTful APIs using Node.js and Express, cutting response latency by 42%.",
      "Architected responsive frontend interfaces with Next.js & Tailwind CSS, boosting user engagement by 35%.",
      "Integrated CI/CD pipelines using GitHub Actions, automating testing and reducing deployment errors by 60%.",
    ],
    skills: ["React.js", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Docker", "AWS", "REST APIs"],
  },
  "Data Analyst": {
    summary:
      "Analytical Data Analyst skilled in Python, SQL, Tableau, and automated reporting. Adept at transforming raw datasets into actionable business intelligence that boosts ROI.",
    bullets: [
      "Built interactive Tableau dashboards tracking monthly KPIs, saving executive decision-makers 15+ hours weekly.",
      "Optimized complex SQL queries across 2M+ row database, reducing query execution times by 50%.",
      "Conducted exploratory data analysis (EDA) using Pandas & Seaborn to identify customer churn triggers.",
    ],
    skills: ["Python", "SQL", "Tableau", "PowerBI", "Pandas", "NumPy", "Excel", "Data Visualization"],
  },
  "Digital Marketer": {
    summary:
      "Creative Digital Marketing Specialist with 2+ years experience in performance marketing, SEO, content strategy, and meta ad campaigns driving 3.5x ROAS.",
    bullets: [
      "Managed Google & Meta ad campaigns with ₹500K+ budget, achieving a 3.4x average Return on Ad Spend (ROAS).",
      "Spearheaded organic SEO overhaul, elevating keyword rankings into Top 3 Google results and driving 120% traffic boost.",
      "Designed automated email drip campaigns using Mailchimp, boosting click-through rates by 28%.",
    ],
    skills: ["Google Ads", "Meta Ads Manager", "SEO", "Google Analytics 4", "Copywriting", "Email Automation"],
  },
  "UI/UX Designer": {
    summary:
      "User-centric UI/UX Designer specialized in high-conversion landing page design, design systems, interactive Figma prototypes, and user research.",
    bullets: [
      "Redesigned SaaS web application onboarding flow, increasing signup conversion rate by 34%.",
      "Created comprehensive Figma design system with 200+ accessible components, cutting design time in half.",
      "Conducted usability testing sessions with 25+ target users to validate wireframe prototypes.",
    ],
    skills: ["Figma", "Wireframing", "User Research", "Prototyping", "Design Systems", "UI Animation"],
  },
};

export default function AIPlayground() {
  const [selectedRole, setSelectedRole] = useState("Software Engineer");
  const [activeTab, setActiveTab] = useState("bullets");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentData = ROLE_SAMPLES[selectedRole];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 600);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Bot className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#071644] flex items-center gap-2">
              Interactive AI Generator Demo <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            </h3>
            <p className="text-xs text-slate-500">Select a target job role to preview live AI outputs</p>
          </div>
        </div>

        <button
          onClick={handleSimulateRegenerate}
          disabled={isGenerating}
          className="self-start sm:self-auto px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isGenerating ? "animate-spin" : ""}`} />
          {isGenerating ? "Regenerating..." : "Simulate AI Generation"}
        </button>
      </div>

      {/* Role Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {Object.keys(ROLE_SAMPLES).map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedRole === role
                ? "bg-indigo-600 text-white shadow-sm scale-105"
                : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-slate-100 gap-6 mb-6 text-xs sm:text-sm font-medium text-slate-500">
        <button
          onClick={() => setActiveTab("bullets")}
          className={`pb-3 relative transition-colors ${
            activeTab === "bullets" ? "text-indigo-600 font-bold" : "hover:text-slate-800"
          }`}
        >
          Experience Bullets
          {activeTab === "bullets" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("summary")}
          className={`pb-3 relative transition-colors ${
            activeTab === "summary" ? "text-indigo-600 font-bold" : "hover:text-slate-800"
          }`}
        >
          Professional Summary
          {activeTab === "summary" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("skills")}
          className={`pb-3 relative transition-colors ${
            activeTab === "skills" ? "text-indigo-600 font-bold" : "hover:text-slate-800"
          }`}
        >
          Key Skills
          {activeTab === "skills" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Output Content Area */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 min-h-[200px] relative font-sans">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3">
            <Sparkles className="w-8 h-8 text-indigo-600 animate-spin" />
            <p className="text-xs text-indigo-700 font-medium">Gemini AI generating ATS-optimized content...</p>
          </div>
        ) : (
          <div>
            {activeTab === "bullets" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    Generated Action Bullets ({selectedRole})
                  </span>
                  <button
                    onClick={() => handleCopy(currentData.bullets.join("\n"))}
                    className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied All!" : "Copy Bullets"}
                  </button>
                </div>
                <ul className="space-y-3">
                  {currentData.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "summary" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    Generated Summary ({selectedRole})
                  </span>
                  <button
                    onClick={() => handleCopy(currentData.summary)}
                    className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy Summary"}
                  </button>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-slate-700 text-xs sm:text-sm leading-relaxed shadow-xs">
                  "{currentData.summary}"
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">
                    Recommended ATS Keywords ({selectedRole})
                  </span>
                  <button
                    onClick={() => handleCopy(currentData.skills.join(", "))}
                    className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100 font-semibold"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied All!" : "Copy Skills"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-500 text-center sm:text-left">
          Like what you see? Generate unlimited AI descriptions for your full resume.
        </p>
        <Link
          href="/"
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          Use AI Writer In Builder <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
