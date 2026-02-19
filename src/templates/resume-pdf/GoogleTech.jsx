"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/datefromater";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#202124", // Google Dark Grey
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#dadce0", // Light grey divider
    paddingBottom: 10,
  },
  name: {
    fontSize: 22, // Standout but not huge
    fontFamily: "Helvetica-Bold",
    color: "#202124",
    marginBottom: 6,
  },
  contactRow: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    fontSize: 9,
    color: "#5f6368", // Secondary text color
  },
  link: {
    color: "#1a73e8", // Google Blue
    textDecoration: "none",
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#202124",
    textTransform: "uppercase",
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#dadce0", // Subtle separator
    paddingBottom: 2,
    letterSpacing: 0.5,
  },
  // Experience Item
  expItem: {
    marginBottom: 10,
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  role: {
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
    color: "#202124",
  },
  company: {
    fontSize: 10.5,
    fontFamily: "Helvetica",
    color: "#202124",
  },
  date: {
    fontSize: 9,
    color: "#5f6368",
    textAlign: "right",
  },
  description: {
    fontSize: 9.5,
    color: "#3c4043",
    marginTop: 2,
  },
  // Bullet points
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    color: "#5f6368",
  },
  bulletText: {
    flex: 1,
  },
  // Skills
  skillSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillItem: {
    fontSize: 9.5,
    backgroundColor: "#f1f3f4",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    color: "#3c4043",
  },
});

const splitToBullets = (desc) => {
  if (Array.isArray(desc)) return desc;
  if (typeof desc !== "string") return [];

  return desc
    .split("\n")
    .flatMap((line) => {
      const trimmed = line.trim();
      if (!trimmed) return [];
      if (trimmed.startsWith("•")) return [trimmed.replace(/^•\s*/, "")];
      if (trimmed.includes(";"))
        return trimmed
          .split(";")
          .map((b) => b.trim())
          .filter(Boolean);
      return [trimmed];
    })
    .filter(Boolean);
};

const GoogleTech = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {data.phone ||
              (data.phone_no && <Text>• {data.phone || data.phone_no}</Text>)}
            {data.address && <Text>• {data.address}</Text>}
            {data.linkedin && (
              <Link src={data.linkedin} style={styles.link}>
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link src={data.github} style={styles.link}>
                GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link src={data.portfolio} style={styles.link}>
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={{ ...styles.description, lineHeight: 1.5 }}>
              {data.summary}
            </Text>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.expItem}>
                <View style={styles.expHeader}>
                  <Text style={styles.role}>
                    {exp.position}{" "}
                    <Text style={styles.company}>at {exp.companyName}</Text>
                  </Text>
                  <Text style={styles.date}>
                    {formatDate(exp.startDate)} –{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <View>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={[styles.description, styles.bulletText]}>
                        {bullet}
                      </Text>
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
                    {formatDate(edu.startYear)} –{" "}
                    {formatDate(edu.endYear) || "Present"}
                  </Text>
                </View>
                <Text style={styles.company}>
                  {edu.degree} {edu.grade ? `(Grade: ${edu.grade})` : ""}
                </Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
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
                  <Text
                    style={{ fontSize: 9, color: "#1a73e8", marginBottom: 2 }}
                  >
                    {proj.technologiesOrTopics}
                  </Text>
                )}
                <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={[styles.description, styles.bulletText]}>
                        {bullet}
                      </Text>
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
            <Text style={styles.sectionTitle}>Technical Skills</Text>
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
      </Page>
    </Document>
  );
};

export default GoogleTech;
