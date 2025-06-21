"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const random = (min, max) => Math.random() * (max - min) + min;
const shapes = ["circle", "square", "triangle", "star"];

const generateConfetti = (count = 150) =>
  Array.from({ length: count }).map((_, i) => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    return {
      id: i,
      x: random(-180, 180),
      y: random(-180, 180),
      rotate: random(0, 360),
      size: random(10, 16),
      delay: random(0, 0.3),
      color: `hsl(${random(0, 360)}, 100%, 70%)`,
      shape,
    };
  });

export default function ConfettiBurst({ origin }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    setConfetti(generateConfetti(50));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 top-0">
      {confetti.map(({ id, x, y, rotate, size, delay, color, shape }) => (
        <motion.div
          key={id}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
          animate={{ x, y, opacity: 0, scale: 0.8, rotate }}
          transition={{ duration: 1.6, delay, ease: "easeOut" }}
          style={{
            width: size,
            height: size,
            backgroundColor: shape === "star" ? "transparent" : color,
            color: color,
            position: "absolute",
            top: origin?.y ?? "50%",
            left: origin?.x ?? "50%",
            transform: "translate(-50%, -50%)",
            borderRadius:
              shape === "circle" ? "9999px" : shape === "square" ? "4px" : "0",
            clipPath:
              shape === "triangle"
                ? "polygon(50% 0%, 0% 100%, 100% 100%)"
                : shape === "star"
                ? "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                : "none",
          }}
        />
      ))}
    </div>
  );
}
