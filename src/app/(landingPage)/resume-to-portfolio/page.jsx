import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  Globe,
  Layers,
  Check,
  ArrowRight,
  ShieldCheck,
  Crown,
  Sparkles,
  HelpCircle,
  Code2,
  Laptop,
  Briefcase,
} from "lucide-react";
import ProductScreenshot from "@/shared/components/products/ProductScreenshot";
import ProductBreadcrumbs from "@/shared/components/products/ProductBreadcrumbs";
import RelatedProducts from "@/shared/components/products/RelatedProducts";
import ProductConversionBanner from "@/shared/components/products/ProductConversionBanner";

export const metadata = createSeoMetadata({
  title: "Resume to Portfolio Website Builder | NextCV",
  description:
    "Turn your resume into a professional portfolio website with NextCV. Showcase your skills, experience, education, and projects with a shareable online portfolio. No coding required.",
  path: "/resume-to-portfolio",
  keywords: [
    "resume to portfolio",
    "resume to portfolio website",
    "AI portfolio builder",
    "create portfolio website from resume",
    "resume to website converter",
    "online portfolio maker",
    "portfolio website builder for students",
    "portfolio website for freshers",
    "AI portfolio generator from resume",
    "developer portfolio generator",
  ],
});

const faqs = [
  {
    question: "What is a resume-to-portfolio builder?",
    answer:
      "A resume-to-portfolio builder turns the information in your resume, including your professional summary, skills, education, work experience, and projects, into a personal portfolio website that you can share online.",
  },
  {
    question: "How do I turn my resume into a portfolio website?",
    answer:
      "Create your resume with NextCV, choose the Elite plan to unlock portfolio creation, and generate your portfolio using your existing resume information. Review your details before publishing your portfolio and sharing its link.",
  },
  {
    question: "Can I build a portfolio without coding?",
    answer:
      "Yes. You do not need to write HTML, CSS, or JavaScript or configure hosting. NextCV helps you create a responsive portfolio website without requiring coding knowledge.",
  },
  {
    question: "What information appears in my portfolio?",
    answer:
      "Your portfolio can showcase your profile, professional summary, skills, education, work experience, and projects. Review your published portfolio to ensure the information displayed is accurate and appropriate to share.",
  },
  {
    question: "Can I edit my portfolio after creating it?",
    answer:
      "You can manage your portfolio using the available portfolio controls. Review the available editing options in your dashboard before making changes, and keep your portfolio information up to date.",
  },
  {
    question: "Can I share my portfolio with recruiters?",
    answer:
      "Yes. Your published portfolio has a shareable public link, such as nextcv.in/p/your-slug. Include it in job applications, email introductions, your LinkedIn profile, or your GitHub bio.",
  },
  {
    question: "Is portfolio creation free?",
    answer:
      "Portfolio creation is included with the NextCV Elite plan, priced at ₹399 as a one-time payment. It is not included in the Basic plan at ₹49 or the Standard plan at ₹99. Check the pricing page for the latest plan details.",
  },
  {
    question: "Can my portfolio appear in Google Search?",
    answer:
      "A published portfolio has a public URL, but that does not guarantee that Google will index or rank it. Search visibility depends on factors such as crawlability, indexing eligibility, content quality, and competition.",
  },
  {
    question: "Is an online portfolio better than a PDF resume?",
    answer:
      "They serve different purposes. A PDF resume is useful for formal job applications and applicant tracking systems, while an online portfolio provides more room to showcase projects, skills, and supporting links. Using both can help you present your qualifications more effectively.",
  },
  {
    question: "Who should create an online portfolio?",
    answer:
      "Students, freshers, software developers, designers, and professionals changing careers can use an online portfolio to showcase projects, practical skills, and relevant experience to potential employers.",
  },
];

export default function ResumeToPortfolioPage() {
  const breadcrumbItems = [
    { label: "Products", href: "/product" },
    { label: "Resume to Portfolio" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "NextCV Resume to Portfolio Builder",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://www.nextcv.in/resume-to-portfolio",
        description:
          "Create a professional online portfolio from your resume with NextCV. Showcase your projects, skills, education, and experience without coding.",
        offers: {
          "@type": "Offer",
          price: "399",
          priceCurrency: "INR",
          description:
            "One-time Elite plan payment. Portfolio creation is included with the Elite plan.",
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
            name: "Resume to Portfolio",
            item: "https://www.nextcv.in/resume-to-portfolio",
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

  const workflowSteps = [
    {
      step: "01",
      badge: "Get Started",
      title: "Create Your Resume",
      desc: "Add your professional summary, education, skills, work experience, and projects to your NextCV resume.",
      icon: Layers,
    },
    {
      step: "02",
      badge: "Choose Your Plan",
      title: "Unlock Portfolio Access",
      desc: "Choose the Elite plan for ₹399 as a one-time payment to access portfolio creation.",
      icon: Crown,
    },
    {
      step: "03",
      badge: "Generate",
      title: "Build Your Portfolio",
      desc: "Create your portfolio using your existing resume information without entering the same details again.",
      icon: Sparkles,
    },
    {
      step: "04",
      badge: "Personalize",
      title: "Review Your Details",
      desc: "Review your profile, skills, experience, and projects. Check your information and contact details before publishing.",
      icon: Laptop,
    },
    {
      step: "05",
      badge: "Publish & Share",
      title: "Share Your Website",
      desc: "Publish your portfolio and share its public link with recruiters or add it to your LinkedIn profile, GitHub bio, and job applications.",
      icon: Globe,
    },
  ];

  const useCases = [
    {
      icon: Code2,
      title: "Software & Web Developers",
      desc: "Showcase your GitHub repositories, technical skills, frameworks, and software projects in one professional online portfolio.",
    },
    {
      icon: Laptop,
      title: "Students & Freshers",
      desc: "Present academic projects, internships, certifications, and technical skills when applying for internships and entry-level jobs.",
    },
    {
      icon: Briefcase,
      title: "Career Switchers",
      desc: "Demonstrate your transferable skills and newly acquired expertise through relevant projects and professional experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#17201C]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Hero */}
      <section className="border-b border-[#E3E2DC] pb-16 pt-28 sm:pb-20 sm:pt-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <ProductBreadcrumbs items={breadcrumbItems} />

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#465B9E]/20 bg-[#EEF0F7] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#465B9E]">
                <Crown className="h-3.5 w-3.5" />
                Elite Portfolio Suite
              </div>

              <h1 className="mt-4 font-serif text-3xl font-medium leading-[1.1] text-[#17201C] sm:text-4xl lg:text-5xl">
                Turn Your Resume into a Professional Portfolio Website
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5B625C]">
                Transform your resume into a professional online portfolio. Showcase your skills,
                projects, education, and experience with a website you can share with recruiters. No
                coding required.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/templates?plan=elite"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-transparent bg-[#465B9E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#344B93]"
                >
                  Create Your Portfolio
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-sm font-semibold text-[#17201C] transition-colors hover:bg-[#F1F0EB]"
                >
                  View Elite Plan (₹399)
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#5B625C]">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  No coding required
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Built from your resume
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Shareable public portfolio link
                </span>
              </div>
            </div>

            <div>
              <ProductScreenshot
                src="/products/portfolio/published-portfolio.png"
                alt="Preview of a published NextCV personal portfolio website"
                caption="A professional online portfolio showcasing projects, experience, and skills."
                label="Published Portfolio Website"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resume vs Portfolio */}
      <section className="border-b border-[#E3E2DC] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Understand the Difference
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Why Pair a Resume with an Online Portfolio?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Your resume summarizes your qualifications. An online portfolio gives recruiters more
              ways to explore your projects and practical skills.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto border border-[#E3E2DC]">
            <table className="w-full min-w-140text-left text-xs">
              <thead>
                <tr className="border-b border-[#E3E2DC] bg-[#FAF9F6] font-mono uppercase tracking-wider text-[#8A908B]">
                  <th className="p-4 sm:p-5">Feature</th>
                  <th className="p-4 sm:p-5">Resume PDF</th>
                  <th className="p-4 text-[#465B9E] sm:p-5">NextCV Portfolio</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E3E2DC] text-[#5B625C]">
                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Format</td>
                  <td className="p-4 sm:p-5">Downloadable PDF document</td>
                  <td className="p-4 text-[#17201C] sm:p-5">Responsive online website</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Project Showcase</td>
                  <td className="p-4 sm:p-5">Concise descriptions and bullet points</td>
                  <td className="p-4 text-[#17201C] sm:p-5">
                    Dedicated project sections and supporting links
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Sharing</td>
                  <td className="p-4 sm:p-5">Attach to job applications</td>
                  <td className="p-4 text-[#17201C] sm:p-5">
                    Share through LinkedIn, GitHub, and email
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Hosting</td>
                  <td className="p-4 sm:p-5">Stored as a document</td>
                  <td className="p-4 text-[#17201C] sm:p-5">Published online through NextCV</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Best Use</td>
                  <td className="p-4 sm:p-5">Formal job applications and ATS submissions</td>
                  <td className="p-4 text-[#17201C] sm:p-5">
                    Demonstrating projects and professional capabilities
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-[#E3E2DC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Simple Portfolio Creation
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              How to Turn Your Resume into a Portfolio Website
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Create a professional portfolio in a few simple steps. Reuse your resume information,
              review your details, and publish a website you can share with recruiters.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {workflowSteps.map(item => {
              const Icon = item.icon;

              return (
                <div
                  key={item.step}
                  className="flex flex-col justify-between border border-[#E3E2DC] bg-white p-5 shadow-xs transition-colors duration-200 hover:border-[#465B9E]/50"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#E3E2DC] pb-3">
                      <span className="font-mono text-base font-bold text-[#465B9E]">
                        {item.step}
                      </span>

                      <div className="flex h-7 w-7 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    <span className="mt-3 inline-block font-mono text-[9px] font-semibold uppercase text-[#5B625C]">
                      {item.badge}
                    </span>

                    <h3 className="mt-1 font-serif text-base font-medium text-[#17201C]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-[#5B625C]">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Screenshots */}
      <section className="border-b border-[#E3E2DC] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Portfolio Studio
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Explore the Portfolio Creation Experience
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              See how your resume information can become a professional portfolio that presents your
              work clearly.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <ProductScreenshot
                src="/products/portfolio/creation-flow.png"
                alt="NextCV portfolio creation experience using resume information"
                caption="Start creating a portfolio using the information already available in your resume."
                label="Portfolio Creation"
              />

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Reuse Your Resume Information
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Present your project titles, skills, and descriptions without having to enter the
                same information again.
              </p>
            </div>

            <div>
              <ProductScreenshot
                src="/products/portfolio/creation-flow.png"
                alt="NextCV portfolio customization experience"
                caption="Review your portfolio content and available customization options before sharing."
                label="Portfolio Customization"
              />

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Review Your Portfolio
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Check your profile, experience, projects, and contact details so your published
                portfolio presents accurate information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="border-b border-[#E3E2DC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Who It's For
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Who Benefits Most from an Online Portfolio?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              A portfolio can help you demonstrate practical skills and showcase work that may not
              fit into a traditional resume.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map(item => {
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

      {/* FAQs */}
      <section className="border-b border-[#E3E2DC] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
              <HelpCircle className="h-5 w-5" />
            </div>

            <h2 className="mt-4 font-serif text-3xl text-[#17201C]">Frequently Asked Questions</h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Learn how to create, publish, and share your portfolio with NextCV.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map(faq => (
              <details
                key={faq.question}
                className="group border border-[#E3E2DC] bg-white p-5 shadow-xs transition-colors hover:border-[#465B9E]/40"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-[#17201C]">
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
      <RelatedProducts currentPath="/resume-to-portfolio" />

      {/* Final CTA */}
      <ProductConversionBanner
        badge="Elite Portfolio"
        title="Showcase Your Work to Recruiters"
        description="Turn your resume into a professional online portfolio. Showcase your skills, projects, and experience with a shareable website. Included with the NextCV Elite plan for ₹399 as a one-time payment."
        primaryCtaText="Get Elite with Portfolio"
        primaryCtaHref="/templates?plan=elite"
        secondaryCtaText="Compare All Plans"
        secondaryCtaHref="/pricing"
      />
    </div>
  );
}
