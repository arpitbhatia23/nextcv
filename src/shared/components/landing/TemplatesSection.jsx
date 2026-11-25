"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Eye, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import resumeTemplateCatalog from "@/shared/utils/resumeTemplateCatlog";
import BuildButton from "./BuildButton";
const filters = ["All", "ATS", "Modern", "Classic", "Tech", "Creative", "Freshers"];

const catalogTemplates = resumeTemplateCatalog.flatMap(tier =>
  tier.templates.map(template => ({
    ...template,
    tierName: tier.tierName,
  }))
);

// Homepage showcase — deliberately curated, not the entire catalog
const templates = [
  {
    image: "/milimalist.webp",
    title: "Minimal",
    catalogKey: "MinimalistTemplate",
    audience: "Software engineers · Freshers · MNC applications",
    categories: ["ATS", "Freshers"],
    alt: "Minimal resume layout preview",
  },
  {
    image: "/classic.webp",
    title: "Classic",
    catalogKey: "classicTemplate",
    audience: "Business roles · Traditional industries",
    categories: ["ATS", "Classic"],
    alt: "Classic resume layout preview",
  },
  {
    image: "/modern.webp",
    title: "Modern",
    catalogKey: "modernTemplate",
    audience: "Early-career professionals · Business roles",
    categories: ["Modern", "Freshers"],
    alt: "Modern resume layout preview",
  },
  {
    image: "/techdark.webp",
    title: "Tech",
    catalogKey: "TechDark",
    audience: "Developers · Engineering · Digital teams",
    categories: ["Tech", "Modern"],
    alt: "Technology resume layout preview",
  },
  {
    image: "/creativeteal.webp",
    title: "Creative",
    catalogKey: "CreativeTeal",
    audience: "Designers · Marketing · Creative roles",
    categories: ["Creative", "Modern"],
    alt: "Creative resume layout preview",
  },
  {
    image: "/professionalclean.webp",
    title: "Professional",
    catalogKey: "ProfessionalClean",
    audience: "Students · Graduates · First applications",
    categories: ["ATS", "Classic", "Freshers"],
    alt: "Professional resume layout preview",
  },
];

export default function TemplatesSection({
  showViewAll = true,
  maxTemplates = 6,
  title = "Resume Templates for Different Career Goals",
  description = "Choose a resume template that fits your experience and career goals, then personalize it with your education, skills, projects, and work history.",
} = {}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [preview, setPreview] = useState(null);

  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  // Connect curated homepage templates to actual catalog data
  const templatesWithPrices = templates.map(template => {
    const catalogTemplate = catalogTemplates.find(
      item => item.templateName === template.catalogKey
    );

    return {
      ...template,
      tierName: catalogTemplate?.tierName ?? "Standard",
      price: catalogTemplate?.priceDiscounted ?? 99,
    };
  });

  // Category filtering + homepage display limit
  const filteredTemplates = templatesWithPrices.filter(template => {
    return activeFilter === "All" || template.categories.includes(activeFilter);
  });

  const visibleTemplates = filteredTemplates.slice(0, maxTemplates);

  // Preview modal keyboard handling and focus management
  useEffect(() => {
    if (!preview) {
      triggerRef.current?.focus();
      triggerRef.current = null;
      return;
    }

    closeButtonRef.current?.focus();

    const handleKeyDown = event => {
      if (event.key === "Escape") {
        setPreview(null);
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [preview]);

  return (
    <section id="templates" className="bg-[#F8F7F3] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div className="flex flex-col gap-5 border-b border-[#e2e0d9] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#111111]">
              A good starting point
            </p>

            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
              {title}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#626962]">{description}</p>
          </div>

          {showViewAll && (
            <Link
              href="/templates"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#111111] underline decoration-[#8c8c85] underline-offset-4 hover:text-[#000000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
            >
              View all resume templates
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* Category filters */}
        <div
          className="mt-6 flex gap-2 overflow-x-auto pb-2"
          role="group"
          aria-label="Filter resume templates"
        >
          {filters.map(filter => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              size="sm"
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="min-h-10 shrink-0 px-3.5 text-xs font-medium"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Template grid */}
        <div className="mt-5 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTemplates.map((template, index) => (
            <article key={template.catalogKey} className="group min-w-0">
              {/* Image / preview */}
              <button
                type="button"
                onClick={event => {
                  triggerRef.current = event.currentTarget;
                  setPreview(template);
                }}
                className="relative block aspect-4/3 w-full overflow-hidden border border-[#dfded8] bg-[#eeede8] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2"
                aria-label={`Preview ${template.title} resume template`}
              >
                <Image
                  src={template.image}
                  alt={template.alt}
                  fill
                  priority={index === 0 && activeFilter === "All"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />

                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 border border-[#deded8] bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-[#333e36]">
                  <Eye aria-hidden="true" className="h-3.5 w-3.5" />
                  Preview
                </span>
              </button>

              {/* Template details */}
              <div className="flex items-start justify-between gap-4 pt-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#202a23]">{template.title}</h3>

                  <p className="mt-1.5 text-xs leading-5 text-[#697068]">{template.audience}</p>

                  <span className="mt-2 inline-flex border border-[#dfded8] bg-[#f2f1ec] px-2 py-1 text-xs font-semibold text-[#111111]">
                    {template.tierName} · ₹{template.price}
                  </span>
                </div>

                <BuildButton className="min-h-10 shrink-0 px-3 py-2 text-xs">
                  Use Template
                </BuildButton>
              </div>
            </article>
          ))}
        </div>

        {/* Empty state */}
        {visibleTemplates.length === 0 && (
          <div className="mt-10 border border-[#e2e0d9] bg-white p-10 text-center">
            <p className="text-sm text-[#626962]">No templates found for this category.</p>

            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setActiveFilter("All")}
            >
              View all templates
            </Button>
          </div>
        )}

        {/* Bottom CTA */}
        {showViewAll && (
          <div className="mt-10 flex flex-col items-start gap-3 border-t border-[#e2e0d9] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#626962]">
              Find a layout that works for your next application.
            </p>

            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#111111] hover:text-[#000000]"
            >
              Explore all templates
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Preview modal */}
      {preview && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-[#111916]/75 p-4"
          onMouseDown={event => {
            if (event.target === event.currentTarget) {
              setPreview(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-preview-title"
            ref={dialogRef}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden border border-white/20 bg-[#f8f7f3] shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#e1dfd7] px-4 py-3 sm:px-5">
              <div>
                <h3 id="template-preview-title" className="text-sm font-semibold text-[#202a23]">
                  {preview.title} template
                </h3>

                <p className="mt-0.5 text-xs text-[#687068]">
                  {preview.tierName} · ₹{preview.price} · {preview.audience}
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                ref={closeButtonRef}
                type="button"
                onClick={() => setPreview(null)}
                aria-label="Close template preview"
                className="shrink-0 text-[#505951] hover:bg-[#ebeae4]"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </Button>
            </div>

            {/* Preview image */}
            <div className="relative min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              <div className="relative mx-auto aspect-4/3 max-h-[65vh] w-full max-w-xl">
                <Image
                  src={preview.image}
                  alt={preview.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex flex-col gap-3 border-t border-[#e1dfd7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="flex items-center gap-2 text-xs text-[#626962]">
                <Check aria-hidden="true" className="h-4 w-4 text-[#111111]" />
                Free to build; pay once when ready to download.
              </p>

              <BuildButton className="min-h-10 px-4 py-2 text-xs">Use Template</BuildButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
