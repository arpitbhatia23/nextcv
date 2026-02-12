import Blog from "../../../components/Blog"; // Use @/ alias for better pathing

export const metadata = {
  title: "Blog - NextCV | Resume Building Tips & Career Advice",
  description:
    "Read expert tips on resume writing, ATS optimization, job search strategies, and career development from NextCV",
  keywords: [
    "resume tips",
    "CV writing",
    "ATS optimization",
    "job search",
    "career advice",
  ],
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
