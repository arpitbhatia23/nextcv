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
    padding: 0, // Full bleed header
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    backgroundColor: "#000",
    color: "#fff",
    padding: 40,
    paddingBottom: 30,
    marginBottom: 20,
  },
  name: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: "#E50914", // Netflix Red
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  role: {
    fontSize: 14,
    color: "#fff",
    marginTop: 10,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    fontSize: 9,
    color: "#aaa",
  },
  contentContainer: {
    paddingHorizontal: 40,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#000",
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#E50914",
    paddingLeft: 10,
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
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  jobCompany: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#E50914",
  },
  jobDate: {
    fontSize: 9,
    color: "#666",
  },
  description: {
    fontSize: 10,
    color: "#333",
    marginTop: 4,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 10,
    fontSize: 14,
    color: "#E50914",
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
    fontSize: 10,
    backgroundColor: "#f2f2f2",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
    color: "#000",
    fontFamily: "Helvetica-Bold",
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

const NetflixCulture = ({ data }) => {
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

        <View style={styles.contentContainer}>
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
              <Text style={styles.sectionTitle}>Impact Projects</Text>
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
                        color: "#E50914",
                        marginBottom: 2,
                        fontStyle: "italic",
                      }}
                    >
                      Context: {proj.technologiesOrTopics}
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
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education?.map((edu, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: "bold" }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 10 }}>
                    {edu.institution}, {formatDate(edu.endYear)}
                  </Text>
                </View>
              ))}
              {data.certificates?.map((cert, i) => (
                <View key={i} style={{ marginTop: 4 }}>
                  <Text style={{ fontSize: 11, fontWeight: "bold" }}>
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

export default NetflixCulture;
