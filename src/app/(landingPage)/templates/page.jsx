import React from "react";
import { createSeoMetadata } from "@/shared/utils/seo";
import Link from "next/link";
import dynamic from "next/dynamic";

const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));

export const metadata = createSeoMetadata({
  title: "ATS Resume Templates for Freshers in India | NextCV",
  description:
    "Explore ATS-friendly resume templates for Indian job seekers. Find specialized formats for freshers, experienced professionals, and MNC applications.",
  path: "/templates",
});

export default function Page() {
  const faqs = [
    {
      q: "Which is the best resume format for freshers in India?",
      a: "The reverse-chronological format is generally the best for freshers, prioritizing education and projects.",
    },
    {
      q: "Are these templates ATS-friendly?",
      a: "Yes, all our templates are designed to be easily readable by Applicant Tracking Systems.",
    },
    {
      q: "Can I download the resume for free?",
      a: "You can create your resume for free, and download it starting from \u20b949.",
    },
    {
      q: "Do these templates work for IT jobs?",
      a: "Absolutely, we have specialized templates highlighting technical skills and projects ideal for IT freshers.",
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
        name: "Best Resume Format for Freshers in India (2026)",
        item: "https://www.nextcv.in/templates",
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
        ATS-Friendly Resume Templates for Indian Job Seekers
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Browse our collection of ATS-friendly resume templates designed specifically for the Indian job market. Whether you're a fresher or an experienced professional, these templates are tested to pass automated screening systems. Check our <Link href="/examples" className="text-blue-600 hover:underline">resume examples</Link> for inspiration or review our <Link href="/pricing" className="text-blue-600 hover:underline">affordable pricing</Link>.
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
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Resume Templates for Freshers
        </h2>
        <p className="mb-4">
          If you are just graduating or looking for your first job, a reverse-chronological format focusing on education, internships, and academic projects works best. Our fresher templates highlight potential over extensive work history.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Templates for Experienced Candidates</h2>
        <p className="mb-4">
          For professionals with several years of experience, these templates place your work history and measurable achievements front and center, allowing recruiters to quickly grasp the value you bring to the table.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">MNC Resume Applications</h2>
        <p className="mb-4">
          Applying to top IT and non-IT MNCs requires a clean, structured, and highly readable format. These templates avoid flashy graphics and focus on substance, perfectly aligning with strict corporate ATS requirements.
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
