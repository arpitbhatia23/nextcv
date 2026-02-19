"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/datefromater";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#333",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    backgroundColor: "#22c55e", // Growth Green
    padding: 20,
    color: "#fff",
  },
  name: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    marginBottom: 10,
  },
  role: {
    marginTop: 4,

    fontSize: 14,
    color: "#dcfce7", // Light green
    marginBottom: 10,
    textTransform: "uppercase",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 9,
    color: "#f0fdf4",
  },
  // Sections
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#166534", // Dark Green
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: "#22c55e",
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  // Metrics/Achievement Box (Unique for Sales)
  metricsBox: {
    backgroundColor: "#f0fdf4",
    padding: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#22c55e",
  },
  metricsTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#15803d",
    marginBottom: 10,
  },
  metricsText: {
    fontSize: 10,
    color: "#166534",
    lineHeight: 1.5,
  },
  // Experience
  jobBlock: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  jobCompany: {
    fontSize: 10,
    color: "#16a34a",
    fontFamily: "Helvetica-Bold",
  },
  jobDate: {
    fontSize: 9,
    color: "#666",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 6,
  },
  bulletPoint: {
    width: 8,
    fontSize: 12,
    color: "#22c55e",
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: "#333",
  },
  // Skills
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    fontSize: 9.5,
    backgroundColor: "#dcfce7",
    padding: "3 8",
    borderRadius: 4,
    color: "#166534",
    borderWidth: 1,
    borderColor: "#bbf7d0",
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

const SalesGrowth = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>
            {data.jobRole || "Sales Professional"}
          </Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text>| {data.phone || data.phone_no}</Text>
            )}
            {data.linkedin && <Text>| LinkedIn</Text>}
          </View>
        </View>

        {/* Summary / Objective */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.5 }}>
              {data.summary}
            </Text>
          </View>
        )}

        {/* Key Achievements (Highlighted Section) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Achievements</Text>
          <View style={styles.metricsBox}>
            <Text style={styles.metricsText}>
              {/* Suggesting user to add dynamic metrics here later, for now using summary or first job highlights if available */}
              {data.summary
                ? `Proven track record: ${data.summary.substring(0, 100)}...`
                : "Consistent top performer exceeding quotas by 150% YoY."}
            </Text>
          </View>
        </View>

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
                <View style={{ marginTop: 2 }}>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>$</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
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
            <Text style={styles.sectionTitle}>Sales Competencies</Text>
            <View style={styles.skillList}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
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
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  {edu.degree}
                </Text>
                <Text style={{ fontSize: 9 }}>
                  {edu.institution} | {formatDate(edu.endYear)}
                </Text>
              </View>
            ))}
            {data.certificates?.length > 0 && (
              <View style={{ marginTop: 6 }}>
                {data.certificates.map((cert, i) => (
                  <Text key={i} style={{ fontSize: 9 }}>
                    {cert.title} - {cert.organization}
                  </Text>
                ))}
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default SalesGrowth;
