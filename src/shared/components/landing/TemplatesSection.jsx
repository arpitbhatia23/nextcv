"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Eye, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import BuildButton from "./BuildButton";

const filters = ["All", "ATS", "Modern", "Classic", "Tech", "Creative", "Freshers"];

const templates = [
  {
    image: "/milimalist.webp",
    title: "Minimal",
    audience: "Software engineers · Freshers · MNC applications",
    categories: ["ATS", "Freshers"],
    alt: "Minimal resume layout preview",
  },
  {
    image: "/classic.webp",
    title: "Classic",
    audience: "Business roles · Traditional industries · Experienced candidates",
    categories: ["ATS", "Classic"],
    alt: "Classic resume layout preview",
  },
  {
    image: "/modern.webp",
    title: "Modern",
    audience: "Early-career professionals · Product and operations roles",
    categories: ["Modern", "Freshers"],
    alt: "Modern resume layout preview",
  },
  {
    image: "/techdark.webp",
    title: "Tech",
    audience: "Developers · Engineering roles · Digital teams",
    categories: ["Tech", "Modern"],
    alt: "Technology resume layout preview",
  },
  {
    image: "/creativeteal.webp",
    title: "Creative",
    audience: "Designers · Marketing · Creative portfolios",
    categories: ["Creative", "Modern"],
    alt: "Creative resume layout preview",
  },
  {
    image: "/professionalclean.webp",
    title: "Professional",
    audience: "Students · Graduates · First applications",
    categories: ["ATS", "Classic", "Freshers"],
    alt: "Professional resume layout preview",
  },
];

export default function TemplatesSection({
  showViewAll = true,
  title = "Choose a format for your next move.",
  description = "Explore a few thoughtfully designed starting points. Choose the structure that suits your experience and role.",
} = {}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [preview, setPreview] = useState(null);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);

  const visibleTemplates =
    activeFilter === "All"
      ? templates
      : templates.filter(template => template.categories.includes(activeFilter));

  useEffect(() => {
    if (!preview) {
      triggerRef.current?.focus();
      triggerRef.current = null;
      return undefined;
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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [preview]);

  return (
    <section id="templates" className="bg-[#F8F7F3] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-5 border-b border-[#e2e0d9] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
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
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#344b93] underline decoration-[#aeb8d5] underline-offset-4 hover:text-[#26366d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
            >
              View all templates <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}
        </div>

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

        <div className="mt-5 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTemplates.map((template, index) => (
            <article key={template.title} className="group min-w-0">
              <button
                type="button"
                onClick={event => {
                  triggerRef.current = event.currentTarget;
                  setPreview(template);
                }}
                className="relative block aspect-4/3 w-full overflow-hidden  border border-[#dfded8] bg-[#eeede8] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6] focus-visible:ring-offset-2"
                aria-label={`Preview ${template.title} resume template`}
              >
                <Image
                  src={template.image}
                  alt={template.alt}
                  fill
                  unoptimized
                  priority={index === 0 && activeFilter === "All"}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5  border border-[#deded8] bg-white/95 px-2.5 py-1.5 text-[10px] font-semibold text-[#333e36]">
                  <Eye aria-hidden="true" className="h-3.5 w-3.5" /> Preview
                </span>
              </button>
              <div className="flex items-start justify-between gap-4 pt-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-[#202a23]">{template.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-[#697068]">{template.audience}</p>
                </div>
                <BuildButton className="min-h-10 shrink-0 px-3 py-2 text-xs">
                  Use Template
                </BuildButton>
              </div>
            </article>
          ))}
        </div>
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-70 flex items-center justify-center bg-[#111916]/75 p-4"
          onMouseDown={event => {
            if (event.target === event.currentTarget) setPreview(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-preview-title"
            ref={dialogRef}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden  border border-white/20 bg-[#f8f7f3] shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-[#e1dfd7] px-4 py-3 sm:px-5">
              <div>
                <h3 id="template-preview-title" className="text-sm font-semibold text-[#202a23]">
                  {preview.title} template
                </h3>
                <p className="mt-0.5 text-xs text-[#687068]">{preview.audience}</p>
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
            <div className="relative min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              <div className="relative mx-auto aspect-4/3 max-h-[65vh] w-full max-w-xl">
                <Image
                  src={preview.image}
                  alt={preview.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 border-t border-[#e1dfd7] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <p className="flex items-center gap-2 text-xs text-[#626962]">
                <Check aria-hidden="true" className="h-4 w-4 text-[#5268a8]" /> Free to build; pay
                once when ready to download.
              </p>
              <BuildButton className="min-h-10 px-4 py-2 text-xs">Use Template</BuildButton>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
