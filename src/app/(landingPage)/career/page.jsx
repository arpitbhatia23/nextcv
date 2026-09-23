import Link from "next/link";
import careerPages from "../career-pages.json";
import { createSeoMetadata } from "@/shared/utils/seo";

export const metadata = createSeoMetadata({
  title: "Career Guide | NextCV",
  description:
    "Explore practical career guides on job search, resumes, interviews, skills, career growth, and landing your next job with NextCV.",
  path: "/career",
  keywords: [
    "career guide",
    "career advice",
    "career guidance",
    "job search tips",
    "career development",
    "career growth",
    "job interview tips",
    "resume tips",
    "job application tips",
    "career tips for freshers",
    "career guide for freshers",
    "how to get a job",
  ],
});
const ITEMS_PER_PAGE = 9;

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
  /*
   * Next.js App Router:
   * searchParams is a Promise in newer Next.js versions.
   */
  const params = await searchParams;

  const rawPage = Number(params?.page) || 1;

  const totalItems = careerPages.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Keep page within valid range
  const page = Math.min(Math.max(rawPage, 1), totalPages);

  const startIdx = (page - 1) * ITEMS_PER_PAGE;

  const currentItems = careerPages.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <main className="min-h-screen bg-[#fafaf9] text-[#18181b]">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-black/6 bg-white">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-orange-100/70 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-blue-100/60 blur-3xl"
        />

        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-24 sm:px-8 lg:px-12 lg:pb-20 lg:pt-32">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              Career Guides
            </div>

            {/* Heading */}
            <h1 className="font-serif text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-zinc-950 sm:text-6xl lg:text-7xl">
              Build your career
              <br />
              <span className="text-zinc-400">with better information.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
              Practical career guides covering interviews, companies, salaries, hiring processes,
              skills, and everything you need to prepare for your next opportunity.
            </p>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div>
                <div className="text-2xl font-semibold tracking-tight text-zinc-950">
                  {totalItems}+
                </div>

                <div className="mt-1 text-sm text-zinc-500">Career guides</div>
              </div>

              <div className="hidden h-10 w-px bg-black/10 sm:block" />

              <div>
                <div className="text-2xl font-semibold tracking-tight text-zinc-950">Updated</div>

                <div className="mt-1 text-sm text-zinc-500">Regularly</div>
              </div>

              <div className="hidden h-10 w-px bg-black/10 sm:block" />

              <div>
                <div className="text-2xl font-semibold tracking-tight text-zinc-950">Free</div>

                <div className="mt-1 text-sm text-zinc-500">For everyone</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.15em] text-orange-600">
              Explore
            </p>

            <h2 className="font-serif text-3xl font-medium tracking-[-0.03em] text-zinc-950 sm:text-4xl">
              Latest career guides
            </h2>
          </div>

          <p className="text-sm text-zinc-500">
            Showing <span className="font-medium text-zinc-700">{startIdx + 1}</span> –{" "}
            <span className="font-medium text-zinc-700">
              {Math.min(startIdx + currentItems.length, totalItems)}
            </span>{" "}
            of <span className="font-medium text-zinc-700">{totalItems}</span>
          </p>
        </div>

        {/* ===================================================
            CARDS
        ==================================================== */}
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
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/[0.07] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-black/12 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]"
                >
                  {/* Top accent */}
                  <div className="h-1 w-full bg-linear-to-r from-orange-400 via-orange-500 to-amber-400 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex flex-1 flex-col p-7">
                    {/* Meta */}
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <span className="inline-flex max-w-[70%] items-center truncate rounded-full bg-zinc-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-600">
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          <path
                            d="M3 8H13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />

                          <path
                            d="M9 4L13 8L9 12"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-3xl border border-black/[0.07] bg-white px-6 py-20 text-center">
            <h3 className="font-serif text-2xl font-medium text-zinc-950">
              No career guides found
            </h3>

            <p className="mt-3 text-sm text-zinc-500">Try going back to the first page.</p>

            <Link
              href="/career?page=1"
              className="mt-7 inline-flex rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
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
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/8 bg-white px-5 text-sm font-semibold text-zinc-700 transition-all hover:border-black/15 hover:bg-zinc-50 hover:text-zinc-950"
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
                className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-black/5 bg-zinc-100 px-5 text-sm font-semibold text-zinc-300"
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
                      "flex h-11 min-w-11 items-center justify-center rounded-full px-3 text-sm font-semibold transition-all",
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
                className="inline-flex h-11 items-center gap-2 rounded-full border border-black/8 bg-white px-5 text-sm font-semibold text-zinc-700 transition-all hover:border-black/15 hover:bg-zinc-50 hover:text-zinc-950"
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
                className="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border border-black/5 bg-zinc-100 px-5 text-sm font-semibold text-zinc-300"
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
        <div className="relative overflow-hidden rounded-2xl bg-zinc-950 px-7 py-12 sm:px-10 sm:py-14 lg:px-14">
          {/* Background decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange-400">
              Ready for your next opportunity?
            </p>

            <h2 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-[-0.03em] text-white sm:text-5xl">
              Turn your experience into a resume that gets noticed.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400">
              Create a professional resume with NextCV and present your skills, projects, and
              experience with confidence.
            </p>

            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-zinc-950 transition hover:bg-orange-500 hover:text-white"
              >
                Build your resume
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
