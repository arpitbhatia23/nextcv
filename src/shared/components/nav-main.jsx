"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";
import Link from "next/link";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <Link href={item?.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="flex items-center justify-start gap-4 py-6 px-3 rounded-none transition-all duration-200 group shadow-none border-l-2 border-transparent hover:border-l-[#1C2333]"
                  style={{ ["--nav-hover-bg"]: "#F7F7F5" }}
                >
                  <div
                    className="flex items-center justify-center w-9 h-9 border transition-all duration-200"
                    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
                  >
                    <span className="transition-colors" style={{ color: "#6B7280" }}>
                      {item.icon && <item.icon size={18} strokeWidth={1.75} />}
                    </span>
                  </div>
                  <span
                    className="font-mono text-[11px] font-medium tracking-wide transition-colors"
                    style={{ color: "#6B7280" }}
                  >
                    {item.title.toUpperCase()}
                  </span>
                  {item.badge && (
                    <span
                      className="ml-auto text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest font-mono"
                      style={{ backgroundColor: "#B3382C" }}
                    >
                      {item.badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <style jsx global>{`
        [data-sidebar="menu-button"]:hover {
          background-color: #f7f7f5 !important;
        }
        [data-sidebar="menu-button"]:hover span {
          color: #1c2333 !important;
        }
      `}</style>
    </SidebarGroup>
  );
}
