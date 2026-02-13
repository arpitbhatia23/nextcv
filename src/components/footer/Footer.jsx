import React from "react";
import Link from "next/link";
import Logo2 from "../Logo2";
import { SaasHuntBadge } from "../Saashunt";
import { FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa";

// Social Links Data
const socialLinks = [
  { icon: <FaTwitter />, href: "#", label: "Twitter" },
  { icon: <FaGithub />, href: "#", label: "GitHub" },
  { icon: <FaLinkedinIn />, href: "#", label: "LinkedIn" },
  { icon: <FaInstagram />, href: "#", label: "Instagram" },
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Templates", href: "/templates" },
      { label: "Examples", href: "/examples" },
      { label: "Pricing", href: "/pricing" },
      { label: "AI Writer", href: "/ai-writer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about-us" },
      { label: "Blog", href: "/blogs" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const stats = [
  { value: "10K+", label: "Resumes Built" },
  { value: "95%", label: "Success Rate" },
  { value: "< 5m", label: "Time to Build" },
  { value: "Free", label: "To Start" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#020617] text-white border-t border-slate-900 font-sans">
      {/* Stats Strip - Refined */}
      <div className="border-b border-slate-900 bg-[#0B0F1A]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center md:border-r border-slate-800 last:border-0 relative"
              >
                {/* Mobile divider support could be added here if needed, but grid gap handles spacing */}
                <span className="text-2xl md:text-3xl font-bold text-white mb-1.5">
                  {stat.value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-slate-100">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link
              href="/"
              className="inline-block relative z-10"
              aria-label="NextCV Home"
            >
              <Logo2 size={60} color="white" ClassName="text-white" />
            </Link>
            <p className="text-white leading-relaxed max-w-sm text-sm">
              NextCV is the advanced AI-powered resume builder designed to help
              students and professionals create ATS-friendly resumes in minutes.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-indigo-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-indigo-500/20"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns (Span 8 -> 2+3+3) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerLinks.map((column, idx) => (
              <div key={idx} className="flex flex-col">
                <h3 className="text-white font-semibold mb-6">
                  {column.title}
                </h3>
                <ul className="space-y-4">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-indigo-400 transition-colors duration-200 block w-fit"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-slate-100 order-2 md:order-1">
            <span>
              &copy; {new Date().getFullYear()} NextCV. All rights reserved.
            </span>
          </div>

          <div className="order-1 md:order-2 grayscale hover:grayscale-0 transition-all duration-300">
            <SaasHuntBadge />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-100 order-3 md:order-3">
            <span>
              Made with <span className="text-red-500 animate-pulse">❤️</span>{" "}
              by Aurpit & Tamanna
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
