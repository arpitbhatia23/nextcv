import Link from "next/link";
import careerPages from "../career-pages.json";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  Briefcase,
  Layers,
  TrendingUp,
  FileText,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Search,
  ShieldCheck,
} from "lucide-react";

export const metadata = createSeoMetadata({
  title: "Career Guides: Job Paths, Salaries & Interview Tips | NextCV",
  description:
    "Explore 120+ comprehensive career guides. Learn in-demand skills, salary benchmarks in India, day-to-day responsibilities, interview loops, and resume tips.",
  path: "/career",
  keywords: [
    "career guides",
    "career guide",
    "career advice India",
    "career paths and salaries",
    "software engineer career guide",
    "job search tips",
    "interview preparation guide",
    "tech career roadmaps",
    "career guide for freshers",
    "highest paying jobs in India",
    "resume tips by industry",
  ],
});

const ITEMS_PER_PAGE = 9;

const popularRoles = [
  { name: "Software Engineer", slug: "software-engineer-career-guide" },
  { name: "Data Scientist", slug: "data-scientist-career-guide" },
  { name: "Product Manager", slug: "product-manager-career-guide" },
  { name: "UX Designer", slug: "ux-designer-career-guide" },
  { name: "Data Analyst", slug: "data-analyst-career-guide" },
  { name: "Business Analyst", slug: "business-analyst-career-guide" },
  { name: "Digital Marketing", slug: "digital-marketing-manager-career-guide" },
  { name: "HR Manager", slug: "hr-manager-career-guide" },
];

const guidePillars = [
  {
    icon: Briefcase,
    title: "Responsibilities & Realities",
    desc: "Understand what professionals actually do day-to-day, key decision frameworks, and cross-team workflows.",
  },
  {
    icon: Layers,
    title: "Must-Have vs. Bonus Skills",
    desc: "Distinguish between baseline technical requirements, core tools, and high-leverage differentiating competencies.",
  },
  {
    icon: TrendingUp,
    title: "Salary Benchmarks in India",
    desc: "Realistic compensation bands (LPA) across Junior (0–2 yrs), Mid-level (3–6 yrs), and Senior (7+ yrs) stages.",
  },
  {
    icon: CheckCircle2,
    title: "Interview Loops & STAR Prep",
    desc: "Breakdowns of recruiter screens, technical assessments, system design, and structured behavioral questions.",
  },
  {
    icon: FileText,
    title: "ATS Resume Writing Strategy",
    desc: "Proven action verbs, quantifiable achievement bullets, and formatting rules to pass automated filters.",
  },
];

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getCategory(item) {
  return item.category || item.type || item.industry || "Career Guide";
}

function getReadTime(item) {
  if (item.readTime) return item.readTime;

  const content = item.content || "";
  const words = content
    .replace(/[#*_`>-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function getExcerpt(item) {
  if (item.excerpt) return item.excerpt;

  const content = item.content || "";

  return content
    .replace(/#{1,6}\s+/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/>\s?/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 150)
    .concat(content.length > 150 ? "…" : "");
}

function getTitle(item) {
  return item.title || item.name || "Career Guide";
}

function getSlug(item) {
  return item.slug || slugify(getTitle(item));
}

function getPageNumbers(currentPage, totalPages) {
  if (totalPages <= 1) return [1];

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = [];

  pages.push(1);

  if (currentPage > 4) {
    pages.push("left-ellipsis");
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (currentPage < totalPages - 3) {
    pages.push("right-ellipsis");
  }

  pages.push(totalPages);

  return pages;
}

export default async function CareerList({ searchParams }) {
  const params = await searchParams;

  const rawPage = Number(params?.page) || 1;

  const totalItems = careerPages.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Keep page within valid range
  const page = Math.min(Math.max(rawPage, 1), totalPages);

  const startIdx = (page - 1) * ITEMS_PER_PAGE;

  const currentItems = careerPages.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const pageNumbers = getPageNumbers(page, totalPages);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "NextCV Career Guides Hub",
        url: "https://www.nextcv.in/career",
        description:
          "Comprehensive career guides covering job roles, in-demand technical skills, salary benchmarks in India, and interview preparation roadmaps.",
        publisher: {
          "@type": "Organization",
          name: "NextCV",
          url: "https://www.nextcv.in",
        },
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
            name: "Career Guides",
            item: "https://www.nextcv.in/career",
          },
        ],
      },
      {
        "@type": "ItemList",
        name: `Career Guides - Page ${page}`,
        numberOfItems: currentItems.length,
        itemListElement: currentItems.map((item, idx) => ({
          "@type": "ListItem",
          position: startIdx + idx + 1,
          name: getTitle(item),
          url: `https://www.nextcv.in/career/${getSlug(item)}`,
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#18181b]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-black/6 bg-white">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 bg-orange-100/70 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 h-96 w-96 bg-blue-100/60 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 border border-black/8 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 shadow-sm">
              <span className="h-1.5 w-1.5 bg-orange-500" />
              120+ In-Depth Career Guides
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-[-0.03em] text-zinc-950 sm:text-5xl lg:text-6xl">
              Comprehensive Career Guides:
              <br />
              <span className="text-zinc-500">Job Roles, Salaries & Roadmaps</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Explore 120+ practical career guides covering in-demand technical skills, salary
              benchmarks in India, daily responsibilities, interview loops, and ATS resume tips.
            </p>

            {/* Popular Roles Quick Links */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Popular Career Paths:
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {popularRoles.map(role => (
                  <Link
                    key={role.slug}
                    href={`/career/${role.slug}`}
                    className="inline-flex items-center gap-1.5 border border-black/8 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                  >
                    {role.name}
                    <ArrowRight className="h-3 w-3 text-zinc-400" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-black/8 pt-8">
              <div>
                <div className="text-2xl font-semibold tracking-tight text-zinc-950">
                  {totalItems}+
                </div>

                <div className="mt-1 text-sm text-zinc-500">Career guides</div>
              </div>

              <div className="hidden h-10 w-px bg-black/10 sm:block" />

              <div>
                <div className="text-2xl font-semibold tracking-tight text-zinc-950">
                  India Salaries
                </div>

                <div className="mt-1 text-sm text-zinc-500">LPA benchmarks</div>
              </div>

              <div className="hidden h-10 w-px bg-black/10 sm:block" />

              <div>
                <div className="text-2xl font-semibold tracking-tight text-zinc-950">100% Free</div>

                <div className="mt-1 text-sm text-zinc-500">Open access for all</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          PILLARS / WHAT WE COVER
      ====================================================== */}
      <section className="border-b border-black/6 bg-[#FAF9F6] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-orange-600">
              Inside Every Guide
            </p>
            <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-zinc-950">
              What Each Career Guide Covers
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Our guides are engineered to give job seekers clear, actionable frameworks rather than
              generic career advice.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {guidePillars.map(pillar => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="border border-black/[0.07] bg-white p-5 shadow-xs transition hover:border-orange-300"
                >
                  <div className="flex h-10 w-10 items-center justify-center bg-orange-50 text-orange-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-base font-medium text-zinc-950">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-500">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT / CARDS
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-orange-600">
              Directory
            </p>

            <h2 className="font-serif text-3xl font-medium tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Explore All 120+ Career Roadmaps
            </h2>
          </div>

          <p className="text-sm text-zinc-500">
            Showing <span className="font-medium text-zinc-700">{startIdx + 1}</span> –{" "}
            <span className="font-medium text-zinc-700">
              {Math.min(startIdx + currentItems.length, totalItems)}
            </span>{" "}
            of <span className="font-medium text-zinc-700">{totalItems} guides</span>
          </p>
        </div>

        {/* CARDS */}
        {currentItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((item, index) => {
              const title = getTitle(item);
              const slug = getSlug(item);
              const category = getCategory(item);
              const readTime = getReadTime(item);
              const excerpt = getExcerpt(item);

              return (
                <article
                  key={`${slug}-${index}`}
                  className="group relative flex h-full flex-col overflow-hidden border border-black/[0.07] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/12 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  {/* Top accent */}
                  <div className="h-1 w-full bg-linear-to-r from-orange-400 via-orange-500 to-amber-400 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex flex-1 flex-col p-7">
                    {/* Meta */}
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="inline-flex max-w-[70%] items-center truncate bg-zinc-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-600">
                        {category}
                      </span>

                      <span className="shrink-0 text-xs text-zinc-400">{readTime}</span>
                    </div>

                    {/* Number */}
                    <div className="mb-5 text-xs font-semibold tracking-[0.15em] text-zinc-300">
                      {String(startIdx + index + 1).padStart(2, "0")}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl font-medium leading-tight tracking-[-0.025em] text-zinc-950 transition-colors duration-200 group-hover:text-orange-600">
                      <Link
                        href={`/career/${slug}`}
                        className="outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-orange-500"
                      >
                        {title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-500">{excerpt}</p>

                    {/* Bottom */}
                    <div className="mt-auto pt-8">
                      <Link
                        href={`/career/${slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 transition-all duration-200 group-hover:gap-3 group-hover:text-orange-600"
                      >
                        Read guide
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-black/[0.07] bg-white px-6 py-20 text-center">
            <h3 className="font-serif text-2xl font-medium text-zinc-950">No career guides found</h3>

            <p className="mt-3 text-sm text-zinc-500">Try returning to the first page.</p>

            <Link
              href="/career?page=1"
              className="mt-7 inline-flex bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              View career guides
            </Link>
          </div>
        )}

        {/* ===================================================
            PAGINATION
        ==================================================== */}
        {totalPages > 1 && (
          <nav
            aria-label="Career guides pagination"
            className="mt-14 flex flex-col items-center justify-center gap-5 border-t border-black/[0.07] pt-8 sm:flex-row"
          >
            {/* Previous */}
            {page > 1 ? (
              <Link
                href={`/career?page=${page - 1}`}
                className="inline-flex h-11 items-center gap-2 border border-black/8 bg-white px-5 text-sm font-semibold text-zinc-700 transition-all hover:border-black/15 hover:bg-zinc-50 hover:text-zinc-950"
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path
                    d="M7 4L3 8L7 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex h-11 cursor-not-allowed items-center gap-2 border border-black/5 bg-zinc-100 px-5 text-sm font-semibold text-zinc-300"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M13 8H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path
                    d="M7 4L3 8L7 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Previous
              </span>
            )}

            {/* Page numbers */}
            <div className="flex items-center gap-1.5">
              {pageNumbers.map((item, index) => {
                if (item === "left-ellipsis" || item === "right-ellipsis") {
                  return (
                    <span
                      key={`${item}-${index}`}
                      className="flex h-11 w-9 items-center justify-center text-sm text-zinc-400"
                    >
                      …
                    </span>
                  );
                }

                const isActive = item === page;

                return (
                  <Link
                    key={item}
                    href={`/career?page=${item}`}
                    aria-current={isActive ? "page" : undefined}
                    className={[
                      "flex h-11 min-w-11 items-center justify-center px-3 text-sm font-semibold transition-all",
                      isActive
                        ? "bg-zinc-950 text-white shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950",
                    ].join(" ")}
                  >
                    {item}
                  </Link>
                );
              })}
            </div>

            {/* Next */}
            {page < totalPages ? (
              <Link
                href={`/career?page=${page + 1}`}
                className="inline-flex h-11 items-center gap-2 border border-black/8 bg-white px-5 text-sm font-semibold text-zinc-700 transition-all hover:border-black/15 hover:bg-zinc-50 hover:text-zinc-950"
                aria-label="Next page"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path
                    d="M9 4L13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex h-11 cursor-not-allowed items-center gap-2 border border-black/5 bg-zinc-100 px-5 text-sm font-semibold text-zinc-300"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path
                    d="M9 4L13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
          </nav>
        )}
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-12 lg:pb-24">
        <div className="relative overflow-hidden bg-zinc-950 px-7 py-12 sm:px-10 sm:py-14 lg:px-14">
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 bg-orange-500/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 bg-blue-500/10 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange-400">
              Ready for your next opportunity?
            </p>

            <h2 className="mt-4 font-serif text-3xl font-medium leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
              Build a Resume Tailored to Your Target Career
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              Combine role-specific insights from our career guides with NextCV&apos;s ATS resume
              builder. Pass automated screening filters and land more interviews.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/ats-resume-builder"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Build ATS Resume Free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/ats-resume-checker"
                className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Check Resume Score
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
