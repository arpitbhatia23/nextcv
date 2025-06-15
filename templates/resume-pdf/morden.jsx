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

// SVG Icons for LinkedIn, GitHub, Portfolio
const LinkedInIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill="#0A66C2"
      d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.54 20h-2.46v-8h2.46v8zm-1.23-9.21c-.79 0-1.43-.64-1.43-1.43s.64-1.43 1.43-1.43 1.43.64 1.43 1.43-.64 1.43-1.43 1.43zm14.23 9.21h-2.46v-4.18c0-1-.02-2.29-1.39-2.29-1.39 0-1.61 1.09-1.61 2.22v4.25h-2.46v-8h2.36v1.09h.03c.33-.62 1.13-1.27 2.33-1.27 2.49 0 2.95 1.64 2.95 3.77v4.41z"
    />
  </Svg>
);

const GitHubIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill="#171515"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.004-.404c1.018.004 2.045.138 3.004.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.241 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.369.823 1.096.823 2.211v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </Svg>
);

const PortfolioIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path
      fill="#4f8cff"
      d="M2 7V6a5 5 0 0110 0v1h8a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V9a2 2 0 012-2zm8-1a3 3 0 10-6 0v1h6V6zm10 3H2v10h18V9zm-6 2v2h-2v-2h2zm-4 0v2H6v-2h2z"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#f4f6fa",
    color: "#22223b",
  },
  header: {
    borderBottom: "2 solid #4f8cff",
    marginBottom: 14,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameBlock: {
    flexDirection: "column",
    flexGrow: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#22223b",
    marginBottom: 3,
    letterSpacing: 0.5,
  },
  headline: {
    fontSize: 12,
    color: "#4f8cff",
    fontWeight: "bold",
    marginBottom: 4,
  },
  contact: {
    fontSize: 9,
    color: "#4f4f4f",
    marginBottom: 1,
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 8,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  linkText: {
    fontSize: 9,
    color: "#4f8cff",
    marginLeft: 3,
    textDecoration: "underline",
  },
  section: {
    marginBottom: 18,
    paddingBottom: 6,
    borderBottom: "1 solid #E2E8F0",
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#4f8cff",
    marginBottom: 6,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  summaryText: {
    fontSize: 10,
    lineHeight: 1.45,
    color: "#333",
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  },
  skill: {
    backgroundColor: "#e0ecff",
    color: "#184fa7",
    borderRadius: 3,
    padding: "2 6",
    fontSize: 9,
    marginRight: 6,
    marginBottom: 4,
  },
  eduBlock: {
    marginBottom: 6,
  },
  eduTitle: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#2a374d",
  },
  eduSubtitle: {
    fontSize: 10,
    color: "#556080",
  },
  expBlock: {
    marginBottom: 8,
  },
  expTitle: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#2a374d",
  },
  expMeta: {
    fontSize: 9,
    color: "#4f8cff",
    marginBottom: 1,
  },
  expDesc: {
    fontSize: 9,
    color: "#444",
    marginBottom: 1,
  },
  projBlock: {
    marginBottom: 8,
  },
  projTitle: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#2a374d",
  },
  projMeta: {
    fontSize: 9,
    color: "#4f8cff",
    marginBottom: 1,
  },
  projTech: {
    fontSize: 9,
    color: "#184fa7",
    marginBottom: 1,
    fontStyle: "italic",
  },
  projDesc: {
    fontSize: 9,
    color: "#444",
  },
});

const ModernPDFResumeTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{data.name || "Your Name"}</Text>
          {data.headline && (
            <Text style={styles.headline}>{data.headline}</Text>
          )}
          <Text style={styles.contact}>
            {data.email} | {data.phone} | {data.address}
          </Text>
          <View style={styles.links}>
            {data.linkedin && (
              <View style={styles.linkItem}>
                <LinkedInIcon />
                <Link src={data.linkedin} style={styles.linkText}>
                  LinkedIn
                </Link>
              </View>
            )}
            {data.github && (
              <View style={styles.linkItem}>
                <GitHubIcon />
                <Link src={data.github} style={styles.linkText}>
                  GitHub
                </Link>
              </View>
            )}
            {data.portfolio && (
              <View style={styles.linkItem}>
                <PortfolioIcon />
                <Link src={data.portfolio} style={styles.linkText}>
                  Portfolio
                </Link>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Profile</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Skills</Text>
          <View style={styles.skillList}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skill}>
                {skill.name}
                {skill.level ? ` (${skill.level})` : ""}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.eduBlock}>
              <Text style={styles.eduTitle}>{edu.institution}</Text>
              <Text style={styles.eduSubtitle}>
                {edu.degree} &nbsp;|&nbsp; {edu.startYear} - {edu.endYear}
                {edu.grade ? ` | Grade: ${edu.grade}` : ""}
              </Text>
              {edu.description && (
                <Text style={styles.summaryText}>{edu.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.expBlock}>
              <Text style={styles.expTitle}>
                {exp.position} @ {exp.companyName}
              </Text>
              <Text style={styles.expMeta}>
                {exp.startDate} - {exp.endDate}
              </Text>
              {exp.description && (
                <Text style={styles.expDesc}>{exp.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.projBlock}>
              <Text style={styles.projTitle}>{proj.title}</Text>
              <Text style={styles.projMeta}>
                {proj.roleOrType}
                {proj.organization && ` @ ${proj.organization}`}
                {proj.date && ` | ${proj.date}`}
              </Text>
              {proj.technologiesOrTopics && (
                <Text style={styles.projTech}>
                  Tech: {proj.technologiesOrTopics}
                </Text>
              )}
              {proj.description && (
                <Text style={styles.projDesc}>{proj.description}</Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ModernPDFResumeTemplate;
