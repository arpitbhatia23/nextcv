// app/sitemap.js
import { client } from "@/sanity";
import seoPages from "./(landingPage)/seo-pages.json";
import careerPages from "./(landingPage)/career-pages.json";

export default async function sitemap() {
  const baseUrl = "https://www.nextcv.in";

  const blogs = await client.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  const staticLastModified = new Date("2026-06-20");

  const staticPages = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/blogs", priority: 0.8, changeFrequency: "daily" },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/ai-writer", priority: 0.8, changeFrequency: "monthly" },
    { path: "/examples", priority: 0.8, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/templates", priority: 1.0, changeFrequency: "weekly" },
    { path: "/ats-resume-checker", priority: 0.85, changeFrequency: "monthly" },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: staticLastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const dynamicSeoPages = seoPages.map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: staticLastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const careerPage = careerPages.map(page => ({
    url: `${baseUrl}/career${page.slug}`,
    lastModified: staticLastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogPages = (blogs || []).map(blog => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog._updatedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticPages, ...careerPage, ...dynamicSeoPages, ...blogPages];
}
