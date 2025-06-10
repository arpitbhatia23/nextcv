"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
export default function Home() {
  const [motionPath, setMotionPath] = useState(0);
  const pathref = useRef(null);
  useEffect(() => {
    if (pathref.current) {
      setMotionPath(pathref.current.getTotalLength());
    }
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <svg
          width="334"
          height="209"
          viewBox="0 0 334 209"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0 1H65V51H129V131H217V208H334"
            stroke="url(#beamGradient)"
          />
          <defs>
            <motion.linearGradient
              id="beamGradient"
              x1="0"
              y1="0"
              x2="100%"
              y2="0"
              gradientUnits="userSpaceOnUse"
              initial={{ x1: 0, x2: 0, y1: 100, y2: 80 }}
              animate={{
                x1: -100,
                x2: -100,
                y1: 0,
                y2: 80,
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <motion.stop
                animate={{ stopColor: ["#FF0080", "#00FFFF", "#FF0080"] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                }}
                stopOpacity="0"
              />
              <motion.stop
                animate={{ stopColor: ["#FF8C00", "#00FF00", "#FF8C00"] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 1,
                }}
              />
              <motion.stop
                offset="1"
                animate={{ stopColor: ["#FF0080", "#0000FF", "#FF0080"] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 2,
                }}
                stopOpacity="0"
              />
            </motion.linearGradient>
          </defs>
        </svg>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
