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
  ExternalLink,
  Terminal,
  Cpu,
  Layout,
  FileText,
  Lock,
} from "lucide-react";
import ProductScreenshot from "@/shared/components/products/ProductScreenshot";
import ProductBreadcrumbs from "@/shared/components/products/ProductBreadcrumbs";
import RelatedProducts from "@/shared/components/products/RelatedProducts";
import ProductConversionBanner from "@/shared/components/products/ProductConversionBanner";

export const metadata = createSeoMetadata({
  title: "Resume to Portfolio Builder: Turn Resume into Website | NextCV",
  description:
    "Convert your resume into a personal portfolio website in 1 click with NextCV. Showcase projects, skills, & live demos with a custom URL. No coding required.",
  path: "/resume-to-portfolio",
  keywords: [
    "resume to portfolio",
    "resume to portfolio website",
    "convert resume to website",
    "turn resume into website",
    "AI portfolio builder",
    "create portfolio website from resume",
    "developer portfolio generator",
    "portfolio website for freshers",
    "student portfolio website builder",
    "online portfolio maker",
  ],
});

const faqs = [
  {
    question: "How does NextCV turn a resume into a portfolio website?",
    answer:
      "NextCV automatically extracts your resume summary, work experience, education, technical skills, and projects to generate a structured, mobile-responsive portfolio website with dedicated sections, interactive links, and custom hosting.",
  },
  {
    question: "Do I need to know how to code or configure web hosting?",
    answer:
      "No coding knowledge is required. You do not need to write HTML, CSS, or JavaScript, nor configure servers, Vercel, or Netlify. NextCV hosts your portfolio with free SSL on our global CDN.",
  },
  {
    question: "Do I need to pay for monthly web hosting for my portfolio?",
    answer:
      "No. Unlike traditional website builders (e.g. Wix, Squarespace) that charge ₹800–₹1,500 every month, NextCV includes lifetime cloud hosting with the one-time Elite plan payment of ₹399. There are zero recurring subscription fees.",
  },
  {
    question: "Can I add live demo links and GitHub repositories to my portfolio?",
    answer:
      "Yes. You can add external links to your live deployed applications, GitHub repositories, Figma prototypes, research papers, and live demos directly onto each project card.",
  },
  {
    question: "What is the difference between a resume sharing link and a portfolio website?",
    answer:
      "A resume sharing link (nextcv.in/r/slug) displays a digital web view of your 1-page ATS resume. A portfolio website (nextcv.in/p/slug) is an expansive personal website with dedicated sections for project deep-dives, live links, skills matrices, and contact details.",
  },
  {
    question: "Can I edit my portfolio details after publishing?",
    answer:
      "Yes. You can update your skills, projects, and contact info anytime from your NextCV dashboard. Any changes you save sync immediately to your live public portfolio URL.",
  },
  {
    question: "How do I share my portfolio with recruiters?",
    answer:
      "Your published portfolio receives a clean, personalized link (such as nextcv.in/p/your-slug). You can add it to your LinkedIn profile headline, resume contact header, GitHub bio, or email signatures.",
  },
  {
    question: "Is portfolio creation included with a resume download?",
    answer:
      "Yes. The Elite plan (₹399) includes the full personal portfolio website, live resume sharing links, and unlimited high-resolution ATS PDF resume downloads with one single payment.",
  },
];

const portfolioSections = [
  {
    icon: Layout,
    title: "Hero Bio & Social Hub",
    desc: "Display your professional headshot, headline, concise bio, and direct links to your GitHub, LinkedIn, and social profiles.",
  },
  {
    icon: Code2,
    title: "Interactive Project Showcase",
    desc: "Showcase detailed project cards featuring tech stack tags, problem breakdowns, GitHub source code links, and live demo buttons.",
  },
  {
    icon: Cpu,
    title: "Categorized Technical Skills",
    desc: "Organize skills into visual badges across Languages, Frameworks, Cloud, Databases, and Developer Tools.",
  },
  {
    icon: Briefcase,
    title: "Career & Education Timeline",
    desc: "A clean chronological timeline presenting your professional work history, internships, university degrees, and certifications.",
  },
  {
    icon: Globe,
    title: "1-Click Recruiter Contact",
    desc: "Allow hiring managers to contact you immediately via email or phone without filling out long recruiter forms.",
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
        name: "NextCV Resume to Portfolio Website Builder",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript. Requires HTML5.",
        url: "https://www.nextcv.in/resume-to-portfolio",
        description:
          "Convert your resume into a live personal portfolio website without writing code. Includes free SSL hosting, interactive project showcases, and custom portfolio links.",
        offers: {
          "@type": "Offer",
          price: "399",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
          description:
            "One-time Elite plan payment. Includes complete portfolio suite, resume builder, and ATS PDF downloads with zero recurring subscriptions.",
        },
        featureList: [
          "1-Click Resume-to-Website Conversion",
          "Interactive GitHub & Live Project Showcase",
          "Free Cloud Hosting with SSL",
          "Custom Public Portfolio URL",
          "Mobile-Responsive Layout",
          "Zero Coding Required",
        ],
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
      badge: "Step 1",
      title: "Build Your Resume",
      desc: "Input your summary, experience, technical skills, and projects into NextCV's guided builder.",
      icon: Layers,
    },
    {
      step: "02",
      badge: "Step 2",
      title: "Unlock Elite Plan",
      desc: "Select the Elite plan (₹399 one-time payment) to unlock portfolio generation and unlimited resume downloads.",
      icon: Crown,
    },
    {
      step: "03",
      badge: "Step 3",
      title: "1-Click Generation",
      desc: "Click 'Generate Portfolio' to convert your structured resume data into an interactive website instantly.",
      icon: Sparkles,
    },
    {
      step: "04",
      badge: "Step 4",
      title: "Publish & Share",
      desc: "Get your personalized URL (nextcv.in/p/your-name) and share it on LinkedIn, GitHub, and job applications.",
      icon: Globe,
    },
  ];

  const useCases = [
    {
      icon: Code2,
      title: "Software & Web Developers",
      desc: "Highlight GitHub repositories, technical frameworks, live project demos, and system architectures that recruiters can test immediately.",
    },
    {
      icon: Laptop,
      title: "Students & Freshers",
      desc: "Stand out in campus placements by showcasing capstone projects, coding profiles, hackathons, and certifications on your own website.",
    },
    {
      icon: Briefcase,
      title: "Freelancers & Career Switchers",
      desc: "Demonstrate hands-on deliverables, client case studies, and transferable skills to establish immediate trust with hiring managers.",
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
                Turn Your Resume into a Live Portfolio Website (No Coding)
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5B625C]">
                Convert your existing resume into a structured, mobile-ready personal portfolio
                website in one click. Showcase projects, live code demos, GitHub repositories, and
                skills with free SSL hosting.
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
                  View Elite Plan (₹399 One-Time)
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#5B625C]">
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  100% No coding required
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Free SSL cloud hosting
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Personalized public URL
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

      {/* Auto-Generated Portfolio Anatomy */}
      <section className="border-b border-[#E3E2DC] bg-[#FAF9F6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Portfolio Architecture
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              What Gets Auto-Generated on Your Portfolio Website
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Your resume data is automatically structured into 5 beautiful, recruiter-optimized
              web sections without requiring a single line of code.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {portfolioSections.map(section => {
              const Icon = section.icon;

              return (
                <div
                  key={section.title}
                  className="border border-[#E3E2DC] bg-white p-5 shadow-xs transition-colors hover:border-[#465B9E]/50"
                >
                  <div className="flex h-9 w-9 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                    <Icon className="h-4 w-4" />
                  </div>

                  <h3 className="mt-4 font-serif text-base font-medium text-[#17201C]">
                    {section.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#5B625C]">{section.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resume vs Portfolio Comparison */}
      <section className="border-b border-[#E3E2DC] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Understand the Difference
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Resume PDF vs. Portfolio Website: Why Modern Recruiters Want Both
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Your resume passes automated ATS filters; your online portfolio convinces hiring
              managers to schedule the interview.
            </p>
          </div>

          <div className="mt-10 overflow-x-auto border border-[#E3E2DC]">
            <table className="w-full min-w-140 text-left text-xs">
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
                  <td className="p-4 sm:p-5">Downloadable 1-page PDF document</td>
                  <td className="p-4 text-[#17201C] sm:p-5">Interactive, responsive website</td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Project Showcase</td>
                  <td className="p-4 sm:p-5">Concise bullet points (space-limited)</td>
                  <td className="p-4 text-[#17201C] sm:p-5">
                    Live demo links, GitHub source repositories, and screenshots
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Distribution</td>
                  <td className="p-4 sm:p-5">Uploaded to company ATS portals</td>
                  <td className="p-4 text-[#17201C] sm:p-5">
                    Featured on LinkedIn, GitHub, email signatures & WhatsApp
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Hosting & Cost</td>
                  <td className="p-4 sm:p-5">Stored locally on your device</td>
                  <td className="p-4 text-[#17201C] sm:p-5">
                    Free cloud SSL hosting included (No ₹999/mo domain fees)
                  </td>
                </tr>

                <tr>
                  <td className="p-4 font-semibold text-[#17201C] sm:p-5">Best Suited For</td>
                  <td className="p-4 sm:p-5">Initial screening & ATS keyword matching</td>
                  <td className="p-4 text-[#17201C] sm:p-5">
                    Proving technical competence in technical & interview loops
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
              Simple 4-Step Process
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              How to Convert Your Resume to a Portfolio in 4 Simple Steps
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Reuse your resume information without entering data twice. Review your details and
              publish a high-impact website in minutes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Product Screenshots */}
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
              See how your resume content is transformed into an elegant personal website.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <ProductScreenshot
                src="/products/portfolio/creation-flow.png"
                alt="NextCV portfolio creation experience using resume information"
                caption="Generate a personal website using the information already in your resume."
                label="Portfolio Studio"
              />

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Instant Data Synchronization
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Your skills, work milestones, and project descriptions populate automatically with zero
                manual retyping.
              </p>
            </div>

            <div>
              <ProductScreenshot
                src="/products/portfolio/creation-flow.png"
                alt="NextCV portfolio customization experience"
                caption="Review your portfolio content and available links before sharing with recruiters."
                label="Live Customization"
              />

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Tailor Live Links & Repositories
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Add custom GitHub links, live app deployments, and design files to show real evidence
                of your work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="border-b border-[#E3E2DC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Target Audience
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Who Needs an Online Portfolio? (Developers, Freshers & Designers)
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              A personal website helps candidates in competitive fields showcase real, verifiable
              proof of their work.
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

            <h2 className="mt-4 font-serif text-3xl text-[#17201C]">
              Frequently Asked Questions About Resume-to-Portfolio Conversion
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Learn how to create, host, and share your personal portfolio with NextCV.
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
        title="Showcase Your Work with a Live Portfolio Website"
        description="Convert your resume into a personalized portfolio with dedicated project cards, live demos, and free cloud SSL hosting. Included with the NextCV Elite plan for ₹399 as a one-time payment."
        primaryCtaText="Get Elite with Portfolio"
        primaryCtaHref="/templates?plan=elite"
        secondaryCtaText="Compare All Plans"
        secondaryCtaHref="/pricing"
      />
    </div>
  );
}
