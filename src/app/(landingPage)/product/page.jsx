import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  ArrowRight,
  Check,
  FileText,
  Globe,
  Share2,
  Sparkles,
  WandSparkles,
  ScanText,
  ChevronDown,
} from "lucide-react";
import BuildButton from "@/shared/components/landing/BuildButton";

export const metadata = createSeoMetadata({
  title: "NextCV Products: AI Resume Builder, ATS Checker & More",
  description:
    "Free to build. One-time price from ₹49. NextCV's AI Resume Builder, ATS Checker, Cover Letter Generator, Shareable Link & Portfolio tools — no subscriptions.",
  path: "/product",
  keywords: [
    "NextCV product suite",
    "AI resume builder india",
    "ATS resume checker free",
    "AI cover letter generator",
    "shareable resume link india",
    "resume to portfolio website builder",
    "online resume tools india",
    "free resume builder india",
  ],
});

const productSuite = [
  {
    number: "01",
    icon: FileText,
    title: "AI Resume Builder",
    subtitle: "ATS-optimized layouts with AI bullet refinement",
    description:
      "Build a polished resume with guided sections for education, projects, skills, and experience. Use AI to improve bullet clarity, pick an ATS-friendly layout, and preview before downloading.",
    action: "Explore AI Resume Builder",
    href: "/ai-resume-builder",
    badge: "From ₹49 one-time",
    features: [
      "Over 20+ ATS-tested templates",
      "AI bullet writing & achievement quantification",
      "Step-by-step section guidelines for freshers",
      "Instant high-resolution PDF download",
    ],
  },
  {
    number: "02",
    icon: ScanText,
    title: "Free ATS Resume Checker",
    subtitle: "Instant ATS score with keyword gap analysis",
    description:
      "Upload any resume PDF and get a real-time ATS compatibility score, keyword match analysis against your target job description, and prioritized fixes — all free, no account needed.",
    action: "Check Your ATS Score Free",
    href: "/ats-resume-checker",
    badge: "Free · No login required",
    features: [
      "Instant ATS score from 0–100",
      "Keyword match gap report vs job description",
      "Format & section structure feedback",
      "Works with any uploaded PDF resume",
    ],
  },
  {
    number: "03",
    icon: WandSparkles,
    title: "AI Cover Letter Generator",
    subtitle: "Tailored to your resume & target job description",
    description:
      "Create personalized, role-specific cover letters using your resume and target job details. Choose a tone — Professional, Enthusiastic, or Concise — and edit drafts in real-time.",
    action: "Explore Cover Letter Generator",
    href: "/ai-cover-letter-generator",
    badge: "Separate purchase · ₹79",
    features: [
      "Select saved resume or upload PDF/DOCX (up to 5 MB)",
      "Context-aware matching with job descriptions",
      "Tone customization (Professional, Concise, etc.)",
      "Live draft editing and instant PDF export",
    ],
  },
  {
    number: "04",
    icon: Share2,
    title: "Shareable Resume Link",
    subtitle: "Web-ready resume URL with instant recruiter access",
    description:
      "Publish your resume online with a clean, branded link (nextcv.in/r/slug). Perfect for sharing on LinkedIn, WhatsApp, or email signatures, complete with privacy and pause controls.",
    action: "Explore Shareable Resume",
    href: "/shareable-resume",
    badge: "Premium & Elite",
    features: [
      "Instant mobile-optimized web viewer",
      "One-click link copy for LinkedIn & chats",
      "Pause Sharing control to revoke public access",
      "Recruiters view without creating an account",
    ],
  },
  {
    number: "05",
    icon: Globe,
    title: "Resume-to-Portfolio Builder",
    subtitle: "Convert resume data into a personal website",
    description:
      "Transform your resume credentials into a personal portfolio website with zero coding. Showcase projects with tech badges, highlight experience, and share one link with recruiters.",
    action: "Explore Portfolio Builder",
    href: "/resume-to-portfolio",
    badge: "Elite Exclusive (₹399)",
    features: [
      "Zero-code automatic website generation",
      "Dedicated project showcase & skill badges",
      "Customizable layout, colors, and contact info",
      "Hosted live at nextcv.in/p/slug",
    ],
  },
];

const faqs = [
  {
    q: "Is NextCV free to use?",
    a: "Yes. You can build, edit, and preview your resume entirely for free on NextCV. A one-time payment starting at ₹49 is required only when you download your final PDF. There are no monthly subscriptions or auto-debit charges.",
  },
  {
    q: "What is the ATS Resume Checker and how does it work?",
    a: "The NextCV ATS Resume Checker is a free tool that scans your uploaded resume PDF, extracts text, and compares it against your target job description to calculate an ATS compatibility score (0–100). It identifies missing keywords, formatting issues, and section gaps that prevent your resume from clearing automated shortlisting systems.",
  },
  {
    q: "Can I use the AI Cover Letter Generator with any resume?",
    a: "Yes. You can either select a resume you have already built in NextCV or upload any PDF or DOCX file (up to 5 MB). The AI then reads your resume details and your target job description to generate a personalized, role-specific cover letter in seconds.",
  },
  {
    q: "What is a Shareable Resume Link and who can view it?",
    a: "A Shareable Resume Link is a public URL (e.g. nextcv.in/r/yourname) that hosts your resume as a mobile-optimized web page. Anyone with the link — recruiters, hiring managers, or LinkedIn connections — can view it instantly without logging into an account. You can revoke access at any time using the Pause Sharing toggle.",
  },
  {
    q: "How is the Resume-to-Portfolio Builder different from a Shareable Resume Link?",
    a: "A Shareable Resume Link shows your resume in a clean document format. The Portfolio Builder converts your resume data into a full personal website (nextcv.in/p/yourname) with dedicated sections for projects, tech stacks, work experience timelines, and a contact/download button — designed to impress for developer, design, and creative roles.",
  },
];

export default function ProductPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "NextCV Product Suite",
        description:
          "NextCV's connected AI career tools: AI Resume Builder (₹49), free ATS Resume Checker, AI Cover Letter Generator (₹79), Shareable Resume Link, and Resume-to-Portfolio Builder (₹399).",
        url: "https://www.nextcv.in/product",
      },
      {
        "@type": "ItemList",
        name: "NextCV Product Suite",
        numberOfItems: 5,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            url: "https://www.nextcv.in/ai-resume-builder",
            name: "AI Resume Builder",
          },
          {
            "@type": "ListItem",
            position: 2,
            url: "https://www.nextcv.in/ats-resume-checker",
            name: "Free ATS Resume Checker",
          },
          {
            "@type": "ListItem",
            position: 3,
            url: "https://www.nextcv.in/ai-cover-letter-generator",
            name: "AI Cover Letter Generator",
          },
          {
            "@type": "ListItem",
            position: 4,
            url: "https://www.nextcv.in/shareable-resume",
            name: "Shareable Resume Link",
          },
          {
            "@type": "ListItem",
            position: 5,
            url: "https://www.nextcv.in/resume-to-portfolio",
            name: "Resume-to-Portfolio Builder",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
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
            name: "Products",
            item: "https://www.nextcv.in/product",
          },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="border-b border-[#E3E2DC] pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              <Sparkles aria-hidden="true" className="h-4 w-4" /> Connected Career Product Suite
            </p>
            <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] text-[#17201C]">
              Five dedicated tools. One cohesive career platform.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#5B625C]">
              NextCV unites AI resume drafting, free ATS scoring, job-specific cover letters,
              online sharing links, and interactive portfolios into a single workflow — with
              one-time transparent pricing and no monthly subscription traps.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <BuildButton className="h-12 bg-[#465B9E] px-6 text-sm font-semibold text-white hover:bg-[#344B93]">
                Start Building Free
              </BuildButton>
              <Link
                href="/pricing"
                className="inline-flex h-12 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-sm font-semibold text-[#17201C] transition-colors hover:bg-[#F1F0EB]"
              >
                Compare All Plans <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-[#8A908B]">
              Free to build and edit · ATS Checker always free · One-time payment from ₹49 · No monthly subscription
            </p>
          </div>
        </div>
      </section>

      {/* Dedicated Products Grid */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Explore by Feature
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
              Dedicated tools for every step of your job hunt
            </h2>
          </div>

          <div className="mt-12 divide-y divide-[#E3E2DC] border-y border-[#E3E2DC]">
            {productSuite.map(product => {
              const Icon = product.icon;
              return (
                <article
                  key={product.number}
                  className="grid gap-8 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center"
                >
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-semibold text-[#8A908B]">
                        {product.number}
                      </span>
                      <span className="border border-[#E3E2DC] bg-[#FAF9F6] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-[#465B9E]">
                        {product.badge}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center border border-[#E3E2DC] bg-[#EEF0F7] text-[#465B9E]">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="font-serif text-2xl text-[#17201C]">{product.title}</h3>
                    </div>

                    <p className="mt-1 text-xs font-medium text-[#465B9E]">{product.subtitle}</p>

                    <p className="mt-4 text-sm leading-6 text-[#5B625C]">{product.description}</p>

                    <Link
                      href={product.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#465B9E] hover:text-[#344B93]"
                    >
                      {product.action} <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="border border-[#E3E2DC] bg-[#FAF9F6] p-6 sm:p-8">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8A908B]">
                      Core Capabilities
                    </p>
                    <ul className="mt-4 space-y-3">
                      {product.features.map(feat => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-[#17201C]">
                          <Check className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-product Architecture */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
              The NextCV Advantage
            </span>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Enter your experience once. Use it everywhere.
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#5B625C]">
              Your resume details automatically feed your AI cover letter generator, public sharing
              profile, and personal portfolio website without duplicate data entry.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                name: "Resume Data",
                text: "Build and store contact info, education, skills, projects, and work history.",
                route: "/dashboard/builder",
                badge: "Core Data Hub",
              },
              {
                step: "02",
                name: "AI Cover Letter",
                text: "Select your resume source or upload file; AI tailors the letter to the job description.",
                route: "/dashboard/cover-letter",
                badge: "Separate purchase · ₹79",
              },
              {
                step: "03",
                name: "Shareable Link",
                text: "Generate a public resume link with pause-sharing and link controls.",
                route: "/shareable-resume",
                badge: "Premium & Elite",
              },
              {
                step: "04",
                name: "Portfolio Website",
                text: "One-click website generation from resume data for Elite plan users.",
                route: "/resume-to-portfolio",
                badge: "Elite plan",
              },
            ].map(item => (
              <div
                key={item.step}
                className="border border-[#E3E2DC] bg-white p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#465B9E]">{item.step}</span>
                    <span className="border border-[#E3E2DC] bg-[#FAF9F6] px-2 py-0.5 font-mono text-[9px] font-semibold text-[#5B625C]">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-lg font-medium text-[#17201C]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#5B625C]">{item.text}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F1F0EB]">
                  <span className="font-mono text-[10px] text-[#465B9E] font-medium">
                    {item.route}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC] bg-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
              Common Questions
            </span>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>
          <dl className="divide-y divide-[#E3E2DC]">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="flex items-start justify-between gap-4">
                  <span className="text-sm font-semibold text-[#17201C]">{q}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#8A908B] mt-0.5" aria-hidden="true" />
                </dt>
                <dd className="mt-3 text-sm leading-6 text-[#5B625C]">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#17201C] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="max-w-2xl">
            <span className="border border-white/20 bg-white/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#A4B5DE]">
              Start Today
            </span>
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl leading-tight">
              Build your resume free. Upgrade only when you download.
            </h2>
            <p className="mt-3 text-sm text-[#A0A49F]">
              One-time pricing starting from ₹49. ATS checker always free. No recurring subscriptions.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <BuildButton className="h-12 bg-[#465B9E] px-6 text-sm font-semibold text-white hover:bg-[#344B93]">
              Build Your Resume
            </BuildButton>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
