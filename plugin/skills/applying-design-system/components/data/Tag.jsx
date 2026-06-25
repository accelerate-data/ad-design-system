import React from "react";

/** Outlined chip for metadata/keywords, optionally removable or with a leading dot. */
export function Tag({ children, dotColor, onRemove, style = {} }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "3px 8px 3px 10px",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        background: "var(--bg-raised)",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {dotColor && <span style={{ width: 7, height: 7, borderRadius: "var(--radius-full)", background: dotColor, flexShrink: 0 }} />}
      {children}
      {onRemove && (
        <button
          aria-label="Remove"
          onClick={onRemove}
          style={{ display: "flex", background: "none", border: "none", padding: 0, marginLeft: 1, cursor: "pointer", color: "var(--text-muted)", lineHeight: 1 }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </span>
  );
}
