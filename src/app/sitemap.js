import { client } from "@/sanity";
import seoPages from "./(landingPage)/seo-pages.json" with { type: "json" };
import careerPages from "./(landingPage)/career-pages.json" with { type: "json" };
import { SITE_URL } from "@/shared/utils/seo";
import { comparisonPages } from "./(landingPage)/comparison_pages";

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
  ========================================================= */

  const dynamicSeoPages = (seoPages || [])
    .filter(page => page?.slug)
    .map(page => ({
      url: `${baseUrl}/${page.slug.replace(/^\/+|\/+$/g, "")}`,
      lastModified: BUILD_FALLBACK_DATE,
    }));

  /* =========================================================
     CAREER PAGES
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

  const comparisonPageEntries = (comparisonPages || [])
    .filter(page => page?.slug)
    .map(page => ({
      url: `${baseUrl}/resume-builder-comparison/${page.slug.replace(/^\/+|\/+$/g, "")}`,
      lastModified: page?._updatedAt ? new Date(page._updatedAt) : BUILD_FALLBACK_DATE,
    }));

  /* =========================================================
     FINAL SITEMAP
  ========================================================= */

  return [
    ...staticPages,
    ...careerPageEntries,
    ...dynamicSeoPages,
    ...blogPages,
    ...comparisonPageEntries,
  ];
}
