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
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 34,
    fontWeight: "heavy", // react-pdf might map bold to standard bold, but let's try
    textTransform: "uppercase",
    letterSpacing: 3,
    marginBottom: 6,
    color: "#000",
  },
  role: {
    fontSize: 12,
    color: "#444",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: "#000",
    alignSelf: "center",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    fontSize: 9,
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textTransform: "uppercase",
    color: "#000",
    borderLeftWidth: 5,
    borderLeftColor: "#000",
    paddingLeft: 8,
  },
  itemGroup: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: "bold",
  },
  itemSubtitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
  itemDate: {
    fontSize: 9,
    color: "#555",
  },
  description: {
    fontSize: 9.5,
    lineHeight: 1.5,
    marginTop: 2,
    textAlign: "justify",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 10,
    fontSize: 14,
    lineHeight: 1,
  },
  skillsText: {
    fontSize: 10,
    lineHeight: 1.6,
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

const BoldHeader = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.role}>{data.jobRole || "Professional"}</Text>
        <View style={styles.contact}>
          <Text>{data.email}</Text>
          <Text>•</Text>
          <Text>{data.phone}</Text>
          <Text>•</Text>
          <Text>{data.address}</Text>
        </View>
        <View style={{ ...styles.contact, marginTop: 4 }}>
          {data.linkedin && (
            <Link
              src={data.linkedin}
              style={{ color: "#000", textDecoration: "none" }}
            >
              LINKEDIN
            </Link>
          )}
          {data.linkedin && data.github && <Text> • </Text>}
          {data.github && (
            <Link
              src={data.github}
              style={{ color: "#000", textDecoration: "none" }}
            >
              GITHUB
            </Link>
          )}
          {data.portfolio && data.github && <Text> • </Text>}
          {data.portfolio && (
            <Link
              src={data.portfolio}
              style={{ color: "#000", textDecoration: "none" }}
            >
              PORTFOLIO
            </Link>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <Text style={styles.description}>{data.summary}</Text>
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
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 9.5, flex: 1 }}>
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
                {edu.degree} {edu.grade ? `(${edu.grade})` : ""}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.skillsText}>
            {data.skills.map((s) => s.name || s).join("  //  ")}
          </Text>
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
                  style={{ fontSize: 9, fontStyle: "italic", marginBottom: 2 }}
                >
                  {proj.technologiesOrTopics}
                </Text>
              )}
              <View style={{ marginTop: 2 }}>
                {splitToBullets(proj.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={{ fontSize: 9.5, flex: 1 }}>
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
                  style={{
                    color: "#000",
                    textDecoration: "none",
                    fontSize: 9,
                    marginTop: 2,
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

export default BoldHeader;
