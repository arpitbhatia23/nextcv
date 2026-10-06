import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import Logo2 from "../Logo2";
import { GetYear } from "./getyear";
import seoPages from "../../../app/(landingPage)/seo-pages.json";

/* =========================================================
   SEO CATEGORY DETECTION
========================================================= */

const getSeoCategory = (slug = "") => {
  const value = slug.toLowerCase();

  // Company / MNC resume guides
  if (
    value.includes("tcs") ||
    value.includes("infosys") ||
    value.includes("wipro") ||
    value.includes("accenture") ||
    value.includes("cognizant") ||
    value.includes("hcl") ||
    value.includes("ltimindtree") ||
    value.includes("tech-mahindra")
  ) {
    return "Company Resume Guides";
  }

  // ATS resume guides
  if (value.includes("ats") || value.includes("ai-screening") || value.includes("screening")) {
    return "ATS Resume Guides";
  }

  // Resume builder / pricing / AI tools
  if (
    value.includes("resume-builder") ||
    value.includes("resume-maker") ||
    value.includes("ai-resume-builder")
  ) {
    return "Resume Builder & Tools";
  }

  // Career / general resume topics
  if (
    value.includes("resume-vs-cv") ||
    value.includes("career-objective") ||
    value.includes("mnc-resume") ||
    value.includes("resume-for-mnc") ||
    value.includes("non-it-resume") ||
    value.includes("indian-resume")
  ) {
    return "Career & Resume Basics";
  }

  // Everything else
  return "Resume Formats";
};

/* =========================================================
   SEO LABEL
========================================================= */

const getSeoLabel = (slug = "") => {
  const cleanSlug = slug
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .pop();

  if (!cleanSlug) {
    return "";
  }

  return cleanSlug
    .split("-")
    .map(word => {
      const lower = word.toLowerCase();

      if (lower === "ats") return "ATS";
      if (lower === "ai") return "AI";
      if (lower === "cv") return "CV";
      if (lower === "mnc") return "MNC";
      if (lower === "bca") return "BCA";
      if (lower === "mca") return "MCA";
      if (lower === "it") return "IT";

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
};

/* =========================================================
   CREATE SEO LINKS
   IMPORTANT: JSON USES "slug", NOT "_slug_"
========================================================= */

const seoLinks = seoPages
  .filter(page => page?.slug)
  .map(page => {
    const href = page.slug.startsWith("/") ? page.slug : `/${page.slug}`;

    return {
      label: getSeoLabel(page.slug),
      href,
      category: getSeoCategory(page.slug),
    };
  });

/* =========================================================
   GROUP SEO LINKS
========================================================= */

const seoCategories = seoLinks.reduce((groups, page) => {
  if (!groups[page.category]) {
    groups[page.category] = [];
  }

  groups[page.category].push(page);

  return groups;
}, {});

/* =========================================================
   CATEGORY ORDER
========================================================= */

const categoryOrder = [
  "Company Resume Guides",
  "ATS Resume Guides",
  "Resume Builder & Tools",
  "Career & Resume Basics",
  "Resume Formats",
];

/* =========================================================
   FOOTER SEO GROUPS
========================================================= */

const seoFooterGroups = categoryOrder
  .map(category => ({
    category,
    links: seoCategories[category] || [],
  }))
  .filter(group => group.links.length > 0);

/* =========================================================
   MAIN FOOTER LINKS
========================================================= */

const footerGroups = [
  {
    title: "Product",
    links: [
      {
        label: "Resume Builder",
        href: "/",
      },
      {
        label: "Product Overview",
        href: "/product",
      },
      {
        label: "ATS Resume Checker",
        href: "/ats-resume-checker",
      },
      {
        label: "AI Writer",
        href: "/ai-writer",
      },
      {
        label: "Cover Letter",
        href: "/dashboard/cover-letter",
      },
      {
        label: "Templates",
        href: "/templates",
      },
    ],
  },

  {
    title: "Resources",
    links: [
      {
        label: "Resume Examples",
        href: "/examples",
      },
      {
        label: "Career Guides",
        href: "/career",
      },
      {
        label: "Blog",
        href: "/blogs",
      },
      {
        label: "ATS Guide",
        href: "/ats-friendly-resume-format-india",
      },
    ],
  },

  {
    title: "Company",
    links: [
      {
        label: "About NextCV",
        href: "/about-us",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],
  },

  {
    title: "Legal",
    links: [
      {
        label: "Privacy Policy",
        href: "/privacy-policy",
      },
      {
        label: "Terms of Service",
        href: "/terms",
      },
    ],
  },
];

/* =========================================================
   FOOTER COMPONENT
========================================================= */

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="nc-container py-12 sm:py-14">
        {/* ===============================================
            TOP FOOTER
        =============================================== */}

        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          {/* BRAND */}
          <div className="max-w-sm">
            <Link href="/" aria-label="NextCV home" className="inline-flex rounded-lg">
              <Logo2 color="white" ClassName="h-10 w-24" />
            </Link>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              Resume builder, AI writing, ATS review, and career tools for students and job seekers.
            </p>

            <a
              href="mailto:help@nextcv.in"
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
            >
              <Mail className="h-4 w-4" />
              help@nextcv.in
            </a>
          </div>

          {/* MAIN FOOTER NAV */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-4"
          >
            {footerGroups.map(group => (
              <div key={group.title}>
                <div className="text-lg font-semibold text-white">{group.title}</div>

                <ul className="mt-4 space-y-3">
                  {group.links.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-400 transition hover:text-white"
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

        {/* ===============================================
            SEO PAGES
        =============================================== */}

        {seoFooterGroups.length > 0 && (
          <section
            aria-labelledby="career-resume-guides"
            className="mt-14 border-t border-white/10 pt-10"
          >
            {/* HEADER */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="career-resume-guides" className="text-lg font-semibold text-white">
                  Career & Resume Guides
                </h2>

                <p className="mt-1 max-w-2xl text-sm text-slate-500">
                  Resume formats, ATS guidance, company-specific resume guides, and career resources
                  for Indian job seekers.
                </p>
              </div>

              <Link
                href="/career"
                className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                View all guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* CATEGORY GRID */}
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {seoFooterGroups.map(group => (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold text-white">{group.category}</h3>

                  <ul className="mt-4 space-y-3">
                    {group.links.slice(0, 5).map(link => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm leading-5 text-slate-400 transition hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {/* MORE GUIDES */}
                  {group.links.length > 5 && (
                    <Link
                      href="/career"
                      className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-slate-500 transition hover:text-white"
                    >
                      More guides
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===============================================
            BOTTOM FOOTER
        =============================================== */}

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
