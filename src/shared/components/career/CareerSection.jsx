import React from "react";
import ReactMarkdown from "react-markdown";
import { CareerFAQ } from "./CareerFAQ";
import { CareerChecklist } from "./CareerChecklist";
import { Check } from "lucide-react";

export function CareerSection({ section, index }) {
  if (!section || !section.content || !section.content.trim()) return null;

  const headingLower = (section.heading || "").toLowerCase();
  const numStr = String(index + 1).padStart(2, "0");

  const isFAQ = headingLower.includes("frequently asked questions") || headingLower.includes("faq");
  const isChecklist = headingLower.includes("checklist");

  return (
    <section id={section.id} className="scroll-mt-28 border-t border-[#E3E3DD] py-14 sm:py-20">
      {/* Eyebrow & Number */}
      <div className="mb-4 flex items-center gap-3">
        <span className="font-mono text-xs font-bold tracking-[0.16em] text-[#465B9E]">
          {numStr}
        </span>

        <span className="h-px w-8 bg-[#E3E3DD]" />
      </div>

      {/* Heading */}
      <h2 className="mb-8 font-serif text-3xl tracking-[-0.025em] text-[#17201C] sm:text-4xl">
        {section.heading}
      </h2>

      {/* Special handling for FAQ and Checklist */}
      {isFAQ ? (
        <CareerFAQ content={section.content} />
      ) : isChecklist ? (
        <CareerChecklist content={section.content} />
      ) : (
        /* Regular Editorial Content Block */
        <div className="prose-nextcv text-base leading-8 text-[#5B625C]">
          <ReactMarkdown
            components={{
              h3: ({ children }) => (
                <h3 className="mt-8 mb-4 font-serif text-xl font-medium tracking-tight text-[#17201C] sm:text-2xl">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="mb-6 leading-8 text-[#5B625C]">{children}</p>
              ),

              ul: ({ children }) => (
                <ul className="my-6 space-y-3 pl-0">{children}</ul>
              ),

              ol: ({ children }) => (
                <ol className="my-6 space-y-3 pl-0 list-decimal list-inside">{children}</ol>
              ),

              li: ({ children }) => (
                <li className="flex items-start gap-3 border-b border-[#E3E3DD] py-3 text-sm text-[#4F5650] last:border-b-0">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-[#465B9E]" />
                  <span className="leading-6">{children}</span>
                </li>
              ),

              blockquote: ({ children }) => (
                <blockquote className="my-6 border-l-2 border-[#465B9E] pl-6 italic text-[#17201C]">
                  {children}
                </blockquote>
              ),

              strong: ({ children }) => (
                <strong className="font-semibold text-[#17201C]">{children}</strong>
              ),

              a: ({ href, children }) => {
                const isExternal = href?.startsWith("http");
                return (
                  <a
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer noopener" : undefined}
                    className="font-medium text-[#465B9E] underline decoration-[#465B9E]/30 underline-offset-4 transition hover:text-[#344B93] hover:decoration-[#344B93]"
                  >
                    {children}
                  </a>
                );
              },
            }}
          >
            {section.content}
          </ReactMarkdown>
        </div>
      )}
    </section>
  );
}
