import Blog from "@/shared/components/Blog";
import { client } from "@/sanity";

export const metadata = {
  title: "Free ATS-Optimized Resume Templates & Career Guides India 2026 | NextCV",
  description:
    "Explore ATS-friendly resume formats, fresher resume examples, career guides, and free resume templates for Indian job seekers.",
  keywords: [
    "best resume maker for freshers in India 2026",
    "free resume maker for IT freshers India",
    "IT resume sample India 2026",
    "CV format for Indian internships 2026",
  ],
  alternates: {
    canonical: "https://www.nextcv.in/blogs",
  },
};

export const revalidate = 3600;

const BLOGS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    _createdAt,
    categories[]->{
      title
    },
    author->{
      name,
      image
    },
    mainImage
  }
`;

function createExcerpt(post) {
  if (post.excerpt) {
    return post.excerpt;
  }

  if (Array.isArray(post.body)) {
    const firstTextBlock = post.body.find(
      block => block._type === "block" && Array.isArray(block.children)
    );

    if (firstTextBlock) {
      const text = firstTextBlock.children
        .map(child => child.text || "")
        .join(" ")
        .trim();

      if (text) {
        return `${text.substring(0, 150)}${text.length > 150 ? "..." : ""}`;
      }
    }
  }

  return "Read this article to learn more about our career insights.";
}

export default async function BlogsPage() {
  const posts = await client.fetch(
    BLOGS_QUERY,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ["blogs"],
      },
    }
  );

  const blogs = posts.map(post => ({
    ...post,
    excerpt: createExcerpt(post),

    // Do not send the complete article body to the client component.
    body: undefined,
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.nextcv.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blogs",
        item: "https://www.nextcv.in/blogs",
      },
    ],
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: blogs.length,
    itemListElement: blogs.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: blog.title,
      url: `https://www.nextcv.in/blogs/${blog.slug.current}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListJsonLd),
        }}
      />

      <Blog initialBlogs={blogs} />
    </>
  );
}
