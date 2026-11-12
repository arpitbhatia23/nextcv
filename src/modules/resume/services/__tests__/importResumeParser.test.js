import { NextCVResumeSchema } from "../importResumeParser";

const resume = {
  name: "",
  phone_no: "",
  email: "",
  address: "",
  linkedin: "",
  github: "",
  portfolio: "",
  jobRole: "",
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [
    {
      title: "Project One",
      roleOrType: "",
      description: [],
      link: "",
      date: "",
      technologiesOrTopics: "React, Tailwind CSS, MongoDB",
      organization: "",
    },
    {
      title: "Project Two",
      roleOrType: "",
      description: [],
      link: "",
      date: "",
      technologiesOrTopics: ["Node.js", "PostgreSQL"],
      organization: "",
    },
  ],
  certificates: [],
};

describe("NextCVResumeSchema project topics", () => {
  it("accepts comma-separated strings and arrays", () => {
    const parsed = NextCVResumeSchema.parse(resume);

    expect(parsed.projects.map(project => project.technologiesOrTopics)).toEqual([
      ["React", "Tailwind CSS", "MongoDB"],
      ["Node.js", "PostgreSQL"],
    ]);
  });
});
