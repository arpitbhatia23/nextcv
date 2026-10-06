import Link from "next/link";
import { ArrowUpRight, Check, Lightbulb, Sparkles } from "lucide-react";

const tools = [
  {
    title: "Bullet generator",
    description: "Turn notes into clear, impact-focused experience bullets.",
  },
  {
    title: "Professional summary",
    description: "Draft a concise introduction from your real background.",
  },
  {
    title: "Skills suggestions",
    description: "Explore relevant skills to consider for your target role.",
  },
  {
    title: "AI Writer",
    description: "Rewrite and refine resume content while keeping your voice.",
  },
];

export default function AIWritingSection() {
  return (
    <section className="bg-[#eef0f5] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="order-2  border border-[#d9dce5] bg-white p-5 shadow-[0_20px_55px_-42px_rgba(28,39,67,0.45)] sm:p-7 lg:order-1">
            <div className="flex items-center justify-between border-b border-[#eceef2] pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#283344]">
                <Sparkles aria-hidden="true" className="h-4 w-4 text-[#5268a8]" /> AI writing ·
                example
              </div>
              <span className="text-[10px] text-[#7a808a]">Experience bullet</span>
            </div>
            <div className="pt-5">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7d8390]">
                Your notes
              </p>
              <p className="mt-2  bg-[#f6f7f8] p-3 text-xs leading-5 text-[#636c77]">
                Worked on checkout page, fixed load times, worked with design team.
              </p>
              <div className="my-4 flex items-center gap-2 text-[10px] font-medium text-[#667bb1]">
                <span className="h-px flex-1 bg-[#dfe3ee]" />
                <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Suggested rewrite{" "}
                <span className="h-px flex-1 bg-[#dfe3ee]" />
              </div>
              <div className=" border border-[#dfe3ed] bg-[#f8f9fc] p-4">
                <p className="text-xs leading-5 text-[#313b4b]">
                  Improved checkout experience by refining the React interface and collaborating
                  with design to reduce friction across key purchase steps.
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#e6e8ef] pt-3">
                  <span className="flex items-center gap-1.5 text-[10px] text-[#626d7c]">
                    <Lightbulb aria-hidden="true" className="h-3.5 w-3.5 text-[#7183b5]" /> Review
                    and edit before using
                  </span>
                  <span className=" bg-white px-2 py-1 text-[9px] text-[#6d7480]">
                    Example content
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
              Useful AI, grounded in your story
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
              AI that works with your resume.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#626a73]">
              Start from your own experience, then use focused writing tools to make it clearer and
              more relevant. Every suggestion stays yours to review.
            </p>
            <ul className="mt-7 divide-y divide-[#d9dce5] border-y border-[#d9dce5]">
              {tools.map(tool => (
                <li key={tool.title} className="flex gap-3 py-4">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#5268a8]" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#263344]">{tool.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-[#69717c]">{tool.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/ai-writer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#344b93] underline decoration-[#aeb8d5] underline-offset-4 transition-colors hover:text-[#26366d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
            >
              Explore AI Writer <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
