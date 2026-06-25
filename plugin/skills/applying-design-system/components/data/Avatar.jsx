import React from "react";

const PALETTE = [
  { bg: "var(--pacific-soft)", fg: "var(--ocean)" },
  { bg: "var(--seafoam-soft)", fg: "#00a870" },
  { bg: "var(--navy-soft)", fg: "var(--navy)" },
];

function initials(name = "") {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || "") + (parts[1]?.[0] || "")).toUpperCase() || "?";
}

/** Avatar with image or initials fallback. */
export function Avatar({ name = "", src, size = 36, style = {} }) {
  const [failed, setFailed] = React.useState(false);
  const pal = PALETTE[(name.charCodeAt(0) || 0) % PALETTE.length];
  const showImg = src && !failed;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: "var(--radius-full)",
        background: showImg ? "transparent" : pal.bg,
        color: pal.fg,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        fontSize: Math.round(size * 0.4),
        overflow: "hidden",
        flexShrink: 0,
        userSelect: "none",
        ...style,
      }}
    >
      {showImg ? (
        <img src={src} alt={name} onError={() => setFailed(true)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        initials(name)
      )}
    </span>
  );
}
