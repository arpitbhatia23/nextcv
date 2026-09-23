import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Source_Serif_4, Inter } from "next/font/google";
import careerPages from "../../career-pages.json";
import { createSeoMetadata } from "@/shared/utils/seo";

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = getPage(slug);

  if (!page) return {};

  return createSeoMetadata({
    title: page.title,
    description:
      "Explore practical career guides on job search, resumes, interviews, skills, career growth, and landing your next job with NextCV.",
    path: `/${page.slug}`,
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
}

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

  return {
    title: `${career.title} | NextCV`,
    description: career.content?.replace(/[#*_`]/g, "")?.slice(0, 155),
  };
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                   */
/* -------------------------------------------------------------------------- */

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Creates unique heading IDs.
 *
 * Example:
 *
 * ## Typical Day-to-Day Tasks
 * ## Typical Day-to-Day Tasks
 *
 * becomes:
 *
 * typical-day-to-day-tasks
 * typical-day-to-day-tasks-2
 */
function createHeadingIdGenerator() {
  const usedIds = new Map();

  return text => {
    const baseId = slugifyHeading(text);

    const count = usedIds.get(baseId) || 0;

    usedIds.set(baseId, count + 1);

    if (count === 0) {
      return baseId;
    }

    return `${baseId}-${count + 1}`;
  };
}

/**
 * Extract headings using the SAME ID generation logic
 * that is later used by ReactMarkdown.
 *
 * This is important because the TOC and actual headings
 * must point to exactly the same IDs.
 */
function extractHeadings(markdown) {
  const getHeadingId = createHeadingIdGenerator();

  return markdown
    .split("\n")
    .filter(line => /^##\s+/.test(line.trim()))
    .map(line => {
      const text = line.replace(/^##\s+/, "").trim();

      return {
        text,
        id: getHeadingId(text),
      };
    });
}

function getCategory(title) {
  if (title.includes("Interview")) return "Interview Prep";
  if (title.includes("Resume")) return "Resume Guide";

  return "Career Guide";
}

function getReadTime(markdown) {
  const words = markdown.trim().split(/\s+/).length;

  return Math.max(1, Math.round(words / 200));
}

function boldQuoted(children) {
  return React.Children.map(children, (child, idx) => {
    if (typeof child !== "string") {
      return child;
    }

    const parts = child.split(/("[^"]+")/g);

    if (parts.length === 1) {
      return child;
    }

    return parts.map((part, i) =>
      part.startsWith('"') && part.endsWith('"') ? (
        <strong key={`${idx}-${i}`}>{part}</strong>
      ) : (
        <React.Fragment key={`${idx}-${i}`}>{part}</React.Fragment>
      )
    );
  });
}

/* -------------------------------------------------------------------------- */
/* Markdown components                                                       */
/* -------------------------------------------------------------------------- */

/**
 * IMPORTANT:
 *
 * The same heading ID generator is passed into ReactMarkdown.
 * This guarantees duplicate headings receive unique IDs.
 */
function makeMarkdownComponents(getHeadingId) {
  return {
    h2: ({ children }) => {
      const text = String(children);
      const id = getHeadingId(text);

      return (
        <h2 id={id} className="scroll-mt-28">
          {children}
        </h2>
      );
    },

    h3: ({ children }) => <h3 className="scroll-mt-28">{children}</h3>,

    p: ({ children }) => <p>{boldQuoted(children)}</p>,

    li: ({ children }) => <li>{boldQuoted(children)}</li>,

    blockquote: ({ children }) => <blockquote>{children}</blockquote>,

    a: ({ href, children }) => {
      const isExternal = href?.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer noopener" : undefined}
        >
          {children}
        </a>
      );
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Page                                                                      */
/* -------------------------------------------------------------------------- */

export default async function CareerPage({ params }) {
  const { slug } = await params;

  const career = careerPages.find(c => c.slug === slug);

  if (!career) {
    return null;
  }

  /*
   * Generate the TOC IDs.
   *
   * This generator starts fresh here.
   */
  const headings = extractHeadings(career.content);

  /*
   * IMPORTANT:
   *
   * This generator must process headings in exactly the
   * same order as extractHeadings().
   */
  const getHeadingId = createHeadingIdGenerator();

  const category = getCategory(career.title);

  const readTime = getReadTime(career.content);

  const showToc = headings.length >= 3;

  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-screen bg-[#F8F7F3] text-[#17201C]`}
      style={{
        fontFamily: "var(--font-serif)",
      }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Breadcrumb                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="border-b border-[#E5E2DA] bg-[#F8F7F3]"
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 pt-34">
          <nav
            className="flex h-16 items-center gap-2 overflow-hidden text-sm text-[#7A817D]"
            aria-label="Breadcrumb"
          >
            <Link
              href="/"
              className="shrink-0 font-semibold text-[#17201C] transition hover:text-indigo-600"
            >
              NextCV
            </Link>

            <span className="shrink-0 text-[#C9C7C0]">/</span>

            <Link href="/career" className="shrink-0 transition hover:text-indigo-600">
              Career Guides
            </Link>

            <span className="shrink-0 text-[#C9C7C0]">/</span>

            <span className="max-w-55 truncate text-[#9A9D99] sm:max-w-xs">{career.title}</span>
          </nav>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                               */}
      {/* ------------------------------------------------------------------ */}

      <header className="relative overflow-hidden border-b border-[#E5E2DA]">
        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-amber-100/30 blur-3xl" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#17201C 1px, transparent 1px), linear-gradient(90deg, #17201C 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-5 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
          {/* Category + read time */}

          <div
            className="mb-7 flex flex-wrap items-center gap-3"
            style={{
              fontFamily: "var(--font-sans)",
            }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" />

              {category}
            </span>

            <span className="text-sm text-[#858B87]">{readTime} min read</span>
          </div>

          {/* Title */}

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-[#17201C] sm:text-5xl md:text-6xl">
            {career.title}
          </h1>

          {/* Intro */}

          <p
            className="mt-7 max-w-2xl text-lg leading-8 text-[#626A65] sm:text-xl"
            style={{
              fontFamily: "var(--font-sans)",
            }}
          >
            Practical guidance to help you build a stronger career, understand the hiring process,
            and present your experience effectively.
          </p>

          {/* Product / author */}

          <div
            className="mt-9 flex items-center gap-3 text-sm text-[#7A817D]"
            style={{
              fontFamily: "var(--font-sans)",
            }}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17201C] text-xs font-bold text-white">
              NC
            </div>

            <div>
              <p className="font-medium text-[#303833]">NextCV Career Guide</p>

              <p className="text-xs text-[#909691]">Resume & career resources</p>
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Main content                                                       */}
      {/* ------------------------------------------------------------------ */}

      <main className="mx-auto max-w-7xl px-5 pb-36 pt-10 sm:px-6 sm:pb-28 sm:pt-14">
        <div
          className={
            showToc
              ? "grid lg:grid-cols-[250px_minmax(0,760px)] lg:justify-center lg:gap-16 xl:grid-cols-[260px_minmax(0,780px)] xl:gap-20"
              : "mx-auto max-w-3xl"
          }
        >
          {/* ---------------------------------------------------------------- */}
          {/* Desktop TOC                                                      */}
          {/* ---------------------------------------------------------------- */}

          {showToc && (
            <aside className="hidden lg:block">
              <nav
                className="sticky top-8"
                style={{
                  fontFamily: "var(--font-sans)",
                }}
                aria-label="Table of contents"
              >
                <div className="rounded-xl border border-[#E3E0D8] bg-white/70 p-5 shadow-[0_8px_30px_rgba(20,20,20,0.03)]">
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-[#8B918D]">
                    In this guide
                  </p>

                  <ul className="space-y-1">
                    {headings.map(heading => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="group relative block rounded-lg py-2 pl-3 pr-2 text-[13px] leading-5 text-[#737B76] transition hover:bg-indigo-50/60 hover:text-indigo-600"
                        >
                          <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-transparent transition group-hover:bg-indigo-500" />

                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </aside>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* Article column                                                   */}
          {/* ---------------------------------------------------------------- */}

          <div className="min-w-0">
            {/* ---------------------------------------------------------------- */}
            {/* Mobile TOC                                                      */}
            {/* ---------------------------------------------------------------- */}

            {showToc && (
              <details
                className="mb-10 overflow-hidden rounded-xl border border-[#E3E0D8] bg-white shadow-[0_5px_20px_rgba(20,20,20,0.03)] lg:hidden"
                style={{
                  fontFamily: "var(--font-sans)",
                }}
              >
                <summary className="cursor-pointer list-none px-5 py-4 text-sm font-semibold text-[#252D29] [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between">
                    <span>In this guide</span>

                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#F4F3EF] text-xs text-[#777E79]">
                      ☰
                    </span>
                  </span>
                </summary>

                <div className="border-t border-[#E8E5DE] px-5 py-4">
                  <ul className="space-y-1">
                    {headings.map(heading => (
                      <li key={heading.id}>
                        <a
                          href={`#${heading.id}`}
                          className="block rounded-lg px-3 py-2 text-sm leading-6 text-[#69716C] transition hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* Article                                                          */}
            {/* ---------------------------------------------------------------- */}

            <article
              className="
                prose prose-lg max-w-none

                prose-headings:font-semibold
                prose-headings:tracking-[-0.025em]
                prose-headings:text-[#17201C]

                prose-h2:mb-6
                prose-h2:mt-16
                prose-h2:text-3xl
                prose-h2:leading-tight

                sm:prose-h2:mt-20
                sm:prose-h2:text-[2rem]

                prose-h3:mb-4
                prose-h3:mt-12
                prose-h3:text-2xl

                prose-p:mb-7
                prose-p:leading-[1.9]
                prose-p:text-[#38413C]

                prose-li:my-2
                prose-li:leading-[1.8]
                prose-li:text-[#38413C]

                prose-ul:my-8
                prose-ol:my-8

                prose-strong:font-semibold
                prose-strong:text-[#17201C]

                prose-a:font-medium
                prose-a:text-indigo-600
                prose-a:no-underline
                hover:prose-a:underline

                prose-blockquote:my-10
                prose-blockquote:border-l-4
                prose-blockquote:border-indigo-500
                prose-blockquote:bg-indigo-50/60
                prose-blockquote:px-6
                prose-blockquote:py-4
                prose-blockquote:not-italic
                prose-blockquote:text-[#38413C]
              "
            >
              <ReactMarkdown components={makeMarkdownComponents(getHeadingId)}>
                {career.content}
              </ReactMarkdown>
            </article>

            {/* ---------------------------------------------------------------- */}
            {/* Related guides                                                    */}
            {/* ---------------------------------------------------------------- */}

            {career.related?.length > 0 && (
              <section
                className="mt-20 border-t border-[#E3E0D8] pt-12"
                style={{
                  fontFamily: "var(--font-sans)",
                }}
              >
                <div className="mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-indigo-600">
                    Keep reading
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#17201C]">
                    Related career guides
                  </h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {career.related.map(rel => (
                    <Link
                      key={rel.slug}
                      href={`/career/${rel.slug}`}
                      className="group rounded-xl border border-[#E3E0D8] bg-white p-5 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_10px_30px_rgba(20,20,20,0.06)]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-base font-semibold leading-6 text-[#252D29] transition group-hover:text-indigo-600">
                          {rel.title}
                        </h3>

                        <span className="mt-0.5 shrink-0 text-lg text-[#A0A5A1] transition group-hover:translate-x-1 group-hover:text-indigo-600">
                          →
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-[#7A817D]">Explore this guide →</p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* ---------------------------------------------------------------- */}
            {/* CTA                                                              */}
            {/* ---------------------------------------------------------------- */}

            <section
              className="relative mt-20 overflow-hidden rounded-2xl bg-[#17201C] px-7 py-10 text-center sm:px-12 sm:py-14"
              style={{
                fontFamily: "var(--font-sans)",
              }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl"
                aria-hidden="true"
              />

              <div
                className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-indigo-400/10 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-indigo-200">
                  Ready to build?
                </span>

                <h2 className="mx-auto mt-5 max-w-lg text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Turn your experience into a resume that gets noticed.
                </h2>

                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/60 sm:text-base">
                  Build an ATS-friendly resume with NextCV and get your career story into the right
                  format in minutes.
                </p>

                <Link
                  href="/dashboard/builder"
                  className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-[#17201C] transition hover:-translate-y-0.5 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-[#17201C]"
                >
                  Build my resume
                  <span>→</span>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* Mobile CTA                                                         */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#DEDCD5] bg-[#F8F7F3]/95 px-4 py-3 backdrop-blur-md sm:hidden"
        style={{
          fontFamily: "var(--font-sans)",
        }}
      >
        <Link
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition active:scale-[0.98]"
        >
          Build my resume
          <span>→</span>
        </Link>
      </div>
    </div>
  );
}
