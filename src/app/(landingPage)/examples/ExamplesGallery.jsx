"use client";

import { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Eye, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import BuildButton from "@/shared/components/landing/BuildButton";

const EXAMPLES_DATA = [
  {
    id: "fullstack-dev",
    role: "Full Stack Developer",
    category: "Tech & IT",
    expLevel: "1 - 3 Years Exp",
    atsScore: 98,
    templateName: "Google Tech Template",
    templateImg: "/googletech.webp",
    summary:
      "Results-oriented Full Stack Developer specializing in React, Next.js, Node.js, and MongoDB. Proven track record of architecting scalable web applications.",
    skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "TypeScript"],
    bullets: [
      "Built responsive web applications serving 50,000+ monthly active users with Next.js & Tailwind CSS.",
      "Optimized MongoDB aggregations and index pipelines, reducing database response times by 40%.",
      "Integrated Razorpay payment gateways and OAuth authentication with 99.9% uptime.",
    ],
  },
  {
    id: "btech-fresher",
    role: "B.Tech CS / IT Fresher",
    category: "Freshers & Graduates",
    expLevel: "Fresher / 0 Exp",
    atsScore: 99,
    templateName: "TCS Digital Template",
    templateImg: "/tcs.webp",
    summary:
      "Motivated CS Graduate with strong fundamentals in Data Structures, Algorithms, Java, and Web Development. Eager to contribute to high-growth software teams.",
    skills: ["Java", "Data Structures", "Python", "HTML/CSS", "JavaScript", "Git", "SQL"],
    bullets: [
      "Developed an AI-based Resume Analyzer for final year project using Python and NLP techniques.",
      "Completed 6-month Software Engineering internship at tech startup, resolving 35+ Jira bug tickets.",
      "Ranked Top 5% in College Hackathon out of 120 participating engineering teams.",
    ],
  },
  {
    id: "data-analyst",
    role: "Data Analyst",
    category: "Tech & IT",
    expLevel: "0 - 2 Years Exp",
    atsScore: 96,
    templateName: "Clean Minimalist",
    templateImg: "/milimalist.webp",
    summary:
      "Detail-oriented Data Analyst proficient in SQL, Python, Tableau, and Excel reporting. Expert at converting complex datasets into strategic insights.",
    skills: ["SQL", "Python", "Tableau", "PowerBI", "Excel", "Data Wrangling", "Statistics"],
    bullets: [
      "Created automated Tableau dashboards tracking company sales performance, saving 10 hours of manual work weekly.",
      "Performed SQL queries on 1M+ row transactional database to identify key customer retention trends.",
      "Collaborated with marketing team to optimize ad spend allocation based on conversion funnels.",
    ],
  },
  {
    id: "infosys-fresher",
    role: "Systems Engineer Fresher",
    category: "Freshers & Graduates",
    expLevel: "Fresher / Campus placement",
    atsScore: 98,
    templateName: "Infosys System Template",
    templateImg: "/infosys.webp",
    summary:
      "Engineered fresher candidate with certified skills in C++, Python, MySQL, and Software Development Life Cycle (SDLC).",
    skills: ["C++", "Python", "SQL", "OOPs", "DBMS", "Operating Systems", "Networking"],
    bullets: [
      "Built Smart Attendance System using OpenCV and Python with 98% accuracy.",
      "Qualified Infosys InfyTQ certification program with high distinction score.",
      "Organized National Tech Symposium managing 500+ student delegates.",
    ],
  },
  {
    id: "business-analyst",
    role: "Business Analyst / MBA",
    category: "Business & Operations",
    expLevel: "Fresher / Experienced",
    atsScore: 97,
    templateName: "Executive Gray Template",
    templateImg: "/executivegray.webp",
    summary:
      "Strategic MBA graduate specializing in requirements gathering, process mapping, Agile methodology, and stakeholder communication.",
    skills: ["Agile/Scrum", "Jira", "Process Mapping", "SQL", "Requirements Gathering", "Excel"],
    bullets: [
      "Authored 15+ Business Requirement Documents (BRD) and System Requirement Specifications (SRS).",
      "Facilitated daily Scrum standups, sprint planning, and retrospective meetings for dev team of 8.",
      "Identified process bottlenecks in client supply chain, reducing order processing latency by 20%.",
    ],
  },
  {
    id: "digital-marketing",
    role: "Digital Marketing Specialist",
    category: "Marketing & Sales",
    expLevel: "1 - 4 Years Exp",
    atsScore: 95,
    templateName: "Creative Teal Template",
    templateImg: "/creativeteal.webp",
    summary:
      "Performance marketer experienced in Google Ads, Meta Ads Manager, SEO strategy, and conversion rate optimization (CRO).",
    skills: ["Google Ads", "SEO", "Meta Ads", "Google Analytics 4", "Copywriting", "HubSpot"],
    bullets: [
      "Scaled paid acquisition ad campaigns from ₹1k to ₹500K monthly budget maintaining 3.2x ROAS.",
      "Increased organic website traffic by 140% in 6 months through targeted long-tail SEO content strategy.",
      "A/B tested email subject lines and landing page CTAs, increasing email conversion rates by 22%.",
    ],
  },
  {
    id: "uiux-designer",
    role: "UI/UX Product Designer",
    category: "Design & Creative",
    expLevel: "0 - 3 Years Exp",
    atsScore: 97,
    templateName: "Apple Creative Template",
    templateImg: "/applecreative.webp",
    summary:
      "Product Designer passionate about intuitive user flows, accessible UI design systems, interactive wireframes, and usability testing.",
    skills: [
      "Figma",
      "User Research",
      "Wireframing",
      "Design Systems",
      "Prototyping",
      "Usability Testing",
    ],
    bullets: [
      "Designed end-to-end mobile app interface for fintech startup, achieving 4.8★ App Store rating.",
      "Established centralized Figma design token system, cutting frontend handoff time by 40%.",
      "Conducted user interviews with 30+ customers to refine checkout funnel experience.",
    ],
  },
  {
    id: "wipro-fresher",
    role: "Project Engineer / Wipro",
    category: "Freshers & Graduates",
    expLevel: "Fresher / Off-Campus",
    atsScore: 97,
    templateName: "Wipro Modern Template",
    templateImg: "/wipro.webp",
    summary:
      "Enthusiastic Engineering graduate with strong analytical thinking, Java programming skills, and cloud computing fundamentals.",
    skills: ["Java", "Spring Boot", "SQL", "Git", "Linux", "REST API"],
    bullets: [
      "Created E-Commerce Backend System using Java Spring Boot and MySQL.",
      "Solved 250+ LeetCode coding problems focused on Arrays, Strings, and Dynamic Programming.",
      "Co-authored research paper on Cloud Security published in IEEE student conference.",
    ],
  },
];

const CATEGORIES = [
  "All",
  "Tech & IT",
  "Freshers & Graduates",
  "Business & Operations",
  "Marketing & Sales",
  "Design & Creative",
];

export default function ExamplesGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewExample, setPreviewExample] = useState(null);
  const closePreviewRef = useRef(null);
  const previewTriggerRef = useRef(null);

  useEffect(() => {
    if (!previewExample) {
      previewTriggerRef.current?.focus();
      previewTriggerRef.current = null;
      return undefined;
    }

    closePreviewRef.current?.focus();
    const handleKeyDown = event => {
      if (event.key === "Escape") setPreviewExample(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewExample]);

  const filteredExamples = EXAMPLES_DATA.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search Bar & Category Filters */}
      <div className="nc-card space-y-6 bg-surface-muted p-5 sm:p-6">
        {/* Search Input */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <label htmlFor="example-search" className="sr-only">
            Search resume examples by role or skill
          </label>
          <Input
            id="example-search"
            type="text"
            placeholder="Search role e.g. Full Stack Developer, TCS Fresher, Data Analyst..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="h-12 pl-12"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              type="button"
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className="h-10 px-4 text-xs font-semibold sm:text-sm"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid of Resume Examples with Real Template Catalog Images */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExamples.map(item => (
          <article
            key={item.id}
            className="nc-card group relative flex flex-col justify-between overflow-hidden transition-all duration-200 hover:border-primary/40 hover:shadow-md"
          >
            <div>
              {/* Template Image Preview */}
              <div className="relative h-56 bg-slate-100 overflow-hidden border-b border-slate-100">
                <Image
                  src={item.templateImg}
                  alt={`${item.role} template preview`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white to-transparent pointer-events-none" />
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-slate-800 font-bold text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                  {item.templateName}
                </span>
                <Link
                  href="/pricing"
                  className="absolute bottom-3 right-3 rounded-lg bg-primary px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-primary/90"
                >
                  Compare plans
                </Link>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-full border border-border bg-accent px-3 py-1 text-xs font-semibold text-primary">
                    {item.expLevel}
                  </span>
                  <span className="rounded-full border border-primary/15 bg-accent px-2.5 py-1 text-xs font-medium text-primary">
                    Example score: {item.atsScore}%
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.category}</p>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                  "{item.summary}"
                </p>

                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block">
                    Featured ATS Bullets
                  </span>
                  <ul className="space-y-1.5">
                    {item.bullets.slice(0, 2).map((b, i) => (
                      <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0" />
                        <span className="line-clamp-2">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-mono border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={event => {
                  previewTriggerRef.current = event.currentTarget;
                  setPreviewExample(item);
                }}
                className="h-11 flex-1 text-xs"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-600" /> Quick View
              </Button>
              <BuildButton className="h-11 flex-1 px-3 text-xs">Use Template</BuildButton>
            </div>
          </article>
        ))}
      </div>

      {filteredExamples.length === 0 && (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No examples found for "{searchQuery}"
          </h3>
          <p className="text-slate-500 text-sm">
            Try searching for another role like software engineer or data analyst.
          </p>
        </div>
      )}

      {/* Quick View Modal */}
      {previewExample && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/65 p-4"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setPreviewExample(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="example-preview-title"
            className="nc-card relative max-h-[90vh] w-full max-w-3xl space-y-6 overflow-y-auto p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs text-primary font-semibold">
                  {previewExample.category}
                </span>
                <h2
                  id="example-preview-title"
                  className="text-xl sm:text-2xl font-semibold text-foreground"
                >
                  {previewExample.role}
                </h2>
              </div>
              <Button
                ref={closePreviewRef}
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setPreviewExample(null)}
                aria-label="Close resume example preview"
                className="h-10 px-3 text-xs"
              >
                Close
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Left Column: Image Preview */}
              <div className="md:col-span-1">
                <div className="relative h-72 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
                  <Image
                    src={previewExample.templateImg}
                    alt={previewExample.templateName}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-xs font-bold text-slate-900 block">
                    {previewExample.templateName}
                  </span>
                  <Link
                    href="/pricing"
                    className="text-xs font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    Compare plans
                  </Link>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="md:col-span-2 space-y-4 text-xs sm:text-sm text-slate-600">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Professional Summary</h4>
                  <p className="bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed text-slate-700">
                    "{previewExample.summary}"
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Work Achievements & Bullets</h4>
                  <ul className="space-y-2">
                    {previewExample.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Key Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {previewExample.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg text-xs font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => setPreviewExample(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Back to List
              </button>
              <Link
                href="/"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-2 shadow-md"
              >
                Create My Resume With This Template <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
