import { client } from "@/sanity";
import seoPages from "./(landingPage)/seo-pages.json" with { type: "json" };
import careerPages from "./(landingPage)/career-pages.json" with { type: "json" };
import { SITE_URL } from "@/shared/utils/seo";
import { comparisonPages } from "./(landingPage)/comparison_pages";

export default async function sitemap() {
  const baseUrl = SITE_URL.replace(/\/$/, "");

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
    { path: "/product" },
    { path: "/ai-resume-builder" },
    { path: "/ai-cover-letter-generator" },
    { path: "/shareable-resume" },
    { path: "/resume-to-portfolio" },
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
    { path: "/career" },
    { path: "/resume-builder-comparison" },
  ].map(page => ({ url: `${baseUrl}${page.path}` }));

  /* =========================================================
     SEO LANDING PAGES
  ========================================================= */

  const dynamicSeoPages = (seoPages || [])
    .filter(page => page?.slug)
    .map(page => ({
      url: `${baseUrl}/${page.slug.replace(/^\/+|\/+$/g, "")}`,
    }));

  /* =========================================================
     CAREER PAGES
  ========================================================= */

  const careerPageEntries = (careerPages || [])
    .filter(page => page?.slug)
    .map(page => ({
      url: `${baseUrl}/career/${page.slug.replace(/^\/+|\/+$/g, "")}`,
    }));

  /* =========================================================
     BLOG PAGES
  ========================================================= */

  const blogPages = (blogs || [])
    .filter(blog => blog?.slug)
    .map(blog => ({
      url: `${baseUrl}/blogs/${blog.slug.replace(/^\/+|\/+$/g, "")}`,
      ...(blog._updatedAt ? { lastModified: new Date(blog._updatedAt) } : {}),
    }));

  /* =========================================================
     COMPARISON PAGES
  ========================================================= */

  const comparisonPageEntries = (comparisonPages || [])
    .filter(page => page?.slug)
    .map(page => ({
      url: `${baseUrl}/resume-builder-comparison/${page.slug.replace(/^\/+|\/+$/g, "")}`,
      ...(page?._updatedAt ? { lastModified: new Date(page._updatedAt) } : {}),
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
