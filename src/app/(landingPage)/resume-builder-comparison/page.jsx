import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Minus,
  DollarSign,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  X,
} from "lucide-react";
import { createSeoMetadata } from "@/shared/utils/seo";
import { comparisonPages } from "../comparison_pages.js";

export const metadata = createSeoMetadata({
  title: "Resume Builder Comparison (2026): NextCV vs Top 9 Tools | NextCV",
  description:
    "Compare NextCV with Zety, Resume.io, Canva, Novorésumé & Naukri. Compare ATS scores, AI writing, and one-time ₹49 pricing vs $25/month recurring subscriptions.",
  path: "/resume-builder-comparison",
  keywords: [
    "resume builder comparison",
    "best resume builder india",
    "nextcv vs resume io",
    "nextcv vs zety",
    "nextcv vs canva",
    "ats resume builder india",
    "affordable resume builder",
    "resume builder comparison 2026",
  ],
});

// ---------------------------------------------------------
// CATEGORIES
// ---------------------------------------------------------

const categories = [
  "All",
  "Resume Builder",
  "ATS Resume Builder",
  "AI Resume Builder",
  "India Resume Builder",
  "Design Resume Builder",
];

// ---------------------------------------------------------
// FAQS
// ---------------------------------------------------------

const faqs = [
  {
    q: "Why does NextCV charge ₹49 one-time instead of a monthly subscription?",
    a: "Most global resume builders (Zety, Resume.io, Novorésumé) bill users $15–$25 (₹1,200–₹2,000) every month with auto-renewing subscriptions that candidates forget to cancel. NextCV was built specifically for Indian students and freshers: you pay once from ₹49 when downloading your verified ATS PDF, with zero recurring auto-debit charges.",
  },
  {
    q: "Can I use Canva instead of an ATS resume builder?",
    a: "Canva is an exceptional graphic design tool, but its resumes frequently fail Applicant Tracking Systems (ATS) used by companies like TCS, Infosys, and Deloitte. Canva exports multi-column grids, decorative icons, and complex SVG tables as unparseable visual layers. NextCV produces single-column, text-selectable PDFs that parse with 100% text-extraction accuracy across Workday, Taleo, and Darwinbox.",
  },
  {
    q: "Which resume builder is best for Indian freshers and campus placements?",
    a: "NextCV is purpose-built for the Indian hiring ecosystem. It includes built-in fields for 10-point CGPA notation, Class 10th and 12th board percentages, +91 contact formats, and technical project templates with live GitHub and deployment links tailored for Indian IT MNCs and startups.",
  },
  {
    q: "Can I test my resume and check my ATS score before paying?",
    a: "Yes. You can build, format, and preview your entire resume on NextCV completely free. You can also run the free NextCV ATS Resume Checker to evaluate your score (0–100) and review missing keywords against your target job description before making any payment.",
  },
  {
    q: "Can I edit my resume after downloading it?",
    a: "Yes. Your resume remains securely saved in your NextCV dashboard. You can return anytime to update project details, add newly acquired skills, or tweak your work experience for different job applications.",
  },
];

// ---------------------------------------------------------
// FEATURE TAGS
// ---------------------------------------------------------

function getFeatureTags(page) {
  const features = page.features || {};
  const tags = [];

  if (features.atsChecker === "available" || features.atsChecker === "paid") {
    tags.push("ATS");
  }
  if (features.aiWriter === "available" || features.aiWriter === "paid") {
    tags.push("AI");
  }
  if (features.templates === "available" || features.templates === "paid") {
    tags.push("Templates");
  }
  if (features.jdMatching === "available" || features.jdMatching === "paid") {
    tags.push("Job Matching");
  }
  if (features.coverLetter === "available" || features.coverLetter === "paid") {
    tags.push("Cover Letter");
  }
  if (features.portfolio === "available" || features.portfolio === "paid") {
    tags.push("Portfolio");
  }

  return tags.slice(0, 5);
}

// ---------------------------------------------------------
// FEATURE STATUS
// ---------------------------------------------------------

function FeatureMiniStatus({ value }) {
  if (value === "available") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[#344B93] font-medium">
        <Check className="h-3.5 w-3.5" />
        Available
      </span>
    );
  }

  if (value === "paid") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[#344B93]">
        <DollarSign className="h-3.5 w-3.5" />
        Paid
      </span>
    );
  }

  if (value === "limited") {
    return <span className="text-[#646A64]">Limited</span>;
  }

  return (
    <span className="inline-flex items-center gap-1.5 text-[#8A8E88]">
      <Minus className="h-3.5 w-3.5" />
      Not available
    </span>
  );
}

// ---------------------------------------------------------
// COMPARISON CARD
// ---------------------------------------------------------

function ComparisonCard({ page }) {
  const tags = getFeatureTags(page);
  const features = page.features || {};

  return (
    <Link
      href={`/resume-builder-comparison/${page.slug}`}
      className="group block border border-[#E3E3DD] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#465B9E] hover:shadow-sm sm:p-7"
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#465B9E]">
            {page.category}
          </p>

          <h2 className="mt-3 font-serif text-2xl tracking-[-0.02em] text-[#17201C] sm:text-3xl">
            NextCV vs {page.competitor}
          </h2>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E3E3DD] transition group-hover:border-[#465B9E] group-hover:bg-[#465B9E] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="mt-4 text-sm leading-6 text-[#5B625C]">{page.hero.description}</p>

      {/* FEATURE TAGS */}
      {tags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="border border-[#E3E3DD] bg-[#FAF9F6] px-2.5 py-1 text-xs text-[#5B625C]"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* QUICK COMPARISON */}
      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[#E3E3DD] pt-5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">ATS Checker</span>
          <FeatureMiniStatus value={features.atsChecker} />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">AI Writer</span>
          <FeatureMiniStatus value={features.aiWriter} />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">Job Matching</span>
          <FeatureMiniStatus value={features.jdMatching} />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">Portfolio</span>
          <FeatureMiniStatus value={features.portfolio} />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#465B9E]">
        Compare NextCV vs {page.competitor}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

// ---------------------------------------------------------
// CATEGORY FILTER
// ---------------------------------------------------------

function CategoryFilter({ activeCategory }) {
  return (
    <div className="mb-10 flex gap-2 overflow-x-auto pb-2">
      {categories.map(category => {
        const isActive = activeCategory === category;

        const href =
          category === "All"
            ? "/resume-builder-comparison"
            : `/resume-builder-comparison?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            className={`shrink-0 border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "border-[#17201C] bg-[#17201C] text-white"
                : "border-[#DCDDD7] bg-white text-[#646A64] hover:border-[#465B9E] hover:text-[#17201C]"
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------
// PAGE
// ---------------------------------------------------------

export default async function ResumeBuilderComparisonPage({ searchParams }) {
  const params = await searchParams;
  const requestedCategory = typeof params?.category === "string" ? params.category : "All";
  const activeCategory = categories.includes(requestedCategory) ? requestedCategory : "All";

  const filteredPages =
    activeCategory === "All"
      ? comparisonPages
      : comparisonPages.filter(page => page.category === activeCategory);

  const sortedPages = [...filteredPages].sort((a, b) => a.priority - b.priority);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Resume Builder Comparison Hub",
        description:
          "Compare NextCV with Zety, Resume.io, Canva, Novorésumé & Naukri. Compare ATS scores, AI writing, and one-time ₹49 pricing vs $25/month recurring subscriptions.",
        url: "https://www.nextcv.in/resume-builder-comparison",
      },
      {
        "@type": "ItemList",
        name: "Resume Builder Comparisons",
        numberOfItems: comparisonPages.length,
        itemListElement: comparisonPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `NextCV vs ${page.competitor}`,
          url: `https://www.nextcv.in/resume-builder-comparison/${page.slug}`,
        })),
      },
      {
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
            name: "Resume Builder Comparison",
            item: "https://www.nextcv.in/resume-builder-comparison",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
        <div className="max-w-4xl">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#465B9E]">
            <Sparkles className="h-4 w-4" /> Comprehensive Resume Builder Benchmark (2026)
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
            Compare NextCV with
            <span className="text-[#465B9E]"> popular resume builders.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[#5B625C] sm:text-lg">
            Compare one-time pricing against monthly subscription traps, test ATS compatibility
            rates, and evaluate AI bullet generation to pick the right platform for your job hunt.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#17201C] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#344B93]"
            >
              Build Your Resume Free
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-[#DCDDD7] bg-white px-6 py-3.5 text-sm font-semibold text-[#17201C] transition hover:border-[#465B9E]"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* EXECUTIVE COMPARISON TABLE */}
      {/* ================================================= */}

      <section className="border-y border-[#E3E3DD] bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#465B9E]">
              Quick Benchmark
            </p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.025em] text-[#17201C] sm:text-4xl">
              NextCV vs Industry Competitor Categories
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5B625C]">
              How NextCV's transparent pay-once architecture compares to global subscription
              platforms, graphic design suites, and job portals.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto border border-[#E3E3DD]">
            <table className="w-full min-w-170 text-left text-sm">
              <thead className="border-b border-[#E3E3DD] bg-[#FAF9F6] text-xs font-semibold uppercase tracking-wider text-[#17201C]">
                <tr>
                  <th className="py-4 px-5">Platform Category</th>
                  <th className="py-4 px-5">Pricing Model</th>
                  <th className="py-4 px-5">Auto-Debit Risk</th>
                  <th className="py-4 px-5">ATS Parseability</th>
                  <th className="py-4 px-5">AI Bullet Tuning</th>
                  <th className="py-4 px-5">India Hiring Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E3DD] text-[#17201C]">
                <tr className="bg-[#EEF0F7]/40 font-medium">
                  <td className="py-4 px-5 flex items-center gap-2 text-[#465B9E]">
                    <ShieldCheck className="h-4 w-4" /> NextCV
                  </td>
                  <td className="py-4 px-5 font-semibold text-[#17201C]">From ₹49 (One-Time)</td>
                  <td className="py-4 px-5 text-emerald-600 font-semibold">Zero Auto-Debit</td>
                  <td className="py-4 px-5 text-emerald-600">100% Text-Selectable</td>
                  <td className="py-4 px-5 text-emerald-600">Included Free</td>
                  <td className="py-4 px-5 text-emerald-600">High (CGPA, +91, Indian IT)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium">Global Builders (Resume.io, Zety)</td>
                  <td className="py-4 px-5 text-[#5B625C]">$15–$25 / month</td>
                  <td className="py-4 px-5 text-rose-600">Recurring Monthly</td>
                  <td className="py-4 px-5 text-[#5B625C]">Good (Single Column)</td>
                  <td className="py-4 px-5 text-[#5B625C]">Paywalled</td>
                  <td className="py-4 px-5 text-[#5B625C]">Moderate (USD pricing)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium">Design Suites (Canva)</td>
                  <td className="py-4 px-5 text-[#5B625C]">Free or ₹499 / mo Pro</td>
                  <td className="py-4 px-5 text-[#5B625C]">Recurring for Pro</td>
                  <td className="py-4 px-5 text-rose-600">Poor (Multi-column graphics)</td>
                  <td className="py-4 px-5 text-[#5B625C]">Basic Text AI</td>
                  <td className="py-4 px-5 text-[#5B625C]">Low (Unparseable OCR)</td>
                </tr>
                <tr>
                  <td className="py-4 px-5 font-medium">Job Boards (Naukri)</td>
                  <td className="py-4 px-5 text-[#5B625C]">Free Basic / Paid Services</td>
                  <td className="py-4 px-5 text-[#5B625C]">No Auto-Debit</td>
                  <td className="py-4 px-5 text-[#5B625C]">Standard Plain Text</td>
                  <td className="py-4 px-5 text-rose-600">None</td>
                  <td className="py-4 px-5 text-[#5B625C]">Moderate (Basic layouts)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* COMPARISON GRID */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#646A64]">
              Platform Head-to-Head
            </p>

            <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] sm:text-4xl">
              Choose a specific comparison
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#5B625C]">
            Detailed breakdowns comparing pricing structures, feature tables, ATS parsers, and real
            candidate verdicts.
          </p>
        </div>

        {/* FILTER */}
        <CategoryFilter activeCategory={activeCategory} />

        {/* RESULTS */}
        {sortedPages.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {sortedPages.map(page => (
              <ComparisonCard key={page.slug} page={page} />
            ))}
          </div>
        ) : (
          <div className="border border-[#E3E3DD] bg-white px-6 py-16 text-center">
            <h3 className="font-serif text-2xl">No comparisons found</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#646A64]">
              Try selecting another category above.
            </p>
            <Link
              href="/resume-builder-comparison"
              className="mt-6 inline-flex items-center gap-2 bg-[#17201C] px-5 py-3 text-sm font-medium text-white"
            >
              View All Comparisons
            </Link>
          </div>
        )}
      </section>

      {/* ================================================= */}
      {/* FAQ SECTION */}
      {/* ================================================= */}

      <section className="border-t border-[#E3E3DD] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
              Clear Answers
            </p>
            <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] text-[#17201C] sm:text-4xl">
              Frequently Asked Questions About Choosing a Resume Builder
            </h2>
          </div>

          <dl className="divide-y divide-[#E3E3DD]">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="flex items-start justify-between gap-4">
                  <span className="text-base font-semibold text-[#17201C]">{q}</span>
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#8A908B] mt-0.5" />
                </dt>
                <dd className="mt-3 text-sm leading-7 text-[#5B625C]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ================================================= */}
      {/* BOTTOM CTA */}
      {/* ================================================= */}

      <section className="border-t border-[#E3E3DD] bg-[#F8F7F3]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
            Get Started
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">
            Build your resume before you pay.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#5B625C]">
            Test your ATS score, customize bullet points with AI, and download your final PDF for
            just ₹49 one-time.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#465B9E] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#344B93]"
            >
              Create Your Resume
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-[#DCDDD7] bg-white px-7 py-3.5 text-sm font-semibold text-[#17201C] transition hover:border-[#465B9E]"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
