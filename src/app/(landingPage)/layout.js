import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";
import VisitorStatsCounter from "@/components/VistorCount";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata = {
  title: "NextCV -Build the Perfect ATS Friendly Resume with AI in Minutes",
  description:
    "Our AI-powered platform is optimized specifically for the Indian job market. Try the free demo today and get your professional, ATS-optimized resume for just ₹100. No subscriptions.",
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
