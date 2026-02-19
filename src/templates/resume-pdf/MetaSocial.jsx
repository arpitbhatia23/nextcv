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
    color: "#1c1e21", // Meta Text Color
    lineHeight: 1.4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#0668E1", // Meta Blue
    paddingBottom: 15,
  },
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#0668E1",
    marginBottom: 4,
  },
  contactCol: {
    alignItems: "flex-end",
  },
  contactItem: {
    fontSize: 9,
    color: "#65676b",
    marginBottom: 2,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0668E1",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  // Job
  jobBlock: {
    marginBottom: 14,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#1c1e21",
  },
  jobCompany: {
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#65676b",
  },
  jobDate: {
    fontSize: 9,
    color: "#65676b",
  },
  description: {
    fontSize: 10,
    color: "#1c1e21",
    marginTop: 2,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletPoint: {
    width: 6,
    fontSize: 10,
    color: "#0668E1",
  },
  bulletText: {
    flex: 1,
  },
  // Tags
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tag: {
    backgroundColor: "#e7f3ff", // Light Blue
    color: "#0668E1",
    fontSize: 9,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
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

const MetaSocial = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={{ fontSize: 11, color: "#65676b", marginTop: 10 }}>
              {data.jobRole || "Professional Role"}
            </Text>
          </View>
          <View style={styles.contactCol}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text style={styles.contactItem}>
                {data.phone || data.phone_no}
              </Text>
            )}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{ ...styles.contactItem, color: "#0668E1" }}
              >
                LinkedIn
              </Link>
            )}
            {data.github && (
              <Link
                src={data.github}
                style={{ ...styles.contactItem, color: "#0668E1" }}
              >
                GitHub
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ ...styles.contactItem, color: "#0668E1" }}
              >
                Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={{ ...styles.description, lineHeight: 1.5 }}>
              {data.summary}
            </Text>
          </View>
        )}

        {/* Skills - Tags Style */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.tagContainer}>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.tag}>
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
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(exp.startDate)} –{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={{ ...styles.jobCompany, marginBottom: 4 }}>
                  {exp.companyName}
                </Text>
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

        {/* Projects */}
        {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                  <Text
                    style={{ fontSize: 9, color: "#0668E1", marginBottom: 2 }}
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

        {/* Education & Certs */}
        {(data.education?.length > 0 || data.certificates?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education & Certifications</Text>
            {data.education?.map((edu, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ ...styles.jobTitle, fontSize: 10 }}>
                    {edu.institution}
                  </Text>
                  <Text style={styles.jobDate}>{formatDate(edu.endYear)}</Text>
                </View>
                <Text style={{ fontSize: 10, color: "#65676b" }}>
                  {edu.degree} {edu.grade ? ` · ${edu.grade}` : ""}
                </Text>
              </View>
            ))}
            {data.certificates?.map((cert, i) => (
              <View key={`cert-${i}`} style={{ marginTop: 6, marginBottom: 4 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ ...styles.jobTitle, fontSize: 10 }}>
                    {cert.title}
                  </Text>
                  <Text style={styles.jobDate}>{formatDate(cert.year)}</Text>
                </View>
                <Text style={{ fontSize: 10, color: "#65676b" }}>
                  {cert.organization}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MetaSocial;
