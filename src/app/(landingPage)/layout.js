import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";
import VisitorStatsCounter from "@/components/VistorCount";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata = {
  title: "NextCV – Professional ATS Resume Builder for India",
  description:
    "Create a professional, ATS-optimized resume in minutes. Built for the Indian job market. Try the free demo and get your AI resume for just ₹100—no subscription.",
};

export default function RootLayout({ children }) {
  return (
    <section className={`antialiased`}>
      <Nav />
      <VisitorStatsCounter />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <Footer />
    </section>
  );
}
