"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { CheckCircle2, LayoutTemplate, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getTemplateByName } from "@/modules/resume/services/templateMap";
import useResumeStore from "@/store/useResumeStore";
import { Button } from "@/shared/components/ui/button";
import { templatesMetadata } from "@/shared/utils/template-metadata";
import posthog from "@/shared/utils/posthog";

const FontImports = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
    .font-display { font-family: 'Fraunces', serif; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  `}</style>
);

const tierStyles = {
  basic: { color: "#5B625C", border: "#E3E2DC", bg: "#F1F0EB" },
  standard: { color: "#0F6E63", border: "#A8D5CD", bg: "#EAF4F2" },
  premium: { color: "#465B9E", border: "#C8CDD9", bg: "#EEF0F7" },
  elite: { color: "#7B551C", border: "#EAD6B5", bg: "#FDF6EA" },
};

const tierTabs = [
  { key: "basic", label: "Basic" },
  { key: "standard", label: "Standard" },
  { key: "premium", label: "Premium" },
  { key: "elite", label: "Elite" },
];

const templates = templatesMetadata;

const TemplateSelectorV3 = ({ onSelect, next }) => {
  const selectedTemplate = useResumeStore(state => state.selectedTemplate);
  const setSelectedTemplate = useResumeStore(state => state.setSelectedTemplate);
  const router = useRouter();

  const [activeTier, setActiveTier] = useState("standard");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    posthog.capture("builder_step_viewed", {
      step: "template_selection",
      step_number: 1,
    });
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
    const template = templatesWithData.find(item => item.key === templateKey);
    posthog.capture("builder_template_selected", {
      template: templateKey,
      template_name: template?.label,
      tier: template?.tier,
      price: template?.templateData?.priceDiscounted ?? 49,
    });
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
        bg-[#F8F7F3]
        text-[#17201C]
        ${isPending ? "pointer-events-none opacity-80" : ""}
      `}
    >
      <FontImports />

      {/* Header */}
      <div className="flex flex-col justify-between gap-6 border-b border-[#E3E2DC] pb-8 md:flex-row md:items-end">
        <div className="space-y-2">
          <div className="font-mono text-[10px] tracking-widest text-[#465B9E]">
            STEP 01 — DESIGN STRATEGY
          </div>

          <h1 className="font-display text-2xl md:text-3xl font-medium leading-tight text-[#17201C]">
            Select your professional canvas.
          </h1>

          <p className="max-w-xl text-xs md:text-sm text-[#5B625C] leading-relaxed">
            Choose from recruiter-vetted, ATS-optimized templates designed to pass screening filters
            and highlight your career impact.
          </p>
        </div>

        <div className="hidden items-center gap-4 border border-[#E3E2DC] rounded-2xl px-4 py-3 bg-white shadow-xs lg:flex">
          <div className="flex -space-x-2.5">
            {[1, 2, 3, 4].map(item => (
              <div
                key={item}
                className="h-8 w-8 rounded-full overflow-hidden border-2 border-white bg-slate-100 shadow-xs"
              >
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item + 10}`}
                  width={32}
                  height={32}
                  alt={`NextCV user ${item}`}
                  unoptimized
                />
              </div>
            ))}
          </div>

          <div className="font-mono text-[10px] leading-tight text-[#8A908B]">
            TRUSTED BY
            <br />
            <span className="font-sans font-semibold text-[#17201C]">
              12,000+ JOB SEEKERS
            </span>
          </div>
        </div>
      </div>

      {/* Tier tabs */}
      <div className="sticky top-0 z-30 -mx-1 px-1 py-3 bg-[#F8F7F3]/95 backdrop-blur-xl border-b border-[#E3E2DC]/60">
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide"
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
                className={`shrink-0 rounded-xl px-4 py-2 font-sans text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-[#465B9E] text-white shadow-xs"
                    : "bg-white border border-[#E3E2DC] text-[#5B625C] hover:bg-[#F1F0EB] hover:text-[#17201C]"
                }`}
              >
                <span>{tab.label}</span>

                <span
                  className={`px-1.5 py-0.5 text-[10px] font-mono rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#F8F7F3] text-[#8A908B]"
                  }`}
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
          className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#C8CDD9] px-6 text-center bg-white"
        >
          <div className="mb-4 rounded-xl p-4 bg-[#EEF0F7] text-[#465B9E]">
            <LayoutTemplate className="h-8 w-8" strokeWidth={1.5} />
          </div>

          <h3 className="font-display font-medium text-lg text-[#17201C]">
            No templates available
          </h3>

          <p className="mt-2 max-w-md text-sm text-[#5B625C]">
            There are currently no templates available in this category.
          </p>
        </div>
      )}

      {/* Template grid */}
      {filteredTemplates.length > 0 && (
        <div
          id="tour-template-selection-v3"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5"
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
                    rounded-2xl
                    border
                    transition-all
                    duration-300
                    bg-white
                    ${
                      isSelected
                        ? "border-[#465B9E] ring-2 ring-[#465B9E]/20 shadow-[0_12px_30px_rgba(70,91,158,0.15)]"
                        : "border-[#E3E2DC] shadow-[0_2px_12px_rgba(23,32,28,0.04)] hover:shadow-[0_10px_30px_rgba(23,32,28,0.08)] hover:-translate-y-1"
                    }
                  `}
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

                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#17201C]/10" />

                      <div
                        className="absolute bottom-3 left-3 border rounded-md px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5"
                        style={{
                          borderColor: tierStyle.border,
                          color: tierStyle.color,
                          backgroundColor: "rgba(255,255,255,0.95)",
                        }}
                      >
                        {tier}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-[#8A908B]">
                      <div className="rounded-xl p-4 bg-[#F8F7F3]">
                        <LayoutTemplate className="h-8 w-8 opacity-40" />
                      </div>
                      <span className="font-mono text-xs uppercase tracking-wider">No Preview</span>
                    </div>
                  )}

                  {/* Selected icon — clean circle check */}
                  {isSelected && (
                    <div className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#465B9E] text-white shadow-md animate-in duration-300 zoom-in">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}

                  {/* Badge */}
                  {badge && (
                    <div className="absolute left-3 top-3 z-10 rounded-md border border-[#E3E2DC] bg-white/95 backdrop-blur-md px-2.5 py-1 font-mono text-[10px] text-[#465B9E] font-medium shadow-xs">
                      <Sparkles className="mb-0.5 mr-1 inline-block h-3 w-3" />
                      {badge}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 bg-[#17201C]/40">
                    <Button
                      type="button"
                      size="sm"
                      onClick={event => {
                        event.stopPropagation();
                        handleSelect(key);
                      }}
                      className="rounded-xl px-5 py-2.5 font-sans font-medium text-xs bg-white text-[#17201C] hover:bg-[#F8F7F3] shadow-lg transition-transform duration-200"
                    >
                      Use Template
                    </Button>
                  </div>
                </div>

                {/* Template information */}
                <div className="mt-3 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="truncate text-sm font-semibold text-[#17201C]">
                      {label}
                    </h4>

                    {templateData?.tag && (
                      <span className="shrink-0 font-mono text-[10px] text-[#8A908B]">
                        #{templateData.tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-1.5 flex items-center gap-2 font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#17201C]">
                        ₹{discountedPrice}
                      </span>

                      {originalPrice > discountedPrice && (
                        <span className="text-[10px] line-through text-[#8A908B]">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="h-px grow bg-[#E3E2DC]" />

                    <span className="text-[10px] uppercase tracking-wider text-[#66706B] group-hover:text-[#465B9E] transition-colors">
                      Choose ↗
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
        <div className="fixed bottom-6 left-0 right-0 z-50 animate-in px-4 duration-500 fade-in slide-in-from-bottom-6">
          <div className="mx-auto flex max-w-lg items-center justify-between rounded-2xl border border-[#E3E2DC] bg-[#17201C] p-3 shadow-2xl md:p-4 text-white">
            <div className="flex items-center gap-3 pl-2">
              <div className="h-12 w-10 shrink-0 overflow-hidden rounded-lg border border-white/20 bg-white/10 p-0.5">
                {selectedTemplateData.image ? (
                  <Image
                    src={selectedTemplateData.image}
                    width={48}
                    height={56}
                    className="h-full w-full object-cover rounded-sm"
                    alt={`${selectedTemplateData.label} selected template`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <LayoutTemplate className="h-4 w-4 text-white/40" />
                  </div>
                )}
              </div>

              <div className="hidden sm:block">
                <p className="font-mono text-[10px] tracking-wider text-[#C8CDD9]">
                  TEMPLATE SELECTED
                </p>

                <h5 className="text-sm font-semibold text-white">
                  {selectedTemplateData.label}
                </h5>
              </div>
            </div>

            <Button
              type="button"
              disabled={isPending}
              onClick={() => handleSelect(selectedTemplate)}
              className="group h-10 rounded-xl px-5 font-sans font-medium text-xs sm:text-sm text-white shadow-md transition-all sm:px-6 bg-[#465B9E] hover:bg-[#344B93]"
            >
              {isPending ? "LOADING..." : "Start Building"}

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
