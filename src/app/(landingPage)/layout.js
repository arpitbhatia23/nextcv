import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";
import VisitorStatsCounter from "@/components/VistorCount";
export const metadata = {
  title: "NextCV - AI Resume Builder",
  description:
    "Create your resume with AI in minutes. Just ₹100 per resume, no subscriptions.",
};
export default function RootLayout({ children }) {
  return (
    <section className={` antialiased`}>
      <Nav />
      <VisitorStatsCounter />
      {children}
      <Footer />
    </section>
  );
}
