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
    paddingBottom: 10,
  },
  name: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 1,
  },
  role: {
    fontSize: 12,
    fontFamily: "Times-Italic",
    marginBottom: 6,
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    fontSize: 10,
  },
  // Section Headers
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 1,
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
  jobCompany: {
    fontFamily: "Times-Roman",
    fontSize: 11,
  },
  jobDate: {
    fontFamily: "Times-Italic",
    fontSize: 10,
    textAlign: "right",
  },
  jobLocation: {
    fontSize: 10,
    fontFamily: "Times-Italic",
  },
  description: {
    fontSize: 11,
    textAlign: "justify",
    marginTop: 2,
    textIndent: 10, // Indent first line of paragraphs for legal style
  },
  bullet: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 10,
  },
  bulletPoint: {
    width: 10,
    fontSize: 11,
  },
  bulletText: {
    flex: 1,
    fontSize: 11,
    textAlign: "justify",
  },
  // Education (Prominent for Legal)
  eduBlock: {
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  // Bar Admissions (Unique to Legal)
    barBlock: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 11,
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

const LegalProfessional = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.jobRole || "Attorney at Law"}</Text>
          <View style={styles.contactRow}>
            {data.address && <Text>{data.address}</Text>}
            {(data.phone || data.phone_no) && <Text>| {data.phone || data.phone_no}</Text>}
            {data.email && <Text>| {data.email}</Text>}
            {data.linkedin && <Text>| LinkedIn</Text>}
          </View>
        </View>

        {/* Education (Often first for lawyers, especially junior) */}
        {data.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={{ fontFamily: "Times-Bold" }}>{edu.institution}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(edu.endYear)}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                     <Text style={{ fontFamily: "Times-Italic" }}>{edu.degree}</Text>
                     {edu.location && <Text style={styles.jobLocation}>{edu.location}</Text>}
                </View>

                 {/* Honors/Activities usually go here for law students/grads */}
                 {edu.description && (
                     <Text style={{ fontSize: 10, marginTop: 2, marginLeft: 10 }}>
                         Honors: {edu.description}
                     </Text>
                 )}
              </View>
            ))}
          </View>
        )}

        {/* Bar Admissions */}
        {data.certificates?.length > 0 && (
             <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bar Admissions & Certifications</Text>
                {data.certificates.map((cert, i) => (
                    <View key={i} style={styles.barBlock}>
                        <Text>{cert.title} - {cert.organization}</Text>
                        <Text style={styles.jobDate}>{formatDate(cert.year)}</Text>
                    </View>
                ))}
             </View>
        )}


        {/* Experience */}
        {data.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal Experience</Text>
            {data.experience.map((exp, i) => (
              <View key={i} style={styles.jobBlock}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobCompany}>{exp.companyName}</Text>
                  <Text style={styles.jobDate}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                  </Text>
                </View>
                 <Text style={{ ...styles.jobTitle, marginBottom: 2 }}>{exp.position}</Text>

                <View>
                  {splitToBullets(exp.description).map((bullet, idx) => (
                    <View key={idx} style={styles.bullet}>
                       {/* Lawyers often use numbering or no bullets, sticking to standard bullet for readability here */}
                      <Text style={styles.bulletPoint}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills / Languages */}
        {(data.skills?.length > 0 || data.languages?.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional Information</Text>
             {data.skills?.length > 0 && (
                <Text style={{ marginBottom: 4 }}>
                    <Text style={{ fontFamily: "Times-Bold" }}>Skills: </Text>
                    {data.skills.map(s => (typeof s === 'string' ? s : s.name)).join("; ")}
                </Text>
             )}
             {data.languages?.length > 0 && (
                <Text>
                    <Text style={{ fontFamily: "Times-Bold" }}>Languages: </Text>
                    {data.languages.map(l => l.name).join("; ")}
                </Text>
             )}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default LegalProfessional;
