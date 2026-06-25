import React from "react";

/**
 * Vibedata primary button. Steady, controlled — no spring or bounce.
 * Variants map to the brand's action hierarchy.
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  disabled = false,
  type = "button",
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { height: 32, fontSize: 13, padding: "0 12px", gap: 6 },
    md: { height: 40, fontSize: 14, padding: "0 16px", gap: 8 },
    lg: { height: 48, fontSize: 15, padding: "0 24px", gap: 8 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: { background: "var(--accent)", color: "var(--accent-contrast)", border: "1px solid transparent" },
    secondary: { background: "transparent", color: "var(--text-primary)", border: "1px solid var(--border-strong)" },
    ghost: { background: "transparent", color: "var(--pacific)", border: "1px solid transparent" },
    accent: { background: "var(--seafoam)", color: "var(--navy)", border: "1px solid transparent" },
    danger: { background: "var(--error)", color: "#ffffff", border: "1px solid transparent" },
  };
  const v = variants[variant] || variants.primary;

  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? hoverFor(variant) : {};

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 500,
        fontFamily: "var(--font-sans)",
        lineHeight: 1,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
        transition: "background-color var(--duration-standard) var(--ease-default), border-color var(--duration-standard) var(--ease-default), box-shadow var(--duration-standard) var(--ease-default), color var(--duration-standard) var(--ease-default)",
        ...v,
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}

function hoverFor(variant) {
  switch (variant) {
    case "primary":
      return { background: "var(--accent-hover)", boxShadow: "var(--glow-pacific)" };
    case "secondary":
      return { borderColor: "var(--pacific)", color: "var(--pacific)" };
    case "ghost":
      return { background: "var(--pacific-soft)" };
    case "accent":
      return { boxShadow: "var(--glow-seafoam)" };
    case "danger":
      return { background: "var(--error-alt)" };
    default:
      return {};
  }
}
