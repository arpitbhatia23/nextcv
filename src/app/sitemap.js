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
  ];

  // Dynamic blog pages
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog._updatedAt),
    changeFrequency: "daily",
    priority: 0.9,
  }));

  console.log(blogPages?.length);
  // Return all sitemap entries
  return [...pages, ...blogPages];
}
