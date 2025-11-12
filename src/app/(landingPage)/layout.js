import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";
import VisitorStatsCounter from "@/components/VistorCount";
import { Suspense } from "react";
import Loading from "../loading";
export const metadata = {
  title: "NextCV - AI Resume Builder",
  description:
    "Create your resume with AI in minutes. Just ₹100 per resume, no subscriptions.",
  keywords: [
    "resume builder",
    "CV maker",
    "AI resume",
    "job application",
    "professional resume",
  ],
  authors: [{ name: "NextCV" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nextcv.com",
    siteName: "NextCV",
    images: [
      {
        url: "https://nextcv.in/opengraph-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
export default function RootLayout({ children }) {
  return (
    <section className={` antialiased`}>
      <Nav />
      <VisitorStatsCounter />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </section>
  );
}
