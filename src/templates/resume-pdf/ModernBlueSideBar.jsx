"use client";
import React from "react";
import { Document, Page, Text, View, StyleSheet, Link, Svg, Path } from "@react-pdf/renderer";
import { formatDate } from "@/shared/utils/datefromater";
import { splitToBullets } from "@/shared/utils/splitBullets";
import { HEADER_NAME_STYLE, HEADER_ROLE_STYLE } from "./headerTypography";

const BLUE = "#1e40af";
const SLATE_BG = "#f8fafc";
const DARK = "#0f172a";

const PhoneIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.89.76a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.68.76 3.89a1 1 0 01-.21 1.11l-2.2 2.2z"
    />
  </Svg>
);
const MailIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);
const LocationIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
    />
  </Svg>
);
const LinkedInIcon = () => (
  <Svg width="9" height="9" viewBox="0 0 24 24">
    <Path
      fill={BLUE}
      d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.54 20h-2.46v-8h2.46v8zm-1.23-9.21c-.79 0-1.43-.64-1.43-1.43s.64-1.43 1.43-1.43 1.43.64 1.43 1.43-.64 1.43-1.43 1.43zm14.23 9.21h-2.46v-4.18c0-1-.02-2.29-1.39-2.29-1.39 0-1.61 1.09-1.61 2.22v4.25h-2.46v-8h2.36v1.09h.03c.33-.62 1.13-1.27 2.33-1.27 2.49 0 2.95 1.64 2.95 3.77v4.41z"
    />
  </Svg>
);

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    backgroundColor: "#ffffff",
    color: DARK,
    padding: 30,
    lineHeight: 1.4,
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  leftCol: {
    width: "35%",
    backgroundColor: SLATE_BG,
    borderRight: `0.75 solid #e2e8f0`,
    padding: 14,
    paddingTop: 16,
    paddingBottom: 16,
  },
  rightCol: {
    width: "65%",
    padding: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  name: {
    fontSize: 20,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    marginBottom: 2,
    letterSpacing: -0.2,
    textTransform: "uppercase",
  },
  role: {
    color: BLUE,
    fontSize: 10,
    fontFamily: "Helvetica",
    marginBottom: 10,
    marginTop: 1,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  inlineIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    flexWrap: "wrap",
    gap: 6,
  },
  contact: {
    flexDirection: "row",
    alignItems: "center",
    color: "#475569",
    fontSize: 8.5,
    gap: 4,
  },
  link: {
    color: BLUE,
    textDecoration: "none",
    fontSize: 8.5,
  },
  sectionTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: BLUE,
    borderBottom: `0.75 solid #cbd5e1`,
    marginBottom: 6,
    letterSpacing: 0.8,
    paddingBottom: 2,
    marginTop: 8,
    textTransform: "uppercase",
  },
  section: {
    marginBottom: 12,
  },
  summary: {
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
    marginBottom: 2,
  },
  expBlock: {
    marginBottom: 9,
  },
  expTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#0f172a",
    marginBottom: 1,
  },
  expOrg: {
    fontSize: 9,
    color: BLUE,
    fontFamily: "Helvetica-Bold",
    marginBottom: 1,
  },
  expPeriodLoc: {
    flexDirection: "row",
    fontSize: 8.5,
    color: "#64748b",
    marginBottom: 2,
    alignItems: "center",
    gap: 6,
  },
  expBullets: {
    marginLeft: 4,
    marginBottom: 2,
  },
  expBullet: {
    fontSize: 9,
    color: "#334155",
    lineHeight: 1.35,
    marginBottom: 1,
  },
  eduEntry: {
    marginBottom: 7,
  },
  eduDegree: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: "#0f172a",
    marginBottom: 1,
  },
  eduSchool: {
    color: BLUE,
    fontSize: 8.5,
    marginBottom: 1,
  },
  eduMeta: {
    fontSize: 8.5,
    color: "#64748b",
    marginBottom: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
    marginBottom: 8,
    gap: 4,
  },
  skillBadge: {
    backgroundColor: "#ffffff",
    color: "#1e293b",
    borderWidth: 0.5,
    borderColor: "#cbd5e1",
    fontSize: 8.5,
    borderRadius: 2,
    padding: "2 6",
  },
  strengthsSection: {
    marginTop: 6,
    marginBottom: 8,
  },
  strengthTitle: {
    color: BLUE,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
    marginBottom: 1,
  },
  strengthText: {
    fontSize: 8.5,
    color: "#475569",
    marginBottom: 4,
    lineHeight: 1.3,
  },
  langSection: {
    marginTop: 6,
  },
  langTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 9.5,
    color: BLUE,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    gap: 5,
  },
  langName: {
    fontSize: 8.5,
    width: 55,
    color: "#334155",
  },
  langBar: {
    flexDirection: "row",
    gap: 2,
  },
  langDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 1,
    backgroundColor: "#e2e8f0",
  },
  langDotActive: {
    backgroundColor: BLUE,
  },
  projBlock: {
    marginBottom: 8,
  },
  projTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: "#0f172a",
  },
  projMeta: {
    fontSize: 8.5,
    color: BLUE,
    marginBottom: 1,
  },
  projTech: {
    fontSize: 8.5,
    color: "#0369a1",
    marginBottom: 1,
    fontFamily: "Helvetica-Oblique",
  },
  bulletList: {
    marginTop: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 4,
  },
  bulletSymbol: {
    width: 8,
    fontSize: 9,
    color: BLUE,
  },
});

function renderLangBar(level, max = 5) {
  return (
    <View style={styles.langBar}>
      {[...Array(max)].map((_, i) => (
        <View key={i} style={[styles.langDot, i < level ? styles.langDotActive : undefined]} />
      ))}
    </View>
  );
}

const ModernBlueSidebarPDFResume = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.row}>
        {/* LEFT COLUMN */}
        <View style={styles.leftCol}>
          <Text style={[styles.name, HEADER_NAME_STYLE]}>{data.name || "Your Name"}</Text>
          <Text style={[styles.role, HEADER_ROLE_STYLE]}>{data.jobRole || "Job Title"}</Text>

          <View style={styles.inlineIcons}>
            {(data.phone || data.phone_no) && (
              <View style={styles.contact}>
                <PhoneIcon />
                <Text>{data.phone || data.phone_no}</Text>
              </View>
            )}
            {data.email && (
              <View style={styles.contact}>
                <MailIcon />
                <Text>{data.email}</Text>
              </View>
            )}
          </View>
          {data.address && (
            <View style={styles.inlineIcons}>
              <View style={styles.contact}>
                <LocationIcon />
                <Text>{data.address}</Text>
              </View>
            </View>
          )}
          {data.linkedin && (
            <View style={styles.inlineIcons}>
              <View style={styles.contact}>
                <LinkedInIcon />
                <Link src={data.linkedin} style={styles.link}>
                  {data.linkedin.replace("https://", "").replace("www.", "")}
                </Link>
              </View>
            </View>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu, i) => (
                <View key={i} style={styles.eduEntry}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.institution}</Text>
                  <View style={styles.eduMeta}>
                    <Text>
                      {formatDate(edu.startYear)} - {formatDate(edu.endYear) || "Present"}
                    </Text>
                    {edu.location && (
                      <>
                        <Text>·</Text>
                        <Text>{edu.location}</Text>
                      </>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsWrap}>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.skillBadge}>
                    {typeof skill === "string" ? skill : skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Strengths */}
          {data.strengths?.length > 0 && (
            <View style={styles.strengthsSection}>
              <Text style={styles.sectionTitle}>Strengths</Text>
              {data.strengths.map((str, i) => (
                <View key={i}>
                  <Text style={styles.strengthTitle}>{str.title}</Text>
                  <Text style={styles.strengthText}>{str.text}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Certificates */}
          {data.certificates?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certificates</Text>
              {data.certificates.map((cert, i) => (
                <View key={i} style={{ marginBottom: 5 }}>
                  <Text style={styles.eduDegree}>{cert.title}</Text>
                  <Text style={styles.eduMeta}>
                    {cert.organization}
                    {cert.year ? ` · ${formatDate(cert.year)}` : ""}
                  </Text>
                  {cert.credentialUrl && (
                    <Link src={cert.credentialUrl} style={styles.link}>
                      View Certificate
                    </Link>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {data.languages?.length > 0 && (
            <View style={styles.langSection}>
              <Text style={styles.langTitle}>Languages</Text>
              {data.languages.map((lang, i) => (
                <View key={i} style={styles.langRow}>
                  <Text style={styles.langName}>{lang.name}</Text>
                  {renderLangBar(lang.level)}
                </View>
              ))}
            </View>
          )}
        </View>

        {/* RIGHT COLUMN */}
        <View style={styles.rightCol}>
          {/* Summary */}
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Summary</Text>
              <Text style={styles.summary}>{data.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={styles.expBlock}>
                  <Text style={styles.expTitle}>{exp.position}</Text>
                  <Text style={styles.expOrg}>{exp.companyName}</Text>
                  <View style={styles.expPeriodLoc}>
                    <Text>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Present"}
                    </Text>
                    {exp.location && (
                      <>
                        <Text>·</Text>
                        <Text>{exp.location}</Text>
                      </>
                    )}
                  </View>
                  {exp.description && <Text style={styles.summary}>{exp.description}</Text>}
                  {exp.bullets?.length > 0 && (
                    <View style={styles.expBullets}>
                      {exp.bullets.map((b, j) =>
                        b ? (
                          <Text key={j} style={styles.expBullet}>
                            • {b}
                          </Text>
                        ) : null
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {data.projects?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((proj, i) => (
                <View key={i} style={styles.projBlock}>
                  <Text style={styles.projTitle}>{proj.title}</Text>
                  <Text style={styles.projMeta}>
                    {proj.roleOrType}
                    {proj.organization && ` @ ${proj.organization}`}
                    {formatDate(proj.date) && ` | ${formatDate(proj.date)}`}
                  </Text>
                  {proj.technologiesOrTopics && (
                    <Text style={styles.projTech}>Tech: {proj.technologiesOrTopics}</Text>
                  )}
                  {proj.description && (
                    <View style={styles.bulletList}>
                      {splitToBullets(proj.description).map((bullet, idx) => (
                        <View key={idx} style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>•</Text>
                          <Text style={{ flex: 1, fontSize: 9, color: "#334155" }}>{bullet}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>

      <Text style={{ fontSize: 1, color: "#fff", opacity: 0.01, position: "absolute", bottom: 0 }}>
        NextCV Resume Optimized
      </Text>
    </Page>
  </Document>
);

export default ModernBlueSidebarPDFResume;
