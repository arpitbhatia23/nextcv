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
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-1">
        <SidebarMenu>
          {items.map(item => {
            const isActive = pathname?.startsWith(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item?.url}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`flex items-center justify-start gap-4 py-6 px-3 transition-all duration-200 group shadow-none ${
                      isActive
                        ? "bg-[#E5ECE2] text-[#344B38] font-semibold"
                        : "text-[#4F5B51] hover:bg-[#E8EFE5] hover:text-[#344B38]"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-9 h-9 border transition-all duration-200 ${
                        isActive
                          ? "bg-white border-[#DDE2D9] text-[#456B4A]"
                          : "bg-white border-[#DDE2D9] text-[#456B4A]/80 group-hover:text-[#456B4A]"
                      }`}
                    >
                      <span className="transition-colors">
                        {item.icon && <item.icon size={18} strokeWidth={1.75} />}
                      </span>
                    </div>
                    <span className="font-sans text-sm transition-colors">
                      {item.title}
                    </span>
                    {item.badge && (
                      <span className="ml-auto text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest font-mono bg-[#344B38]">
                        {item.badge}
                      </span>
                    )}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
