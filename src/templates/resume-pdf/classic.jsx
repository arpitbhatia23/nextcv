"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";

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
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    marginBottom: 16,
    paddingBottom: 10,
    alignItems: "center",
    textAlign: "center",
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
    letterSpacing: -0.2,
    color: "#0f172a",
    textTransform: "uppercase",
  },
  contact: {
    fontSize: 8.5,
    color: "#64748b",
    marginBottom: 2,
  },
  links: {
    flexDirection: "row",
    justifyContent: "center",
    fontSize: 8.5,
    color: "#0284c7",
    gap: 8,
    marginTop: 2,
  },
  section: {
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    marginBottom: 8,
    paddingBottom: 2,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.4,
    color: "#334155",
  },
  skillList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skill: {
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    borderWidth: 0.5,
    borderColor: "#cbd5e1",
    borderRadius: 2,
    paddingVertical: 2.5,
    paddingHorizontal: 7,
    fontSize: 8.5,
    fontFamily: "Helvetica",
  },
  eduBlock: {
    marginBottom: 6,
  },
  eduTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#0f172a",
  },
  eduSubtitle: {
    fontSize: 8.5,
    color: "#64748b",
  },
  expBlock: {
    marginBottom: 9,
  },
  expTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#0f172a",
  },
  expMeta: {
    fontSize: 8.5,
    color: "#64748b",
    marginBottom: 2,
  },
  bulletList: {
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 9,
    color: "#64748b",
  },
  bulletContent: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
  },
  projBlock: {
    marginBottom: 9,
  },
  projTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#0f172a",
  },
  projMeta: {
    fontSize: 8.5,
    color: "#64748b",
    marginBottom: 1,
  },
  projTech: {
    fontSize: 8.5,
    color: "#0369a1",
    marginBottom: 2,
    fontFamily: "Helvetica-Oblique",
  },
});

const ClassicTemplate = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name || "Your Name"}</Text>
        <Text style={styles.contact}>
          {data.email} | {data?.phone || data.phone_no} | {data.address}
        </Text>
        <View style={styles.links}>
          {data.linkedin && (
            <Link src={data.linkedin} style={{ color: "#0284c7", textDecoration: "none" }}>
              LinkedIn
            </Link>
          )}
          {data.github && (
            <Link src={data.github} style={{ color: "#0284c7", textDecoration: "none" }}>
              GitHub
            </Link>
          )}
          {data.portfolio && (
            <Link src={data.portfolio} style={{ color: "#0284c7", textDecoration: "none" }}>
              Portfolio
            </Link>
          )}
        </View>
      </View>

      {/* Summary */}
      {data.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Profile</Text>
          <Text style={styles.summaryText}>{data.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Skills</Text>
          <View style={styles.skillList}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skill}>
                {skill.name ?? skill}
                {skill.level ? ` (${skill.level})` : ""}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.expBlock}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <Text style={styles.expTitle}>
                  {exp.position} @ {exp.companyName}
                </Text>
                <Text style={styles.expMeta}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                </Text>
              </View>
              <View style={styles.bulletList}>
                {splitToBullets(exp.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bulletSymbol}>•</Text>
                    <Text style={styles.bulletContent}>{bullet}</Text>
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
          <Text style={styles.sectionHeading}>Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={styles.projBlock}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <Text style={styles.projTitle}>{proj.title}</Text>
                <Text style={styles.projMeta}>
                  {proj.date && `${formatDate(proj.date)}`}
                </Text>
              </View>
              {proj.roleOrType && (
                <Text style={styles.projMeta}>
                  {proj.roleOrType}{proj.organization ? ` @ ${proj.organization}` : ""}
                </Text>
              )}
              {proj.technologiesOrTopics && (
                <Text style={styles.projTech}>Tech: {proj.technologiesOrTopics}</Text>
              )}
              {proj.description && (
                <View style={styles.bulletList}>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletContent}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={styles.eduBlock}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" }}>
                <Text style={styles.eduTitle}>{edu.institution}</Text>
                <Text style={styles.eduSubtitle}>
                  {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
              <Text style={styles.eduSubtitle}>
                {edu.degree}{edu.grade ? ` | Grade: ${edu.grade}` : ""}
              </Text>
              {edu.description && (
                <View style={styles.bulletList}>
                  {splitToBullets(edu.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletContent}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Certificates */}
      {data.certificates?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Certificates</Text>
          {data.certificates.map((cert, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <Text style={styles.projTitle}>{cert.title}</Text>
              <Text style={styles.projMeta}>
                {cert.organization}
                {cert.year ? ` | ${formatDate(cert.year)}` : ""}
              </Text>
              {cert.credentialUrl && (
                <Link src={cert.credentialUrl} style={{ fontSize: 8.5, color: "#0284c7", textDecoration: "none" }}>
                  Certificate Link
                </Link>
              )}
            </View>
          ))}
        </View>
      )}

      <Text style={{ 
        fontSize: 1, 
        color: "#fff", 
        opacity: 0.01,
        position: "absolute", 
        bottom: 0 
      }}>
        NextCV Resume Optimized
      </Text>
    </Page>
  </Document>
);

export default ClassicTemplate;
