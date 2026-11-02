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
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#111827",
    paddingBottom: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    color: "#111827",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  role: {
    marginTop: 2,
    fontSize: 10.5,
    fontFamily: "Times-Italic",
    color: "#4b5563",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    fontSize: 8.5,
    color: "#4b5563",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Times-Bold",
    color: "#111827",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: "#111827",
    paddingBottom: 2,
    letterSpacing: 0.6,
  },
  jobBlock: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: "Times-Bold",
    color: "#111827",
  },
  jobCompany: {
    fontSize: 9.5,
    fontFamily: "Times-Italic",
    color: "#374151",
  },
  jobDate: {
    fontSize: 8.5,
    fontFamily: "Times-Roman",
    color: "#6b7280",
  },
  description: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.35,
    textAlign: "justify",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 6,
  },
  bulletPoint: {
    width: 8,
    fontSize: 8.5,
    color: "#4b5563",
  },
  bulletText: {
    flex: 1,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    fontSize: 9,
    fontFamily: "Times-Italic",
    color: "#1f2937",
  },
});

const IbmClassic = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name}</Text>
          <Text style={[styles.role, HEADER_ROLE_STYLE]}>
            {data.jobRole || "Senior Technology Executive"}
          </Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && <Text>| {data.phone || data.phone_no}</Text>}
            {data.address && <Text>| {data.address}</Text>}
            {data.linkedin && (
              <Link src={data.linkedin} style={{ color: "#111827", textDecoration: "none" }}>
                | LinkedIn
              </Link>
            )}
            {data.portfolio && (
              <Link src={data.portfolio} style={{ color: "#111827", textDecoration: "none" }}>
                | Portfolio
              </Link>
            )}
          </View>
        </View>

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
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={{ ...styles.jobCompany, marginBottom: 2 }}>{exp.companyName}</Text>
                <View style={{ marginTop: 2 }}>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={[styles.description, styles.bulletText]}>{bullet}</Text>
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
                <View style={{ marginTop: 2 }}>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={[styles.description, styles.bulletText]}>{bullet}</Text>
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
            <Text style={styles.sectionTitle}>Key Competencies</Text>
            <View style={styles.skillList}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
                  {i < data.skills.length - 1 ? "  •  " : ""}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Education & Certs */}
        {(data.education?.length > 0 || data.certificates?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Qualification</Text>
            {data.education?.map((edu, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <View style={styles.jobHeader}>
                  <Text style={{ fontSize: 9.5, fontFamily: "Times-Bold", color: "#111827" }}>
                    {edu.degree}
                  </Text>
                  <Text style={styles.jobDate}>{formatDate(edu.endYear)}</Text>
                </View>
                <Text style={{ fontSize: 8.5, color: "#4b5563" }}>{edu.institution}</Text>
                {edu.description && (
                  <View style={{ marginTop: 2 }}>
                    {splitToBullets(edu.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bullet}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={[styles.description, styles.bulletText]}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
            {data.certificates?.map((cert, i) => (
              <View key={i} style={{ marginTop: 3 }}>
                <Text style={{ fontSize: 9.5, fontFamily: "Times-Bold", color: "#111827" }}>
                  {cert.title}
                </Text>
                <Text style={{ fontSize: 8.5, color: "#4b5563" }}>{cert.organization}</Text>
              </View>
            ))}
          </View>
        )}

        <Text
          style={{ fontSize: 1, color: "#fff", opacity: 0.01, position: "absolute", bottom: 0 }}
        >
          NextCV Resume Optimized
        </Text>
      </Page>
    </Document>
  );
};

export default IbmClassic;
