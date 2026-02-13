import { client } from "../../../../sanity"; // Adjust path as needed
import BlogDetails from "../../../../components/BlogDetails"; // Adjust path as needed

// 🛑 1. Dynamic Metadata Function (Server-side SEO)
// Fetches necessary data (title, image, description) for OpenGraph and SEO tags
export async function generateMetadata({ params }) {
  const { slug } = await params;

  // Query optimized to fetch only the essential SEO data
  const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      // Fetch body for description extraction
      body, 
      mainImage { asset->{url} },
      publishedAt,
      author->{name},
    }`;

  const data = await client.fetch(query, { slug });

  if (!data) {
    // If the article isn't found, return a default metadata object
    return {
      title: "Article Not Found",
      description: "The requested blog post could not be located.",
    };
  }

  // Sanity PortableText body is an array of blocks. Extract text from the first block.
  const firstBlock = data.body?.[0];
  const description =
    firstBlock?.children?.[0]?.text ||
    `Read this expert blog on logistics, shipping, and supply chain.`;

  // Use the main image URL or a professional placeholder if none exists
  const imageUrl =
    data.mainImage?.asset?.url ||
    "https://placehold.co/1200x600/000/fff?text=Logistics+Blog";

  return {
    title: data.title,
    description: description,
    keywords: [
      "resume builder",
      "CV maker",
      "AI resume",
      "job application",
      "professional resume",
    ],
    openGraph: {
      title: data.title,
      description: description,
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

// 🛑 2. Server Component Page
export default async function BlogDetailsPage({ params }) {
  const { slug } = await params;

  // Fetch blog data for JSON-LD
  const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      body,
      mainImage { asset->{url} },
      publishedAt,
      _createdAt,
      _updatedAt,
      author->{name, image},
    }`;

  const blogData = await client.fetch(query, { slug });

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
        item: "https://www.nextcv.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blogData?.title,
        item: `https://www.nextcv.in/blog/${blogData?.slug}`,
      },
    ],
  };

  // Generate JSON-LD structured data
  const jsonLdSchema = blogData
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: blogData.title,
        image:
          blogData.mainImage?.asset?.url ||
          "https://www.nextcv.in/opengraph-image.png",
        datePublished: blogData.publishedAt || blogData._createdAt,
        dateModified:
          blogData._updatedAt || blogData.publishedAt || blogData._createdAt,
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
      {jsonLdSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdSchema),
          }}
        />
      )}
      {BreadcrumbListjson && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(BreadcrumbListjson),
          }}
        />
      )}
      {/* The Client Component (BlogDetails) handles data fetching, loading, and interactive rendering */}
      <BlogDetails slug={slug} initialData={blogData} />
    </>
  );
}
