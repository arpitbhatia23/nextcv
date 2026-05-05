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
      <SidebarGroupContent className="flex flex-col gap-4">
        <SidebarMenu>
          {items.map(item => (
            <SidebarMenuItem key={item.title}>
              <Link href={item?.url}>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={
                    "flex items-center justify-start gap-4 py-7 px-4 hover:bg-white rounded-2xl transition-all duration-300 group shadow-none hover:shadow-[0_4px_20px_-4px_rgba(99,102,241,0.1)] border border-transparent hover:border-slate-100"
                  }
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-50 group-hover:scale-110 transition-all duration-300">
                    <span className="text-slate-500 group-hover:text-indigo-600 transition-colors">
                      {item.icon && <item.icon size={20} strokeWidth={2} />}
                    </span>
                  </div>
                  <span className="text-[14px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors tracking-tight">
                    {item.title}
                  </span>
                  {item.badge && (
                    <span className="ml-auto bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-wider shadow-sm group-hover:shadow-indigo-200 transition-all">
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
