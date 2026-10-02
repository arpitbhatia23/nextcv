import Link from "next/link";
import { Mail } from "lucide-react";
import Logo2 from "../Logo2";
import { GetYear } from "./getyear";
import seoPages from "../../../app/(landingPage)/seo-pages.json";
const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Resume builder", href: "/" },
      { label: "Product overview", href: "/product" },
      { label: "ATS checker", href: "/ats-resume-checker" },
      { label: "AI Writer", href: "/ai-writer" },
      { label: "Cover letter", href: "/dashboard/cover-letter" },
      { label: "Templates", href: "/templates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Resume examples", href: "/examples" },
      { label: "Career guides", href: "/career" },
      { label: "Blog", href: "/blogs" },
      { label: "ATS guide", href: "/ats-friendly-resume-format-india" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About NextCV", href: "/about-us" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
];

// Convert SEO slugs into readable labels
const seoLinks = seoPages
  .filter(page => page?.slug)
  .map(page => ({
    label: page.slug
      .replace(/^\/+|\/+$/g, "")
      .split("/")
      .pop()
      ?.split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    href: page.slug.startsWith("/") ? page.slug : `/${page.slug}`,
  }));

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="nc-container py-12 sm:py-14">
        {/* Main footer */}
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="NextCV home"
              className="inline-flex rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Logo2 color="white" ClassName="h-10 w-24" />
            </Link>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Resume, AI writing, ATS review, and career tools for students and job seekers.
            </p>

            <a
              href="mailto:help@nextcv.in"
              className="mt-5 inline-flex items-center gap-2 rounded-lg text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              help@nextcv.in
            </a>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-18 gap-y-10 sm:grid-cols-4"
          >
            {footerGroups.map(group => (
              <div key={group.title}>
                <div className="text-lg font-semibold text-white">{group.title}</div>

                <ul className="mt-4 space-y-3">
                  {group.links.map(link => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-flex rounded-sm text-sm text-slate-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* SEO Pages */}
        {seoLinks.length > 0 && (
          <div className="mt-12 border-t border-white/10 pt-8">
            <div className="mb-5 text-lg font-semibold text-white">Career & Resume Guides</div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {seoLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <GetYear /> NextCV. All rights reserved.
          </p>

          <p>Free to build · One-time payment · No subscription</p>
        </div>
      </div>
    </footer>
  );
};
