"use client";
import React from "react";
import Logo2 from "../Logo2";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
function IconButton(props) {
  return (
    <button
      className="w-9 h-9 bg-gray-700 flex items-center justify-center rounded-full hover:bg-gray-600 transition-colors"
      aria-label={props.label}
    >
      {props.icon}
    </button>
  );
}

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12 space-y-12">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-around gap-8">
        <div className="space-y-4 max-w-md">
          <Logo2 className="text-white " color="white" size={100} />
          <p className="text-gray-400">
            Build professional, ATS-optimized resumes with AI in minutes. Join
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
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Resume Tips</a>
              </li>
              <li>
                <a href="#">Career Advice</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      {/* <div className="bg-gray-800 p-6 md:p-8 rounded-xl space-y-4">
                <h3 className="font-semibold text-lg">Stay Updated</h3>
                <p className="text-gray-400">Get career tips and resume advice delivered to your inbox.</p>
                <form className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="bg-gray-700 border border-gray-600 rounded px-4 py-2 text-white w-full sm:w-auto"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2 rounded"
                    >
                        Subscribe
                    </button>
                </form>
            </div> */}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { label: "Resumes Created", value: "1 K+", color: "text-indigo-400" },
          { label: "Success Rate", value: "95%", color: "text-green-400" },
          { label: "Average Time", value: "2 min", color: "text-purple-400" },
          { label: "Fixed Price", value: "100", color: "text-cyan-400" },
        ].map(function (item) {
          return (
            <div
              key={item.label}
              className="bg-gray-800 p-6 rounded-lg text-center"
            >
              <h3 className={"text-2xl font-bold " + item.color}>
                {item.value}
              </h3>
              <p className="text-gray-400 mt-2">{item.label}</p>
            </div>
          );
        })}
      </div>

      {/* Footer Bottom */}
      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 border-t border-gray-800 pt-6 gap-4 sm:gap-0">
        <p>© 2024 Next CV. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span>Made with</span> <span className="text-red-500">❤️</span>{" "}
          <span>by Aurpit & Tamanna</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
