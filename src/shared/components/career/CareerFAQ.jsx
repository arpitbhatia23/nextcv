import React from "react";
import ReactMarkdown from "react-markdown";

export function CareerFAQ({ content }) {
  if (!content) return null;

  // Extract ### questions and answers
  const parts = content.split(/(?=^###\s+)/m);
  const items = [];

  parts.forEach(part => {
    const trimmed = part.trim();
    if (!trimmed) return;

    if (trimmed.startsWith("### ")) {
      const firstLineEnd = trimmed.indexOf("\n");
      let q = "";
      let a = "";
      if (firstLineEnd !== -1) {
        q = trimmed.substring(4, firstLineEnd).trim();
        a = trimmed.substring(firstLineEnd + 1).trim();
      } else {
        q = trimmed.substring(4).trim();
      }
      items.push({ question: q, answer: a });
    }
  });

  if (items.length === 0) {
    // Fallback: render regular markdown if not formatted as ### questions
    return (
      <div className="prose prose-slate max-w-none text-[#5B625C] leading-7">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#E3E3DD] border-y border-[#E3E3DD]">
      {items.map((item, index) => (
        <details key={index} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-medium text-[#17201C] transition hover:text-[#344B93]">
            <span>{item.question}</span>

            <span className="shrink-0 text-xl font-normal text-[#465B9E] transition group-open:rotate-45">
              +
            </span>
          </summary>

          <div className="max-w-3xl pb-6 text-sm leading-7 text-[#5B625C]">
            <ReactMarkdown>{item.answer}</ReactMarkdown>
          </div>
        </details>
      ))}
    </div>
  );
}

