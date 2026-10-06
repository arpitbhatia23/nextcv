import React from "react";

export function CareerTableOfContents({ sections }) {
  const validSections = (sections || []).filter(sec => sec?.heading && sec?.content && sec.content.trim());

  if (validSections.length === 0) return null;

  return (
    <nav className="border border-[#E3E3DD] bg-white/70 p-6 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
        ON THIS PAGE
      </p>

      <ol className="mt-5 space-y-3">
        {validSections.map((sec, idx) => {
          const num = String(idx + 1).padStart(2, "0");

          return (
            <li key={sec.id || idx}>
              <a
                href={`#${sec.id}`}
                className="group flex items-start gap-3 text-sm transition hover:text-[#344B93]"
              >
                <span className="font-mono text-xs font-semibold text-[#465B9E]/80 transition group-hover:text-[#344B93]">
                  {num}
                </span>

                <span className="text-[#5B625C] transition group-hover:text-[#17201C] group-hover:underline decoration-[#465B9E]/40 underline-offset-4">
                  {sec.heading}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
