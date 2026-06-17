import { cache } from "react";
import { notFound } from "next/navigation";

import { client } from "@/sanity";
import BlogDetails from "@/shared/components/BlogDetails";

export const revalidate = 3600;
export const dynamicParams = true;
export const runtime = "nodejs";

const BLOG_QUERY = `
  *[
    _type == "post" &&
    slug.current == $slug
  ][0] {
    _id,
    title,
    body,
    publishedAt,
    _createdAt,
    _updatedAt,

    mainImage {
      alt,
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      }
    },

    author->{
      name,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    }
  }
`;

const RELATED_POSTS_QUERY = `
  *[
    _type == "post" &&
    defined(slug.current) &&
    slug.current != $slug
  ]
  | order(coalesce(publishedAt, _createdAt) desc)
  [0...3] {
    _id,
    title,
    slug,
    publishedAt,
    _createdAt,

    mainImage {
      alt,
      asset->{
        _id,
        url
      }
    },

    author->{
      name
    }
  }
`;

/**
 * React cache prevents duplicate calls to this function during the
 * same server-rendering pass, including generateMetadata + Page.
 *
 * next.revalidate provides persistent Next.js data caching.
 */
const getBlog = cache(async slug => {
  return client.fetch(
    BLOG_QUERY,
    { slug },
    {
      next: {
        revalidate: 3600,
        tags: [`blog:${slug}`, "blogs"],
      },
    }
  );
});

const getRelatedPosts = cache(async slug => {
  return client.fetch(
    RELATED_POSTS_QUERY,
    { slug },
    {
      next: {
        revalidate: 3600,
        tags: ["blogs"],
      },
    }
  );
});

function portableTextToPlainText(blocks = []) {
  return blocks
    .filter(block => block?._type === "block")
    .flatMap(block => block.children || [])
    .map(child => child?.text || "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

function createDescription(blog) {
  const bodyText = portableTextToPlainText(blog?.body);

  if (!bodyText) {
    return "Create an ATS-friendly professional resume with NextCV.";
  }

  return bodyText.length > 157 ? `${bodyText.slice(0, 157).trim()}...` : bodyText;
}

export async function generateStaticParams() {
  const posts = await client.fetch(
    `
      *[
        _type == "post" &&
        defined(slug.current)
      ] {
        "slug": slug.current
      }
    `,
    {},
    {
      next: {
        revalidate: 3600,
        tags: ["blog-slugs"],
      },
    }
  );

  return posts
    .filter(post => post?.slug)
    .map(post => ({
      slug: post.slug,
    }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: "Article Not Found | NextCV",
      description: "The requested NextCV article could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = createDescription(blog);

  const imageUrl = blog.mainImage?.asset?.url || "https://www.nextcv.in/opengraph-image.png";

  const canonicalUrl = `https://www.nextcv.in/blogs/${slug}`;

  return {
    title: blog.title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    keywords: [
      "resume builder",
      "CV maker",
      "AI resume builder",
      "ATS-friendly resume",
      "professional resume",
    ],

    openGraph: {
      title: blog.title,
      description,
      url: canonicalUrl,
      siteName: "NextCV",
      type: "article",
      publishedTime: blog.publishedAt || blog._createdAt,
      modifiedTime: blog._updatedAt || blog.publishedAt || blog._createdAt,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.mainImage?.alt || blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  const [blogData, relatedPosts] = await Promise.all([getBlog(slug), getRelatedPosts(slug)]);

  if (!blogData) {
    notFound();
  }

  const canonicalUrl = `https://www.nextcv.in/blogs/${slug}`;

  const breadcrumbSchema = {
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
        name: blogData.title,
        item: canonicalUrl,
      },
    ],
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogData.title,
    description: createDescription(blogData),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: blogData.mainImage?.asset?.url || "https://www.nextcv.in/opengraph-image.png",
    datePublished: blogData.publishedAt || blogData._createdAt,
    dateModified: blogData._updatedAt || blogData.publishedAt || blogData._createdAt,
    author: {
      "@type": "Person",
      name: blogData.author?.name || "NextCV Team",
      ...(blogData.author?.image?.asset?.url
        ? {
            image: blogData.author.image.asset.url,
          }
        : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "NextCV",
      url: "https://www.nextcv.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.nextcv.in/opengraph-image.png",
      },
    },
  };

  const safeBlogSchema = JSON.stringify(blogSchema).replace(/</g, "\\u003c");

  const safeBreadcrumbSchema = JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeBlogSchema,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeBreadcrumbSchema,
        }}
      />

      <BlogDetails slug={slug} initialData={blogData} relatedPosts={relatedPosts} />
    </>
  );
}
