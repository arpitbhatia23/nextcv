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
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#f0AB00", // SAP Gold/Yellow
    paddingBottom: 15,
    backgroundColor: "#222",
    marginHorizontal: -30,
    marginTop: -30,
    padding: 30,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  role: {
    marginTop: 8,
    fontSize: 12,
    color: "#ccc",
    fontFamily: "Helvetica",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 9,
    color: "#eee",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#f0AB00",
    paddingLeft: 8,
  },
  // Experience
  jobBlock: {
    marginBottom: 14,
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
    fontFamily: "Helvetica",
    color: "#444",
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
    width: 6,
    fontSize: 10,
    color: "#f0AB00",
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
    backgroundColor: "#fff8e1", // Light Gold
    color: "#000",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#f0AB00",
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

const SapEnterprise = ({ data }) => {
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
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ color: "#fff", textDecoration: "none" }}
              >
                | Portfolio
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
                    style={{
                      fontSize: 9,
                      color: "#f0AB00",
                      fontStyle: "italic",
                      marginBottom: 2,
                    }}
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

        {/* Skills */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
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

export default SapEnterprise;
