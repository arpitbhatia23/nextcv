"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { CheckCircle2, LayoutTemplate, Sparkles, ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getTemplateByName } from "@/modules/resume/services/templateMap";
import useResumeStore from "@/store/useResumeStore";
import { Button } from "@/shared/components/ui/button";
import { templatesMetadata } from "@/shared/utils/template-metadata";

const tierStyles = {
  basic: "bg-slate-50 text-slate-700 border-slate-200",
  standard: "bg-blue-50 text-blue-700 border-blue-100",
  premium: "bg-amber-50 text-amber-700 border-amber-100",
  elite: "bg-purple-50 text-purple-700 border-purple-100",
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
    >
      {/* Header */}
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-3">
          <div className="flex w-fit items-center gap-2 rounded-full bg-indigo-50/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600 md:text-xs">
            <Zap className="h-3 w-3 fill-indigo-600" />

            <span>Step 01 — Design Strategy</span>
          </div>

          <h2 className="text-lg font-black leading-tight tracking-tight text-slate-900 md:text-xl">
            Select your professional <span className="text-indigo-600">canvas.</span>
          </h2>

          <p className="max-w-xl text-xs leading-5 text-slate-500 md:text-sm">
            Choose from recruiter-vetted, ATS-optimized templates designed to improve readability
            and maximize your callback opportunities.
          </p>
        </div>

        <div className="hidden items-center gap-4 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition-shadow hover:shadow-md lg:flex">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(item => (
              <div
                key={item}
                className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-100"
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

          <div className="text-sm font-bold leading-tight text-slate-400">
            TRUSTED BY
            <br />
            <span className="font-black text-slate-900">12,000+ experts</span>
          </div>
        </div>
      </div>

      {/* Tier tabs */}
      <div className="sticky top-0 z-30 -mx-1 bg-white/90 px-1 py-3 backdrop-blur-xl">
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
                className={`
                  shrink-0
                  rounded-xl
                  border
                  px-4
                  py-2
                  text-xs
                  font-bold
                  transition-all
                  duration-200
                  md:text-sm
                  ${
                    isActive
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600"
                  }
                `}
              >
                {tab.label}

                <span
                  className={`
                    ml-2
                    rounded-md
                    px-1.5
                    py-0.5
                    text-[10px]
                    ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}
                  `}
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
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 text-center">
          <div className="mb-4 rounded-full bg-white p-4 shadow-sm">
            <LayoutTemplate className="h-8 w-8 text-slate-400" />
          </div>

          <h3 className="font-bold text-slate-900">No templates available</h3>

          <p className="mt-2 max-w-md text-sm text-slate-500">
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
                      bg-white
                      transition-all
                      duration-500
                      ${
                        isSelected
                          ? "scale-[1.02] ring-[3px] ring-indigo-600 ring-offset-4 shadow-2xl"
                          : "ring-1 ring-slate-200 hover:-translate-y-2 hover:ring-indigo-400/50 hover:shadow-xl"
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

                      <div className="absolute inset-0 bg-indigo-900/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div
                        className={`
                            absolute
                            bottom-3
                            left-3
                            rounded-lg
                            border
                            px-2
                            py-0.5
                            text-[8px]
                            font-black
                            uppercase
                            tracking-widest
                            backdrop-blur-md
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                            ${tierStyles[tier] || tierStyles.standard}
                          `}
                      >
                        {tier}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-300">
                      <div className="rounded-full bg-slate-50 p-4">
                        <LayoutTemplate className="h-8 w-8 opacity-40" />
                      </div>

                      <span className="text-xs font-bold uppercase tracking-wider">No Preview</span>
                    </div>
                  )}

                  {/* Selected icon */}
                  {isSelected && (
                    <div className="absolute right-4 top-4 z-10 animate-in rounded-full bg-indigo-600 p-2 text-white shadow-lg duration-500 zoom-in">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                  )}

                  {/* Badge */}
                  {badge && (
                    <div className="absolute left-4 top-4 z-10 rounded-xl border border-indigo-50 bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-tight text-indigo-600 shadow-sm backdrop-blur-md">
                      <Sparkles className="mb-0.5 mr-1 inline-block h-3 w-3" />

                      {badge}
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                    <Button
                      type="button"
                      size="sm"
                      onClick={event => {
                        event.stopPropagation();
                        handleSelect(key);
                      }}
                      className="scale-90 rounded-xl bg-white px-6 py-5 text-xs font-black text-indigo-600 shadow-2xl transition-transform duration-300 hover:bg-white/90 group-hover:scale-100"
                    >
                      SELECT DESIGN
                    </Button>
                  </div>
                </div>

                {/* Template information */}
                <div className="mt-4 px-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600 md:text-base">
                      {label}
                    </h4>

                    {templateData?.tag && (
                      <span className="shrink-0 rounded-md bg-indigo-50 px-2 py-0.5 text-[10px] font-black text-indigo-500/60">
                        #{templateData.tag}
                      </span>
                    )}
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-black text-slate-900">₹{discountedPrice}</span>

                      {originalPrice > discountedPrice && (
                        <span className="text-[10px] text-slate-400 line-through">
                          ₹{originalPrice}
                        </span>
                      )}
                    </div>

                    <div className="h-px grow bg-slate-100" />

                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 transition-colors group-hover:text-indigo-600">
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
          <div className="mx-auto flex max-w-lg items-center justify-between rounded-xl border border-white/20 bg-slate-900/95 p-3 text-white shadow-2xl ring-4 ring-slate-900/20 backdrop-blur-xl md:p-4">
            <div className="flex items-center gap-4 pl-2">
              <div className="h-12 w-10 shrink-0 overflow-hidden rounded-sm border border-white/10 bg-white/10 p-1">
                {selectedTemplateData.image ? (
                  <Image
                    src={selectedTemplateData.image}
                    width={48}
                    height={56}
                    className="h-full w-full rounded-sm object-cover"
                    alt={`${selectedTemplateData.label} selected template`}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <LayoutTemplate className="h-4 w-4 text-white/40" />
                  </div>
                )}
              </div>

              <div className="hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  Design selected
                </p>

                <h5 className="text-sm font-semibold uppercase tracking-tight">
                  {selectedTemplateData.label}
                </h5>
              </div>
            </div>

            <Button
              type="button"
              disabled={isPending}
              onClick={() => handleSelect(selectedTemplate)}
              className="group h-10 rounded-md bg-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 hover:bg-indigo-500 active:scale-95 sm:px-8"
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
