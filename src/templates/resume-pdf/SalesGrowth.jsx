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
    borderBottomWidth: 1.5,
    borderBottomColor: "#16a34a", // Growth Green accent
    paddingBottom: 12,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  role: {
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#16a34a",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 8.5,
    color: "#64748b",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  metricsBox: {
    backgroundColor: "#f0fdf4",
    padding: "6 10",
    marginBottom: 10,
    borderLeftWidth: 2.5,
    borderLeftColor: "#16a34a",
    borderRadius: 2,
  },
  metricsText: {
    fontSize: 9,
    color: "#166534",
    lineHeight: 1.4,
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
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  jobCompany: {
    fontSize: 9,
    color: "#16a34a",
    fontFamily: "Helvetica-Oblique",
  },
  jobDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#64748b",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9,
    color: "#16a34a",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    fontSize: 8.5,
    backgroundColor: "#f0fdf4",
    paddingVertical: 2.5,
    paddingHorizontal: 7,
    borderRadius: 2,
    color: "#15803d",
    borderWidth: 0.5,
    borderColor: "#bbf7d0",
    fontFamily: "Helvetica",
  },
});

const SalesGrowth = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name}</Text>
          <Text style={[styles.role, HEADER_ROLE_STYLE]}>
            {data.jobRole || "Sales Professional"}
          </Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && <Text>| {data.phone || data.phone_no}</Text>}
            {data.address && <Text>| {data.address}</Text>}
            {data.linkedin && (
              <Link src={data.linkedin} style={{ color: "#16a34a", textDecoration: "none" }}>
                | LinkedIn
              </Link>
            )}
            {data.portfolio && (
              <Link src={data.portfolio} style={{ color: "#16a34a", textDecoration: "none" }}>
                | Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary / Objective */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={{ fontSize: 9, lineHeight: 1.4, color: "#334155" }}>{data.summary}</Text>
          </View>
        )}

        {/* Key Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Achievements</Text>
          <View style={styles.metricsBox}>
            <Text style={styles.metricsText}>
              {data.summary
                ? `Proven track record: ${data.summary.substring(0, 120)}...`
                : "Consistent top performer exceeding quotas by 150% YoY through strategic account management and revenue pipeline optimization."}
            </Text>
          </View>
        </View>

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
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
                      <Text style={styles.bulletText}>{bullet}</Text>
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
            <Text style={styles.sectionTitle}>Sales Competencies</Text>
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
                <View style={styles.jobHeader}>
                  <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                    {edu.degree}
                  </Text>
                  <Text style={styles.jobDate}>{formatDate(edu.endYear)}</Text>
                </View>
                <Text style={{ fontSize: 8.5, color: "#64748b" }}>{edu.institution}</Text>
                {edu.description && (
                  <View style={{ marginTop: 2 }}>
                    {splitToBullets(edu.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bullet}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
            {data.certificates?.length > 0 && (
              <View style={{ marginTop: 6 }}>
                <Text style={[styles.sectionTitle, { marginBottom: 4 }]}>Certifications</Text>
                {data.certificates.map((cert, i) => (
                  <View key={i} style={{ marginTop: 2 }}>
                    <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                      {cert.title}
                    </Text>
                    <Text style={{ fontSize: 8.5, color: "#64748b" }}>{cert.organization}</Text>
                  </View>
                ))}
              </View>
            )}
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

export default SalesGrowth;
