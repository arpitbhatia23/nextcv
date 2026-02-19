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
    padding: 35,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#222",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    borderBottomWidth: 4,
    borderBottomColor: "#5e35b1", // HCL Purple-ish
    paddingBottom: 15,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#5e35b1",
    marginBottom: 4,
  },
  role: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    fontFamily: "Helvetica-Oblique",
  },
  contactCol: {
    alignItems: "flex-end",
    fontSize: 9,
    gap: 2,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1a237e", // Deep Blue
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
    color: "#333",
  },
  jobCompany: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#5e35b1",
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
    paddingLeft: 10,
  },
  bulletPoint: {
    width: 6,
    fontSize: 10,
    color: "#5e35b1",
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
    backgroundColor: "#ede7f6", // Light Purple
    color: "#5e35b1",
    paddingVertical: 2,
    paddingHorizontal: 8,
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

const HclTech = ({ data }) => {
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
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text>{data.phone || data.phone_no}</Text>
            )}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ color: "#5e35b1", textDecoration: "none" }}
              >
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link
                src={data.github}
                style={{ color: "#5e35b1", textDecoration: "none" }}
              >
                GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ color: "#5e35b1", textDecoration: "none" }}
              >
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile Overview</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
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
                      color: "#1a237e",
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

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.jobDate}>{formatDate(edu.endYear)}</Text>
                </View>
                <Text style={{ fontSize: 10 }}>{edu.degree}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default HclTech;
