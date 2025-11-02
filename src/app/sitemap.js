// app/sitemap.js

export default async function sitemap() {
  const baseUrl = "https://www.nextcv.in";

  // Static URLs for now (you can later add dynamic ones)
  const pages = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/privacyPolicy`, priority: 1.0 },
    { url: `${baseUrl}/terms`, priority: 1.0 },
    { url: `${baseUrl}/dashboard`, priority: 0.9 },
    { url: `${baseUrl}/dashboard/my-resume`, priority: 0.7 },
    { url: `${baseUrl}/dashboard/resumeform`, priority: 0.7 },
  ];

  // Return in Next.js sitemap format
  return pages.map((page) => ({
    url: page.url,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: page.priority,
  }));
}
