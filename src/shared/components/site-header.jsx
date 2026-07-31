"use client";
import { Separator } from "@/shared/components/ui/separator";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SiteHeader() {
  return (
    <header
      className="flex h-(--header-height) shrink-0 items-center gap-2 p-4 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
      style={{ backgroundColor: "#F7F7F5", borderColor: "#E4E2DC" }}
    >
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" style={{ color: "#1C2333" }} />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
          style={{ backgroundColor: "#E4E2DC" }}
        />

        <div
          className="ml-auto flex items-center gap-2 cursor-pointer border px-3 py-1.5 transition-colors"
          style={{ borderColor: "#E4E2DC", color: "#1C2333" }}
          onClick={signOut}
        >
          <span className="font-mono text-[11px] tracking-widest">LOG OUT</span>
          <LogOut size={16} strokeWidth={1.75} />
        </div>
      </div>
    </header>
  );
}
