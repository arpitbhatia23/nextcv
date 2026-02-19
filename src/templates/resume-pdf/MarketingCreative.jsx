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
    padding: 0,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    backgroundColor: "#ff4d6d", // Vibrant Pink/Red for Creative
    padding: 30,
    color: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 32,
    fontFamily: "Helvetica-Bold",
    color: "#fff",
    marginBottom: 10,
  },
  role: {
    marginTop: 10,
    fontSize: 14,
    color: "#ffe5ec",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  contactCol: {
    alignItems: "flex-end",
    gap: 4,
  },
  contactItem: {
    fontSize: 9,
    color: "#fff",
  },
  container: {
    flexDirection: "row",
    height: "100%",
  },
  leftCol: {
    width: "35%",
    padding: 20,
    backgroundColor: "#fff0f3", // Light pink background
  },
  rightCol: {
    width: "65%",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginBottom: 10,
    color: "#c9184a",
    textTransform: "uppercase",
    borderBottomWidth: 2,
    borderBottomColor: "#ff4d6d",
    paddingBottom: 2,
  },
  // Left Column Content
  skillBadge: {
    backgroundColor: "#ffccd5",
    padding: "4 8",
    marginBottom: 6,
    borderRadius: 4,
    color: "#800f2f",
    fontSize: 9,
    textAlign: "center",
  },
  // Brand/Portfolio Section
  portfolioItem: {
    marginBottom: 8,
  },
  // Right Column Content
  jobBlock: {
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#000",
  },
  jobCompany: {
    fontSize: 10,
    color: "#ff4d6d",
    fontFamily: "Helvetica-Bold",
  },
  jobDate: {
    fontSize: 9,
    color: "#666",
  },
  description: {
    fontSize: 10,
    marginTop: 4,
    color: "#333",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 3,
    paddingLeft: 6,
  },
  bulletPoint: {
    width: 6,
    fontSize: 12,
    color: "#ff4d6d",
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
        return trimmed
          .split(";")
          .map((b) => b.trim())
          .filter(Boolean);
      return [trimmed];
    })
    .filter(Boolean);
};

const MarketingCreative = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.role}>
              {data.jobRole || "Creative Director"}
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
                style={{ ...styles.contactItem, textDecoration: "none" }}
              >
                LinkedIn
              </Link>
            )}
            {data.portfolio && (
              <Link
                src={data.portfolio}
                style={{ ...styles.contactItem, textDecoration: "none" }}
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
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>Profile</Text>
                <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
                  {data.summary}
                </Text>
              </View>
            )}

            {/* Skills - Creative Tags */}
            {data.skills?.length > 0 && (
              <View style={{ marginBottom: 20 }}>
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
                  <View key={i} style={{ marginBottom: 6 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                      {cert.title}
                    </Text>
                    <Text style={{ fontSize: 9 }}>{cert.organization}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column - Experience & Projects */}
          <View style={styles.rightCol}>
            {/* Experience */}
            {data.experience?.length > 0 && (
              <View style={{ marginBottom: 20 }}>
                <Text style={styles.sectionTitle}>
                  Campaign Strategy & Roles
                </Text>
                {data.experience.map((exp, i) => (
                  <View key={i} style={styles.jobBlock}>
                    <View style={styles.jobHeader}>
                      <Text style={styles.jobTitle}>{exp.position}</Text>
                      <Text style={styles.jobDate}>
                        {formatDate(exp.startDate)} -{" "}
                        {formatDate(exp.endDate) || "Present"}
                      </Text>
                    </View>
                    <Text style={styles.jobCompany}>{exp.companyName}</Text>
                    <View>
                      {splitToBullets(exp.description).map((bullet, idx) => (
                        <View key={idx} style={styles.bullet}>
                          <Text style={styles.bulletPoint}>›</Text>
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

            {/* Projects - Portfolio Highlights */}
            {data.projects?.length > 0 && (
              <View>
                <Text style={styles.sectionTitle}>Portfolio Highlights</Text>
                {data.projects.map((proj, i) => (
                  <View key={i} style={styles.jobBlock}>
                    <View style={styles.jobHeader}>
                      <Text style={styles.jobTitle}>{proj.title}</Text>
                      <Text style={styles.jobDate}>
                        {formatDate(proj.date)}
                      </Text>
                    </View>
                    {proj.technologiesOrTopics && (
                      <Text
                        style={{
                          fontSize: 9,
                          color: "#ff4d6d",
                          marginBottom: 2,
                          fontStyle: "italic",
                        }}
                      >
                        Brand/Client: {proj.technologiesOrTopics}
                      </Text>
                    )}
                    <View>
                      {splitToBullets(proj.description).map((bullet, idx) => (
                        <View key={idx} style={styles.bullet}>
                          <Text style={styles.bulletPoint}>›</Text>
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
              <View style={{ marginTop: 20 }}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.education.map((edu, i) => (
                  <View key={i} style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                      {edu.degree}
                    </Text>
                    <Text style={{ fontSize: 9 }}>
                      {edu.institution}, {formatDate(edu.endYear)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MarketingCreative;
