import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function RelatedCareerGuides({ currentSlug, allPages }) {
  if (!allPages || allPages.length === 0) return null;

  // Select 3 related guides excluding current page
  const related = allPages
    .filter(p => p.slug !== currentSlug)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-[#E3E3DD] py-14 sm:py-20">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#465B9E]">
          RECOMMENDED
        </p>

        <h2 className="mt-2 font-serif text-3xl tracking-[-0.025em] text-[#17201C] sm:text-4xl">
          Related Career Guides
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {related.map(item => (
          <Link
            key={item.slug}
            href={`/career/${item.slug}`}
            className="group flex flex-col justify-between border border-[#E3E3DD] bg-white/50 p-6 transition hover:border-[#465B9E] hover:bg-white"
          >
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-[#465B9E]">
                Guide
              </p>

              <h3 className="mt-3 font-serif text-xl text-[#17201C] transition group-hover:text-[#344B93]">
                {item.title}
              </h3>
            </div>

            <div className="mt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-[#17201C] transition group-hover:text-[#344B93]">
              Read Guide
              <ArrowUpRight className="ml-1 h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

