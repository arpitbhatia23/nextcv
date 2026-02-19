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
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#000",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: "#e91e63", // TCS Magenta-ish accent
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  role: {
    marginTop: 4,
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 9,
    color: "#333",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    backgroundColor: "#333", // Dark header background
    padding: "4 8",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  // Experience
  jobBlock: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#e91e63",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  jobCompany: {
    fontSize: 10,
    fontFamily: "Helvetica-Oblique",
    color: "#444",
  },
  jobDate: {
    fontSize: 9,
    color: "#666",
  },
  description: {
    fontSize: 10,
    marginTop: 2,
    textAlign: "justify",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 6,
  },
  bulletPoint: {
    width: 6,
    fontSize: 10,
    color: "#e91e63",
  },
  bulletText: {
    flex: 1,
  },
  // Skills Table Style
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 8,
    backgroundColor: "#f5f5f5",
  },
  skillItem: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#333",
  },
});

const splitToBullets = (desc) => {
  if (Array.isArray(desc)) return desc;
  if (typeof desc !== "string") return [];

  return desc
    .split("\n")
    .flatMap((line) => {
      const trimmed = line.trim();
      if (!trimmed) return [];
      if (trimmed.startsWith("•")) return [trimmed.replace(/^•\s*/, "")];
      if (trimmed.includes(";"))
        return trimmed
          .split(";")
          .map((b) => b.trim())
          .filter(Boolean);
      return [trimmed];
    })
    .filter(Boolean);
};

const TcsDigital = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.jobRole}</Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text>| {data.phone || data.phone_no}</Text>
            )}
            {data.address && <Text>| {data.address}</Text>}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ color: "#000", textDecoration: "none" }}
              >
                | LinkedIn
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ color: "#000", textDecoration: "none" }}
              >
                | Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={styles.jobCompany}>{exp.companyName}</Text>
                <View>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>›</Text>
                      <Text style={[styles.description, styles.bulletText]}>
                        {bullet}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{ fontSize: 9, color: "#e91e63", marginBottom: 2 }}
                  >
                    {proj.technologiesOrTopics}
                  </Text>
                )}
                <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>›</Text>
                      <Text style={[styles.description, styles.bulletText]}>
                        {bullet}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillContainer}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
                  {i < data.skills.length - 1 ? "  • " : ""}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 4, paddingLeft: 8 }}>
                <Text style={{ fontSize: 11, fontFamily: "Helvetica-Bold" }}>
                  {edu.institution}
                </Text>
                <Text style={{ fontSize: 10 }}>
                  {edu.degree} | {formatDate(edu.startYear)} -{" "}
                  {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default TcsDigital;
