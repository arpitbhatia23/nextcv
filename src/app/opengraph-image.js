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
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Background decorative circles */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "60px",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            zIndex: 2,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "60px",
                background: "rgba(255,255,255,0.2)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid rgba(255,255,255,0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "white",
                  display: "flex",
                }}
              >
                CV
              </div>
            </div>
            <div
              style={{
                fontSize: "48px",
                fontWeight: "bold",
                letterSpacing: "-1px",
                display: "flex",
              }}
            >
              NEXTCV
            </div>
          </div>

          {/* Main title */}
          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              textAlign: "center",
              lineHeight: "1.1",
              marginBottom: "20px",
              display: "flex",
            }}
          >
            AI RESUME BUILDER
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              textAlign: "center",
              opacity: 0.9,
              marginBottom: "50px",
              display: "flex",
            }}
          >
            Build professional resumes in minutes with AI
          </div>

          {/* Feature badges */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "25px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "500",
                display: "flex",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              ✨ AI-Powered
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "25px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "500",
                display: "flex",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              📄 ATS-Friendly
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                borderRadius: "25px",
                padding: "12px 24px",
                fontSize: "16px",
                fontWeight: "500",
                display: "flex",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              🎨 Templates
            </div>
          </div>

          {/* Resume preview */}
          <div
            style={{
              background: "white",
              width: "600px",
              height: "200px",
              borderRadius: "16px",
              padding: "30px",
              color: "#1f2937",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "8px",
                display: "flex",
              }}
            >
              Sarah Johnson
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "#6b7280",
                marginBottom: "20px",
                display: "flex",
              }}
            >
              Senior Software Engineer
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#4b5563",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ display: "flex" }}>
                • 8+ years building scalable web applications
              </div>
              <div style={{ display: "flex" }}>
                • Expert in React, TypeScript, Node.js, and AWS
              </div>
              <div style={{ display: "flex" }}>
                • Led teams of 5+ developers on enterprise projects
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
