/* Vibedata Studio — app shell (sidebar + topbar). Exposes on window. */
const { Avatar, Badge } = window.VibedataDesignSystem_1cd9ed;
const STUDIO_CDN = "../../assets/logos/";

function StudioSidebar({ active, onNavigate }) {
  const groups = [
    { label: "Workspace", items: [
      { id: "overview", icon: "ph-squares-four", label: "Overview" },
      { id: "build", icon: "ph-sparkle", label: "Build", badge: "AI" },
      { id: "catalog", icon: "ph-stack", label: "Models" },
    ]},
    { label: "Delivery", items: [
      { id: "runs", icon: "ph-play-circle", label: "Runs" },
      { id: "tests", icon: "ph-flask", label: "Tests & quality" },
      { id: "lineage", icon: "ph-graph", label: "Lineage" },
    ]},
    { label: "Knowledge", items: [
      { id: "skills", icon: "ph-book-bookmark", label: "Skills" },
      { id: "settings", icon: "ph-gear-six", label: "Settings" },
    ]},
  ];
  return (
    <aside style={{ width: 244, flexShrink: 0, background: "var(--bg-base)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 18px", borderBottom: "1px solid var(--border)" }}>
        <img src={STUDIO_CDN + "mark-light.svg"} alt="" style={{ height: 26 }} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Vibedata</span>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>Studio</span>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px" }}>
        {groups.map((g) => (
          <div key={g.label} style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-muted)", padding: "0 10px 6px" }}>{g.label}</div>
            {g.items.map((it) => {
              const on = it.id === active;
              return (
                <button key={it.id} onClick={() => onNavigate(it.id)} style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", marginBottom: 1,
                  borderRadius: "var(--radius-md)", border: "none", cursor: "pointer", textAlign: "left",
                  backgroundColor: on ? "var(--pacific-soft)" : "transparent",
                  color: on ? "var(--pacific)" : "var(--text-secondary)",
                  fontFamily: "var(--font-sans)", fontSize: 13.5, fontWeight: on ? 600 : 500,
                  transition: "color var(--duration-micro) var(--ease-default)",
                }}>
                  <i className={"ph " + it.icon} style={{ fontSize: 17 }} />
                  <span style={{ flex: 1 }}>{it.label}</span>
                  {it.badge && <Badge variant="seafoam">{it.badge}</Badge>}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
        <Avatar name="Dana Ortiz" size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Dana Ortiz</div>
          <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Platform team</div>
        </div>
        <i className="ph ph-caret-up-down" style={{ color: "var(--text-muted)", fontSize: 15 }} />
      </div>
    </aside>
  );
}

function StudioTopBar({ title, subtitle, children }) {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "14px 24px", borderBottom: "1px solid var(--border)", background: "var(--bg-base)" }}>
      <div>
        <h1 style={{ fontSize: 18, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: "2px 0 0" }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{children}</div>
    </header>
  );
}

Object.assign(window, { StudioSidebar, StudioTopBar });
