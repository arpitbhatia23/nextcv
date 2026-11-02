"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";
import { HEADER_NAME_STYLE, HEADER_ROLE_STYLE } from "./headerTypography";

const styles = StyleSheet.create({
  page: {
    fontSize: 9.5,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    lineHeight: 1.4,
  },
  leftSidebar: {
    width: "32%",
    backgroundColor: "#f8fafc",
    padding: 24,
    borderRightWidth: 0.75,
    borderRightColor: "#e2e8f0",
  },
  rightContent: {
    width: "68%",
    padding: 24,
  },
  sidebarName: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  sidebarRole: {
    fontSize: 9.5,
    fontFamily: "Helvetica",
    color: "#475569",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  sidebarSection: {
    marginBottom: 14,
  },
  sidebarTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    borderBottomWidth: 0.75,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 3,
    marginBottom: 7,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  contactItem: {
    fontSize: 8.5,
    marginBottom: 3,
    color: "#475569",
  },
  linkItem: {
    fontSize: 8.5,
    marginBottom: 3,
    color: "#0284c7",
    textDecoration: "none",
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
  mainSection: {
    marginBottom: 14,
  },
  mainTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 3,
    marginBottom: 8,
  },
  jobBlock: {
    marginBottom: 9,
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
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bullet: {
    width: 8,
    fontSize: 9,
    color: "#0f172a",
  },
  description: {
    fontSize: 9,
    lineHeight: 1.35,
    color: "#334155",
  },
});

const SidebarLeft = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Left Sidebar */}
      <View style={styles.leftSidebar}>
        {/* Profile Info */}
        <View style={{ marginBottom: 16 }}>
          <Text style={[styles.sidebarName, HEADER_NAME_STYLE]}>{data.name}</Text>
          <Text style={[styles.sidebarRole, HEADER_ROLE_STYLE]}>{data.jobRole}</Text>
        </View>

        {/* Contact */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Contact</Text>
          {data.phone || data.phone_no ? (
            <Text style={styles.contactItem}>{data.phone || data.phone_no}</Text>
          ) : null}
          {data.email ? <Text style={styles.contactItem}>{data.email}</Text> : null}
          {data.address ? <Text style={styles.contactItem}>{data.address}</Text> : null}
        </View>

        {/* Links */}
        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Links</Text>
          {data.linkedin && (
            <Link src={data.linkedin} style={styles.linkItem}>
              LinkedIn Profile
            </Link>
          )}
          {data.github && (
            <Link src={data.github} style={styles.linkItem}>
              GitHub Profile
            </Link>
          )}
          {data.portfolio && (
            <Link src={data.portfolio} style={styles.linkItem}>
              Portfolio
            </Link>
          )}
        </View>

        {/* Skills */}
        {data.skills?.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Skills</Text>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>
                {skill.name || skill}
              </Text>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}>
                  {edu.degree}
                </Text>
                <Text style={{ fontSize: 8.5, color: "#475569" }}>{edu.institution}</Text>
                <Text style={{ fontSize: 8, color: "#64748b" }}>
                  {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                </Text>
                {edu.description && (
                  <View style={{ marginTop: 2 }}>
                    {splitToBullets(edu.description).map((bullet, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.description}>{bullet.replace(/^•\s*/, "")}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Right Content */}
      <View style={styles.rightContent}>
        {/* Summary */}
        {data.summary && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Experience</Text>
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
                    <View key={idx} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.description}>{bullet.replace(/^•\s*/, "")}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Projects</Text>
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
                      color: "#0284c7",
                      marginBottom: 2,
                      fontFamily: "Helvetica-Oblique",
                    }}
                  >
                    Tech: {proj.technologiesOrTopics}
                  </Text>
                )}
                <View style={{ marginTop: 2 }}>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletPoint}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.description}>{bullet.replace(/^•\s*/, "")}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={styles.mainTitle}>Certificates</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{cert.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(cert.year)}</Text>
                </View>
                <Text style={{ ...styles.jobCompany, marginBottom: 2 }}>{cert.organization}</Text>
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
      </View>

      <Text style={{ fontSize: 1, color: "#fff", opacity: 0.01, position: "absolute", bottom: 0 }}>
        NextCV Resume Optimized
      </Text>
    </Page>
  </Document>
);

export default SidebarLeft;
