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
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#333",
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#0ea5e9", // Sky blue for medical/clean feel
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 8,
  },
  role: {
    marginTop: 4,
    fontSize: 14,
    color: "#0ea5e9",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerRight: {
    alignItems: "flex-end",
    gap: 4,
  },
  contactItem: {
    fontSize: 9,
    color: "#64748b",
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    backgroundColor: "#e0f2fe", // Very light blue bg
    padding: "4 8",
    marginBottom: 10,
    borderRadius: 4,
  },
  // Experience
  jobBlock: {
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#e2e8f0",
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
  },
  jobCompany: {
    fontSize: 10,
    color: "#0ea5e9",
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  jobDate: {
    fontSize: 9,
    color: "#64748b",
  },
  description: {
    fontSize: 10,
    marginTop: 2,
    color: "#334155",
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 12,
    color: "#0ea5e9",
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
  },
  // Education & Certs
  eduBlock: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Skills grid
  skillContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  skillItem: {
    fontSize: 9,
    backgroundColor: "#f1f5f9",
    padding: "4 8",
    borderRadius: 12,
    color: "#334155",
    borderWidth: 1,
    borderColor: "#e2e8f0",
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

const MedicalNurse = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.role}>
              {data.jobRole || "Registered Nurse"}
            </Text>
          </View>
          <View style={styles.headerRight}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {(data.phone || data.phone_no) && (
              <Text style={styles.contactItem}>
                {data.phone || data.phone_no}
              </Text>
            )}
            {data.address && (
              <Text style={styles.contactItem}>{data.address}</Text>
            )}
            {data.linkedin && (
              <Link
                src={data.linkedin}
                style={{
                  ...styles.contactItem,
                  color: "#0ea5e9",
                  textDecoration: "none",
                }}
              >
                LinkedIn Profile
              </Link>
            )}
          </View>
        </View>

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.description}>{data.summary}</Text>
          </View>
        )}

        {/* Certifications (Important for Medical) */}
        {data.certificates?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Licenses & Certifications</Text>
            {data.certificates.map((cert, i) => (
              <View key={i} style={styles.eduBlock}>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                    {cert.title}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#64748b" }}>
                    {cert.organization}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#64748b" }}>
                  {formatDate(cert.year)}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Clinical Experience</Text>
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
                      <Text style={styles.bulletPoint}>+</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
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
            <Text style={styles.sectionTitle}>Clinical Skills</Text>
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
              <View key={i} style={styles.eduBlock}>
                <View>
                  <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                    {edu.degree}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#64748b" }}>
                    {edu.institution}
                  </Text>
                </View>
                <Text style={{ fontSize: 9, color: "#64748b" }}>
                  {formatDate(edu.startYear)} - {formatDate(edu.endYear)}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MedicalNurse;
