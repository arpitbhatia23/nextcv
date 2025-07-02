import Nav from "@/components/ui/navbar";
import { Footer } from "@/components/footer/Footer";

export default function RootLayout({ children }) {
  return (
    <section className={` antialiased`}>
      <Nav />
      {children}
      <Footer />
    </section>
  );
}
