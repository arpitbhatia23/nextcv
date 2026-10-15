"use client";
import { Separator } from "@/shared/components/ui/separator";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 p-4 bg-[#F1F5EF]/95 backdrop-blur-sm border-b border-[#DDE2D9] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-[#344B38]" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-[#DDE2D9]"
        />

        <div className="flex-1">
          <span className="text-sm font-medium text-[#344B38]">Dashboard</span>
        </div>

        <button
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#DDE2D9] bg-white hover:bg-[#E8EFE5] text-[#344B38] hover:text-[#203023] px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer"
          onClick={signOut}
        >
          <span className="font-sans">Log out</span>
          <LogOut size={16} strokeWidth={1.75} className="text-[#456B4A]" />
        </button>
      </div>
    </header>
  );
}
