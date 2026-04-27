"use client";
import React, { useEffect } from "react";
import { CheckCircle2, LayoutTemplate, Sparkles, ArrowRight, Zap } from "lucide-react";
import { templates } from "@/shared/utils/template";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import useResumeStore from "@/store/useResumeStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";

const getTierStyles = {
  premium: "bg-amber-50 text-amber-700 border-amber-100",
  elite: "bg-purple-50 text-purple-700 border-purple-100",
  standard: "bg-blue-50 text-blue-700 border-blue-100",
};

const TemplateSelectorV3 = ({ onSelect, next }) => {
  const selectedTemplate = useResumeStore(s => s.selectedTemplate);
  const setSelectedTemplate = useResumeStore(s => s.setSelectedTemplate);
  const router = useRouter();

  // HIGH PERFORMANCE: Prefetch the next page once on mount
  useEffect(() => {
    router.prefetch("/dashboard/builder/basicInfo");
  }, [router]);

  const handleSelect = key => {
    setSelectedTemplate(key);
    if (onSelect) {
      onSelect(key);
    } else if (next) {
      next();
    } else {
      router.push("/dashboard/builder/basicInfo");
    }
  };

  return (
    <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 p-4 md:p-6 lg:p-8">
      {/* Premium Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] bg-indigo-50/50 w-fit px-3 py-1 rounded-full">
            <Zap className="w-3 h-3 fill-indigo-600" />
            <span>Step 01 — Design Strategy</span>
          </div>
          <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Select your professional <span className="text-indigo-600">canvas.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base max-w-xl leading-relaxed">
            Choose from our recruiter-vetted, ATS-optimized templates designed to maximize your
            callback rate.
          </p>
        </div>

        <div className="hidden lg:flex items-center gap-4 bg-white border border-slate-100 px-6 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 overflow-hidden"
              >
                <Image
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`}
                  width={40}
                  height={40}
                  alt="User"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <div className="text-sm font-bold text-slate-400 leading-tight">
            TRUSTED BY <br />
            <span className="text-slate-900 font-black">12,000+ experts</span>
          </div>
        </div>
      </div>

      {/* Modern Grid - Optimized for readability */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
        id="tour-template-selection-v3"
      >
        {templates.map((template, index) => {
          const templateData = getTemplateByName(template.key);
          const isSelected = selectedTemplate === template.key;
          const tier = templateData?.tier?.toLowerCase() || "standard";
          const badge = templateData?.badge;

          return (
            <div
              key={template.key}
              onClick={() => handleSelect(template.key)}
              className="group cursor-pointer flex flex-col"
            >
              <div
                className={`relative aspect-[3/4.2] rounded-2xl overflow-hidden transition-all duration-500 bg-white
                ${
                  isSelected
                    ? "ring-[3px] ring-indigo-600 ring-offset-4 shadow-2xl scale-[1.02]"
                    : "ring-1 ring-slate-200 hover:ring-indigo-400/50 hover:shadow-xl hover:-translate-y-2"
                }`}
              >
                {/* Template Image */}
                {template.image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={template.image}
                      alt={template.label}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      priority={index < 5}
                    />
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Tier Badge */}
                    <div
                      className={`absolute bottom-3 left-3 px-2 py-0.5 rounded-lg border text-[8px] font-black uppercase tracking-widest backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1 ${getTierStyles[tier]}`}
                    >
                      {tier}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full items-center justify-center text-slate-300 gap-3">
                    <div className="p-4 bg-slate-50 rounded-full">
                      <LayoutTemplate className="w-8 h-8 opacity-40" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider">No Preview</span>
                  </div>
                )}

                {/* Status Badges */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg z-10 animate-in zoom-in duration-500">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                {badge && (
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-indigo-600 text-[10px] px-3 py-1.5 rounded-xl font-black uppercase tracking-tighter shadow-sm border border-indigo-50 z-10">
                    <Sparkles className="w-3 h-3 inline-block mr-1 mb-0.5" /> {badge}
                  </div>
                )}

                {/* Selection Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                  <Button
                    size="sm"
                    className="bg-white text-indigo-600 hover:bg-white/90 font-black text-xs px-6 py-5 rounded-xl shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  >
                    SELECT DESIGN
                  </Button>
                </div>
              </div>

              {/* Text Content */}
              <div className="mt-4 px-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-sm md:text-base truncate">
                    {template.label}
                  </h4>
                  {templateData?.tag && (
                    <span className="text-[10px] font-black text-indigo-500/50 shrink-0 bg-indigo-50 px-2 py-0.5 rounded-md">
                      #{templateData.tag}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-slate-900">
                      ₹{templateData?.priceDiscounted || 49}
                    </span>
                    <span className="text-[10px] text-slate-400 line-through">
                      ₹{templateData?.price || 149}
                    </span>
                  </div>
                  <div className="h-px grow bg-slate-100" />
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                    Preview ↗
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Action Bar (Mobile Responsive) */}
      {selectedTemplate && (
        <div className="fixed bottom-6 left-0 right-0 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500 px-4">
          <div className="max-w-xl mx-auto bg-slate-900/95 backdrop-blur-xl text-white p-3 md:p-4 rounded-4xlshadow-2xl flex items-center justify-between border border-white/20 ring-4 ring-slate-900/20">
            <div className="flex items-center gap-4 pl-2">
              <div className="w-12 h-14 bg-white/10 rounded-2xl overflow-hidden shrink-0 border border-white/10 p-1">
                {templates.find(t => t.key === selectedTemplate)?.image && (
                  <Image
                    src={templates.find(t => t.key === selectedTemplate).image}
                    width={48}
                    height={56}
                    className="object-cover w-full h-full rounded-xl"
                    alt="Selected"
                  />
                )}
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">
                  Design Locked
                </p>
                <h5 className="font-black text-sm uppercase tracking-tight">
                  {templates.find(t => t.key === selectedTemplate)?.label}
                </h5>
              </div>
            </div>
            <Button
              onClick={() => handleSelect(selectedTemplate)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black text-sm px-8 h-14 shadow-lg shadow-indigo-600/30 group transition-all hover:scale-105 active:scale-95"
            >
              START BUILDING{" "}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(TemplateSelectorV3);
