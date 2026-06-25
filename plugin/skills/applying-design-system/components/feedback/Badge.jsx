import React from "react";

/** Small status pill. Soft tinted background + saturated text. */
export function Badge({ children, variant = "neutral", icon = null, style = {} }) {
  const variants = {
    pacific: { background: "var(--pacific-soft)", color: "var(--pacific)" },
    seafoam: { background: "var(--seafoam-soft)", color: "#00a870" },
    navy: { background: "var(--navy-soft)", color: "var(--navy)" },
    success: { background: "var(--seafoam-soft)", color: "var(--success-alt)" },
    warning: { background: "var(--warning-soft)", color: "var(--warning-alt)" },
    error: { background: "var(--error-soft)", color: "var(--error-alt)" },
    info: { background: "var(--pacific-soft)", color: "var(--info-alt)" },
    neutral: { background: "var(--bg-surface)", color: "var(--text-secondary)" },
  };
  const v = variants[variant] || variants.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 9px",
        borderRadius: "var(--radius-sm)",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        ...v,
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
}
