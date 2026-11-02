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
    fontFamily: "Times-Roman",
    backgroundColor: "#ffffff",
    color: "#111827",
    lineHeight: 1.38,
  },
  header: {
    textAlign: "center",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  subHeader: {
    fontSize: 10,
    fontFamily: "Times-Italic",
    color: "#374151",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    fontSize: 8.5,
    color: "#4b5563",
    marginTop: 3,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
    marginBottom: 8,
    color: "#111827",
  },
  entryBlock: {
    marginBottom: 9,
  },
  entryTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  entryTitle: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  entryDate: {
    fontSize: 8.5,
    color: "#4b5563",
    fontFamily: "Times-Italic",
  },
  entrySubtitle: {
    fontSize: 9.5,
    fontFamily: "Times-Italic",
    color: "#374151",
    marginBottom: 2,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.35,
    color: "#374151",
    textAlign: "justify",
  },
  bulletList: {
    marginLeft: 4,
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletMarker: {
    width: 8,
    fontSize: 8.5,
    color: "#4b5563",
  },
  bulletContent: {
    flex: 1,
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.35,
  },
  skillText: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#1f2937",
  },
});

const ExecutiveGray = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name}</Text>
        <Text style={[styles.subHeader, HEADER_ROLE_STYLE]}>
          {data.jobRole || "Executive Professional"}
        </Text>
        <View style={styles.contactRow}>
          {data.email && <Text>{data.email}</Text>}
          {(data.phone || data.phone_no) && (
            <>
              <Text>•</Text>
              <Text>{data.phone || data.phone_no}</Text>
            </>
          )}
          {data.address && (
            <>
              <Text>•</Text>
              <Text>{data.address}</Text>
            </>
          )}
        </View>
        {(data.linkedin || data.portfolio) && (
          <View style={styles.contactRow}>
            {data.linkedin && (
              <Link src={data.linkedin} style={{ color: "#374151", textDecoration: "none" }}>
                LinkedIn
              </Link>
            )}
            {data.linkedin && data.portfolio && <Text>•</Text>}
            {data.portfolio && (
              <Link src={data.portfolio} style={{ color: "#374151", textDecoration: "none" }}>
                Portfolio
              </Link>
            )}
          </View>
        )}
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Profile</Text>
          <Text style={styles.description}>{data.summary}</Text>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{exp.companyName}</Text>
                <Text style={styles.entryDate}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                </Text>
              </View>
              <Text style={styles.entrySubtitle}>{exp.position}</Text>
              <View style={styles.bulletList}>
                {splitToBullets(exp.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bulletMarker}>•</Text>
                    <Text style={styles.bulletContent}>{bullet.replace(/^•\s*/, "")}</Text>
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
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{edu.institution}</Text>
                <Text style={styles.entryDate}>
                  {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
              <Text style={styles.entrySubtitle}>
                {edu.degree} {edu.grade ? `(Grade: ${edu.grade})` : ""}
              </Text>
              {edu.description && (
                <View style={styles.bulletList}>
                  {splitToBullets(edu.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bulletMarker}>•</Text>
                      <Text style={styles.bulletContent}>{bullet.replace(/^•\s*/, "")}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Core Competencies</Text>
          <Text style={styles.skillText}>{data.skills.map(s => s.name || s).join("  •  ")}</Text>
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Significant Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{proj.title}</Text>
                <Text style={styles.entryDate}>{formatDate(proj.date)}</Text>
              </View>
              {proj.technologiesOrTopics && (
                <Text
                  style={{
                    fontSize: 8.5,
                    fontFamily: "Times-Italic",
                    color: "#4b5563",
                    marginBottom: 2,
                  }}
                >
                  Tech: {proj.technologiesOrTopics}
                </Text>
              )}
              <View style={styles.bulletList}>
                {splitToBullets(proj.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bulletMarker}>•</Text>
                    <Text style={styles.bulletContent}>{bullet.replace(/^•\s*/, "")}</Text>
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
            <View key={i} style={styles.entryBlock}>
              <View style={styles.entryTitleRow}>
                <Text style={styles.entryTitle}>{cert.title}</Text>
                <Text style={styles.entryDate}>{formatDate(cert.year)}</Text>
              </View>
              <Text style={styles.entrySubtitle}>{cert.organization}</Text>
              {cert.credentialUrl && (
                <Link
                  src={cert.credentialUrl}
                  style={{
                    color: "#374151",
                    textDecoration: "none",
                    fontSize: 8.5,
                  }}
                >
                  View Credential
                </Link>
              )}
            </View>
          ))}
        </View>
      )}

      <Text style={{ fontSize: 1, color: "#fff", opacity: 0.01, position: "absolute", bottom: 0 }}>
        NextCV Resume Optimized
      </Text>
    </Page>
  </Document>
);

export default ExecutiveGray;
