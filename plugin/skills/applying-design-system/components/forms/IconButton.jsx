import React from "react";

/**
 * Square icon-only button. Pass a Phosphor (or any) icon node as children.
 */
export function IconButton({
  children,
  variant = "secondary",
  size = "md",
  disabled = false,
  "aria-label": ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const dims = { sm: 32, md: 40, lg: 48 }[size] || 40;
  const variants = {
    primary: { background: "var(--accent)", color: "var(--accent-contrast)", border: "1px solid transparent" },
    secondary: { background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)" },
    ghost: { background: "transparent", color: "var(--text-secondary)", border: "1px solid transparent" },
  };
  const v = variants[variant] || variants.secondary;
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover
    ? (variant === "primary"
        ? { background: "var(--accent-hover)" }
        : { background: "var(--pacific-soft)", color: "var(--pacific)", borderColor: "var(--pacific)" })
    : {};

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: dims,
        height: dims,
        fontSize: size === "sm" ? 16 : 18,
        borderRadius: "var(--radius-md)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "var(--transition-colors)",
        ...v,
        ...hoverStyle,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
