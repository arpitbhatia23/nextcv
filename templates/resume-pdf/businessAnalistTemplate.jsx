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

// Color Palette
const DARK = "#222";
const GRAY = "#444";
const LIGHTGRAY = "#f5f5f5";
const ACCENT = "#111";

// Simple icons for contact info
const MailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill={GRAY}
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);
const LinkedInIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill={GRAY}
      d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.54 20h-2.46v-8h2.46v8zm-1.23-9.21c-.79 0-1.43-.64-1.43-1.43s.64-1.43 1.43-1.43 1.43.64 1.43 1.43-.64 1.43-1.43 1.43zm14.23 9.21h-2.46v-4.18c0-1-.02-2.29-1.39-2.29-1.39 0-1.61 1.09-1.61 2.22v4.25h-2.46v-8h2.36v1.09h.03c.33-.62 1.13-1.27 2.33-1.27 2.49 0 2.95 1.64 2.95 3.77v4.41z"
    />
  </Svg>
);
const LocationIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill={GRAY}
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    backgroundColor: "#fff",
    color: DARK,
    padding: 36,
  },
  // Header
  name: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: ACCENT,
    marginBottom: 5,
    letterSpacing: 1,
  },
  headline: {
    fontSize: 12,
    color: "#545454",
    textAlign: "center",
    marginBottom: 6,
    fontWeight: 500,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 10,
    color: GRAY,
    gap: 3,
  },
  link: {
    color: "#0077b5",
    textDecoration: "underline",
    marginLeft: 2,
    fontSize: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#111",
    borderBottom: `1 solid #222`,
    marginBottom: 7,
    letterSpacing: 1,
    paddingBottom: 2,
    marginTop: 14,
    textTransform: "capitalize",
  },
  summary: {
    fontSize: 10.5,
    color: DARK,
    lineHeight: 1.4,
    marginBottom: 2,
    marginTop: 1,
  },
  // Experience section
  expBlock: {
    marginBottom: 13,
  },
  expRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 2,
    gap: 5,
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#111",
  },
  expMeta: {
    fontSize: 10,
    color: "#4b4b4b",
    marginBottom: 1,
  },
  expLoc: {
    fontSize: 10,
    color: "#888",
    textAlign: "right",
  },
  expBullets: {
    marginLeft: 12,
    marginBottom: 2,
  },
  expBullet: {
    fontSize: 9.8,
    marginBottom: 1,
    lineHeight: 1.25,
  },
  // Education section
  eduBlock: {
    marginBottom: 7,
  },
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 5,
  },
  eduDegree: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: "#222",
  },
  eduSchool: {
    fontSize: 10.5,
    color: "#007b8a",
    marginBottom: 1,
  },
  eduLoc: {
    fontSize: 10,
    color: "#888",
    textAlign: "right",
  },
  eduDate: {
    fontSize: 10,
    color: "#4b4b4b",
  },
  // Key Achievements section
  achievementsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    marginTop: 4,
    gap: 8,
  },
  achievementBlock: {
    flex: 1,
    marginRight: 8,
    borderRight: "1 solid #e0e0e0",
    paddingRight: 8,
    minHeight: 70,
  },
  achievementBlockLast: {
    flex: 1,
    marginRight: 0,
    borderRight: "none",
    paddingRight: 0,
  },
  achievementTitle: {
    fontWeight: "bold",
    fontSize: 10,
    color: "#232323",
    marginBottom: 2,
  },
  achievementText: {
    fontSize: 9.7,
    color: "#444",
    lineHeight: 1.25,
  },
  // Skills and certification
  skillsSection: {
    marginTop: 10,
    marginBottom: 12,
  },
  skillsText: {
    fontSize: 10,
    color: "#444",
    marginBottom: 2,
    lineHeight: 1.35,
  },
  certSection: {
    marginTop: 7,
    marginBottom: 7,
  },
  certText: {
    fontSize: 10,
    color: "#2c6e49",
    fontWeight: "bold",
    marginBottom: 2,
  },
  certDesc: {
    fontSize: 9.5,
    color: "#444",
    lineHeight: 1.25,
  },
});

const CleanBusinessAnalystPDFResume = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <Text style={styles.name}>{data.name || "Full Name"}</Text>
      <Text style={styles.headline}>
        {data.headline || "Senior Business Analyst | Data Analytics Expert"}
      </Text>
      <View style={styles.contactRow}>
        {data.email && (
          <View style={styles.contactItem}>
            <MailIcon />
            <Text>{data.email}</Text>
          </View>
        )}
        {data.linkedin && (
          <View style={styles.contactItem}>
            <LinkedInIcon />
            <Link src={data.linkedin} style={styles.link}>
              LinkedIn
            </Link>
          </View>
        )}
        {data.location && (
          <View style={styles.contactItem}>
            <LocationIcon />
            <Text>{data.location}</Text>
          </View>
        )}
      </View>

      {/* Summary */}
      {data.summary && (
        <>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.summary}>{data.summary}</Text>
        </>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.expBlock}>
              <View style={styles.expRow}>
                <Text style={styles.expTitle}>
                  {exp.company}
                  {exp.position ? `\n${exp.position}` : ""}
                </Text>
                <View>
                  <Text style={styles.expLoc}>{exp.location}</Text>
                  <Text style={styles.expMeta}>{exp.period}</Text>
                </View>
              </View>
              {exp.bullets?.length > 0 && (
                <View style={styles.expBullets}>
                  {exp.bullets.map(
                    (b, j) =>
                      b && (
                        <Text key={j} style={styles.expBullet}>
                          • {b}
                        </Text>
                      )
                  )}
                </View>
              )}
            </View>
          ))}
        </>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.eduBlock}>
              <View style={styles.eduRow}>
                <View>
                  <Text style={styles.eduSchool}>{edu.institution}</Text>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                </View>
                <View>
                  <Text style={styles.eduLoc}>{edu.location}</Text>
                  <Text style={styles.eduDate}>{edu.period}</Text>
                </View>
              </View>
            </View>
          ))}
        </>
      )}

      {/* Key Achievements */}
      {data.achievements?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Key Achievements</Text>
          <View style={styles.achievementsRow}>
            {data.achievements.map((ach, i) => (
              <View
                key={i}
                style={
                  i === data.achievements.length - 1
                    ? styles.achievementBlockLast
                    : styles.achievementBlock
                }
              >
                <Text style={styles.achievementTitle}>{ach.title}</Text>
                <Text style={styles.achievementText}>{ach.text}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Skills */}
      {data.skills && (
        <View style={styles.skillsSection}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skillsText}>{data.skills}</Text>
        </View>
      )}

      {/* Certification */}
      {data.certification && (
        <View style={styles.certSection}>
          <Text style={styles.sectionTitle}>Certification</Text>
          <Text style={styles.certText}>{data.certification.title}</Text>
          <Text style={styles.certDesc}>{data.certification.description}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default CleanBusinessAnalystPDFResume;
