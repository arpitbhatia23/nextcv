"use client";

import React, { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Is NextCV really free?",
    answer:
      "Yes, you can check your ATS score for free. Our resume builder also has a free tier to get you started, and premium features are available for a small one-time fee (no subscriptions!).",
  },
  {
    question: "What is an ATS-friendly resume?",
    answer:
      "An ATS-friendly resume is formatted in a way that Applicant Tracking Systems can easily parse. This means using standard headings, simple layouts, and avoiding graphics or tables that confuse the software.",
  },
  {
    question: "Why was my resume rejected?",
    answer:
      "Resumes are often rejected because they lack specific keywords from the job description or are formatted in a way the ATS cannot read. Our tool helps you identify these issues before you apply.",
  },
  {
    question: "Can I download my resume in Word format?",
    answer:
      "Currently, NextCV generates high-quality PDF resumes which are the industry standard for maintaining formatting across all devices and systems.",
  },
  {
    question: "How do I increase my ATS score?",
    answer:
      "To increase your score: 1) Use relevant keywords from the job post. 2) Use standard section headers (Experience, Education). 3) Avoid columns and graphics. 4) Use a simple, readable font.",
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
