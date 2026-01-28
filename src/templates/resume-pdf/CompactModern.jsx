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
    padding: 25,
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#222",
  },
  header: {
    borderBottom: "1 solid #ddd",
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  role: {
    fontSize: 10,
    color: "#666",
    marginBottom: 2,
    textTransform: "uppercase",
  },
  contactColumn: {
    fontSize: 8,
    textAlign: "right",
    color: "#555",
    lineHeight: 1.3,
  },
  section: {
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: "bold",
    backgroundColor: "#f3f4f6", // Gray-100
    padding: "2 5",
    marginBottom: 5,
    textTransform: "uppercase",
    borderRadius: 2,
  },
  compactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 9.5,
  },
  subtitle: {
    fontSize: 9,
    color: "#444",
    fontStyle: "italic",
    flex: 1,
    marginLeft: 8,
  },
  date: {
    fontSize: 8,
    color: "#777",
  },
  descText: {
    fontSize: 8.5,
    color: "#333",
    lineHeight: 1.3,
    marginLeft: 4,
  },
  skillText: {
    fontSize: 8.5,
    lineHeight: 1.4,
  },
  projectTitle: {
    fontWeight: "bold",
    fontSize: 9,
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

const CompactModern = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Compact Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.jobRole}</Text>
        </View>
        <View style={styles.contactColumn}>
          <Text>{data.email}</Text>
          <Text>{data.phone}</Text>
          <Text>{data.address}</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            {data.linkedin && <Link src={data.linkedin}>LinkedIn</Link>}
            {data.github && <Link src={data.github}>GitHub</Link>}
            {data.portfolio && <Link src={data.portfolio}>Portfolio</Link>}
          </View>
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Profile</Text>
          <Text style={styles.descText}>{data.summary}</Text>
        </View>
      )}

      {/* Skills - text based for compactness */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Skills</Text>
          <Text style={styles.skillText}>
            {data.skills.map((s) => s.name || s).join("  |  ")}
          </Text>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.compactRow}>
                <Text style={styles.title}>{exp.position}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate) || "Present"}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 8.5,
                  fontWeight: "medium",
                  color: "#444",
                  marginBottom: 2,
                }}
              >
                {exp.companyName}
              </Text>
              {splitToBullets(exp.description).map((line, idx) => (
                <Text key={idx} style={styles.descText}>
                  • {line.replace(/^•\s*/, "")}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <View style={styles.compactRow}>
                <Text style={styles.projectTitle}>{proj.title}</Text>
                <Text style={styles.date}>{formatDate(proj.date)}</Text>
              </View>
              {proj.technologiesOrTopics && (
                <Text style={{ fontSize: 8, color: "#666", marginBottom: 1 }}>
                  {proj.technologiesOrTopics}
                </Text>
              )}
              {splitToBullets(proj.description)
                .slice(0, 2)
                .map((line, idx) => (
                  <Text key={idx} style={styles.descText}>
                    - {line.replace(/^•\s*/, "")}
                  </Text>
                ))}
            </View>
          ))}
        </View>
      )}

      {/* Certificates */}
      {data.certificates?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Certificates</Text>
          {data.certificates.map((cert, i) => (
            <View key={i} style={{ marginBottom: 5 }}>
              <View style={styles.compactRow}>
                <Text style={styles.projectTitle}>{cert.title}</Text>
                <Text style={styles.date}>{formatDate(cert.year)}</Text>
              </View>
              <Text style={{ fontSize: 8.5, color: "#444" }}>
                {cert.organization}
              </Text>
              {cert.credentialUrl && (
                <Link
                  src={cert.credentialUrl}
                  style={{ fontSize: 8, color: "#555", marginTop: 1 }}
                >
                  View Credential
                </Link>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.compactRow}>
              <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                <Text style={styles.title}>{edu.institution}, </Text>
                <Text style={{ fontSize: 9 }}>{edu.degree}</Text>
              </View>
              <Text style={styles.date}>
                {formatDate(edu.startYear)} -{" "}
                {formatDate(edu.endYear) || "Present"}
              </Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default CompactModern;
