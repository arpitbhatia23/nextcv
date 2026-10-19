import Link from "next/link";
import { createSeoMetadata } from "@/shared/utils/seo";
import {
  Share2,
  Globe,
  Check,
  ArrowRight,
  ShieldCheck,
  Pause,
  Trash2,
  ExternalLink,
  HelpCircle,
  Lock,
  Smartphone,
  Eye,
  FileCheck,
} from "lucide-react";
import BuildButton from "@/shared/components/landing/BuildButton";
import ProductScreenshot from "@/shared/components/products/ProductScreenshot";
import ProductBreadcrumbs from "@/shared/components/products/ProductBreadcrumbs";
import RelatedProducts from "@/shared/components/products/RelatedProducts";
import ProductConversionBanner from "@/shared/components/products/ProductConversionBanner";

export const metadata = createSeoMetadata({
  title: "Create a Shareable Resume Link Online | NextCV",
  description:
    "Create a shareable resume link with NextCV. Let recruiters view your professional profile online and share it through LinkedIn, email, WhatsApp, or job applications.",
  path: "/shareable-resume",
  keywords: [
    "shareable resume link",
    "online resume link",
    "share resume online",
    "public resume link",
    "create online resume",
    "digital resume online",
    "resume website builder",
  ],
});

const faqs = [
  {
    question: "What is a shareable resume link?",
    answer:
      "A shareable resume link is a URL that lets people view your resume online. Instead of relying only on a PDF attachment, you can send a link that recruiters and hiring managers can open in their web browser.",
  },
  {
    question: "How can I create a resume link?",
    answer:
      "Create your resume with NextCV, open the sharing option for an eligible resume, and follow the available steps to generate your public link. Once it is ready, copy the link and share it with recruiters.",
  },
  {
    question: "How do I share my resume with recruiters?",
    answer:
      "You can include your resume link in job applications, email introductions, WhatsApp messages, your LinkedIn profile, or your GitHub profile. Keep a PDF version available when an employer specifically requests an attachment.",
  },
  {
    question: "Can I share my resume on LinkedIn?",
    answer:
      "Yes. You can add your resume link to your LinkedIn profile or share it in a message. A public resume page gives people a convenient way to access your professional information from a supported mobile or desktop browser.",
  },
  {
    question: "Can recruiters view my public resume without an account?",
    answer:
      "A public resume link is intended to make your profile accessible to visitors without requiring them to create a NextCV account. Access depends on the resume's current sharing status and the availability of the page.",
  },
  {
    question: "Is a public resume link private?",
    answer:
      "A public resume link is not private. Anyone who can access the active link may be able to view the information displayed on it. Only include information you are comfortable sharing publicly. Use the available sharing controls to pause access or delete your link.",
  },
  {
    question: "Can I pause or delete my resume link?",
    answer:
      "NextCV provides sharing controls for eligible public resumes. Where available, you can pause sharing to restrict public access or delete the link. Review the status displayed in your dashboard to confirm the current state of your resume.",
  },
  {
    question: "Does NextCV charge for resume sharing?",
    answer:
      "Resume sharing is included with eligible Premium and Elite plans, priced at ₹199 and ₹399 respectively as one-time payments. It is not included in the Basic plan priced at ₹49. Check the pricing page for current plan details.",
  },
  {
    question: "Can my shared resume appear in Google Search?",
    answer:
      "A public URL does not guarantee that Google will index your resume. Search visibility depends on factors such as crawlability, indexing directives, content quality, and Google's indexing decisions. A shareable link can still be useful even if it does not appear in search results.",
  },
  {
    question: "Should I share a resume link or a PDF?",
    answer:
      "Both formats are useful. A resume link is convenient for networking and sharing online, while a PDF is often required for formal job applications and applicant tracking systems. Keep your PDF ready whenever an employer requests one.",
  },
];

export default function ShareableResumePage() {
  const breadcrumbItems = [{ label: "Products", href: "/product" }, { label: "Shareable Resume" }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "NextCV Shareable Resume",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://www.nextcv.in/shareable-resume",
        description:
          "Create and share a professional online resume link with NextCV. Make your professional profile accessible online and manage sharing through the available controls.",
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
            name: "Shareable Resume",
            item: "https://www.nextcv.in/shareable-resume",
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
      desc: "Add your contact information, professional summary, education, skills, experience, and projects to your NextCV resume.",
      icon: FileCheck,
    },
    {
      step: "02",
      badge: "Sharing Access",
      title: "Choose an Eligible Plan",
      desc: "Select a plan that includes resume sharing. Premium and Elite offer sharing features with a one-time payment.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      badge: "Create Your Link",
      title: "Generate a Shareable URL",
      desc: "Open the sharing option for your eligible resume and follow the instructions to create your public resume link.",
      icon: Globe,
    },
    {
      step: "04",
      badge: "Share Anywhere",
      title: "Send It to Recruiters",
      desc: "Copy your resume link and include it in LinkedIn messages, WhatsApp conversations, email introductions, and job applications.",
      icon: ExternalLink,
    },
    {
      step: "05",
      badge: "Manage Access",
      title: "Control Your Sharing",
      desc: "Use the available sharing controls to pause public access or delete your resume link when you no longer want to share it.",
      icon: Lock,
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
                <Globe className="h-3.5 w-3.5" />
                Share Your Resume Online
              </div>

              <h1 className="mt-4 font-serif text-3xl font-medium leading-[1.1] text-[#17201C] sm:text-4xl lg:text-5xl">
                Create a Resume Link You Can Share Anywhere
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5B625C]">
                Make your resume easier to access with a shareable online link. Give recruiters a
                convenient way to view your professional profile without relying only on PDF
                attachments.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <BuildButton className="h-12 bg-[#465B9E] px-6 text-sm font-semibold text-white hover:bg-[#344B93]">
                  Create Your Resume
                </BuildButton>

                <Link
                  href="/pricing"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#E3E2DC] bg-white px-5 text-sm font-semibold text-[#17201C] transition-colors hover:bg-[#F1F0EB]"
                >
                  View Plans with Sharing
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#5B625C]">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Easy-to-share resume URL
                </span>

                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Available sharing controls
                </span>

                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Mobile-friendly access
                </span>
              </div>
            </div>

            <div>
              <ProductScreenshot
                src="/products/shareable-resume/public-profile.png"
                alt="Preview of a NextCV public online resume"
                caption="A professional resume page that can be shared with recruiters through a public link."
                label="Public Resume"
                priority={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resume Link vs PDF */}
      <section className="border-b border-[#E3E2DC] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Why Use a Resume Link?
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Resume Link vs. PDF Attachment
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              A shareable resume link complements your downloadable PDF. Each format is useful in
              different situations.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="border border-[#E3E2DC] bg-[#FAF9F6] p-6 sm:p-8">
              <h3 className="font-serif text-xl font-medium text-[#17201C]">
                Traditional PDF Resume
              </h3>

              <ul className="mt-4 space-y-3 text-xs leading-5 text-[#5B625C]">
                <li className="flex items-start gap-2">
                  <span className="text-[#8A908B]">•</span>
                  Useful for formal applications and employers that require a PDF.
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-[#8A908B]">•</span>
                  Can be downloaded, stored, and attached to job applications.
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-[#8A908B]">•</span>
                  Previously sent copies do not automatically reflect later changes to your resume.
                </li>
              </ul>
            </div>

            <div className="border border-[#465B9E]/30 bg-[#EEF0F7]/40 p-6 sm:p-8">
              <h3 className="font-serif text-xl font-medium text-[#17201C]">
                NextCV Shareable Resume Link
              </h3>

              <ul className="mt-4 space-y-3 text-xs leading-5 text-[#17201C]">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Convenient to open from a supported mobile or desktop browser.
                </li>

                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Easy to include in LinkedIn profiles, WhatsApp messages, and email introductions.
                </li>

                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Sharing controls help you manage access to your public resume.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-[#E3E2DC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Simple Sharing Process
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              How to Create and Share Your Resume Link
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Create your resume, generate a shareable link, and send it to recruiters. Manage your
              sharing preferences through the available controls in your dashboard.
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

      {/* Product Screenshots */}
      <section className="border-b border-[#E3E2DC] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Sharing & Accessibility
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Explore the Online Resume Experience
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              See how your resume can be shared online and viewed across different devices.
            </p>
          </div>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <ProductScreenshot
                src="/products/shareable-resume/share-link.png"
                alt="NextCV resume sharing controls"
                caption="Manage your resume link and available sharing options from your dashboard."
                label="Resume Sharing Controls"
              />

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Manage Your Resume Link
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Find your shareable URL and use the available controls to manage public access.
              </p>
            </div>

            <div>
              <ProductScreenshot
                src="/products/shareable-resume/mobile-profile.png"
                alt="Mobile preview of a NextCV online resume"
                caption="A resume presented in a format designed for mobile and desktop browsers."
                label="Mobile Resume View"
              />

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                A Convenient Mobile Experience
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#5B625C]">
                Help recruiters review your professional information from their phones, tablets, or
                desktop computers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Access */}
      <section className="border-b border-[#E3E2DC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Privacy & Access
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Understand Your Resume Sharing Settings
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Know who can access your public resume and how to manage the information you choose to
              share.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Eye className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Public Visibility
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Anyone who can access an active public resume link may be able to view the
                information displayed on the page. Avoid including sensitive personal information
                that recruiters do not need.
              </p>
            </div>

            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Pause className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">Manage Sharing</h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Use the available pause or deletion controls to manage your resume link. Check your
                dashboard to confirm whether sharing is currently active.
              </p>
            </div>

            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Lock className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Search Engine Visibility
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Sharing a public URL does not guarantee Google indexing. Search visibility depends
                on crawlability, indexing directives, content, and search engine decisions. A public
                link should not be treated as a private document.
              </p>
            </div>
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
              Find answers about creating, sharing, and managing your online resume link.
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
      <RelatedProducts currentPath="/shareable-resume" />

      {/* Final CTA */}
      <ProductConversionBanner
        badge="Online Resume Link"
        title="Make Your Resume Easier to Share"
        description="Create a professional resume, generate a shareable online link, and manage public access through the available sharing controls."
        primaryCtaText="Build Your Resume"
        primaryCtaHref="/dashboard/builder"
        secondaryCtaText="Explore Plans"
        secondaryCtaHref="/pricing"
      />
    </div>
  );
}
