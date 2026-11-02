"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";

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
  },
  name: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactRow: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 8.5,
    fontFamily: "Times-Roman",
    color: "#4b5563",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10.5,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 0.75,
    borderBottomColor: "#111827",
    marginBottom: 8,
    paddingBottom: 2,
    letterSpacing: 0.6,
  },
  jobBlock: {
    marginBottom: 10,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
    alignItems: "baseline",
  },
  jobTitle: {
    fontFamily: "Times-Bold",
    fontSize: 10,
    color: "#111827",
  },
  jobCompany: {
    fontFamily: "Times-Italic",
    fontSize: 9.5,
    color: "#374151",
  },
  jobDate: {
    fontFamily: "Times-Italic",
    fontSize: 8.5,
    color: "#6b7280",
  },
  description: {
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.35,
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
    fontSize: 9,
    color: "#374151",
    lineHeight: 1.35,
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    fontFamily: "Times-Roman",
    fontSize: 9,
    color: "#1f2937",
    backgroundColor: "#f9fafb",
    borderWidth: 0.5,
    borderColor: "#e5e7eb",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 2,
  },
});

const AmazonOperations = ({ data }) => {
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
              <Link src={data.linkedin} style={{ color: "#111827", textDecoration: "none" }}>
                • LinkedIn
              </Link>
            )}
            {data.github && (
              <Link src={data.github} style={{ color: "#111827", textDecoration: "none" }}>
                • GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link src={data.portfolio} style={{ color: "#111827", textDecoration: "none" }}>
                • Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary (Professional Profile) */}
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
                    {formatDate(exp.startDate)} – {formatDate(exp.endDate) || "Present"}
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

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{edu.institution}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(edu.startYear)} – {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
                <Text style={styles.jobCompany}>
                  {edu.degree} {edu.grade ? `(GPA: ${edu.grade})` : ""}
                </Text>
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
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects & Achievements</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{
                      fontFamily: "Times-Italic",
                      fontSize: 8.5,
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

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={{ marginBottom: 4 }}>
                <Text style={{ fontFamily: "Times-Bold", fontSize: 9.5 }}>{cert.title}</Text>
                <Text style={{ fontSize: 8.5, color: "#6b7280" }}>
                  {cert.organization} ({formatDate(cert.year)})
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

export default AmazonOperations;
