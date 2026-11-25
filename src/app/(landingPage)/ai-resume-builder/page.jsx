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
  title: "AI Resume Builder India (2026): ATS & Free Edit | NextCV",
  description:
    "Build an ATS-friendly resume with Gemini AI on NextCV. Refine STAR bullets, preview live PDFs free & export from ₹49 one-time via UPI. No subscription.",
  path: "/ai-resume-builder",
  keywords: [
    "ai resume builder",
    "ai resume builder india",
    "free ai resume builder",
    "ai ats resume builder",
    "gemini ai resume builder",
    "ats resume builder for freshers",
    "resume builder with upi payment",
    "one time payment resume builder",
    "ai resume maker pdf download",
  ],
});

const faqs = [
  {
    question: "What is an AI resume builder?",
    answer:
      "An AI resume builder helps you write, structure, and format a job-ready resume without staring at a blank page. NextCV pairs Gemini AI writing assistance for summaries and STAR-method bullet points with clean, single-column ATS-compliant resume layouts.",
  },
  {
    question: "How does NextCV help create an ATS-friendly resume?",
    answer:
      "NextCV guides you step-by-step through contact details, education, technical skills, projects, and experience. You can refine rough notes into quantified action-verb bullets with AI, preview your live PDF layout in real time, and verify your score on our free AI ATS Resume Checker.",
  },
  {
    question: "Can freshers and experienced professionals both use NextCV?",
    answer:
      "Yes. Freshers can highlight CGPA, academic projects, internships, and coding profiles, while experienced professionals can emphasize work history, leadership scope, and measurable business outcomes across role-specific layouts.",
  },
  {
    question: "Is the AI resume builder free to use?",
    answer:
      "Yes. Building, editing, using AI bullet refinement, checking your ATS score, and sharing your web resume (/r/yourname) are free on NextCV. You only pay a one-time fee starting at ₹49 when you export a watermark-free vector PDF.",
  },
  {
    question: "Can I pay via UPI without a recurring subscription?",
    answer:
      "Yes. NextCV supports native Indian UPI (Google Pay, PhonePe, Paytm, BHIM) and RuPay cards with zero recurring monthly subscriptions or hidden auto-debits. One-time PDF export plans are Basic (₹49), Standard (₹99), Premium (₹199), and Elite (₹399).",
  },
  {
    question: "Do NextCV templates work with Indian ATS portals like Workday and Darwinbox?",
    answer:
      "Yes. NextCV templates use clean vector text layers, standard section headings, and logical reading order so enterprise parsers like Workday, Darwinbox, Taleo, and Naukri Resdex extract every section accurately—without the text scrambling common in graphic Canva templates.",
  },
  {
    question: "Can I edit my resume after downloading the PDF?",
    answer:
      "Yes. Your drafts and unlocked resumes remain saved in your NextCV dashboard so you can update skills, projects, or roles anytime as your career progresses.",
  },
];

export default function AIResumeBuilderPage() {
  const breadcrumbItems = [{ label: "Products", href: "/product" }, { label: "AI Resume Builder" }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://www.nextcv.in/ai-resume-builder#app",
        name: "NextCV AI Resume Builder",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "en-IN",
        url: "https://www.nextcv.in/ai-resume-builder",
        description:
          "Build an ATS-friendly resume with Gemini AI assistance. Refine STAR bullet points, preview live PDFs for free, and export from ₹49 one-time via UPI.",
        featureList: [
          "Gemini AI STAR bullet & summary refinement",
          "ATS-verified single-column & modern layouts",
          "Real-time live PDF margin preview",
          "Free AI ATS score check & public resume link",
          "One-time UPI checkout starting at ₹49",
        ],
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "49",
          highPrice: "399",
          offerCount: "4",
          priceCurrency: "INR",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.nextcv.in/ai-resume-builder#breadcrumb",
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
        "@id": "https://www.nextcv.in/ai-resume-builder#faq",
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
                AI-Powered Career Toolkit
              </div>

              <h1 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.1] text-[#17201C]">
                Build an ATS-Friendly Resume with AI
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5B625C]">
                Create a recruiter-ready resume with Gemini AI assistance. Turn rough experience
                into quantified STAR bullet points, pick an ATS-verified layout, and export vector
                PDFs starting at ₹49 one-time via UPI.
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
                  Free to edit &amp; preview
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  One-time UPI plans from ₹49
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Zero recurring subscriptions
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
                The Job Seeker Dilemma
              </span>
              <h2 className="mt-3 font-serif text-2xl text-[#17201C]">
                Writer&apos;s block, ATS rejections &amp; ₹2,000/mo paywalls
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5B625C]">
                Most candidates struggle to turn coursework or daily tasks into quantified STAR
                bullets. Worse, graphic tools like Canva break ATS parsers like Darwinbox and
                Workday, while foreign builders trap users in $24/month credit-card subscriptions.
              </p>
            </div>

            <div className="border border-[#465B9E]/30 bg-[#EEF0F7]/40 p-8">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                The NextCV Approach
              </span>
              <h2 className="mt-3 font-serif text-2xl text-[#17201C]">
                Guided Gemini AI drafting, verified ATS layouts &amp; ₹49 UPI export
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5B625C]">
                Type rough notes and let Gemini AI refine them into strong action-verb bullets with
                measurable impact. Preview your exact PDF for free, check your score on our{" "}
                <Link href="/ats-resume-checker" className="font-semibold text-[#465B9E] underline">
                  ATS Resume Checker
                </Link>
                , and pay once via UPI only when downloading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works - Guided Builder Workflow */}
      <section className="py-16 sm:py-20 border-b border-[#E3E2DC]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Guided Creation Flow
            </p>
            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Step-by-step: How to build your resume in NextCV
            </h2>
            <p className="mt-2 text-sm text-[#5B625C]">
              A structured 9-step studio designed to take you from blank screen or existing PDF to a
              clean, recruiter-ready resume in minutes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                step: "01",
                badge: "Start Method",
                title: "Start Method & Template Selection",
                desc: "Start from scratch or import an existing PDF/DOCX resume. Choose from Basic, Standard, Premium, or Elite ATS layouts.",
                outcome: "ATS Layout Selected",
                icon: Layers,
              },
              {
                step: "02",
                badge: "Basic Details",
                title: "Contact Info & Target Job Role",
                desc: "Add your name, phone, email, location, target job title, LinkedIn URL, GitHub profile, and optional target job description.",
                outcome: "Header & Links Verified",
                icon: FileText,
              },
              {
                step: "03",
                badge: "Education",
                title: "Degree & Institution History",
                desc: "Enter your college or university, degree/major, graduation dates, CGPA or percentage, and relevant academic coursework.",
                outcome: "Academic Cutoffs Clear",
                icon: GraduationCap,
              },
              {
                step: "04",
                badge: "Skills",
                title: "Technical & Professional Skills",
                desc: "Organize programming languages, frameworks, and domain tools into clean, ATS-scannable categories without graphic bars.",
                outcome: "Keywords Categorized",
                icon: Sliders,
              },
              {
                step: "05",
                badge: "Experience",
                title: "Work History & Internships",
                desc: "Add companies, roles, dates, and impact bullets. Use one-click Gemini AI bullet refinement to quantify your achievements.",
                outcome: "STAR Bullets Polished",
                icon: Briefcase,
              },
              {
                step: "06",
                badge: "Projects",
                title: "Academic & Personal Projects",
                desc: "Showcase capstone projects, hackathon builds, live URLs, and tech stacks—essential for fresher and tech shortlisting.",
                outcome: "Proof of Work Added",
                icon: Wand2,
              },
              {
                step: "07",
                badge: "Certifications",
                title: "Licenses & Verified Credentials",
                desc: "Include recognized technical certifications, issuing organizations, completion dates, and verifiable credential links.",
                outcome: "Credentials Linked",
                icon: ShieldCheck,
              },
              {
                step: "08",
                badge: "Summary",
                title: "Professional Summary & Objective",
                desc: "Generate a crisp 2–3 line career summary tailored to your target job title using built-in AI summary assistance.",
                outcome: "Role Pitch Tailored",
                icon: Sparkles,
              },
              {
                step: "09",
                badge: "Final Review & Download",
                title: "Live PDF Preview & Unlock",
                desc: "Inspect exact 1-page margin spacing, apply coupon FIRST20 for 20% off, pay via UPI, and export your watermark-free PDF.",
                outcome: "Vector PDF Ready",
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
                    <span className="font-mono text-[10px] text-[#8A908B]">{item.outcome}</span>
                    <span className="text-[10px] font-semibold text-[#465B9E]">Included Free →</span>
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
              Built for speed, clean typography, and effortless ATS readability across Indian hiring
              portals.
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
                Filter layouts tuned for MNC campus placements, software development, data
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
                Turn simple project descriptions into strong, action-oriented STAR bullet points
                with Gemini AI.
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
                Exact Print &amp; PDF Preview
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
                desc: "Structure final-year projects, internships, CGPA, and technical certifications effectively—see our fresher resume format guide for Indian campuses.",
                href: "/fresher-resume-format-india",
                linkLabel: "Fresher Resume Guide →",
              },
              {
                icon: Briefcase,
                title: "Job Seekers Targeting MNCs",
                desc: "Build clean, ATS-compliant layouts verified for Indian tech recruiters including TCS, Infosys, Wipro, Cognizant, and Accenture.",
                href: "/ats-friendly-resume-format-india",
                linkLabel: "ATS Format Rules →",
              },
              {
                icon: Users,
                title: "Experienced Pros & Switchers",
                desc: "Use Gemini AI bullet refinement to quantify impact, reframe transferable skills, and avoid ₹2,000/month foreign builder subscriptions.",
                href: "/resume-builder-comparison",
                linkLabel: "Compare Resume Builders →",
              },
            ].map(aud => {
              const Icon = aud.icon;
              return (
                <div
                  key={aud.title}
                  className="border border-[#E3E2DC] bg-white p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                      {aud.title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#5B625C]">{aud.desc}</p>
                  </div>
                  <Link
                    href={aud.href}
                    className="mt-4 inline-block text-xs font-semibold text-[#465B9E] hover:underline"
                  >
                    {aud.linkLabel}
                  </Link>
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
              Pay once via Google Pay, PhonePe, Paytm UPI, or RuPay—zero recurring subscriptions or
              credit card traps.
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
                  "Resume, sharing link, and portfolio website. Cover letters are a separate ₹79 purchase.",
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
                  One-time UPI / Card payment
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
              Answers about Gemini AI drafting, ATS compliance, UPI checkout, and one-time pricing.
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
        description="Select an ATS-verified template, refine bullet points with Gemini AI, and preview live. Pay once via UPI starting at ₹49 only when downloading."
        primaryCtaText="Build Your Resume Now"
        primaryCtaHref="/dashboard/builder"
      />
    </div>
  );
}
