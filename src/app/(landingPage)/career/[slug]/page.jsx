import React from "react";
import { notFound } from "next/navigation";
import careerPages from "../../career-pages.json";
import { createSeoMetadata } from "@/shared/utils/seo";
import { CareerHero } from "@/shared/components/career/CareerHero";
import Link from "next/link";
import { CareerTableOfContents } from "@/shared/components/career/CareerTableOfContents";
import { CareerSection } from "@/shared/components/career/CareerSection";
import { CareerCTA } from "@/shared/components/career/CareerCTA";
import { RelatedCareerGuides } from "@/shared/components/career/RelatedCareerGuides";

export async function generateStaticParams() {
  return careerPages.map(c => ({
    slug: c.slug,
  }));
}

export const dynamicParams = false;

/* -------------------------------------------------------------------------- */
/* Metadata                                                                  */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const career = careerPages.find(c => c.slug === slug);

  if (!career) return {};

  return createSeoMetadata({
    title: career.seo?.title || career.title,
    description:
      career.seo?.description ||
      `${career.title} - Comprehensive career guide, skills, responsibilities, resume strategy, and interview preparation on NextCV.`,
    path: `/career/${career.slug}`,
  });
}

function getCategory(title) {
  if (title.includes("Interview")) return "Interview Prep";
  if (title.includes("Resume")) return "Resume Guide";
  return "Career Guide";
}

/* -------------------------------------------------------------------------- */
/* Page Component                                                            */
/* -------------------------------------------------------------------------- */

export default async function CareerPage({ params }) {
  const { slug } = await params;

  const career = careerPages.find(c => c.slug === slug);

  if (!career) {
    notFound();
  }

  const sections = career.sections || [];
  const wordCount = (career.content || "").split(/\s+/).length;
  const readTime = Math.max(1, Math.round(wordCount / 200));

  // Extract FAQs for Schema if available
  const faqSection = sections.find(
    s =>
      s.id === "frequently-asked-questions" ||
      (s.heading && s.heading.toLowerCase().includes("frequently asked questions"))
  );

  const faqItems = [];
  if (faqSection && faqSection.content) {
    const parts = faqSection.content.split(/(?=###\s+)/);
    parts
      .filter(p => p.startsWith("###"))
      .forEach(p => {
        const lines = p.split("\n");
        const q = lines[0].replace("###", "").trim();
        const a = lines.slice(1).join("\n").trim();
        if (q && a) {
          faqItems.push({
            "@type": "Question",
            name: q,
            acceptedAnswer: {
              "@type": "Answer",
              text: a,
            },
          });
        }
      });
  }

  const jsonLdGraph = [
    {
      "@type": "Article",
      "@id": `https://www.nextcv.in/career/${career.slug}#article`,
      headline: career.seo?.title || career.title,
      description: career.seo?.description || career.hero?.description,
      inLanguage: "en-IN",
      mainEntityOfPage: `https://www.nextcv.in/career/${career.slug}`,
      publisher: {
        "@type": "Organization",
        name: "NextCV",
        url: "https://www.nextcv.in",
        logo: {
          "@type": "ImageObject",
          url: "https://www.nextcv.in/logo.png",
        },
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `https://www.nextcv.in/career/${career.slug}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.nextcv.in",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Career Guides",
          item: "https://www.nextcv.in/career",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: career.title,
          item: `https://www.nextcv.in/career/${career.slug}`,
        },
      ],
    },
  ];

  if (faqItems.length > 0) {
    jsonLdGraph.push({
      "@type": "FAQPage",
      "@id": `https://www.nextcv.in/career/${career.slug}#faq`,
      mainEntity: faqItems,
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": jsonLdGraph,
  };

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}
      <CareerHero
        title={career.title}
        eyebrow={career.hero?.eyebrow || "CAREER GUIDE"}
        description={career.hero?.description}
        readTime={readTime}
        category={getCategory(career.title)}
      />
      {/* NextCV Tools – internal links */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/ai-resume-builder" className="inline-flex items-center rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
          AI Resume Builder
        </Link>
        <Link href="/ai-cover-letter-generator" className="inline-flex items-center rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
          AI Cover‑Letter Generator
        </Link>
        <Link href="/ats-resume-checker" className="inline-flex items-center rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
          ATS Resume Checker
        </Link>
        <Link href="/pricing" className="inline-flex items-center rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
          Pricing (₹49)
        </Link>
        <Link href="/templates" className="inline-flex items-center rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100">
          Resume Templates
        </Link>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN CONTENT                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Table of Contents (Sticky Sidebar on Desktop) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <CareerTableOfContents sections={sections} />
          </div>

          {/* Sections Column */}
          <div className="lg:col-span-8">
            {sections.map((section, index) => (
              <CareerSection
                key={section.id || index}
                section={section}
                index={index}
                salaryData={career.salaryData}
              />
            ))}

            {/* Related Career Guides */}
            <RelatedCareerGuides currentSlug={career.slug} allPages={careerPages} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA FOOTER                                                        */}
      {/* ------------------------------------------------------------------ */}
      <CareerCTA title={career.title} />
    </main>
  );
}
