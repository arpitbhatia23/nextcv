const fs = require("fs");
const path = require("path");

const plan1Path = path.join(__dirname, "seo_content_plan.json");
const plan2Path = path.join(__dirname, "seo_content_plan_2.json");

const targetDir = path.join(__dirname, "src", "app", "(landingPage)");

if (!fs.existsSync(plan1Path) || !fs.existsSync(plan2Path)) {
  console.error("One or both SEO content plan files were not found.");
  process.exit(1);
}

const plan1 = JSON.parse(fs.readFileSync(plan1Path, "utf8"));
const plan2 = JSON.parse(fs.readFileSync(plan2Path, "utf8"));

if (!Array.isArray(plan1) || !Array.isArray(plan2)) {
  console.error("Both SEO content plan files must contain arrays.");
  process.exit(1);
}

const plan = [...plan1, ...plan2];

function jsxText(value = "") {
  return `{${JSON.stringify(String(value))}}`;
}

function formatLinkLabel(link = "") {
  if (link === "/") return "Free Resume Builder";

  return link
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .pop()
    .replace(/-/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase());
}

function generateContentFromOutline(outline = []) {
  let content = "";
  let sectionOpen = false;
  let sectionNumber = 0;

  outline.forEach(item => {
    if (typeof item !== "string") return;

    if (item.startsWith("H1:")) {
      return;
    }

    if (item.startsWith("H2:")) {
      if (sectionOpen) {
        content += `
            </div>
          </section>
        `;
      }

      sectionOpen = true;

      const title = item.replace("H2:", "").trim();
      const isIndigo = sectionNumber % 2 === 0;

      const iconWrapper = isIndigo
        ? "bg-indigo-50 text-indigo-600"
        : "bg-emerald-50 text-emerald-600";

      const topBorder = isIndigo ? "from-indigo-500 to-blue-500" : "from-emerald-500 to-teal-500";

      sectionNumber += 1;

      content += `
        <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8">
          <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r ${topBorder}" />

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconWrapper}">
              <Zap aria-hidden="true" className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg font-bold leading-snug text-slate-900 sm:text-xl">
                ${jsxText(title)}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Explore the essential principles of{" "}
                <strong className="font-semibold text-slate-800">
                  ${jsxText(title)}
                </strong>
                . These concepts can help freshers create a clearer,
                ATS-friendly and recruiter-focused resume.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
      `;
    }

    if (item.startsWith("H3:") && sectionOpen) {
      const title = item.replace("H3:", "").trim();

      const description =
        `Apply ${title.toLowerCase()} carefully to improve clarity, ` +
        "ATS readability and the overall presentation of your resume.";

      content += `
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
          <h3 className="flex items-start gap-2 text-base font-bold leading-snug text-slate-900 sm:text-lg">
            <CheckCircle2
              aria-hidden="true"
              className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500"
            />

            <span>${jsxText(title)}</span>
          </h3>

          <p className="mt-2 pl-7 text-sm leading-7 text-slate-600">
            ${jsxText(description)}
          </p>
        </div>
      `;
    }
  });

  if (sectionOpen) {
    content += `
        </div>
      </section>
    `;
  }

  return content;
}

plan.forEach(page => {
  const outline = Array.isArray(page.outline) ? page.outline : [];

  const faqs = Array.isArray(page.faqs) ? page.faqs : [];

  const internalLinks = Array.isArray(page.internalLinks) ? page.internalLinks : [];

  const secondaryKeywords = Array.isArray(page.secondaryKeywords) ? page.secondaryKeywords : [];

  const pageDir = path.join(targetDir, page.slug);

  if (!fs.existsSync(pageDir)) {
    fs.mkdirSync(pageDir, { recursive: true });
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const h1Text =
    outline
      .find(item => item.startsWith("H1:"))
      ?.replace("H1:", "")
      .trim() || page.title;

  const internalLinksUI =
    internalLinks.length > 0
      ? `
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 text-white shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
              <BookOpen aria-hidden="true" className="h-4 w-4" />
            </div>

            <h2 className="text-lg font-bold">
              Related Resources
            </h2>
          </div>

          <ul className="space-y-2">
            ${internalLinks
              .map(
                link => `
              <li>
                <Link
                  href=${JSON.stringify(link)}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-slate-700 bg-slate-800/70 p-3 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-500 hover:bg-indigo-600 hover:text-white"
                >
                  <span className="min-w-0 capitalize">
                    ${jsxText(formatLinkLabel(link))}
                  </span>

                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-indigo-300 transition-transform group-hover:translate-x-1 group-hover:text-white"
                  />
                </Link>
              </li>
            `
              )
              .join("")}
          </ul>
        </div>
      `
      : "";

  const faqsUI = faqs
    .map(
      faq => `
        <article className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-indigo-200 sm:p-5">
          <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-slate-900">
            <span className="shrink-0 font-black text-indigo-600">
              Q.
            </span>

            <span>${jsxText(faq.question)}</span>
          </h3>

          <p className="mt-3 pl-7 text-sm leading-7 text-slate-600">
            ${jsxText(faq.answer)}
          </p>
        </article>
      `
    )
    .join("");

  const keywords = [page.primaryKeyword, ...secondaryKeywords].filter(Boolean);

  const jsxContent = `import React from "react";
import Link from "next/link";
import {
  FileText,
  Download,
  Zap,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Award,
  ShieldCheck,
  Clock3,
} from "lucide-react";

export const metadata = {
  title: ${JSON.stringify(page.seoTitle)},
  description: ${JSON.stringify(page.metaDescription)},
  keywords: ${JSON.stringify(keywords)},
  alternates: {
    canonical: ${JSON.stringify(`https://www.nextcv.in/${page.slug}`)},
  },
};

export const revalidate = 86400;

export default function SEOPage() {
  const jsonLdSchema = ${JSON.stringify(faqSchema, null, 2)};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdSchema),
        }}
      />

      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-200">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-white pb-14 pt-28 sm:pb-20 sm:pt-32">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(224,231,255,0.85),transparent_42%)]" />

          <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 shadow-sm">
              <Award aria-hidden="true" className="h-4 w-4" />
              Expert Career Guide
            </div>

            <h1 className="mx-auto max-w-3xl text-xl font-bold leading-snug tracking-tight text-slate-900">
              ${jsxText(h1Text)}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
              ${jsxText(page.metaDescription)}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-lg sm:w-auto"
              >
                <Download aria-hidden="true" className="h-4 w-4" />
                Create Free Resume
              </Link>

              <Link
                href="/ats-resume-checker"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-colors hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 sm:w-auto"
              >
                <ShieldCheck aria-hidden="true" className="h-4 w-4" />
                Check ATS Score
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-emerald-500"
                />
                Free to start
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Clock3
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-indigo-500"
                />
                Ready in minutes
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-blue-500"
                />
                ATS-friendly formats
              </span>
            </div>
          </div>
        </section>

        {/* Page content */}
        <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-5 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8">
          {/* Main article */}
          <div className="space-y-8 lg:col-span-8">
            ${generateContentFromOutline(outline)}

            ${
              faqs.length > 0
                ? `
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-indigo-50" />

              <div className="relative z-10 mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <FileText
                    aria-hidden="true"
                    className="h-4 w-4"
                  />
                </div>

                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="relative z-10 space-y-3">
                ${faqsUI}
              </div>
            </section>
            `
                : ""
            }
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-indigo-800 p-5 text-white shadow-lg shadow-indigo-900/15 sm:p-6">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                    <Zap
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </div>

                  <h2 className="text-lg font-bold leading-snug">
                    Build an ATS-Friendly Resume in Minutes
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-indigo-100">
                    Create a professional resume without worrying about
                    formatting, structure or ATS compatibility.
                  </p>

                  <Link
                    href="/"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-50"
                  >
                    Start Building Now

                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4"
                    />
                  </Link>
                </div>
              </div>

              ${internalLinksUI}
            </div>
          </aside>
        </main>
      </div>
    </>
  );
}
`;

  fs.writeFileSync(path.join(pageDir, "page.jsx"), jsxContent, "utf8");

  console.log(`Generated responsive page: ${page.slug}`);
});

console.log(`All  ${plan.length} pages...`);
