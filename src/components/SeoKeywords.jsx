import React from "react";
import Link from "next/link";

const SeoKeywords = () => {
  const keywords = [
    "best AI resume builder for tech jobs",
    "AI resume builder with ATS optimization",
    "free AI resume builder online 2026",
    "AI resume builder for software engineers",
    "AI resume builder for fresh graduates",
    "AI resume builder that writes cover letters",
    "AI resume builder with LinkedIn import",
    "AI resume builder for career changers",
    "AI resume builder for entry-level jobs",
    "AI resume builder with pre-made templates",
    "AI resume builder for creative professionals",
    "AI resume builder that formats PDF resumes",
    "AI resume builder with interview tips",
    "AI resume builder with keyword optimization",
    "AI resume builder for senior executives",
    "AI resume builder for remote job applications",
    "AI resume builder with job-specific suggestions",
    "AI resume builder for startup job seekers",
    "AI resume builder that suggests skills",
    "AI resume builder for marketing professionals",
    "AI resume builder with automatic grammar check",
    "AI resume builder for LinkedIn profile enhancement",
    "AI resume builder that highlights achievements",
    "AI resume builder for finance professionals",
    "AI resume builder with ATS-friendly templates",
    "AI resume builder that generates bullet points",
    "AI resume builder for students and interns",
    "AI resume builder with custom designs",
    "AI resume builder that improves job application success",
    "AI resume builder with real-time AI feedback",
    "AI resume builder for data scientists",
    "AI resume builder with keyword scanning",
    "AI resume builder for healthcare professionals",
    "AI resume builder that recommends certifications",
    "AI resume builder for engineering graduates",
    "AI resume builder with recruiter-approved formats",
    "AI resume builder that adapts to job descriptions",
    "AI resume builder for UX/UI designers",
    "AI resume builder with multilingual support",
    "AI resume builder for IT professionals",
    "AI resume builder with portfolio integration",
    "AI resume builder that boosts interview chances",
    "AI resume builder for project managers",
    "AI resume builder that auto-saves resumes",
    "AI resume builder for creative industries",
    "AI resume builder with AI-generated summaries",
    "AI resume builder for high-demand tech roles",
    "AI resume builder with drag-and-drop editor",
    "AI resume builder for senior developers",
    "AI resume builder with real-time skill analysis",
  ];

  return (
    <section className="py-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h3 className="text-xl font-semibold text-slate-300 mb-6">
          Popular Searches
        </h3>
        <div className="flex flex-wrap gap-3">
          {keywords.map((keyword, index) => (
            <Link
              key={index}
              href="/"
              className="text-xs text-slate-500 hover:text-indigo-400 transition-colors duration-200 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 hover:border-indigo-500/30"
              aria-label={`Search for ${keyword}`}
            >
              {keyword}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SeoKeywords;
