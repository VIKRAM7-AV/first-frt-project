import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

// Image dimensions (standard OpenGraph 1.91:1)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "BK AND CO — Salem Wholesale Vegetable & Farm Produce Supplier";
export const runtime = "nodejs";

export default async function OGImage() {
  // Load local Poppins font files and produce image
  let poppinsBold: ArrayBuffer | null = null;
  let poppinsSemiBold: ArrayBuffer | null = null;
  let poppinsMedium: ArrayBuffer | null = null;
  let poppinsRegular: ArrayBuffer | null = null;
  let vegBase64 = "";

  try {
    const cwd = process.cwd();
    const [boldBuf, semiBuf, medBuf, regBuf, vegBuf] = await Promise.all([
      fs.readFile(path.join(cwd, "public/fonts/Poppins-Bold.ttf")),
      fs.readFile(path.join(cwd, "public/fonts/Poppins-SemiBold.ttf")),
      fs.readFile(path.join(cwd, "public/fonts/Poppins-Medium.ttf")),
      fs.readFile(path.join(cwd, "public/fonts/Poppins-Regular.ttf")),
      fs.readFile(path.join(cwd, "public/vegetables.png")),
    ]);

    poppinsBold = boldBuf.buffer.slice(
      boldBuf.byteOffset,
      boldBuf.byteOffset + boldBuf.byteLength
    );
    poppinsSemiBold = semiBuf.buffer.slice(
      semiBuf.byteOffset,
      semiBuf.byteOffset + semiBuf.byteLength
    );
    poppinsMedium = medBuf.buffer.slice(
      medBuf.byteOffset,
      medBuf.byteOffset + medBuf.byteLength
    );
    poppinsRegular = regBuf.buffer.slice(
      regBuf.byteOffset,
      regBuf.byteOffset + regBuf.byteLength
    );
    vegBase64 = `data:image/png;base64,${vegBuf.toString("base64")}`;
  } catch (error) {
    console.error("Failed to load local assets for OG image:", error);
  }

  const fontsConfig = [];
  if (poppinsBold) {
    fontsConfig.push({
      name: "Poppins",
      data: poppinsBold,
      style: "normal" as const,
      weight: 700 as const,
    });
  }
  if (poppinsSemiBold) {
    fontsConfig.push({
      name: "Poppins",
      data: poppinsSemiBold,
      style: "normal" as const,
      weight: 600 as const,
    });
  }
  if (poppinsMedium) {
    fontsConfig.push({
      name: "Poppins",
      data: poppinsMedium,
      style: "normal" as const,
      weight: 500 as const,
    });
  }
  if (poppinsRegular) {
    fontsConfig.push({
      name: "Poppins",
      data: poppinsRegular,
      style: "normal" as const,
      weight: 400 as const,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FBF9F5",
          position: "relative",
          padding: "24px",
          fontFamily: fontsConfig.length > 0 ? "Poppins, sans-serif" : "sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Subtle Ambient Radial Glow Spheres */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 680,
            height: 680,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(187, 247, 208, 0.65) 0%, rgba(240, 253, 244, 0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 580,
            height: 580,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(209, 250, 229, 0.55) 0%, rgba(251, 249, 245, 0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "22%",
            width: 480,
            height: 480,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(254, 243, 199, 0.45) 0%, rgba(251, 249, 245, 0) 70%)",
            display: "flex",
          }}
        />

        {/* Outer Framed Card Container */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: 24,
            border: "1.5px solid rgba(20, 83, 45, 0.16)",
            backgroundColor: "rgba(255, 255, 255, 0.82)",
            padding: "32px 42px 28px 42px",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          {/* 1. Header Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {/* Brand Logo Lockup */}
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              {/* Green Icon Box with Natural Leaf Icon */}
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  backgroundColor: "#14532d",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4ade80"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </svg>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontSize: 25,
                    fontWeight: 700,
                    color: "#0f172a",
                    letterSpacing: "-0.5px",
                    lineHeight: 1.1,
                  }}
                >
                  BK AND CO
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#15803d",
                    letterSpacing: "1.6px",
                    textTransform: "uppercase",
                    marginTop: 2,
                  }}
                >
                  Wholesale Produce · Salem
                </span>
              </div>
            </div>

            {/* Badges / Header Right */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Location Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#f8fafc",
                  padding: "7px 15px",
                  borderRadius: 999,
                  border: "1px solid #e2e8f0",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#334155",
                  }}
                >
                  Salem, Tamil Nadu
                </span>
              </div>

              {/* Live Mandi Rates Pill */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#ecfdf5",
                  padding: "7px 16px",
                  borderRadius: 999,
                  border: "1px solid #a7f3d0",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#16a34a",
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#065f46",
                  }}
                >
                  Daily Mandi Rates Live
                </span>
              </div>
            </div>
          </div>

          {/* 2. Middle Content Section (Two Column Hero) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 10,
              marginBottom: 10,
            }}
          >
            {/* Left Column: Headline, Subtitle, Feature Chips */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "580px",
              }}
            >
              {/* Category Pill with natural auto-width */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: "#14532d",
                  color: "#ffffff",
                  padding: "6px 16px",
                  borderRadius: 999,
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.4px",
                  marginBottom: 16,
                  alignSelf: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#4ade80",
                  }}
                />
                <span>B2B Agriculture Produce &amp; Wholesale Mandi</span>
              </div>

              {/* Massive Main Headline */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: 52,
                  fontWeight: 700,
                  lineHeight: 1.08,
                  letterSpacing: "-1.5px",
                  marginBottom: 16,
                }}
              >
                <span style={{ color: "#0f172a" }}>Fresh Quality.</span>
                <span style={{ color: "#15803d" }}>Wholesale Prices.</span>
              </div>

              {/* Subtitle */}
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 400,
                  color: "#475569",
                  lineHeight: 1.45,
                  margin: 0,
                  marginBottom: 22,
                }}
              >
                Salem&apos;s trusted B2B wholesale supplier of farm-fresh Onion,
                Potato, Garlic, Eggs &amp; Seasonal Fruits across Tamil Nadu.
              </p>

              {/* Feature Chips (2x2 Matrix) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Row 1 */}
                <div style={{ display: "flex", gap: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(240, 253, 244, 0.95)",
                      border: "1px solid #bbf7d0",
                      padding: "7px 14px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#166534",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <span>Direct Farm Bulk Sourcing</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(240, 253, 244, 0.95)",
                      border: "1px solid #bbf7d0",
                      padding: "7px 14px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#166534",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span>Lowest Daily Mandi Rates</span>
                  </div>
                </div>

                {/* Row 2 */}
                <div style={{ display: "flex", gap: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(240, 253, 244, 0.95)",
                      border: "1px solid #bbf7d0",
                      padding: "7px 14px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#166534",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="1" y="3" width="15" height="13" rx="2" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                    <span>On-Time Bulk Dispatch</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(240, 253, 244, 0.95)",
                      border: "1px solid #bbf7d0",
                      padding: "7px 14px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#166534",
                    }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>100% Quality &amp; Weight Assured</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Card */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "440px",
                height: "360px",
                position: "relative",
                backgroundColor: "rgba(255, 255, 255, 0.88)",
                borderRadius: 20,
                border: "1.5px solid rgba(20, 83, 45, 0.12)",
                padding: "16px 20px 20px 20px",
                boxSizing: "border-box",
              }}
            >
              {/* Top Floating Badge */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  backgroundColor: "#ffffff",
                  padding: "5px 12px",
                  borderRadius: 999,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#14532d",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="#f59e0b"
                  stroke="#f59e0b"
                  strokeWidth="1"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span>Farm-Fresh Grading</span>
              </div>

              {/* Main Vegetable Produce Image */}
              {vegBase64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={vegBase64}
                  alt="Fresh wholesale vegetables and produce"
                  width={360}
                  height={255}
                  style={{
                    objectFit: "contain",
                  }}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 360,
                    height: 255,
                    fontSize: 80,
                  }}
                >
                  🥬
                </div>
              )}

              {/* Product Categories Pill at bottom */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  backgroundColor: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  padding: "6px 14px",
                  borderRadius: 12,
                  marginTop: -8,
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: "#334155",
                }}
              >
                <span>Onion</span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span>Potato</span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span>Garlic</span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span>Eggs</span>
                <span style={{ color: "#cbd5e1" }}>•</span>
                <span>Fruits</span>
              </div>
            </div>
          </div>

          {/* 3. Footer Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingTop: 16,
              borderTop: "1px solid rgba(226, 232, 240, 0.8)",
            }}
          >
            {/* Website Link */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  backgroundColor: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#166534"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#1e293b",
                }}
              >
                bkfarms.in
              </span>
              <span style={{ fontSize: 13, color: "#94a3b8" }}>·</span>
              <span
                style={{
                  fontSize: 13.5,
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                Tamil Nadu Mandi Rates &amp; Produce
              </span>
            </div>

            {/* Direct WhatsApp / Phone CTA Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "#14532d",
                color: "#ffffff",
                padding: "8px 20px",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Bulk Enquiries: +91 84899 34449</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: fontsConfig.length > 0 ? fontsConfig : undefined,
    }
  );
}
