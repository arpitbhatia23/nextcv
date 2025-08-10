export const ResumeGenerator = {
  education: ({ degree, institution, startYear, endYear, grade }) => {
    const bullets = [];

    if (degree && institution) {
      let sentence;
      if (startYear && endYear) {
        sentence = `Completed ${degree} from ${institution}  `;
      } else if (startYear && !endYear) {
        sentence = `Currently pursuing ${degree} from ${institution} since ${startYear}`;
      }
      if (startYear && endYear) sentence += `(${startYear} – ${endYear})`;
      if (grade) sentence += ` with a score of ${grade}`;
      sentence += ".";
      bullets.push(sentence);
    }

    return bullets;
  },

  project: ({
    title,
    organization,
    date,
    technologiesOrTopics = "",
    features,
    role,
  }) => {
    let description = "";

    if (role) {
      description += `Served as ${role}`;
      if (organization) description += ` at ${organization}`;
      if (date) description += ` (${date})`;
      description += ". ";
    }

    if (title && technologiesOrTopics.length) {
      description += `Developed ${title} using ${technologiesOrTopics}. `;
    }

    if (features.length) {
      description += `Key features include: ${features}. `;
    }

    return [description.trim()];
  },
  experience: ({
    position,
    companyName,
    startDate,
    endDate,
    work = [],
    tools = [],
  }) => {
    let description = "";

    if (position && companyName) {
      description += `Worked as ${position} at ${companyName}`;
      if (startDate && endDate) description += ` (${startDate} – ${endDate})`;
      description += ". ";
    }

    if (work.length) {
      description += `Key responsibilities include: ${work.join(", ")}. `;
    }

    if (tools.length) {
      description += `Tools and technologies used: ${tools.join(", ")}.`;
    }

    return [description.trim()];
  },

  summary: (data = {}) => {
    const name = data.name || "";
    const exp =
      Array.isArray(data.experience) && data.experience.length > 0
        ? data.experience[0]
        : null;
    const proj =
      Array.isArray(data.projects) && data.projects.length > 0
        ? data.projects[0]
        : null;
    const education =
      Array.isArray(data.education) && data.education.length > 0
        ? data.education[0]
        : null;

    // Profession/role
    let role = exp?.position || data.position || "";
    let org = exp?.companyName || proj?.organization || "";
    let field = data.domain || education?.degree || "";

    // Intro
    let intro = "";
    if (role) {
      intro += `Motivated and detail-oriented ${role}`;
      if (org) intro += ` with experience at ${org}`;
      intro += ". ";
    } else {
      intro += "Motivated and detail-oriented professional. ";
    }

    // Project/achievement
    let projectLine = "";
    if (proj && proj.title) {
      projectLine += `Hands-on experience with projects such as "${proj.title}"`;
      if (proj.technologiesOrTopics)
        projectLine += ` (${proj.technologiesOrTopics})`;
      projectLine += ". ";
    }

    // Skills
    let skills = "";
    if (data.skills && data.skills.length > 0) {
      skills += `Skilled in ${data.skills.map((s) => s.name).join(", ")}. `;
    }

    // Education
    let eduLine = "";
    if (education && education.degree && education.institution) {
      eduLine += `Educated in ${education.degree} from ${education.institution}. `;
    }

    // Passion/traits
    let traits = "";
    if (data.traits && data.traits.length > 0) {
      traits += `${data.traits.join(", ")}. `;
    }

    // Goal
    let goal = "";
    if (data.goal) {
      goal += `Seeking ${data.goal}.`;
    }

    // Compose and return
    return `${intro}${projectLine}${skills}${eduLine}${traits}${goal}`
      .replace(/\s+/g, " ")
      .trim();
  },
};
