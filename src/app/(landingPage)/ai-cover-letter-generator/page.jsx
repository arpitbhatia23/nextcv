import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import { FileText, Sparkles, Check, ArrowRight, HelpCircle, Building, Wand2 } from "lucide-react";
import ProductScreenshot from "@/shared/components/products/ProductScreenshot";
import ProductBreadcrumbs from "@/shared/components/products/ProductBreadcrumbs";
import RelatedProducts from "@/shared/components/products/RelatedProducts";
import ProductConversionBanner from "@/shared/components/products/ProductConversionBanner";

export const metadata = createSeoMetadata({
  title: "AI Cover Letter Generator from Resume & Job Description | NextCV",
  description:
    "Generate a job-specific cover letter tailored to your resume, company name, and job description with NextCV. Choose tone, edit drafts, and download clean PDFs.",
  path: "/ai-cover-letter-generator",
  keywords: [
    "ai cover letter generator",
    "cover letter ai",
    "ai cover letter",
    "free ai cover letter generator",
    "cover letter ai generator",
    "cover letter generator ai",
    "ai cover letter generator from resume",
    "ai resume and cover letter builder",
    "cover letter based on resume ai",
  ],
});

const faqs = [
  {
    question: "What is an AI cover letter generator?",
    answer:
      "An AI cover letter generator analyzes your resume background and matches it against a specific company name and job description to draft a tailored letter explaining why you are a strong fit.",
  },
  {
    question: "Can NextCV generate a cover letter from my resume?",
    answer:
      "Yes. You can select an existing resume saved in your NextCV dashboard or upload an external PDF/DOCX resume (up to 5 MB) directly in the generator tool.",
  },
  {
    question: "Can I use a job description to personalize a cover letter?",
    answer:
      "Yes. Pasting the target company's job description allows the AI model to incorporate relevant technical keywords and match your achievements with their required qualifications.",
  },
  {
    question: "Can I choose the writing tone?",
    answer:
      "Yes. NextCV supports writing styles including Professional, Enthusiastic, Concise, and Confident to suit corporate MNC roles, modern startups, or academic applications.",
  },
  {
    question: "Can I edit the generated cover letter?",
    answer:
      "Yes. You have full control to edit paragraphs, add personal anecdotes, alter salutations, and customize bullet points before finalizing.",
  },
  {
    question: "Is the AI cover letter generator free?",
    answer:
      "You can draft and review cover letters in the builder. Cover letter creation and downloads are included with the Elite plan or available through the cover letter tool.",
  },
  {
    question: "Should I review an AI-generated cover letter before sending it?",
    answer:
      "Always. AI provides a strong first draft, but reviewing the letter ensures accurate details about your personal motivations, projects, and specific interest in the employer.",
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
        name: "NextCV AI Cover Letter Generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://www.nextcv.in/ai-cover-letter-generator",
        description:
          "Create a personalized cover letter using your resume, target company, and job description.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                Create a personalized cover letter using your resume, target company, and job
                description. Review the draft, choose a writing style, and tailor it before
                applying.
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
                  Select saved resume or upload PDF
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Multiple writing tones
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Live draft editor
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
                fails to highlight why your specific experience matters for their open position.
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
                responsibilities outlined in the job description, producing a cohesive rationale for
                your candidacy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - Exact 100% Codebase Workflow */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Exact Generation Flow
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Step-by-step: How the Cover Letter Studio operates
            </h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              The exact 4-step workflow implemented in NextCV at{" "}
              <code className="font-mono text-xs text-[#17201C]">/dashboard/cover-letter</code>,
              powered by Gemini AI and real-time PDF rendering.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                badge: "Step 01",
                title: "Choose Resume Source",
                desc: "Choose between 'My Resumes' (fetches paid resumes via /api/resume/getAllResume) or 'Upload Resume' (supports external .pdf/.docx up to 5 MB parsed via /api/resume/import).",
                detail: "Feeds active resume job role, skills, and experience into the prompt.",
                icon: FileText,
              },
              {
                step: "02",
                badge: "Step 02",
                title: "Job Details & Tone Selection",
                desc: "Enter the Target Company Name and paste the full Job Description. Select your writing tone (Professional, Enthusiastic, Concise, Confident) and desired length.",
                detail: "Validates company and resume presence before generation.",
                icon: Building,
              },
              {
                step: "03",
                badge: "Step 03",
                title: "AI Generation & Realtime Editor",
                desc: "Click 'Generate Cover Letter' to call /api/cover-letter/gen. Inspect the draft in the interactive text editor where you can personalize lines and adjust wording.",
                detail: "Drafts can be saved to your account via /api/cover-letter/savedraft.",
                icon: Wand2,
              },
              {
                step: "04",
                badge: "Step 04",
                title: "Live PDF Preview & Download",
                desc: "Inspect the side-by-side vector PDF preview in real-time. Apply discount coupons (e.g. FIRST20) and download your print-ready PDF letter.",
                detail: "One-click download or save to 'My Cover Letters'.",
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

      {/* Combined Resume + Cover Letter Workflow */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
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
                  Recruiters appreciate consistency. When your resume bullet points and cover letter
                  narrative reflect the same milestones and technologies, your entire application
                  feels polished.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/ai-resume-builder"
                    className="inline-flex h-11 items-center justify-center gap-2 border border-transparent bg-[#465B9E] px-5 text-xs font-semibold text-white hover:bg-[#344B93]"
                  >
                    Build Resume First <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex h-11 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-xs font-semibold text-[#17201C] hover:bg-[#F1F0EB]"
                  >
                    View Elite Plan (Includes Both)
                  </Link>
                </div>
              </div>

              <div className="border border-[#E3E2DC] bg-white p-6">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#8A908B]">
                  Elite Bundle Summary
                </p>
                <ul className="mt-4 space-y-3 text-xs text-[#5B625C]">
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    High-resolution ATS resume PDF download
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    AI Cover Letter generator access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Public resume sharing link
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    Online portfolio website builder
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
              Details on inputs, privacy, tone selection, and draft editing.
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
        description="Stop sending identical generic letters. Match your real experience with company job descriptions using NextCV."
        primaryCtaText="Launch Cover Letter Generator"
        primaryCtaHref="/dashboard/cover-letter"
      />
    </div>
  );
}
