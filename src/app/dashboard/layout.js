import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Dashboard - NextCV",
  description: "Manage your resumes and create new ones with AI assistance",
};

export default function RootLayout({ children }) {
  return (
    <>
      = {/* JSON-LD for Dashboard/Tool Application */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "NextCV Dashboard",
            url: "https://nextcv.in/dashboard",
            description: "Manage and create professional AI-powered resumes",
            applicationCategory: "Productivity",
            offers: {
              "@type": "Offer",
              price: "100",
              priceCurrency: "INR",
            },
          }),
        }}
      />
      <section className={` antialiased`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </section>
    </>
  );
}
