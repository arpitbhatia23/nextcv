"use client";
import React from "react";
import { m, useMotionValue, animate } from "framer-motion";
import { useEffect, useState, useRef, useId } from "react";

// Testimonial data - Expanded for infinite scroll
const testimonials = [
  {
    name: "Priya Sharma",
    title: "Software Engineer",
    text: "Best ₹100 I've ever spent! Got my dream job at a tech startup within 2 weeks of using Next CV.",
    initials: "PS",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Rahul Patel",
    title: "Marketing Manager",
    text: "Super easy, my resume was ready in 5 minutes. The AI suggestions were spot-on for my industry.",
    initials: "RP",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Anita Singh",
    title: "Fresh Graduate",
    text: "As a fresh graduate, I was struggling with resume format. Next CV made it so professional!",
    initials: "AS",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Vikram Malhotra",
    title: "Project Manager",
    text: "The ATS scoring feature is a game changer. I realized why my old resume wasn't getting picked.",
    initials: "VM",
    color: "bg-blue-100 text-blue-700",
  },
];

const stats = [
  { number: 1200, title: "Happy Users", color: "text-indigo-600" },
  { number: 97, title: "Success Rate (%)", color: "text-emerald-600" },
  { number: 4.9, title: "Average Rating", color: "text-red-500" },
];

function AnimatedCounter({ to, className }) {
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
    <span className={`text-4xl sm:text-5xl font-bold ${className}`}>
      {display}
    </span>
  );
}

export default function TestimonialCarousel() {
  const id = useId();
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.scrollWidth / 3); // Divided by duplication factor
    }
  }, []);

  useEffect(() => {
    let frame;
    const speed = 0.5;
    function animateScroll() {
      let current = x.get();
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
      className="py-24 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Stop Guessing.{" "}
            <span className="text-indigo-600">Start Getting Interviews.</span>
          </h2>
          <p className="text-lg text-slate-600">
            Join thousands of professionals who improved their career with Next
            CV.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden relative -mx-6 lg:-mx-8">
          {/* Fade Edges */}
          <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <m.div
            ref={containerRef}
            className="flex w-max gap-8 px-8 py-4"
            style={{ x }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map(
              (item, idx) => (
                <div
                  key={`${id}-${idx}`}
                  className="w-87.5 bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 mb-4 text-amber-400 text-lg">
                      ★★★★★
                    </div>
                    <p className="text-slate-700 leading-relaxed mb-6">
                      "{item.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${item.color}`}
                    >
                      {item.initials}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-sm">
                        {item.name}
                      </span>
                      <p className="text-slate-500 text-xs">{item.title}</p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </m.div>
        </div>

        {/* Stats Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-8 bg-white rounded-3xl border border-slate-100 shadow-sm"
            >
              <AnimatedCounter to={stat.number} className={stat.color} />
              <p className="text-slate-500 font-medium mt-2 uppercase tracking-wide text-sm">
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        {/* Final Urgency CTA */}
        <div className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-indigo-600/20 blur-3xl rounded-full" />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">🔥 Limited Time Offer</h3>
            <p className="text-slate-300 mb-0">
              Get your professional ATS resume today for just{" "}
              <span className="text-white font-bold text-lg">₹100</span>. No
              hidden fees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
