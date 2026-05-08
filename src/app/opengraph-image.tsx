import { ImageResponse } from "next/og";

export const alt = "the best of SF — Tarlon's version";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(ellipse at 80% 0%, #FFE4D2 0%, #FFF6E9 55%)",
          fontFamily: "Georgia, serif",
          color: "#2E2438",
          position: "relative",
        }}
      >
        {/* Cartoon Golden Gate, top right */}
        <svg
          viewBox="0 0 260 90"
          width="380"
          height="132"
          style={{ position: "absolute", top: 70, right: 70, opacity: 0.95 }}
        >
          <ellipse cx="40" cy="80" rx="32" ry="4" fill="#E8F0FF" />
          <ellipse cx="130" cy="84" rx="46" ry="4" fill="#E8F0FF" />
          <ellipse cx="220" cy="80" rx="30" ry="4" fill="#E8F0FF" />
          <line
            x1="6"
            y1="64"
            x2="254"
            y2="64"
            stroke="#D9483B"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <rect x="60" y="14" width="9" height="52" fill="#D9483B" rx="1.5" />
          <polygon points="60,14 69,14 64.5,7" fill="#D9483B" />
          <rect x="60" y="28" width="9" height="2.5" fill="#FFF6E9" />
          <rect x="60" y="42" width="9" height="2.5" fill="#FFF6E9" />
          <rect x="191" y="14" width="9" height="52" fill="#D9483B" rx="1.5" />
          <polygon points="191,14 200,14 195.5,7" fill="#D9483B" />
          <rect x="191" y="28" width="9" height="2.5" fill="#FFF6E9" />
          <rect x="191" y="42" width="9" height="2.5" fill="#FFF6E9" />
          <path
            d="M 6 40 Q 32 60 64 14"
            stroke="#D9483B"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 64 14 Q 130 64 196 14"
            stroke="#D9483B"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 196 14 Q 226 60 254 40"
            stroke="#D9483B"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            fontSize: 124,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            marginTop: 60,
          }}
        >
          <span style={{ position: "relative" }}>
            best of SF
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -10,
                height: 12,
                background: "#708238",
                borderRadius: 999,
                opacity: 0.9,
              }}
            />
          </span>
        </div>

        <div
          style={{
            fontSize: 64,
            fontStyle: "italic",
            color: "#708238",
            marginTop: 24,
            fontWeight: 400,
          }}
        >
          (tarlon&rsquo;s version)
        </div>

        {/* Pin row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            marginTop: 48,
            fontSize: 24,
            opacity: 0.9,
            maxWidth: 1040,
          }}
        >
          <Pin emoji="🍸" label="bars" color="#E94B6A" />
          <Pin emoji="😩" label="crash out" color="#9B7EDC" />
          <Pin emoji="☕" label="cappuccinos" color="#B5713A" />
          <Pin emoji="😢" label="cry" color="#4A90E2" />
          <Pin emoji="🍽️" label="private dining" color="#5FA86F" />
          <Pin emoji="💔" label="breakups" color="#D26B8E" />
          <Pin emoji="🌱" label="touch grass" color="#88C057" />
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          a curated map of my favorite places in San Francisco
        </div>
      </div>
    ),
    { ...size },
  );
}

function Pin({
  emoji,
  label,
  color,
}: {
  emoji: string;
  label: string;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "10px 18px",
        background: color,
        color: "white",
        borderRadius: 999,
        fontWeight: 600,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}
