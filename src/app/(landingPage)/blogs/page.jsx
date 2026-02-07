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
  return (
    <>
      {/* JSON-LD for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "NextCV Blog",
            url: "https://www.nextcv.in/blogs",
            description:
              "Expert tips on resume building, ATS optimization, and career growth",
            publisher: {
              "@type": "Organization",
              name: "NextCV",
              logo: {
                "@type": "ImageObject",
                url: "https://www.nextcv.in/opengraph-image.png",
              },
            },
          }),
        }}
      />
      <Blog />
    </>
  );
};

export default Blogspage;
