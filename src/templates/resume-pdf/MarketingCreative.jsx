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
    borderBottomWidth: 1.5,
    borderBottomColor: "#e11d48",
    paddingBottom: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 3,
    letterSpacing: -0.3,
  },
  role: {
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#e11d48",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  contactCol: {
    alignItems: "flex-end",
    gap: 3,
  },
  contactItem: {
    fontSize: 8.5,
    color: "#64748b",
  },
  container: {
    flexDirection: "row",
  },
  leftCol: {
    width: "32%",
    paddingRight: 14,
    borderRightWidth: 0.5,
    borderRightColor: "#fecdd3",
  },
  rightCol: {
    width: "68%",
    paddingLeft: 16,
  },
  sectionTitle: {
    fontSize: 9.5,
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
    color: "#9f1239",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#fecdd3",
    paddingBottom: 2,
  },
  skillBadge: {
    backgroundColor: "#fff1f2",
    borderWidth: 0.5,
    borderColor: "#fecdd3",
    padding: "3 6",
    marginBottom: 4,
    borderRadius: 2,
    color: "#9f1239",
    fontSize: 8.5,
    fontFamily: "Helvetica",
  },
  jobBlock: {
    marginBottom: 11,
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
    color: "#be123c",
    fontFamily: "Helvetica-Bold",
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
    color: "#e11d48",
  },
  bulletText: {
    flex: 1,
  },
});

const MarketingCreative = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={HEADER_TEXT_COLUMN_STYLE}>
            <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name}</Text>
            <Text style={[styles.role, HEADER_ROLE_STYLE]}>
              {data.jobRole || "Creative Director"}
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
                style={{ ...styles.contactItem, color: "#be123c", textDecoration: "none" }}
              >
                LinkedIn
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ ...styles.contactItem, color: "#be123c", textDecoration: "none" }}
              >
                Portfolio
              </Link>
            )}
          </View>
        </View>

        <View style={styles.container}>
          {/* Left Column - Skills & Portfolio Highlights */}
          <View style={styles.leftCol}>
            {/* Summary */}
            {data.summary && (
              <View style={{ marginBottom: 14 }}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={{ fontSize: 8.5, lineHeight: 1.4, color: "#475569" }}>
                  {data.summary}
                </Text>
              </View>
            )}

            {/* Skills - Creative Tags */}
            {data.skills?.length > 0 && (
              <View style={{ marginBottom: 14 }}>
                <Text style={styles.sectionTitle}>Creative Stack</Text>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>
                    {skill.name || skill}
                  </Text>
                ))}
              </View>
            )}

            {/* Awards / Certs */}
            {data.certificates?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Recognition</Text>
                {data.certificates.map((cert, i) => (
                  <View key={i} style={{ marginBottom: 5 }}>
                    <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 9, color: "#0f172a" }}>
                      {cert.title}
                    </Text>
                    <Text style={{ fontSize: 8.5, color: "#64748b" }}>{cert.organization}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column - Experience & Projects */}
          <View style={styles.rightCol}>
            {/* Experience */}
            {data.experience?.length > 0 && (
              <View style={{ marginBottom: 14 }}>
                <Text style={styles.sectionTitle}>Campaign Strategy & Roles</Text>
                {data.experience.map((exp, i) => (
                  <View key={i} style={styles.jobBlock}>
                    <View style={styles.jobHeader}>
                      <Text style={styles.jobTitle}>{exp.position}</Text>
                      <Text style={styles.jobDate}>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                      </Text>
                    </View>
                    <Text style={styles.jobCompany}>{exp.companyName}</Text>
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

            {/* Projects - Portfolio Highlights */}
            {data.projects?.length > 0 && (
              <View style={{ marginBottom: 14 }}>
                <Text style={styles.sectionTitle}>Portfolio Highlights</Text>
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
                          color: "#be123c",
                          marginBottom: 2,
                          fontFamily: "Helvetica-Oblique",
                        }}
                      >
                        Brand/Client: {proj.technologiesOrTopics}
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
              <View>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 4 }}>
                    <View style={styles.jobHeader}>
                      <Text
                        style={{ fontSize: 9.5, fontFamily: "Helvetica-Bold", color: "#0f172a" }}
                      >
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
              </View>
            )}
          </View>
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

export default MarketingCreative;
