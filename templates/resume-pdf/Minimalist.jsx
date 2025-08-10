"use client";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Link,
  Svg,
  Path,
} from "@react-pdf/renderer";
import { formatDate } from "@/utils/datefromater";

// Icon SVGs
const LocationIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#333"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
    />
  </Svg>
);
const PhoneIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#333"
      d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.89.76a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.68.76 3.89a1 1 0 01-.21 1.11l-2.2 2.2z"
    />
  </Svg>
);
const MailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#333"
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </Svg>
);
const LinkedInIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#0A66C2"
      d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.54 20h-2.46v-8h2.46v8zm-1.23-9.21c-.79 0-1.43-.64-1.43-1.43s.64-1.43 1.43-1.43 1.43.64 1.43 1.43-.64 1.43-1.43 1.43zm14.23 9.21h-2.46v-4.18c0-1-.02-2.29-1.39-2.29-1.39 0-1.61 1.09-1.61 2.22v4.25h-2.46v-8h2.36v1.09h.03c.33-.62 1.13-1.27 2.33-1.27 2.49 0 2.95 1.64 2.95 3.77v4.41z"
    />
  </Svg>
);
const GitHubIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#212121"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.419-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.123-.304-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.004-.404c1.018.004 2.045.138 3.004.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.241 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.369.823 1.096.823 2.211v3.293c0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </Svg>
);
const PortfolioIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path
      fill="#4f8cff"
      d="M2 7V6a5 5 0 0110 0v1h8a2 2 0 012 2v10a2 2 0 01-2 2H2a2 2 0 01-2-2V9a2 2 0 012-2zm8-1a3 3 0 10-6 0v1h6V6zm10 3H2v10h18V9zm-6 2v2h-2v-2h2zm-4 0v2H6v-2h2z"
    />
  </Svg>
);

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    color: "#232323",
  },
  topSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  profileImage: {
    width: 62,
    height: 62,
    borderRadius: 32,
    objectFit: "cover",
    marginBottom: 8,
    marginTop: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 2,
    textAlign: "center",
  },
  subline: {
    fontSize: 11,
    textAlign: "center",
    letterSpacing: 0.5,
    color: "#444",
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 2,
    flexWrap: "wrap",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginRight: 12,
    fontSize: 9,
    color: "#444",
  },
  leftCol: {
    width: "32%",
    paddingRight: 16,
    borderRight: "1 solid #ccc",
  },
  rightCol: {
    width: "68%",
    paddingLeft: 18,
  },
  twoCol: {
    flexDirection: "row",
    marginTop: 8,
  },
  section: {
    marginBottom: 17,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 12,
    letterSpacing: 1.2,
    color: "#232323",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  detailList: {
    fontSize: 9,
    color: "#232323",
    marginBottom: 7,
    lineHeight: 1.35,
  },
  skillsList: {
    marginBottom: 7,
  },
  skill: {
    fontSize: 10,
    padding: "2 0",
    borderBottom: "1 solid #eaeaea",
    marginBottom: 2,
  },
  profileText: {
    fontSize: 10.5,
    color: "#232323",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  historyOrg: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#232323",
    marginBottom: 1,
  },
  historyTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 1,
  },
  historyDate: {
    fontSize: 9,
    color: "#888",
    marginBottom: 2,
  },
  historyItem: {
    marginBottom: 7,
  },
  bulletList: {
    marginLeft: 8,
    marginBottom: 3,
  },
  bullet: {
    fontSize: 9.5,
    marginBottom: 1,
    lineHeight: 1.25,
  },
  eduItem: {
    marginBottom: 7,
  },
  eduDegree: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#232323",
  },
  eduSchool: {
    fontSize: 9.5,
    color: "#666",
    marginBottom: 1,
  },
  eduDate: {
    fontSize: 9,
    color: "#888",
    marginBottom: 1,
  },
  eduDiscription: {
    fontSize: 9,
    color: "#888",
    marginBottom: 1,
  },
  refItem: {
    fontSize: 10,
    marginBottom: 1,
  },
  linksCol: {
    marginBottom: 7,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    gap: 2,
  },
  linkText: {
    fontSize: 9,
    color: "#0A66C2",
    marginLeft: 2,
    textDecoration: "underline",
  },
  bulletList: {
    marginLeft: 12,
    fontSize: 10,
    color: "#444",
    marginTop: 2,
    marginBottom: 2,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bulletSymbol: {
    width: 10,
    fontWeight: "bold",
  },
  projBlock: {
    marginBottom: 8,
  },
  projTitle: {
    fontWeight: "bold",
    fontSize: 11,
    color: "#263238",
  },
  projMeta: {
    fontSize: 9,
    color: "#1976d2",
    marginBottom: 1,
  },
  projTech: {
    fontSize: 9,
    color: "#1976d2",
    marginBottom: 1,
    fontStyle: "italic",
  },
  projDesc: {
    fontSize: 9,
    color: "#444",
  },
});

const splitToBullets = (desc) => {
  if (Array.isArray(desc)) return desc;
  if (typeof desc === "string") {
    return desc
      .split(/[\.\n;]/)
      .map((b) => b && b.trim())
      .filter(Boolean);
  }
  return [];
};

const ClassicMinimalistPDFResume = ({
  data,
  imageUrl, // Provide the image URL here (optional)
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Top: Photo, Name, Headline, Contacts */}
      <View style={styles.topSection}>
        {imageUrl && <Image src={imageUrl} style={styles.profileImage} />}
        <Text style={styles.name}>{data.name || "YOUR NAME"}</Text>
        <Text style={styles.subline}>
          {data.jobRole && data.jobRole.toUpperCase()}
        </Text>
        <View style={styles.infoRow}>
          {data.address && (
            <View style={styles.infoItem}>
              <LocationIcon />
              <Text>{data.address}</Text>
            </View>
          )}
          {data.phone_no && (
            <View style={styles.infoItem}>
              <PhoneIcon />
              <Text>{data.phone_no}</Text>
            </View>
          )}
          {data.email && (
            <View style={styles.infoItem}>
              <MailIcon />
              <Text>{data.email}</Text>
            </View>
          )}
        </View>
        {/* Social Links Row */}
        <View style={styles.infoRow}>
          {data.linkedin && (
            <View style={styles.linkRow}>
              <LinkedInIcon />
              <Link src={data.linkedin} style={styles.linkText}>
                LinkedIn
              </Link>
            </View>
          )}
          {data.github && (
            <View style={styles.linkRow}>
              <GitHubIcon />
              <Link src={data.github} style={styles.linkText}>
                GitHub
              </Link>
            </View>
          )}
          {data.portfolio && (
            <View style={styles.linkRow}>
              <PortfolioIcon />
              <Link src={data.portfolio} style={styles.linkText}>
                Portfolio
              </Link>
            </View>
          )}
        </View>
      </View>

      {/* Main Two Columns */}
      <View style={styles.twoCol}>
        {/* Left Column */}
        <View style={styles.leftCol}>
          {/* Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.detailList}>
              {data.address && data.address + "\n"}
              {data.email && data.email + "\n"}
              {data.phone && data.phone}
            </Text>
          </View>
          {/* Skills */}
          {data.skills?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsList}>
                {data.skills.map((skill, i) => (
                  <Text key={i} style={styles.skill}>
                    {typeof skill === "string" ? skill : skill.name}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={styles.rightCol}>
          {/* Profile */}
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.profileText}>{data.summary}</Text>
            </View>
          )}

          {/* Employment History */}
          {data.experience?.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Employment History</Text>
              {data.experience.map((exp, i) => (
                <View key={i} style={styles.historyItem}>
                  <Text style={styles.historyOrg}>
                    {exp.position} {exp.companyName && `at ${exp.companyName}`}
                  </Text>
                  <Text style={styles.historyDate}>
                    {formatDate(exp.startDate)} —{" "}
                    {formatDate(exp.endDate) || "Present"}
                  </Text>
                  {exp.bullets?.length > 0 && (
                    <View style={styles.bulletList}>
                      {exp.bullets.map((bullet, j) =>
                        bullet ? (
                          <Text key={j} style={styles.bullet}>
                            • {bullet}
                          </Text>
                        ) : null
                      )}
                    </View>
                  )}
                  {!exp.bullets && exp.description && (
                    <Text style={styles.profileText}>{exp.description}</Text>
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
                <View key={i} style={styles.eduItem}>
                  <Text style={styles.eduDegree}>{edu.degree}</Text>
                  <Text style={styles.eduSchool}>{edu.institution}</Text>
                  <Text style={styles.eduDate}>
                    {formatDate(edu.startYear)} —{" "}
                    {formatDate(edu.endYear) || "Presnet"}
                  </Text>
                  <Text style={styles.eduDiscription}>{edu.description}</Text>
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
                    <Text style={styles.projTech}>
                      Tech: {proj.technologiesOrTopics}
                    </Text>
                  )}
                  {proj.description && (
                    <View style={styles.bulletList}>
                      {splitToBullets(proj.description).map((bullet, idx) => (
                        <View key={idx} style={styles.bulletItem}>
                          <Text style={styles.bulletSymbol}>•</Text>
                          <Text>{bullet}</Text>
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
    </Page>
  </Document>
);

export default ClassicMinimalistPDFResume;
