import { client } from "../../../../sanity"; // Adjust path as needed
import BlogDetails from "../../../../components/BlogDetails"; // Adjust path as needed

// 🛑 1. Dynamic Metadata Function (Server-side SEO)
// Fetches necessary data (title, image, description) for OpenGraph and SEO tags
export async function generateMetadata({ params }) {
  const { slug } = await params;

  console.log(slug);

  // Query optimized to fetch only the essential SEO data
  const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      // Fetch body for description extraction
      body, 
      mainImage { asset->{url} },
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
      "logistics",
      "supply chain",
      "freight",
      "shipping",
      "transportation",
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
  console.log(slug);

  return (
    // The Client Component (BlogDetails) handles data fetching, loading, and interactive rendering
    <BlogDetails slug={slug} />
  );
}
