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
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
  leftSidebar: {
    width: "32%",
    backgroundColor: "#f1f5f9", // Slate-100
    padding: 20,
    height: "100%",
  },
  rightContent: {
    width: "68%",
    padding: 25,
    flexGrow: 1,
  },
  // Sidebar Styles
  sidebarName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  sidebarRole: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0f172a",
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  contactItem: {
    fontSize: 9,
    marginBottom: 4,
    color: "#334155",
  },
  linkItem: {
    fontSize: 9,
    marginBottom: 4,
    color: "#2563eb",
    textDecoration: "none",
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 3,
    color: "#334155",
    backgroundColor: "#e2e8f0",
    padding: "2 5",
    borderRadius: 2,
    alignSelf: "flex-start",
  },
  // Main Content Styles
  mainSection: {
    marginBottom: 18,
  },
  mainTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#0f172a",
    paddingBottom: 4,
    marginBottom: 10,
  },
  jobBlock: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#000",
  },
  jobCompany: {
    fontSize: 10,
    color: "#475569",
    fontWeight: "medium",
  },
  jobDate: {
    fontSize: 9,
    color: "#64748b",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 10,
    fontSize: 10,
    color: "#0f172a",
  },
  description: {
    fontSize: 9.5,
    lineHeight: 1.4,
    color: "#334155",
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

      // Keep AI bullet points intact
      if (trimmed.startsWith("•")) return [trimmed.replace(/^•\s*/, "")];

      // Split semicolon separated items
      if (trimmed.includes(";"))
        return trimmed
          .split(";")
          .map((b) => b.trim())
          .filter(Boolean);

      return [trimmed]; // keep full sentence
    })
    .filter(Boolean);
};

const SidebarLeft = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Sidebar */}
      <View style={styles.leftSidebar}>
        {/* Profile Info */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.sidebarName}>{data.name}</Text>
          <Text style={styles.sidebarRole}>{data.jobRole}</Text>
        </View>

        {/* Contact */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Contact</Text>
          <Text style={styles.contactItem}>{data.phone}</Text>
          <Text style={styles.contactItem}>{data.email}</Text>
          <Text style={styles.contactItem}>{data.address}</Text>
        </View>

        {/* Links */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Links</Text>
          {data.linkedin && (
            <Link src={data.linkedin} style={styles.linkItem}>
              LinkedIn Profile
            </Link>
          )}
          {data.github && (
            <Link src={data.github} style={styles.linkItem}>
              GitHub Profile
            </Link>
          )}
          {data.portfolio && (
            <Link src={data.portfolio} style={styles.linkItem}>
              Portfolio
            </Link>
          )}
        </View>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Skills</Text>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>
                {skill.name || skill}
              </Text>
            ))}
          </View>
        )}

        {/* Education (Sidebar is good for Education usually) */}
        {data.education?.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 9.5, fontWeight: "bold" }}>
                  {edu.degree}
                </Text>
                <Text style={{ fontSize: 9 }}>{edu.institution}</Text>
                <Text style={{ fontSize: 8, color: "#666" }}>
                  {formatDate(edu.startYear)} -{" "}
                  {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Right Content */}
      <View style={styles.rightContent}>
        {/* Summary */}
        {data.summary && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Experience</Text>
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
                    <View key={idx} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.description}>
                        {bullet.replace(/^•\s*/, "")}
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
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{ fontSize: 9, color: "#2563eb", marginBottom: 2 }}
                  >
                    Tech: {proj.technologiesOrTopics}
                  </Text>
                )}
                <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.description}>
                        {bullet.replace(/^•\s*/, "")}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Certificates</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{cert.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(cert.year)}</Text>
                </View>
                <Text style={{ ...styles.jobCompany, marginBottom: 2 }}>
                  {cert.organization}
                </Text>
                {cert.credentialUrl && (
                  <Link
                    src={cert.credentialUrl}
                    style={{
                      fontSize: 9,
                      color: "#2563eb",
                      textDecoration: "none",
                    }}
                  >
                    View Credential
                  </Link>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default SidebarLeft;
