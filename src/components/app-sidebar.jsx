"use client";
import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
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
import Logo from "./logo";
import Logo2 from "./Logo2";
import {
  ChartSpline,
  GalleryVertical,
  GalleryVerticalEnd,
  IndianRupee,
  PenSquare,
  TicketPercent,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { useSession } from "next-auth/react";
const userData = {
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    // {
    //   title: "Resume Builder",
    //   url: "#",
    //   icon: PenSquare,
    // },
    {
      title: "My Resume",
      url: "#",
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
      url: "#",
      icon: IconDashboard,
    },
    {
      title: "Analaytics",
      url: "#",
      icon: ChartSpline,
    },
    {
      title: "coupouns",
      url: "#",
      icon: TicketPercent,
    },
    {
      title: "Payments",
      url: "#",
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
