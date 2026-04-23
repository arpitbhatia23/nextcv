"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, LayoutTemplate } from "lucide-react";
import { templates } from "@/shared/utils/template";
import { getTemplateByName } from "@/modules/resume/services/templateMap";
import useResumeStore from "@/store/useResumeStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

const getTierStyles = tier => {
  switch (tier?.toLowerCase()) {
    case "premium":
    case "elite":
      return "bg-purple-100 text-purple-700 border border-purple-200";
    case "standard":
      return "bg-blue-100 text-blue-700 border border-blue-200";
    default:
      return "bg-slate-100 text-slate-600 border border-slate-200";
  }
};

const TemplateSelectorV3 = () => {
  const selectedTemplate = useResumeStore(s => s.selectedTemplate);
  const setSelectedTemplate = useResumeStore(s => s.setSelectedTemplate);
  const router = useRouter();

  const handleSelect = key => {
    setSelectedTemplate(key);
    router.push("/dashboard/builder/basicInfo");
  };

  return (
    <section className="p-2 md:p-6">
      {/* Header */}
      <div className="flex-col md:flex items-center justify-between mb-4">
        <h3 className="text-sm md:text-2xl font-semibold md:font-black text-slate-900">
          Choose a Template
        </h3>
        <p className="text-xs text-indigo-600 font-semibold">
          🔥 Standard templates are the most popular — quick, clean, and ATS-friendly
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-2">
        {templates.map((template, index) => {
          const templateData = getTemplateByName(template.key);

          const isSelected = selectedTemplate === template.key;
          const tier = templateData?.tier || "Basic";
          const price = templateData?.priceDiscounted || 49;
          const original = templateData?.priceOriginal || 99;
          const tag = templateData?.tag;
          const badge = templateData?.badge;

          return (
            <motion.button
              key={template.key}
              onClick={() => handleSelect(template.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={isSelected}
              className={`group relative text-left w-full cursor-pointer rounded-2xl border transition-all duration-300 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 
              ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50 shadow-lg"
                  : "border-slate-100 bg-white hover:shadow"
              }
              ${
                tier === "Premium" || tier === "Elite"
                  ? "ring-1 ring-purple-300 hover:ring-purple-500"
                  : ""
              }
              `}
            >
              {/* Image */}
              <div className="aspect-3/4 rounded-xl bg-slate-100 overflow-hidden relative">
                {template.image ? (
                  <Image
                    src={template.image}
                    alt={template.label}
                    height={500}
                    width={500}
                    className="object-cover transition-transform group-hover:scale-110"
                    priority={index < 6}
                    quality={75}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <LayoutTemplate className="w-12 h-12 opacity-20" />
                  </div>
                )}

                {/* Selected Tick */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-10">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}

                {/* Badge */}
                {badge && (
                  <div className="absolute top-3 left-3 bg-orange-500 text-white text-[9px] px-2 py-1 rounded-full font-bold shadow">
                    {badge}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                {/* Title */}
                <p
                  className={`text-[11px] font-black uppercase tracking-widest ${
                    isSelected ? "text-indigo-900" : "text-slate-700"
                  }`}
                >
                  {template.label}
                </p>

                {/* Tier + Tag */}
                <div className="flex items-center justify-between">
                  {/* Tier Badge */}
                  {tier && (
                    <span
                      className={`text-lg px-3 py-3 rounded-lg font-semibold uppercase tracking-wide ${getTierStyles(
                        tier
                      )} `}
                    >
                      {tier}
                    </span>
                  )}

                  {/* Tag Badge */}
                  {tag && (
                    <span className="text-lg font-bold text-orange-600  px-3 py-3 rounded-lg">
                      {tag}
                    </span>
                  )}
                </div>

                {/* Pricing */}
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-black text-indigo-600">₹{price}</span>
                    <span className="text-[10px] line-through text-slate-400">₹{original}</span>
                  </div>

                  <span className="text-[9px] text-green-600 font-bold">
                    Save ₹{original - price}
                  </span>
                </div> */}
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default React.memo(TemplateSelectorV3);
