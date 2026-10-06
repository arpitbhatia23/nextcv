import { client } from "@/sanity";
import seoPages from "./(landingPage)/seo-pages.json" with { type: "json" };
import careerPages from "./(landingPage)/career-pages.json" with { type: "json" };
import { SITE_URL } from "@/shared/utils/seo";

// Fixes the dynamic execution stamp with a structured fallback timestamp
const BUILD_FALLBACK_DATE = new Date("2026-10-05T04:38:16.000Z");

export default async function sitemap() {
  const baseUrl = SITE_URL;

  // Query content management engine with try/catch error bounds
  let blogs = [];
  try {
    blogs = await client.fetch(`
      *[_type == "post" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);
  } catch (err) {
    console.error("Failed to fetch blog posts for sitemap:", err);
  }

  // Map core informational marketing links without ignored 'priority' tags
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
    lastModified: page.lastModified || BUILD_FALLBACK_DATE,
  }));

  // Parse structural JSON arrays for dynamic placement landing setups
  const dynamicSeoPages = (seoPages || [])
    .filter(page => page && page.slug)
    .map(page => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: BUILD_FALLBACK_DATE,
    }));

  // Parse specific transactional career silos (/career/*-career-guide)
  const careerPage = (careerPages || [])
    .filter(page => page && page.slug)
    .map(page => ({
      url: `${baseUrl}/career/${page.slug}`,
      lastModified: BUILD_FALLBACK_DATE,
    }));

  // Extract modification dates dynamically from your live database documents
  const blogPages = (blogs || []).map(blog => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog._updatedAt ? new Date(blog._updatedAt) : BUILD_FALLBACK_DATE,
  }));

  return [...staticPages, ...careerPage, ...dynamicSeoPages, ...blogPages];
}
