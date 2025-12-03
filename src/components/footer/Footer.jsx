"use client";
import React from "react";
import Logo2 from "../Logo2";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { scroller } from "react-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";

function IconButton({ label, icon }) {
  return (
    <button
      className="w-9 h-9 bg-gray-700 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors"
      aria-label={label}
    >
      {icon}
    </button>
  );
}

export const Footer = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  const scrollTo = (section) => {
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -70, // adjust for navbar
    });
  };

  // UPDATED footerLinks with Home and Blogs
  const footerLinks = [
    {
      label: "Home",
      // This handles smooth scrolling only on the landing page,
      // or a navigation if the user is elsewhere.
      action: () => (isLandingPage ? scrollTo("Hero") : null),
      route: "/",
    },
    { label: "Blogs", route: "/blogs" }, // Added Blogs link
    { label: "Privacy Policy", route: "/privacyPolicy" },
    { label: "Terms of Service", route: "/terms" },
  ];

  const renderFooterLink = (item) => {
    // If the link has an action (like Home/scroll to top), handle it
    if (item.action && isLandingPage) {
      return (
        <button
          onClick={item.action}
          className="hover:underline text-left w-full"
        >
          {item.label}
        </button>
      );
    }
    // Standard Link
    return (
      <Link href={item.route} className="hover:underline">
        {item.label}
      </Link>
    );
  };

  return (
    <footer className="bg-gray-900 text-white px-6 py-12 space-y-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-around gap-8">
        <div className="space-y-4 max-w-md">
          <Logo2 className="text-white" color="white" size={100} />
          {/* Keyword Addition */}
          <p className="text-gray-200">
            Build professional, ATS friendly resume with AI in minutes. Join
            thousands of successful job seekers who landed their dream jobs with
            Next CV.
          </p>
          <div className="flex space-x-4 mt-4">
            <IconButton icon={<FaFacebookF />} label="Facebook" />
            <IconButton icon={<FaTwitter />} label="Twitter" />
            <IconButton icon={<FaLinkedinIn />} label="LinkedIn" />
            <IconButton icon={<FaInstagram />} label="Instagram" />
          </div>
        </div>

        <div className="flex flex-wrap md:flex-nowrap gap-28 text-sm pr-20">
          <div>
            <h2 className="font-semibold mb-3">Quick Links</h2>
            <ul className="space-y-2 text-gray-200">
              {footerLinks.map((item) => (
                <li key={item.label}>{renderFooterLink(item)}</li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h2 className="font-semibold mb-3">Contact</h2>
            <ul className="space-y-2 text-gray-200">
              <li>
                <a
                  href="mailto:help@nextcv.in"
                  className="hover:underline"
                  aria-label="Email help@nextcv.in"
                >
                  help@nextcv.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+918628047655"
                  className="hover:underline"
                  aria-label="Call 8628047655"
                >
                  +91 86280 47655
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Resumes Created", value: "1 K+", color: "text-indigo-400" },
          { label: "Success Rate", value: "95%", color: "text-green-400" },
          { label: "Average Time", value: "2 min", color: "text-purple-400" },
          { label: "Fixed Price", value: "100", color: "text-cyan-400" },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-gray-800 p-6 rounded-lg text-center"
          >
            <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
            <p className="text-gray-200 mt-2">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-200 border-t border-gray-800 pt-6 gap-4 sm:gap-0">
        <p>© 2024 Next CV. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span>Made with</span> <span className="text-red-500">❤️</span>
          <span>by Aurpit & Tamanna</span>
        </div>
        <div className="flex space-x-4">
          {renderFooterLink({
            label: "Privacy Policy",
            route: "/privacyPolicy",
          })}
          {renderFooterLink({ label: "Terms of Service", route: "/terms" })}
        </div>
      </div>
    </footer>
  );
};
