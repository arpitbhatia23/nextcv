const questions = [
  {
    question: "Can I build a resume for free?",
    answer:
      "Yes. You can create, edit, and preview your resume for free. A one-time payment starting at ₹49 is only required when you choose a template tier and are ready to download.",
  },
  {
    question: "Is payment recurring or one-time?",
    answer:
      "All pricing is strictly one-time per resume download. There are no automatic renewals, hidden fees, or monthly subscriptions.",
  },
  {
    question: "Can I tailor my resume to a job description?",
    answer:
      "Yes. You can paste a job description into our ATS checker to compare requirements, identify missing skills or keywords, and get actionable recommendations before submitting.",
  },
  {
    question: "Does NextCV help improve ATS compatibility?",
    answer:
      "NextCV formats your resume with clean headings, readable fonts, and ATS-friendly section structures. The ATS checker provides a diagnostic compatibility score to guide your edits.",
  },
  {
    question: "Can I create a cover letter?",
    answer:
      "Yes. The cover letter builder connects your resume details with the target job description to generate a tailored, role-specific cover letter that you can review and edit.",
  },
  {
    question: "Can I share my resume online?",
    answer:
      "Yes. Resume sharing via a secure public link is available on Premium and Elite plans. The Elite tier also includes an online portfolio website.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. Downloading provides a high-resolution, print-ready PDF formatted to pass employer screening systems and maintain clean visual layout across devices.",
  },
  {
    question: "Which resume templates work well for freshers?",
    answer:
      "Structured single-column or clean modern layouts like Minimal and Classic work best for freshers, giving prominence to your education, academic projects, technical skills, and internships.",
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
