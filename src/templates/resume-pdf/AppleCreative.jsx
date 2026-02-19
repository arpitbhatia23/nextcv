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
    padding: 50,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#1d1d1f", // Apple Near Black
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 35,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#1d1d1f",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  contactRow: {
    marginTop: 4,
    flexDirection: "row",
    gap: 15,
    fontSize: 9,
    color: "#86868b", // Apple Grey
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#86868b",
    textTransform: "uppercase",
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  // Experience
  jobBlock: {
    marginBottom: 16,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
    alignItems: "baseline",
  },
  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: "#1d1d1f",
  },
  jobCompany: {
    fontFamily: "Helvetica",
    fontSize: 10.5,
    color: "#1d1d1f",
  },
  jobDate: {
    fontSize: 9,
    color: "#86868b",
  },
  description: {
    fontSize: 9.5,
    color: "#424245",
    textAlign: "left",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 8,
    fontSize: 8,
    color: "#86868b",
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
  },
  // Skills
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  skillItem: {
    fontSize: 9.5,
    color: "#424245",
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

const AppleCreative = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text>{data.phone || data.phone_no}</Text>
            )}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ color: "#86868b", textDecoration: "none" }}
              >
                LinkedIn
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ color: "#86868b", textDecoration: "none" }}
              >
                Portfolio
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
                    {formatDate(exp.startDate)} —{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={{ ...styles.jobCompany, marginBottom: 6 }}>
                  {exp.companyName}
                </Text>
                <View>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>●</Text>
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
                    style={{ fontSize: 9, color: "#86868b", marginBottom: 4 }}
                  >
                    {proj.technologiesOrTopics}
                  </Text>
                )}
                <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>●</Text>
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
                    {formatDate(edu.startYear)} —{" "}
                    {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
                <Text style={styles.jobCompany}>
                  {edu.degree}
                  {edu.grade ? ` · ${edu.grade}` : ""}
                </Text>
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

        {/* Certs */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9.5 }}>
                  {cert.title}
                </Text>
                <Text style={{ fontSize: 9, color: "#86868b" }}>
                  {cert.organization} · {formatDate(cert.year)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default AppleCreative;
