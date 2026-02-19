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
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#0284c7", // Sky/Blue 600
    paddingLeft: 15,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8, // Added margin to prevent overlap
  },
  role: {
    marginTop: 6,

    fontSize: 14,
    color: "#0284c7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: "#475569",
  },
  // Sections
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    backgroundColor: "#334155", // Slate 700
    padding: "3 8",
    marginBottom: 10,
    textTransform: "uppercase",
    alignSelf: "flex-start",
    borderRadius: 2,
  },
  // Research/Trial Experience
  jobBlock: {
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 10,
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
    color: "#0284c7",
    fontFamily: "Helvetica-Bold",
  },
  jobDate: {
    fontSize: 9,
    color: "#64748b",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 12,
    color: "#0284c7",
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: "#334155",
  },
  // Skills grid
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    fontSize: 9,
    backgroundColor: "#f0f9ff",
    padding: "3 6",
    color: "#0369a1",
    borderWidth: 1,
    borderColor: "#bae6fd",
    borderRadius: 2,
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

const ClinicalTrial = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>
            {data.jobRole || "Clinical Research Associate"}
          </Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text>| {data.phone || data.phone_no}</Text>
            )}
            {data.address && <Text>| {data.address}</Text>}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ color: "#0284c7", textDecoration: "none" }}
              >
                | LinkedIn
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Profile</Text>
            <Text style={{ fontSize: 10, color: "#334155" }}>
              {data.summary}
            </Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Clinical Research Experience
            </Text>
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

                <View style={{ marginTop: 4 }}>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>›</Text>
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
            <Text style={styles.sectionTitle}>Research Competencies</Text>
            <View style={styles.skillContainer}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications (Critical for Clinical) */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications & Training</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold", width: 150 }}>
                  {cert.title}
                </Text>
                <Text style={{ fontSize: 10, color: "#475569" }}>
                  {" "}
                  - {cert.organization} ({formatDate(cert.year)})
                </Text>
              </View>
            ))}
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
                <Text style={{ fontSize: 10 }}>
                  {edu.institution}, {formatDate(edu.endYear)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ClinicalTrial;
