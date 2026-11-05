import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import BuildButton from "./BuildButton";
import resumeTemplateCatalog from "@/shared/utils/resumeTemplateCatlog";

const availablePrices = resumeTemplateCatalog.flatMap(tier =>
  tier.templates.map(template => template.priceDiscounted)
);
const startingPrice = Math.min(...availablePrices);
const highestPrice = Math.max(...availablePrices);

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
              <span className="font-serif text-5xl text-[#25352c]">₹{startingPrice}+</span>
              <span className="text-sm text-[#667068]">one-time payment</span>
            </div>
            <p className="mt-2 text-xs leading-5 text-[#737a72]">
              Template tiers range from ₹{startingPrice} to ₹{highestPrice}. No monthly
              subscription.
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
          <div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {resumeTemplateCatalog.map(tier => {
                const price = Math.min(...tier.templates.map(template => template.priceDiscounted));

                return (
                  <div key={tier.tierName} className="border border-[#e3e2dc] bg-[#fafaf8] p-3">
                    <p className="text-[10px] font-medium text-[#697068]">{tier.tierName}</p>
                    <p className="mt-1 font-serif text-xl text-[#25352c]">₹{price}</p>
                    <p className="mt-1 text-[10px] text-[#737a72]">one-time</p>
                  </div>
                );
              })}
            </div>
            <ul className="mt-5 divide-y divide-[#ecebe5] border-y border-[#ecebe5]">
              {inclusions.map(item => (
                <li key={item} className="flex gap-3 py-3 text-sm leading-6 text-[#505951]">
                  <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[#5268a8]" />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
