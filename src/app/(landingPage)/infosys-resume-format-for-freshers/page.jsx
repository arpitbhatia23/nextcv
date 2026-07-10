import React from "react";
import { createSeoMetadata } from "@/shared/utils/seo";
import Link from "next/link";
import dynamic from "next/dynamic";

const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));

export const metadata = createSeoMetadata({
  title: "Infosys Resume Format for Freshers 2026 + Free Template",
  description:
    "Create an ATS-friendly Infosys resume format for freshers. Use clean templates for BCA, B.Tech, IT and non-IT fresher applications.",
  path: "/infosys-resume-format-for-freshers",
});

export default function Page() {
  const faqs = [
    {
      q: "What is the best resume format for Infosys?",
      a: "A clear, structured format highlighting technical skills, internships, and relevant projects.",
    },
    {
      q: "Can BCA students apply for Infosys?",
      a: "Yes, Infosys frequently hires BCA graduates for various technical roles.",
    },
    {
      q: "Should I add a photo to my Infosys resume?",
      a: "It is generally not required and often advised against to ensure ATS compatibility.",
    },
    {
      q: "How to clear Infosys ATS screening?",
      a: "Use relevant keywords from the job description and maintain a clean, single-column format.",
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
        name: "Infosys Resume Format for Freshers (2026)",
        item: "https://www.nextcv.in/infosys-resume-format-for-freshers",
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
        Infosys Resume Format and Template for Freshers
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Create an ATS-friendly Infosys resume format for freshers. Use ready-made resume templates
        for BCA, B.Tech, IT and non-IT freshers applying to Infosys jobs.
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
        <p className="mb-4 text-sm text-gray-500 italic">
          Disclaimer: This guide is intended for informational purposes only. The resume format and template provided are independent recommendations and are not officially approved by, endorsed by, or affiliated with Infosys.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Recommended One-Page Structure
        </h2>
        <p className="mb-4">
          When applying for roles like Systems Engineer at Infosys, a one-page resume is highly recommended. It should contain Contact Information, a Summary, Education, Skills, Projects, and Certifications. Keep it clean and avoid complex graphics for better ATS parsing.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Realistic Text Example
        </h2>
        <div className="bg-gray-50 p-4 border rounded-md">
          <p><strong>Rahul Sharma</strong><br/>
          New Delhi, India | rahul.sharma@email.com | +91 9876543210<br/>
          LinkedIn: linkedin.com/in/rahulsharma | GitHub: github.com/rahulsharma</p>
          <p><strong>Professional Summary</strong><br/>
          Motivated Computer Science graduate with strong programming skills in Python and SQL. Eager to contribute to a dynamic team at Infosys as a Systems Engineer.</p>
          <p><strong>Education</strong><br/>
          B.Tech in Computer Science, XYZ University | 2026 | CGPA: 8.5</p>
          <p><strong>Technical Skills</strong><br/>
          Languages: Python, Java, SQL<br/>
          Tools/Frameworks: Django, Git, MySQL</p>
          <p><strong>Academic Projects</strong><br/>
          <em>Library Management System:</em> Built a Python-based system using Django and MySQL to track book inventory, reducing manual data entry by 50%.</p>
          <p><strong>Certifications</strong><br/>
          AWS Certified Cloud Practitioner (2025)</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          ATS Formatting Recommendations
        </h2>
        <p className="mb-4">
          To clear the Infosys ATS screening, strictly stick to standard fonts like Arial or Calibri. Avoid using tables, multiple columns, and headers/footers for important text. Make sure your headings precisely match standard terms (e.g., "Education", "Projects").
        </p>

        <p className="mt-8 font-bold text-lg">
          Ready to build? Customize a <Link href="/templates" className="text-blue-600 hover:underline">NextCV template</Link> now. You can also explore our guides for <Link href="/wipro-resume-format-for-freshers" className="text-blue-600 hover:underline">Wipro</Link> and <Link href="/tcs-resume-format-for-freshers" className="text-blue-600 hover:underline">TCS</Link>.
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
