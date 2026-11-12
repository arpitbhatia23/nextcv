"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({ items }) {
  const pathname = usePathname();

  return (
    <SidebarGroup className="p-0">
      <SidebarGroupContent>
        <SidebarMenu className="gap-2">
          {items.map(item => {
            const isActive =
              pathname === item.url ||
              (item.url !== "/dashboard" && pathname.startsWith(`${item.url}/`));

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                  className={`
                    h-12 w-full rounded-md
                    justify-start gap-3 px-2
                    transition-all duration-200
                    group-data-[collapsible=icon]:size-10!
                    group-data-[collapsible=icon]:justify-center!
                    group-data-[collapsible=icon]:p-0!
                    ${
                      isActive
                        ? "bg-[#E5ECE2] text-[#344B38] font-semibold"
                        : "text-[#4F5B51] hover:bg-[#E8EFE5] hover:text-[#344B38]"
                    }
                  `}
                >
                  <Link href={item.url}>
                    {item.icon && (
                      <div
                        className={`
                          flex size-9 shrink-0 items-center justify-center
                          border border-[#DDE2D9] bg-white
                          transition-colors
                          group-data-[collapsible=icon]:size-8!
                          ${isActive ? "text-[#456B4A]" : "text-[#456B4A]/80"}
                        `}
                      >
                        <item.icon size={18} strokeWidth={1.75} />
                      </div>
                    )}

                    <span className="min-w-0 flex-1 truncate font-sans text-sm group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>

                    {item.badge && (
                      <span className="ml-auto bg-[#344B38] px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white group-data-[collapsible=icon]:hidden">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
