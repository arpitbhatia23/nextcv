"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { LazyMotion, m, useMotionValue, domAnimation } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Fresher · Chandigarh",
    text: "I wanted a clear format for my first resume. The template made it easier to organize my projects, skills and education.",
    initials: "RS",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Priya Verma",
    role: "Software Developer · Bengaluru",
    text: "I liked being able to edit the resume and adjust the layout without repeatedly fixing spacing and sections.",
    initials: "PV",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Amanpreet Singh",
    role: "Final-year Student · Punjab",
    text: "The builder was useful for putting my college projects and technical skills into a clean resume format.",
    initials: "AS",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Sneha Patel",
    role: "Job Seeker · Ahmedabad",
    text: "The resume review helped me understand which sections and keywords I should improve before applying.",
    initials: "SP",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Arjun Mehta",
    role: "Frontend Developer · Pune",
    text: "I could keep the layout consistent while changing resume details for different applications.",
    initials: "AM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Neha Kumari",
    role: "Recent Graduate · Jaipur",
    text: "It helped me bring my education, skills and projects together into a simple resume for entry-level roles.",
    initials: "NK",
    color: "bg-purple-100 text-purple-700",
  },
];

const stats = [
  { display: "Free", title: "Build and edit", color: "text-indigo-800" },
  { display: "₹49", title: "Starting download price", color: "text-emerald-800" },
  { display: "No", title: "Mandatory subscription", color: "text-slate-800" },
];

export default function TestimonialCarousel() {
  const id = useId();
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const measure = () => setWidth(container.scrollWidth / 3);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!width || paused) return undefined;

    let frame;
    const animateScroll = () => {
      const current = x.get();
      x.set(Math.abs(current) >= width ? 0 : current - 0.45);
      frame = requestAnimationFrame(animateScroll);
    };

    frame = requestAnimationFrame(animateScroll);
    return () => cancelAnimationFrame(frame);
  }, [width, paused, x]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-label="Example NextCV testimonials"
        className="border-t border-slate-200 bg-slate-50 py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
              Example user stories
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl">
              Make resume building <span className="text-[#5268a8]">a little simpler.</span>
            </h2>
          </div>

          <div
            className="relative -mx-5 overflow-hidden sm:-mx-8 lg:-mx-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-slate-50 to-transparent" />

            <m.div
              ref={containerRef}
              className="flex w-max gap-5 px-5 py-4 sm:px-8 lg:px-10"
              style={{ x }}
            >
              {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                <article
                  key={`${id}-${idx}`}
                  className="flex min-h-56 w-80 shrink-0 flex-col justify-between border border-slate-200 bg-white p-7 shadow-lg shadow-slate-200/50"
                >
                  <div>
                    <div
                      className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold ${item.color}`}
                    >
                      {item.initials}
                    </div>
                    <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{item.role}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">“{item.text}”</p>
                  </div>
                </article>
              ))}
            </m.div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-3">
            {stats.map(stat => (
              <div
                key={stat.title}
                className="border border-slate-100 bg-white p-5 text-center shadow-sm"
              >
                <span className={`text-lg font-bold ${stat.color}`}>{stat.display}</span>
                <p className="mt-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 border border-slate-800 bg-slate-900 p-8 text-center text-white sm:p-10">
            <h3 className="text-base font-bold">Ready to work on your resume?</h3>
            <p className="mt-3 text-sm text-slate-300">
              Start building for free. Download when you're ready, starting at ₹49.
            </p>
            <a
              href="/dashboard/builder"
              className="mt-5 inline-flex items-center justify-center bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Build My Resume <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
