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
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#000",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: "#86BC25", // Deloitte Green
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#86BC25", // Green Dot
    marginLeft: 2,
    marginBottom: 4,
  },
  role: {
    marginTop: 8,
    fontSize: 12,
    color: "#000",
    fontFamily: "Helvetica",
  },
  rightHeader: {
    alignItems: "flex-end",
  },
  contactItem: {
    fontSize: 9,
    color: "#000",
    marginBottom: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    textTransform: "uppercase",
    marginBottom: 10,
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
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  jobCompany: {
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#000",
  },
  jobDate: {
    fontSize: 9,
  },
  description: {
    fontSize: 10,
    color: "#000",
    marginTop: 2,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 8,
    fontSize: 10,
    color: "#86BC25",
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
    fontSize: 10,
    color: "#000",
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

const DeloitteAudit = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "baseline" }}>
              <Text style={styles.name}>{data.name}</Text>
              <View style={styles.dot} />
            </View>
            <Text style={styles.role}>{data.jobRole}</Text>
          </View>
          <View style={styles.rightHeader}>
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
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ ...styles.contactItem, textDecoration: "none" }}
              >
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
                    style={{
                      fontSize: 9,
                      fontStyle: "italic",
                      marginBottom: 2,
                    }}
                  >
                    {proj.technologiesOrTopics}
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
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillList}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
                  {i < data.skills.length - 1 ? "  /  " : ""}
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
                    fontSize: 10,
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

export default DeloitteAudit;
