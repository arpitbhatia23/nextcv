import { client } from "@/sanity";
import seoPages from "./(landingPage)/seo-pages.json" with { type: "json" };
import careerPages from "./(landingPage)/career-pages.json" with { type: "json" };
import { SITE_URL } from "@/shared/utils/seo";
import { getComparisonPages } from "./(landingPage)/comparison_pages";

// Fallback timestamp used when a source does not provide a modification date.
const BUILD_FALLBACK_DATE = new Date("2026-10-05T04:38:16.000Z");

export default async function sitemap() {
  const baseUrl = SITE_URL.replace(/\/$/, "");

  /* =========================================================
     BLOG POSTS FROM SANITY
  ========================================================= */

  let blogs = [];

  try {
    blogs = await client.fetch(`
      *[
        _type == "post" &&
        defined(slug.current)
      ]{
        "slug": slug.current,
        _updatedAt
      }
    `);
  } catch (err) {
    console.error("Failed to fetch blog posts for sitemap:", err);
  }

  /* =========================================================
     STATIC PAGES
  ========================================================= */

  const staticPages = [
    { path: "" },
    { path: "/templates" },
    { path: "/ats-resume-checker" },
    { path: "/pricing" },
    { path: "/blogs" },
    { path: "/examples" },
    { path: "/ai-writer" },
    { path: "/about-us" },
    { path: "/contact" },
    { path: "/privacy-policy" },
    { path: "/terms" },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: BUILD_FALLBACK_DATE,
  }));

  /* =========================================================
     SEO LANDING PAGES
     
     seo-pages.json structure:
     {
       "slug": "ats-friendly-resume-format-india",
       "title": "..."
     }
  ========================================================= */

  const dynamicSeoPages = (seoPages || [])
    .filter(page => page?.slug)
    .map(page => ({
      url: `${baseUrl}/${page.slug.replace(/^\/+|\/+$/g, "")}`,
      lastModified: BUILD_FALLBACK_DATE,
    }));

  /* =========================================================
     CAREER PAGES
     
     career-pages.json structure:
     {
       "slug": "data-scientist-resume-guide",
       "title": "..."
     }
  ========================================================= */

  const careerPageEntries = (careerPages || [])
    .filter(page => page?.slug)
    .map(page => ({
      url: `${baseUrl}/career/${page.slug.replace(/^\/+|\/+$/g, "")}`,
      lastModified: BUILD_FALLBACK_DATE,
    }));

  /* =========================================================
     BLOG PAGES
  ========================================================= */

  const blogPages = (blogs || [])
    .filter(blog => blog?.slug)
    .map(blog => ({
      url: `${baseUrl}/blogs/${blog.slug.replace(/^\/+|\/+$/g, "")}`,
      lastModified: blog._updatedAt ? new Date(blog._updatedAt) : BUILD_FALLBACK_DATE,
    }));

  /* =========================================================
     COMPARISON PAGES
  ========================================================= */

  const comparisonPages = (getComparisonPages || []).map(page => {
    if (typeof page === "string") {
      return {
        url: page.startsWith("http") ? page : `${baseUrl}/${page.replace(/^\/+/, "")}`,
        lastModified: BUILD_FALLBACK_DATE,
      };
    }

    return {
      ...page,
      url: page.url?.startsWith("http")
        ? page.url
        : `${baseUrl}/${String(page.url || "")
            .replace(/^\/+/, "")
            .replace(/\/+$/, "")}`,
      lastModified: page.lastModified || BUILD_FALLBACK_DATE,
    };
  });

  /* =========================================================
     FINAL SITEMAP
  ========================================================= */

  return [
    ...staticPages,
    ...careerPageEntries,
    ...dynamicSeoPages,
    ...blogPages,
    ...comparisonPages,
  ];
}
