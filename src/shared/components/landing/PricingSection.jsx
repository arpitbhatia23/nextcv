import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import BuildButton from "./BuildButton";

const inclusions = [
  "Create and edit your resume before purchasing",
  "Choose a one-time template tier when ready to download",
  "Optional sharing, portfolio, and cover-letter features in selected tiers",
];

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-[#F8F7F3] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10  border border-[#deddd6] bg-white p-6 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
              Straightforward pricing
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
              Build for free.
              <br />
              Pay once when you’re ready to download.
            </h2>
            <div className="mt-5 flex items-baseline gap-2">
              <span className="font-serif text-5xl text-[#25352c]">₹49+</span>
              <span className="text-sm text-[#667068]">one-time payment</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#737a72]">
              Template tiers range from ₹49 to ₹399. No monthly subscription.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BuildButton />
              <Link
                href="/pricing"
                className="inline-flex min-h-12 items-center gap-2  border border-[#c9cbc8] px-4 py-3 text-sm font-semibold text-[#303a32] transition-colors hover:border-[#8995bd] hover:bg-[#fafaf8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6] focus-visible:ring-offset-2"
              >
                See all plans <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <ul className="divide-y divide-[#ecebe5] border-y border-[#ecebe5]">
            {inclusions.map(item => (
              <li key={item} className="flex gap-3 py-4 text-sm leading-6 text-[#505951]">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#5268a8]" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
