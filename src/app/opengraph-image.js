import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#1E3A8A", // Dark blue background
          color: "white",
          fontFamily: "sans-serif",
          padding: "40px",
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: 48, fontWeight: "bold", marginBottom: 20 }}>
          NEXTCV
        </div>

        {/* Title */}
        <div style={{ fontSize: 72, fontWeight: "bold", textAlign: "center" }}>
          AI RESUME BUILDER
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 32, marginTop: 10, textAlign: "center" }}>
          Build professional resumes in minutes
        </div>

        {/* Resume Mockup */}
        <div
          style={{
            marginTop: 40,
            background: "white",
            width: 800,
            height: 400,
            borderRadius: 16,
            padding: 40,
            color: "#1E3A8A",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: "bold" }}>John Doe</div>
          <div style={{ fontSize: 20, marginBottom: 20 }}>
            Software Engineer
          </div>
          <div style={{ fontSize: 16 }}>
            • 5+ years experience in web development
            <br />
            • Skilled in React, Node.js, and Next.js
            <br />• Passionate about building modern web applications
          </div>
        </div>
      </div>
    ),
    size
  );
}
