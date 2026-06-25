import React from "react";

/** Checkbox with brand Pacific fill when checked. Controlled or uncontrolled. */
export function Checkbox({ label, checked, defaultChecked, disabled = false, onChange, id, ...rest }) {
  const cbId = id || React.useId();
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(!!defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = (e) => {
    if (disabled) return;
    if (!isControlled) setInternal(e.target.checked);
    onChange && onChange(e);
  };

  return (
    <label
      htmlFor={cbId}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        color: "var(--text-primary)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <span style={{ position: "relative", display: "inline-flex", width: 18, height: 18 }}>
        <input
          id={cbId}
          type="checkbox"
          checked={on}
          disabled={disabled}
          onChange={toggle}
          style={{ position: "absolute", opacity: 0, width: 18, height: 18, margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: "var(--radius-sm)",
            border: `1px solid ${on ? "var(--pacific)" : "var(--border-strong)"}`,
            background: on ? "var(--pacific)" : "var(--bg-raised)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "var(--transition-colors)",
          }}
        >
          {on && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          )}
        </span>
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
