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
    backgroundColor: "#ffffff",
    color: "#333",
  },
  header: {
    marginBottom: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  initialsCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
  },
  role: {
    fontSize: 12,
    color: "#2563eb",
    fontWeight: "medium",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 6,
    flexWrap: "wrap",
  },
  contactItem: {
    fontSize: 9,
    backgroundColor: "#f1f5f9",
    padding: "3 8",
    borderRadius: 10,
    color: "#475569",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitleBox: {
    backgroundColor: "#1e293b",
    padding: "4 10",
    marginBottom: 10,
    alignSelf: "flex-start",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  timelineContainer: {
    marginLeft: 5,
    paddingLeft: 15,
    borderLeftWidth: 2,
    borderLeftColor: "#e2e8f0",
  },
  timelineItem: {
    marginBottom: 12,
    flexDirection: "row",
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#2563eb",
    marginRight: 10,
    marginTop: 6,
  },
  itemHeader: {
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
  },
  itemSubtitle: {
    fontSize: 10,
    color: "#2563eb",
  },
  itemDate: {
    fontSize: 9,
    color: "#64748b",
    fontStyle: "italic",
    marginTop: 1,
  },
  descText: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: "#334155",
    marginTop: 3,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillBox: {
    backgroundColor: "#eff6ff",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 4,
    padding: "6 12",
  },
  skillText: {
    color: "#1e40af",
    fontSize: 9,
    fontWeight: "bold",
  },
});

const getInitials = (name) => {
  if (!name) return "Me";
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

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
const InfographicLite = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>{getInitials(data.name)}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.jobRole || "Professional"}</Text>
          <View style={styles.contactRow}>
            <Text style={styles.contactItem}>{data.email}</Text>
            <Text style={styles.contactItem}>
              {data.phone || data.phone_no}
            </Text>
            {data.address && (
              <Text style={styles.contactItem}>{data.address}</Text>
            )}
            {data.linkedin && (
              <Link src={data.linkedin} style={{ textDecoration: "none" }}>
                <Text style={{ ...styles.contactItem, color: "#2563eb" }}>
                  LinkedIn
                </Text>
              </Link>
            )}
          </View>
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>About Me</Text>
          </View>
          <Text style={{ fontSize: 10, lineHeight: 1.6, paddingLeft: 5 }}>
            {data.summary}
          </Text>
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Core Skills</Text>
          </View>
          <View style={styles.skillsGrid}>
            {data.skills.map((skill, i) => (
              <View key={i} style={styles.skillBox}>
                <Text style={styles.skillText}>{skill.name || skill}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Experience - Timeline Look */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Working History</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data?.experience.map((exp, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemSubtitle}>{exp.companyName}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <View style={{ marginTop: 2 }}>
                  {splitToBullets(exp?.description).map((bullet, idx) => (
                    <Text key={idx} style={styles?.descText}>
                      • {bullet.replace(/^•\s*/, "")}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Projects</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.title}</Text>
                  <Text style={styles.itemDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{ fontSize: 9, color: "#2563eb", marginBottom: 2 }}
                  >
                    {proj.technologiesOrTopics}
                  </Text>
                )}
                <View style={{ marginTop: 2 }}>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <Text key={idx} style={styles.descText}>
                      • {bullet.replace(/^•\s*/, "")}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Certificates */}
      {data.certificates?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Certificates</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{cert.title}</Text>
                  <Text style={styles.itemDate}>{formatDate(cert.year)}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{cert.organization}</Text>
                {cert.credentialUrl && (
                  <Link
                    src={cert.credentialUrl}
                    style={{ fontSize: 9, color: "#2563eb", marginTop: 2 }}
                  >
                    View Credential
                  </Link>
                )}
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <Text style={styles.itemTitle}>{edu.institution}</Text>
                <Text style={styles.itemSubtitle}>
                  {edu.degree} {edu.grade ? `(${edu.grade})` : ""}
                </Text>
                <Text style={styles.itemDate}>
                  {formatDate(edu.startYear)} -{" "}
                  {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default InfographicLite;
