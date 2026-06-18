"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Svg,
  Path,
  Circle,
} from "@react-pdf/renderer";

import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";

const COLORS = {
  navy: "#111c33",
  navyLight: "#1e2b43",
  blue: "#2f80ed",
  blueLight: "#eaf3ff",
  text: "#172033",
  muted: "#667085",
  border: "#d6deea",
  card: "#f7f9fc",
  white: "#ffffff",
};

/* ======================================================
   STYLES
====================================================== */

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    fontFamily: "Helvetica",
    color: COLORS.text,
    fontSize: 8.2,
    lineHeight: 1.45,
  },

  /* -----------------------------
     LEFT SIDEBAR
  ----------------------------- */

  sidebar: {
    width: "26.5%",
    minHeight: "100%",
    backgroundColor: COLORS.navy,
    color: COLORS.white,
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },

  avatarWrapper: {
    alignItems: "center",
    marginBottom: 12,
  },

  avatar: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
  },

  sidebarName: {
    color: COLORS.white,
    fontSize: 15,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 4,
  },

  sidebarRole: {
    color: "#76b2ff",
    fontSize: 8.5,
    textAlign: "center",
  },

  sidebarSection: {
    marginTop: 22,
  },

  sidebarSectionBorder: {
    marginTop: 20,
    paddingTop: 18,
    borderTopWidth: 0.6,
    borderTopColor: "#263550",
  },

  sidebarTitle: {
    color: "#69aefb",
    fontSize: 7.4,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    textTransform: "uppercase",
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 9,
  },

  contactIconWrapper: {
    width: 16,
    paddingTop: 1,
    alignItems: "flex-start",
  },

  linkedInIcon: {
    width: 11,
    height: 11,
    borderRadius: 2,
    backgroundColor: "#65aaff",
    alignItems: "center",
    justifyContent: "center",
  },

  linkedInIconText: {
    color: COLORS.navy,
    fontSize: 6.2,
    fontFamily: "Helvetica-Bold",
  },

  contactText: {
    flex: 1,
    color: "#f2f4f8",
    fontSize: 7.1,
    lineHeight: 1.35,
  },

  contactLink: {
    flex: 1,
    color: "#f2f4f8",
    fontSize: 7.1,
    lineHeight: 1.35,
    textDecoration: "none",
  },

  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  skillPill: {
    backgroundColor: "#30405a",
    borderRadius: 9,
    paddingVertical: 3,
    paddingHorizontal: 7,
    marginRight: 4,
    marginBottom: 5,
  },

  skillPillText: {
    color: "#f8fafc",
    fontSize: 6.2,
  },

  sidebarPrimaryText: {
    color: COLORS.white,
    fontSize: 7.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
  },

  sidebarSecondaryText: {
    color: "#cbd5e1",
    fontSize: 6.8,
    lineHeight: 1.45,
  },

  sidebarListItem: {
    color: "#f1f5f9",
    fontSize: 7.1,
    marginBottom: 7,
  },

  educationItem: {
    marginBottom: 11,
  },

  /* -----------------------------
     MAIN CONTENT
  ----------------------------- */

  main: {
    width: "73.5%",
    paddingTop: 25,
    paddingHorizontal: 25,
    paddingBottom: 22,
  },

  section: {
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#101828",
    paddingBottom: 5,
    marginBottom: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: COLORS.blue,
  },

  summary: {
    fontSize: 7.8,
    color: "#475467",
    lineHeight: 1.55,
  },

  /* Experience */

  experienceItem: {
    marginBottom: 13,
  },

  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 1,
  },

  experienceTitleColumn: {
    width: "66%",
  },

  experienceDateColumn: {
    width: "34%",
    alignItems: "flex-end",
  },

  experienceTitle: {
    fontSize: 9.2,
    color: "#111827",
    fontFamily: "Helvetica-Bold",
  },

  companyName: {
    marginTop: 1,
    fontSize: 7.2,
    color: COLORS.blue,
    fontFamily: "Helvetica-Bold",
  },

  dateText: {
    fontSize: 7.2,
    color: "#475467",
    textAlign: "right",
  },

  durationText: {
    marginTop: 1,
    fontSize: 6.4,
    color: "#98a2b3",
    textAlign: "right",
  },

  bulletsWrapper: {
    marginTop: 6,
  },

  bulletRow: {
    flexDirection: "row",
    marginBottom: 3.4,
  },

  bulletMark: {
    width: 9,
    fontSize: 8,
    color: COLORS.blue,
  },

  bulletText: {
    flex: 1,
    fontSize: 7.4,
    color: "#475467",
    lineHeight: 1.4,
  },

  /* Projects */

  cardsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  projectCard: {
    width: "48.7%",
    minHeight: 72,
    backgroundColor: COLORS.card,
    borderWidth: 0.6,
    borderColor: "#e1e7ef",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },

  projectTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  projectIconWrapper: {
    width: 15,
    paddingTop: 1,
  },

  projectTitle: {
    flex: 1,
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#182230",
  },

  projectDescription: {
    color: "#667085",
    fontSize: 6.8,
    lineHeight: 1.4,
    marginBottom: 6,
  },

  projectLinksRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  projectLink: {
    color: "#2176d2",
    fontSize: 6.5,
    textDecoration: "underline",
    marginRight: 12,
    marginBottom: 2,
  },

  technologyText: {
    fontSize: 6.3,
    color: "#667085",
    marginTop: 4,
  },

  /* Strengths */

  strengthsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  strengthItem: {
    width: "48.7%",
    flexDirection: "row",
    marginBottom: 10,
  },

  strengthIconBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  strengthIcon: {
    color: COLORS.blue,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
  },

  strengthContent: {
    flex: 1,
  },

  strengthTitle: {
    color: "#1d2939",
    fontSize: 7.6,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },

  strengthDescription: {
    color: "#667085",
    fontSize: 6.4,
    lineHeight: 1.35,
  },

  hiddenBranding: {
    position: "absolute",
    bottom: 1,
    right: 2,
    fontSize: 1,
    color: "#ffffff",
  },
});

/* ======================================================
   SVG ICONS
====================================================== */

const EmailIcon = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      fill="none"
      stroke="#65aaff"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Path
      d="M22 6L12 13L2 6"
      fill="none"
      stroke="#65aaff"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M22 16.92V20A2 2 0 0 1 19.82 22A19.79 19.79 0 0 1 11.19 18.93A19.5 19.5 0 0 1 5.07 12.81A19.79 19.79 0 0 1 2 4.18A2 2 0 0 1 4 2H7.09A2 2 0 0 1 9.09 3.72C9.21 4.62 9.42 5.5 9.72 6.34A2 2 0 0 1 9.27 8.45L7.97 9.75A16 16 0 0 0 14.25 16.03L15.55 14.73A2 2 0 0 1 17.66 14.28C18.5 14.58 19.38 14.79 20.28 14.91A2 2 0 0 1 22 16.92Z"
      fill="none"
      stroke="#65aaff"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LocationIcon = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10A9 9 0 0 1 21 10Z"
      fill="none"
      stroke="#65aaff"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Circle cx="12" cy="10" r="3" fill="none" stroke="#65aaff" strokeWidth={1.7} />
  </Svg>
);

const PortfolioIcon = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="9" fill="none" stroke="#65aaff" strokeWidth={1.7} />

    <Path d="M3 12H21" fill="none" stroke="#65aaff" strokeWidth={1.7} strokeLinecap="round" />

    <Path
      d="M12 3C14.5 5.5 15.8 8.5 15.8 12C15.8 15.5 14.5 18.5 12 21"
      fill="none"
      stroke="#65aaff"
      strokeWidth={1.7}
      strokeLinecap="round"
    />

    <Path
      d="M12 3C9.5 5.5 8.2 8.5 8.2 12C8.2 15.5 9.5 18.5 12 21"
      fill="none"
      stroke="#65aaff"
      strokeWidth={1.7}
      strokeLinecap="round"
    />
  </Svg>
);

const ProjectIcon = () => (
  <Svg width={10} height={10} viewBox="0 0 24 24">
    <Path
      d="M7 17L17 7"
      fill="none"
      stroke="#2f80ed"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <Path
      d="M8 7H17V16"
      fill="none"
      stroke="#2f80ed"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/* ======================================================
   HELPER FUNCTIONS
====================================================== */

const getInitials = name => {
  if (!name) return "CV";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join("");
};

const getFirstString = (...values) => {
  return values.find(value => typeof value === "string" && value.trim())?.trim();
};

const normalizeUrl = value => {
  if (!value) return "";

  const url = value.trim();

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:")
  ) {
    return url;
  }

  return `https://${url}`;
};

const getSkillName = skill => {
  if (typeof skill === "string") return skill;

  return skill?.name || skill?.title || skill?.skill || "";
};

const getLanguageName = language => {
  if (typeof language === "string") return language;

  const name = language?.name || language?.language || "";

  const level = language?.proficiency || language?.level || language?.fluency || "";

  return level ? `${name} - ${level}` : name;
};

const safeFormatDate = value => {
  if (!value) return "";

  try {
    return formatDate(value) || value;
  } catch {
    return value;
  }
};

const getProjectLinks = project => {
  const links = [];

  if (Array.isArray(project?.links)) {
    project.links.forEach((link, index) => {
      if (typeof link === "string") {
        links.push({
          label: `Link ${index + 1}`,
          url: normalizeUrl(link),
        });
      } else if (link?.url) {
        links.push({
          label: link.label || link.title || `Link ${index + 1}`,
          url: normalizeUrl(link.url),
        });
      }
    });
  }

  const possibleLinks = [
    {
      label: "Live",
      url: project?.liveUrl || project?.demoUrl || project?.projectUrl,
    },
    {
      label: "GitHub",
      url: project?.github || project?.githubUrl || project?.sourceCode,
    },
    {
      label: "View",
      url: project?.link || project?.url,
    },
  ];

  possibleLinks.forEach(item => {
    if (!item.url) return;

    const normalizedUrl = normalizeUrl(item.url);

    if (!links.some(existing => existing.url === normalizedUrl)) {
      links.push({
        label: item.label,
        url: normalizedUrl,
      });
    }
  });

  return links;
};

const getStrengthLabel = index => {
  const labels = ["01", "02", "03", "04"];
  return labels[index % labels.length];
};

/* ======================================================
   REUSABLE COMPONENTS
====================================================== */

const BulletList = ({ description }) => {
  if (!description) return null;

  const bullets = splitToBullets(description).filter(Boolean);

  return (
    <View style={styles.bulletsWrapper}>
      {bullets.map((bullet, index) => (
        <View key={index} style={styles.bulletRow}>
          <Text style={styles.bulletMark}>•</Text>

          <Text style={styles.bulletText}>{bullet}</Text>
        </View>
      ))}
    </View>
  );
};

const SectionTitle = ({ children }) => <Text style={styles.sectionTitle}>{children}</Text>;

/* ======================================================
   MAIN TEMPLATE
====================================================== */

const NavyEdge = ({ data = {} }) => {
  const phone = data.phone || data.phone_no;

  const linkedinValue = getFirstString(
    data.linkedin,
    data.linkedIn,
    data.linkedinUrl,
    data.linkedInUrl,
    data.socialLinks?.linkedin,
    data.socialLinks?.linkedIn
  );

  const portfolioValue = getFirstString(
    data.portfolio,
    data.portfolioUrl,
    data.website,
    data.websiteUrl,
    data.personalWebsite,
    data.socialLinks?.portfolio,
    data.socialLinks?.website
  );

  const linkedinUrl = normalizeUrl(linkedinValue);
  const portfolioUrl = normalizeUrl(portfolioValue);

  const skills = Array.isArray(data.skills) ? data.skills.map(getSkillName).filter(Boolean) : [];

  const languages = Array.isArray(data.languages)
    ? data.languages.map(getLanguageName).filter(Boolean)
    : [];

  const strengths = Array.isArray(data.strengths) ? data.strengths : [];

  return (
    <Document title={`${data.name || "Resume"} - Resume`} author={data.name || "NextCV User"}>
      <Page size="A4" style={styles.page}>
        {/* LEFT SIDEBAR */}
        <View style={styles.sidebar}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(data.name)}</Text>
            </View>

            <Text style={styles.sidebarName}>{data.name || "Your Name"}</Text>

            <Text style={styles.sidebarRole}>
              {data.jobRole || data.professionalTitle || "Professional"}
            </Text>
          </View>

          {/* CONTACT */}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Contact</Text>

            {data.email && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <EmailIcon />
                </View>

                <Link src={`mailto:${data.email}`} style={styles.contactLink}>
                  <Text>{data.email}</Text>
                </Link>
              </View>
            )}

            {phone && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <PhoneIcon />
                </View>

                <Link src={`tel:${phone}`} style={styles.contactLink}>
                  <Text>{phone}</Text>
                </Link>
              </View>
            )}

            {data.address && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <LocationIcon />
                </View>

                <Text style={styles.contactText}>{data.address}</Text>
              </View>
            )}

            {linkedinUrl && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <View style={styles.linkedInIcon}>
                    <Text style={styles.linkedInIconText}>in</Text>
                  </View>
                </View>

                <Link src={linkedinUrl} style={styles.contactLink}>
                  <Text>LinkedIn</Text>
                </Link>
              </View>
            )}

            {portfolioUrl && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconWrapper}>
                  <PortfolioIcon />
                </View>

                <Link src={portfolioUrl} style={styles.contactLink}>
                  <Text>Portfolio</Text>
                </Link>
              </View>
            )}
          </View>

          {/* SKILLS */}
          {skills.length > 0 && (
            <View style={styles.sidebarSectionBorder}>
              <Text style={styles.sidebarTitle}>Core Technologies</Text>

              <View style={styles.skillsWrap}>
                {skills.map((skill, index) => (
                  <View key={`${skill}-${index}`} style={styles.skillPill}>
                    <Text style={styles.skillPillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* EDUCATION */}
          {data.education?.length > 0 && (
            <View style={styles.sidebarSectionBorder}>
              <Text style={styles.sidebarTitle}>Education</Text>

              {data.education.map((education, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.sidebarPrimaryText}>
                    {education.degree || education.course || education.qualification}
                  </Text>

                  {education.institution && (
                    <Text style={styles.sidebarSecondaryText}>{education.institution}</Text>
                  )}

                  {(education.startYear || education.endYear) && (
                    <Text style={styles.sidebarSecondaryText}>
                      {safeFormatDate(education.startYear)}

                      {education.startYear && education.endYear ? " - " : ""}

                      {safeFormatDate(education.endYear)}
                    </Text>
                  )}
                  {/* 
                  {education.description && (
                    <Text
                      style={{
                        ...styles.sidebarSecondaryText,
                        marginTop: 3,
                      }}
                    >
                      {education.description}
                    </Text>
                  )} */}
                </View>
              ))}
            </View>
          )}

          {/* LANGUAGES */}
          {languages.length > 0 && (
            <View style={styles.sidebarSectionBorder}>
              <Text style={styles.sidebarTitle}>Languages</Text>

              {languages.map((language, index) => (
                <Text key={`${language}-${index}`} style={styles.sidebarListItem}>
                  {language}
                </Text>
              ))}
            </View>
          )}

          {/* CERTIFICATES */}
          {data.certificates?.length > 0 && (
            <View style={styles.sidebarSectionBorder}>
              <Text style={styles.sidebarTitle}>Certifications</Text>

              {data.certificates.map((certificate, index) => (
                <View key={index} style={styles.educationItem}>
                  <Text style={styles.sidebarPrimaryText}>
                    {certificate.title || certificate.name}
                  </Text>

                  {certificate.organization && (
                    <Text style={styles.sidebarSecondaryText}>{certificate.organization}</Text>
                  )}

                  {certificate.year && (
                    <Text style={styles.sidebarSecondaryText}>
                      {safeFormatDate(certificate.year)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT MAIN CONTENT */}
        <View style={styles.main}>
          {/* SUMMARY */}
          {data.summary && (
            <View style={styles.section}>
              <SectionTitle>Professional Summary</SectionTitle>

              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          )}

          {/* EXPERIENCE */}
          {data.experience?.length > 0 && (
            <View style={styles.section}>
              <SectionTitle>Professional Experience</SectionTitle>

              {data.experience.map((experience, index) => (
                <View key={index} style={styles.experienceItem} wrap={false}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.experienceTitleColumn}>
                      <Text style={styles.experienceTitle}>
                        {experience.position || experience.jobTitle || experience.role}
                      </Text>

                      {(experience.companyName || experience.company) && (
                        <Text style={styles.companyName}>
                          {experience.companyName || experience.company}
                        </Text>
                      )}
                    </View>

                    <View style={styles.experienceDateColumn}>
                      <Text style={styles.dateText}>
                        {safeFormatDate(experience.startDate)}

                        {" - "}

                        {experience.currentlyWorking
                          ? "Present"
                          : safeFormatDate(experience.endDate) || "Present"}
                      </Text>

                      {experience.duration && (
                        <Text style={styles.durationText}>{experience.duration}</Text>
                      )}
                    </View>
                  </View>

                  <BulletList description={experience.description} />
                </View>
              ))}
            </View>
          )}

          {/* PROJECTS */}
          {data.projects?.length > 0 && (
            <View style={styles.section}>
              <SectionTitle>Featured Projects</SectionTitle>

              <View style={styles.cardsRow}>
                {data.projects.map((project, index) => {
                  const links = getProjectLinks(project);

                  return (
                    <View key={index} style={styles.projectCard} wrap={false}>
                      <View style={styles.projectTitleRow}>
                        <View style={styles.projectIconWrapper}>
                          <ProjectIcon />
                        </View>

                        <Text style={styles.projectTitle}>
                          {project.title || project.name || "Project"}
                        </Text>
                      </View>

                      {project.description && (
                        <Text style={styles.projectDescription}>{project.description}</Text>
                      )}

                      {links.length > 0 && (
                        <View style={styles.projectLinksRow}>
                          {links.map((link, linkIndex) => (
                            <Link
                              key={`${link.url}-${linkIndex}`}
                              src={link.url}
                              style={styles.projectLink}
                            >
                              <Text>{link.label}</Text>
                            </Link>
                          ))}
                        </View>
                      )}

                      {project.technologiesOrTopics && (
                        <Text style={styles.technologyText}>{project.technologiesOrTopics}</Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          )}

          {/* STRENGTHS */}
          {strengths.length > 0 && (
            <View style={styles.section}>
              <SectionTitle>Key Strengths</SectionTitle>

              <View style={styles.strengthsGrid}>
                {strengths.map((strength, index) => {
                  const title =
                    typeof strength === "string" ? strength : strength.title || strength.name;

                  const description = typeof strength === "object" ? strength.description : "";

                  return (
                    <View key={index} style={styles.strengthItem} wrap={false}>
                      <View style={styles.strengthIconBox}>
                        <Text style={styles.strengthIcon}>{getStrengthLabel(index)}</Text>
                      </View>

                      <View style={styles.strengthContent}>
                        <Text style={styles.strengthTitle}>{title}</Text>

                        {description && (
                          <Text style={styles.strengthDescription}>{description}</Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        <Text style={styles.hiddenBranding}>NextCV Resume Optimized</Text>
      </Page>
    </Document>
  );
};

export default NavyEdge;
