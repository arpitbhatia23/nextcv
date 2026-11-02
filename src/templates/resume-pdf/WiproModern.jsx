"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";
import { HEADER_NAME_STYLE, HEADER_ROLE_STYLE } from "./headerTypography";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.4,
  },
  leftColumn: {
    width: "32%",
    backgroundColor: "#f8fafc",
    borderRightWidth: 0.75,
    borderRightColor: "#e2e8f0",
    padding: 22,
  },
  rightColumn: {
    width: "68%",
    padding: 22,
    paddingLeft: 20,
  },
  headerDots: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  leftTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    textTransform: "uppercase",
    marginBottom: 7,
    marginTop: 12,
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
    letterSpacing: 0.8,
  },
  contactItem: {
    fontSize: 8.5,
    color: "#475569",
    marginBottom: 4,
  },
  skillItem: {
    fontSize: 8.5,
    marginBottom: 3,
    color: "#1e293b",
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "#cbd5e1",
    padding: "2 6",
    borderRadius: 2,
    alignSelf: "flex-start",
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  role: {
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#0284c7",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  summary: {
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
  },
  jobBlock: {
    marginBottom: 9,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  jobMeta: {
    fontSize: 8.5,
    color: "#64748b",
    marginBottom: 2,
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
    color: "#0284c7",
  },
  bulletText: {
    flex: 1,
  },
});

const WiproModern = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.leftColumn}>
          {/* Subtle Accent Dots */}
          <View style={styles.headerDots}>
            <View style={[styles.dot, { backgroundColor: "#e11d48" }]} />
            <View style={[styles.dot, { backgroundColor: "#16a34a" }]} />
            <View style={[styles.dot, { backgroundColor: "#0284c7" }]} />
            <View style={[styles.dot, { backgroundColor: "#d97706" }]} />
          </View>

          {/* Contact */}
          <Text style={styles.leftTitle}>Contact</Text>
          {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
          {(data.phone || data.phone_no) && (
            <Text style={styles.contactItem}>{data.phone || data.phone_no}</Text>
          )}
          {data.address && <Text style={styles.contactItem}>{data.address}</Text>}
          {data.linkedin && (
            <Link
              src={data.linkedin}
              style={{ ...styles.contactItem, color: "#0284c7", textDecoration: "none" }}
            >
              LinkedIn
            </Link>
          )}
          {data.github && (
            <Link
              src={data.github}
              style={{ ...styles.contactItem, color: "#0284c7", textDecoration: "none" }}
            >
              GitHub
            </Link>
          )}
          {data.portfolio && (
            <Link
              src={data.portfolio}
              style={{ ...styles.contactItem, color: "#0284c7", textDecoration: "none" }}
            >
              Portfolio
            </Link>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <View>
              <Text style={styles.leftTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 6 }}>
                  <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 8.5, color: "#475569" }}>{edu.institution}</Text>
                  <Text style={{ fontSize: 8, color: "#64748b" }}>{formatDate(edu.endYear)}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View>
              <Text style={styles.leftTitle}>Skills</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4 }}>
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
            <View>
              <Text style={styles.leftTitle}>Certifications</Text>
              {data.certificates.map((cert, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                    {cert.title}
                  </Text>
                  <Text style={{ fontSize: 8, color: "#64748b" }}>{cert.organization}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Content */}
        <View style={styles.rightColumn}>
          <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name}</Text>
          <Text style={[styles.role, HEADER_ROLE_STYLE]}>
            {data.jobRole || "Software Engineer"}
          </Text>

          {data.summary && <Text style={styles.summary}>{data.summary}</Text>}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <View style={{ marginBottom: 14 }}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={styles.jobBlock}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobMeta}>
                    {exp.companyName} | {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
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
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={styles.jobBlock}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobMeta}>{formatDate(proj.date)}</Text>
                  {proj.technologiesOrTopics && (
                    <Text
                      style={{
                        fontSize: 8.5,
                        color: "#0284c7",
                        marginBottom: 2,
                        fontFamily: "Helvetica-Oblique",
                      }}
                    >
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
        </View>

        <Text
          style={{ fontSize: 1, color: "#fff", opacity: 0.01, position: "absolute", bottom: 0 }}
        >
          NextCV Resume Optimized
        </Text>
      </Page>
    </Document>
  );
};

export default WiproModern;
