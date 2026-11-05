const audiences = [
  {
    title: "College students",
    detail: "Give coursework, campus activities and academic projects a clear place.",
  },
  {
    title: "BCA and BTech graduates",
    detail: "Organize technical skills, final-year projects, internships and certifications.",
  },
  {
    title: "First-time applicants",
    detail: "Build a focused fresher resume even when your experience is mostly project work.",
  },
  {
    title: "IT and software developers",
    detail: "Present relevant languages, tools and development experience for each role.",
  },
  {
    title: "Non-IT professionals",
    detail:
      "Showcase education, practical skills and experience across business and service roles.",
  },
  {
    title: "Experienced job seekers",
    detail: "Bring career history and role-relevant achievements into a clean, readable format.",
  },
];

export default function AudienceSection() {
  return (
    <section
      aria-labelledby="audiences-heading"
      className="border-y border-[#e5e2d9] bg-[#f0efe9] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5268a8]">
            For every career stage
          </p>
          <h2
            id="audiences-heading"
            className="mt-3 font-serif text-3xl leading-tight text-[#17201C] sm:text-4xl"
          >
            Start with the experience you already have.
          </h2>
          <p className="mt-4 text-sm leading-6 text-[#626962]">
            From a college project to years in a profession, organize relevant evidence for the job
            you want to apply for.
          </p>
        </div>
        <div className="mt-8 grid gap-x-7 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((audience, index) => (
            <article key={audience.title} className="border-t border-[#d8d6ce] py-5">
              <p className="font-mono text-xs text-[#7b8179]">0{index + 1}</p>
              <h3 className="mt-3 text-sm font-semibold text-[#202a23]">{audience.title}</h3>
              <p className="mt-2 text-xs leading-5 text-[#626962]">{audience.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
