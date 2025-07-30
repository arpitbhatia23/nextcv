import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";
import VisitorStatsCounter from "@/components/VistorCount";

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
