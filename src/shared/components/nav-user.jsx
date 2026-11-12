"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";

import { ChevronsUpDown } from "lucide-react";

export function NavUser({ user }) {
  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : "CN";

  return (
    <SidebarMenu className="w-full">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              tooltip={user?.name || "Guest user"}
              className="
                h-12 w-full min-w-0 justify-start gap-3 px-2
                group-data-[collapsible=icon]:size-10!
                group-data-[collapsible=icon]:min-w-10!
                group-data-[collapsible=icon]:p-1!
                group-data-[collapsible=icon]:justify-center!
              "
            >
              <Avatar
                className="
                size-8 shrink-0 overflow-hidden rounded-full
                [&>img]:size-full [&>img]:object-cover
                group-data-[collapsible=icon]:size-8!
              "
              >
                <AvatarImage src={user?.image || ""} alt={user?.name || "User"} />

                <AvatarFallback className="bg-[#344B38] text-white text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="grid min-w-0 flex-1 text-left text-sm group-data-[collapsible=icon]:hidden">
                <span className="truncate font-medium">{user?.name || "Guest user"}</span>

                <span className="truncate text-xs text-[#5A665B]">{user?.email || ""}</span>
              </div>

              <ChevronsUpDown className="ml-auto size-4 shrink-0 group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right" align="end" className="w-56">
            <div className="px-2 py-2">
              <p className="text-sm font-medium">{user?.name || "Guest user"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
