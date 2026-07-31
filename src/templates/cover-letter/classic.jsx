import React from "react";
import { Document, Page, Text, View, StyleSheet, Svg, Path } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 42,
    paddingBottom: 42,
    paddingLeft: 48,
    paddingRight: 48,
    fontFamily: "Helvetica",
    color: "#111827",
    fontSize: 10,
    backgroundColor: "#F7F3EA",
  },

  header: {
    marginBottom: 26,
  },

  name: {
    fontSize: 27,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 0.5,
    color: "#111827",
    marginBottom: 6,
  },

  role: {
    fontSize: 11,
    color: "#6b7280",
    letterSpacing: 0.3,
  },

  address: {
    marginBottom: 20,
    lineHeight: 1.5,
  },

  company: {
    fontFamily: "Helvetica-Bold",
    color: "#111827",
  },

  greeting: {
    marginBottom: 12,
    fontSize: 10.5,
    fontFamily: "Helvetica-Bold",
  },

  paragraph: {
    fontSize: 10,
    lineHeight: 1.55,
    marginBottom: 11,
    textAlign: "justify",
  },

  signature: {
    marginTop: 18,
  },

  signatureName: {
    marginTop: 6,
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },

  topShape: {
    position: "absolute",
    top: 0,
    right: 48,
  },

  bottomShape: {
    position: "absolute",
    bottom: 0,
    right: 48,
  },
});

const toTitleCase = value =>
  String(value || "")
    .split(" ")
    .filter(Boolean)
    .map(word => {
      const key = word.toLowerCase();

      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

const getParagraphStyle = length => {
  if (length > 2200) {
    return {
      ...styles.paragraph,
      fontSize: 8,
      lineHeight: 1.3,
      marginBottom: 7,
    };
  }

  if (length > 1800) {
    return {
      ...styles.paragraph,
      fontSize: 9,
      lineHeight: 1.4,
      marginBottom: 8,
    };
  }

  return styles.paragraph;
};

const Classic = ({ data }) => {
  const name = toTitleCase(data?.name);
  const company = toTitleCase(data?.company);
  const jobRole = toTitleCase(data?.jobRole);

  const body = String(data?.body || "");

  const paragraphs = body
    .split(/\n+/)
    .map(p => p.trim())
    .filter(Boolean);

  const paragraphStyle = getParagraphStyle(body.length);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Top Decoration */}
        <View style={styles.topShape}>
          <Svg width="46" height="82" viewBox="0 0 46 82">
            <Path
              d="
              M0 0
              H46
              V82
              L23 61
              L0 82
              Z
              "
              fill="#0284c7"
            />
          </Svg>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>

          <Text style={styles.role}>{jobRole}</Text>
        </View>

        {/* Receiver */}
        <View style={styles.address}>
          <Text>Hiring Manager</Text>

          <Text style={styles.company}>{company}</Text>
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>Dear Hiring Manager,</Text>

        {/* Body */}
        {paragraphs.map((paragraph, index) => (
          <Text key={index} style={paragraphStyle}>
            {paragraph}
          </Text>
        ))}

        {/* Signature */}
        <View style={styles.signature}>
          <Text>Sincerely,</Text>

          <Text style={styles.signatureName}>{name}</Text>
        </View>

        {/* Bottom Decoration */}
        <View style={styles.bottomShape}>
          <Svg width="46" height="65" viewBox="0 0 46 65">
            <Path
              d="
              M23 0
              L46 15
              V65
              H0
              V15
              Z
              "
              fill="#0284c7"
            />
          </Svg>
        </View>
      </Page>
    </Document>
  );
};

export default Classic;
