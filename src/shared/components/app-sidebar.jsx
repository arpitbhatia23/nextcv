"use client";

import * as React from "react";
import {
  ChartSpline,
  Files,
  FileUser,
  IndianRupee,
  LayoutDashboard,
  PenLine,
  TicketPercent,
} from "lucide-react";
import Link from "next/link";

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
import { Separator } from "@/shared/components/ui/separator";
import { userStore } from "@/store/user.store";

const userData = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "My Resumes", url: "/dashboard/my-resume", icon: FileUser },
    { title: "Cover Letter", url: "/dashboard/cover-letter", icon: PenLine },
    { title: "My Cover Letters", url: "/dashboard/my-cover-letter", icon: Files },
  ],
};

const adminData = {
  navMain: [
    { title: "DASHBOARD", url: "/dashboard", icon: LayoutDashboard },
    { title: "Analytics", url: "/dashboard/analytics", icon: ChartSpline },
    { title: "Coupons", url: "/dashboard/coupons", icon: TicketPercent },
    { title: "Payments", url: "/dashboard/payment", icon: IndianRupee },
  ],
};

export function AppSidebar({ ...props }) {
  const user = userStore(s => s.user);
  const data = user?.role === "admin" ? adminData : userData;

  return (
    <Sidebar collapsible="icon" className="border-r border-[#DDE2D9] bg-[#F1F5EF]" {...props}>
      <SidebarHeader className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12 justify-center" tooltip="NextCV">
              <Link href="/" className="flex items-center justify-center">
                <Logo2 size={32} />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <div className="px-2">
        <Separator className="bg-[#DDE2D9]" />
      </div>

      <SidebarContent
        className="
    min-w-0 overflow-x-hidden
    px-2 py-6
    group-data-[collapsible=icon]:px-1
    group-data-[collapsible=icon]:py-4
  "
      >
        <NavMain items={data.navMain} />
      </SidebarContent>

      <div className="px-2">
        <Separator className="bg-[#DDE2D9]" />
      </div>

      <SidebarFooter className="mb-2 min-w-0 p-2 group-data-[collapsible=icon]:p-1">
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
