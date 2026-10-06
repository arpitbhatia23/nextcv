import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Minus, DollarSign, HelpCircle } from "lucide-react";

import {
  comparisonPages,
  getComparisonBySlug,
  comparisonFeatureLabels,
  featureStatusLabels,
} from "../../comparison_pages.js";

// ---------------------------------------------------------
// STATIC PARAMS
// ---------------------------------------------------------

export async function generateStaticParams() {
  return comparisonPages.map(page => ({
    slug: page.slug,
  }));
}

// ---------------------------------------------------------
// METADATA
// ---------------------------------------------------------

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const page = getComparisonBySlug(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.seo.title,
    description: page.seo.description,

    alternates: {
      canonical: `/resume-builder-comparison/${page.slug}`,
    },

    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
    },
  };
}

// ---------------------------------------------------------
// FEATURE STATUS
// ---------------------------------------------------------

function FeatureValue({ value }) {
  const status = featureStatusLabels[value];

  if (!status) {
    return <span className="text-sm text-[#646A64]">{String(value)}</span>;
  }

  if (value === "available") {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-medium text-[#344B93]">
        <Check className="h-4 w-4 shrink-0" />
        {status.label}
      </span>
    );
  }

  if (value === "paid") {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-medium text-[#344B93]">
        <DollarSign className="h-4 w-4 shrink-0" />
        Paid
      </span>
    );
  }

  if (value === "limited") {
    return <span className="text-sm font-medium text-[#646A64]">Limited</span>;
  }

  if (value === "not_verified") {
    return (
      <span className="inline-flex items-center gap-2 text-sm text-[#777A75]">
        <HelpCircle className="h-4 w-4 shrink-0" />
        Not verified
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2 text-sm text-[#777A75]">
      <Minus className="h-4 w-4" />
      Not found
    </span>
  );
}

// ---------------------------------------------------------
// NEXTCV FEATURE STATUS
// ---------------------------------------------------------

const nextcvFeatures = {
  resumeBuilder: "available",
  aiWriter: "available",
  atsChecker: "available",
  jdMatching: "available",
  keywordOptimization: "available",
  coverLetter: "available",
  templates: "available",
  resumeSharing: "available",
  portfolio: "available",
  jobSearch: "not_found",
  jobTracker: "not_found",
  interviewPrep: "not_found",
  mobile: "available",
  translation: "not_found",
};

// ---------------------------------------------------------
// COMPARISON TABLE
// ---------------------------------------------------------

function ComparisonTable({ page }) {
  const featureKeys = Object.keys(comparisonFeatureLabels);

  return (
    <div className="overflow-x-auto border border-[#E3E3DD] bg-white/50">
      <div className="min-w-190">
        {/* Header */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr] border-b border-[#E3E3DD] bg-white/70">
          <div className="p-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#646A64] sm:p-5">
            Feature
          </div>

          <div className="border-l border-[#E3E3DD] p-4 font-serif text-lg sm:p-5">NextCV</div>

          <div className="border-l border-[#E3E3DD] p-4 font-serif text-lg sm:p-5">
            {page.competitor}
          </div>
        </div>

        {/* Rows */}
        {featureKeys.map((featureKey, index) => {
          const featureName = comparisonFeatureLabels[featureKey];

          const nextcvValue = nextcvFeatures[featureKey] || "not_found";

          const competitorValue = page.features?.[featureKey] || "not_found";

          return (
            <div
              key={featureKey}
              className={`grid grid-cols-[1.5fr_1fr_1fr] ${
                index !== featureKeys.length - 1 ? "border-b border-[#E3E3DD]" : ""
              }`}
            >
              <div className="p-4 text-sm text-[#5B625C] sm:p-5">{featureName}</div>

              <div className="border-l border-[#E3E3DD] p-4 sm:p-5">
                <FeatureValue value={nextcvValue} />
              </div>

              <div className="border-l border-[#E3E3DD] p-4 sm:p-5">
                <FeatureValue value={competitorValue} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------
// PRICING TABLE
// ---------------------------------------------------------

function PricingComparison({ page }) {
  const pricing = page.pricing || {};

  return (
    <div className="grid gap-px overflow-hidden border border-[#E3E3DD] bg-[#E3E3DD] sm:grid-cols-2">
      {/* NextCV */}
      <div className="bg-white/70 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#465B9E]">NextCV</p>

        <h3 className="mt-3 font-serif text-2xl">Built for Indian job seekers</h3>

        <div className="mt-6 space-y-3 text-sm text-[#5B625C]">
          <PricingRow label="Free plan" value="Yes" available />

          <PricingRow label="Paid plan" value="Yes" available />

          <PricingRow label="Recurring subscription" value="No for core resume purchase" />

          <PricingRow label="One-time payment" value="Yes" available />

          <PricingRow label="Entry pricing" value="From ₹49" available />
        </div>
      </div>

      {/* Competitor */}
      <div className="bg-[#F8F7F3] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#646A64]">
          {page.competitor}
        </p>

        <h3 className="mt-3 font-serif text-2xl">Current pricing model</h3>

        <div className="mt-6 space-y-3 text-sm text-[#5B625C]">
          <PricingRow label="Model" value={pricing.model} />

          <PricingRow
            label="Free plan"
            value={pricing.free ? "Yes" : "No"}
            available={pricing.free}
          />

          <PricingRow
            label="Paid plan"
            value={pricing.paid ? "Yes" : "No"}
            available={pricing.paid}
          />

          <PricingRow
            label="Recurring"
            value={pricing.recurring ? "Yes" : "No"}
            available={!pricing.recurring}
          />

          <PricingRow
            label="Lifetime"
            value={pricing.lifetime ? "Yes" : "No"}
            available={pricing.lifetime}
          />

          {pricing.oneTime && <PricingRow label="One-time" value="Available" available />}
        </div>
      </div>
    </div>
  );
}

function PricingRow({ label, value, available = false }) {
  return (
    <div className="flex items-start justify-between gap-6 border-b border-[#E3E3DD] pb-3 last:border-0">
      <span>{label}</span>

      <span
        className={
          available ? "text-right font-medium text-[#344B93]" : "text-right text-[#646A64]"
        }
      >
        {value}
      </span>
    </div>
  );
}

// ---------------------------------------------------------
// SECTION HEADING
// ---------------------------------------------------------

function SectionHeading({ eyebrow, heading, description }) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#465B9E]">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em] sm:text-4xl">{heading}</h2>

      {description && (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#646A64]">{description}</p>
      )}
    </div>
  );
}

// ---------------------------------------------------------
// GENERIC CONTENT SECTION
// ---------------------------------------------------------

function ContentSection({ eyebrow = "Comparison", heading, description, bullets = [] }) {
  return (
    <section className="border-t border-[#E3E3DD] py-16 sm:py-20">
      <SectionHeading eyebrow={eyebrow} heading={heading} description={description} />

      {bullets.length > 0 && (
        <div className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
          {bullets.map(item => (
            <div key={item} className="flex items-start gap-3 border-b border-[#E3E3DD] py-4">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#465B9E]" />

              <span className="text-sm leading-6 text-[#4F5650]">{item}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------
// SECTIONS
// ---------------------------------------------------------

function ComparisonContent({ page }) {
  const sections = page.sections || [];

  return (
    <>
      {sections.map((section, index) => {
        const sectionName = typeof section === "string" ? section.toLowerCase() : "";

        // -----------------------------------------------
        // PRICING
        // -----------------------------------------------

        if (sectionName.includes("pricing")) {
          return (
            <section
              key={`${section}-${index}`}
              className="border-t border-[#E3E3DD] py-16 sm:py-20"
            >
              <SectionHeading
                eyebrow="Pricing"
                heading={`NextCV vs ${page.competitor} pricing`}
                description="Compare the pricing structure before choosing a resume builder. Pricing and feature availability can change over time."
              />

              <PricingComparison page={page} />
            </section>
          );
        }

        // -----------------------------------------------
        // ATS
        // -----------------------------------------------

        if (sectionName.includes("ats") || sectionName.includes("optimization")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="ATS"
              heading={`ATS optimization: NextCV vs ${page.competitor}`}
              description={`ATS compatibility is one of the most important factors when comparing ${page.competitor} with NextCV. The goal is not simply a high score, but a readable resume with relevant structure, keywords and job-specific content.`}
              bullets={[
                "ATS-focused resume structure",
                "Resume analysis",
                "Job-description keyword comparison",
                "Readable professional layouts",
                "Keyword-focused application workflow",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // AI
        // -----------------------------------------------

        if (sectionName.includes("ai") || sectionName.includes("writing")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="AI Resume Tools"
              heading={`AI resume writing: NextCV vs ${page.competitor}`}
              description={`AI tools can accelerate resume creation, but the final quality depends on the candidate's actual experience, projects, skills and target role.`}
              bullets={[
                "AI-generated professional summaries",
                "AI-assisted bullet points",
                "Skills suggestions",
                "Job-specific resume content",
                "AI-assisted career documents",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // JOB DESCRIPTION
        // -----------------------------------------------

        if (
          sectionName.includes("job description") ||
          sectionName.includes("job matching") ||
          sectionName.includes("keyword")
        ) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="Job Matching"
              heading={`Job-description matching and keywords`}
              description={`Job-description matching helps identify the skills and keywords that matter for a specific role. This is especially useful when creating multiple versions of a resume for different applications.`}
              bullets={[
                "Job-description analysis",
                "Keyword gap identification",
                "Targeted resume improvements",
                "Relevant skills and phrases",
                "More tailored application content",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // COVER LETTER
        // -----------------------------------------------

        if (sectionName.includes("cover letter")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="Cover Letter"
              heading={`Cover letters with NextCV and ${page.competitor}`}
              description="A resume builder becomes more useful when the same career information can be reused for a targeted cover letter."
              bullets={[
                "AI-assisted cover letter creation",
                "Job-specific content",
                "Resume information reuse",
                "Professional formatting",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // TEMPLATES
        // -----------------------------------------------

        if (sectionName.includes("template")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="Templates"
              heading={`Resume templates`}
              description={`Templates should balance visual quality with readability and ATS compatibility. The best template depends on the type of company and role you are applying to.`}
              bullets={[
                "Professional resume layouts",
                "ATS-friendly structure",
                "Multiple design options",
                "Different career-stage layouts",
                "Readable typography and spacing",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // SHARING
        // -----------------------------------------------

        if (sectionName.includes("sharing") || sectionName.includes("portfolio")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="Online Resume"
              heading="Resume sharing and portfolio"
              description={`A resume does not have to stop at a PDF. Online resume links and portfolios can give recruiters another way to review a candidate's work.`}
              bullets={[
                "Public resume sharing",
                "Online professional profile",
                "Portfolio workflow",
                "Recruiter-friendly access",
                "Resume-to-portfolio journey",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // JOB SEARCH / TRACKER
        // -----------------------------------------------

        if (sectionName.includes("job search") || sectionName.includes("job tracker")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="Career Tools"
              heading={`Career and job-search tools`}
              description={`Some resume platforms are also career platforms. Compare whether the additional job-search and application-management features are actually useful for your workflow.`}
              bullets={[
                "Job-search capabilities",
                "Application tracking",
                "Resume tailoring",
                "Career workflow support",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // FRESHER
        // -----------------------------------------------

        if (sectionName.includes("fresher") || sectionName.includes("indian")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="For Indian Freshers"
              heading={`Which option is better for Indian students and freshers?`}
              description={`For Indian students and freshers, affordability, ATS compatibility, projects, education, skills and easy resume customization are particularly important.`}
              bullets={[
                "Student-friendly resume workflow",
                "Project-focused sections",
                "Education and certification support",
                "ATS-focused applications",
                "Affordable entry pricing",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // MOBILE
        // -----------------------------------------------

        if (sectionName.includes("mobile")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="Accessibility"
              heading="Mobile experience"
              description="Mobile availability can be useful when candidates need to update resumes or apply for jobs away from a desktop."
              bullets={[
                "Responsive resume creation",
                "Accessible editing workflow",
                "Easy access to saved resumes",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // INTERVIEW
        // -----------------------------------------------

        if (sectionName.includes("interview")) {
          return (
            <ContentSection
              key={`${section}-${index}`}
              eyebrow="Interview Preparation"
              heading="Interview preparation"
              description="Resume tools increasingly include interview preparation. This can be useful, but it should be evaluated separately from the quality of the resume itself."
              bullets={[
                "Interview question preparation",
                "Role-specific preparation",
                "Career preparation tools",
              ]}
            />
          );
        }

        // -----------------------------------------------
        // COMPARISON
        // -----------------------------------------------

        if (sectionName.includes("comparison")) {
          return (
            <section
              key={`${section}-${index}`}
              className="border-t border-[#E3E3DD] py-16 sm:py-20"
            >
              <SectionHeading
                eyebrow="Feature Comparison"
                heading={`NextCV vs ${page.competitor}`}
                description={`Compare the major resume and career features available on both platforms.`}
              />

              <ComparisonTable page={page} />
            </section>
          );
        }

        // -----------------------------------------------
        // DEFAULT
        // -----------------------------------------------

        return null;
      })}
    </>
  );
}

// ---------------------------------------------------------
// STRENGTHS
// ---------------------------------------------------------

function StrengthsSection({ page }) {
  return (
    <section className="border-t border-[#E3E3DD] py-16 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        {/* Competitor */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#646A64]">
            {page.competitor}
          </p>

          <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em]">
            Where {page.competitor} is strong
          </h2>

          <div className="mt-7 space-y-0">
            {(page.competitorStrengths || []).map(item => (
              <div key={item} className="flex items-start gap-3 border-b border-[#E3E3DD] py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#646A64]" />

                <span className="text-sm leading-6 text-[#5B625C]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* NextCV */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#465B9E]">NextCV</p>

          <h2 className="mt-3 font-serif text-3xl tracking-[-0.025em]">
            Where NextCV is different
          </h2>

          <div className="mt-7 space-y-0">
            {(page.nextcvAdvantages || []).map(item => (
              <div key={item} className="flex items-start gap-3 border-b border-[#E3E3DD] py-4">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#465B9E]" />

                <span className="text-sm leading-6 text-[#4F5650]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// VERDICT
// ---------------------------------------------------------

function VerdictSection({ page }) {
  return (
    <section className="border-t border-[#E3E3DD] py-16 sm:py-20">
      <SectionHeading
        eyebrow="Our Take"
        heading={`NextCV vs ${page.competitor}: which should you choose?`}
      />

      <div className="border-l-2 border-[#465B9E] pl-6">
        <p className="max-w-3xl text-base leading-8 text-[#5B625C]">{page.verdict}</p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// FAQ
// ---------------------------------------------------------

function FAQSection({ page }) {
  if (!page.faq?.length) {
    return null;
  }

  return (
    <section className="border-t border-[#E3E3DD] py-16 sm:py-20">
      <SectionHeading
        eyebrow="FAQ"
        heading={`Frequently asked questions`}
        description={`Common questions about NextCV and ${page.competitor}.`}
      />

      <div className="divide-y divide-[#E3E3DD] border-y border-[#E3E3DD]">
        {page.faq.map(item => (
          <details key={item.question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-medium">
              <span>{item.question}</span>

              <span className="shrink-0 text-xl font-normal text-[#465B9E] transition group-open:rotate-45">
                +
              </span>
            </summary>

            <p className="max-w-3xl pb-6 text-sm leading-7 text-[#646A64]">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------
// MAIN PAGE
// ---------------------------------------------------------

export default async function ComparisonPage({ params }) {
  const { slug } = await params;

  const page = getComparisonBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      {/* ------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------ */}

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12 sm:px-8 lg:px-12 lg:pb-24 lg:pt-20">
        <Link
          href="/resume-builder-comparison"
          className="inline-flex items-center gap-2 text-sm text-[#646A64] transition hover:text-[#344B93]"
        >
          <ArrowLeft className="h-4 w-4" />
          All comparisons
        </Link>

        <div className="mt-14 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#465B9E]">
            {page.hero.eyebrow}
          </p>

          <h1 className="mt-5 font-serif text-4xl leading-[1.06] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            {page.hero.title}
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#5B625C] sm:text-lg">
            {page.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#17201C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#344B93]"
            >
              Build Your Resume Free
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 border border-[#DCDDD7] px-6 py-3 text-sm font-medium transition hover:border-[#465B9E]"
            >
              View NextCV Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* CONTENT */}
      {/* ------------------------------------------------ */}

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl">
          {/* Always show comparison table first */}
          <section className="border-t border-[#E3E3DD] py-16 sm:py-20">
            <SectionHeading
              eyebrow="At a Glance"
              heading={`NextCV vs ${page.competitor}`}
              description={`A feature-by-feature comparison of NextCV and ${page.competitor}.`}
            />

            <ComparisonTable page={page} />
          </section>

          {/* Dynamic content */}
          <ComparisonContent page={page} />

          {/* Competitor strengths */}
          <StrengthsSection page={page} />

          {/* Verdict */}
          <VerdictSection page={page} />

          {/* FAQ */}
          <FAQSection page={page} />
        </div>
      </section>

      {/* ------------------------------------------------ */}
      {/* CTA */}
      {/* ------------------------------------------------ */}

      <section className="mt-10 border-t border-[#E3E3DD]">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#465B9E]">NextCV</p>

          <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
            Build your resume before you pay.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#646A64]">
            Create, edit and improve your resume with NextCV, then choose the plan that fits your
            application.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#465B9E] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#344B93]"
            >
              Create Your Resume
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <Link
              href="/resume-builder-comparison"
              className="inline-flex items-center gap-2 border border-[#DCDDD7] px-7 py-3.5 text-sm font-medium transition hover:border-[#465B9E]"
            >
              Compare More Builders
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
