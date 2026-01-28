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
    padding: 0, // Zero padding to allow full width header
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#333",
  },
  header: {
    padding: 30,
    backgroundColor: "#0f172a", // Slate-900
    color: "#fff",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  role: {
    fontSize: 12,
    color: "#94a3b8", // Slate-400
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  contact: {
    fontSize: 9,
    color: "#cbd5e1", // Slate-300
    marginTop: 2,
    flexDirection: "row",
    gap: 8,
  },
  links: {
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-end",
  },
  linkItem: {
    fontSize: 9,
    color: "#38bdf8", // Sky-400
    textDecoration: "none",
  },
  mainContent: {
    padding: 30,
    paddingTop: 0,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#0f172a",
    borderBottomWidth: 2,
    borderBottomColor: "#0f172a",
    paddingBottom: 4,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  itemGroup: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#1e293b",
  },
  itemDate: {
    fontSize: 9,
    color: "#64748b",
    backgroundColor: "#f1f5f9",
    padding: "2 6",
    borderRadius: 4,
  },
  itemSubtitle: {
    fontSize: 10,
    color: "#475569",
    fontStyle: "italic",
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
    color: "#0f172a",
  },
  bulletText: {
    flex: 1,
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.5,
  },
  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillTag: {
    backgroundColor: "#1e293b",
    color: "#fff",
    fontSize: 9,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
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

const TechDark = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Dark Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.jobRole || "Tech Professional"}</Text>
          <View style={styles.contact}>
            <Text>{data.email}</Text>
            <Text>|</Text>
            <Text>{data.phone || data.phone_no}</Text>
            {data.address && <Text>| {data.address}</Text>}
          </View>
        </View>
        <View style={styles.links}>
          {data.linkedin && (
            <Link src={data.linkedin} style={styles.linkItem}>
              LinkedIn
            </Link>
          )}
          {data.github && (
            <Link src={data.github} style={styles.linkItem}>
              GitHub
            </Link>
          )}
          {data.portfolio && (
            <Link src={data.portfolio} style={styles.linkItem}>
              Portfolio
            </Link>
          )}
        </View>
      </View>

      <View style={styles.mainContent}>
        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={{ fontSize: 9.5, lineHeight: 1.6, color: "#334155" }}>
              {data.summary}
            </Text>
          </View>
        )}

        {/* Skills - Prominent */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.skillRow}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillTag}>
                  {skill.name || skill}
                </Text>
              ))}
            </View>
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.position}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)} -{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.companyName}</Text>
                <View>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <Text style={styles.bulletPoint}>›</Text>
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

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{proj.title}</Text>
                  <Text style={styles.itemDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{
                      fontFamily: "Courier",
                      fontSize: 9,
                      color: "#ef4444",
                      marginBottom: 3,
                    }}
                  >
                    [{proj.technologiesOrTopics}]
                  </Text>
                )}
                <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletRow}>
                      <Text style={styles.bulletPoint}>›</Text>
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

        {/* Certificates */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.itemGroup}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{cert.title}</Text>
                  <Text style={styles.itemDate}>{formatDate(cert.year)}</Text>
                </View>
                <Text style={styles.itemSubtitle}>{cert.organization}</Text>
                {cert.credentialUrl && (
                  <Link
                    src={cert.credentialUrl}
                    style={{
                      fontSize: 9,
                      color: "#38bdf8",
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

        {/* Education */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View
                key={i}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                    {edu.institution}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#64748b" }}>
                    {edu.degree}
                  </Text>
                </View>
                <Text style={styles.itemDate}>
                  {formatDate(edu.startYear)} -{" "}
                  {formatDate(edu.endYear) || "Present"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Page>
  </Document>
);

export default TechDark;
