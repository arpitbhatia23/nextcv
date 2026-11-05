import { BadgeIndianRupee, FilePenLine, ShieldCheck, Sparkles } from "lucide-react";

const valueProps = [
  {
    icon: BadgeIndianRupee,
    title: "Pay once to download",
    description: "Choose a template tier when you are ready. There is no monthly subscription.",
  },
  {
    icon: FilePenLine,
    title: "Build before you buy",
    description: "Create, edit and preview your resume for free before choosing a download tier.",
  },
  {
    icon: Sparkles,
    title: "AI writing assistance",
    description: "Refine summaries and experience bullets, then review every suggestion yourself.",
  },
  {
    icon: ShieldCheck,
    title: "Clear, professional layouts",
    description:
      "Use readable resume templates and check how your content matches a job description.",
  },
];

export default function ValuePropsSection() {
  return (
    <section
      aria-labelledby="why-nextcv-heading"
      className="border-b border-[#e7e5df] bg-white py-12 sm:py-14"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-7 md:grid-cols-[0.7fr_1.3fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
              A clearer way to get started
            </p>
            <h2
              id="why-nextcv-heading"
              className="mt-3 max-w-sm font-serif text-2xl leading-tight text-[#17201C] sm:text-3xl"
            >
              Made for your next application, not another subscription.
            </h2>
          </div>
          <div className="grid gap-x-7 gap-y-6 sm:grid-cols-2">
            {valueProps.map(({ icon: Icon, title, description }) => (
              <article key={title} className="flex gap-3 border-t border-[#e8e7e1] pt-4">
                <Icon aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#5268a8]" />
                <div>
                  <h3 className="text-sm font-semibold text-[#202a23]">{title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-[#626962]">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
