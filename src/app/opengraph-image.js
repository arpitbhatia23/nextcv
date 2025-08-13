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
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontFamily: '"Inter", "Helvetica Neue", sans-serif',
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 0%, transparent 50%)
            `,
            display: "flex",
          }}
        />

        {/* Main Content Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            textAlign: "center",
            padding: "60px",
          }}
        >
          {/* Logo with Icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "24px",
            }}
          >
            {/* CV Icon */}
            <div
              style={{
                width: "64px",
                height: "64px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "40px",
                  background: "white",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "4px",
                  gap: "2px",
                }}
              >
                <div
                  style={{
                    height: "4px",
                    background: "#667eea",
                    borderRadius: "2px",
                    width: "80%",
                  }}
                />
                <div
                  style={{
                    height: "2px",
                    background: "#667eea",
                    borderRadius: "1px",
                    width: "60%",
                  }}
                />
                <div
                  style={{
                    height: "2px",
                    background: "#667eea",
                    borderRadius: "1px",
                    width: "90%",
                  }}
                />
                <div
                  style={{
                    height: "2px",
                    background: "#667eea",
                    borderRadius: "1px",
                    width: "70%",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                fontSize: "56px",
                fontWeight: "800",
                letterSpacing: "-2px",
                display: "flex",
              }}
            >
              NEXTCV
            </div>
          </div>

          {/* Main Title */}
          <div
            style={{
              fontSize: "84px",
              fontWeight: "900",
              textAlign: "center",
              lineHeight: "1.1",
              marginBottom: "16px",
              background: "linear-gradient(45deg, #ffffff, #f0f8ff)",
              backgroundClip: "text",
              color: "transparent",
              display: "flex",
            }}
          >
            AI RESUME BUILDER
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "32px",
              fontWeight: "400",
              textAlign: "center",
              opacity: 0.9,
              marginBottom: "48px",
              display: "flex",
            }}
          >
            Build professional resumes in minutes with AI
          </div>

          {/* Feature Pills */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: "48px",
            }}
          >
            {["AI-Powered", "ATS-Friendly", "Multiple Templates"].map(
              (feature, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "32px",
                    padding: "12px 24px",
                    fontSize: "18px",
                    fontWeight: "500",
                    display: "flex",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {feature}
                </div>
              )
            )}
          </div>

          {/* Resume Preview Card */}
          <div
            style={{
              background: "white",
              width: "640px",
              height: "240px",
              borderRadius: "20px",
              padding: "32px",
              color: "#1f2937",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow:
                "0 20px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.1)",
              transform: "perspective(1000px) rotateX(5deg)",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "4px",
                  display: "flex",
                }}
              >
                Sarah Johnson
              </div>
              <div
                style={{
                  fontSize: "20px",
                  color: "#6b7280",
                  marginBottom: "20px",
                  display: "flex",
                }}
              >
                Senior Software Engineer
              </div>
            </div>

            {/* Content */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                fontSize: "16px",
                color: "#4b5563",
                lineHeight: "1.4",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#667eea",
                    borderRadius: "50%",
                  }}
                />
                <span>8+ years building scalable web applications</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#667eea",
                    borderRadius: "50%",
                  }}
                />
                <span>Expert in React, TypeScript, Node.js, and AWS</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#667eea",
                    borderRadius: "50%",
                  }}
                />
                <span>Led teams of 5+ developers on enterprise projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />
      </div>
    ),
    size
  );
}
