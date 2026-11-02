"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";
import { HEADER_NAME_STYLE, HEADER_ROLE_STYLE, HEADER_TEXT_COLUMN_STYLE } from "./headerTypography";

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
    borderBottomColor: "#9333ea", // Accenture Purple accent
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerContent: HEADER_TEXT_COLUMN_STYLE,
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: -0.2,
    marginBottom: 3,
  },
  role: {
    fontSize: 10.5,
    color: "#9333ea",
    fontFamily: "Helvetica",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  contactCol: {
    alignItems: "flex-end",
    gap: 3,
  },
  contactItem: {
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
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
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
    fontFamily: "Helvetica-Oblique",
    color: "#475569",
  },
  jobDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#64748b",
  },
  description: {
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 8,
    fontSize: 9,
    color: "#9333ea",
  },
  bulletText: {
    flex: 1,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    fontSize: 8.5,
    color: "#6b21a8",
    backgroundColor: "#faf5ff",
    borderWidth: 0.5,
    borderColor: "#e9d5ff",
    paddingVertical: 2.5,
    paddingHorizontal: 7,
    borderRadius: 2,
    fontFamily: "Helvetica",
  },
});

const AccentureConsult = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name}</Text>
            <Text style={[styles.role, HEADER_ROLE_STYLE]}>
              {data.jobRole || "Management Consultant"}
            </Text>
          </View>
          <View style={styles.contactCol}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text style={styles.contactItem}>{data.phone || data.phone_no}</Text>
            )}
            {data.address && <Text style={styles.contactItem}>{data.address}</Text>}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ ...styles.contactItem, color: "#9333ea", textDecoration: "none" }}
              >
                LinkedIn
              </Link>
            )}
          </View>
        </View>

        {/* Professional Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
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
            <Text style={styles.sectionTitle}>Key Engagements</Text>
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
                      color: "#64748b",
                      marginBottom: 2,
                      fontFamily: "Helvetica-Oblique",
                    }}
                  >
                    Tools: {proj.technologiesOrTopics}
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

        {/* Certs & Education */}
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
                        <Text style={[styles.description, styles.bulletText]}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
            {data.certificates?.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { marginTop: 8 }]}>Certifications</Text>
                {data.certificates.map((cert, i) => (
                  <View key={i} style={{ marginTop: 3 }}>
                    <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                      {cert.title}
                    </Text>
                    <Text style={{ fontSize: 8.5, color: "#64748b" }}>{cert.organization}</Text>
                  </View>
                ))}
              </>
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

export default AccentureConsult;
