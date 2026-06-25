import React from "react";

/** Toggle switch. Pacific track when on. Steady 150ms slide, no bounce. */
export function Switch({ label, checked, defaultChecked, disabled = false, onChange, id, ...rest }) {
  const swId = id || React.useId();
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
      htmlFor={swId}
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
      <span style={{ position: "relative", display: "inline-flex", width: 36, height: 20 }}>
        <input
          id={swId}
          type="checkbox"
          checked={on}
          disabled={disabled}
          onChange={toggle}
          style={{ position: "absolute", opacity: 0, width: 36, height: 20, margin: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          style={{
            width: 36,
            height: 20,
            borderRadius: "var(--radius-full)",
            background: on ? "var(--pacific)" : "var(--border-strong)",
            transition: "background-color var(--duration-micro) var(--ease-default)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: "var(--radius-full)",
            background: "#ffffff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            transition: "left var(--duration-micro) var(--ease-default)",
          }}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}
