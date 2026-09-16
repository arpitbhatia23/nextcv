import Nav from "@/shared/components/ui/navbar";
import { Footer } from "@/shared/components/footer/Footer";

export const metadata = {
  metadataBase: new URL("https://www.nextcv.in"),
  applicationName: "NextCV",
  title: "Free ATS Resume Builder for Indian Freshers",
  description:
    "Create an ATS-friendly resume for Indian fresher jobs with professional templates and simple online editing.",
  authors: [{ name: "NextCV" }],
  creator: "NextCV",
  publisher: "NextCV",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.nextcv.in/",
  },
  openGraph: {
    siteName: "NextCV",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@aurpitaurpit",
  },
};
export default function LandingLayout({ children }) {
  return (
    <>
      <section className={`antialiased`}>
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
              name: "Free ATS Resume Builder for Indian Freshers 2026 | NextCV",
              operatingSystem: "Web",
              description:
                "Create an ATS-friendly resume for Indian fresher jobs with professional templates and simple online editing.",
              applicationCategory: "Productivity",
              url: "https://www.nextcv.in",
              screenshot: "https://www.nextcv.in/opengraph-image.png",
            }),
          }}
        />
      </section>
    </>
  );
}
