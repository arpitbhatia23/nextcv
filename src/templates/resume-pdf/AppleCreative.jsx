"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 9.5,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    color: "#1d1d1f", // Apple Near Black
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 0.75,
    borderBottomColor: "#d2d2d7",
    paddingBottom: 14,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#1d1d1f",
    marginBottom: 4,
    letterSpacing: -0.4,
  },
  contactRow: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 8.5,
    color: "#6e6e73", // Apple Secondary Grey
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#6e6e73",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e5ea",
    paddingBottom: 2,
  },
  jobBlock: {
    marginBottom: 11,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    alignItems: "baseline",
  },
  jobTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#1d1d1f",
  },
  jobCompany: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    color: "#424245",
  },
  jobDate: {
    fontSize: 8.5,
    color: "#86868b",
  },
  description: {
    fontSize: 9,
    color: "#333336",
    textAlign: "left",
    lineHeight: 1.35,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
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
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    fontSize: 8.5,
    color: "#1d1d1f",
    backgroundColor: "#f5f5f7",
    borderWidth: 0.5,
    borderColor: "#d2d2d7",
    paddingVertical: 2.5,
    paddingHorizontal: 7,
    borderRadius: 2,
  },
});

const AppleCreative = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && <Text>• {data.phone || data.phone_no}</Text>}
            {data.address && <Text>• {data.address}</Text>}
            {data.linkedin && (
              <Link src={data.linkedin} style={{ color: "#0066cc", textDecoration: "none" }}>
                • LinkedIn
              </Link>
            )}
            {data.portfolio && (
              <Link src={data.portfolio} style={{ color: "#0066cc", textDecoration: "none" }}>
                • Portfolio
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
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={{ ...styles.jobCompany, marginBottom: 3 }}>{exp.companyName}</Text>
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
                  <Text style={{ fontSize: 8.5, color: "#86868b", marginBottom: 2, fontFamily: "Helvetica-Oblique" }}>
                    {proj.technologiesOrTopics}
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

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{edu.institution}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(edu.startYear)} — {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
                <Text style={styles.jobCompany}>
                  {edu.degree}
                  {edu.grade ? ` · ${edu.grade}` : ""}
                </Text>
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
                <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9.5 }}>{cert.title}</Text>
                <Text style={{ fontSize: 8.5, color: "#86868b" }}>
                  {cert.organization} · {formatDate(cert.year)}
                </Text>
              </View>
            ))}
          </View>
        )}
      
        <Text style={{ fontSize: 1, color: '#fff', opacity: 0.01, position: 'absolute', bottom: 0 }}>NextCV Resume Optimized</Text>
      </Page>
    </Document>
  );
};

export default AppleCreative;
