"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";

import Logo2 from "../Logo2";
import { Button } from "./button";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
           {/* Color changed to slate-900 (dark) for light bg */}
          <Logo2 color="#0f172a" size={80} /> 
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-8">
             {/* Add future nav links here if needed */}
             
            <NavigationMenuItem>
              <Button
                className="px-6 py-2.5 text-sm font-semibold rounded-lg shadow-lg shadow-indigo-500/20 
                  bg-indigo-600 text-white 
                  hover:bg-indigo-700 hover:shadow-indigo-500/30 transition-all duration-300"
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
