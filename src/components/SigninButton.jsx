"use client";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { scroller } from "react-scroll";

function SigninButton() {
  const scrollTo = (name) => {
    scroller.scrollTo(name, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -80, // useful if you have a fixed navbar
    });
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button
          onClick={() => signIn("google")}
          className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-xl text-lg hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300 flex items-center justify-center gap-2 group"
        >
          Create Your Resume
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => scrollTo("Templates")}
          className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-lg hover:bg-slate-50 transition-all duration-300 flex items-center justify-center gap-2"
        >
          View Templates
        </button>
      </motion.div>
    </>
  );
}

export default SigninButton;
