"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { ArrowRight, Check, Crown, Globe, LayoutTemplate, Link2, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { getTemplateByName } from "@/modules/resume/services/templateMap";
import useResumeStore from "@/store/useResumeStore";
import { Button } from "@/shared/components/ui/button";
import { templatesMetadata } from "@/shared/utils/template-metadata";
import posthog from "@/shared/utils/posthog";
import { FontImports } from "./fontImport";

const tierTabs = [
  {
    key: "basic",
    label: "Basic",
    subtitle: "Simple & clean",
    description: "A straightforward resume for applications, internships, and first jobs.",
    icon: LayoutTemplate,
    included: ["Clean resume layout", "Essential resume sections"],
  },
  {
    key: "standard",
    label: "Standard",
    subtitle: "Professional design",
    description: "Polished layouts with clear visual hierarchy for a professional presentation.",
    icon: Sparkles,
    included: ["Professional layouts", "Clear section hierarchy"],
  },
  {
    key: "premium",
    label: "Premium",
    subtitle: "Shareable resume",
    description: "A premium resume you can share with recruiters through a dedicated online link.",
    icon: Link2,
    included: ["Premium resume designs", "Shareable resume link"],
  },
  {
    key: "elite",
    label: "Elite",
    subtitle: "Resume + portfolio",
    description: "A resume and online portfolio to present your projects, skills, and experience.",
    icon: Crown,
    included: ["Exclusive resume designs", "Shareable resume link", "Portfolio website"],
  },
];

const tierStyles = {
  basic: "bg-stone-100 text-stone-700",
  standard: "bg-emerald-50 text-emerald-800",
  premium: "bg-indigo-50 text-indigo-800",
  elite: "bg-amber-50 text-amber-800",
};

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

  const templatesWithData = useMemo(
    () =>
      templates.map(template => {
        const templateData = getTemplateByName(template.key);
        const tier = templateData?.tier?.toLowerCase()?.trim() || "standard";
        return { ...template, templateData, tier };
      }),
    []
  );

  const filteredTemplates = useMemo(
    () => templatesWithData.filter(template => template.tier === activeTier),
    [activeTier, templatesWithData]
  );

  const templateCounts = useMemo(
    () =>
      templatesWithData.reduce(
        (counts, template) => {
          if (counts[template.tier] !== undefined) counts[template.tier] += 1;
          return counts;
        },
        { basic: 0, standard: 0, premium: 0, elite: 0 }
      ),
    [templatesWithData]
  );

  const selectedTemplateData = useMemo(
    () => templatesWithData.find(template => template.key === selectedTemplate),
    [selectedTemplate, templatesWithData]
  );

  const currentTier = tierTabs.find(tier => tier.key === activeTier) || tierTabs[1];

  const changeTier = tierKey => {
    setActiveTier(tierKey);
    posthog.capture("template_tier_selected", { tier: tierKey });
  };

  const handleSelect = templateKey => {
    if (!templateKey || isPending) return;

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
    <main
      className={`min-h-screen bg-[#F7F7F5] px-4 pb-32 pt-5 text-[#191D19] sm:px-6 sm:pt-8 lg:px-8 ${
        isPending ? "pointer-events-none opacity-80" : ""
      }`}
    >
      <FontImports />

      <div className="mx-auto max-w-360 space-y-7 sm:space-y-9">
        {/* Page heading */}
        <header className="flex flex-col gap-3 border-b border-[#E5E5DF] pb-6 sm:flex-row sm:items-end sm:justify-between sm:pb-8">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#626B62]">
              <span className="h-1.5 w-1.5 bg-[#536B54]" />
              Step 1 of your resume
            </div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-[34px]">
              Choose your resume template
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#697169] sm:text-[15px]">
              Start with a design that fits your career. You can add your details in the next step.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#697169]">
            <Check className="h-4 w-4 text-[#39734C]" />
            <span>Preview the designs before choosing</span>
          </div>
        </header>

        {/* Compact tier selector */}
        <section aria-label="Choose template tier" className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Browse by style</h2>
              <p className="mt-1 text-sm text-[#737A72]">
                Choose a category to see matching templates.
              </p>
            </div>
            <span className="text-xs text-[#737A72]">
              {filteredTemplates.length} {filteredTemplates.length === 1 ? "template" : "templates"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {tierTabs.map(tier => {
              const active = activeTier === tier.key;
              const TierIcon = tier.icon;

              return (
                <button
                  key={tier.key}
                  type="button"
                  onClick={() => changeTier(tier.key)}
                  aria-pressed={active}
                  className={`flex min-h-19 items-center gap-3 border px-3 py-3 text-left transition-colors sm:px-4 ${
                    active
                      ? "border-[#344B38] bg-[#344B38] text-white shadow-sm"
                      : "border-[#E2E4DD] bg-white text-[#242B24] hover:border-[#B9C2B7] hover:bg-[#FCFCFA]"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center ${
                      active ? "bg-white/10" : tierStyles[tier.key]
                    }`}
                  >
                    <TierIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-semibold">
                      {tier.label}
                      <span
                        className={`text-[10px] font-normal ${
                          active ? "text-white/65" : "text-[#858B83]"
                        }`}
                      >
                        {templateCounts[tier.key]}
                      </span>
                    </span>
                    <span
                      className={`mt-0.5 block text-[11px] ${
                        active ? "text-white/75" : "text-[#737A72]"
                      }`}
                    >
                      {tier.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Prominent tier benefits: wide layout, stronger contrast, unchanged template previews */}
          <div className="relative overflow-hidden border border-[#BFCBBC] bg-[#EEF2EB]">
            <div className="grid lg:grid-cols-[0.8fr_1.6fr]">
              <div className="flex flex-col justify-center border-b border-[#D5DDD1] px-4 py-4 sm:px-5 sm:py-5 lg:border-b-0 lg:border-r lg:px-6 lg:py-5">
                <p className="inline-flex w-fit items-center gap-1.5 bg-[#344B38] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white">
                  <Sparkles className="h-3 w-3" />
                  What’s included
                </p>
                <h3 className="mt-2.5 text-lg font-bold tracking-tight text-[#263629] sm:text-xl">
                  {currentTier.subtitle}
                </h3>
                <p className="mt-1.5 max-w-lg text-xs leading-5 text-[#596658] sm:text-sm">
                  {currentTier.description}
                </p>
              </div>
              <div className="grid grid-cols-1 content-center gap-2 p-3 sm:grid-cols-2 sm:p-3.5 lg:gap-2.5 lg:p-4">
                {currentTier.included.map(item => {
                  const isPortfolio = item.toLowerCase().includes("portfolio");
                  const isShareable = item.toLowerCase().includes("shareable");
                  const FeatureIcon = isPortfolio ? Globe : isShareable ? Link2 : Check;
                  const isStandout = isPortfolio || isShareable;
                  return (
                    <div
                      key={item}
                      className={`flex min-h-16 items-center gap-2.5 border px-3 py-2.5 sm:px-3.5 ${
                        isStandout
                          ? "border-[#9BAF98] bg-white shadow-sm"
                          : "border-[#D5DDD1] bg-[#F8FAF6]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center ${
                          isStandout ? "bg-[#344B38] text-white" : "bg-[#DDE7D9] text-[#344B38]"
                        }`}
                      >
                        <FeatureIcon className="h-4 w-4" />
                      </span>
                      <span className="text-xs font-semibold leading-4 text-[#29392B] sm:text-sm">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Template gallery */}
        {filteredTemplates.length === 0 ? (
          <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-[#D9DDD5] bg-white px-6 text-center">
            <LayoutTemplate className="h-8 w-8 text-[#9AA197]" />
            <h3 className="mt-4 text-base font-semibold">No templates in this category yet</h3>
            <p className="mt-1 text-sm text-[#737A72]">
              Choose another category to explore available designs.
            </p>
          </div>
        ) : (
          <section id="tour-template-selection-v3" className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">{currentTier.label} templates</h2>
                <p className="mt-1 text-xs text-[#737A72]">Select a design to continue.</p>
              </div>
              {activeTier === "elite" && (
                <span className="hidden items-center gap-1.5 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 sm:inline-flex">
                  <Globe className="h-3.5 w-3.5" />
                  Includes portfolio website
                </span>
              )}
              {activeTier === "premium" && (
                <span className="hidden items-center gap-1.5 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-800 sm:inline-flex">
                  <Link2 className="h-3.5 w-3.5" />
                  Includes shareable resume link
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {filteredTemplates.map((template, index) => {
                const { templateData, tier, key, image, label } = template;
                const isSelected = selectedTemplate === key;
                const badge = templateData?.badge;
                const discountedPrice = templateData?.priceDiscounted ?? 49;
                const originalPrice = templateData?.price ?? 149;
                const tierClass = tierStyles[tier] || tierStyles.standard;

                return (
                  <article
                    key={key}
                    className={`group min-w-0 overflow-hidden border bg-white transition-all ${
                      isSelected
                        ? "border-[#344B38] ring-2 ring-[#344B38]/15 shadow-md"
                        : "border-[#E3E5DF] hover:-translate-y-0.5 hover:border-[#C7CEC4] hover:shadow-md"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelect(key)}
                      disabled={isPending}
                      aria-label={`Select ${label} template`}
                      aria-pressed={isSelected}
                      className="block w-full text-left"
                    >
                      <div className="relative aspect-[3/4.15] overflow-hidden bg-[#F1F1ED]">
                        {image ? (
                          <Image
                            src={image}
                            alt={`${label} resume template preview`}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.015]"
                            priority={activeTier === "standard" && index === 0}
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center gap-2 text-[#92998F]">
                            <LayoutTemplate className="h-8 w-8" />
                            <span className="text-[10px] uppercase tracking-wider">
                              Preview unavailable
                            </span>
                          </div>
                        )}

                        <div className="absolute left-2.5 top-2.5">
                          <span
                            className={`px-2 py-1 text-[9px] font-semibold uppercase tracking-wide shadow-sm ${tierClass}`}
                          >
                            {tier}
                          </span>
                        </div>

                        {badge && (
                          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 border border-white/70 bg-white/95 px-2 py-1 text-[10px] font-medium text-[#3D5140] shadow-sm">
                            <Sparkles className="h-3 w-3" />
                            {badge}
                          </span>
                        )}

                        {isSelected && (
                          <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center bg-[#344B38] text-white shadow-sm">
                            <Check className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    </button>

                    <div className="p-3 sm:p-3.5">
                      <div className="min-h-9.5">
                        <h3 className="truncate text-sm font-semibold text-[#242B24]" title={label}>
                          {label}
                        </h3>
                        {templateData?.tag && (
                          <p className="mt-1 text-[10px] text-[#81887F]">{templateData.tag}</p>
                        )}
                      </div>

                      <div className="mt-3 flex items-end justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-1.5">
                            <span className="text-sm font-bold text-[#202820]">
                              ₹{discountedPrice}
                            </span>
                            {originalPrice > discountedPrice && (
                              <span className="text-[10px] text-[#8B9188] line-through">
                                ₹{originalPrice}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[10px] text-[#81887F]">One-time payment</p>
                        </div>
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                            isSelected
                              ? "border-[#344B38] bg-[#344B38] text-white"
                              : "border-[#E1E4DC] text-[#586257] group-hover:border-[#344B38] group-hover:text-[#344B38]"
                          }`}
                          aria-hidden="true"
                        >
                          {isSelected ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <ArrowRight className="h-4 w-4" />
                          )}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>

      {/* Single sticky action bar */}
      {selectedTemplate && selectedTemplateData && (
        <div className="fixed inset-x-0 bottom-0 border-t border-[#E3E5DF] bg-white/95 px-3 py-3 shadow-[0_-8px_24px_rgba(20,30,20,0.06)] backdrop-blur-md sm:px-6 sm:py-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-12 w-9 shrink-0 overflow-hidden border border-[#E2E4DE] bg-[#F4F4F0]">
                {selectedTemplateData.image ? (
                  <Image
                    src={selectedTemplateData.image}
                    alt=""
                    fill
                    sizes="36px"
                    className="object-cover object-top"
                  />
                ) : (
                  <LayoutTemplate className="m-auto h-4 w-4 text-[#92998F]" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-wider text-[#81887F]">
                  Selected template
                </p>
                <p className="max-w-[42vw] truncate text-sm font-semibold text-[#242B24] sm:max-w-xs">
                  {selectedTemplateData.label}
                </p>
              </div>
            </div>

            <Button
              type="button"
              disabled={isPending}
              onClick={() => handleSelect(selectedTemplate)}
              className="h-11 shrink-0 bg-[#344B38] px-4 text-sm font-semibold text-white hover:bg-[#293C2D] sm:px-6"
            >
              {isPending ? "Opening builder…" : "Continue"}
              {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default React.memo(TemplateSelectorV3);
