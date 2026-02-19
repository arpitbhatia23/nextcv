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
    color: "#0070ad", // Capgemini Blue
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#0070ad",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#0070ad",
    marginBottom: 0,
  },
  role: {
    marginTop: 12,

    fontSize: 12,
    color: "#2b0a3d", // Dark purple/black
    fontFamily: "Helvetica",
    marginBottom: 2,
  },
  contactCol: {
    alignItems: "flex-end",
    gap: 2,
  },
  contactItem: {
    fontSize: 9,
    color: "#2b0a3d",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#2b0a3d",
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#0070ad",
    paddingLeft: 6,
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
    color: "#0070ad",
  },
  jobCompany: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#2b0a3d",
  },
  jobDate: {
    fontSize: 9,
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
    width: 8,
    fontSize: 12,
    color: "#0070ad",
    lineHeight: 1,
  },
  bulletText: {
    flex: 1,
  },
  // Skills
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    fontSize: 9.5,
    borderWidth: 1,
    borderColor: "#0070ad",
    color: "#0070ad",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
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

const CapgeminiFlow = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.role}>{data.jobRole}</Text>
          </View>
          <View style={styles.contactCol}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text style={styles.contactItem}>
                {data.phone || data.phone_no}
              </Text>
            )}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ ...styles.contactItem, textDecoration: "none" }}
              >
                LinkedIn
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{ fontSize: 9, color: "#0070ad", marginBottom: 2 }}
                  >
                    Tech Stack: {proj.technologiesOrTopics}
                  </Text>
                )}
                <View>
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Competencies</Text>
            <View style={styles.skillList}>
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
            <Text style={styles.sectionTitle}>Education</Text>
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
            {data.certificates?.length > 0 && (
              <View style={{ marginTop: 8 }}>
                <Text
                  style={{
                    ...styles.sectionTitle,
                    fontSize: 11,
                    borderLeftWidth: 0,
                    paddingLeft: 0,
                    marginBottom: 4,
                  }}
                >
                  Certifications
                </Text>
                {data.certificates.map((cert, i) => (
                  <View key={i} style={{ marginBottom: 2 }}>
                    <Text style={{ fontSize: 10 }}>
                      {cert.title} - {cert.organization}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CapgeminiFlow;
