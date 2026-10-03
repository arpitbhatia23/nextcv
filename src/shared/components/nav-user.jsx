"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";
import { ChevronsUpDown } from "lucide-react";

export function NavUser({ user }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="rounded-xl hover:bg-[#F1F0EB] data-[state=open]:bg-[#F1F0EB]">
              <Avatar className="h-8 w-8 rounded-xl border border-[#E3E2DC]">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="rounded-xl bg-[#465B9E] text-white font-sans text-xs font-semibold">
                  {user?.name ? user.name[0] + user.name[1] : "cn"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-sans text-sm font-medium text-[#17201C]">{user?.name}</span>
                <span className="truncate font-sans text-xs text-[#5B625C]">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
