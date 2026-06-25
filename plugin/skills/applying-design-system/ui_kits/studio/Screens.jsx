/* Vibedata Studio — screens. Exposes on window. */
const { Button, IconButton, Input, Badge, Tag, StatCard, Card, Tabs } = window.VibedataDesignSystem_1cd9ed;

function statusBadge(status) {
  const map = {
    passed: ["success", "ph-check-circle", "Passed"],
    running: ["info", "ph-circle-notch", "Running"],
    failed: ["error", "ph-x-circle", "Failed"],
    queued: ["neutral", "ph-clock", "Queued"],
  };
  const [v, icon, label] = map[status] || map.queued;
  return <Badge variant={v} icon={<i className={"ph " + icon} />}>{label}</Badge>;
}

/* ---------------- Overview ---------------- */
function OverviewScreen() {
  const runs = [
    { name: "fct_revenue_daily", who: "build-agent", time: "2m ago", dur: "48s", status: "passed" },
    { name: "dim_customers", who: "Dana Ortiz", time: "14m ago", dur: "1m 12s", status: "passed" },
    { name: "stg_salesforce_opps", who: "ingestion-agent", time: "31m ago", dur: "22s", status: "running" },
    { name: "fct_pipeline_health", who: "ci", time: "1h ago", dur: "—", status: "failed" },
    { name: "snap_orders_scd2", who: "build-agent", time: "2h ago", dur: "3m 04s", status: "passed" },
  ];
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        <StatCard label="Models" value="1,284" delta="12 new this week" deltaDirection="up" icon={<i className="ph ph-stack" />} />
        <StatCard label="Avg build time" value="48" unit="s" delta="9% faster" deltaDirection="up" icon={<i className="ph ph-lightning" />} />
        <StatCard label="Test coverage" value="94" unit="%" delta="2 pts" deltaDirection="up" icon={<i className="ph ph-flask" />} />
        <StatCard label="Open incidents" value={3} delta="2 more" deltaDirection="down" icon={<i className="ph ph-warning" />} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr", gap: 20 }}>
        <Card padding={0}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0, color: "var(--text-primary)" }}>Recent runs</h3>
            <Button variant="ghost" size="sm" iconRight={<i className="ph ph-arrow-right" />}>View all</Button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <tbody>
              {runs.map((r, i) => (
                <tr key={r.name} style={{ borderBottom: i < runs.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                  <td style={{ padding: "11px 20px", fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{r.name}</td>
                  <td style={{ padding: "11px 8px", color: "var(--text-muted)" }}>{r.who}</td>
                  <td style={{ padding: "11px 8px", color: "var(--text-muted)", fontVariantNumeric: "tabular-nums" }}>{r.dur}</td>
                  <td style={{ padding: "11px 8px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{r.time}</td>
                  <td style={{ padding: "11px 20px", textAlign: "right" }}>{statusBadge(r.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <Card>
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px", color: "var(--text-primary)" }}>Quality gates</h3>
          <p style={{ fontSize: 12.5, color: "var(--text-muted)", margin: "0 0 16px" }}>Last deploy · PR #482</p>
          {[
            ["Documentation", 100],
            ["Code quality", 96],
            ["Test coverage", 94],
            ["Data quality (Elementary)", 88],
          ].map(([label, pct]) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 6 }}>
                <span style={{ color: "var(--text-secondary)" }}>{label}</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "var(--bg-sunken)", overflow: "hidden" }}>
                <div style={{ width: pct + "%", height: "100%", background: pct >= 90 ? "var(--seafoam)" : "var(--warning)" }} />
              </div>
            </div>
          ))}
          <Badge variant="success" icon={<i className="ph ph-check-circle" />}>42 / 42 gates green</Badge>
        </Card>
      </div>
    </div>
  );
}

/* ---------------- Build (agent) ---------------- */
function BuildScreen() {
  const [submitted, setSubmitted] = React.useState(false);
  const [value, setValue] = React.useState("Daily revenue mart, gold tier, with SCD2 customer snapshots");
  return (
    <div style={{ padding: 24, maxWidth: 860, margin: "0 auto", width: "100%" }}>
      <Card padding={0}>
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ width: 30, height: 30, borderRadius: "var(--radius-md)", background: "var(--pacific-soft)", color: "var(--pacific)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}><i className="ph ph-sparkle" /></span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>Build agent</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Describe the data product. It builds to your team's standards.</div>
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}>
              <Input label="Business intent" value={value} onChange={(e) => setValue(e.target.value)} />
            </div>
            <Button variant="primary" size="lg" iconLeft={<i className="ph ph-sparkle" />} onClick={() => setSubmitted(true)}>Build</Button>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <Tag dotColor="var(--seafoam)">tier:gold</Tag>
            <Tag dotColor="var(--pacific)">incremental</Tag>
            <Tag>governance:pii</Tag>
            <Tag>fabric-lakehouse</Tag>
          </div>
        </div>
      </Card>

      {submitted && (
        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <PlanStep icon="ph-magic-wand" title="Matched skill" detail="modeling-revenue-recognition" tone="pacific" />
          <PlanStep icon="ph-file-sql" title="Generated model" detail="models/marts/fct_revenue_daily.sql" tone="navy" />
          <PlanStep icon="ph-camera" title="Added snapshot" detail="snap_customers — SCD Type 2" tone="navy" />
          <PlanStep icon="ph-flask" title="Generated tests" detail="6 tests · unique, not_null, relationships" tone="navy" />
          <PlanStep icon="ph-shield-check" title="Governance" detail="governance:pii tags applied · lineage resolved" tone="seafoam" />
          <Card>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Badge variant="success" icon={<i className="ph ph-check-circle" />}>Ready to review</Badge>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Draft PR #483 · 4 files changed</span>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <Button variant="secondary" size="md">View diff</Button>
                <Button variant="accent" size="md" iconLeft={<i className="ph ph-git-pull-request" />}>Open PR</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function PlanStep({ icon, title, detail, tone }) {
  const colors = { pacific: "var(--pacific)", seafoam: "#00a870", navy: "var(--text-secondary)" };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "var(--bg-raised)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
      <i className="ph ph-check-circle" style={{ color: "var(--seafoam)", fontSize: 18, flexShrink: 0 }} />
      <i className={"ph " + icon} style={{ color: colors[tone] || "var(--text-muted)", fontSize: 17, flexShrink: 0 }} />
      <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--text-primary)" }}>{title}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, color: "var(--text-muted)", marginLeft: "auto", textAlign: "right" }}>{detail}</span>
    </div>
  );
}

/* ---------------- Catalog ---------------- */
function CatalogScreen() {
  const [tab, setTab] = React.useState("all");
  const [q, setQ] = React.useState("");
  const models = [
    { name: "fct_revenue_daily", layer: "mart", tier: "gold", mat: "incremental", tests: 6, owner: "build-agent", pii: true },
    { name: "dim_customers", layer: "mart", tier: "gold", mat: "table", tests: 8, owner: "Dana Ortiz", pii: true },
    { name: "stg_orders", layer: "staging", tier: "silver", mat: "view", tests: 4, owner: "ci", pii: false },
    { name: "stg_salesforce_opps", layer: "staging", tier: "silver", mat: "view", tests: 5, owner: "ingestion-agent", pii: false },
    { name: "snap_customers", layer: "snapshot", tier: "gold", mat: "snapshot", tests: 3, owner: "build-agent", pii: true },
    { name: "int_order_items", layer: "intermediate", tier: "silver", mat: "ephemeral", tests: 2, owner: "Dana Ortiz", pii: false },
  ];
  const tierColor = { gold: "var(--warning)", silver: "var(--arctic)" };
  const filtered = models.filter((m) =>
    (tab === "all" || m.layer === tab) && m.name.includes(q.toLowerCase())
  );
  return (
    <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ width: 280 }}>
          <Input placeholder="Search models…" value={q} onChange={(e) => setQ(e.target.value)} iconLeft={<i className="ph ph-magnifying-glass" />} />
        </div>
        <Button variant="primary" iconLeft={<i className="ph ph-plus" />}>New model</Button>
      </div>
      <Tabs value={tab} onChange={setTab} tabs={[
        { value: "all", label: "All", badge: models.length },
        { value: "staging", label: "Staging" },
        { value: "intermediate", label: "Intermediate" },
        { value: "mart", label: "Marts" },
        { value: "snapshot", label: "Snapshots" },
      ]} />
      <Card padding={0}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)" }}>
              {["Model", "Tier", "Materialization", "Tests", "Owner", ""].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--text-muted)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.name} style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border-subtle)" : "none" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{m.name}</span>
                    {m.pii && <Tag dotColor="var(--error)">pii</Tag>}
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}><Tag dotColor={tierColor[m.tier]}>{m.tier}</Tag></td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: 12 }}>{m.mat}</td>
                <td style={{ padding: "12px 16px", color: "var(--text-secondary)", fontVariantNumeric: "tabular-nums" }}>{m.tests}</td>
                <td style={{ padding: "12px 16px", color: "var(--text-muted)" }}>{m.owner}</td>
                <td style={{ padding: "12px 16px", textAlign: "right" }}>
                  <IconButton variant="ghost" size="sm" aria-label="Open"><i className="ph ph-dots-three" /></IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

/* ---------------- Generic placeholder ---------------- */
function PlaceholderScreen({ title, icon }) {
  return (
    <div style={{ padding: 48, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "var(--text-muted)", minHeight: 360, gap: 12 }}>
      <span style={{ width: 56, height: 56, borderRadius: "var(--radius-lg)", background: "var(--bg-surface)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "var(--text-secondary)" }}><i className={"ph " + icon} /></span>
      <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text-secondary)" }}>{title}</div>
      <div style={{ fontSize: 13, maxWidth: 320 }}>This surface is part of the Vibedata Studio kit. Open Overview, Build, or Models for the worked-through screens.</div>
    </div>
  );
}

Object.assign(window, { OverviewScreen, BuildScreen, CatalogScreen, PlaceholderScreen });
