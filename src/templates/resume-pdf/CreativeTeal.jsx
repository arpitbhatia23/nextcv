"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/datefromater";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#333",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#0d9488", // Teal-600
    paddingBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f766e", // Teal-700
    marginBottom: 5,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  role: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  contact: {
    fontSize: 9,
    display: "flex",
    flexDirection: "row",
    gap: 8,
    color: "#444",
  },
  links: {
    flexDirection: "row",
    marginTop: 5,
    gap: 12,
  },
  link: {
    fontSize: 9,
    color: "#0d9488",
    textDecoration: "none",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#0d9488",
    padding: "4 8",
    alignSelf: "flex-start",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  experienceBlock: {
    marginBottom: 10,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#ccfbf1",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#134e4a",
  },
  jobCompany: {
    fontSize: 10,
    color: "#0d9488",
    fontStyle: "italic",
    marginBottom: 4,
  },
  date: {
    fontSize: 9,
    color: "#666",
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 12,
    fontSize: 12,
    color: "#0d9488",
  },
  bulletText: {
    fontSize: 9,
    flex: 1,
    color: "#333",
    lineHeight: 1.5,
  },
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    fontSize: 9,
    padding: "3 8",
    borderWidth: 1,
    borderColor: "#0d9488",
    borderRadius: 10,
    color: "#0d9488",
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

      // Keep AI bullet points intact
      if (trimmed.startsWith("•")) return [trimmed.replace(/^•\s*/, "")];

      // Split semicolon separated items
      if (trimmed.includes(";"))
        return trimmed
          .split(";")
          .map((b) => b.trim())
          .filter(Boolean);

      return [trimmed]; // keep full sentence
    })
    .filter(Boolean);
};

const CreativeTeal = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.role}>
          {data.jobRole || "Creative Professional"}
        </Text>
        <View style={styles.contact}>
          <Text>{data.email}</Text>
          <Text>|</Text>
          <Text>{data.phone}</Text>
          <Text>|</Text>
          <Text>{data.address}</Text>
        </View>
        <View style={styles.links}>
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
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={{ fontSize: 9.5, lineHeight: 1.6, color: "#333" }}>
            {data.summary}
          </Text>
        </View>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={i} style={styles.experienceBlock}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.date}>
                  {formatDate(exp.startDate)} -{" "}
                  {formatDate(exp.endDate) || "Present"}
                </Text>
              </View>
              <Text style={styles.jobCompany}>{exp.companyName}</Text>
              <View>
                {splitToBullets(exp.description).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      {bullet.replace(/^•\s*/, "")}
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
          <Text style={styles.sectionTitle}>Expertise</Text>
          <View style={styles.skillContainer}>
            {data.skills.map((skill, i) => (
              <Text key={i} style={styles.skillItem}>
                {skill.name || skill}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={i} style={{ marginBottom: 6 }}>
              <View style={styles.jobHeader}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  {edu.institution}
                </Text>
                <Text style={styles.date}>
                  {formatDate(edu.startYear)} -{" "}
                  {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
              <Text style={{ fontSize: 9, color: "#555" }}>
                {edu.degree} {edu.grade ? `| Grade: ${edu.grade}` : ""}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Projects */}
      {data.projects?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Projects</Text>
          {data.projects.map((proj, i) => (
            <View key={i} style={{ marginBottom: 8, paddingLeft: 8 }}>
              <View style={styles.jobHeader}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  {proj.title}
                </Text>
                <Text style={styles.date}>{formatDate(proj.date)}</Text>
              </View>
              {proj.technologiesOrTopics && (
                <Text
                  style={{ fontSize: 9, color: "#0d9488", marginBottom: 2 }}
                >
                  {proj.technologiesOrTopics}
                </Text>
              )}
              {proj.description && (
                <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.bulletText}>
                        {bullet.replace(/^•\s*/, "")}
                      </Text>
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
          <Text style={styles.sectionTitle}>Certificates</Text>
          {data.certificates.map((cert, i) => (
            <View key={i} style={{ marginBottom: 8, paddingLeft: 8 }}>
              <View style={styles.jobHeader}>
                <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                  {cert.title}
                </Text>
                <Text style={styles.date}>{formatDate(cert.year)}</Text>
              </View>
              <Text style={styles.jobCompany}>{cert.organization}</Text>
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

export default CreativeTeal;
