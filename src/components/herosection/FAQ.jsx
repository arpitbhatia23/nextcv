"use client";

import React, { useState } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "How do I make my resume ATS-friendly for Indian companies?",
    answer: (
      <>
        To make an{" "}
        <Link href="/blogs/ats-friendly-resume-meaning-examples-and-how-to-create-one" className="text-indigo-600 hover:underline">
          ATS-friendly resume in India
        </Link>
        , use a single-column layout, standard fonts (Arial, Calibri), and clear section headings. Ensure you include relevant keywords for roles at companies like TCS, Infosys, and Tech Mahindra. NextCV automatically handles these formatting rules for you.
      </>
    ),
  },
  {
    question: "What is the best resume format for freshers in India 2026?",
    answer: (
      <>
        The{" "}
        <Link href="/blogs/best-resume-format-for-freshers-in-india-2026" className="text-indigo-600 hover:underline">
          best resume format for freshers in 2026
        </Link>{" "}
        is the reverse-chronological format. It highlights your recent internships, projects, and education first. For Indian graduates, including a 'Technical Skills' section with keywords like Java, Python, or React is crucial to pass recruiter screenings.
      </>
    ),
  },
  {
    question: "How do companies like TCS, Accenture, and LTIMindtree screen resumes?",
    answer:
      "Large Indian MNCs use Applicant Tracking Systems (ATS) to filter thousands of applications. They look for specific keywords matching the job description (e.g., 'TCS NQT', 'Full Stack Developer', 'Aptitude'). Using an ATS-friendly resume builder like NextCV ensures your resume is readable by these systems, increasing your interview chances.",
  },
  {
    question: "Can I use Canva or infographic resumes for Indian jobs?",
    answer:
      "While infographic resumes look good, they often fail ATS scans because the text is embedded in images or complex layouts. For campus placements and off-campus drives in India, a clean text-based resume is always safer and more effective at getting you past the first round.",
  },
  {
    question: "How long should a fresher resume be for 2026 placements?",
    answer:
      "For freshers, a 1-page resume is ideal. It forces you to be concise and highlights your most important achievements without overwhelming recruiters who spend only 6 seconds scanning each CV.",
  },
  {
    question: "How to write a professional summary for freshers with no experience?",
    answer:
      "Focus on your passion for technology, your key projects, and what you aim to achieve. For example: 'Enthusiastic Computer Science graduate with strong foundations in React and Node.js. Developed a full-stack e-commerce project and seeking to leverage technical skills at a forward-thinking Indian tech firm.'",
  },
  {
    question: "Should I include internships or freelance work in my resume?",
    answer:
      "Absolutely! For freshers, internships, freelance projects, and even college society roles are vital 'experience' substitutes. They demonstrate practical application of your skills and professional work ethic to Indian recruiters.",
  },
  {
    question: "Can NextCV improve my ATS score for IT roles?",
    answer:
      "Yes! NextCV is built specifically for the Indian job market. Our templates are tested against various ATS platforms to ensure high readability and keyword density for roles in Bangalore, Hyderabad, Pune, and beyond.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <LazyMotion features={domAnimation}>
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
              Everything you need to know about ATS scores and building a job-winning resume.
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
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">{faq.answer}</div>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default FAQ;
