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
    color: "#202124", // Google Dark Grey
    lineHeight: 1.38,
  },
  header: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dadce0",
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: "Helvetica-Bold",
    color: "#202124",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: -0.2,
  },
  contactRow: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    fontSize: 8.5,
    color: "#5f6368",
  },
  link: {
    color: "#1a73e8", // Google Blue
    textDecoration: "none",
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#202124",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottomWidth: 0.75,
    borderBottomColor: "#dadce0",
    paddingBottom: 2,
    letterSpacing: 0.6,
  },
  expItem: {
    marginBottom: 9,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  role: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: "#202124",
  },
  company: {
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#3c4043",
  },
  date: {
    fontSize: 8.5,
    color: "#5f6368",
    textAlign: "right",
  },
  description: {
    fontSize: 9,
    color: "#3c4043",
    marginTop: 2,
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
    color: "#5f6368",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#3c4043",
    lineHeight: 1.35,
  },
  skillSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillItem: {
    fontSize: 8.5,
    backgroundColor: "#f8fafc",
    borderWidth: 0.5,
    borderColor: "#dadce0",
    paddingVertical: 2.5,
    paddingHorizontal: 6,
    borderRadius: 2,
    color: "#3c4043",
    fontFamily: "Helvetica",
  },
});

const GoogleTech = ({ data }) => {
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
              <Link src={data.linkedin} style={styles.link}>
                • LinkedIn
              </Link>
            )}
            {data.github && (
              <Link src={data.github} style={styles.link}>
                • GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link src={data.portfolio} style={styles.link}>
                • Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.role}>{exp.position}</Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={styles.company}>{exp.companyName}</Text>
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

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.role}>{proj.title}</Text>
                  <Text style={styles.date}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text style={{ fontSize: 8.5, color: "#1a73e8", marginBottom: 2 }}>
                    Technologies: {proj.technologiesOrTopics}
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

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.role}>{edu.institution}</Text>
                  <Text style={styles.date}>
                    {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
                <Text style={styles.company}>{edu.degree}</Text>
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

        {/* Skills */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillSection}>
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
            <Text style={styles.sectionTitle}>Certificates</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.role}>{cert.title}</Text>
                  <Text style={styles.date}>{formatDate(cert.year)}</Text>
                </View>
                <Text style={styles.company}>{cert.organization}</Text>
                {cert.credentialUrl && (
                  <Link src={cert.credentialUrl} style={styles.link}>
                    View Credential
                  </Link>
                )}
              </View>
            ))}
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

export default GoogleTech;
