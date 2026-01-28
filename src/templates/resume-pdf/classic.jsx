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
import { formatDate } from "@/utils/datefromater";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#222",
  },
  header: {
    borderBottom: "1 solid #b0b0b0",
    marginBottom: 16,
    paddingBottom: 10,
    alignItems: "center",
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: 0.5,
    color: "#1a237e",
  },
  contact: { fontSize: 10, color: "#444", marginBottom: 2 },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 9,
    color: "#1565c0",
    marginBottom: 2,
  },
  section: { marginBottom: 18 },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1a237e",
    borderBottom: "1 solid #b0b0b0",
    marginBottom: 6,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  summaryText: { fontSize: 10, lineHeight: 1.5, color: "#333", marginTop: 3 },
  skillList: { flexDirection: "row", flexWrap: "wrap", marginTop: 3 },
  skill: {
    backgroundColor: "#e3f2fd",
    color: "#263238",
    borderRadius: 3,
    padding: "2 6",
    fontSize: 11,
    marginRight: 6,
    marginBottom: 4,
    fontWeight: "bold",
  },
  eduBlock: { marginBottom: 6 },
  eduTitle: { fontWeight: "bold", fontSize: 11, color: "#263238" },
  eduSubtitle: { fontSize: 10, color: "#455a64" },
  expBlock: { marginBottom: 8 },
  expTitle: { fontWeight: "bold", fontSize: 11, color: "#263238" },
  expMeta: { fontSize: 9, color: "#1976d2", marginBottom: 1 },
  bulletList: { marginLeft: 12, marginTop: 2, marginBottom: 2 },
  bulletItem: { flexDirection: "row", marginBottom: 2 },
  bulletSymbol: { width: 10, fontWeight: "bold" },
  projBlock: { marginBottom: 8 },
  projTitle: { fontWeight: "bold", fontSize: 11, color: "#263238" },
  projMeta: { fontSize: 9, color: "#1976d2", marginBottom: 1 },
  projTech: {
    fontSize: 9,
    color: "#1976d2",
    marginBottom: 1,
    fontStyle: "italic",
  },
  projDesc: { fontSize: 9, color: "#444" },
});

// Improved splitToBullets function
const splitToBullets = (desc) => {
  if (Array.isArray(desc)) return desc;
  if (typeof desc !== "string") return [];

  return desc
    .split("\n")
    .flatMap((line) => {
      const trimmed = line.trim();
      if (!trimmed) return [];

      // Keep AI bullet points intact
      if (trimmed.startsWith("•")) return [trimmed.replace(/^•\s*/, "")];

      // Split semicolon separated items
      if (trimmed.includes(";"))
        return trimmed
          .split(";")
          .map((b) => b.trim())
          .filter(Boolean);

      return [trimmed]; // keep full sentence
    })
    .filter(Boolean);
};

const ClassicTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name || "Your Name"}</Text>
        <Text style={styles.contact}>
          {data.email} | {data?.phone || data.phone_no} | {data.address}
        </Text>
        <View style={styles.links}>
          {data.linkedin && (
            <Text>
              <Link src={data.linkedin}>LinkedIn</Link> {"   "}
            </Text>
          )}
          {data.github && (
            <Text>
              <Link src={data.github}>GitHub</Link> {"   "}
            </Text>
          )}
          {data.portfolio && (
            <Text>
              <Link src={data.portfolio}>Portfolio</Link>
            </Text>
          )}
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
                {skill.name ?? skill}
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
                {edu.degree} | {formatDate(edu.startYear)} -{" "}
                {formatDate(edu.endYear) || "Present"}
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
                {formatDate(exp.startDate)} -{" "}
                {formatDate(exp.endDate) || "Present"}
              </Text>
              {exp.description && (
                <View style={styles.bulletList}>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text>{bullet}</Text>
                    </View>
                  ))}
                </View>
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
                {proj.date && ` | ${formatDate(proj.date)}`}
              </Text>
              {proj.technologiesOrTopics && (
                <Text style={styles.projTech}>
                  Tech: {proj.technologiesOrTopics}
                </Text>
              )}
              {proj.description && (
                <View style={styles.bulletList}>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Certificates */}
      {data.certificates?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Certificates</Text>
          {data.certificates.map((cert, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.projTitle}>{cert.title}</Text>
              <Text style={styles.projMeta}>
                {cert.organization}
                {cert.year ? ` | ${formatDate(cert.year)}` : ""}
              </Text>
              {cert.credentialUrl && (
                <Text>
                  <Link src={cert.credentialUrl}>Certificate Link</Link>
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ClassicTemplate;
