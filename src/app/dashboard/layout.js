import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "DASHBOARD -NXTCV",
  description: "A modern Ai resume builder.",
};

export default function RootLayout({ children }) {
  return (
    <section className={` antialiased`}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SiteHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}
