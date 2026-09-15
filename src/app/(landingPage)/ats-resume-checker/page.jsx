import React from "react";
import { createSeoMetadata } from "@/shared/utils/seo";
import Link from "next/link";
import dynamic from "next/dynamic";

const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));

export const metadata = createSeoMetadata({
  title: "Free ATS Resume Checker India 2026 | ATS Friendly Resume Score Tool",
  description:
    "Use our free ATS resume checker to scan your resume score, improve ATS friendly resume formatting, and fix resume format issues before applying for jobs in India.",
  path: "/ats-resume-checker",
  keywords: [
    "free ats resume checker",
    "ats resume checker",
    "resume score",
    "ats friendly resume",
    "ats friendly resume checker",
    "resume builder",
    "resume maker",
    "resume format",
    "resume template",
    "best resume builder",
    "best resume template",
    "free resume builder",
    "cv builder",
    "ai resume builder",
    "ATS resume checker India",
    "resume score checker",
  ],
});

export default function Page() {
  const faqs = [
    {
      q: "How can I check my ATS resume score for free?",
      a: "You can use NextCV's ATS resume checker to evaluate your resume format and keyword density.",
    },
    {
      q: "What is a good ATS score?",
      a: "A score above 80% is generally considered good and indicates high compatibility with ATS systems.",
    },
    {
      q: "Does the checker work for TCS and Infosys?",
      a: "Yes, the checker is designed to evaluate resumes based on common ATS criteria used by major IT companies.",
    },
    {
      q: "Why is my ATS score low?",
      a: "A low score could be due to missing keywords, complex formatting, or incorrect file types.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nextcv.in/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Free ATS Resume Checker Online (2026)",
        item: "https://www.nextcv.in/ats-resume-checker",
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
        Free ATS Resume Checker Online (2026) for Resume Score & ATS Friendly Resume Review
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Use our free ATS resume checker to check your resume score, identify weak ATS friendly
        resume sections, and improve your resume format before applying to TCS, Infosys, Wipro,
        Accenture and other top companies in India.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
        <h2 className="text-xl font-semibold mb-2">
          Build Your ATS Friendly Resume with a Free Resume Builder
        </h2>
        <p className="mb-4 text-gray-700">
          Use NextCV to create a resume that passes screening tools used by top Indian companies,
          while improving your resume builder workflow, resume template structure and final resume
          score.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Create Resume Free
        </Link>
      </div>

      <div className="prose max-w-none text-gray-800">
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Free ATS Resume Checker for Indian Freshers and Resume Makers
        </h2>
        <p className="mb-4">
          This free ATS resume checker helps Indian freshers improve their resume format, add the
          right keywords, and check their resume score before applying for jobs. A strong ATS
          friendly resume should be easy to read, keyword-rich and properly formatted for recruiters
          and ATS systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Check Your Resume Score Before Applying to Top Companies
        </h2>
        <p className="mb-4">
          Your resume score depends on clarity, job-specific keywords, simple formatting, and strong
          achievement bullets. Using the right resume template and a trusted resume builder can
          improve your ATS friendliness and raise your chances of shortlisting.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          ATS Resume Checker for TCS, Infosys, Wipro, Accenture and More
        </h2>
        <p className="mb-4">
          Companies such as TCS, Infosys, Wipro and Accenture often rely on ATS screening tools.
          This ATS resume checker helps you review your resume format, keyword match and overall
          resume score so you can optimize before submitting your application.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Common ATS Resume Mistakes to Fix with a Better Resume Builder
        </h2>
        <p className="mb-4">
          Poor resume formatting, missing keywords, long paragraphs, weak summary sections and wrong
          file types can reduce your ATS resume checker score. Use a simple resume builder and a
          clean resume template to keep your application readable and recruiter-friendly.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Related Guides</h2>
        <div className="mt-6 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/templates" className="text-blue-600 hover:underline">
            Explore Templates
          </Link>
          <Link href="/ats-resume-checker" className="text-blue-600 hover:underline">
            ATS Resume Checker
          </Link>
          <Link href="/tcs-resume-format-for-freshers" className="text-blue-600 hover:underline">
            TCS Resume Format
          </Link>
          <Link
            href="/infosys-resume-format-for-freshers"
            className="text-blue-600 hover:underline"
          >
            Infosys Resume Format
          </Link>
          <Link href="/wipro-resume-format-for-freshers" className="text-blue-600 hover:underline">
            Wipro Resume Format
          </Link>
          <Link href="/ats-friendly-resume-format-india" className="text-blue-600 hover:underline">
            ATS Resume Format Guide
          </Link>
          <Link href="/fresher-resume-format-india" className="text-blue-600 hover:underline">
            Fresher Resume Format
          </Link>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition shadow-lg"
        >
          Build Your Resume Now
        </Link>
      </div>
    </div>
  );
}
