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
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/datefromater";

// Color palette
const GREEN = "#36b37e";
const TEAL = "#00b8d9";
const GRAY = "#454f5b";
const LIGHTGRAY = "#f6f8fa";
const ACCENT = "#00897b";

// Icons
const PhoneIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill={ACCENT}
      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.89.76a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.68.76 3.89a1 1 0 01-.21 1.11l-2.2 2.2z"
    />
  </Svg>
);
const MailIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill={ACCENT}
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);
const LocationIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill={ACCENT}
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
    />
  </Svg>
);
const GitHubIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill={ACCENT}
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.004-.404c1.018.004 2.045.138 3.004.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.241 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.369.823 1.096.823 2.211v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    flexDirection: "row",
    backgroundColor: "#fff",
    color: GRAY,
    padding: 0,
  },
  sidebar: {
    width: "30%",
    backgroundColor: LIGHTGRAY,
    padding: 26,
    paddingTop: 32,
    paddingBottom: 24,
    borderRight: "1 solid #e0e7ef",
    minHeight: 900,
  },
  main: {
    width: "70%",
    padding: 32,
    paddingBottom: 24,
  },
  // Sidebar content
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: ACCENT,
    letterSpacing: 1,
    marginBottom: 2,
  },
  role: {
    color: GREEN,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 14,
    marginTop: 1,
  },
  contactsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 2,
    gap: 8,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: "#444",
    gap: 4,
    marginRight: 11,
    marginBottom: 3,
  },
  github: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: "#444",
    gap: 3,
    marginBottom: 3,
  },
  link: {
    color: ACCENT,
    textDecoration: "underline",
    marginLeft: 2,
    fontSize: 10,
  },
  sectionLabel: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#888",
    letterSpacing: 1.2,
    marginBottom: 2,
    marginTop: 20,
    textTransform: "uppercase",
  },
  skillsSection: {
    marginBottom: 18,
  },
  skillsListLabel: {
    fontSize: 10,
    color: ACCENT,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 12,
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 3,
  },
  skillBadge: {
    backgroundColor: "#e6f4f1",
    color: "#00897b",
    fontWeight: 500,
    fontSize: 9.5,
    borderRadius: 4,
    padding: "3 10",
    marginRight: 4,
    marginBottom: 5,
  },
  expertiseSection: {
    marginTop: 10,
    marginBottom: 10,
  },
  expertiseLabel: {
    fontSize: 10,
    color: ACCENT,
    fontWeight: "bold",
    marginBottom: 4,
  },
  expertiseBarWrap: {
    marginBottom: 8,
  },
  expertiseBarLabel: {
    fontSize: 9.5,
    color: "#555",
    marginBottom: 2,
  },
  expertiseBarLine: {
    height: 6,
    borderRadius: 6,
    backgroundColor: "#e4f5ed",
    marginBottom: 2,
    marginTop: 1,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  expertiseBarFill: {
    height: 6,
    borderRadius: 6,
    backgroundColor: GREEN,
  },
  // Main content
  mainLabel: {
    fontWeight: "bold",
    fontSize: 12,
    color: ACCENT,
    borderBottom: `2 solid ${ACCENT}`,
    marginBottom: 7,
    letterSpacing: 1.2,
    paddingBottom: 2,
    marginTop: 10,
    textTransform: "uppercase",
  },
  summary: {
    fontSize: 10.5,
    color: "#232323",
    lineHeight: 1.4,
    marginBottom: 4,
  },
  expBlock: {
    marginBottom: 13,
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 11.5,
    color: "#232323",
    marginBottom: 1,
  },
  expOrg: {
    fontSize: 10.5,
    color: ACCENT,
    fontWeight: "bold",
    marginBottom: 1,
  },
  expPeriodLoc: {
    flexDirection: "row",
    fontSize: 9.5,
    color: "#888",
    marginBottom: 2,
    alignItems: "center",
    gap: 6,
  },
  expBullets: {
    marginLeft: 8,
    marginBottom: 3,
  },
  expBullet: {
    fontSize: 9.5,
    lineHeight: 1.25,
    marginBottom: 1,
  },
  eduEntry: {
    marginBottom: 8,
  },
  eduDegree: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: "#232323",
    marginBottom: 2,
  },
  eduSchool: {
    color: ACCENT,
    fontSize: 10,
    marginBottom: 1,
  },
  eduMeta: {
    fontSize: 9,
    color: "#555",
    marginBottom: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  openSourceBlock: {
    marginBottom: 9,
  },
  openSourceTitle: {
    fontWeight: "bold",
    fontSize: 11,
    color: ACCENT,
    marginBottom: 2,
  },
  openSourceMeta: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 9,
    color: "#444",
    marginBottom: 1,
    gap: 5,
  },
  openSourceDesc: {
    fontSize: 9.5,
    color: "#232323",
    marginBottom: 2,
    lineHeight: 1.2,
  },
});

// Helper for expertise bars (0-100 integer)
function ExpertiseBar({ label, percent }) {
  return (
    <View style={styles.expertiseBarWrap}>
      <Text style={styles.expertiseBarLabel}>{label}</Text>
      <View style={styles.expertiseBarLine}>
        <View style={[styles.expertiseBarFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const ModernFullStackPDFResume = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* SIDEBAR */}
      <View style={styles.sidebar}>
        <Text style={styles.name}>{data.name || "YOUR NAME"}</Text>
        <Text style={styles.role}>{data.jobRole || "Your Title"}</Text>
        {/* Contacts */}
        <View style={styles.contactsRow}>
          {data.phone && (
            <View style={styles.contact}>
              <PhoneIcon />
              <Text>{data.phone || data.phone_no}</Text>
            </View>
          )}
          {data.email && (
            <View style={styles.contact}>
              <MailIcon />
              <Text>{data.email}</Text>
            </View>
          )}
        </View>
        <View style={styles.contactsRow}>
          {data.github && (
            <View style={styles.github}>
              <GitHubIcon />
              <Link src={data.github} style={styles.link}>
                {data.github.replace("https://", "").replace("www.", "")}
              </Link>
            </View>
          )}
          {data.location && (
            <View style={styles.contact}>
              <LocationIcon />
              <Text>{data.location}</Text>
            </View>
          )}
        </View>
        {/* SKILLS */}
        <View style={styles.skillsSection}>
          <Text style={styles.sectionLabel}>Skills</Text>
          {data.skills?.clientSide?.length > 0 && (
            <>
              <Text style={styles.skillsListLabel}>Client-Side</Text>
              <View style={styles.skillsWrap}>
                {data.skills.clientSide.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </>
          )}
          {data.skills?.serverSide?.length > 0 && (
            <>
              <Text style={styles.skillsListLabel}>Server-side</Text>
              <View style={styles.skillsWrap}>
                {data.skills.serverSide.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </>
          )}
          {data.skills?.devOps?.length > 0 && (
            <>
              <Text style={styles.skillsListLabel}>
                Development & Operations
              </Text>
              <View style={styles.skillsWrap}>
                {data.skills.devOps.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>
                    {skill}
                  </Text>
                ))}
              </View>
            </>
          )}
        </View>
        {/* INDUSTRY EXPERTISE */}
        {data.industryExpertise && (
          <View style={styles.expertiseSection}>
            <Text style={styles.sectionLabel}>Industry Expertise</Text>
            {data.industryExpertise.map((ex, i) => (
              <ExpertiseBar key={i} label={ex.label} percent={ex.percent} />
            ))}
          </View>
        )}
      </View>
      {/* MAIN CONTENT */}
      <View style={styles.main}>
        {/* SUMMARY */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.mainLabel}>Summary</Text>
            <Text style={styles.summary}>{data.summary}</Text>
          </View>
        )}
        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.mainLabel}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.expBlock}>
                <Text style={styles.expTitle}>{exp.position}</Text>
                <Text style={styles.expOrg}>{exp.companyName}</Text>
                <View style={styles.expPeriodLoc}>
                  <Text>
                    {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                  {exp.location && (
                    <>
                      <Text>·</Text>
                      <Text>{exp.location}</Text>
                    </>
                  )}
                </View>
                {exp.description && (
                  <Text style={styles.summary}>{exp.description}</Text>
                )}
                {/* {exp.bullets?.length > 0 && (
                  <View style={styles.expBullets}>
                    {exp.bullets.map((b, j) =>
                      b ? (
                        <Text key={j} style={styles.expBullet}>
                          • {b}
                        </Text>
                      ) : null
                    )}
                  </View>
                )} */}
              </View>
            ))}
          </View>
        )}
        {/* EDUCATION */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.mainLabel}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.eduEntry}>
                <Text style={styles.eduDegree}>{edu.degree}</Text>
                <Text style={styles.eduSchool}>{edu.institution}</Text>
                <View style={styles.eduMeta}>
                  <Text>
                    {formatDate(edu.startYear)} -{" "}
                    {formatDate(edu.endYear) || "Present"}
                  </Text>
                  {edu.location && (
                    <>
                      <Text>·</Text>
                      <Text>{edu.location}</Text>
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.mainLabel}>Certificates</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={styles.expTitle}>{cert.title}</Text>
                <Text style={styles.expOrg}>
                  {cert.organization}
                  {cert.year ? ` | ${formatDate(cert.year)}` : ""}
                </Text>
                {cert.credentialUrl && (
                  <Link src={cert.credentialUrl} style={styles.link}>
                    View Certificate
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}
        {/* OPEN SOURCE WORK */}
        {data.openSourceWork?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.mainLabel}>Open Source Work</Text>
            {data.openSourceWork.map((os, i) => (
              <View key={i} style={styles.openSourceBlock}>
                <Text style={styles.openSourceTitle}>{os.title}</Text>
                <View style={styles.openSourceMeta}>
                  <Text>{os.period}</Text>
                  {os.link && (
                    <Link src={os.link} style={styles.link}>
                      {os.link.replace("https://", "").replace("www.", "")}
                    </Link>
                  )}
                </View>
                <Text style={styles.openSourceDesc}>{os.description}</Text>
                {os.bullets?.length > 0 && (
                  <View style={styles.expBullets}>
                    {os.bullets.map((b, j) =>
                      b ? (
                        <Text key={j} style={styles.expBullet}>
                          • {b}
                        </Text>
                      ) : null,
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default ModernFullStackPDFResume;
