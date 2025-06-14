"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

// Elegant and modern PDF resume styles
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
    fontSize: 9,
    color: "#4f8cff",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
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

const PDFResumeTemplate = ({ data }) => (
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
              <Text>
                <Link src={data.linkedin}>LinkedIn</Link>
                {"  "}
              </Text>
            )}
            {data.github && (
              <Text>
                <Link src={data.github}>GitHub</Link>
                {"  "}
              </Text>
            )}
            {data.portfolio && (
              <Text>
                <Link src={data.portfolio}>Portfolio</Link>
              </Text>
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

export default PDFResumeTemplate;
