import React from "react";
import ReactMarkdown from "react-markdown";
import { MapPin, TrendingUp, IndianRupee, Briefcase } from "lucide-react";

export function CareerSalary({ content, salaryData }) {
  if (!content && !salaryData) return null;

  return (
    <div className="space-y-8">
      {salaryData && (
        <div className="grid gap-px overflow-hidden border border-[#E3E3DD] bg-[#E3E3DD] sm:grid-cols-3">
          {/* Entry Level */}
          <div className="bg-[#F8F7F3] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#646A64]">
              Entry-Level (0-2 Yrs)
            </p>

            <p className="mt-3 font-serif text-2xl text-[#17201C]">
              {salaryData.entryLevel}
            </p>

            <span className="mt-2 inline-block text-xs text-[#777A75]">
              Freshers & Early Career
            </span>
          </div>

          {/* Mid Level */}
          <div className="bg-white/90 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#465B9E]">
              Mid-Level (3-6 Yrs)
            </p>

            <p className="mt-3 font-serif text-2xl text-[#344B93]">
              {salaryData.midLevel}
            </p>

            <span className="mt-2 inline-block text-xs text-[#465B9E]">
              Independent Contributors
            </span>
          </div>

          {/* Senior Level */}
          <div className="bg-[#F8F7F3] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#17201C]">
              Senior / Lead (7+ Yrs)
            </p>

            <p className="mt-3 font-serif text-2xl text-[#17201C]">
              {salaryData.seniorLevel}
            </p>

            <span className="mt-2 inline-block text-xs text-[#777A75]">
              Leads, Managers & Architects
            </span>
          </div>
        </div>
      )}

      {/* Structured Insights Markdown */}
      <div className="prose-nextcv text-base leading-8 text-[#5B625C]">
        <ReactMarkdown
          components={{
            h3: ({ children }) => (
              <h3 className="mt-6 mb-3 font-serif text-xl font-medium text-[#17201C]">
                {children}
              </h3>
            ),

            p: ({ children }) => (
              <p className="mb-4 text-[#5B625C]">{children}</p>
            ),

            ul: ({ children }) => (
              <ul className="my-4 space-y-2.5 pl-0">{children}</ul>
            ),

            li: ({ children }) => (
              <li className="flex items-start gap-3 border-b border-[#E3E3DD] py-2.5 text-sm text-[#4F5650] last:border-b-0">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#465B9E]" />

                <span className="leading-6">{children}</span>
              </li>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}

