import { normalizeProjects } from "../normalizeProjects";
import Resume from "../../models/resume.model";

describe("normalizeProjects", () => {
  it("converts imported technology arrays to the builder's text format", () => {
    const projects = [
      {
        title: "Portfolio",
        technologiesOrTopics: ["React", "Tailwind CSS", "MongoDB"],
      },
    ];

    expect(normalizeProjects(projects)).toEqual([
      {
        title: "Portfolio",
        technologiesOrTopics: "React, Tailwind CSS, MongoDB",
      },
    ]);

    const resume = new Resume({ projects: normalizeProjects(projects) });
    expect(resume.projects[0].validateSync()).toBeUndefined();
  });

  it("preserves existing technology strings", () => {
    const projects = [{ technologiesOrTopics: "React, Tailwind CSS" }];

    expect(normalizeProjects(projects)).toEqual(projects);
  });

  it("preserves missing project data", () => {
    expect(normalizeProjects(undefined)).toBeUndefined();
  });
});
