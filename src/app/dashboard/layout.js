import { AppSidebar } from "@/shared/components/app-sidebar";
import { SiteHeader } from "@/shared/components/site-header";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import AuthProvider from "@/context/authprovider";

import { InitUser } from "@/modules/auth/components/initUser";
import { requiredAuth } from "@/shared";
export const metadata = {
  title: "Dashboard - NextCV",
  description: "Manage your resumes and create new ones with AI assistance",
};

export default async function RootLayout({ children }) {
  const session = await requiredAuth();

  return (
    <>
      {/* JSON-LD for Dashboard/Tool Application */}
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
              price: "49",
              priceCurrency: "INR",
            },
          }),
        }}
      />
      <section className={` antialiased`}>
        <AuthProvider>
          <InitUser session={session} />
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <SiteHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </section>
    </>
  );
}
