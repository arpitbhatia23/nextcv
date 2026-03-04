"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, LayoutTemplate } from "lucide-react";
import { templates } from "@/utils/template";
import useResumeStore from "@/store/useResumeStore";

const TemplateSelectorV3 = ({ onSelect }) => {
  const selectedTemplate = useResumeStore((s) => s.selectedTemplate);
  const setSelectedTemplate = useResumeStore((s) => s.setSelectedTemplate);

  const handleSelect = (key) => {
    setSelectedTemplate(key);
    if (onSelect) onSelect(key);
  };

  return (
    <section className="p-2 md:p-6">
      <div className="flex-col md:flex items-center justify-between mb-4">
        <h3 className="text-sm md:text-xl font-semibold md:font-black text-slate-900">
          Choose a Template
        </h3>
        <p className="text-xs text-slate-500">
          Pick one to begin — you can change later.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.key;
          return (
            <motion.button
              key={template.key}
              onClick={() => handleSelect(template.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={isSelected}
              aria-label={`Select ${template.label} template`}
              className={`group relative text-left w-full cursor-pointer rounded-2xl border transition-all duration-300 p-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isSelected ? "border-indigo-600 bg-indigo-50 shadow-lg" : "border-slate-100 bg-white hover:shadow"} `}
            >
              <div className="aspect-3/4 rounded-xl bg-slate-100 overflow-hidden relative">
                {template.image ? (
                  <img
                    src={template.image}
                    alt={template.label}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <LayoutTemplate className="w-12 h-12 opacity-20" />
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-3 right-3 bg-indigo-600 text-white p-1.5 rounded-full shadow-lg z-10 border border-white/20">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="p-3">
                <div className="flex items-center justify-between">
                  <p
                    className={`text-xs font-black uppercase tracking-widest ${isSelected ? "text-indigo-900" : "text-slate-600"}`}
                  >
                    {template.label}
                  </p>
                  {isSelected && (
                    <span className="text-xs text-emerald-600 font-bold">
                      Selected
                    </span>
                  )}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
};

export default TemplateSelectorV3;
