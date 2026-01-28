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
    backgroundColor: "#ffffff",
    color: "#333",
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb", // Blue-600
    paddingBottom: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1e3a8a", // Blue-900
    marginBottom: 4,
    textTransform: "uppercase",
  },
  role: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "medium",
    marginBottom: 6,
  },
  contact: {
    fontSize: 9,
    color: "#555",
    marginTop: 2,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e3a8a",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  itemGroup: {
    marginBottom: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
  },
  itemSubtitle: {
    fontSize: 10,
    color: "#4b5563",
    fontStyle: "italic",
  },
  itemDate: {
    fontSize: 9,
    color: "#6b7280",
  },
  description: {
    fontSize: 9,
    lineHeight: 1.5,
    color: "#374151",
    marginLeft: 10,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: "#2563eb",
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillTag: {
    backgroundColor: "#eff6ff",
    color: "#1e40af",
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
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
const ProfessionalClean = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>
            {data.jobRole || "Professional Title"}
          </Text>
          <Text style={styles.contact}>
            {data.email} | {data.phone} | {data.address}
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ fontSize: 9, color: "#2563eb" }}
              >
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link src={data.github} style={{ fontSize: 9, color: "#2563eb" }}>
                GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ fontSize: 9, color: "#2563eb" }}
              >
                Portfolio
              </Link>
            )}
          </View>
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={{ fontSize: 9, lineHeight: 1.6, color: "#374151" }}>
            {data.summary}
          </Text>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate) || "Present"}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>{exp.companyName}</Text>
              <View style={{ marginTop: 4 }}>
                {splitToBullets(exp.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.description}>
                      {bullet.replace(/^•\s*/, "")}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{edu.institution}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(edu.startYear)} -{" "}
                  {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>
                {edu.degree} {edu.grade ? `| Grade: ${edu.grade}` : ""}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Skills</Text>
          <View style={styles.skillsRow}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillTag}>
                {skill.name || skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{proj.title}</Text>
                <Text style={styles.itemDate}>{formatDate(proj.date)}</Text>
              </View>
              {proj.technologiesOrTopics && (
                <Text
                  style={{ fontSize: 9, color: "#2563eb", marginBottom: 2 }}
                >
                  {proj.technologiesOrTopics}
                </Text>
              )}
              <View style={{ marginTop: 2 }}>
                {splitToBullets(proj.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.description}>
                      {bullet.replace(/^•\s*/, "")}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Certificates */}
      {data.certificates?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificates</Text>
          {data.certificates.map((cert, i) => (
            <View key={i} style={styles.itemGroup}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{cert.title}</Text>
                <Text style={styles.itemDate}>{formatDate(cert.year)}</Text>
              </View>
              <Text style={styles.itemSubtitle}>{cert.organization}</Text>
              {cert.credentialUrl && (
                <Link
                  src={cert.credentialUrl}
                  style={{ fontSize: 9, color: "#2563eb", marginTop: 2 }}
                >
                  View Credential
                </Link>
              )}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default ProfessionalClean;
