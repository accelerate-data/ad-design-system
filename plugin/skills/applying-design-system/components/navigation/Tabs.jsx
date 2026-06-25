import React from "react";

/**
 * Underline tab bar. Controlled (value/onChange) or uncontrolled (defaultValue).
 * Active tab: Pacific text + 2px Pacific underline.
 * tabs: [{ value, label, icon?, badge? }]
 */
export function Tabs({ tabs = [], value, defaultValue, onChange, style = {} }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? tabs[0]?.value);
  const active = isControlled ? value : internal;

  const select = (v) => {
    if (!isControlled) setInternal(v);
    onChange && onChange(v);
  };

  return (
    <div
      role="tablist"
      style={{
        display: "flex",
        gap: 4,
        borderBottom: "1px solid var(--border)",
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {tabs.map((t) => {
        const on = t.value === active;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={on}
            onClick={() => select(t.value)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              padding: "10px 12px",
              marginBottom: -1,
              background: "none",
              border: "none",
              borderBottom: `2px solid ${on ? "var(--pacific)" : "transparent"}`,
              color: on ? "var(--pacific)" : "var(--text-secondary)",
              fontSize: 14,
              fontWeight: on ? 600 : 500,
              fontFamily: "var(--font-sans)",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "color var(--duration-micro) var(--ease-default), border-color var(--duration-micro) var(--ease-default)",
            }}
          >
            {t.icon}
            {t.label}
            {t.badge != null && (
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, padding: "1px 6px", borderRadius: "var(--radius-full)", background: on ? "var(--pacific-soft)" : "var(--bg-surface)", color: on ? "var(--pacific)" : "var(--text-muted)" }}>
                {t.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
