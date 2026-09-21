import Link from "next/link";
import { notFound } from "next/navigation";
import { createSeoMetadata } from "@/shared/utils/seo";
import seoPages from "../seo-pages.json";

const relatedGuides = [
  ["/templates", "Explore Resume Templates (₹49 - ₹399)"],
  ["/ats-resume-checker", "Free ATS Resume Checker"],
  ["/tcs-resume-format-for-freshers", "TCS Resume Format Guide"],
  ["/infosys-resume-format-for-freshers", "Infosys Resume Format"],
  ["/wipro-resume-format-for-freshers", "Wipro Resume Format"],
  ["/ats-friendly-resume-format-india", "ATS Resume Format India"],
  ["/fresher-resume-format-india", "Fresher Resume Guide"],
];

const getPage = slug => seoPages.find(page => page.slug === slug);

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
    <div className="relative min-h-screen bg-white text-[#071644] selection:bg-indigo-100 selection:text-indigo-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-120 bg-linear-to-b from-[#eef2ff]/80 via-[#f5f7ff]/40 to-transparent" />

      {/* Hero Header */}
      <header className="relative  pb-10 sm:pt-16 sm:pb-14 border-b border-slate-100 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
          {/* Breadcrumbs & Badge */}
          <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
            <Link
              href="/"
              className="text-[#365184] hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              <span>Home</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f2f3ff] px-3 py-1 text-[#3730d8] border border-[#e4e7ff]">
              Career Field Guide
            </span>
            <span className="ml-auto hidden sm:inline-block text-[#365184]">
              {String(page.sections?.length || 0)} Core Sections
            </span>
          </div>

          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#071644] leading-tight sm:leading-tight">
              {page.h1}
            </h1>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[#365184] max-w-3xl">
              {page.description}
            </p>
          </div>

          {/* Quick Stats & Action bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-6 border-t border-slate-200/60">
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
            >
              Build Your Resume Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            <div className="flex items-center gap-4 text-xs font-medium text-[#365184]">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Pay-Per-Resume (₹49 - ₹399)
              </span>
              <span>•</span>
              <span>ATS Score 95+ Tested</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        {/* Main Article Body */}
        <article className="min-w-0">
          <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-bold text-[#071644]">Step-by-Step Guide</h2>
            <span className="text-xs font-medium text-[#365184] bg-slate-100 px-2.5 py-1 rounded-full">
              {page.faqs?.length ? `${page.faqs.length} FAQs Included` : "Detailed Walkthrough"}
            </span>
          </div>

          {/* Sections List */}
          <div className="space-y-6">
            {page.sections && page.sections.length > 0 ? (
              page.sections.map((section, index) => (
                <section
                  key={section.title || index}
                  className="group rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 font-extrabold text-base border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-[#071644] leading-tight">
                        {section.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#365184]">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <p className="text-sm sm:text-base leading-relaxed text-[#365184]">
                  Use this guide to shape a clear, relevant, ATS-readable resume for your next
                  application. NextCV provides battle-tested templates ranging from ₹49 to ₹399 with
                  no recurring monthly subscriptions.
                </p>
              </section>
            )}
          </div>

          {/* FAQ Section */}
          {page.faqs && page.faqs.length > 0 && (
            <section className="mt-14 pt-10 border-t border-slate-200">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                  Got Questions?
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071644] mt-1">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="space-y-4">
                {page.faqs.map((faq, idx) => (
                  <details
                    key={faq.q || idx}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 transition-all hover:border-indigo-200"
                  >
                    <summary className="cursor-pointer list-none text-base font-bold text-[#071644] flex items-center justify-between gap-4">
                      <span>{faq.q}</span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 font-medium text-lg transition-transform group-open:rotate-45 group-open:bg-indigo-100 group-open:text-indigo-600">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 border-t border-slate-100 pt-4 text-sm sm:text-base leading-relaxed text-[#365184]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Call to Action Card */}
          <div className="mt-14 rounded-3xl bg-linear-to-br from-[#071644] via-[#0d2259] to-[#152e75] p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-xs font-medium mb-4">
                ATS Optimization Ready
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Turn This Guide Into a Winning Resume
              </h3>
              <p className="mt-3 text-sm sm:text-base text-indigo-100/90 leading-relaxed">
                Choose from our wide collection of professional templates starting at just ₹49 to
                ₹399. Instant PDF download with 100% ATS score compatibility.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/templates"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
                >
                  Browse Resume Templates
                </Link>
                <Link
                  href="/ats-resume-checker"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
                >
                  Check Existing ATS Score
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Related Guides Card */}
          <div className="sticky top-24 rounded-3xl border border-slate-200 bg-slate-50/80 p-6 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Resources & Tools
            </div>
            <h3 className="text-xl font-bold text-[#071644] mb-4">Related Guides</h3>
            <nav className="space-y-2" aria-label="Related guides">
              {relatedGuides.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center justify-between rounded-xl bg-white border border-slate-200/80 px-4 py-3 text-sm font-semibold text-[#071644] transition-all hover:border-indigo-300 hover:bg-indigo-50/40 hover:text-indigo-600"
                >
                  <span className="line-clamp-1">{label}</span>
                  <span className="text-slate-400 group-hover:text-indigo-600 transition-colors">
                    ↗
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs font-medium text-[#365184]">
                Pay per resume template. No subscription lock-in.
              </p>
              <p className="mt-1 text-xs font-bold text-indigo-600">₹49 to ₹399 One-Time Payment</p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
