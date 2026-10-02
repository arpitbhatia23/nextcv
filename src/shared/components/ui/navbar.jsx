"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import BuildButton from "@/shared/components/landing/BuildButton";

const links = [
  { label: "Product", href: "/product" },
  { label: "Templates", href: "/templates" },
  { label: "ATS Checker", href: "/ats-resume-checker" },
  { label: "Career Guides", href: "/career" },
  { label: "Pricing", href: "/pricing" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isCurrentRoute = href => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="NextCV home"
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5268b6]"
        >
          <Image
            src="/logos/nextcvlogo.png"
            alt=""
            width={120}
            height={48}
            unoptimized
            className="h-10 w-24 object-contain"
          />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {links.map(link => (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isCurrentRoute(link.href) ? "page" : undefined}
              className={`text-xs transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isCurrentRoute(link.href) ? "font-semibold text-primary" : "font-medium text-muted-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <BuildButton className="hidden h-11 px-4 text-xs md:inline-flex">
          Build My Resume
        </BuildButton>
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="outline"
            size="icon"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
            className="order-1 border-border text-foreground hover:bg-surface-muted"
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Menu aria-hidden="true" className="h-5 w-5" />
            )}
          </Button>
          <BuildButton className="order-2 h-11 px-3 text-xs">Build Resume</BuildButton>
        </div>
      </div>
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 py-3 md:hidden"
        >
          <div className="mx-auto grid max-w-7xl gap-1 sm:px-4">
            {links.map(link => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isCurrentRoute(link.href) ? "page" : undefined}
                className={`rounded-lg px-3 py-3 text-sm hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isCurrentRoute(link.href) ? "font-semibold text-primary" : "font-medium text-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
