"use client";

import React, { useState } from "react";
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Is NextCV ATS friendly?",
    answer:
      "Yes, absolutely! NextCV is built specifically to generate 100% ATS-friendly resumes. Our templates use single-column layouts and standard fonts, ensuring they are easily parsed by ATS software used by top Indian companies.",
  },
  {
    question: "Which resume format works for TCS?",
    answer:
      "For TCS (especially TCS NQT), the reverse-chronological format works best. Ensure you highlight your BTech/MCA project details clearly, include specific keywords from the job description, and avoid using complex graphics. NextCV has pre-built templates tested for TCS.",
  },
  {
    question: "Which resume format works for Infosys?",
    answer:
      "Infosys recruiters prefer clean, text-based resumes that clearly state your technical skills (like Java, Python, SQL) and academic achievements. Our ATS-friendly templates are perfectly aligned with Infosys screening standards.",
  },
  {
    question: "How can freshers make ATS resumes?",
    answer: (
      <>
        To make an{" "}
        <Link
          href="/blogs/ats-friendly-resume-meaning-examples-and-how-to-create-one"
          className="text-indigo-600 hover:underline"
        >
          ATS-friendly resume in India
        </Link>
        , use a single-column layout, standard fonts (Arial, Calibri), and clear section headings.
        Ensure you include relevant keywords for roles you are applying for. NextCV automatically
        handles these formatting rules for you.
      </>
    ),
  },
  {
    question: "Is NextCV free?",
    answer: (
      <>
        NextCV offers a highly affordable one-time pricing starting at just ₹49 per resume,
        providing you with professional, ATS-optimized templates that drastically improve your
        interview chances as the{" "}
        <Link
          href="/blogs/best-resume-maker-for-freshers-in-india-inr100-only-no-subscription"
          className="text-indigo-600 hover:underline"
        >
          best resume maker for freshers without a subscription
        </Link>
        .
      </>
    ),
  },
  {
    question: "What ATS score is considered good?",
    answer:
      "An ATS score above 80% is generally considered excellent for Indian IT companies. This means your resume has a strong keyword match with the job description and is perfectly formatted for the tracking system.",
  },
  {
    question: "Can I create resumes for campus placements?",
    answer:
      "Yes! NextCV is designed specifically with campus placements in mind. Whether you are aiming for Day 1 companies or off-campus drives, our fresher-focused templates help you highlight your projects and internships effectively.",
  },
  {
    question: "Which resume format works for software engineers?",
    answer:
      "Software engineers should use a format that highlights their 'Technical Skills' at the top, followed by 'Projects' with GitHub links, and then 'Education'. Ensure your tech stack (e.g., React, Node.js, AWS) is easily scannable.",
  },
  {
    question: "Does NextCV support Indian resume formats?",
    answer:
      "Yes. Our platform is exclusively tailored for the Indian hiring ecosystem. We avoid the flashy, multi-column designs popular in Western markets that often fail in India, and instead focus on clean, high-conversion layouts preferred by Indian recruiters.",
  },
  {
    question: "How do I download my resume?",
    answer:
      "Once you have completed filling in your details and selected a template, you can instantly download your resume in a text-searchable PDF format, which is the gold standard for submitting job applications.",
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
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
                className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
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
                    className={`text-xs sm:text-sm font-semibold ${activeIndex === index ? "text-indigo-900" : "text-slate-800"}`}
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
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed text-xs sm:text-sm">
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
    </LazyMotion>
  );
};

export default FAQ;
