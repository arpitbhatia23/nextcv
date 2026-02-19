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
    fontSize: 11,
    fontFamily: "Times-Roman",
    backgroundColor: "#fff",
    color: "#000",
    lineHeight: 1.4,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontFamily: "Times-Bold",
    marginBottom: 10,
  },
  role: {
    fontSize: 14,
    fontFamily: "Times-Italic",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    fontSize: 10,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Times-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 8,
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  // Experience
  jobBlock: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  jobTitle: {
    fontFamily: "Times-Bold",
    fontSize: 11,
  },
  jobDate: {
    fontFamily: "Times-Italic",
    fontSize: 10,
  },
  jobSub: {
    fontSize: 10,
    marginBottom: 10,
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 10,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10.5,
  },
  // Philosophy Section (Unique to teachers)
  philosophyBox: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: "#666",
    fontFamily: "Times-Italic",
    fontSize: 10.5,
  },
  // Skills
  skillList: {
    fontSize: 10.5,
    lineHeight: 1.5,
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

const AcademicTeacher = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.jobRole || "Educator"}</Text>
          <View style={styles.contactRow}>
            {data.email && <Text>{data.email}</Text>}
            {(data.phone || data.phone_no) && <Text>| {data.phone || data.phone_no}</Text>}
            {data.address && <Text>| {data.address}</Text>}
            {data.linkedin && (
              <Link src={data.linkedin} style={{ color: "#000", textDecoration: "none" }}>
                | LinkedIn
              </Link>
            )}
            {data.portfolio && (
               <Link src={data.portfolio} style={{ color: "#000", textDecoration: "none" }}>
                | Portfolio
              </Link>
            )}
          </View>
        </View>

        {/* Teaching Philosophy (Summary) */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Teaching Philosophy</Text>
            <View style={styles.philosophyBox}>
               <Text>"{data.summary}"</Text>
            </View>
          </View>
        )}

        {/* Education (Prioritized for Academic) */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education & Credentials</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{edu.degree}</Text>
                   <Text style={styles.jobDate}>
                    {formatDate(edu.startYear)} - {formatDate(edu.endYear)}
                  </Text>
                </View>
                <Text style={styles.jobSub}>{edu.institution}</Text>
              </View>
            ))}
             {data.certificates?.map((cert, i) => (
                 <View key={i} style={styles.jobBlock}>
                   {/* Certs often treated like Edu in Academia */}
                   <View style={styles.jobHeader}>
                      <Text style={styles.jobTitle}>{cert.title}</Text>
                      <Text style={styles.jobDate}>{formatDate(cert.year)}</Text>
                   </View>
                   <Text style={styles.jobSub}>{cert.organization}</Text>
                 </View>
              ))}
          </View>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Teaching Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{exp.position}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                <Text style={{ ...styles.jobSub, fontStyle: "italic" }}>
                    {exp.companyName}
                </Text>

                <View>
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

        {/* Publications/Projects */}
         {data.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects & Publications</Text>
            {data.projects.map((proj, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                   <Text style={styles.jobTitle}>{proj.title}</Text>
                   <Text style={styles.jobDate}>{formatDate(proj.date)}</Text>
                </View>
                {proj.technologiesOrTopics && (
                     <Text style={{ fontSize: 10, fontFamily: "Times-Italic", marginBottom: 2 }}>
                        Focus: {proj.technologiesOrTopics}
                     </Text>
                )}
                 <View>
                  {splitToBullets(proj.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                      <Text style={styles.bulletPoint}>-</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Areas of Expertise */}
        {data.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Areas of Expertise</Text>
            <Text style={styles.skillList}>
              {data.skills.map((s) => (typeof s === 'string' ? s : s.name)).join(" • ")}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default AcademicTeacher;
