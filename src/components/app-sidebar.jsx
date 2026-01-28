"use client";
import * as React from "react";
import { IconDashboard, IconReport } from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Logo2 from "./Logo2";
import { ChartSpline, IndianRupee, TicketPercent, FileText } from "lucide-react";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";

const userData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "My Resumes",
      url: "/dashboard/my-resume",
      icon: FileText,
    },
  ],
};

const adminData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: ChartSpline,
    },
    {
      title: "Coupons",
      url: "/dashboard/coupons",
      icon: TicketPercent,
    },
    {
      title: "Payments",
      url: "/dashboard/payment",
      icon: IndianRupee,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const { data: session } = useSession();
  const user = session?.user;
  const data = session?.user?.role === "admin" ? adminData : userData;

  return (
    <Sidebar collapsible="offcanvas" className="bg-white border-r border-slate-200" {...props}>
      <SidebarHeader className="bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="py-6 hover:bg-slate-50 transition-colors"
            >
              <a href="#" className="flex justify-start pl-2">
                <Logo2 size={32} color="#0f172a" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      <Separator className="bg-slate-100" />
      
      <SidebarContent className="bg-white px-2 py-4">
        <NavMain items={data.navMain} />
      </SidebarContent>
      
      <Separator className="bg-slate-100" />
      
      <SidebarFooter className="bg-white p-4">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
