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
            <SidebarMenuButton
              size="lg"
              className="hover:bg-[#E8EFE5] data-[state=open]:bg-[#E8EFE5] transition-colors"
            >
              <Avatar className="h-8 w-8 border border-[#DDE2D9]">
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback className="bg-[#344B38] text-white font-sans text-xs font-semibold">
                  {user?.name ? user.name[0] + user.name[1] : "cn"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-sans text-sm font-medium text-[#1C261E]">
                  {user?.name}
                </span>
                <span className="truncate font-sans text-xs text-[#5A665B]">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-[#456B4A]" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
