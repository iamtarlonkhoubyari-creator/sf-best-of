type Props = { className?: string };

export default function BridgeIcon({ className }: Props) {
  // cartoon Golden Gate — two towers, suspension catenaries, fog at the base
  return (
    <svg
      viewBox="0 0 260 90"
      className={className}
      aria-label="Golden Gate Bridge"
      role="img"
    >
      {/* fog at the water line */}
      <ellipse cx="40" cy="80" rx="32" ry="4" fill="#E8F0FF" />
      <ellipse cx="130" cy="84" rx="46" ry="4" fill="#E8F0FF" />
      <ellipse cx="220" cy="80" rx="30" ry="4" fill="#E8F0FF" />

      {/* roadway */}
      <line
        x1="6"
        y1="64"
        x2="254"
        y2="64"
        stroke="#D9483B"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* left tower */}
      <rect x="60" y="14" width="9" height="52" fill="#D9483B" rx="1.5" />
      <polygon points="60,14 69,14 64.5,7" fill="#D9483B" />
      <rect x="60" y="28" width="9" height="2.5" fill="#FFF6E9" />
      <rect x="60" y="42" width="9" height="2.5" fill="#FFF6E9" />
      <line
        x1="60"
        y1="36"
        x2="69"
        y2="36"
        stroke="#FFF6E9"
        strokeWidth="1"
      />

      {/* right tower */}
      <rect x="191" y="14" width="9" height="52" fill="#D9483B" rx="1.5" />
      <polygon points="191,14 200,14 195.5,7" fill="#D9483B" />
      <rect x="191" y="28" width="9" height="2.5" fill="#FFF6E9" />
      <rect x="191" y="42" width="9" height="2.5" fill="#FFF6E9" />
      <line
        x1="191"
        y1="36"
        x2="200"
        y2="36"
        stroke="#FFF6E9"
        strokeWidth="1"
      />

      {/* main suspension cables — left anchor, span, right anchor */}
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

      {/* a few hanger lines for character */}
      {[80, 95, 110, 130, 150, 165, 180].map((x) => {
        // approximate y on the catenary at this x using the same quadratic
        const t = (x - 64) / (196 - 64);
        const y = (1 - t) * 14 + t * 14 + 4 * (1 - 4 * (t - 0.5) * (t - 0.5)) * 13;
        return (
          <line
            key={x}
            x1={x}
            y1={y}
            x2={x}
            y2={64}
            stroke="#D9483B"
            strokeWidth="0.8"
            opacity="0.7"
          />
        );
      })}

      {/* tiny seagull, because why not */}
      <path
        d="M 215 22 q 3 -3 6 0 q 3 -3 6 0"
        stroke="#2E2438"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
