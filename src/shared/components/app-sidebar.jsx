"use client";
import * as React from "react";
import { IconDashboard } from "@tabler/icons-react";

import { NavMain } from "@/shared/components/nav-main";
import { NavUser } from "@/shared/components/nav-user";
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
import { Separator } from "@/shared/components/ui/separator";
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
    <Sidebar
      collapsible="offcanvas"
      className="bg-slate-50/50 backdrop-blur-xl border-r border-slate-200/60"
      {...props}
    >
      <SidebarHeader className="p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/dashboard" className="flex items-center justify-center mt-6 p-6">
                <Logo2 size={60} />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <div className="px-6">
        <Separator className="bg-slate-200/50" />
      </div>

      <SidebarContent className="px-4 py-8">
        <NavMain items={data.navMain} />
      </SidebarContent>

      <div className="px-6">
        <Separator className="bg-slate-200/50" />
      </div>

      <SidebarFooter className="p-4 mb-2">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-2 border border-slate-200/50 shadow-sm hover:shadow-md transition-all duration-300">
          <NavUser user={user} />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
