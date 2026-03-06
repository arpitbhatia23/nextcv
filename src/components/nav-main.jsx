"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2 gap-y-8">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item?.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={"flex items-center justify-start gap-3 py-6 px-4 hover:bg-slate-50 rounded-xl transition-all group"}
                >
                  <span className="text-xl text-center group-hover:scale-110 transition-transform">
                    {item.icon && <item.icon size={22} />}
                  </span>{" "}
                  <span className="text-[15px] font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter border border-indigo-200">
                      {item.badge}
                    </span>
                  )}
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
