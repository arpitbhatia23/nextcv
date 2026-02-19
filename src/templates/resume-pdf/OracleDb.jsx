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
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#f80000", // Oracle Red
    paddingBottom: 15,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#f80000",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  role: {
    marginTop: 6,
    fontSize: 12,
    color: "#444",
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: "#666",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#333",
    textTransform: "uppercase",
    marginBottom: 10,
    backgroundColor: "#f5f5f5",
    padding: "4 8",
  },
  // Experience
  jobBlock: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    alignItems: "center",
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  jobCompany: {
    fontSize: 10,
    color: "#f80000",
    fontFamily: "Helvetica-Bold",
  },
  jobDate: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#666",
  },
  description: {
    fontSize: 10,
    color: "#333",
    marginTop: 2,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 6,
    fontSize: 10,
    color: "#f80000",
  },
  bulletText: {
    flex: 1,
  },
  // Skills Table
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    fontSize: 9.5,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "#333",
    paddingVertical: 3,
    paddingHorizontal: 8,
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

const OracleDb = ({ data }) => {
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
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ color: "#f80000", textDecoration: "none" }}
              >
                | LinkedIn
              </Link>
            )}
            {data.github && (
              <Link
                src={data.github}
                style={{ color: "#f80000", textDecoration: "none" }}
              >
                | GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ color: "#f80000", textDecoration: "none" }}
              >
                | Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
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
                <Text style={{ ...styles.jobCompany, marginBottom: 4 }}>
                  {exp.companyName}
                </Text>
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
            <Text style={styles.sectionTitle}>Technical Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{ fontSize: 9, color: "#f80000", marginBottom: 2 }}
                  >
                    Technology: {proj.technologiesOrTopics}
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
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillContainer}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Education & Certs */}
        {(data.education?.length > 0 || data.certificates?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education & Certifications</Text>
            {data.education?.map((edu, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  {edu.degree}
                </Text>
                <Text style={{ fontSize: 10 }}>
                  {edu.institution}, {formatDate(edu.endYear)}
                </Text>
              </View>
            ))}
            {data.certificates?.map((cert, i) => (
              <View key={i} style={{ marginTop: 4 }}>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                  {cert.title}
                </Text>
                <Text style={{ fontSize: 10 }}>{cert.organization}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default OracleDb;
