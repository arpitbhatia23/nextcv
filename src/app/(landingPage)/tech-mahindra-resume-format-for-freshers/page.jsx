import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));

export const metadata = {
  title: "Tech Mahindra Resume Format for Freshers 2026 | ATS Template",
  description:
    "Create an ATS-friendly Tech Mahindra resume format for freshers with clean sections for skills, projects, education and certifications.",
  alternates: {
    canonical: "https://www.nextcv.in/tech-mahindra-resume-format-for-freshers",
  },
};

export default function Page() {
  const faqs = [
    {
      q: "How to write a resume for Tech Mahindra?",
      a: "Ensure your resume is ATS-friendly, highlighting relevant skills and projects clearly.",
    },
    {
      q: "What is the selection process for Tech Mahindra?",
      a: "It typically involves an aptitude test, technical round, and HR interview. A strong resume helps clear the initial screening.",
    },
    {
      q: "Are certifications important for Tech Mahindra?",
      a: "Yes, relevant technical certifications can significantly boost your resume.",
    },
    {
      q: "Should I mention extracurriculars?",
      a: "Only if they highlight leadership or relevant soft skills.",
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
        name: "Tech Mahindra Resume Format for Freshers (2026)",
        item: "https://www.nextcv.in/tech-mahindra-resume-format-for-freshers",
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
        Tech Mahindra Resume Format for Freshers (2026)
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Create an ATS-friendly Tech Mahindra resume format for freshers with clean sections for
        skills, projects, education and certifications.
      </p>

      <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg mb-12">
        <h2 className="text-xl font-semibold mb-2">Build Your ATS-Friendly Resume Now</h2>
        <p className="mb-4 text-gray-700">
          Use NextCV to create a resume that passes screening tools used by top Indian companies.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition"
        >
          Create Resume Free
        </Link>
      </div>

      <div className="prose max-w-none text-gray-800">
        <h2 className="text-2xl font-semibold mt-8 mb-4">Best Tech Mahindra Resume Format</h2>
        <p className="mb-4">
          This section is designed to guide Indian freshers in creating an optimal resume for 2026.
          Make sure to include relevant skills, internships, and educational background correctly
          structured for Applicant Tracking Systems (ATS).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Important Sections to Include</h2>
        <p className="mb-4">
          This section is designed to guide Indian freshers in creating an optimal resume for 2026.
          Make sure to include relevant skills, internships, and educational background correctly
          structured for Applicant Tracking Systems (ATS).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Tech Mahindra Skills</h2>
        <p className="mb-4">
          This section is designed to guide Indian freshers in creating an optimal resume for 2026.
          Make sure to include relevant skills, internships, and educational background correctly
          structured for Applicant Tracking Systems (ATS).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Projects for Tech Mahindra Resume</h2>
        <p className="mb-4">
          This section is designed to guide Indian freshers in creating an optimal resume for 2026.
          Make sure to include relevant skills, internships, and educational background correctly
          structured for Applicant Tracking Systems (ATS).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Resume Tips</h2>
        <p className="mb-4">
          This section is designed to guide Indian freshers in creating an optimal resume for 2026.
          Make sure to include relevant skills, internships, and educational background correctly
          structured for Applicant Tracking Systems (ATS).
        </p>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Our Free ATS Templates</h2>
        <Templates />
      </section>

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
