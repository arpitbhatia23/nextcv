// ✅ 1. Imports
import { client } from "@/sanity";
import BlogDetails from "@/shared/components/BlogDetails";
import { cache } from "react";

// ✅ 2. ISR (VERY IMPORTANT)
export const revalidate = 300; // 5 minutes

// ✅ 3. Cached Blog Fetch (SHARED)
const getBlog = cache(async slug => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    mainImage { asset->{url} },
    publishedAt,
    _createdAt,
    _updatedAt,
    author->{name, image},
  }`;

  return await client.fetch(query, { slug });
});

// ✅ 4. Cached Related Posts
const getRelatedPosts = cache(async slug => {
  const query = `*[_type == "post" && slug.current != $slug][0...3]{
    title,
    slug,
    mainImage { asset->{url} },
    _createdAt,
    author->{name}
  }`;

  return await client.fetch(query, { slug });
});

// 🧠 5. Dynamic Metadata (NOW OPTIMIZED)
export async function generateMetadata({ params }) {
  const { slug } = params;

  const data = await getBlog(slug); // ✅ cached

  if (!data) {
    return {
      title: "Article Not Found",
      description: "The requested blog post could not be located.",
    };
  }

  const description =
    data.body?.[0]?.children?.[0]?.text ||
    "Read this expert blog on logistics, shipping, and supply chain.";

  const imageUrl = data.mainImage?.asset?.url || "https://placehold.co/1200x600/000/fff?text=Blog";

  return {
    title: data.title,
    description,
    alternates: {
      canonical: `https://www.nextcv.in/blogs/${slug}`,
    },
    keywords: ["resume builder", "CV maker", "AI resume", "job application", "professional resume"],
    openGraph: {
      title: data.title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 600,
          alt: data.title,
        },
      ],
      type: "article",
    },
  };
}

// 🧾 6. Page Component (OPTIMIZED)
export default async function BlogDetailsPage({ params }) {
  const { slug } = params;

  // ✅ Parallel + cached
  const [blogData, relatedPosts] = await Promise.all([getBlog(slug), getRelatedPosts(slug)]);

  // 🧠 Breadcrumb JSON-LD
  const BreadcrumbListjson = {
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
        name: "Blog",
        item: "https://www.nextcv.in/blogs",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blogData?.title,
        item: `https://www.nextcv.in/blogs/${slug}`,
      },
    ],
  };

  // 🧠 Blog Schema
  const jsonLdSchema = blogData
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogData.title,
        image: blogData.mainImage?.asset?.url || "https://www.nextcv.in/opengraph-image.png",
        datePublished: blogData.publishedAt || blogData._createdAt,
        dateModified: blogData._updatedAt || blogData.publishedAt || blogData._createdAt,
        author: {
          "@type": "Person",
          name: blogData.author?.name || "NextCV Team",
          image: blogData.author?.image?.asset?.url || "",
        },
        publisher: {
          "@type": "Organization",
          name: "NextCV",
          logo: {
            "@type": "ImageObject",
            url: "https://www.nextcv.in/opengraph-image.png",
          },
        },
        description: blogData.body?.[0]?.children?.[0]?.text || blogData.title,
      }
    : null;

  return (
    <>
      {/* ✅ Blog Schema */}
      {jsonLdSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchema),
          }}
        />
      )}

      {/* ✅ Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(BreadcrumbListjson),
        }}
      />

      {/* ✅ Client Component */}
      <BlogDetails slug={slug} initialData={blogData} relatedPosts={relatedPosts} />
    </>
  );
}
