import Link from "next/link";
import { notFound } from "next/navigation";
import { createSeoMetadata } from "@/shared/utils/seo";
import seoPages from "../seo-pages.json";

const relatedGuides = [
  ["/templates", "Explore Templates"],
  ["/ats-resume-checker", "ATS Resume Checker"],
  ["/tcs-resume-format-for-freshers", "TCS Resume Format"],
  ["/infosys-resume-format-for-freshers", "Infosys Resume Format"],
  ["/wipro-resume-format-for-freshers", "Wipro Resume Format"],
  ["/ats-friendly-resume-format-india", "ATS Resume Format Guide"],
  ["/fresher-resume-format-india", "Fresher Resume Format"],
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
    mainEntity: page.faqs.map(faq => ({
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
    <div className="min-h-screen bg-[#F7F7F5] text-[#1C2333]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .seo-display { font-family: 'Fraunces', Georgia, serif; }
        .seo-body { font-family: 'IBM Plex Mono', monospace; }
      `}</style>

      <header className="relative overflow-hidden border-b border-[#E4E2DC] bg-[#1C2333] text-white">
        <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full border border-[#B3382C]/30" />
        <div className="absolute right-8 top-12 h-36 w-36 rounded-full border border-[#B3382C]/20" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-12 ">
          <div className="mb-12 flex items-center justify-between gap-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#B3382C] pt-30">
            <span>NextCV / Career Field Guide</span>
            <span>{String(page.sections.length || 1).padStart(2, "0")} sections</span>
          </div>
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#B7B5AC]">
              Practical resume intelligence · 2026 edition
            </p>
            <h1 className="seo-display max-w-4xl text-4xl leading-[1.06] text-white sm:text-6xl lg:text-7xl">
              {page.h1}
            </h1>
            <p className="seo-body mt-7 max-w-2xl text-base leading-7 text-[#D6D8D4] sm:text-lg">
              {page.description}
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="seo-body inline-flex items-center justify-center bg-[#B3382C] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#922D25]"
            >
              Build your resume <span className="ml-3 text-lg leading-none">→</span>
            </Link>
            <span className="seo-body text-xs text-[#B7B5AC]">
              Free to start · ATS-ready formats
            </span>
          </div>
        </div>
      </header>

      <main className="seo-body mx-auto grid max-w-7xl gap-8 px-5 py-8 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-12">
        <article className="min-w-0">
          <div className="mb-8 flex items-center justify-between border-b border-[#E4E2DC] pb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[#6B7280]">
            <span className="text-[#B3382C]">Read the guide</span>
            <span>{page.faqs.length ? `${page.faqs.length} FAQs` : "Quick reference"}</span>
          </div>

          <div className="space-y-4">
            {page.sections.length > 0 ? (
              page.sections.map((section, index) => (
                <section
                  key={section.title}
                  className="group border border-[#E4E2DC] bg-white p-5 transition-colors hover:border-[#B3382C] sm:p-7"
                >
                  <div className="flex gap-5">
                    <span className="seo-display shrink-0 text-3xl text-[#B3382C]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2 className="seo-display text-2xl leading-tight text-[#1C2333] sm:text-3xl">
                        {section.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6B7280]">
                       {section.content}
                      </p>
                    </div>
                  </div>
                </section>
              ))
            ) : (
              <section className="border border-[#E4E2DC] bg-white p-6 sm:p-8">
                <p className="text-sm leading-7 text-[#6B7280]">
                  Use this guide to shape a clear, relevant, ATS-readable resume for your next
                  application.
                </p>
              </section>
            )}
          </div>

          {/* {page.showTemplates && (
            <section className="mt-12 border-y border-[#E4E2DC] py-10">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B3382C]">
                Next step
              </p>
              <h2 className="seo-display mb-6 text-3xl text-[#1C2333]">
                Explore ATS-ready templates
              </h2>
              <Templates />
            </section>
          )} */}

          {page.faqs.length > 0 && (
            <section className="mt-12">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B3382C]">
                Common questions
              </p>
              <h2 className="seo-display mb-6 text-3xl text-[#1C2333]">Before you apply</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.faqs.map(faq => (
                  <details key={faq.q} className="group border border-[#E4E2DC] bg-white p-5">
                    <summary className="cursor-pointer list-none pr-5 text-sm font-bold leading-6 text-[#1C2333]">
                      {faq.q}
                      <span className="float-right text-[#B3382C] transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 border-t border-[#E4E2DC] pt-4 text-sm leading-6 text-[#6B7280]">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="lg:pt-14">
          <div className="sticky top-24 border border-[#E4E2DC] bg-white p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#B3382C]">
              Keep exploring
            </p>
            <h2 className="seo-display mt-3 text-2xl text-[#1C2333]">Related guides</h2>
            <nav className="mt-5 space-y-1" aria-label="Related guides">
              {relatedGuides.map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between border-b border-[#E4E2DC] py-3 text-sm font-semibold text-[#6B7280] transition-colors hover:text-[#B3382C]"
                >
                  {label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
      </main>

      <footer className="border-t border-[#E4E2DC] bg-white">
        <div className="seo-body mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <div>
            <p className="seo-display text-2xl text-[#1C2333]">Ready to make it official?</p>
            <p className="mt-1 text-sm text-[#6B7280]">
              Turn the advice into an ATS-friendly resume.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#1C2333] px-6 py-3 text-sm font-bold text-white hover:bg-[#B3382C]"
          >
            Start building <span className="ml-3">→</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
