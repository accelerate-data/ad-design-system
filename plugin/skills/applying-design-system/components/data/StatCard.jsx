import React from "react";

/** Metric tile — mono value with optional trend delta. For dashboards. */
export function StatCard({ label, value, unit, delta, deltaDirection = "up", icon = null, style = {} }) {
  const positive = deltaDirection === "up";
  const deltaColor = positive ? "var(--success-alt)" : "var(--error-alt)";
  return (
    <div
      style={{
        background: "var(--bg-raised)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
        fontFamily: "var(--font-sans)",
        boxShadow: "var(--shadow-raised)",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-muted)", letterSpacing: "0.01em" }}>{label}</span>
        {icon && (
          <span style={{ width: 28, height: 28, borderRadius: "var(--radius-md)", background: "var(--pacific-soft)", color: "var(--pacific)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
            {icon}
          </span>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 28, fontWeight: 600, color: "var(--text-primary)", fontVariantNumeric: "tabular-nums", letterSpacing: "-0.01em" }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500, color: deltaColor, fontVariantNumeric: "tabular-nums" }}>
          <span>{positive ? "▲" : "▼"}</span>
          <span>{delta}</span>
        </div>
      )}
    </div>
  );
}
