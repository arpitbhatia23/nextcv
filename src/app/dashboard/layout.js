import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

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
          <SidebarHeader />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </section>
  );
}
