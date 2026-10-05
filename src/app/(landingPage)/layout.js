import Nav from "@/shared/components/ui/navbar";
import { Footer } from "@/shared/components/footer/Footer";

export const metadata = {
  metadataBase: new URL("https://www.nextcv.in"),
  title: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools | NextCV",
  description:
    "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",

  applicationName: "NextCV",

  title: "",

  description: "",
  authors: [{ name: "NextCV" }],
  creator: "NextCV",
  publisher: "NextCV",

  robots: "index, follow",

  alternates: {
    canonical: "https://www.nextcv.in/",
  },

  openGraph: {
    title: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools | NextCV",
    description:
      "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",
    url: "https://www.nextcv.in/",
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools | NextCV",
    description:
      "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",
    creator: "@aurpitaurpit",
  },
};
export default function LandingLayout({ children }) {
  return (
    <>
      <div className="landing-theme antialiased">
        {/* JSON-LD for LocalBusiness/SoftwareApplication */}

        <Nav />
        {children}
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              operatingSystem: "Web",
              name: "Get Job-Ready with AI | ATS Resume, Cover Letter & Career Tools | NextCV",
              description:
                "Everything you need to apply with confidence. Build an ATS resume, improve your content with AI, create tailored cover letters, and prepare for your next job.",
              applicationCategory: "Productivity",
              url: "https://www.nextcv.in",
              screenshot: "https://www.nextcv.in/opengraph-image.png",
            }),
          }}
        />
      </div>
    </>
  );
}
