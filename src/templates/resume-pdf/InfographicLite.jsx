"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";
import { HEADER_NAME_STYLE, HEADER_ROLE_STYLE } from "./headerTypography";

const styles = StyleSheet.create({
  page: {
    padding: 34,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#1e293b",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.5,
    borderBottomColor: "#2563eb",
    paddingBottom: 12,
  },
  initialsCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#2563eb",
    backgroundColor: "#f8fafc",
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    color: "#2563eb",
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
  },
  headerContent: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  role: {
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#2563eb",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    gap: 8,
  },
  contactItem: {
    fontSize: 8.5,
    color: "#64748b",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitleBox: {
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 3,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#0f172a",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  timelineContainer: {
    marginLeft: 4,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: "#e2e8f0",
  },
  timelineItem: {
    marginBottom: 9,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timelineDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: "#2563eb",
    marginLeft: -15,
    marginRight: 10,
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  itemTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  itemSubtitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Oblique",
    color: "#2563eb",
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#64748b",
  },
  descText: {
    fontSize: 9,
    lineHeight: 1.35,
    color: "#334155",
    marginTop: 2,
  },
  skillsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillBox: {
    backgroundColor: "#f8fafc",
    borderWidth: 0.5,
    borderColor: "#cbd5e1",
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  skillText: {
    color: "#1e293b",
    fontSize: 8.5,
    fontFamily: "Helvetica",
  },
});

const getInitials = name => {
  if (!name) return "ME";
  const parts = name.split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const InfographicLite = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>{getInitials(data?.name)}</Text>
        </View>

        <View style={styles.headerContent}>
          <Text style={[styles.name, HEADER_NAME_STYLE]}>{data?.name}</Text>
          <Text style={[styles.role, HEADER_ROLE_STYLE]}>{data?.jobRole || "Professional"}</Text>

          <View style={styles.contactRow}>
            {data?.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {(data?.phone || data?.phone_no) && (
              <Text style={styles.contactItem}>| {data.phone || data.phone_no}</Text>
            )}
            {data?.address && <Text style={styles.contactItem}>| {data.address}</Text>}
            {data?.linkedin && (
              <Link src={data.linkedin} style={{ textDecoration: "none" }}>
                <Text style={{ ...styles.contactItem, color: "#2563eb" }}>| LinkedIn</Text>
              </Link>
            )}
          </View>
        </View>
      </View>

      {/* Summary */}
      {data?.summary && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>About Me</Text>
          </View>
          <Text style={{ fontSize: 9, lineHeight: 1.4, color: "#334155" }}>{data.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {data?.skills?.length > 0 && (
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

      {/* Experience */}
      {data?.experience?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Working History</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp.companyName}</Text>
                  {splitToBullets(exp?.description).map((bullet, idx) => (
                    <Text key={idx} style={styles.descText}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Projects */}
      {data?.projects?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Projects</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{proj.title}</Text>
                    <Text style={styles.itemDate}>{formatDate(proj.date)}</Text>
                  </View>
                  {proj.technologiesOrTopics && (
                    <Text
                      style={{
                        fontSize: 8.5,
                        color: "#2563eb",
                        fontFamily: "Helvetica-Oblique",
                        marginBottom: 2,
                      }}
                    >
                      {proj.technologiesOrTopics}
                    </Text>
                  )}
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <Text key={idx} style={styles.descText}>
                      • {bullet}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Certificates */}
      {data?.certificates?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Certificates</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{cert.title}</Text>
                    <Text style={styles.itemDate}>{formatDate(cert.year)}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{cert.organization}</Text>
                  {cert.credentialUrl && (
                    <Link
                      src={cert.credentialUrl}
                      style={{ fontSize: 8.5, color: "#2563eb", textDecoration: "none" }}
                    >
                      View Credential
                    </Link>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Education */}
      {data?.education?.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleBox}>
            <Text style={styles.sectionTitle}>Education</Text>
          </View>
          <View style={styles.timelineContainer}>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <View style={styles.timelineContent}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.institution}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>
                    {edu.degree} {edu.grade ? `(${edu.grade})` : ""}
                  </Text>
                  {edu.description &&
                    splitToBullets(edu.description).map((bullet, idx) => (
                      <Text key={idx} style={styles.descText}>
                        • {bullet}
                      </Text>
                    ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      <Text style={{ fontSize: 1, color: "#fff", opacity: 0.01, position: "absolute", bottom: 0 }}>
        NextCV Resume Optimized
      </Text>
    </Page>
  </Document>
);

export default InfographicLite;
