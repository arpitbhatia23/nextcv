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
    padding: 36,
    fontSize: 10,
    fontFamily: "Times-Roman",
    backgroundColor: "#fff",
    color: "#111827",
  },
  header: {
    textAlign: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  subHeader: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    fontSize: 9,
    color: "#4b5563",
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 2,
    marginBottom: 8,
    color: "#111827",
  },
  entryBlock: {
    marginBottom: 8,
  },
  entryTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
  },
  entryDate: {
    fontSize: 9,
    color: "#374151",
    fontStyle: "italic",
  },
  entrySubtitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    textAlign: "justify",
  },
  bulletList: {
    marginLeft: 12,
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletMarker: {
    width: 10,
    fontSize: 10,
  },
  bulletContent: {
    flex: 1,
    fontSize: 10,
  },
  skillText: {
    fontSize: 10,
    lineHeight: 1.5,
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

const ExecutiveGray = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.subHeader}>
          {data.jobRole || "Executive Professional"}
        </Text>
        <View style={styles.contactRow}>
          <Text>{data.email}</Text>
          <Text>•</Text>
          <Text>{data.phone}</Text>
          <Text>•</Text>
          <Text>{data.address}</Text>
        </View>
        <View style={styles.contactRow}>
          {data.linkedin && (
            <Link
              src={data.linkedin}
              style={{ color: "#374151", textDecoration: "none" }}
            >
              LinkedIn
            </Link>
          )}
          {data.linkedin && data.portfolio && <Text>•</Text>}
          {data.portfolio && (
            <Link
              src={data.portfolio}
              style={{ color: "#374151", textDecoration: "none" }}
            >
              Portfolio
            </Link>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Profile</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{exp.companyName}</Text>
                <Text style={styles.entryDate}>
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate) || "Present"}
                </Text>
              </View>
              <Text style={styles.entrySubtitle}>{exp.position}</Text>
              <View style={styles.bulletList}>
                {splitToBullets(exp.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bulletMarker}>•</Text>
                    <Text style={styles.bulletContent}>
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
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{edu.institution}</Text>
                <Text style={styles.entryDate}>
                  {formatDate(edu.startYear)} -{" "}
                  {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
              <Text style={styles.entrySubtitle}>
                {edu.degree} {edu.grade ? `(Grade: ${edu.grade})` : ""}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <Text style={styles.skillText}>
            {data.skills.map((s) => s.name || s).join(" • ")}
          </Text>
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Significant Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{proj.title}</Text>
                <Text style={styles.entryDate}>{formatDate(proj.date)}</Text>
              </View>
              {proj.technologiesOrTopics && (
                <Text
                  style={{ fontSize: 9, fontStyle: "italic", marginBottom: 2 }}
                >
                  Tech: {proj.technologiesOrTopics}
                </Text>
              )}
              <View style={styles.bulletList}>
                {splitToBullets(proj.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bulletMarker}>•</Text>
                    <Text style={styles.bulletContent}>
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
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{cert.title}</Text>
                <Text style={styles.entryDate}>{formatDate(cert.year)}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{cert.organization}</Text>
              {cert.credentialUrl && (
                <Link
                  src={cert.credentialUrl}
                  style={{
                    color: "#374151",
                    textDecoration: "none",
                    fontSize: 9,
                  }}
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

export default ExecutiveGray;
