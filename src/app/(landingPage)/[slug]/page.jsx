import Link from "next/link";
import { notFound } from "next/navigation";
import { createSeoMetadata } from "@/shared/utils/seo";
import seoPages from "../seo-pages.json";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";

const getPage = slug => seoPages.find(page => page.slug === slug);
const RELATED_GUIDE_LIMIT = 5;
const RELATED_GUIDE_STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "best",
  "between",
  "does",
  "format",
  "formats",
  "fresher",
  "freshers",
  "for",
  "from",
  "guide",
  "how",
  "in",
  "india",
  "layout",
  "meaning",
  "of",
  "on",
  "one",
  "or",
  "resume",
  "resumes",
  "sample",
  "samples",
  "template",
  "templates",
  "the",
  "to",
  "vs",
  "what",
  "with",
  "you",
  "your",
  "2026",
]);

const getGuideTerms = page => {
  const text = [page.slug, page.title, page.h1, ...(page.keywords || [])].join(" ");

  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(term => term.length > 1 && !RELATED_GUIDE_STOP_WORDS.has(term))
  );
};

const getGuideTopics = page => {
  const slug = page.slug.toLowerCase();
  const topics = new Set();

  if (/(^|-)ats(-|$)|screening/.test(slug)) topics.add("ats");
  if (/(cognizant|ltimindtree|tech-mahindra|tcs|infosys|wipro|accenture|hcl|mnc)/.test(slug)) {
    topics.add("employer");
  }
  if (/(builder|price|payment|charges)/.test(slug)) topics.add("builder");
  if (slug.includes("cv")) topics.add("cv");
  if (/(fresher|non-it|bca|mca|career-objective)/.test(slug)) topics.add("early-career");
  if (slug.includes("format")) topics.add("format");

  return topics;
};

const getGuideFingerprint = page =>
  page.slug
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(term => term && !RELATED_GUIDE_STOP_WORDS.has(term))
    .join("-");

const getRelatedGuides = page => {
  const guidePages = [...new Map(seoPages.map(item => [item.slug, item])).values()];
  const documentFrequency = new Map();

  for (const guide of guidePages) {
    for (const term of getGuideTerms(guide)) {
      documentFrequency.set(term, (documentFrequency.get(term) || 0) + 1);
    }
  }

  const currentTerms = getGuideTerms(page);
  const currentTopics = getGuideTopics(page);
  const currentFingerprint = getGuideFingerprint(page);
  const currentKeywords = new Set(
    (page.keywords || []).map(keyword => keyword.toLowerCase().trim())
  );

  return guidePages
    .filter(guide => guide.slug !== page.slug && getGuideFingerprint(guide) !== currentFingerprint)
    .map(guide => {
      let score = 0;
      let sharedTermCount = 0;
      const guideTopics = getGuideTopics(guide);
      const sharesTopic = [...guideTopics].some(topic => currentTopics.has(topic));

      for (const topic of guideTopics) {
        if (currentTopics.has(topic)) score += 5;
      }

      for (const term of getGuideTerms(guide)) {
        if (currentTerms.has(term)) {
          sharedTermCount += 1;
          const frequency = documentFrequency.get(term) || 1;
          score += Math.log((guidePages.length + 1) / (frequency + 1));
        }
      }

      const sharesKeyword = (guide.keywords || []).some(keyword =>
        currentKeywords.has(keyword.toLowerCase().trim())
      );
      if (sharesKeyword) score += 4;

      return { guide, score, isRelevant: sharesTopic || sharedTermCount >= 2 || sharesKeyword };
    })
    .filter(result => result.score > 0 && result.isRelevant)
    .sort((a, b) => b.score - a.score || a.guide.title.localeCompare(b.guide.title))
    .slice(0, RELATED_GUIDE_LIMIT)
    .map(({ guide }) => guide);
};

function renderBold(text) {
  if (!text.includes("**")) return text;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold text-[#17201C]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function FormattedSectionContent({ content }) {
  if (!content) return null;

  // Split by double line breaks for distinct editorial paragraphs
  const paragraphs = content.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="mt-5 space-y-5 text-base sm:text-lg leading-[1.8] text-[#343A35]">
      {paragraphs.map((pText, pIdx) => {
        const lines = pText.split("\n");
        const hasBullets = lines.some(l => l.trim().startsWith("- ") || l.trim().startsWith("* "));

        if (hasBullets) {
          return (
            <div key={pIdx} className="my-5 space-y-3 pl-1">
              {lines.map((line, lIdx) => {
                const trimmed = line.trim();
                if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                  const bulletText = trimmed.replace(/^[-*]\s+/, "");
                  return (
                    <div
                      key={lIdx}
                      className="flex items-start gap-3.5 text-base sm:text-lg leading-[1.75] text-[#343A35]"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#465B9E] shrink-0" />
                      <span>{renderBold(bulletText)}</span>
                    </div>
                  );
                }
                if (trimmed.length === 0) return null;
                return (
                  <p key={lIdx} className="text-base sm:text-lg leading-[1.8] text-[#343A35]">
                    {renderBold(trimmed)}
                  </p>
                );
              })}
            </div>
          );
        }

        return (
          <p key={pIdx} className="text-base sm:text-lg leading-[1.8] text-[#343A35]">
            {renderBold(pText)}
          </p>
        );
      })}
    </div>
  );
}

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return seoPages.map(page => ({ slug: page.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) return {};

  return createSeoMetadata({
    title: page.title,
    description: page.description,
    path: `/${page.slug}`,
    keywords: page.keywords,
  });
}

export default async function SeoPage({ params }) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const hasFaqs = Array.isArray(page.faqs) && page.faqs.length > 0;
  const showTemplates = page.showTemplates === true;
  const relatedGuides = getRelatedGuides(page);

  // Compute read time
  const totalWords = (page.sections || []).reduce(
    (acc, s) => acc + (s.content || "").split(/\s+/).length,
    0
  );
  const readTime = Math.max(3, Math.ceil(totalWords / 200));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (page.faqs || []).map(faq => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.h1 || page.title,
    description: page.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.nextcv.in/${page.slug}`,
    },
    author: {
      "@type": "Organization",
      name: "NextCV Editorial Team",
      url: "https://www.nextcv.in/about-us",
    },
    publisher: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://www.nextcv.in",
    },
    keywords: Array.isArray(page.keywords) ? page.keywords.join(", ") : undefined,
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
        name: page.h1,
        item: `https://www.nextcv.in/${page.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#17201C] selection:bg-[#e4ebff] selection:text-[#17201C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {hasFaqs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Editorial Article Header */}
      <header className="mx-auto max-w-4xl px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        {/* Title */}
        <h1 className="font-serif text-3xl font-normal leading-[1.12] tracking-tight text-[#17201C] sm:text-5xl lg:text-6xl">
          {page.h1}
        </h1>

        {/* Subtitle / Lead Paragraph */}
        <p className="mt-6 text-lg sm:text-xl font-normal leading-relaxed text-[#555C56]">
          {page.description}
        </p>

        {/* Editorial Metadata Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#EAE7DF] py-4 text-xs text-[#6F7670]">
          <div className="flex items-center gap-3">
            <Link href="/about-us" className="font-medium text-[#17201C] hover:underline">
              NextCV Editorial Team
            </Link>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#89908A]" />
              {readTime} min read
            </span>
            <span>·</span>
            <span className="text-emerald-700 font-medium">Verified for 2026 hiring</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={showTemplates ? "/templates" : "/ats-resume-builder"}
              className="font-medium text-[#465B9E] hover:underline"
            >
              {showTemplates ? "View Templates →" : "Build Resume →"}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* Main Unbroken Article Body */}
          <article className="min-w-0 max-w-3xl">
            {/* Lead Takeaway Callout */}
            <div className="mb-14 border-l-2 border-[#465B9E] bg-[#F4F1EA]/60 py-4 pl-6 pr-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                Quick Summary
              </p>
              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#4A514B]">
                This guide covers the exact formatting rules, section order, and wording expected by
                Indian employers and automated Applicant Tracking Systems. Follow these{" "}
                {page.sections?.length || 0} guidelines to create a clean, single-column resume.
              </p>
            </div>

            {/* Continuous Article Sections (No Cards, Pure Flowing Prose) */}
            <div className="divide-y divide-[#EAE7DF]">
              {page.sections && page.sections.length > 0 ? (
                page.sections.map((section, index) => {
                  const stepNum = String(index + 1).padStart(2, "0");
                  const sectionId = `section-${index + 1}`;

                  return (
                    <section
                      key={section.title || index}
                      id={sectionId}
                      className="scroll-mt-28 py-12 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-semibold text-[#465B9E]">
                          {stepNum}
                        </span>
                        <div className="h-px w-8 bg-[#D8D4C8]" />
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A918B]">
                          Section {stepNum}
                        </span>
                      </div>

                      <h2 className="mt-4 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#17201C]">
                        {section.title}
                      </h2>

                      <FormattedSectionContent content={section.content} />
                    </section>
                  );
                })
              ) : (
                <section className="py-8">
                  <p className="text-base sm:text-lg leading-relaxed text-[#343A35]">
                    {showTemplates
                      ? "Use this guide to shape a clear, relevant resume for your next application. NextCV offers one-time download plans ranging from ₹49 to ₹399 with no monthly subscription."
                      : "Use this guide to shape a clear, relevant resume for your next application."}
                  </p>
                </section>
              )}
            </div>

            {/* Frequently Asked Questions (Seamless Editorial Accordion) */}
            {hasFaqs && (
              <section id="faqs" className="scroll-mt-28 mt-20 border-t border-[#EAE7DF] pt-16">
                <div className="mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                    Questions & Answers
                  </span>
                  <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#17201C]">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="divide-y divide-[#EAE7DF]">
                  {page.faqs.map((faq, idx) => (
                    <details key={faq.q || idx} className="group py-6 first:pt-2 last:pb-2">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-serif text-lg sm:text-xl font-normal text-[#17201C]">
                        <span>{faq.q}</span>
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-lg font-light text-[#737A74] transition-transform duration-200 group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-4 text-base leading-relaxed text-[#555C56]">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* End of Article Callout */}
            <div className="mt-20 border-t border-[#EAE7DF] pt-12">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-medium text-[#17201C]">
                    Ready to build your resume?
                  </h3>
                  <p className="mt-1 text-sm text-[#555C56]">
                    Apply these guidelines with NextCV&apos;s ATS-compliant builder. One-time
                    payment from ₹49.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <Link
                    href={showTemplates ? "/templates" : "/ats-resume-builder"}
                    className="inline-flex items-center justify-center gap-2 bg-[#465B9E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#344B93]"
                  >
                    {showTemplates ? "Browse Templates" : "Build Resume"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/ats-resume-checker"
                    className="inline-flex items-center justify-center border border-[#D5D1C6] px-5 py-3 text-sm font-medium text-[#17201C] transition-colors hover:bg-[#F4F1EA]"
                  >
                    Check ATS Score
                  </Link>
                </div>
              </div>
            </div>
          </article>

          {/* Minimalist Borderless Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-12">
              {/* Table of Contents */}
              {page.sections && page.sections.length > 0 && (
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#838A84]">
                    Table of Contents
                  </p>
                  <nav className="mt-4 space-y-3 text-xs leading-relaxed">
                    {page.sections.map((section, idx) => (
                      <a
                        key={idx}
                        href={`#section-${idx + 1}`}
                        className="group flex items-start gap-2.5 text-[#555C56] transition-colors hover:text-[#465B9E]"
                      >
                        <span className="font-mono text-[#A8ADA7] group-hover:text-[#465B9E]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="line-clamp-2">{section.title}</span>
                      </a>
                    ))}
                    {hasFaqs && (
                      <a
                        href="#faqs"
                        className="group flex items-start gap-2.5 text-[#555C56] transition-colors hover:text-[#465B9E] pt-2 border-t border-[#EAE7DF]"
                      >
                        <span className="font-mono text-[#A8ADA7] group-hover:text-[#465B9E]">
                          ?
                        </span>
                        <span>Frequently Asked Questions</span>
                      </a>
                    )}
                  </nav>
                </div>
              )}

              {/* Related Guides (Minimalist Editorial Links) */}
              {relatedGuides.length > 0 && (
                <div className="border-t border-[#EAE7DF] pt-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#838A84]">
                    Related Reading
                  </p>
                  <div className="mt-4 space-y-3.5">
                    {relatedGuides.map(guide => (
                      <Link key={guide.slug} href={`/${guide.slug}`} className="group block">
                        <p className="text-xs font-medium leading-snug text-[#17201C] group-hover:text-[#465B9E] transition-colors line-clamp-2">
                          {guide.title}
                        </p>
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-[#838A84] group-hover:text-[#465B9E] transition-colors">
                          Read guide{" "}
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Callout (Borderless) */}
              <div className="border-t border-[#EAE7DF] pt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#838A84]">
                  NextCV Transparent Pricing
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#555C56]">
                  Pay once from ₹49 per resume. No recurring subscriptions or automatic credit card
                  renewals.
                </p>
                <Link
                  href="/pricing"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#465B9E] hover:underline"
                >
                  View Plans & FIRST20 Coupon <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
