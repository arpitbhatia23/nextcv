import React from "react";
import { notFound } from "next/navigation";
import careerPages from "../../career-pages.json";
import { createSeoMetadata } from "@/shared/utils/seo";
import { CareerHero } from "@/shared/components/career/CareerHero";
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

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
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
              <CareerSection key={section.id || index} section={section} index={index} />
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
