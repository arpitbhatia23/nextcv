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
      author: career.hero?.author
        ? {
            "@type": "Organization",
            name: career.hero.author,
            url: "https://www.nextcv.in/about-us",
          }
        : undefined,
      dateModified: career.hero?.updatedAt,
      datePublished: career.hero?.publishedAt || career.hero?.updatedAt,
      publisher: {
        "@type": "Organization",
        name: "NextCV",
        url: "https://www.nextcv.in",
        logo: {
          "@type": "ImageObject",
          url: "https://www.nextcv.in/logos/nextcvlogo.png",
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
        author={career.hero?.author}
        updatedAt={career.hero?.updatedAt}
      />
      {/* NextCV Tools – internal links */}
      <div className="relative z-10 mx-auto -mt-7 max-w-7xl px-6 sm:px-8 lg:px-12">
        <nav
          aria-label="NextCV career tools"
          className="grid gap-2 rounded-2xl border border-[#DFE1DA] bg-white/95 p-2 shadow-[0_16px_50px_rgba(23,32,28,0.10)] backdrop-blur sm:grid-cols-2 lg:grid-cols-5"
        >
          <Link
            href="/ai-resume-builder"
            className="group flex min-h-14 items-center justify-between rounded-xl bg-[#17201C] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#344B93] hover:shadow-md"
          >
            <span>AI Resume Builder</span>
            <span
              aria-hidden="true"
              className="ml-3 transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            href="/ai-cover-letter-generator"
            className="group flex min-h-14 items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-[#344B93] transition duration-200 hover:border-[#465B9E]/20 hover:bg-[#F1F3FA]"
          >
            <span>AI Cover Letter</span>
            <span
              aria-hidden="true"
              className="ml-3 text-[#465B9E] transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            href="/ats-resume-checker"
            className="group flex min-h-14 items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-[#344B93] transition duration-200 hover:border-[#465B9E]/20 hover:bg-[#F1F3FA]"
          >
            <span>ATS Resume Checker</span>
            <span
              aria-hidden="true"
              className="ml-3 text-[#465B9E] transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            href="/pricing"
            className="group flex min-h-14 items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-[#344B93] transition duration-200 hover:border-[#465B9E]/20 hover:bg-[#F1F3FA]"
          >
            <span>
              Pricing <span className="text-[#7A7F79]">₹49</span>
            </span>
            <span
              aria-hidden="true"
              className="ml-3 text-[#465B9E] transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <Link
            href="/templates"
            className="group flex min-h-14 items-center justify-between rounded-xl border border-transparent px-4 py-3 text-sm font-semibold text-[#344B93] transition duration-200 hover:border-[#465B9E]/20 hover:bg-[#F1F3FA]"
          >
            <span>Resume Templates</span>
            <span
              aria-hidden="true"
              className="ml-3 text-[#465B9E] transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </nav>
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
