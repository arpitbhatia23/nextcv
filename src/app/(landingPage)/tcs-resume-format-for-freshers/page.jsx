import React from "react";
import { createSeoMetadata } from "@/shared/utils/seo";
import Link from "next/link";
import dynamic from "next/dynamic";

const Templates = dynamic(() => import("@/shared/components/templateslanding/Templates"));

export const metadata = createSeoMetadata({
  title: "TCS Resume Format for Freshers 2026 + Free Template",
  description:
    "Build an ATS-friendly TCS resume format for freshers. Use ready-made templates for TCS NQT, BCA, B.Tech, IT and fresher job applications.",
  path: "/tcs-resume-format-for-freshers",
});

export default function Page() {
  const faqs = [
    {
      q: "How to make a resume for TCS freshers?",
      a: "Use a simple, ATS-friendly template focusing on education, programming skills, and relevant projects.",
    },
    {
      q: "Is TCS resume format different from others?",
      a: "TCS often looks for specific technical proficiencies and problem-solving skills, so highlighting these is key.",
    },
    {
      q: "What should I write in TCS NQT resume?",
      a: "Include your NQT score prominently, along with academic achievements and technical skills.",
    },
    {
      q: "Does TCS use ATS?",
      a: "Yes, TCS receives thousands of applications and uses ATS to filter resumes, making ATS-friendliness crucial.",
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
        name: "TCS Resume Format for Freshers (2026)",
        item: "https://www.nextcv.in/tcs-resume-format-for-freshers",
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
        TCS Resume Format and Template for Freshers
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Build an ATS-friendly TCS resume format for freshers. Use ready-made resume templates for
        TCS NQT, BCA, B.Tech, IT and fresher job applications.
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
          Disclaimer: This guide is intended for informational purposes only. The resume format and template provided are independent recommendations and are not officially approved by, endorsed by, or affiliated with TCS.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">ATS-Compatible Section Structure</h2>
        <p className="mb-4">
          TCS receives an enormous volume of applications, particularly through the TCS NQT route. Your resume needs to be machine-readable. We recommend a single-column layout containing Contact Details, Education, Technical Skills, Projects, and Certifications.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Realistic TCS Resume Example</h2>
        <div className="bg-gray-50 p-4 border rounded-md">
          <p><strong>Priya Patel</strong><br/>
          Mumbai, India | priya.patel@email.com | +91 9876543210<br/>
          LinkedIn: linkedin.com/in/priyapatel | GitHub: github.com/priyapatel</p>
          <p><strong>Education</strong><br/>
          B.Tech in Information Technology, ABC College | 2026 | CGPA: 9.0</p>
          <p><strong>Technical Skills</strong><br/>
          Languages: Java, C++, JavaScript<br/>
          Technologies: React, Node.js, Git</p>
          <p><strong>Academic Projects</strong><br/>
          <em>Weather Forecast Application:</em> Developed a web application using React and a public weather API. Implemented state management using Redux, improving load times.</p>
          <p><strong>Achievements</strong><br/>
          TCS NQT Score: 85% (Cognitive Skills), 90% (Programming Logic)</p>
        </div>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Presenting Projects, Skills, and Education
        </h2>
        <p className="mb-4">
          <strong>Projects:</strong> Describe what you contributed individually. Use bullet points and action verbs. Mention the technologies used clearly.<br/><br/>
          <strong>Technical Skills:</strong> Don't exaggerate. TCS interviewers will dive deep into the skills you list. Categorize them logically.<br/><br/>
          <strong>Education:</strong> For freshers, education is your primary asset. List it near the top in reverse-chronological order. Include your NQT score if you are applying through that route.
        </p>

        <p className="mt-8 font-bold text-lg">
          Ready to build? Customize a <Link href="/templates" className="text-blue-600 hover:underline">NextCV template</Link> now. You can also explore our guides for <Link href="/infosys-resume-format-for-freshers" className="text-blue-600 hover:underline">Infosys</Link> and <Link href="/wipro-resume-format-for-freshers" className="text-blue-600 hover:underline">Wipro</Link>.
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
