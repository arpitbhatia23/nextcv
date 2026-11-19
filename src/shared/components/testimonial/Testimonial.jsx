"use client";

import { useEffect, useState, useRef, useId } from "react";

import { LazyMotion, m, useMotionValue, animate, domAnimation } from "framer-motion";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Fresher · Chandigarh",
    text: "I was struggling to make my first resume. The templates made it much easier to organize my projects, skills and education.",
    initials: "RS",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    name: "Priya Verma",
    role: "Software Developer · Bengaluru",
    text: "I liked that I could make changes without spending too much time fixing formatting. It kept the process simple.",
    initials: "PV",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Amanpreet Singh",
    role: "Final-year Student · Punjab",
    text: "Useful for getting my resume ready for placements. I could put my college projects and technical skills into a proper format.",
    initials: "AS",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Sneha Patel",
    role: "Job Seeker · Ahmedabad",
    text: "The resume review gave me a better idea of what I needed to improve before applying for jobs.",
    initials: "SP",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Arjun Mehta",
    role: "Frontend Developer · Pune",
    text: "Clean layouts and easy editing. I didn't have to keep adjusting spacing and sections manually.",
    initials: "AM",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Neha Kumari",
    role: "Recent Graduate · Jaipur",
    text: "I wanted a simple resume for entry-level roles. It helped me bring everything together without overcomplicating it.",
    initials: "NK",
    color: "bg-purple-100 text-purple-700",
  },
];

const stats = [
  {
    number: 1350,
    suffix: "+",
    title: "Users",
    color: "text-indigo-800",
  },
  {
    number: 49,
    prefix: "₹",
    title: "Starting price",
    color: "text-emerald-800",
  },
  {
    display: "No",
    title: "Subscriptions",
    color: "text-slate-800",
  },
];

function AnimatedCounter({ to, prefix = "", suffix = "", className = "" }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(count, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: latest => {
        setDisplay(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [to, count]);

  return (
    <span className={`text-sm sm:text-lg font-bold ${className}`}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function TestimonialCarousel() {
  const id = useId();
  const containerRef = useRef < HTMLDivElement > null;

  const [width, setWidth] = useState(0);
  const [paused, setPaused] = useState(false);

  const x = useMotionValue(0);

  // Measure one copy of the repeated content
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      setWidth(container.scrollWidth / 3);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  // Infinite marquee
  useEffect(() => {
    if (!width || paused) return;

    let frame;
    const speed = 0.45;

    const animateScroll = () => {
      const current = x.get();

      if (Math.abs(current) >= width) {
        x.set(0);
      } else {
        x.set(current - speed);
      }

      frame = requestAnimationFrame(animateScroll);
    };

    frame = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(frame);
  }, [width, paused, x]);

  return (
    <LazyMotion features={domAnimation}>
      <section
        aria-label="NextCV features and user information"
        className="py-24 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
              Make resume building <span className="text-indigo-600">a little simpler.</span>
            </h2>

            <p className="mx-auto max-w-2xl text-xs sm:text-sm leading-6 text-slate-600">
              Create your resume, explore different layouts and review your content before applying
              for your next opportunity.
            </p>
          </div>

          {/* Feature Carousel */}
          <div
            className="overflow-hidden relative -mx-6 lg:-mx-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {/* Fade edges */}
            <div className="absolute top-0 left-0 w-24 h-full bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="absolute top-0 right-0 w-24 h-full bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <m.div ref={containerRef} className="flex w-max gap-8 px-8 py-4" style={{ x }}>
              {[...testimonials, ...testimonials, ...testimonials].map((item, idx) => (
                <article
                  key={`${id}-${idx}`}
                  className="w-87.5 shrink-0 bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col justify-between min-h-61.25"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm mb-6 ${item.color}`}
                    >
                      {item.initials}
                    </div>

                    <h3 className="text-slate-900 font-semibold text-sm mb-1">{item.name}</h3>

                    <p className="text-xs text-slate-500 mb-3">{item.role}</p>

                    <p className="text-slate-600 text-sm leading-7">{item.text}</p>
                  </div>
                </article>
              ))}
            </m.div>
          </div>

          {/* Stats */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-3">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="text-center p-5 bg-white rounded-xl border border-slate-100 shadow-sm"
              >
                {stat.number !== undefined ? (
                  <AnimatedCounter
                    to={stat.number}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className={stat.color}
                  />
                ) : (
                  <span className={`text-sm sm:text-lg font-bold ${stat.color}`}>
                    {stat.display}
                  </span>
                )}

                <p className="text-slate-500 font-medium mt-2 uppercase tracking-wide text-xs sm:text-sm">
                  {stat.title}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-600/20 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 text-center">
              <h3 className="text-sm sm:text-base font-bold mb-3">Ready to work on your resume?</h3>

              <p className="text-slate-300 mb-5 text-xs sm:text-sm">
                Start building for free. Download when you're ready, with pricing starting at{" "}
                <span className="text-white font-bold">₹49</span>. No subscription.
              </p>

              <a
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Build My Resume
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
