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
    backgroundColor: "#007cc3", // Infosys Blue
    color: "#fff",
    padding: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 9,
    flexWrap: "wrap",
    gap: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#007cc3",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 4,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  // Experience
  jobBlock: {
    marginBottom: 14,
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
    fontFamily: "Helvetica-Bold",
    color: "#555",
  },
  jobDate: {
    fontSize: 9,
    fontStyle: "italic",
    color: "#666",
  },
  description: {
    fontSize: 10,
    textAlign: "justify",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 10,
  },
  bulletPoint: {
    width: 6,
    fontSize: 14,
    color: "#007cc3",
    lineHeight: 1,
  },
  bulletText: {
    flex: 1,
  },
  // Skills Table
  table: {
    display: "table",
    width: "auto",
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 4,
  },
  tableCell: {
    width: "50%",
    fontSize: 10,
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

const InfosysSystem = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header (Full Width Blue) */}
        <View style={{ margin: -30, marginBottom: 30 }}>
          <View style={styles.header}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={{ fontSize: 12, marginBottom: 8, marginTop: 4 }}>
              {data.jobRole || "Professional Role"}
            </Text>
            <View style={styles.contactRow}>
              {data.email && <Text>{data.email}</Text>}
              {(data.phone || data.phone_no) && (
                <Text> | {data.phone || data.phone_no}</Text>
              )}
              {data.linkedin && (
                <Link
                  src={data.linkedin}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  | LinkedIn
                </Link>
              )}
              {data.github && (
                <Link
                  src={data.github}
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  | GitHub
                </Link>
              )}
            </View>
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={{ marginBottom: 20 }}>
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
                <View style={{ marginTop: 4 }}>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
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
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{
                      fontSize: 9,
                      color: "#007cc3",
                      fontStyle: "italic",
                      marginBottom: 2,
                    }}
                  >
                    Tech Stack: {proj.technologiesOrTopics}
                  </Text>
                )}
                <View style={{ marginTop: 2 }}>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
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
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.sectionTitle}>Technical Expertise</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {data.skills.map((skill, i) => (
                <View
                  key={i}
                  style={{
                    backgroundColor: "#f0f8ff",
                    padding: "4 8",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 9.5, color: "#007cc3" }}>
                    {skill.name || skill}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education & Certs */}
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {data.education?.length > 0 && (
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
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

          {data.certificates?.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certificates.map((cert, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {cert.title}
                  </Text>
                  <Text style={{ fontSize: 10 }}>{cert.organization}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default InfosysSystem;
