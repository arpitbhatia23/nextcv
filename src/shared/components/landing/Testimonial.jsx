const testimonials = [
  {
    quote:
      "The resume builder is simple to use. I was able to put my details together without spending too much time on formatting.",
    initials: "A",
    role: "Job seeker",
  },
  {
    quote:
      "The templates look clean. I would like a few more customization options, but overall it does the job.",
    initials: "R",
    role: "Early-career professional",
  },
  {
    quote:
      "Useful for getting started with a resume. Some sections could be explained a little better for freshers.",
    initials: "S",
    role: "Recent graduate",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#F8F9FF] px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium text-indigo-600">Community feedback</p>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Made for real job seekers.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            A simpler way to put your experience, skills and projects together into a resume.
          </p>
        </div>

        {/* Rating summary */}
        <div className="mb-7 flex items-center gap-3">
          <span className="text-2xl font-semibold text-slate-900">3.5</span>

          <div>
            <div className="flex gap-0.5 text-amber-500">
              {[1, 2, 3].map(i => (
                <span key={i}>★</span>
              ))}
              <span>◐</span>
              <span className="text-slate-300">★</span>
            </div>

            <p className="text-xs text-slate-500">Average user experience rating</p>
          </div>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200
                bg-white p-5 transition duration-200
                hover:border-indigo-200 hover:shadow-sm"
            >
              {/* Quote icon */}
              <div className="mb-4 text-xl font-medium text-indigo-200">“</div>

              <p className="text-sm leading-7 text-slate-600">{item.quote}</p>

              {/* User */}
              <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                <div
                  className="flex h-9 w-9 items-center justify-center
                    rounded-full bg-[#EEF2FF] text-xs font-semibold
                    text-indigo-600"
                >
                  {item.initials}
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">{item.role}</p>
                  <p className="text-xs text-slate-400">NextCV user</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Built to make resume creation a little less stressful.
          </p>

          <a
            href="/dashboard"
            className="text-sm font-medium text-indigo-600
              transition hover:text-indigo-700"
          >
            Create your resume →
          </a>
        </div>
      </div>
    </section>
  );
}
