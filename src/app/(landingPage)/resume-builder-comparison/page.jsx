import Link from "next/link";
import { ArrowUpRight, Check, Minus, DollarSign } from "lucide-react";

import { comparisonPages, featureStatusLabels } from "../comparison_pages.js";

export const metadata = {
  title: "Resume Builder Comparison | NextCV vs Popular Resume Builders",

  description:
    "Compare NextCV with Resume.io, Enhancv, Rezi, Kickresume, Zety, Novorésumé, FlowCV, Naukri and Canva on pricing, ATS, AI, templates and career features.",

  alternates: {
    canonical: "/resume-builder-comparison",
  },

  openGraph: {
    title: "Resume Builder Comparison | NextCV",
    description:
      "Compare NextCV with popular resume builders on pricing, ATS optimization, AI writing, templates and career features.",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Resume Builder Comparison | NextCV",
    description: "Compare NextCV with popular resume builders on pricing, ATS, AI and templates.",
  },
};

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
      <span className="inline-flex items-center gap-1.5 text-[#344B93]">
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
      className="group block border border-[#E3E3DD] bg-white/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#465B9E] hover:bg-white sm:p-7"
    >
      {/* TOP */}
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#646A64]">
            {page.category}
          </p>

          <h2 className="mt-4 font-serif text-2xl tracking-[-0.02em] text-[#17201C] sm:text-3xl">
            NextCV vs {page.competitor}
          </h2>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#E3E3DD] transition group-hover:border-[#465B9E] group-hover:bg-[#465B9E] group-hover:text-white">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="mt-4 max-w-xl text-sm leading-6 text-[#646A64]">{page.hero.description}</p>

      {/* FEATURE TAGS */}
      {tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span key={tag} className="border border-[#E3E3DD] px-3 py-1.5 text-xs text-[#5B625C]">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* QUICK COMPARISON */}
      <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-[#E3E3DD] pt-5">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">ATS</span>

          <FeatureMiniStatus value={features.atsChecker} />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">AI</span>

          <FeatureMiniStatus value={features.aiWriter} />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">Job Match</span>

          <FeatureMiniStatus value={features.jdMatching} />
        </div>

        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="text-[#646A64]">Portfolio</span>

          <FeatureMiniStatus value={features.portfolio} />
        </div>
      </div>

      {/* CTA */}
      <div className="mt-7 flex items-center gap-2 text-sm font-medium text-[#344B93]">
        Compare {page.competitor}
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
            className={`shrink-0 border px-4 py-2 text-sm transition ${
              isActive
                ? "border-[#17201C] bg-[#17201C] text-white"
                : "border-[#DCDDD7] text-[#646A64] hover:border-[#465B9E] hover:text-[#17201C]"
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

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-24 lg:pt-32">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#465B9E]">
            Resume Builder Comparison
          </p>

          <h1 className="font-serif text-4xl leading-[1.05] tracking-[-0.04em] sm:text-5xl lg:text-7xl">
            Compare NextCV with
            <span className="text-[#465B9E]"> popular resume builders.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[#5B625C] sm:text-lg">
            Compare pricing, ATS optimization, AI writing, templates, job matching and career
            features to find the resume builder that fits your job search.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#17201C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#344B93]"
            >
              Build Your Resume Free
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-[#DCDDD7] px-6 py-3 text-sm font-medium transition hover:border-[#465B9E]"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* WHY COMPARE */}
      {/* ================================================= */}

      <section className="border-y border-[#E3E3DD]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:px-8 md:grid-cols-3 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#465B9E]">01</p>

            <h2 className="mt-3 font-serif text-xl">Pricing</h2>

            <p className="mt-2 text-sm leading-6 text-[#646A64]">
              Compare one-time payments, subscriptions, free plans and overall value.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#465B9E]">02</p>

            <h2 className="mt-3 font-serif text-xl">ATS & AI</h2>

            <p className="mt-2 text-sm leading-6 text-[#646A64]">
              Compare the tools that actually help candidates create and tailor modern job
              applications.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#465B9E]">03</p>

            <h2 className="mt-3 font-serif text-xl">Indian Job Seekers</h2>

            <p className="mt-2 text-sm leading-6 text-[#646A64]">
              See which products fit students, freshers and Indian applicants.
            </p>
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
              Compare platforms
            </p>

            <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] sm:text-4xl">
              Choose a comparison
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#646A64]">
            Explore detailed comparisons covering pricing, ATS, AI, templates, job matching and
            career workflows.
          </p>
        </div>

        {/* FILTER */}
        <CategoryFilter activeCategory={activeCategory} />

        {/* RESULTS */}
        {sortedPages.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {sortedPages.map(page => (
              <ComparisonCard key={page.slug} page={page} />
            ))}
          </div>
        ) : (
          <div className="border border-[#E3E3DD] bg-white/40 px-6 py-16 text-center">
            <h3 className="font-serif text-2xl">No comparisons found</h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#646A64]">
              Try another comparison category.
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
      {/* SEO INTRO */}
      {/* ================================================= */}

      <section className="border-t border-[#E3E3DD]">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
              How to choose
            </p>

            <h2 className="mt-4 font-serif text-3xl tracking-[-0.025em] sm:text-4xl">
              What should you compare in a resume builder?
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-[#5B625C]">
              <p>
                The best resume builder is not necessarily the one with the most templates. For most
                job seekers, the important factors are ATS compatibility, relevant keywords,
                readable formatting, AI assistance and the ability to tailor a resume to a specific
                job.
              </p>

              <p>
                Pricing also matters. Some resume platforms use recurring subscriptions, while
                others offer free plans or one-time purchases. NextCV is designed around an
                affordable, pay-once resume workflow for Indian students and freshers.
              </p>

              <p>
                Use the comparisons above to evaluate the actual features offered by each platform
                rather than choosing based only on template design or marketing claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* BOTTOM CTA */}
      {/* ================================================= */}

      <section className="border-t border-[#E3E3DD]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#465B9E]">
            Ready to build?
          </p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">
            Build your resume before you pay.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-[#646A64]">
            Create, edit and improve your resume with NextCV before choosing a paid plan.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#465B9E] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#344B93]"
            >
              Create Your Resume
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-[#DCDDD7] px-7 py-3.5 text-sm font-medium transition hover:border-[#465B9E]"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
