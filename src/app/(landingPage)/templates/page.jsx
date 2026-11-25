import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  Check,
  FileSearch,
  FileText,
  Sparkles,
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  LayoutTemplate,
} from "lucide-react";

import BuildButton from "@/shared/components/landing/BuildButton";
import TemplatesSection from "@/shared/components/landing/TemplatesSection";

export const metadata = createSeoMetadata({
  title: "ATS Resume Templates (2026): Freshers & Pros India | NextCV",
  description:
    "Browse ATS-friendly resume templates for Indian freshers & pros (2026). Preview clean, recruiter-ready layouts & export PDFs from ₹49 one-time via UPI.",
  path: "/templates",
  keywords: [
    "resume templates",
    "ATS-friendly resume templates",
    "resume templates for freshers India",
    "resume format India",
    "simple resume template",
    "fresher resume format PDF",
    "one page resume template India",
    "IT resume templates India",
    "professional resume templates",
    "Indian resume format",
  ],
});

const faqs = [
  {
    question: "Which resume format is best for freshers in India?",
    answer:
      "A clean, single-column reverse-chronological layout is the strongest format for Indian freshers. Place your education (with CGPA/percentage), core technical skills, internships, and 2–3 deployed academic or personal projects near the top so campus and off-campus recruiters can scan your fit in under 6 seconds.",
  },
  {
    question: "Are NextCV resume templates ATS-friendly?",
    answer:
      "Yes. NextCV's ATS templates are engineered with clean vector text layers, standard section headings, and logical top-to-bottom reading order so enterprise parsers like Workday, Darwinbox, Taleo, and Naukri Resdex extract every detail accurately—unlike multi-column graphic templates from Canva.",
  },
  {
    question: "Can I use these resume templates for IT & MNC campus placements?",
    answer:
      "Yes. Our Basic, Standard, and Premium tiers include layouts tailored for TCS, Infosys, Wipro, Cognizant, Accenture, and product MNC hiring drives, with dedicated space for technical stacks, coding profiles, academic cutoffs, and quantified project outcomes.",
  },
  {
    question: "Can experienced professionals use these resume templates?",
    answer:
      "Yes. Mid-level and senior professionals can select Classic, Modern, or Executive layouts that prioritize recent work history, leadership scope, and measurable STAR/X-Y-Z achievements while keeping formatting crisp and recruiter-ready.",
  },
  {
    question: "Can I preview a resume template before using it?",
    answer:
      "Yes. Click Preview on any template card to inspect its full layout, typography, and section hierarchy before choosing Use Template to start editing with your own details.",
  },
  {
    question: "Can I build and edit my resume for free?",
    answer:
      "Yes. Building, editing, AI bullet refinement, ATS score checking, and live web resume sharing (/r/yourname) are free on NextCV. When you are ready to export a print-ready vector PDF, one-time plans start at just ₹49 via UPI (Basic ₹49, Standard ₹99, Premium ₹199, Elite ₹399) with zero monthly subscriptions.",
  },
  {
    question: "Should I include a photo on my Indian resume?",
    answer:
      "For standard IT, software engineering, consulting, and corporate roles in India, skip the photo. Most enterprise ATS systems ignore images, and recruiters prefer clean text density. Only add a photo if an employer or specific industry (such as aviation or hospitality) explicitly requests one.",
  },
  {
    question: "How can I check if my resume passes ATS before applying?",
    answer:
      "After building your resume, run it through the free NextCV AI ATS Resume Checker against your target job description to spot missing keywords, weak bullet points, or section formatting gaps before you submit your application.",
  },
];

const showcasedTemplates = [
  {
    name: "Minimal ATS Resume Template",
    description: "Single-column minimalist layout for software engineers, freshers, and MNC applications.",
    url: "https://www.nextcv.in/templates",
  },
  {
    name: "Classic ATS Resume Template",
    description: "Traditional reverse-chronological format for business, finance, and consulting roles.",
    url: "https://www.nextcv.in/templates",
  },
  {
    name: "Modern Resume Template",
    description: "Balanced clean hierarchy for early-career professionals and product roles.",
    url: "https://www.nextcv.in/templates",
  },
  {
    name: "Tech Resume Template",
    description: "Developer-focused layout highlighting programming stacks, GitHub links, and deployed projects.",
    url: "https://www.nextcv.in/templates",
  },
  {
    name: "Creative Resume Template",
    description: "Structured modern layout for marketing, content, and design applicants.",
    url: "https://www.nextcv.in/templates",
  },
  {
    name: "Professional Clean Resume Template",
    description: "Placement-ready fresher format emphasizing education, internships, and certifications.",
    url: "https://www.nextcv.in/templates",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://www.nextcv.in/templates#collection",
      name: "ATS Resume Templates for Freshers & Professionals in India",
      description:
        "Browse ATS-friendly resume templates for Indian freshers and experienced professionals. Preview clean layouts and export vector PDFs starting at ₹49 one-time via UPI.",
      url: "https://www.nextcv.in/templates",
      inLanguage: "en-IN",
      isPartOf: {
        "@type": "WebSite",
        name: "NextCV",
        url: "https://www.nextcv.in",
      },
    },
    {
      "@type": "ItemList",
      "@id": "https://www.nextcv.in/templates#list",
      name: "Featured NextCV Resume Templates",
      numberOfItems: showcasedTemplates.length,
      itemListElement: showcasedTemplates.map((tpl, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: tpl.name,
        description: tpl.description,
        url: tpl.url,
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.nextcv.in/templates#breadcrumb",
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
          name: "Resume Templates",
          item: "https://www.nextcv.in/templates",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.nextcv.in/templates#faq",
      mainEntity: faqs.map(faq => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ],
};

const formatTips = [
  {
    icon: GraduationCap,
    title: "Resume templates for freshers",
    description:
      "Put your degree, CGPA, technical skills, internships, and deployed capstone projects front and center for campus and off-campus drives.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Professional resume formats",
    description:
      "Lead with recent work history, leadership scope, and quantified STAR achievements tailored to mid-level and senior hiring managers.",
  },
  {
    icon: ShieldCheck,
    title: "ATS-friendly vector PDFs",
    description:
      "Built with clean text layers, standard headings, and zero graphic rating bars so Darwinbox, Workday, Taleo, and Naukri Resdex parse every line.",
  },
];

const templateTiers = [
  {
    tier: "Basic",
    price: "₹49",
    audience: "Students & Freshers",
    details: "Clean single-column ATS & modern layouts ideal for campus placements and mass IT hiring.",
  },
  {
    tier: "Standard",
    price: "₹99",
    audience: "IT & Service MNCs",
    details: "Company-tuned ATS templates optimized for TCS Digital, Infosys, and compact 1-page tech CVs.",
  },
  {
    tier: "Premium",
    price: "₹199",
    audience: "Corporate & Specialized Roles",
    details: "Expanded role-specific layouts for consulting, healthcare, operations, and mid-career switches.",
  },
  {
    tier: "Elite",
    price: "₹399",
    audience: "Senior & Executive Tracks",
    details: "High-density executive and leadership formats for senior engineers, managers, and directors.",
  },
];

const resumeSections = [
  "Contact details with clickable LinkedIn, GitHub & portfolio links",
  "Concise 2–3 line summary tailored to your target job title",
  "Categorized technical and domain skills (zero fake rating bars)",
  "Education with institution, graduation year, and CGPA/percentage",
  "Deployed projects, internships, and quantified work achievements",
  "Verified certifications and competitive coding/hackathon ranks",
];

const popularFormatGuides = [
  { label: "ATS-Friendly Resume Format India", href: "/ats-friendly-resume-format-india" },
  { label: "Fresher Resume Format India", href: "/fresher-resume-format-india" },
  { label: "TCS Resume Format for Freshers", href: "/tcs-resume-format-for-freshers" },
  { label: "Infosys Resume Format for Freshers", href: "/infosys-resume-format-for-freshers" },
  { label: "MNC Resume Format for Freshers", href: "/mnc-resume-format-for-freshers" },
  { label: "Non-IT Resume for Freshers", href: "/non-it-resume-for-freshers" },
];

export default async function TemplatesPage({ searchParams }) {
  const params = await searchParams;
  const requestedPlan = typeof params?.plan === "string" ? params.plan.toLowerCase() : "all";
  const initialPlan = ["basic", "standard", "premium", "elite"].includes(requestedPlan)
    ? requestedPlan
    : "all";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <header className="border-b border-border pt-28 sm:pt-32">
        <div className="nc-container pb-12 pt-2 sm:pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-primary">
              <FileText aria-hidden="true" className="h-4 w-4" />
              ATS-verified resume templates for the Indian job market
            </p>

            <h1 className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              ATS Resume Templates for Freshers and Professionals in India
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Explore clean, recruiter-ready resume templates built for Indian campus placements,
              IT services, startups, and product MNCs. Preview layouts, refine bullets with AI, and
              export vector PDFs starting at ₹49 one-time via UPI.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <BuildButton>Build My Resume</BuildButton>

              <Link href="/ats-resume-checker" className="nc-button-secondary">
                Check My Resume
                <FileSearch aria-hidden="true" className="ml-2 inline h-4 w-4" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Free to build, edit &amp; ATS-scan · ₹49–₹399 one-time PDF export via UPI · Zero
              monthly subscriptions
            </p>
          </div>

          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              "Tested on Indian & MNC ATS",
              "Clean single-column & modern layouts",
              "Free web link & portfolio included",
            ].map(item => (
              <div
                key={item}
                className="flex items-start gap-2 border border-border bg-surface p-3"
              >
                <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Existing template gallery */}
      <section aria-label="Browse resume templates">
        <TemplatesSection
          showViewAll={false}
          initialPlan={initialPlan}
          title="Browse Resume Templates"
          description="Filter by career stage or layout style, preview any template in full resolution, and start customizing for free."
        />
      </section>

      {/* Resume template selection guidance */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="nc-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Find your starting point
            </p>

            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Choose a Resume Format That Fits Your Career
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The right resume template highlights your strongest qualifications in the first half
              of page one. Freshers applying to campus drives should foreground education, technical
              skills, and deployed projects, while experienced professionals should prioritize recent
              roles and quantified impact.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {formatTips.map(({ icon: Icon, title, description }) => (
              <article key={title} className="border border-border bg-background p-6">
                <Icon aria-hidden="true" className="h-6 w-6 text-primary" />
                <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>

          {/* Transparent One-Time Tiers */}
          <div className="mt-10 border-t border-border pt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Transparent One-Time Download Tiers (No Auto-Debit)
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Build, edit, and share your web resume for free. Pay once via UPI, RuPay, or card
                  only when you export a PDF.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              >
                Compare all plans
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {templateTiers.map(item => (
                <div key={item.tier} className="border border-border bg-background p-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-foreground">{item.tier}</span>
                    <span className="font-display text-xl text-primary">{item.price}</span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{item.audience}</p>
                  <p className="mt-3 text-xs leading-5 text-muted-foreground">{item.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fresher resume formats */}
      <section className="nc-section bg-background">
        <div className="nc-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                For students and graduates
              </p>

              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                Resume Templates for Freshers in India
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                You do not need years of corporate work history to land interviews at top IT firms
                or startups. Choose a fresher-friendly layout that spotlights your degree, CGPA,
                technical stack, internships, and 2–3 deployed projects with real links.
              </p>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                For campus placements at TCS, Infosys, Cognizant, Wipro, and Accenture, keep your
                resume to one clean page and align your bullet points with the exact keywords in
                the job description.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <BuildButton>Build a Fresher Resume</BuildButton>
                <Link
                  href="/fresher-resume-format-india"
                  className="inline-flex items-center gap-2 self-center text-sm font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
                >
                  Read the Fresher Resume Guide
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="border border-border bg-surface p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-foreground">
                What to include in a fresher resume
              </h3>

              <ul className="mt-5 space-y-4">
                {resumeSections.map(section => (
                  <li key={section} className="flex items-start gap-3">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-sm leading-6 text-muted-foreground">{section}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
                Keep your layout focused—skip filler declarations, marital status, full home
                addresses, and generic hobbies unless directly relevant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ATS guidance */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="nc-container">
          <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Built for machine &amp; human screening
              </p>

              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                Why NextCV ATS Templates Outperform Graphic Resumes
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Graphic design tools like Canva often export resumes as flattened shapes, floating
                text boxes, and multi-column tables. Enterprise ATS engines used in India—such as
                Workday, Darwinbox, Taleo, and Naukri Resdex—frequently scramble or drop text from
                those files.
              </p>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                NextCV templates use structured semantic headings, standard readable fonts, and
                clean vector PDF generation so both automated parsers and human recruiters read
                your qualifications in exact order. Verify your score anytime with our free AI ATS
                Resume Checker.
              </p>

              <Link
                href="/ats-resume-checker"
                className="mt-6 inline-flex items-center gap-2 font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              >
                Scan your resume free with the ATS Checker
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="border border-border bg-background p-6 sm:p-8">
              <ShieldCheck aria-hidden="true" className="h-8 w-8 text-primary" />

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Before submitting your resume
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>Use standard headings (Experience, Projects, Skills, Education).</li>
                <li>Verify clickable LinkedIn, GitHub, and NextCV portfolio links.</li>
                <li>Match role-specific keywords from the job description honestly.</li>
                <li>Replace visual skill bars or percentages with categorized skills.</li>
                <li>Run a free ATS check before exporting your final PDF.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resume format guide & internal links */}
      <section className="nc-section bg-background">
        <div className="nc-container max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            Resume format guidance
          </p>

          <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
            How to Choose a Resume Format in India
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
            <p>
              Start with your target role rather than visual decoration alone. Recruiter eye-tracking
              studies show hiring managers spend roughly 6 seconds on an initial scan—your template
              should make titles, dates, skills, and outcomes effortless to spot.
            </p>

            <p>
              <strong className="text-foreground">For freshers &amp; campus placements:</strong>{" "}
              choose a single-column Minimal or Professional template that places education, core
              skills, internships, and 2–3 quantified projects on page one.
            </p>

            <p>
              <strong className="text-foreground">For experienced professionals:</strong> use a
              Classic or Modern layout that leads with a sharp summary, recent roles, and measurable
              business metrics (revenue, latency, cost savings, or conversion lift).
            </p>

            <p>
              <strong className="text-foreground">For tech, product &amp; design roles:</strong>{" "}
              pair your clean ATS PDF with a live{" "}
              <Link href="/shareable-resume" className="font-medium text-primary underline">
                shareable resume link
              </Link>{" "}
              and a 1-click{" "}
              <Link href="/resume-to-portfolio" className="font-medium text-primary underline">
                personal portfolio website
              </Link>{" "}
              so hiring managers can inspect live demos directly.
            </p>
          </div>

          <div className="mt-8 border-t border-border pt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Company &amp; Role Format Guides
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {popularFormatGuides.map(guide => (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="inline-flex items-center justify-between border border-border bg-surface px-4 py-3 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <span>{guide.label}</span>
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-primary" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Build with NextCV */}
      <section className="bg-surface py-16 sm:py-20">
        <div className="nc-container">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Create your resume
            </p>

            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Build Your Resume, Link &amp; Portfolio with NextCV
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Pick a template, enter your background once, refine bullet points with AI writing
              assistance, verify ATS compatibility for free, and publish both a downloadable PDF and
              a shareable career portfolio.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: LayoutTemplate,
                title: "1. Choose a template",
                description: "Preview ATS-verified layouts for freshers, IT roles, and MNC drives.",
              },
              {
                icon: Sparkles,
                title: "2. Refine with AI & ATS check",
                description: "Rewrite weak bullets into STAR format and check your ATS score free.",
              },
              {
                icon: FileText,
                title: "3. Export PDF & share live",
                description: "Download your PDF from ₹49 via UPI and get a free /r/slug & /p/slug link.",
              },
            ].map(({ icon: Icon, title, description }) => (
              <article key={title} className="border border-border bg-background p-5">
                <Icon aria-hidden="true" className="h-5 w-5 text-primary" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-2xl">Ready to build your ATS resume?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Create and edit for free. One-time PDF exports start at ₹49 via UPI—no recurring
                subscriptions.
              </p>
            </div>

            <BuildButton className="shrink-0">Build My Resume</BuildButton>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="nc-section bg-background">
        <div className="nc-container max-w-4xl">
          <div className="border-b border-border pb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">
              Frequently asked questions
            </p>

            <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
              Resume Templates: Common Questions
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
              Answers on ATS compatibility, fresher resume layouts, UPI pricing, and how to stand
              out in Indian hiring drives.
            </p>
          </div>

          <div className="divide-y divide-border">
            {faqs.map(faq => (
              <details key={faq.question} className="group py-1">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-lg font-normal text-primary transition-transform group-open:rotate-45"
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
              View resume builder pricing
            </Link>

            <Link
              className="font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              href="/examples"
            >
              Explore resume examples
            </Link>

            <Link
              className="font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              href="/ats-resume-checker"
            >
              Try the ATS Resume Checker
            </Link>

            <Link
              className="font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              href="/resume-builder-comparison"
            >
              Compare NextCV vs Zety &amp; Canva
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
