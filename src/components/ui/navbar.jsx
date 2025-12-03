"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

import Logo2 from "../Logo2";

import { Button } from "./button";
import { signIn } from "next-auth/react";

export default function Nav() {
  return (
    // FIX: Changed background to dark, semi-transparent, added better padding/shadow, and set text to white
    <nav className="w-full bg-gray-900/50 backdrop-blur-md px-4 py-3 shadow-xl fixed z-50 text-white border-b border-white/10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold">
          {/* FIX: Changed logo color to white for visibility on dark background */}
          <Logo2 color="white" size={80} />
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className=" md:flex">
          <NavigationMenuList className="flex items-center space-x-6">
            <NavigationMenuItem>
              <Button
                // FIX: Inverted button styling to be a light ghost button on a dark background
                className="px-6 py-2 text-sm font-semibold rounded-lg transition-all duration-300 shadow-xl 
                  bg-transparent text-white border border-white/50 
                  hover:bg-white hover:text-gray-900 hover:shadow-white/40"
                onClick={() => signIn("google")}
              >
                Get Started
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
