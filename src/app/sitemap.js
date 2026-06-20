// app/sitemap.js
import { client } from "@/sanity";

export default async function sitemap() {
  const baseUrl = "https://www.nextcv.in";

  const blogs = await client.fetch(`
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  const staticLastModified = new Date("2026-06-20");

  const pages = [
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
    { path: "/free-resume-builder-no-payment", priority: 0.8, changeFrequency: "monthly" },
    { path: "/best-ai-resume-builder-india", priority: 0.8, changeFrequency: "monthly" },

    { path: "/ats-resume-best-practices", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ats-friendly-resume-meaning", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ats-friendly-resume-tips", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ats-friendly-resume-format-india", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ats-resume-optimization", priority: 0.8, changeFrequency: "monthly" },
    { path: "/common-ats-resume-mistakes", priority: 0.8, changeFrequency: "monthly" },
    { path: "/ats-friendly-resume-checklist", priority: 0.8, changeFrequency: "monthly" },
    { path: "/what-is-ats-friendly-resume", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resume-format-india", priority: 0.8, changeFrequency: "monthly" },
    { path: "/fresher-resume-format-india", priority: 0.8, changeFrequency: "monthly" },
    {
      path: "/best-resume-format-for-freshers-india-2026",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/indian-resume-format", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resume-format-for-bca-freshers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resume-format-for-mca-freshers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tcs-resume-format-for-freshers", priority: 0.85, changeFrequency: "monthly" },
    { path: "/infosys-resume-format-for-freshers", priority: 0.85, changeFrequency: "monthly" },
    { path: "/wipro-resume-format-for-freshers", priority: 0.85, changeFrequency: "monthly" },
    { path: "/accenture-resume-format-for-freshers", priority: 0.85, changeFrequency: "monthly" },
    { path: "/hcl-resume-format-for-freshers", priority: 0.85, changeFrequency: "monthly" },
    { path: "/tech-mahindra-resume-format", priority: 0.85, changeFrequency: "monthly" },
    { path: "/best-resume-builder-india-2026", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-to-make-resume-ats-friendly-2026", priority: 0.8, changeFrequency: "monthly" },
    {
      path: "/career-objective-for-resume-for-freshers",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/resume-vs-cv-in-india", priority: 0.8, changeFrequency: "monthly" },
    { path: "/non-it-resume-for-freshers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resume-for-mnc-company", priority: 0.8, changeFrequency: "monthly" },
    {
      path: "/best-resume-format-for-it-jobs-in-india-2026",
      priority: 0.8,
      changeFrequency: "monthly",
    },
    { path: "/cv-format-for-ai-screening", priority: 0.8, changeFrequency: "monthly" },
    { path: "/latest-resume-format-2026", priority: 0.8, changeFrequency: "monthly" },
    { path: "/resume-builder-price-in-india", priority: 0.85, changeFrequency: "monthly" },
  ].map(page => ({
    url: `${baseUrl}${page.path}`,
    lastModified: staticLastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const blogPages = blogs.map(blog => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog._updatedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...pages, ...blogPages];
}
