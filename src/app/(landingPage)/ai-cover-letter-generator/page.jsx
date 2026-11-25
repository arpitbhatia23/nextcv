import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  FileText,
  Sparkles,
  Check,
  ArrowRight,
  HelpCircle,
  Building,
  Wand2,
  Briefcase,
  GraduationCap,
  Send,
} from "lucide-react";
import ProductScreenshot from "@/shared/components/products/ProductScreenshot";
import ProductBreadcrumbs from "@/shared/components/products/ProductBreadcrumbs";
import RelatedProducts from "@/shared/components/products/RelatedProducts";
import ProductConversionBanner from "@/shared/components/products/ProductConversionBanner";

export const metadata = createSeoMetadata({
  title: "AI Cover Letter Generator (2026): Resume & JD Match | NextCV",
  description:
    "Generate a tailored cover letter from your resume & job description with AI (2026). Draft free, pick your tone & export clean PDFs for ₹79 one-time via UPI.",
  path: "/ai-cover-letter-generator",
  keywords: [
    "ai cover letter generator",
    "ai cover letter generator from resume",
    "cover letter generator india",
    "job description cover letter ai",
    "cover letter for freshers india",
    "ai cover letter writer",
    "cover letter builder pdf download",
    "ai resume and cover letter builder",
    "cover letter based on resume ai",
  ],
});

const faqs = [
  {
    question: "What is an AI cover letter generator?",
    answer:
      "An AI cover letter generator analyzes your resume background and matches it against a specific company name and job description to draft a tailored letter explaining why your skills and projects fit the role.",
  },
  {
    question: "Can NextCV generate a cover letter from my resume?",
    answer:
      "Yes. You can select any resume saved in your NextCV dashboard or upload an external PDF/DOCX resume (up to 5 MB) directly inside the Cover Letter Studio.",
  },
  {
    question: "Can I use a job description to personalize a cover letter?",
    answer:
      "Yes. Pasting the target company's job description allows the AI to weave in relevant keywords and connect your quantified achievements directly to their core requirements.",
  },
  {
    question: "Do Indian recruiters and startups actually read cover letters?",
    answer:
      "Yes—especially for startups (Wellfound, LinkedIn, YC), internships, off-campus cold emails, and career-switch roles where your resume alone doesn't explain your motivation. A crisp, 3-paragraph job-matched letter helps you stand out immediately.",
  },
  {
    question: "Can I choose the writing tone and edit the draft?",
    answer:
      "Yes. Choose between Professional, Enthusiastic, Concise, and Confident tones to match corporate MNCs or fast-moving startups, then customize every line in the live editor before finalizing.",
  },
  {
    question: "Is the AI cover letter generator free, and can I pay via UPI?",
    answer:
      "Drafting, editing, and previewing your cover letter is free. Unlocking the finished, watermark-free PDF is a separate one-time ₹79 purchase via UPI (Google Pay, PhonePe, Paytm), RuPay, or card—with zero monthly subscriptions and not bundled into resume plans.",
  },
  {
    question: "Should I review an AI-generated cover letter before sending it?",
    answer:
      "Always. AI builds a strong, job-matched first draft, and a quick human review ensures your personal project details, company interest, and contact info are 100% accurate.",
  },
];

export default function AICoverLetterPage() {
  const breadcrumbItems = [
    { label: "Products", href: "/product" },
    { label: "AI Cover Letter Generator" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.nextcv.in/ai-cover-letter-generator#app",
        name: "NextCV AI Cover Letter Generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "en-IN",
        url: "https://www.nextcv.in/ai-cover-letter-generator",
        description:
          "Generate a tailored cover letter from your resume, target company, and job description with AI. Draft for free and export clean PDFs for ₹79 one-time via UPI.",
        featureList: [
          "Generate directly from NextCV resume or uploaded PDF/DOCX",
          "Job description keyword & role alignment",
          "Multiple writing tones (Professional, Enthusiastic, Concise, Confident)",
          "Live draft editor & print-ready PDF export for ₹79 via UPI",
        ],
        offers: {
          "@type": "Offer",
          price: "79",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.nextcv.in/ai-cover-letter-generator#breadcrumb",
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
          {
            "@type": "ListItem",
            position: 3,
            name: "AI Cover Letter Generator",
            item: "https://www.nextcv.in/ai-cover-letter-generator",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.nextcv.in/ai-cover-letter-generator#faq",
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

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="border-b border-[#E3E2DC] pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <ProductBreadcrumbs items={breadcrumbItems} />

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#465B9E]/20 bg-[#EEF0F7] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                <Sparkles className="h-3.5 w-3.5" />
                Context-Aware Writing Tool
              </div>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] text-[#17201C]">
                Generate a Job-Specific Cover Letter with AI
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5B625C]">
                Turn your resume and target job description into a personalized cover letter in
                seconds. Draft and edit for free, pick your tone, and unlock a clean PDF for ₹79
                one-time via UPI—no subscriptions.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/dashboard/cover-letter"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-transparent bg-[#465B9E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#344B93]"
                >
                  Create a Cover Letter
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/ai-resume-builder"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-sm font-semibold text-[#17201C] transition-colors hover:bg-[#F1F0EB]"
                >
                  Pair with AI Resume Builder
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#5B625C]">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Draft &amp; edit free
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  ₹79 one-time PDF via UPI
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Zero recurring subscriptions
                </span>
              </div>
            </div>

            <div>
              <ProductScreenshot
                src="/products/cover-letter/generated-letter.png"
                alt="NextCV AI Cover Letter preview and editor"
                caption="Generated cover letter draft matched with applicant skills and target company requirements."
                label="Cover Letter Studio"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Dilemma / Why generic cover letters fail */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="border border-[#E3E2DC] bg-[#FAF9F6] p-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-rose-700">
                The Copy-Paste Trap
              </span>
              <h2 className="mt-3 font-serif text-2xl text-[#17201C]">
                Generic letters get skipped immediately
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5B625C]">
                Sending the same generic template to 50 companies with just the company name changed
                fails to highlight why your specific projects or experience matter for their role.
              </p>
            </div>

            <div className="border border-[#465B9E]/30 bg-[#EEF0F7]/40 p-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                The Job-Matched Alternative
              </span>
              <h2 className="mt-3 font-serif text-2xl text-[#17201C]">
                Targeted letters built from your actual resume
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5B625C]">
                NextCV connects the exact technologies and accomplishments in your resume with the
                responsibilities outlined in the job description, producing a cohesive pitch for
                your application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Exact Codebase Workflow */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Guided Generation Flow
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Step-by-step: How the Cover Letter Studio operates
            </h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              Add your resume and job details, generate a tailored draft for free, and unlock your
              print-ready PDF with a one-time ₹79 UPI payment.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                badge: "Step 01",
                title: "Choose Resume Source",
                desc: "Select a resume saved in your NextCV account or upload an existing PDF or DOCX file up to 5 MB.",
                detail: "Your role, skills, and projects anchor the draft.",
                icon: FileText,
              },
              {
                step: "02",
                badge: "Step 02",
                title: "Job Details & Tone Selection",
                desc: "Enter the company name and paste the job description, then pick a writing tone and letter length.",
                detail: "Matches your pitch directly to the role.",
                icon: Building,
              },
              {
                step: "03",
                badge: "Step 03",
                title: "AI Generation & Realtime Editor",
                desc: "Generate a tailored first draft, then edit phrasing and personal details in the live editor.",
                detail: "Save drafts and refine anytime for free.",
                icon: Wand2,
              },
              {
                step: "04",
                badge: "Step 04",
                title: "Live PDF Preview & Download",
                desc: "Preview the finished letter before unlocking its watermark-free PDF for ₹79 via UPI.",
                detail: "One-time purchase; no monthly subscription.",
                icon: Check,
              },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="border border-[#E3E2DC] bg-white p-6 shadow-xs flex flex-col justify-between transition-all duration-200 hover:border-[#465B9E]/50"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E3E2DC] pb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-lg font-bold text-[#465B9E]">
                          {item.step}
                        </span>
                        <span className="border border-[#E3E2DC] bg-[#FAF9F6] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase text-[#5B625C]">
                          {item.badge}
                        </span>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#5B625C]">{item.desc}</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#F1F0EB]">
                    <p className="text-[10px] text-[#465B9E] font-medium leading-4">
                      {item.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Workflow Screenshots */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Interface Overview
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Inside the Cover Letter Studio
            </h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              Inspect input parameters, tone selection, and real-time output controls.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <ProductScreenshot
                src="/products/cover-letter/inputs.png"
                alt="NextCV Cover letter input section with resume selector"
                caption="Select saved resumes or upload a new file, and enter company name & job requirements."
                label="Step 01 & 02: Inputs"
              />
              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Contextual Input Controls
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Flexible resume selection lets you feed either your NextCV dashboard resume or an
                uploaded file.
              </p>
            </div>

            <div>
              <ProductScreenshot
                src="/products/cover-letter/writing-styles.png"
                alt="NextCV writing tone options"
                caption="Choose between Professional, Enthusiastic, and Concise writing tones."
                label="Tone & Style Customization"
              />
              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Writing Style Selection
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Adapt tone for different industries—from formal banking institutions to agile tech
                startups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Indian Hiring Use Cases */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Where Cover Letters Win Interviews
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Built for startups, internships &amp; off-campus outreach
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Internships & First Jobs",
                desc: "Explain how your coursework, hackathons, and deployed projects translate into day-one value when you lack formal experience.",
              },
              {
                icon: Send,
                title: "Off-Campus Cold Emails & Referrals",
                desc: "Turn a Concise-tone draft into a crisp outreach note for hiring managers on LinkedIn, Wellfound, or direct email.",
              },
              {
                icon: Briefcase,
                title: "Career Switches & Senior Roles",
                desc: "Connect transferable achievements across domains clearly so recruiters immediately understand your transition story.",
              },
            ].map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#5B625C]">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Combined Resume + Cover Letter Workflow */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="border border-[#E3E2DC] bg-[#FAF9F6] p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                  Combined Advantage
                </span>
                <h2 className="mt-3 font-serif text-3xl text-[#17201C]">
                  Pair your cover letter with an ATS Resume
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#5B625C]">
                  Recruiters appreciate consistency. Build your single-column resume, verify your
                  keyword match with our free{" "}
                  <Link
                    href="/ats-resume-checker"
                    className="font-semibold text-[#465B9E] underline"
                  >
                    AI ATS Resume Checker
                  </Link>
                  , and generate a matching cover letter in minutes.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/ai-resume-builder"
                    className="inline-flex h-11 items-center justify-center gap-2 border border-transparent bg-[#465B9E] px-5 text-xs font-semibold text-white hover:bg-[#344B93]"
                  >
                    Build Resume First <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/templates"
                    className="inline-flex h-11 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-xs font-semibold text-[#17201C] hover:bg-[#F1F0EB]"
                  >
                    Browse ATS Templates
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex h-11 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-xs font-semibold text-[#17201C] hover:bg-[#F1F0EB]"
                  >
                    View Resume Plans
                  </Link>
                </div>
              </div>

              <div className="border border-[#E3E2DC] bg-white p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8A908B]">
                  Resume Plans and Cover Letters
                </p>
                <ul className="mt-4 space-y-3 text-xs text-[#5B625C]">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    High-resolution ATS resume PDF from ₹49
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    AI Cover Letter available separately for ₹79 via UPI
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Public resume sharing link (/r/yourname)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Online portfolio website builder (/p/yourname)
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
              <HelpCircle className="h-5 w-5" />
            </div>
            <h2 className="mt-4 font-serif text-3xl text-[#17201C]">Frequently Asked Questions</h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              Details on resume inputs, UPI pricing, tone selection, and draft editing.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="group border border-[#E3E2DC] bg-white p-5 shadow-xs transition-colors hover:border-[#465B9E]/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-sm text-[#17201C]">
                  <span>{faq.question}</span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#F1F0EB] text-[#5B625C] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-xs leading-6 text-[#5B625C]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <RelatedProducts currentPath="/ai-cover-letter-generator" />

      {/* Final Conversion CTA */}
      <ProductConversionBanner
        badge="Tailored Applications"
        title="Draft your next cover letter in minutes"
        description="Stop sending identical generic letters. Match your resume with target job descriptions for free, and export clean PDFs for ₹79 one-time via UPI."
        primaryCtaText="Launch Cover Letter Generator"
        primaryCtaHref="/dashboard/cover-letter"
      />
    </div>
  );
}
