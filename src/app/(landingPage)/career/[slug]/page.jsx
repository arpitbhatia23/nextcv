import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Source_Serif_4, Inter } from "next/font/google";
import careerPages from "../../career-pages.json";
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export async function generateStaticParams() {
  return careerPages.map(c => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const career = careerPages.find(c => c.slug === slug);
  if (!career) return {};
  return { title: `${career.title} | NextCV` };
}

// --- helpers -----------------------------------------------------------

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function extractHeadings(markdown) {
  const lines = markdown.split("\n");
  return lines
    .filter(l => l.trim().startsWith("## "))
    .map(l => {
      const text = l.replace(/^##\s+/, "").trim();
      return { text, id: slugifyHeading(text) };
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

// Bolds any phrase wrapped in double quotes, e.g. "Improved performance by 20%"
// becomes bold, quotes included. Walks markdown's children array so it works
// inside both <p> and <li> without touching elements that are already <strong>/<a>/etc.
function boldQuoted(children) {
  return React.Children.map(children, (child, idx) => {
    if (typeof child !== "string") return child;
    const parts = child.split(/("[^"]+")/g);
    if (parts.length === 1) return child;
    return parts.map((part, i) =>
      part.startsWith('"') && part.endsWith('"') ? (
        <strong key={`${idx}-${i}`}>{part}</strong>
      ) : (
        <React.Fragment key={`${idx}-${i}`}>{part}</React.Fragment>
      )
    );
  });
}

// Custom renderers: heading anchors for the TOC, plus quote-bolding on text content.
function makeMarkdownComponents() {
  return {
    h2: ({ children }) => {
      const text = String(children);
      const id = slugifyHeading(text);
      return (
        <h2 id={id} className="scroll-mt-24">
          {children}
        </h2>
      );
    },
    p: ({ children }) => <p>{boldQuoted(children)}</p>,
    li: ({ children }) => <li>{boldQuoted(children)}</li>,
  };
}

// --- page ----------------------------------------------------------------

export default async function CareerPage({ params }) {
  const { slug } = await params;
  const career = careerPages.find(c => c.slug === slug);

  if (!career) return null;

  const headings = extractHeadings(career.content);
  const category = getCategory(career.title);
  const readTime = getReadTime(career.content);
  const showToc = headings.length >= 3;

  const tocList = (
    <ul className="space-y-2 text-sm">
      {headings.map(h => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className="text-indigo-600 underline decoration-indigo-600/30 underline-offset-2 hover:decoration-indigo-600"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-screen bg-[#FAF9F6] text-[#1C2321]`}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {/* Breadcrumb */}
      <div className="border-b border-[#E4E1D8] pt-38">
        <nav
          className="mx-auto flex max-w-6xl items-center gap-2 px-6 py-4 text-sm text-[#5B655F]"
          style={{ fontFamily: "var(--font-sans)" }}
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-indigo-600">
            NextCV
          </Link>
          <span className="text-[#C9C4B6]">/</span>
          <Link href="/career" className="hover:text-indigo-600">
            Career Guides
          </Link>
          <span className="text-[#C9C4B6]">/</span>
          <span className="truncate text-[#1C2321]">{career.title}</span>
        </nav>
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10">
        {/* Meta row */}
        <div
          className="mb-4 flex items-center gap-3 text-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          <span className="rounded-full bg-indigo-50 px-3 py-1 font-medium text-indigo-600">
            {category}
          </span>
          <span className="text-[#8A8A80]">{readTime} min read</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#1C2321] sm:text-[2.75rem]">
          {career.title}
        </h1>

        {/* Two-column layout: TOC sidebar | content column */}
        <div className={showToc ? "mt-12 lg:grid lg:grid-cols-[260px_1fr] lg:gap-20" : "mt-12"}>
          {/* Desktop sidebar TOC — sticky so it stays visible while reading */}
          {showToc && (
            <aside className="hidden lg:block">
              <nav
                className="sticky top-10 rounded-lg border border-[#E4E1D8] bg-white/60 p-5"
                style={{ fontFamily: "var(--font-sans)" }}
                aria-label="Table of contents"
              >
                <p className="mb-3 text-sm font-medium text-[#1C2321]">What's covered</p>
                {tocList}
              </nav>
            </aside>
          )}

          <div>
            {/* Mobile TOC — same content, shown inline above the article on small screens */}
            {showToc && (
              <nav
                className="mb-8 rounded-lg border border-[#E4E1D8] bg-white/60 p-5 lg:hidden"
                style={{ fontFamily: "var(--font-sans)" }}
                aria-label="Table of contents"
              >
                <p className="mb-3 text-sm font-medium text-[#1C2321]">What's covered</p>
                {tocList}
              </nav>
            )}

            {/* Article body */}
            <article
              className="prose prose-xl mx-auto max-w-3xl
                prose-headings:font-semibold prose-headings:text-[#1C2321]
                prose-h2:mt-20 prose-h2:mb-6 prose-h2:text-3xl
                prose-p:mb-7 prose-p:leading-loose prose-p:text-[#2B322F]
                prose-ul:my-7 prose-li:mb-3 prose-li:leading-loose prose-li:text-[#2B322F]
                prose-strong:text-[#1C2321]
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline"
            >
              <ReactMarkdown components={makeMarkdownComponents()}>{career.content}</ReactMarkdown>
            </article>

            {/* Related pages */}
            {career.related?.length > 0 && (
              <nav
                className="mx-auto mt-20 max-w-3xl border-t border-[#E4E1D8] pt-12"
                style={{ fontFamily: "var(--font-sans)" }}
                aria-label="Related pages"
              >
                <p className="mb-5 text-sm font-medium text-[#1C2321]">Related guides</p>
                <ul className="grid gap-4 sm:grid-cols-2">
                  {career.related.map(rel => (
                    <li key={rel.slug}>
                      <Link
                        href={`/career/${rel.slug}`}
                        className="block rounded-md border border-[#E4E1D8] bg-white px-5 py-4 text-sm text-[#1C2321] transition hover:border-indigo-600 hover:text-indigo-600"
                      >
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* End-of-article CTA */}
            <div className="mx-auto mt-20 max-w-3xl rounded-xl border border-[#E4E1D8] bg-white p-10 text-center">
              <p
                className="text-xl font-semibold text-[#1C2321]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Put this into your resume
              </p>
              <p
                className="mx-auto mt-3 max-w-md text-base leading-relaxed text-[#5B655F]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Turn what you just read into an ATS-friendly resume in under 5 minutes.
              </p>
              <Link
                href="/resume-builder"
                className="mt-6 inline-block rounded-md bg-indigo-600 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Build my resume
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky mobile CTA bar — keeps the action reachable without floating cards mid-scroll */}
      <div
        className="fixed inset-x-0 bottom-0 border-t border-[#E4E1D8] bg-[#FAF9F6]/95 backdrop-blur sm:hidden"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <Link
          href="/resume-builder"
          className="block px-6 py-4 text-center text-sm font-medium text-white"
        >
          <span className="mx-auto block rounded-md bg-indigo-600 py-3">Build my resume</span>
        </Link>
      </div>
    </div>
  );
}
