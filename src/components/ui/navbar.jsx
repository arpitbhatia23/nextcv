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
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 20;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-sm border-b border-slate-200 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 lg:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold flex items-center">
          <Logo2 color="#0f172a" size={80} />
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="flex">
          <NavigationMenuList className="flex items-center space-x-8">
            <NavigationMenuItem>
              <Button
                className="px-6 py-2.5 text-sm font-semibold rounded-lg
                  bg-indigo-600 text-white
                  hover:bg-indigo-700 transition-colors duration-200"
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
