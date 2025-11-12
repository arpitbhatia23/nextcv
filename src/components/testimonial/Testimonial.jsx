"use client";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { Card } from "../ui/card";
import Footer from "../footer/Footer";

// Testimonial data
const testimonials = [
  {
    name: "Priya Sharma",
    title: "Software Engineer",
    text: "Best ₹100 I've ever spent! Got my dream job at a tech startup within 2 weeks of using Next CV.",
    color: "from-purple-100 to-blue-100",
  },
  {
    name: "Rahul Patel",
    title: "Marketing Manager",
    text: "Super easy, my resume was ready in 5 minutes. The AI suggestions were spot-on for my industry.",
    color: "from-green-100 to-green-200",
  },
  {
    name: "Anita Singh",
    title: "Fresh Graduate",
    text: "As a fresh graduate, I was struggling with resume format. Next CV made it so professional!",
    color: "from-pink-100 to-purple-100",
  },
];

// Stats data
const stats = [
  {
    number: 1200,
    title: "Happy Users",
    color: "text-blue-600",
  },
  {
    number: 97,
    title: "Success Rate",
    color: "text-green-600",
  },
  {
    number: 4.9,
    title: "Average Rating",
    color: "text-purple-600",
  },
];

// 🔢 Animated Counter Component
function AnimatedCounter({ to, className, format }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2,
      onUpdate: (latest) => {
        setDisplay(to % 1 !== 0 ? latest.toFixed(1) : Math.round(latest));
      },
    });
    return controls.stop;
  }, [to]);

  return (
    <motion.div className={`text-3xl font-bold ${className}`}>
      {format ? format(display) : display}
    </motion.div>
  );
}

export default function TestimonialCarousel() {
  const id = useId();
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  // Calculate width of all testimonials (once mounted)
  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 2); // since we duplicate twice
    }
  }, []);

  // Animate x for infinite scroll
  useEffect(() => {
    let frame;
    const speed = 0.5; // px per frame, adjust for speed

    function animateScroll() {
      let current = x.get();
      // When scrolled past half, reset to 0
      if (Math.abs(current) >= width) {
        x.set(0);
      } else {
        x.set(current - speed);
      }
      frame = requestAnimationFrame(animateScroll);
    }
    frame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(frame);
  }, [width, x]);

  return (
    <section
      name="Testimonial"
      className="bg-white py-12 overflow-hidden w-full dark:bg-black"
    >
      {/* Header */}
      <div className="text-center">
        <AnimatedCounter
          to={1000}
          className="text-4xl font-bold text-gray-800 dark:text-white"
          format={(val) =>
            val >= 1000 ? `${Math.round(val / 100) / 10}K` : val
          }
        />{" "}
        <p className="text-lg text-gray-600 mt-2 dark:text-gray-300">
          Join thousands of satisfied users who landed their dream jobs with
          Next CV.
        </p>
      </div>

      <div className="mt-10 overflow-hidden relative">
        <motion.div
          ref={containerRef}
          className="flex w-max gap-6"
          style={{ x }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map(
            (item, idx) => (
              <div
                key={`${id}-${item.name}-${idx}`}
                className={`min-w-[300px] max-w-[300px] bg-gradient-to-r ${item.color} p-6 rounded-xl shadow-md`}
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">{item.title}</p>
                  </div>
                </div>
                <div className="text-yellow-500 text-xl mb-2">★★★★★</div>
                <p className="text-sm text-gray-700">"{item.text}"</p>
              </div>
            )
          )}
        </motion.div>
      </div>

      {/* Stats Section */}
      <Card className="bg-gray-50 rounded-xl p-8 mt-10">
        <div className="flex justify-center gap-16 flex-wrap">
          {stats.map(({ number, title, color }) => (
            <div key={title} className="text-center">
              <AnimatedCounter to={number} className={color} />
              <p className="text-gray-600 mt-2">{title}</p>
            </div>
          ))}
        </div>

        <Card className="bg-amber-700 rounded-3xl mx-auto px-6 py-4 text-white font-bold text-center w-full max-w-[90%] sm:max-w-xl md:max-w-2xl lg:max-w-3xl shadow-lg">
          <h2>🔥 Limited Time: Get started for just ₹100 - No hidden fees!</h2>
        </Card>
      </Card>
    </section>
  );
}
