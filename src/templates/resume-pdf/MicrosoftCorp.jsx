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
  sidebar: {
    width: "30%",
    backgroundColor: "#f8fafc",
    borderRightWidth: 0.75,
    borderRightColor: "#e2e8f0",
    padding: 22,
  },
  main: {
    width: "70%",
    padding: 22,
    paddingLeft: 20,
  },
  sidebarTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: "#0284c7",
    paddingBottom: 3,
  },
  contactItem: {
    fontSize: 8.5,
    marginBottom: 4,
    color: "#475569",
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
  eduBlock: {
    marginBottom: 8,
  },
  eduDegree: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  eduInst: {
    fontSize: 8.5,
    color: "#475569",
  },
  eduDate: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 2,
  },
  headerName: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  headerRole: {
    fontSize: 10.5,
    color: "#0284c7",
    fontFamily: "Helvetica",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 3,
    marginTop: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  jobBlock: {
    marginBottom: 9,
  },
  jobTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  jobCompany: {
    fontSize: 9,
    color: "#0284c7",
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  jobDate: {
    fontSize: 8.5,
    fontFamily: "Helvetica",
    color: "#64748b",
    marginBottom: 2,
  },
  description: {
    fontSize: 9,
    lineHeight: 1.35,
    color: "#334155",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 8,
    fontSize: 9,
    color: "#0284c7",
  },
});

const MicrosoftCorp = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Contact */}
          <View style={{ marginBottom: 18 }}>
            <Text style={styles.sidebarTitle}>Contact</Text>
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
          </View>

          {/* Education */}
          {data.education?.length > 0 && (
            <View style={{ marginBottom: 18 }}>
              <Text style={styles.sidebarTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={styles.eduBlock}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduInst}>{edu.institution}</Text>
                  <Text style={styles.eduDate}>
                    {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View>
              <Text style={styles.sidebarTitle}>Skills</Text>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  {skill.name || skill}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.main}>
          {/* Header */}
          <View style={{ marginBottom: 12 }}>
            <Text style={[styles.headerName, HEADER_NAME_STYLE]}>{data.name}</Text>
            <Text style={[styles.headerRole, HEADER_ROLE_STYLE]}>
              {data.jobRole || "Professional Role"}
            </Text>
            {data.summary && <Text style={styles.description}>{data.summary}</Text>}
          </View>

          {/* Experience */}
          {data.experience?.length > 0 && (
            <View style={{ marginBottom: 12 }}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={styles.jobBlock}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Text style={styles.jobCompany}>{exp.companyName}</Text>
                    <Text style={styles.jobDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                    </Text>
                  </View>
                  <View style={{ marginTop: 2 }}>
                    {splitToBullets(exp.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={{ ...styles.description, flex: 1 }}>{bullet}</Text>
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
              <Text style={styles.sectionTitle}>Key Projects</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={styles.jobBlock}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Text style={styles.jobTitle}>{proj.title}</Text>
                    <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                  </View>
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
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={{ ...styles.description, flex: 1 }}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Certificates */}
          {data.certificates?.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certificates.map((cert, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                    {cert.title}
                  </Text>
                  <Text style={{ fontSize: 8.5, color: "#64748b" }}>
                    {cert.organization} | {formatDate(cert.year)}
                  </Text>
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

export default MicrosoftCorp;
