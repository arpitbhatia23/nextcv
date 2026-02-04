const { faker } = require("@faker-js/faker");

function generateUserData(userContext, events, done) {
  // Generate random user credentials
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password({ length: 10 });

  // Set variables for the virtual user session
  userContext.vars.name = name;
  userContext.vars.email = email;
  userContext.vars.password = password;
  userContext.vars.role = "user";
  userContext.vars.isTest = true;

  return done();
}

function generateResumeData(userContext, events, done) {
  // Generate realistic resume data payload
  const resume = {
    name: userContext.vars.name,
    email: userContext.vars.email,
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    linkedin: faker.internet.url(),
    github: faker.internet.url(),
    portfolio: faker.internet.url(),
    jobRole: faker.person.jobTitle(),
    summary: faker.lorem.paragraph(),
    experience: [
      {
        position: faker.person.jobTitle(),
        companyName: faker.company.name(),
        startDate: faker.date.past().toISOString(),
        endDate: faker.date.recent().toISOString(),
        description: faker.lorem.sentence(),
      },
    ],
    skills: [
      { name: "JavaScript", level: "Expert" },
      { name: "React", level: "Intermediate" },
      { name: "Node.js", level: "Advanced" },
    ],
    education: [
      {
        degree: "B.S. Computer Science",
        institution: faker.company.name(), // Using company name as proxy for uni
        startYear: faker.date.past({ years: 4 }).toISOString(),
        endYear: faker.date.recent().toISOString(),
        grade: "3.8 GPA",
        description: faker.lorem.sentence(),
      },
    ],
    projects: [
      {
        title: faker.commerce.productName(),
        roleOrType: "Full Stack Developer",
        description: faker.lorem.paragraph(),
        link: faker.internet.url(),
        date: faker.date.recent().toISOString(),
        technologiesOrTopics: "React, Node, MongoDB",
        organization: faker.company.name(),
      },
    ],
    ResumeType: "ProfessionalClean",
    certificates: [],
  };

  userContext.vars.resumeData = resume;
  return done();
}

function logResponse(requestParams, response, context, ee, next) {
  if (response.statusCode >= 400) {
    console.error(
      `Request to ${requestParams.url} failed with status ${response.statusCode}`,
    );
    if (response.body) {
      console.error("Body:", response.body);
    }
  }
  return next();
}

module.exports = {
  generateUserData,
  generateResumeData,
  logResponse,
};
