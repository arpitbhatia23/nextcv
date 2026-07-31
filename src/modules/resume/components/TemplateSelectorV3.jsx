"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { CheckCircle2, LayoutTemplate, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getTemplateByName } from "@/modules/resume/services/templateMap";
import useResumeStore from "@/store/useResumeStore";
import { Button } from "@/shared/components/ui/button";
import { templatesMetadata } from "@/shared/utils/template-metadata";

/* Fonts: Fraunces for the letterhead headline, IBM Plex Mono for
   eyebrows, tier tabs, badges, and prices. */
const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const tierStyles = {
  basic: { color: "#6B7280", border: "#E4E2DC" },
  standard: { color: "#0F6E63", border: "#0F6E63" },
  premium: { color: "#B3382C", border: "#B3382C" },
  elite: { color: "#8A6A2F", border: "#8A6A2F" },
};

const tierTabs = [
  {
    key: "basic",
    label: "Basic",
  },
  {
    key: "standard",
    label: "Standard",
  },
  {
    key: "premium",
    label: "Premium",
  },
  {
    key: "elite",
    label: "Elite",
  },
];

const templates = templatesMetadata;

const TemplateSelectorV3 = ({ onSelect, next }) => {
  const selectedTemplate = useResumeStore(state => state.selectedTemplate);

  const setSelectedTemplate = useResumeStore(state => state.setSelectedTemplate);

  const router = useRouter();

  const [activeTier, setActiveTier] = useState("standard");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    router.prefetch("/dashboard/builder/basicInfo");
  }, [router]);

  const templatesWithData = useMemo(() => {
    return templates.map(template => {
      const templateData = getTemplateByName(template.key);

      return {
        ...template,
        templateData,
        tier: templateData?.tier?.toLowerCase()?.trim() || "standard",
      };
    });
  }, []);

  const filteredTemplates = useMemo(() => {
    return templatesWithData.filter(template => template.tier === activeTier);
  }, [activeTier, templatesWithData]);

  const templateCounts = useMemo(() => {
    return templatesWithData.reduce(
      (counts, template) => {
        if (counts[template.tier] !== undefined) {
          counts[template.tier] += 1;
        }

        return counts;
      },
      {
        basic: 0,
        standard: 0,
        premium: 0,
        elite: 0,
      }
    );
  }, [templatesWithData]);

  const selectedTemplateData = useMemo(() => {
    return templatesWithData.find(template => template.key === selectedTemplate);
  }, [selectedTemplate, templatesWithData]);

  const handleSelect = templateKey => {
    if (!templateKey || isPending) {
      return;
    }

    startTransition(() => {
      setSelectedTemplate(templateKey);

      if (typeof onSelect === "function") {
        onSelect(templateKey);
        return;
      }

      if (typeof next === "function") {
        next();
        return;
      }

      router.push("/dashboard/builder/basicInfo");
    });
  };

  return (
    <div
      className={`
        space-y-8
        p-4
        animate-in
        fade-in
        slide-in-from-bottom-4
        duration-700
        md:space-y-10
        md:p-6
        lg:p-8
        ${isPending ? "pointer-events-none opacity-80" : ""}
      `}
      style={{ backgroundColor: "#F7F7F5" }}
    >
      <FontImports />

      {/* Header */}
      <div
        className="flex flex-col justify-between gap-6 border-b-2 pb-8 md:flex-row md:items-end"
        style={{ borderColor: "#1C2333" }}
      >
        <div className="space-y-3">
          <div className="font-mono text-[11px] tracking-widest" style={{ color: "#B3382C" }}>
            STEP 01 — DESIGN STRATEGY
          </div>

          <h2
            className="font-display text-xl font-medium leading-tight md:text-2xl"
            style={{ color: "#1C2333" }}
          >
            Select your professional canvas.
          </h2>

          <p className="max-w-xl text-xs leading-5 md:text-sm" style={{ color: "#6B7280" }}>
            Choose from recruiter-vetted, ATS-optimized templates designed to improve readability
            and maximize your callback opportunities.
          </p>
        </div>

        <div
          className="hidden items-center gap-4 border px-4 py-3 lg:flex"
          style={{ borderColor: "#E4E2DC", backgroundColor: "#FFFFFF" }}
        >
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(item => (
              <div
                key={item}
                className="h-10 w-10 overflow-hidden border-2 bg-slate-100"
                style={{ borderColor: "#FFFFFF" }}
              >
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item + 10}`}
                  width={40}
                  height={40}
                  alt={`NextCV user ${item}`}
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div
            className="font-mono text-[10px] leading-tight tracking-wide"
            style={{ color: "#B7B5AC" }}
          >
            TRUSTED BY
            <br />
            <span className="font-bold" style={{ color: "#1C2333" }}>
              12,000+ EXPERTS
            </span>
          </div>
        </div>
      </div>

      {/* Tier tabs */}
      <div
        className="sticky top-0 z-30 -mx-1 px-1 py-3 backdrop-blur-xl"
        style={{ backgroundColor: "rgba(247,247,245,0.9)" }}
      >
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Template pricing tiers"
        >
          {tierTabs.map(tab => {
            const isActive = activeTier === tab.key;
            const count = templateCounts[tab.key] ?? 0;

            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTier(tab.key)}
                className="shrink-0 rounded-none border px-4 py-2 font-mono text-xs tracking-widest transition-all duration-200"
                style={
                  isActive
                    ? { borderColor: "#1C2333", backgroundColor: "#1C2333", color: "#FFFFFF" }
                    : { borderColor: "#E4E2DC", backgroundColor: "#FFFFFF", color: "#6B7280" }
                }
              >
                {tab.label.toUpperCase()}

                <span
                  className="ml-2 px-1.5 py-0.5 text-[10px]"
                  style={
                    isActive
                      ? { backgroundColor: "rgba(255,255,255,0.15)", color: "#FFFFFF" }
                      : { backgroundColor: "#F7F7F5", color: "#B7B5AC" }
                  }
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* No templates state */}
      {filteredTemplates.length === 0 && (
        <div
          className="flex min-h-64 flex-col items-center justify-center border px-6 text-center"
          style={{ borderStyle: "dashed", borderColor: "#D8D6CE", backgroundColor: "#FBFBF9" }}
        >
          <div className="mb-4 rounded-full p-4" style={{ backgroundColor: "#FFFFFF" }}>
            <LayoutTemplate className="h-8 w-8" style={{ color: "#C9C7BF" }} strokeWidth={1.5} />
          </div>

          <h3 className="font-display font-medium" style={{ color: "#1C2333" }}>
            No templates available
          </h3>

          <p className="mt-2 max-w-md text-sm" style={{ color: "#6B7280" }}>
            There are currently no templates available in this category.
          </p>
        </div>
      )}

      {/* Template grid */}
      {filteredTemplates.length > 0 && (
        <div
          id="tour-template-selection-v3"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5"
        >
          {filteredTemplates.map((template, index) => {
            const { templateData, tier, key, image, label } = template;

            const isSelected = selectedTemplate === key;

            const badge = templateData?.badge;

            const discountedPrice = templateData?.priceDiscounted ?? 49;

            const originalPrice = templateData?.price ?? 149;

            const tierStyle = tierStyles[tier] || tierStyles.standard;

            return (
              <article
                key={key}
                className="group flex cursor-pointer flex-col"
                onClick={() => handleSelect(key)}
                onKeyDown={event => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleSelect(key);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Select ${label} template`}
              >
                <div
                  className={`
                      relative
                      aspect-[3/4.2]
                      overflow-hidden
                      rounded-none
                      border
                      transition-all
                      duration-500
                      ${isSelected ? "shadow-xl" : "hover:-translate-y-1"}
                    `}
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: isSelected ? "#1C2333" : "#E4E2DC",
                    borderWidth: isSelected ? "2px" : "1px",
                  }}
                >
                  {image ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={image}
                        alt={`${label} resume template`}
                        fill
                        sizes="
                            (max-width: 640px) 50vw,
                            (max-width: 1024px) 33vw,
                            (max-width: 1280px) 25vw,
                            20vw
                          "
                        className="object-cover"
                        priority={activeTier === "standard" && index === 0}
                      />

                      <div
                        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ backgroundColor: "rgba(28,35,51,0.08)" }}
                      />

                      <div
                        className="absolute bottom-3 left-3 border px-2 py-0.5 font-mono text-[8px] uppercase tracking-widest backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1"
                        style={{
                          borderColor: tierStyle.border,
                          color: tierStyle.color,
                          backgroundColor: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {tier}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="flex h-full flex-col items-center justify-center gap-3"
                      style={{ color: "#C9C7BF" }}
                    >
                      <div className="rounded-full p-4" style={{ backgroundColor: "#F7F7F5" }}>
                        <LayoutTemplate className="h-8 w-8 opacity-40" />
                      </div>

                      <span className="font-mono text-xs uppercase tracking-wider">No Preview</span>
                    </div>
                  )}

                  {/* Selected icon — postmark style */}
                  {isSelected && (
                    <div
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full animate-in duration-500 zoom-in"
                      style={{
                        border: "1.5px dashed #1C2333",
                        backgroundColor: "#FFFFFF",
                        color: "#1C2333",
                      }}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}

                  {/* Badge */}
                  {badge && (
                    <div
                      className="absolute left-3 top-3 z-10 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-tight backdrop-blur-md"
                      style={{
                        borderColor: "#E4E2DC",
                        backgroundColor: "rgba(255,255,255,0.95)",
                        color: "#B3382C",
                      }}
                    >
                      <Sparkles className="mb-0.5 mr-1 inline-block h-3 w-3" />

                      {badge}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: "rgba(28,35,51,0.55)" }}
                  >
                    <Button
                      type="button"
                      size="sm"
                      onClick={event => {
                        event.stopPropagation();
                        handleSelect(key);
                      }}
                      className="rounded-none px-6 py-5 font-mono text-xs shadow-2xl transition-transform duration-300"
                      style={{ backgroundColor: "#FFFFFF", color: "#1C2333" }}
                    >
                      SELECT DESIGN
                    </Button>
                  </div>
                </div>

                {/* Template information */}
                <div className="mt-4 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className="truncate text-sm font-semibold transition-colors md:text-base"
                      style={{ color: "#1C2333" }}
                    >
                      {label}
                    </h4>

                    {templateData?.tag && (
                      <span className="shrink-0 font-mono text-[10px]" style={{ color: "#B7B5AC" }}>
                        #{templateData.tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-2 font-mono">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold" style={{ color: "#1C2333" }}>
                        ₹{discountedPrice}
                      </span>

                      {originalPrice > discountedPrice && (
                        <span className="text-[10px] line-through" style={{ color: "#B7B5AC" }}>
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="h-px grow" style={{ backgroundColor: "#E4E2DC" }} />

                    <span
                      className="text-[10px] uppercase tracking-widest transition-colors"
                      style={{ color: "#B7B5AC" }}
                    >
                      Preview ↗
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Floating selected-template action bar */}
      {selectedTemplate && selectedTemplateData && (
        <div className="fixed bottom-6 left-0 right-0 z-50 animate-in px-2 duration-500 fade-in slide-in-from-bottom-10">
          <div
            className="mx-auto flex max-w-lg items-center justify-between rounded-none border p-3 shadow-2xl md:p-4"
            style={{ backgroundColor: "#1C2333", borderColor: "#1C2333" }}
          >
            <div className="flex items-center gap-4 pl-2">
              <div
                className="h-12 w-10 shrink-0 overflow-hidden border p-1"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                }}
              >
                {selectedTemplateData.image ? (
                  <Image
                    src={selectedTemplateData.image}
                    width={48}
                    height={56}
                    className="h-full w-full object-cover"
                    alt={`${selectedTemplateData.label} selected template`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <LayoutTemplate className="h-4 w-4 text-white/40" />
                  </div>
                )}
              </div>

              <div className="hidden sm:block">
                <p className="font-mono text-[10px] tracking-widest" style={{ color: "#B3382C" }}>
                  DESIGN SELECTED
                </p>

                <h5 className="text-sm font-semibold uppercase tracking-tight text-white">
                  {selectedTemplateData.label}
                </h5>
              </div>
            </div>

            <Button
              type="button"
              disabled={isPending}
              onClick={() => handleSelect(selectedTemplate)}
              className="group h-10 rounded-none px-5 font-mono text-sm text-white shadow-lg transition-all sm:px-8"
              style={{ backgroundColor: "#B3382C" }}
            >
              {isPending ? "LOADING..." : "START BUILDING"}

              {!isPending && (
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TemplateSelectorV3);
