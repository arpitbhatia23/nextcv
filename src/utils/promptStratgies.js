const PromptStrategies = {
  education: ({
    degree = "",
    institute = "",
    duration = "",
    subjects = [],
    achievements = "",
  }) => {
    `
    Write 2-3 professional bullet points for the following education:
    Degree: ${degree}
    Institute: ${institute}
    Duration: ${duration}
    Key Subjects: ${subjects.join(", ")}
    Achievements: ${achievements}
    Output should be in array format like ["...", "..."]`;
  },

  project: ({ title = "", techStack = [], features = [], role = "" }) => `
Write 2-3 bullet points for the following project for resume use:
Title: ${title}
Tech Stack: ${techStack.join(", ")}
Features: ${features.join(", ")}
Role: ${role}
Output should be in array format like ["...", "..."]`,

  experience: ({
    role = "",
    company = "",
    duration = "",
    work = [],
    tools = [],
  }) => `
Write 2-3 resume bullet points for the following job experience:
Role: ${role}
Company: ${company}
Duration: ${duration}
Work: ${work.join(", ")}
Tools: ${tools.join(", ")}
Output should be in array format like ["...", "..."]`,
};
