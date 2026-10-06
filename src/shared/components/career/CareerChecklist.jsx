import React from "react";
import ReactMarkdown from "react-markdown";
import { Check } from "lucide-react";

export function CareerChecklist({ content }) {
  if (!content) return null;

  const lines = content.split("\n").map(l => l.trim()).filter(Boolean);
  const checklistItems = [];

  lines.forEach(line => {
    if (line.startsWith("- [ ]") || line.startsWith("- [x]") || line.startsWith("* [ ]")) {
      const text = line.replace(/^[\-\*]\s*\[[\s\x]\]\s*/, "").trim();
      checklistItems.push(text);
    }
  });

  if (checklistItems.length === 0) {
    return (
      <div className="text-sm leading-7 text-[#5B625C]">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="grid gap-px border border-[#E3E3DD] bg-[#E3E3DD] sm:grid-cols-2">
      {checklistItems.map((item, idx) => (
        <div key={idx} className="flex items-start gap-3 bg-[#F8F7F3] p-4 sm:p-5">
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#465B9E] bg-white text-[#465B9E]">
            <Check className="h-3.5 w-3.5" />
          </div>

          <div className="text-sm leading-6 text-[#17201C]">
            <ReactMarkdown components={{ p: ({ children }) => <span>{children}</span> }}>
              {item}
            </ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  );
}

