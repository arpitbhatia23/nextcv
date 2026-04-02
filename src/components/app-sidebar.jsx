"use client";
import * as React from "react";
import { IconDashboard } from "@tabler/icons-react";

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
} from "@/shared/components/ui/sidebar";
import Logo2 from "./Logo2";
import { ChartSpline, IndianRupee, TicketPercent, FileText, Palette } from "lucide-react";
import { Separator } from "../shared/components/ui/separator";
import { userStore } from "@/store/user.store";

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
    {
      title: "AI Chat Resume",
      url: "/dashboard/full-ai-resume",
      icon: Palette,
      badge: "Experimental",
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
  const user = userStore(s => s.user);
  const data = user?.role === "admin" ? adminData : userData;

  return (
    <Sidebar collapsible="offcanvas" className="bg-white border-r border-slate-200" {...props}>
      <SidebarHeader className="bg-white p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-14 hover:bg-slate-50 transition-all rounded-xl">
              <a href="#" className="flex justify-start pl-2">
                <Logo2 size={32} color="#0f172a" />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <Separator className="bg-slate-100" />

      <SidebarContent className="bg-white px-4 py-6">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <Separator className="bg-slate-100" />

      <SidebarFooter className="bg-white p-6">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
