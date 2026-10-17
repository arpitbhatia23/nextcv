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
  title: "Resume Templates for Freshers & Professionals in India | NextCV",
  description:
    "Explore professional resume templates for freshers and experienced professionals in India. Compare simple, modern and ATS-friendly resume formats, preview designs, and build your resume with NextCV.",
  path: "/templates",
  keywords: [
    "resume templates",
    "resume template",
    "resume templates for freshers",
    "resume template for freshers India",
    "resume format India",
    "ATS-friendly resume templates",
    "professional resume templates",
    "simple resume template",
    "resume format for freshers",
    "Indian resume format",
  ],
});

const faqs = [
  {
    question: "Which resume format is best for freshers in India?",
    answer:
      "A simple, reverse-chronological or content-focused resume format is a useful starting point for freshers in India. Highlight education, relevant skills, internships, academic projects, certifications and achievements. Choose a layout that makes your qualifications easy to scan.",
  },
  {
    question: "Which resume template is suitable for ATS?",
    answer:
      "A resume template with readable text, clear section headings and a logical reading order is a sensible starting point for applicant tracking systems. Avoid relying on decorative elements to communicate important information. No template can guarantee that every employer's ATS will parse or rank a resume correctly.",
  },
  {
    question: "Can I use these resume templates for IT jobs?",
    answer:
      "Yes. Choose a template that gives appropriate space to technical skills, projects, internships and work experience. Tailor the content to the role and include relevant technologies and achievements that you can explain confidently.",
  },
  {
    question: "Can experienced professionals use these resume templates?",
    answer:
      "Yes. Experienced professionals can choose a layout that highlights work history, measurable achievements, relevant skills and career progression. Give the most relevant experience appropriate prominence and tailor your resume to the role.",
  },
  {
    question: "Can I preview a resume template before using it?",
    answer:
      "Yes. Open a template preview to inspect its layout and choose Use Template to start building your resume.",
  },
  {
    question: "Can I build and edit my resume for free?",
    answer:
      "You can build and edit your resume for free on NextCV. Paid download plans are one-time payments ranging from ₹49 to ₹399, depending on the selected template and included features. There is no monthly subscription. Check the pricing page for the current plan details.",
  },
  {
    question: "Should I use a photo in my Indian resume?",
    answer:
      "A photo is not necessary for most standard professional and IT applications unless the employer specifically requests one. Follow the instructions in the job posting and prioritize relevant qualifications, skills and achievements.",
  },
  {
    question: "How can I improve my resume for a specific job?",
    answer:
      "Read the job description carefully, identify the relevant skills and responsibilities, and update your resume using accurate examples from your experience. You can also use the NextCV ATS Resume Checker to review your resume before applying.",
  },
];

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
      name: "Resume Templates",
      item: "https://www.nextcv.in/templates",
    },
  ],
};

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

const formatTips = [
  {
    icon: GraduationCap,
    title: "Resume templates for freshers",
    description:
      "Highlight education, internships, academic projects, certifications and skills when you have limited full-time experience.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Professional resume formats",
    description:
      "Give relevant work experience, responsibilities and measurable achievements a clear place in your resume.",
  },
  {
    icon: ShieldCheck,
    title: "ATS-friendly resume templates",
    description:
      "Prefer readable text, familiar headings and a clear content hierarchy. Review the exported document before submitting it.",
  },
];

const resumeSections = [
  "Contact information and professional links",
  "A concise professional summary, when useful",
  "Relevant technical and professional skills",
  "Education and academic qualifications",
  "Projects, internships and work experience",
  "Certifications and achievements relevant to the role",
];

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <header className="border-b border-border pt-28 sm:pt-32">
        <div className="nc-container pb-12 pt-2 sm:pb-16">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-primary">
              <FileText aria-hidden="true" className="h-4 w-4" />
              Resume templates for the Indian job market
            </p>

            <h1 className="mt-5 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              Resume Templates for Freshers and Professionals in India
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Explore simple, modern and ATS-friendly resume templates for students, freshers, IT
              professionals and experienced candidates. Compare resume formats, preview a design,
              and build a resume tailored to your next job application with NextCV.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <BuildButton>Build My Resume</BuildButton>

              <Link href="/ats-resume-checker" className="nc-button-secondary">
                Check My Resume
                <FileSearch aria-hidden="true" className="ml-2 inline h-4 w-4" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Free to build and edit · ₹49–₹399 one-time download plans · No monthly subscription
            </p>
          </div>

          <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {[
              "Resume formats for freshers",
              "Professional resume layouts",
              "ATS-conscious designs",
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
          title="Browse Resume Templates"
          description="Explore six starting points by style and career stage. Preview a layout before choosing the template for your resume."
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
              The best resume template is one that makes your relevant qualifications easy to find.
              Your career stage, experience and target role should guide your choice. A fresher
              applying for a campus placement may need to emphasize education and projects, while an
              experienced candidate may need more room for career achievements.
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
                If you are applying for your first job, choose a resume format that brings your
                education, skills, projects and internships into focus. You do not need years of
                work experience to create a useful resume. Relevant academic projects, practical
                coursework, certifications and personal projects can help demonstrate your abilities
                when described accurately.
              </p>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                For campus placements and entry-level IT jobs, keep your sections organized and
                tailor the content to the job description. Use the same terminology as the role
                where it accurately reflects your skills and experience.
              </p>

              <div className="mt-6">
                <BuildButton>Build a Fresher Resume</BuildButton>
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
                Include only sections that are relevant to you. You do not need to add every
                possible section to your resume.
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
                Readability matters
              </p>

              <h2 className="mt-3 font-display text-3xl text-foreground sm:text-4xl">
                ATS-Friendly Resume Templates: What to Look For
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                An ATS-friendly resume format aims to keep information readable and logically
                organized. Use clear section headings, consistent dates and text that accurately
                describes your qualifications. Avoid placing essential information only in
                decorative graphics or images.
              </p>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Applicant tracking systems differ, and a template alone cannot guarantee a high
                score, successful parsing or an interview. Check your exported resume and tailor its
                content to each position before applying.
              </p>

              <Link
                href="/ats-resume-checker"
                className="mt-6 inline-flex items-center gap-2 font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
              >
                Check your resume with the ATS Resume Checker
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>

            <div className="border border-border bg-background p-6 sm:p-8">
              <ShieldCheck aria-hidden="true" className="h-8 w-8 text-primary" />

              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Before submitting your resume
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <li>Check that headings and dates are consistent.</li>
                <li>Review spelling, contact details and links.</li>
                <li>Use relevant skills from the job description accurately.</li>
                <li>Open the exported file to check its layout.</li>
                <li>Remove content that does not support your application.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resume format guide */}
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
              When comparing resume formats in India, start with the requirements of the job rather
              than the appearance of the template alone. Most candidates benefit from clear
              sections, readable text and a layout that brings relevant qualifications to the
              forefront.
            </p>

            <p>
              <strong className="text-foreground">For freshers:</strong> emphasize education,
              skills, projects, internships and certifications. Keep the most relevant information
              easy to locate.
            </p>

            <p>
              <strong className="text-foreground">For experienced professionals:</strong> highlight
              recent relevant roles, responsibilities and achievements. Include measurable outcomes
              where you have accurate figures to support them.
            </p>

            <p>
              <strong className="text-foreground">For technical and IT roles:</strong> make relevant
              programming languages, tools, technical projects and experience easy to scan. Adjust
              the order of sections to suit your background.
            </p>

            <p>
              A resume format should support your content, not replace it. Select a template that
              suits your experience, tailor the information to the vacancy, and review the final
              document before sending it to an employer.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 border-t border-border pt-6">
            <Link
              href="/examples"
              className="inline-flex items-center gap-2 font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
            >
              Browse resume examples
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>

            <Link
              href="/ats-resume-checker"
              className="inline-flex items-center gap-2 font-medium text-primary underline decoration-border-strong underline-offset-4 hover:text-primary/80"
            >
              Check ATS readability
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
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
              Build Your Resume with NextCV
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              After choosing a resume template, add your details, education, skills, projects and
              experience. Use AI writing assistance where helpful, then review and edit the content
              to ensure it accurately represents you. Choose a suitable template and check the final
              resume before applying.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: LayoutTemplate,
                title: "Choose a template",
                description: "Compare available layouts and preview your preferred design.",
              },
              {
                icon: Sparkles,
                title: "Improve your content",
                description: "Use available AI writing tools to draft and refine resume content.",
              },
              {
                icon: FileText,
                title: "Review your resume",
                description: "Check your information and final document before applying.",
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
              <h2 className="font-display text-2xl">Ready to build your resume?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Start building and editing for free. Review the available one-time download plans
                when you are ready.
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
              Learn how to choose a resume format, create a fresher resume and review your document
              before applying.
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
          </div>
        </div>
      </section>
    </main>
  );
}
