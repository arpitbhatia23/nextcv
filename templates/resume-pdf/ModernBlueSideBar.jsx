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

// Blue color theme
const BLUE = "#2072c9";
const LIGHTGRAY = "#f5f8fa";
const DARK = "#232323";

// SVG Icons
const PhoneIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.89.76a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.68.76 3.89a1 1 0 01-.21 1.11l-2.2 2.2z"
    />
  </Svg>
);
const MailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);
const LocationIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
    />
  </Svg>
);
const LinkedInIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.54 20h-2.46v-8h2.46v8zm-1.23-9.21c-.79 0-1.43-.64-1.43-1.43s.64-1.43 1.43-1.43 1.43.64 1.43 1.43-.64 1.43-1.43 1.43zm14.23 9.21h-2.46v-4.18c0-1-.02-2.29-1.39-2.29-1.39 0-1.61 1.09-1.61 2.22v4.25h-2.46v-8h2.36v1.09h.03c.33-.62 1.13-1.27 2.33-1.27 2.49 0 2.95 1.64 2.95 3.77v4.41z"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    backgroundColor: "#fff",
    color: DARK,
    padding: 28,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  leftCol: {
    width: "37%",
    backgroundColor: LIGHTGRAY,
    borderRight: `1 solid #e0e7ef`,
    padding: 14,
    paddingTop: 24,
    paddingBottom: 20,
    minHeight: 700,
  },
  rightCol: {
    width: "63%",
    padding: 24,
    paddingTop: 8,
    paddingBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: BLUE,
    marginBottom: 2,
    letterSpacing: 1,
  },
  role: {
    color: "#3a8dde",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 1,
  },
  inlineIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    marginTop: 1,
    flexWrap: "wrap",
    gap: 7,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    color: "#333",
    fontSize: 10,
    gap: 3,
  },
  link: {
    color: BLUE,
    textDecoration: "underline",
    marginLeft: 2,
    fontSize: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: BLUE,
    borderBottom: `2 solid ${BLUE}`,
    marginBottom: 7,
    letterSpacing: 1,
    paddingBottom: 2,
    marginTop: 10,
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 14,
  },
  summary: {
    fontSize: 10.5,
    color: "#232323",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  expBlock: {
    marginBottom: 12,
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 11.5,
    color: "#232323",
    marginBottom: 1,
  },
  expOrg: {
    fontSize: 10.5,
    color: BLUE,
    fontWeight: "bold",
    marginBottom: 1,
  },
  expPeriodLoc: {
    flexDirection: "row",
    fontSize: 9.5,
    color: "#888",
    marginBottom: 3,
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
    marginBottom: 10,
  },
  eduDegree: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: "#232323",
    marginBottom: 2,
  },
  eduSchool: {
    color: BLUE,
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
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
    marginBottom: 10,
    gap: 4,
  },
  skillBadge: {
    backgroundColor: "#deedfb",
    color: BLUE,
    fontWeight: 500,
    fontSize: 9.5,
    borderRadius: 4,
    padding: "3 9",
    marginRight: 4,
    marginBottom: 5,
  },
  strengthsSection: {
    marginTop: 8,
    marginBottom: 10,
  },
  strengthTitle: {
    color: BLUE,
    fontWeight: "bold",
    fontSize: 10.5,
    marginBottom: 1,
  },
  strengthText: {
    fontSize: 9.5,
    color: "#222",
    marginBottom: 5,
    lineHeight: 1.3,
  },
  langSection: {
    marginTop: 8,
  },
  langTitle: {
    fontWeight: "bold",
    fontSize: 11,
    color: BLUE,
    marginBottom: 5,
    textTransform: "uppercase",
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 5,
  },
  langName: {
    fontSize: 10,
    width: 60,
  },
  langBar: {
    flexDirection: "row",
    gap: 2,
  },
  langDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 1,
    backgroundColor: "#deedfb",
    border: `1 solid ${BLUE}`,
  },
  langDotActive: {
    backgroundColor: BLUE,
    border: `1 solid ${BLUE}`,
  },
});

function renderLangBar(level, max = 5) {
  return (
    <View style={styles.langBar}>
      {[...Array(max)].map((_, i) => (
        <View
          key={i}
          style={[styles.langDot, i < level ? styles.langDotActive : undefined]}
        />
      ))}
    </View>
  );
}

const ModernBlueSidebarPDFResume = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.row}>
        {/* LEFT COLUMN */}
        <View style={styles.leftCol}>
          <Text style={styles.name}>{data.name || "Your Name"}</Text>
          <Text style={styles.role}>{data.jobRole || "Job Title"}</Text>

          <View style={styles.inlineIcons}>
            {data.phone && (
              <View style={styles.contact}>
                <PhoneIcon />
                <Text>{data.phone}</Text>
              </View>
            )}
            {data.email && (
              <View style={styles.contact}>
                <MailIcon />
                <Text>{data.email}</Text>
              </View>
            )}
          </View>
          <View style={styles.inlineIcons}>
            {data.address && (
              <View style={styles.contact}>
                <LocationIcon />
                <Text>{data.address}</Text>
              </View>
            )}
          </View>
          <View style={styles.inlineIcons}>
            {data.linkedin && (
              <View style={styles.contact}>
                <LinkedInIcon />
                <Link src={data.linkedin} style={styles.link}>
                  {data.linkedin.replace("https://", "").replace("www.", "")}
                </Link>
              </View>
            )}
          </View>

          {/* Education */}
          {data.education?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={styles.eduEntry}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.institution}</Text>
                  <View style={styles.eduMeta}>
                    <Text>
                      {edu.startYear} - {edu.endYear}
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

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsWrap}>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>
                    {typeof skill === "string" ? skill : skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Strengths */}
          {data.strengths?.length > 0 && (
            <View style={styles.strengthsSection}>
              <Text style={styles.sectionTitle}>Strengths</Text>
              {data.strengths.map((str, i) => (
                <View key={i}>
                  <Text style={styles.strengthTitle}>{str.title}</Text>
                  <Text style={styles.strengthText}>{str.text}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <View style={styles.langSection}>
              <Text style={styles.langTitle}>Languages</Text>
              {data.languages.map((lang, i) => (
                <View key={i} style={styles.langRow}>
                  <Text style={styles.langName}>{lang.name}</Text>
                  {renderLangBar(lang.level)}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.rightCol}>
          {/* Summary */}
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={styles.expBlock}>
                  <Text style={styles.expTitle}>{exp.position}</Text>
                  <Text style={styles.expOrg}>{exp.companyName}</Text>
                  <View style={styles.expPeriodLoc}>
                    <Text>
                      {exp.startDate} - {exp.endDate}
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
                  {exp.bullets?.length > 0 && (
                    <View style={styles.expBullets}>
                      {exp.bullets.map((b, j) =>
                        b ? (
                          <Text key={j} style={styles.expBullet}>
                            • {b}
                          </Text>
                        ) : null
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </Page>
  </Document>
);

export default ModernBlueSidebarPDFResume;
