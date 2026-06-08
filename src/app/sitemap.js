// app/sitemap.js
import { client } from "@/sanity";
export default async function sitemap() {
  const baseUrl = "https://www.nextcv.in";

  // Fetch all blogs from Sanity
  const blogs = await client.fetch(`
    *[_type == "post"]{
      "slug": slug.current,
      _updatedAt
    }
  `);

  // Static pages
  const pages = [
    {
      url: `${baseUrl}/`,
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blogs`,
      priority: 0.8,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      priority: 0.5,
      changeFrequency: "yearly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      priority: 0.5,
      changeFrequency: "yearly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about-us`,
      priority: 0.7,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ai-writer`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/examples`,
      priority: 0.8,
      changeFrequency: "weekly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/pricing`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/templates`,
      priority: 1.0,
      changeFrequency: "weekly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/free-resume-builder-no-payment`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/best-ai-resume-builder-india`,
      priority: 0.9,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
  ];

  // SEO Landing Pages
  const seoPages = [
    {
      url: `${baseUrl}/ats-resume-best-practices`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ats-friendly-resume-meaning`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ats-friendly-resume-tips`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ats-friendly-resume-format-india`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ats-resume-optimization`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/common-ats-resume-mistakes`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/ats-friendly-resume-checklist`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/what-is-ats-friendly-resume`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume-format-india`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/fresher-resume-format-india`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/best-resume-format-for-freshers-india-2026`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/indian-resume-format`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume-format-for-bca-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume-format-for-mca-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tcs-resume-format-for-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/infosys-resume-format-for-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/wipro-resume-format-for-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/accenture-resume-format-for-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/hcl-resume-format-for-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tech-mahindra-resume-format`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/best-resume-builder-india-2026`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/how-to-make-resume-ats-friendly-2026`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/career-objective-for-resume-for-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume-vs-cv-in-india`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/non-it-resume-for-freshers`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume-for-mnc-company`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/best-resume-format-for-it-jobs-in-india-2026`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/cv-format-for-ai-screening`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/latest-resume-format-2026`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/resume-builder-price-in-india`,
      priority: 0.8,
      changeFrequency: "monthly",
      lastModified: new Date(),
    }
  ];

  // Dynamic blog pages
  const blogPages = blogs.map(blog => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog._updatedAt),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  // Return all sitemap entries
  return [...pages, ...seoPages, ...blogPages];
}
