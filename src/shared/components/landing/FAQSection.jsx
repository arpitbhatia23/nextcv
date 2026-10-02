const questions = [
  {
    question: "Is NextCV free to use?",
    answer:
      "You can build and edit your resume for free. A one-time payment is required when you choose a paid template and are ready to download.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No. NextCV uses one-time payments for resume plans; there is no mandatory monthly subscription.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. Paid template tiers include a high-resolution PDF download. The available features depend on the plan you select.",
  },
  {
    question: "Does NextCV check ATS compatibility?",
    answer:
      "The ATS checker reviews resume structure and content, and provides a diagnostic score. ATS systems vary, so the score is a guide rather than a guarantee.",
  },
  {
    question: "Can I compare my resume with a job description?",
    answer:
      "Yes. Add a job description in the ATS checker to review matched, partial, and missing recognized keywords.",
  },
  {
    question: "Can I create a cover letter?",
    answer:
      "Yes. The cover-letter tool can use your resume, target role, company, and job description to help draft a tailored letter.",
  },
  {
    question: "Can I create a shareable resume or portfolio?",
    answer:
      "Resume sharing is included with Premium and Elite tiers. The portfolio website and cover-letter features are included with Elite; see pricing for current plan details.",
  },
  {
    question: "Which templates work well for freshers?",
    answer:
      "Start with a clear, content-focused layout that gives education, projects, skills, and internships room to scan. You can preview templates before choosing one.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
            A few useful details
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
            Questions, answered.
          </h2>
        </div>
        <div className="mt-8 divide-y divide-[#e7e6e0] border-y border-[#e7e6e0]">
          {questions.map(item => (
            <details key={item.question} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left text-sm font-semibold text-[#273229] marker:content-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5268b6] [&::-webkit-details-marker]:hidden">
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className="text-xl font-normal text-[#6574a2] transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-3xl pb-5 pr-8 text-sm leading-6 text-[#626962]">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
