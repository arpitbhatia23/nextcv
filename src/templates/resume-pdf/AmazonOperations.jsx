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
    fontFamily: "Times-Roman", // Amazon document style
    backgroundColor: "#fff",
    color: "#000",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 10,
  },
  name: {
    fontSize: 20,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  contactRow: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap", // Wrap if too long
    gap: 12,
    fontSize: 9,
    fontFamily: "Times-Roman",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 8,
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
    alignItems: "flex-end", // Align text bottom
  },
  jobTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10.5,
  },
  jobCompany: {
    fontFamily: "Times-Italic",
    fontSize: 10.5,
  },
  jobDate: {
    fontFamily: "Times-Italic",
    fontSize: 9,
  },
  description: {
    fontSize: 10,
    textAlign: "justify", // Document style
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 10,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
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
    fontFamily: "Times-Roman",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 1,
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

const AmazonOperations = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.contactRow}>
            {data.email && <Text>Email: {data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text>Phone: {data.phone || data.phone_no}</Text>
            )}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ color: "#000", textDecoration: "none" }}
              >
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link
                src={data.github}
                style={{ color: "#000", textDecoration: "none" }}
              >
                GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ color: "#000", textDecoration: "none" }}
              >
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary (Professional Profile) */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
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
                    {formatDate(exp.startDate)} –{" "}
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

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{edu.institution}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(edu.startYear)} –{" "}
                    {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
                <Text style={styles.jobCompany}>
                  {edu.degree} {edu.grade ? `(GPA: ${edu.grade})` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects & Achievements</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{
                      fontFamily: "Times-Italic",
                      fontSize: 9,
                      marginBottom: 2,
                    }}
                  >
                    Tech: {proj.technologiesOrTopics}
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
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontFamily: "Times-Bold", fontSize: 10 }}>
                  {cert.title}
                </Text>
                <Text style={{ fontSize: 9 }}>
                  {cert.organization} ({formatDate(cert.year)})
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default AmazonOperations;
