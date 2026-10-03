"use client";
import { Separator } from "@/shared/components/ui/separator";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 p-4 bg-[#F8F7F3]/95 backdrop-blur-sm border-b border-[#E3E2DC] transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-[#17201C]" />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4 bg-[#E3E2DC]" />
        
        <div className="flex-1">
          {/* Breadcrumb / Context area */}
          <span className="text-sm font-medium text-[#5B625C]">Dashboard</span>
        </div>

        <button 
          className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#E3E2DC] bg-white hover:bg-[#F1F0EB] text-[#5B625C] hover:text-[#17201C] px-3 py-1.5 text-xs font-medium transition-all duration-200" 
          onClick={signOut}
        >
          <span className="font-sans">Log out</span>
          <LogOut size={16} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
}
