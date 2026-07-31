"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/shared/components/ui/sidebar";

export function NavUser({ user }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="rounded-none border-t data-[state=open]:bg-[#F7F7F5]"
              style={{ borderColor: "#E4E2DC" }}
            >
              <Avatar className="h-8 w-8 rounded-none border" style={{ borderColor: "#E4E2DC" }}>
                <AvatarImage src={user?.image} alt={user?.name} />
                <AvatarFallback
                  className="rounded-none font-mono text-xs"
                  style={{ backgroundColor: "#1C2333", color: "#FFFFFF" }}
                >
                  {user?.name[0] + user?.name[1] || "cn"}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium" style={{ color: "#1C2333" }}>
                  {user?.name}
                </span>
                <span className="truncate font-mono text-[11px]" style={{ color: "#6B7280" }}>
                  {user?.email}
                </span>
              </div>

              {/* {isAdmin && <IconDotsVertical className="ml-auto size-4" />} */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          {/* {isAdmin && (
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <IconUserCircle />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconCreditCard />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <IconNotification />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          )} */}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
