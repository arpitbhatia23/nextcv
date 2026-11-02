"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link, Svg, Path } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";
import { HEADER_NAME_STYLE, HEADER_ROLE_STYLE } from "./headerTypography";

// SVG Icons for LinkedIn, GitHub, Portfolio
const LinkedInIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#2563eb"
      d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.54 20h-2.46v-8h2.46v8zm-1.23-9.21c-.79 0-1.43-.64-1.43-1.43s.64-1.43 1.43-1.43 1.43.64 1.43 1.43-.64 1.43-1.43 1.43zm14.23 9.21h-2.46v-4.18c0-1-.02-2.29-1.39-2.29-1.39 0-1.61 1.09-1.61 2.22v4.25h-2.46v-8h2.36v1.09h.03c.33-.62 1.13-1.27 2.33-1.27 2.49 0 2.95 1.64 2.95 3.77v4.41z"
    />
  </Svg>
);

const GitHubIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#1e293b"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.004-.404c1.018.004 2.045.138 3.004.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.241 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.369.823 1.096.823 2.211v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </Svg>
);

const PortfolioIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#2563eb"
      d="M2 7V6a5 5 0 0110 0v1h8a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V9a2 2 0 012-2zm8-1a3 3 0 10-6 0v1h6V6zm10 3H2v10h18V9zm-6 2v2h-2v-2h2zm-4 0v2H6v-2h2z"
    />
  </Svg>
);

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
    borderBottomColor: "#2563eb",
    marginBottom: 14,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  nameBlock: {
    flexDirection: "column",
    flexGrow: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 3,
    letterSpacing: -0.2,
    textTransform: "uppercase",
  },
  headline: {
    fontSize: 10.5,
    color: "#2563eb",
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
  },
  contact: {
    fontSize: 8.5,
    color: "#64748b",
    marginBottom: 3,
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
    gap: 10,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: {
    fontSize: 8.5,
    color: "#2563eb",
    marginLeft: 3,
    textDecoration: "none",
  },
  section: {
    marginBottom: 14,
  },
  sectionHeading: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#2563eb",
    marginBottom: 6,
    letterSpacing: 0.8,
    textTransform: "uppercase",
    borderBottomWidth: 0.5,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 2,
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
    marginTop: 2,
  },
  skill: {
    backgroundColor: "#f8fafc",
    color: "#1e293b",
    borderWidth: 0.5,
    borderColor: "#cbd5e1",
    borderRadius: 2,
    padding: "3 7",
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
    color: "#2563eb",
  },
  bulletContent: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
  },
});

const morden = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.nameBlock}>
          <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name || "Your Name"}</Text>
          {data.headline && (
            <Text style={[styles.headline, HEADER_ROLE_STYLE]}>{data.headline}</Text>
          )}
          <Text style={styles.contact}>
            {data.email} | {data.phone || data.phone_no} | {data.address}
          </Text>
          <View style={styles.links}>
            {data.linkedin && (
              <View style={styles.linkItem}>
                <LinkedInIcon />
                <Link src={data.linkedin} style={styles.linkText}>
                  LinkedIn
                </Link>
              </View>
            )}
            {data.github && (
              <View style={styles.linkItem}>
                <GitHubIcon />
                <Link src={data.github} style={styles.linkText}>
                  GitHub
                </Link>
              </View>
            )}
            {data.portfolio && (
              <View style={styles.linkItem}>
                <PortfolioIcon />
                <Link src={data.portfolio} style={styles.linkText}>
                  Portfolio
                </Link>
              </View>
            )}
          </View>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.expTitle}>
                  {exp.position} @ {exp.companyName}
                </Text>
                <Text style={styles.expMeta}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                </Text>
              </View>
              <View style={styles.bulletList}>
                {splitToBullets(exp.description).map((bullets, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bulletSymbol}>•</Text>
                    <Text style={styles.bulletContent}>{bullets}</Text>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.projTitle}>{proj.title}</Text>
                <Text style={styles.projMeta}>{proj.date && `${formatDate(proj.date)}`}</Text>
              </View>
              {proj.roleOrType && (
                <Text style={styles.projMeta}>
                  {proj.roleOrType}
                  {proj.organization ? ` @ ${proj.organization}` : ""}
                </Text>
              )}
              {proj.technologiesOrTopics && (
                <Text style={styles.projTech}>Tech: {proj.technologiesOrTopics}</Text>
              )}
              {proj.description && (
                <View style={styles.bulletList}>
                  {splitToBullets(proj.description).map((bullets, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletContent}>{bullets}</Text>
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <Text style={styles.eduTitle}>{edu.institution}</Text>
                <Text style={styles.eduSubtitle}>
                  {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
              <Text style={styles.eduSubtitle}>
                {edu.degree}
                {edu.grade ? ` | Grade: ${edu.grade}` : ""}
              </Text>
              {edu.description && (
                <View style={styles.bulletList}>
                  {splitToBullets(edu.description).map((bullets, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bulletSymbol}>•</Text>
                      <Text style={styles.bulletContent}>{bullets}</Text>
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
                <Link src={cert.credentialUrl} style={styles.linkText}>
                  View Certificate
                </Link>
              )}
            </View>
          ))}
        </View>
      )}
      {/* Hidden Signature for ATS Detection */}
      <Text style={{ fontSize: 1, color: "#fff", marginTop: 10, display: "none" }}>
        NextCV Resume Optimized
      </Text>
    </Page>
  </Document>
);

export default morden;
