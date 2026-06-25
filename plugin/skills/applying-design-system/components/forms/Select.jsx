import React from "react";

/** Native select styled to match Vibedata inputs, with a chevron affordance. */
export function Select({ label, hint, id, disabled = false, children, style = {}, ...rest }) {
  const selectId = id || React.useId();
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)" }}>
      {label && (
        <label htmlFor={selectId} style={{ fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
        <select
          id={selectId}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            width: "100%",
            height: 40,
            padding: "0 36px 0 12px",
            fontSize: 14,
            fontFamily: "var(--font-sans)",
            color: "var(--text-primary)",
            background: "var(--bg-raised)",
            border: `1px solid ${focus ? "var(--pacific)" : "var(--border)"}`,
            borderRadius: "var(--radius-md)",
            outline: "none",
            boxShadow: focus ? "0 0 0 2px var(--focus-ring)" : "none",
            opacity: disabled ? 0.5 : 1,
            cursor: disabled ? "not-allowed" : "pointer",
            transition: "border-color var(--duration-micro) var(--ease-default), box-shadow var(--duration-micro) var(--ease-default)",
            ...style,
          }}
          {...rest}
        >
          {children}
        </select>
        <span style={{ position: "absolute", right: 12, color: "var(--text-muted)", pointerEvents: "none", display: "flex", fontSize: 14 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
        </span>
      </div>
      {hint && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{hint}</span>}
    </div>
  );
}
