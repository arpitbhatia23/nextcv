"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How to make a resume for IT jobs in India with no experience?",
    answer:
      "To make a resume for IT jobs with no experience: 1) Focus on technical projects and internships. 2) List relevant skills like Python, Java, or React. 3) Use an ATS-friendly resume builder for freshers in India like NextCV to ensure your format is professional and compliant with MNC standards.",
  },
  {
    question: "What is the best resume format for freshers in India 2026?",
    answer:
      "The best resume format for freshers in India is a clean, single-column layout that emphasizes education, technical skills, and projects. NextCV provides professional resume templates for India that are free to start and optimized for 2026 hiring trends.",
  },
  {
    question: "Difference between resume and CV for India jobs?",
    answer:
      "In India, 'resume' is typically used for private sector and IT jobs (1-2 pages), while 'CV' (Curriculum Vitae) is often used for academic or research roles and can be longer. For most corporate roles, a 1-page ATS-optimized resume is preferred.",
  },
  {
    question: "How do I include software developer resume keywords?",
    answer:
      "Use software developer resume keywords that get interview calls in India, such as specific programming languages, frameworks, and tools mentioned in the job description (e.g., 'Full Stack', 'Agile', 'Cloud Computing').",
  },
  {
    question: "Is NextCV really free?",
    answer:
      "Yes, you can check your ATS score for free. Our free CV maker for freshers in India also has a free tier to get you started, and premium features are available for a small one-time fee with no subscriptions.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to know about ATS scores and building a
            job-winning resume.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <m.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                activeIndex === index
                  ? "border-indigo-200 bg-indigo-50/30"
                  : "border-slate-200 hover:border-indigo-100"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span
                  className={`text-lg font-semibold ${activeIndex === index ? "text-indigo-900" : "text-slate-800"}`}
                >
                  {faq.question}
                </span>
                <div
                  className={`p-1 rounded-full transition-colors ${activeIndex === index ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-500"}`}
                >
                  {activeIndex === index ? (
                    <Minus className="w-5 h-5" />
                  ) : (
                    <Plus className="w-5 h-5" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </m.div>
                )}
              </AnimatePresence>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
