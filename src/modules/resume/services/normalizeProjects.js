export const normalizeProjects = projects =>
  Array.isArray(projects)
    ? projects.map(project => ({
        ...project,
        technologiesOrTopics: Array.isArray(project.technologiesOrTopics)
          ? project.technologiesOrTopics.join(", ")
          : project.technologiesOrTopics,
      }))
    : projects;
