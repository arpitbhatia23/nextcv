import Link from "next/link";
import { ArrowRight, FileText, SearchCheck, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Build",
    description: "Shape your experience into a clear, professional resume with guided AI writing.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Improve",
    description:
      "Compare it with the job description. Find keyword gaps and refine the details that matter.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "Apply",
    description:
      "Finish with a tailored cover letter and a profile you can share wherever you apply.",
    icon: Send,
  },
];

export default function WorkflowSection() {
  return (
    <section id="product" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 border-b border-[#e8e7e1] pb-10 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
              A practical application workflow
            </p>
            <h2 className="mt-3 max-w-lg font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
              From first draft to ready to apply.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-[#626962] md:justify-self-end">
            One connected place to create a resume, make it more relevant to a role, and prepare the
            rest of your application.
          </p>
        </div>
        <div className="grid divide-y divide-[#e8e7e1] md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map(({ number, title, description, icon: Icon }, index) => (
            <article
              key={number}
              className={`relative py-7 md:py-8 ${index ? "md:pl-8" : "md:pr-8"} ${index === 1 ? "md:px-8" : ""}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#899087]">{number}</span>
                <Icon aria-hidden="true" className="h-5 w-5 text-[#5268a8]" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-[#202a23]">{title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-[#626962]">{description}</p>
              {index < steps.length - 1 && (
                <ArrowRight
                  aria-hidden="true"
                  className="mt-5 hidden h-4 w-4 text-[#9ba19a] md:block"
                />
              )}
            </article>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e8e7e1] pt-5 text-xs text-[#697068]">
          <Link
            className="transition-colors hover:text-[#344b93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
            href="/examples"
          >
            Resume examples
          </Link>
          <Link
            className="transition-colors hover:text-[#344b93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
            href="/career"
          >
            Career guides
          </Link>
          <Link
            className="transition-colors hover:text-[#344b93] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
            href="/ai-writer"
          >
            AI Writer
          </Link>
        </div>
      </div>
    </section>
  );
}
