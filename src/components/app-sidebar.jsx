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
import { ChartSpline, IndianRupee, TicketPercent } from "lucide-react";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";
const userData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    // {
    //   title: "Resume Builder",
    //   url: "#",
    //   icon: PenSquare,
    // },
    {
      title: "My Resume",
      url: "/dashboard/my-resume",
      icon: IconReport,
    },
    // {
    //   title: "Template selection",
    //   url: "#",
    //   icon: GalleryVerticalEnd,
    // },
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
      title: "Analaytics",
      url: "/dashboard/analytics",
      icon: ChartSpline,
    },
    {
      title: "coupons",
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
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-7.5 flex justify-between items-center"
            >
              <a href="#">
                <Logo2 />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
