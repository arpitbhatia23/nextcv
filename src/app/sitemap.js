// app/sitemap.js

export default async function sitemap() {
  const baseUrl = "https://www.nextcv.in";

  // Static URLs for now (you can later add dynamic ones)
  const pages = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/privacyPolicy`, priority: 1.0 },
    { url: `${baseUrl}/terms`, priority: 1.0 },
    { url: `${baseUrl}/blogs`, priority: 0.9 },
  ];

  // Return in Next.js sitemap format
  return pages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: page.priority,
  }));
}
