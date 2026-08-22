import { ImageResponse } from "next/og";

// OG image dimensions (standard)
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FBF9F5 0%, #ecfdf5 60%, #d1fae5 100%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative green blob */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, #bbf7d0 0%, transparent 70%)",
            opacity: 0.6,
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#14532d",
            color: "#fff",
            borderRadius: 999,
            padding: "8px 20px",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 0.5,
            marginBottom: 32,
          }}
        >
          🌿 Wholesale Supplier · Salem, Tamil Nadu
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0 16px",
            fontSize: 72,
            fontWeight: 800,
            color: "#111827",
            lineHeight: 1.1,
            marginBottom: 28,
            maxWidth: 800,
          }}
        >
          <span>Fresh Quality.</span>{" "}
          <span style={{ color: "#14532d" }}>Wholesale Prices.</span>
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 26,
            color: "#4b5563",
            lineHeight: 1.55,
            maxWidth: 700,
            marginBottom: 48,
          }}
        >
          Premium Onion, Potato, Garlic, Eggs &amp; Fruits — bulk supply at the best prices.
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            position: "absolute",
            bottom: 56,
            left: 80,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#14532d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
            }}
          >
            🥬
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>
              BK AND CO
            </span>
            <span style={{ fontSize: 16, color: "#6b7280" }}>bkfarms.in</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
