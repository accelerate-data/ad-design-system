import React from "react";

/** Inline alert / callout. Left accent border + soft tint by status. */
export function Alert({ title, children, variant = "info", icon = null, onDismiss, style = {} }) {
  const variants = {
    info: { color: "var(--info-alt)", bg: "var(--pacific-soft)", border: "var(--pacific)" },
    success: { color: "var(--success-alt)", bg: "var(--seafoam-soft)", border: "var(--seafoam)" },
    warning: { color: "var(--warning-alt)", bg: "var(--warning-soft)", border: "var(--warning)" },
    error: { color: "var(--error-alt)", bg: "var(--error-soft)", border: "var(--error)" },
  };
  const v = variants[variant] || variants.info;
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 14px",
        background: v.bg,
        borderRadius: "var(--radius-md)",
        borderLeft: `3px solid ${v.border}`,
        fontFamily: "var(--font-sans)",
        ...style,
      }}
    >
      {icon && <span style={{ color: v.color, fontSize: 18, display: "flex", flexShrink: 0, marginTop: 1 }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: children ? 2 : 0 }}>{title}</div>}
        {children && <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--text-secondary)" }}>{children}</div>}
      </div>
      {onDismiss && (
        <button
          aria-label="Dismiss"
          onClick={onDismiss}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: 16, display: "flex", flexShrink: 0, padding: 0, lineHeight: 1 }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </div>
  );
}
