import React from "react";

/**
 * Text input with label, hint, and error states.
 * Focus = Pacific border + 2px ring. Error = red border + ring.
 */
export function Input({
  label,
  hint,
  error,
  id,
  type = "text",
  disabled = false,
  iconLeft = null,
  style = {},
  ...rest
}) {
  const inputId = id || React.useId();
  const [focus, setFocus] = React.useState(false);

  const borderColor = error
    ? "var(--error)"
    : focus
    ? "var(--pacific)"
    : "var(--border)";
  const ring = error
    ? "0 0 0 2px var(--error-soft)"
    : focus
    ? "0 0 0 2px var(--focus-ring)"
    : "none";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)" }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        {iconLeft && (
          <span style={{ position: "absolute", left: 12, color: "var(--text-muted)", fontSize: 16, display: "flex", pointerEvents: "none" }}>
            {iconLeft}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            width: "100%",
            height: 40,
            padding: iconLeft ? "0 12px 0 36px" : "0 12px",
            fontSize: 14,
            fontFamily: "var(--font-sans)",
            color: "var(--text-primary)",
            background: "var(--bg-raised)",
            border: `1px solid ${borderColor}`,
            borderRadius: "var(--radius-md)",
            outline: "none",
            boxShadow: ring,
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "text",
            transition: "border-color var(--duration-micro) var(--ease-default), box-shadow var(--duration-micro) var(--ease-default)",
            ...style,
          }}
          {...rest}
        />
      </div>
      {error ? (
        <span style={{ fontSize: 12, color: "var(--error)", fontWeight: 500 }}>{error}</span>
      ) : hint ? (
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{hint}</span>
      ) : null}
    </div>
  );
}
