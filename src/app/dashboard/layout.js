import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import AuthProvider from "@/context/authprovider";
import { getServerSession } from "next-auth";
import authOptions from "../api/auth/options";
import { InitUser } from "@/components/initUser";
export const metadata = {
  title: "Dashboard - NextCV",
  description: "Manage your resumes and create new ones with AI assistance",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

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
              price: "100",
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
