import React from "react";
import Logo2 from "../Logo2";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Link from "next/link";

function IconButton({ label, icon }) {
  return (
    <button
      className="w-10 h-10 bg-slate-800 text-slate-400 flex items-center justify-center rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-indigo-500/30"
      aria-label={label}
    >
      {icon}
    </button>
  );
}

export const Footer = () => {
  const footerLinks = [
    { label: "Home", route: "/" },
    { label: "Blogs", route: "/blogs" },
    { label: "About us", route: "/about-us" },
    { label: "Contact", route: "/contact" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", route: "/privacy-policy" },
    { label: "Terms of Service", route: "/terms" },
  ];

  const renderFooterLink = (item) => {
    return (
      <Link
        href={item.route}
        className="hover:text-indigo-400 transition-colors text-sm"
      >
        {item.label}
      </Link>
    );
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-6">
            <Logo2 className="text-white" color="white" size={90} />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              NextCV is the student-built AI resume builder making career tools
              accessible and affordable for everyone in India.
            </p>
            <div className="flex space-x-3 pt-2">
              <IconButton icon={<FaFacebookF />} label="Facebook" />
              <IconButton icon={<FaTwitter />} label="Twitter" />
              <IconButton icon={<FaLinkedinIn />} label="LinkedIn" />
              <IconButton icon={<FaInstagram />} label="Instagram" />
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Platform</h3>
            <ul className="space-y-4">
              {footerLinks.map((item) => (
                <li key={item.label}>{renderFooterLink(item)}</li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-4">
              {legalLinks.map((item) => (
                <li key={item.label}>{renderFooterLink(item)}</li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:help@nextcv.in"
                  className="hover:text-indigo-400 transition-colors block"
                >
                  help@nextcv.in
                </a>
              </li>
              <li>
                <span>+91 86280 47655</span>
              </li>
              <li>
                <span>India · Remote</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-slate-900 mb-8">
          {[
            {
              label: "Resumes Created",
              value: "10K+",
              color: "text-indigo-500",
            },
            { label: "Success Rate", value: "95%", color: "text-emerald-500" },
            { label: "Build Time", value: "< 5m", color: "text-amber-500" },
            { label: "Fixed Cost", value: "₹100", color: "text-blue-500" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wide mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Next CV. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>{" "}
            <span className="text-red-500 animate-pulse">❤️</span>{" "}
            <span>by Aurpit & Tamanna</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
