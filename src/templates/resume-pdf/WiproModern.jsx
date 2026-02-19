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
    flexDirection: "row",
    backgroundColor: "#fff",
    fontFamily: "Helvetica",
  },
  leftColumn: {
    width: "35%",
    backgroundColor: "#f7f7f7",
    padding: 20,
    padding: 20,
    flexGrow: 1,
  },
  rightColumn: {
    width: "65%",
    padding: 25,
  },
  // Wipro-ish Header accents
  headerDots: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  // Left Column Styles
  leftTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#333",
    textTransform: "uppercase",
    marginBottom: 8,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 2,
  },
  contactItem: {
    fontSize: 9,
    color: "#555",
    marginBottom: 6,
  },
  skillItem: {
    fontSize: 9,
    marginBottom: 3,
    color: "#444",
  },
  // Right Column Styles
  name: {
    fontSize: 26,
    fontFamily: "Helvetica-Bold",
    color: "#222",
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: "#e91e63", // Pink accent
    marginBottom: 10,
  },
  summary: {
    fontSize: 10,
    color: "#444",
    lineHeight: 1.4,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#222",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  jobBlock: {
    marginBottom: 15,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  jobMeta: {
    fontSize: 9,
    color: "#666",
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: "#333",
    marginTop: 2,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 6,
  },
  bulletPoint: {
    width: 6,
    fontSize: 10,
    color: "#e91e63",
    marginTop: 2,
  },
  bulletText: {
    flex: 1,
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
        return trimmed.split(";").map((b) => b.trim()).filter(Boolean);
      return [trimmed];
    })
    .filter(Boolean);
};

const WiproModern = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.leftColumn}>
          {/* Header Dots */}
          <View style={styles.headerDots}>
            <View style={[styles.dot, { backgroundColor: "#e91e63" }]} />
            <View style={[styles.dot, { backgroundColor: "#4caf50" }]} />
            <View style={[styles.dot, { backgroundColor: "#2196f3" }]} />
            <View style={[styles.dot, { backgroundColor: "#ff9800" }]} />
          </View>

          {/* Contact */}
          <Text style={styles.leftTitle}>Contact</Text>
          {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
          {(data.phone || data.phone_no) && (
            <Text style={styles.contactItem}>{data.phone || data.phone_no}</Text>
          )}
          {data.address && <Text style={styles.contactItem}>{data.address}</Text>}
          {data.linkedin && (
            <Link src={data.linkedin} style={{ ...styles.contactItem, color: "#2196f3" }}>
              LinkedIn
            </Link>
          )}
          {data.github && (
            <Link src={data.github} style={{ ...styles.contactItem, color: "#2196f3" }}>
              GitHub
            </Link>
          )}
          {data.portfolio && (
            <Link src={data.portfolio} style={{ ...styles.contactItem, color: "#2196f3" }}>
              Portfolio
            </Link>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <View>
              <Text style={styles.leftTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 9 }}>
                    {edu.institution}
                  </Text>
                  <Text style={{ fontSize: 8, color: "#666" }}>
                    {formatDate(edu.endYear)}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View>
              <Text style={styles.leftTitle}>Skills</Text>
              {data.skills.map((skill, i) => (
                <Text key={i} style={styles.skillItem}>
                  • {skill.name || skill}
                </Text>
              ))}
            </View>
          )}

          {/* Certs */}
          {data.certificates?.length > 0 && (
            <View>
              <Text style={styles.leftTitle}>Certifications</Text>
              {data.certificates.map((cert, i) => (
                <View key={i} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: 9, fontWeight: "bold" }}>
                    {cert.title}
                  </Text>
                   <Text style={{ fontSize: 8 }}>
                    {cert.organization}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Right Content */}
        <View style={styles.rightColumn}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.jobRole || "Software Engineer"}</Text>
          
          {data.summary && <Text style={styles.summary}>{data.summary}</Text>}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <View style={{ marginBottom: 20 }}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={styles.jobBlock}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobMeta}>
                    {exp.companyName} | {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
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
            <View>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={styles.jobBlock}>
                  <Text style={styles.jobTitle}>{proj.title}</Text>
                  <Text style={styles.jobMeta}>{formatDate(proj.date)}</Text>
                  {proj.technologiesOrTopics && (
                     <Text style={{ fontSize: 9, color: "#2196f3", marginBottom: 2 }}>
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
        </View>
      </Page>
    </Document>
  );
};

export default WiproModern;
