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
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#f4f4f4",
    padding: 20,
    padding: 20,
    flexGrow: 1,
  },
  main: {
    width: "70%",
    padding: 24,
  },
  // Sidebar Styles
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#243a5e", // Navy Blue
    marginBottom: 10,
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: "#00a4ef", // Microsoft Blue accent
    paddingBottom: 4,
  },
  contactItem: {
    fontSize: 9, // Slightly smaller
    marginBottom: 6,
    color: "#333",
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 4,
    color: "#444",
    backgroundColor: "#e6e6e6",
    padding: "3 6",
    borderRadius: 2,
  },
  eduBlock: {
    marginBottom: 12,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#243a5e",
  },
  eduInst: {
    fontSize: 9,
    color: "#555",
  },
  eduDate: {
    fontSize: 8,
    color: "#777",
    marginBottom: 4,
  },
  // Main Styles
  headerName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#243a5e",
    marginBottom: 4,
  },
  headerRole: {
    fontSize: 14,
    color: "#00a4ef", // Accent color
    marginBottom: 16,
    fontWeight: "medium",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#243a5e",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 4,
    marginTop: 10,
  },
  // Job Item
  jobBlock: {
    marginBottom: 14,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  jobCompany: {
    fontSize: 10,
    color: "#00a4ef",
    fontWeight: "bold",
    marginBottom: 2,
  },
  jobDate: {
    fontSize: 9,
    color: "#777",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#444",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: "#00a4ef",
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
        return trimmed.split(";").map((b) => b.trim()).filter(Boolean);
      return [trimmed];
    })
    .filter(Boolean);
};

const MicrosoftCorp = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Contact */}
          <View style={{ marginBottom: 24 }}>
            <Text style={styles.sidebarTitle}>Contact</Text>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text style={styles.contactItem}>{data.phone || data.phone_no}</Text>
            )}
            {data.address && <Text style={styles.contactItem}>{data.address}</Text>}
            {data.linkedin && (
              <Link src={data.linkedin} style={{ ...styles.contactItem, color: "#00a4ef" }}>
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link src={data.github} style={{ ...styles.contactItem, color: "#00a4ef" }}>
                GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link src={data.portfolio} style={{ ...styles.contactItem, color: "#00a4ef" }}>
                Portfolio
              </Link>
            )}
          </View>

          {/* Education */}
          {data.education?.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={styles.eduBlock}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduInst}>{edu.institution}</Text>
                  <Text style={styles.eduDate}>
                    {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Header */}
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.headerName}>{data.name}</Text>
            <Text style={styles.headerRole}>{data.jobRole || "Professional Role"}</Text>
            {data.summary && <Text style={styles.description}>{data.summary}</Text>}
          </View>

          {/* Experience */}
          {data.experience?.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={styles.jobBlock}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.jobCompany}>{exp.companyName}</Text>
                    <Text style={styles.jobDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                    </Text>
                  </View>
                  <View>
                    {splitToBullets(exp.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={{ ...styles.description, flex: 1 }}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Key Projects</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={styles.jobBlock}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                  {proj.technologiesOrTopics && (
                    <Text style={{ fontSize: 9, color: "#00a4ef", marginBottom: 2 }}>
                      {proj.technologiesOrTopics}
                    </Text>
                  )}
                  <View>
                    {splitToBullets(proj.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={{ ...styles.description, flex: 1 }}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Certificates */}
          {data.certificates?.length > 0 && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certificates.map((cert, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 11, fontWeight: "bold" }}>{cert.title}</Text>
                  <Text style={{ fontSize: 9, color: "#666" }}>
                    {cert.organization} | {formatDate(cert.year)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

export default MicrosoftCorp;
