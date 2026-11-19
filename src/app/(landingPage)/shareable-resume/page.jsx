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
  Linkedin,
  MessageSquare,
  Mail,
  RefreshCw,
} from "lucide-react";
import BuildButton from "@/shared/components/landing/BuildButton";
import ProductScreenshot from "@/shared/components/products/ProductScreenshot";
import ProductBreadcrumbs from "@/shared/components/products/ProductBreadcrumbs";
import RelatedProducts from "@/shared/components/products/RelatedProducts";
import ProductConversionBanner from "@/shared/components/products/ProductConversionBanner";

export const metadata = createSeoMetadata({
  title: "Create a Shareable Resume Link for LinkedIn & Web | NextCV",
  description:
    "Create an interactive shareable resume link with NextCV. Share a mobile-friendly profile via LinkedIn, WhatsApp, & email with instant updates & privacy controls.",
  path: "/shareable-resume",
  keywords: [
    "shareable resume link",
    "online resume link",
    "share resume online",
    "public resume link",
    "resume link for linkedin",
    "digital resume link",
    "live resume link",
    "web resume link generator",
    "resume website builder",
  ],
});

const faqs = [
  {
    question: "What is a shareable resume link?",
    answer:
      "A shareable resume link is a clean web URL (such as nextcv.in/r/your-name) that lets recruiters view your professional resume online as a responsive web page, without requiring PDF downloads.",
  },
  {
    question: "How can I create a resume link?",
    answer:
      "Create your resume with NextCV, select the Premium or Elite plan, and generate your live public link from your dashboard. Once created, copy the URL and share it on LinkedIn, WhatsApp, email, or job applications.",
  },
  {
    question: "What happens if I update my resume after sharing the link?",
    answer:
      "Your shareable resume link updates automatically in real time whenever you edit your resume in your NextCV dashboard. Anyone who opens your link will always see your most recent experience, skills, and projects without you having to re-send files.",
  },
  {
    question: "How do I add my resume link to my LinkedIn profile?",
    answer:
      "Copy your live NextCV link and paste it into your LinkedIn profile's Featured section as a link, add it to your Contact Info website field, or include it in your About summary so recruiters browsing your profile can open it immediately.",
  },
  {
    question: "How do I share my resume with recruiters?",
    answer:
      "You can include your resume link in job applications, email introductions, WhatsApp messages, your LinkedIn profile, or your GitHub profile. Keep a PDF version available when an employer specifically requests an attachment.",
  },
  {
    question: "Can recruiters view my public resume without an account?",
    answer:
      "Yes. A public resume link allows recruiters, hiring managers, and clients to view your resume in any web browser without needing to create an account or sign in.",
  },
  {
    question: "Is a public resume link private?",
    answer:
      "A public resume link is accessible to anyone who has the active URL. Only include professional contact details you are comfortable sharing publicly. You can pause or delete access at any time from your dashboard.",
  },
  {
    question: "Can I pause or delete my resume link?",
    answer:
      "Yes. NextCV gives you full privacy controls in your dashboard. You can temporarily pause sharing to make your resume link inactive, or permanently delete the link whenever you wish.",
  },
  {
    question: "Does NextCV charge for resume sharing?",
    answer:
      "Resume sharing is included with the Premium (₹199) and Elite (₹399) plans as a one-time payment with zero monthly subscriptions. Both plans include full PDF downloads as well.",
  },
  {
    question: "Should I share a resume link or a PDF?",
    answer:
      "Both formats serve distinct purposes. A shareable resume link is ideal for networking, LinkedIn bios, and fast mobile viewing, while a PDF is recommended for formal application tracking system (ATS) portals.",
  },
];

export default function ShareableResumePage() {
  const breadcrumbItems = [{ label: "Products", href: "/product" }, { label: "Shareable Resume" }];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "NextCV Shareable Resume Link Generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        url: "https://www.nextcv.in/shareable-resume",
        description:
          "Create and share an interactive online resume link with NextCV. Make your professional profile instantly accessible across LinkedIn, WhatsApp, and email with 1-click privacy controls.",
        offers: {
          "@type": "Offer",
          price: "199",
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Live Public Resume URL",
          "1-Click LinkedIn & WhatsApp Sharing",
          "Automatic Real-Time Content Sync",
          "Pause and Revoke Sharing Controls",
          "Mobile-Responsive Layout",
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
      desc: "Select Premium (₹199) or Elite (₹399), which include live resume sharing links via a transparent one-time payment.",
      icon: ShieldCheck,
    },
    {
      step: "03",
      badge: "Create Your Link",
      title: "Generate a Shareable URL",
      desc: "Generate your unique web link (e.g. nextcv.in/r/your-name) with a single click right from your dashboard.",
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
                Create a Shareable Resume Link for LinkedIn, WhatsApp & Email
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5B625C]">
                Make your resume instantly accessible with a live online link. Give recruiters a
                mobile-friendly way to view your verified career profile with automatic real-time
                updates.
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
                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Personalized resume URL
                </span>

                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  Auto-updates when you edit
                </span>

                <span className="flex items-center gap-1.5 font-medium">
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  1-click pause & privacy controls
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

      {/* Where to Share Your Resume Link */}
      <section className="border-b border-[#E3E2DC] bg-[#FAF9F6] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#465B9E]">
              Channels & Platforms
            </p>

            <h2 className="mt-3 font-serif text-3xl text-[#17201C] sm:text-4xl">
              Where to Use Your Online Resume Link
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              Share your live CV anywhere a web link is supported. Make an immediate impression on
              recruiters across all top channels.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Linkedin className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                LinkedIn Profile & Bio
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Feature your live resume in your LinkedIn Featured section, Contact Info, or About
                summary to catch recruiters browsing your profile.
              </p>
            </div>

            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <MessageSquare className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                WhatsApp & Direct Chats
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Send a fast tap-to-view link in direct recruiter conversations without forcing hiring
                managers to download files on mobile data.
              </p>
            </div>

            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Mail className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Email Signatures & Outreach
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Embed your link in cold emails and professional signatures for instant credibility
                with prospective employers and clients.
              </p>
            </div>

            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Globe className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">
                Portals & Freelance Pitches
              </h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Paste into the Portfolio URL or Website field in online job applications, gig
                platforms, and freelance proposals.
              </p>
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
              Resume Link vs. Traditional PDF: Why You Need Both
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              A shareable resume link complements your downloadable PDF. Each format delivers
              distinct advantages across your job search.
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
                  Essential for formal corporate applications and company ATS upload fields.
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-[#8A908B]">•</span>
                  Preserves static vector formatting for offline storage and printing.
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-[#8A908B]">•</span>
                  Cannot be updated once sent—requires sending revised versions for any edits.
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
                  <strong>Always up to date:</strong> Any edits in your dashboard sync instantly to
                  your live link.
                </li>

                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Fast 1-tap mobile experience on smartphones, tablets, and laptops.
                </li>

                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  Ideal for LinkedIn DMs, WhatsApp chats, and email signatures.
                </li>

                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  1-click privacy controls: pause or delete access anytime.
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
              How to Create and Share Your Resume Link in 5 Steps
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
              Interactive, Mobile-First Online Resume Experience
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              See how your resume is presented online and optimized across every screen size.
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
              Full Privacy Control: Pause, Revoke, or Delete Your Link Anytime
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#5B625C]">
              You stay in complete control over who can view your public resume and when.
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
                Anyone who has the active URL can view the page. You control exactly what
                information to include before publishing.
              </p>
            </div>

            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Pause className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">1-Click Pause</h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Paused sharing temporarily deactivates public viewing when you are not actively
                interviewing, with zero data loss.
              </p>
            </div>

            <div className="border border-[#E3E2DC] bg-white p-6 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center bg-[#EEF0F7] text-[#465B9E]">
                <Trash2 className="h-5 w-5" />
              </div>

              <h3 className="mt-4 font-serif text-lg font-medium text-[#17201C]">Permanent Deletion</h3>

              <p className="mt-2 text-xs leading-5 text-[#5B625C]">
                Delete your shareable link completely at any time. The public URL will immediately
                stop resolving.
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

            <h2 className="mt-4 font-serif text-3xl text-[#17201C]">
              Frequently Asked Questions About Shareable Resume Links
            </h2>

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
        title="Make Your Resume Easier to Share Online"
        description="Create your professional resume, generate a live shareable link for LinkedIn and WhatsApp, and manage access with built-in privacy controls."
        primaryCtaText="Build Your Resume"
        primaryCtaHref="/dashboard/builder"
        secondaryCtaText="Explore Plans"
        secondaryCtaHref="/pricing"
      />
    </div>
  );
}
