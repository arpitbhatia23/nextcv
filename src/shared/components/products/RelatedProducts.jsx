import Link from "next/link";
import { FileText, Sparkles, Globe, Share2, ArrowRight } from "lucide-react";

const products = [
  {
    href: "/ai-resume-builder",
    title: "AI Resume Builder",
    description: "Build an ATS-ready resume with AI bullet optimization and clean typography.",
    icon: FileText,
  },
  {
    href: "/ai-cover-letter-generator",
    title: "AI Cover Letter Generator",
    description: "Generate tailored cover letters tailored to your job description and resume.",
    icon: Sparkles,
  },
  {
    href: "/shareable-resume",
    title: "Shareable Resume Link",
    description: "Publish your resume online with privacy controls and instant recruiter access.",
    icon: Share2,
  },
  {
    href: "/resume-to-portfolio",
    title: "Resume-to-Portfolio Builder",
    description: "Convert your resume data into a modern personal portfolio website.",
    icon: Globe,
  },
];

/**
 * RelatedProducts
 *
 * Internal cross-linking grid for product pages.
 */
export default function RelatedProducts({ currentPath }) {
  const filtered = products.filter(p => p.href !== currentPath);

  return (
    <section className="border-t border-[#E3E2DC] bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
            Connected Product Suite
          </p>
          <h2 className="mt-3 font-serif text-2xl text-[#17201C] sm:text-3xl">
            More tools to advance your career
          </h2>
          <p className="mt-2 text-sm text-[#5B625C]">
            Explore other features designed to help you land interviews faster.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(product => {
            const Icon = product.icon;
            return (
              <Link
                key={product.href}
                href={product.href}
                className="group flex flex-col justify-between border border-[#E3E2DC] bg-[#FAF9F6] p-6 transition-all duration-200 hover:border-[#465B9E] hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center border border-[#E3E2DC] bg-white text-[#465B9E] transition-colors group-hover:border-[#465B9E]/30 group-hover:bg-[#EEF0F7]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                    {product.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#465B9E] group-hover:text-[#344B93]">
                  <span>Explore feature</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

