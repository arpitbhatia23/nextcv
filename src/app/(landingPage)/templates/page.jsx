import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import { Check, FileSearch, FileText, Sparkles } from "lucide-react";
import BuildButton from "@/shared/components/landing/BuildButton";
import TemplatesSection from "@/shared/components/landing/TemplatesSection";

export const metadata = createSeoMetadata({
  title: "Best Resume Templates & Formats for Every Career | NextCV",
  description:
    "Explore professional, ATS-friendly resume templates and formats for freshers and experienced professionals. Choose a design and build your resume with NextCV.",
  path: "/templates",
  keywords: [
    "resume templates",
    "resume template",
    "resume templates for freshers",
    "ATS-friendly resume templates",
  ],
});

const faqs = [
  {
    question: "Which resume format is a useful starting point for freshers?",
    answer:
      "A clear, content-focused format gives education, skills, projects, and internships room to scan. Select the design that best fits your experience and the role.",
  },
  {
    question: "Are all resume templates guaranteed to pass an ATS?",
    answer:
      "No template can guarantee a result across all applicant tracking systems. NextCV templates aim for readable structure; ATS behavior depends on the employer and its software.",
  },
  {
    question: "Can I preview before choosing a template?",
    answer:
      "Yes. Open a template preview to inspect the design, then choose Use Template to start building.",
  },
  {
    question: "How much does downloading a resume cost?",
    answer:
      "You can build and edit for free. One-time download plans range from ₹49 to ₹399 depending on the template and included features. There is no monthly subscription.",
  },
];

export default function TemplatesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.nextcv.in/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Templates",
        item: "https://www.nextcv.in/templates",
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <header className="border-b border-border pt-28 sm:pt-32">
        <div className="nc-container pb-12 pt-2 sm:pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2  border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-primary">
              <FileText aria-hidden="true" className="h-4 w-4" /> Resume formats
            </p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Choose a format that makes your experience easy to scan.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Compare a focused set of starting points for students, freshers, developers, and
              experienced professionals. Preview before you build.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BuildButton>Build My Resume</BuildButton>
              <Link href="/ats-resume-checker" className="nc-button-secondary">
                Check a resume <FileSearch aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Free to build · ₹49–₹399 one-time download plans · No subscription
            </p>
          </div>
        </div>
      </header>

      <TemplatesSection
        showViewAll={false}
        title="Browse six starting points"
        description="Filter by style and career stage, then preview the layout that fits your application."
      />

      <section className="bg-surface py-16 sm:py-20">
        <div className="nc-container">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Before you choose
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Design supports the story. Your evidence does the work.
            </h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Keep sections easy to identify, use readable text, and tailor the content to the job
              description. ATS results vary by employer, so treat format guidance as a starting
              point rather than a guarantee.
            </p>
          </div>
          <div className="mt-8 grid gap-6 border-y border-border py-6 md:grid-cols-3 md:divide-x md:divide-border">
            {[
              {
                icon: Check,
                title: "Clear structure",
                description: "Use familiar headings and keep your reading order obvious.",
              },
              {
                icon: Sparkles,
                title: "AI writing assistance",
                description: "Draft descriptions from your experience, then review and edit them.",
              },
              {
                icon: FileText,
                title: "Pay once to download",
                description: "Build and edit free; choose a one-time plan when you are ready.",
              },
            ].map(({ icon: Icon, title, description }, index) => (
              <article key={title} className={`py-2 md:px-6 ${index === 0 ? "md:pl-0" : ""}`}>
                <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="nc-section bg-background">
        <div className="nc-container max-w-4xl">
          <div className="border-b border-border pb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Common questions
            </p>
            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Template details
            </h2>
          </div>
          <div className="divide-y divide-border">
            {faqs.map(faq => (
              <details key={faq.question} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-lg font-normal text-primary group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-3xl pb-5 pr-8 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 border-t border-border pt-5 text-sm">
            <Link
              className="font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              href="/pricing"
            >
              See plan details
            </Link>
            <Link
              className="font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              href="/examples"
            >
              Browse resume examples
            </Link>
          </div>
          <div className="mt-10 flex flex-col gap-4  bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-2xl">Found your format?</h2>
              <p className="mt-2 text-sm text-slate-300">
                Start editing for free, then choose a one-time download plan when ready.
              </p>
            </div>
            <BuildButton className="shrink-0">Use a Template</BuildButton>
          </div>
        </div>
      </section>
    </main>
  );
}
