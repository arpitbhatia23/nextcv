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
    borderBottomWidth: 1.5,
    borderBottomColor: "#0f172a",
    paddingBottom: 14,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  role: {
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#475569",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  contact: {
    fontSize: 8.5,
    color: "#64748b",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  links: {
    flexDirection: "column",
    gap: 3,
    alignItems: "flex-end",
  },
  linkItem: {
    fontSize: 8.5,
    color: "#0284c7",
    textDecoration: "none",
  },
  mainContent: {
    paddingTop: 0,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 3,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  itemGroup: {
    marginBottom: 9,
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
  itemDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#64748b",
  },
  itemSubtitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Oblique",
    color: "#475569",
    marginBottom: 3,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9,
    color: "#475569",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillTag: {
    backgroundColor: "#f8fafc",
    borderWidth: 0.5,
    borderColor: "#cbd5e1",
    color: "#1e293b",
    fontSize: 8.5,
    fontFamily: "Helvetica",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 2,
  },
});

const TechDark = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Editorial Tech Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name}</Text>
          <Text style={[styles.role, HEADER_ROLE_STYLE]}>
            {data.jobRole || "Tech Professional"}
          </Text>
          <View style={styles.contact}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <>
                <Text style={{ color: "#cbd5e1" }}>•</Text>
                <Text>{data.phone || data.phone_no}</Text>
              </>
            )}
            {data.address && (
              <>
                <Text style={{ color: "#cbd5e1" }}>•</Text>
                <Text>{data.address}</Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.links}>
          {data.linkedin && (
            <Link src={data.linkedin} style={styles.linkItem}>
              LinkedIn
            </Link>
          )}
          {data.github && (
            <Link src={data.github} style={styles.linkItem}>
              GitHub
            </Link>
          )}
          {data.portfolio && (
            <Link src={data.portfolio} style={styles.linkItem}>
              Portfolio
            </Link>
          )}
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={{ fontSize: 9, lineHeight: 1.4, color: "#334155" }}>{data.summary}</Text>
          </View>
        )}

        {/* Skills - Prominent */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillRow}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillTag}>
                  {skill.name || skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.companyName}</Text>
                <View>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{bullet.replace(/^•\s*/, "")}</Text>
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
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.title}</Text>
                  <Text style={styles.itemDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{
                      fontFamily: "Helvetica-Oblique",
                      fontSize: 8.5,
                      color: "#0369a1",
                      marginBottom: 2,
                    }}
                  >
                    {proj.technologiesOrTopics}
                  </Text>
                )}
                <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{bullet.replace(/^•\s*/, "")}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{cert.title}</Text>
                  <Text style={styles.itemDate}>{formatDate(cert.year)}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{cert.organization}</Text>
                {cert.credentialUrl && (
                  <Link
                    src={cert.credentialUrl}
                    style={{
                      fontSize: 8.5,
                      color: "#0284c7",
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

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.institution}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                {edu.description && (
                  <View style={{ marginTop: 3, width: "100%" }}>
                    {splitToBullets(edu.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletRow}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{bullet.replace(/^•\s*/, "")}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      <Text style={{ fontSize: 1, color: "#fff", opacity: 0.01, position: "absolute", bottom: 0 }}>
        NextCV Resume Optimized
      </Text>
    </Page>
  </Document>
);

export default TechDark;
