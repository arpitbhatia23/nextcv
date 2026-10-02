import { calculateATSScore } from "../CalculateAtsScore";

const resumeText = [
  "Professional Summary: Software engineer with experience building applications.",
  "Education: Bachelor of Computer Science.",
  "Technical Skills: JavaScript, React, TypeScript, AWS.",
  "Projects: Built and deployed web applications using React and AWS.",
  "Work Experience: Developed and maintained software with cross-functional teams.",
  "Contact: engineer@example.com, +91 9876543210, LinkedIn.",
].join(" ");

describe("calculateATSScore JD keyword scoring", () => {
  it("reduces the ATS score when recognized JD keywords are missing", () => {
    const genericScore = calculateATSScore(resumeText).score;
    const jdScore = calculateATSScore(resumeText, "Required skill: Kubernetes.");

    expect(jdScore.keywordGap.missingKeywords).toBeGreaterThan(0);
    expect(jdScore.score).toBeLessThan(genericScore);
  });

  it("does not apply a JD penalty when no JD keywords are recognized", () => {
    const genericScore = calculateATSScore(resumeText).score;
    const jdScore = calculateATSScore(resumeText, "A motivated and collaborative team player.");

    expect(jdScore.keywordGap.totalKeywords).toBe(0);
    expect(jdScore.score).toBe(genericScore);
  });
});
