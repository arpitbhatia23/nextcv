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
import Logo2 from "../Logo2";
import { scroller } from "react-scroll";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const menuItems = [
    "Home",
    "Why Choose Us",
    "Templates",
    "How It Works",
    "Get Started",
    "Testimonial",
  ];

  const scrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <nav className="w-full bg-white dark:bg-black px-4 py-1 shadow-md fixed z-10">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-pink-purple-gradient">
          <Logo2 />
        </div>

        {/* Hamburger (Mobile) */}
        <div className="flex md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Desktop Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center space-x-6">
            {menuItems.map((item) => (
              <NavigationMenuItem key={item}>
                <NavigationMenuLink asChild>
                  {!isLandingPage ? (
                    <Link href="/">{item}</Link>
                  ) : (
                    <a
                      href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}
                      onClick={(e) => {
                        e.preventDefault();
                        console.log(item);
                        scrollTo(item);
                      }}
                    >
                      {item}
                    </a>
                  )}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-4 px-4 pb-4">
          {menuItems.map((item) => (
            <div key={item}>
              {!isLandingPage ? (
                <Link href="/" onClick={() => setMenuOpen(false)}>
                  {item}
                </Link>
              ) : (
                <a
                  href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setMenuOpen(false);
                    scrollTo(item);
                  }}
                >
                  {item}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
