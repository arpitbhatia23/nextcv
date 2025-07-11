"use client";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
// import { Button } from './ui/button';
import Logo2 from "../Logo2";
import { scroller } from "react-scroll";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };
  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  return (
    <nav className="w-full bg-white dark:bg-black px-4 py-1 shadow-md fixed z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto ">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-purple-gradient">
          <Logo2 />
        </div>

        {/* Right side - Dark Mode Toggle + Hamburger (on mobile) */}

        <div className="flex md:hidden items-center gap-4">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden block"
          >
            <div className="sr-only">humburgermenu</div>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </div>
        </div>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-6">
            {[
              "Home",
              "Why Choose Us",
              "Templates",
              "How it work",
              "Get Started",
              "Testimonial",
            ].map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink asChild>
                  {!isLandingPage ? (
                    <Link href={"/"}> {item}</Link>
                  ) : (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        scrollTo(item);
                      }}
                    >
                      {item}
                    </a>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-4 px-4">
          {[
            "Home",
            "How it work",
            "Why Choose Us",
            "Templates",
            "Testimonial",
            "Get Started",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item === "Home" ? "" : item.toLowerCase()}`}
              className="text-lg font-medium hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
              aria-label={`redirect to ${item}`}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
