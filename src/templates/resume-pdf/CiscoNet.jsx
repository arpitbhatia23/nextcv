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
    color: "#222",
    lineHeight: 1.4,
  },
  header: {
    backgroundColor: "#00bceb", // Cisco Cyan
    color: "#fff",
    padding: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    marginBottom: 4,
  },
  role: {
    marginTop: 8,
    fontSize: 12,
    color: "#e6f7ff",
  },
  contactCol: {
    alignItems: "flex-end",
    gap: 4,
  },
  contactItem: {
    fontSize: 9,
    color: "#fff",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#00bceb",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 2,
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
  },
  jobCompany: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold", // Bold company name
    color: "#666",
  },
  jobDate: {
    fontSize: 9,
    color: "#888",
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
    color: "#00bceb",
  },
  bulletText: {
    flex: 1,
  },
  // Skills grid
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  gridItem: {
    width: "50%",
    marginBottom: 4,
    fontSize: 9.5,
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

const CiscoNet = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header - Full Width Colored */}
        <View style={{ margin: -30, marginBottom: 30 }}>
          <View style={styles.header}>
            <View>
              <Text style={styles.name}>{data.name}</Text>
              <Text style={styles.role}>{data.jobRole}</Text>
            </View>
            <View style={styles.contactCol}>
              {data.email && (
                <Text style={styles.contactItem}>{data.email}</Text>
              )}
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
              {data.github && (
                <Link
                  src={data.github}
                  style={{ ...styles.contactItem, textDecoration: "none" }}
                >
                  GitHub
                </Link>
              )}
            </View>
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
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{ fontSize: 9, color: "#00bceb", marginBottom: 2 }}
                  >
                    Tech: {proj.technologiesOrTopics}
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

        {/* Skills - 2 Column Grid */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Expertise</Text>
            <View style={styles.gridContainer}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.gridItem}>
                  • {skill.name || skill}
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

export default CiscoNet;
