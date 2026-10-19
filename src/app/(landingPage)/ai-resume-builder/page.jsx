import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  FileText,
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Download,
  Layers,
  Wand2,
  Sliders,
  HelpCircle,
  GraduationCap,
  Briefcase,
  Users,
} from "lucide-react";
import BuildButton from "@/shared/components/landing/BuildButton";
import ProductScreenshot from "@/shared/components/products/ProductScreenshot";
import ProductBreadcrumbs from "@/shared/components/products/ProductBreadcrumbs";
import RelatedProducts from "@/shared/components/products/RelatedProducts";
import ProductConversionBanner from "@/shared/components/products/ProductConversionBanner";

export const metadata = createSeoMetadata({
  title: "AI Resume Builder for Freshers | ATS-Friendly Resumes – NextCV",
  description:
    "Build an ATS-friendly resume with AI assistance. Organize education, projects, skills and experience, improve bullet points with AI, and download a professional PDF.",
  path: "/ai-resume-builder",
  keywords: [
    "ai resume builder",
    "ai powered resume builder",
    "ai resume builder free",
    "free ai resume builder",
    "resume builder ai",
    "online ai resume builder",
    "ai ats resume builder",
    "resume builder with ai",
    "free ai resume builder and download",
  ],
});

const faqs = [
  {
    question: "What is an AI resume builder?",
    answer:
      "An AI resume builder is a digital tool that assists you in writing, structuring, and formatting a resume. NextCV pairs Gemini AI writing suggestions for summaries, bullet points, and skills with clean ATS-compliant resume layouts.",
  },
  {
    question: "How does NextCV help create a resume?",
    answer:
      "NextCV guides you step-by-step through entering your contact details, education, technical skills, projects, and work experience. It offers AI suggestions to polish bullet points and gives you instant real-time PDF previews.",
  },
  {
    question: "Can freshers use NextCV?",
    answer:
      "Yes. NextCV is built specifically with freshers and college students in mind. Templates emphasize academic achievements, capstone projects, coding profiles, internships, and technical coursework.",
  },
  {
    question: "Is the resume builder free?",
    answer:
      "Building, editing, structuring, and previewing your resume on NextCV is 100% free. When you are ready to download a high-resolution, watermark-free PDF, one-time payment plans start at ₹49 with no recurring monthly subscriptions.",
  },
  {
    question: "Can I download my resume as a PDF?",
    answer:
      "Yes. Once unlocked through our one-time plans (Basic ₹49, Standard ₹99, Premium ₹199, Elite ₹399), you can download clean, vector-rendered PDFs formatted according to industry standards.",
  },
  {
    question: "Are the templates ATS-friendly?",
    answer:
      "Yes. NextCV templates follow single-column and cleanly segmented multi-column hierarchies that applicant tracking systems and recruiters can parse accurately. Note that no software can guarantee an interview or an ATS score because individual corporate filters vary.",
  },
  {
    question: "Can I edit my resume after creating it?",
    answer:
      "Yes. Your drafts and purchased resumes remain saved in your account dashboard so you can update them as your career advances.",
  },
];

export default function AIResumeBuilderPage() {
  const breadcrumbItems = [{ label: "Products", href: "/product" }, { label: "AI Resume Builder" }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "NextCV AI Resume Builder",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://www.nextcv.in/ai-resume-builder",
        description:
          "Build an ATS-friendly resume with AI assistance. Organize your experience, improve bullet points, and preview before downloading.",
        offers: {
          "@type": "Offer",
          price: "49",
          priceCurrency: "INR",
        },
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
            name: "AI Resume Builder",
            item: "https://www.nextcv.in/ai-resume-builder",
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
                AI-Powered Career Toolkit
              </div>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] text-[#17201C]">
                Build an ATS-Friendly Resume with AI
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5B625C]">
                Create a professional resume with AI assistance. Organize your experience, improve
                bullet points, choose a template, and review your resume before downloading.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BuildButton className="h-12 bg-[#465B9E] px-6 text-sm font-semibold text-white hover:bg-[#344B93]">
                  Build Your Resume
                </BuildButton>
                <Link
                  href="/templates"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-sm font-semibold text-[#17201C] transition-colors hover:bg-[#F1F0EB]"
                >
                  Explore Resume Templates
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#5B625C]">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Free to edit & preview
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  One-time plans from ₹49
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  No recurring subscription
                </span>
              </div>
            </div>

            <div>
              <ProductScreenshot
                src="/products/resume-builder/resume-editor.png"
                alt="NextCV AI Resume Editor live preview"
                caption="Interactive resume builder with live ATS preview and step-by-step guidance."
                label="NextCV Resume Editor"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="border border-[#E3E2DC] bg-[#FAF9F6] p-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-rose-700">
                The Fresher Dilemma
              </span>
              <h2 className="mt-3 font-serif text-2xl text-[#17201C]">
                Writer&apos;s block and confusing ATS guidelines
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5B625C]">
                Many freshers struggle to write professional bullet points that explain technical
                coursework or college projects with impact. Using overly complex, multi-column Word
                documents often results in parsing failures in recruiter systems.
              </p>
            </div>

            <div className="border border-[#465B9E]/30 bg-[#EEF0F7]/40 p-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                The NextCV Approach
              </span>
              <h2 className="mt-3 font-serif text-2xl text-[#17201C]">
                Guided drafting with AI clarity and tested templates
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5B625C]">
                NextCV lets you type rough bullet points and uses AI to refine them with strong
                action verbs, measurable impact, and clean structure. You review and tweak every
                line before picking an ATS-optimized template.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Exact 100% Codebase Flow */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Exact Creation Flow
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Step-by-step: How to build your resume in NextCV
            </h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              The exact sequence of steps you navigate inside the NextCV builder—from starting
              method to final vector PDF download.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                badge: "Start Method",
                title: "Start Method & Template Selection",
                desc: "Choose between starting from scratch or importing an existing PDF/DOCX resume. Select from Basic, Standard, Premium, or Elite ATS layouts.",
                route: "/dashboard/builder/template-selection",
                icon: Layers,
              },
              {
                step: "02",
                badge: "Basic Details",
                title: "Contact Info & Target Job Role",
                desc: "Enter your full name, phone number, email address, location, target job title, LinkedIn URL, GitHub profile, and optional target job description.",
                route: "/dashboard/builder/basicInfo",
                icon: FileText,
              },
              {
                step: "03",
                badge: "Education",
                title: "Degree & Institution History",
                desc: "Add your college or university, degree/major, graduation year range, CGPA or percentage, and optional relevant coursework.",
                route: "/dashboard/builder/education",
                icon: GraduationCap,
              },
              {
                step: "04",
                badge: "Skills",
                title: "Technical & Professional Skills",
                desc: "Organize your technical proficiencies, frameworks, programming languages, and industry tools into clean, recruiter-scannable tags.",
                route: "/dashboard/builder/skills",
                icon: Sliders,
              },
              {
                step: "05",
                badge: "Experience",
                title: "Work History & Internships",
                desc: "List company names, job titles, employment dates, and bullet points. Use built-in AI bullet generation to quantify your team impact.",
                route: "/dashboard/builder/experience",
                icon: Briefcase,
              },
              {
                step: "06",
                badge: "Projects",
                title: "Academic & Personal Projects",
                desc: "Highlight capstone projects, hackathon prototypes, live links, and tech stacks used (crucial for fresher resumes).",
                route: "/dashboard/builder/projects",
                icon: Wand2,
              },
              {
                step: "07",
                badge: "Certifications",
                title: "Licenses & Verified Credentials",
                desc: "Add recognized course certifications, issuing organizations, dates completed, and credential URLs.",
                route: "/dashboard/builder/certificate",
                icon: ShieldCheck,
              },
              {
                step: "08",
                badge: "Summary",
                title: "Professional Summary & Objective",
                desc: "Draft a 2-3 sentence career summary tailored to your target position, with one-click AI summary assistance.",
                route: "/dashboard/builder/summary",
                icon: Sparkles,
              },
              {
                step: "09",
                badge: "Final Review & Download",
                title: "Live PDF Preview & Unlock",
                desc: "Inspect margin spacing, apply coupon code (FIRST20 for 20% off), complete checkout, and download your watermark-free PDF.",
                route: "/dashboard/builder/review",
                icon: Download,
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
                  <div className="mt-5 pt-3 border-t border-[#F1F0EB] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#8A908B] truncate max-w-45">
                      {item.route}
                    </span>
                    <span className="text-[10px] font-semibold text-[#465B9E]">Active Step →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visual Workflow Proof / Screenshots */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Visual Tour
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Inside the NextCV Resume Studio
            </h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              Real components and tools built to make resume preparation straightforward.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <ProductScreenshot
                src="/products/resume-builder/template-selection.png"
                alt="NextCV Template Selection grid"
                caption="Browse single-column and recruiter-preferred templates with live previews."
                label="Template Selection"
              />
              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Tailored Template Selection
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Filter formats suited for MNC campus placements, software development, data
                analytics, or non-technical roles.
              </p>
            </div>

            <div>
              <ProductScreenshot
                src="/products/resume-builder/ai-writing.png"
                alt="NextCV AI bullet generator modal"
                caption="Generate achievement bullets tailored to your target job title."
                label="AI Writing Assistance"
              />
              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Contextual AI Writing
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Turn simple project descriptions into strong, action-oriented bullet points with
                Gemini AI.
              </p>
            </div>

            <div className="md:col-span-2">
              <ProductScreenshot
                src="/products/resume-builder/pdf-preview.png"
                alt="NextCV PDF real-time previewer"
                caption="Inspect exact print margins and page break layouts before downloading."
                label="Live PDF Preview"
              />
              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Exact Print & PDF Preview
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Review line-by-line formatting to ensure your resume fits naturally onto a single
                page without accidental spillover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Audience
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Who is NextCV built for?
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "College Students & Freshers",
                desc: "Structure final year projects, internships, and technical certifications effectively when you have limited full-time experience.",
              },
              {
                icon: Briefcase,
                title: "Job Seekers Targeting MNCs",
                desc: "Build clean, ATS-compliant formats standard across Indian tech recruiters like TCS, Infosys, Wipro, and Accenture.",
              },
              {
                icon: Users,
                title: "Career Switchers",
                desc: "Use AI bullet assistance to reframe transferable skills and emphasize relevant accomplishments for new industries.",
              },
            ].map(aud => {
              const Icon = aud.icon;
              return (
                <div key={aud.title} className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
                  <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                    {aud.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#5B625C]">{aud.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing & Access Rules */}
      <section className="bg-white py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Transparent Pricing
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              How NextCV pricing works
            </h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              No recurring credit card charges or recurring subscriptions.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              {
                name: "Basic",
                price: "₹49",
                detail: "Single-column ATS format, full editing, high-resolution PDF download.",
              },
              {
                name: "Standard",
                price: "₹99",
                detail:
                  "Multiple layouts, role-focused styling, AI bullet assistance, PDF download.",
              },
              {
                name: "Premium",
                price: "₹199",
                detail: "20+ layouts, live public resume link for sharing, AI tools, PDF download.",
              },
              {
                name: "Elite",
                price: "₹399",
                detail:
                  "Complete suite: resume, sharing link, portfolio website, cover letter generator.",
              },
            ].map(p => (
              <div
                key={p.name}
                className="border border-[#E3E2DC] bg-[#FAF9F6] p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-semibold text-[#8A908B] uppercase tracking-wider">
                    {p.name}
                  </span>
                  <p className="mt-2 font-mono text-2xl font-bold text-[#17201C]">{p.price}</p>
                  <p className="mt-3 text-xs leading-5 text-[#5B625C]">{p.detail}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E3E2DC] text-[11px] text-[#8A908B]">
                  One-time payment
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#465B9E] hover:underline"
            >
              View detailed plan comparison and apply FIRST20 coupon{" "}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
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
              Answers about ATS compliance, templates, editing, and pricing.
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
      <RelatedProducts currentPath="/ai-resume-builder" />

      {/* Final Conversion CTA */}
      <ProductConversionBanner
        badge="AI Resume Studio"
        title="Build your job-ready resume in minutes"
        description="Select a template, customize bullet points with Gemini AI, and review your live preview. Pay once only when you want to download."
        primaryCtaText="Build Your Resume Now"
        primaryCtaHref="/dashboard/builder"
      />
    </div>
  );
}
