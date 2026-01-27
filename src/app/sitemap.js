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
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/blogs`, priority: 0.8 },
    { url: `${baseUrl}/privacyPolicy`, priority: 1.0 },
    { url: `${baseUrl}/terms`, priority: 1.0 },
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
