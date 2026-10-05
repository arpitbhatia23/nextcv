import { client } from "@/sanity";
import seoPages from "./(landingPage)/seo-pages.json";
import careerPages from "./(landingPage)/career-pages.json";
import { SITE_URL } from "@/shared/utils/seo";

export default async function sitemap() {
  const baseUrl = SITE_URL;
  const now = new Date();

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

  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/templates", priority: 1.0, changeFrequency: "weekly" },
    { path: "/ats-resume-checker", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
    { path: "/examples", priority: 0.8, changeFrequency: "weekly" },
    { path: "/ai-writer", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const dynamicSeoPages = seoPages
    .filter(page => page.slug)
    .map(page => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const careerPage = careerPages
    .filter(page => page.slug)
    .map(page => ({
      url: `${baseUrl}/career/${page.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const blogPages = (blogs || []).map(blog => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog._updatedAt ? new Date(blog._updatedAt) : now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...careerPage, ...dynamicSeoPages, ...blogPages];
}
