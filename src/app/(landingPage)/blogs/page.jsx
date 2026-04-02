import Blog from "@/shared/components/Blog";

export const metadata = {
  title: "Free ATS-Optimized Resume Template India + Download (2026) | NextCV Blog",
  description:
    "Best resume format for freshers in India with examples. Learn how to make a resume for IT jobs with no experience and download free templates for 2026.",
  keywords: [
    "best resume maker for freshers in India 2026",
    "free resume maker for IT freshers India",
    "IT resume sample India 2026",
    "CV format for Indian internships 2026",
  ],
  alternates: {
    canonical: `https://www.nextcv.in/blogs`,
  },
};

const Blogspage = () => {
  const jsonld = {
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
    ],
  };
  return (
    <>
      {/* JSON-LD for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonld),
        }}
      />

      <Blog />
    </>
  );
};

export default Blogspage;
