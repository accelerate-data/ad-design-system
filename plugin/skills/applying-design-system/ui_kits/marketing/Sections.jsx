/* Vibedata marketing site — section components.
   Exposes components on window for index.html to assemble. */
const { Button, Badge, Card } = window.VibedataDesignSystem_1cd9ed;

const CDN = "../../assets/logos/";

function MktNav({ theme, onToggle }) {
  const logo = theme === "dark" ? CDN + "lockup-light.svg" : CDN + "lockup-dark.svg";
  const links = ["Product", "Solutions", "Docs", "Pricing", "Company"];
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64, padding: "0 32px", borderBottom: "1px solid var(--border)",
      background: "var(--bg-raised)", position: "sticky", top: 0, zIndex: 50,
      backdropFilter: "saturate(180%) blur(8px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <img src={logo} alt="Vibedata" style={{ height: 30 }} />
        <div style={{ display: "flex", gap: 22 }}>
          {links.map((l) => (
            <a key={l} href="#" style={{ fontSize: 14, fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onToggle} aria-label="Toggle theme" style={{
          width: 36, height: 36, borderRadius: "var(--radius-md)", border: "1px solid var(--border)",
          background: "transparent", color: "var(--text-secondary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
        }}>
          <i className={theme === "dark" ? "ph ph-sun" : "ph ph-moon"} />
        </button>
        <Button variant="ghost" size="md">Sign in</Button>
        <Button variant="primary" size="md">Get started</Button>
      </div>
    </nav>
  );
}

function MktHero() {
  return (
    <section style={{ padding: "72px 32px 56px", maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }}>
      <div>
        <span className="ad-eyebrow" style={{ color: "var(--pacific)", display: "inline-block", marginBottom: 18 }}>Agentic data engineering</span>
        <h1 style={{ fontSize: 44, lineHeight: 1.08, fontWeight: 600, letterSpacing: "-0.025em", color: "var(--text-primary)", margin: "0 0 18px", textWrap: "balance" }}>
          Your data engineering standards, <span style={{ color: "var(--pacific)" }}>encoded and enforced</span>
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--text-secondary)", maxWidth: 480, margin: "0 0 28px" }}>
          Vibedata is the agentic coordination layer for data platforms. Build, deploy, and operate governed pipelines with your team's accumulated knowledge — not generic defaults.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="primary" size="lg" iconRight={<i className="ph ph-arrow-right" />}>Start free</Button>
          <Button variant="secondary" size="lg">Book a demo</Button>
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: 28, fontSize: 13, color: "var(--text-muted)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><i className="ph ph-check-circle" style={{ color: "var(--seafoam)" }} /> dbt-native</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><i className="ph ph-check-circle" style={{ color: "var(--seafoam)" }} /> Microsoft Fabric</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><i className="ph ph-check-circle" style={{ color: "var(--seafoam)" }} /> Governed by default</span>
        </div>
      </div>
      <HeroConsole />
    </section>
  );
}

function HeroConsole() {
  return (
    <div style={{ background: "var(--smoke)", borderRadius: "var(--radius-xl)", border: "1px solid var(--border)", overflow: "hidden", boxShadow: "var(--shadow-overlay)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ marginLeft: 8, fontFamily: "var(--font-mono)", fontSize: 12, color: "#6b8899" }}>vibedata · build agent</span>
      </div>
      <div style={{ padding: "18px 20px", fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.85, color: "#90b4c8" }}>
        <div><span style={{ color: "#00dd92" }}>›</span> vibe build "daily revenue mart, gold tier"</div>
        <div style={{ color: "#6b8899" }}>  ✓ matched skill <span style={{ color: "#90e0ef" }}>modeling-revenue-recognition</span></div>
        <div style={{ color: "#6b8899" }}>  ✓ generated <span style={{ color: "#fff" }}>models/marts/fct_revenue_daily.sql</span></div>
        <div style={{ color: "#6b8899" }}>  ✓ added 6 tests · 2 snapshots (SCD2)</div>
        <div style={{ color: "#6b8899" }}>  ✓ governance:pii tags applied</div>
        <div style={{ marginTop: 8 }}><span style={{ color: "#00b4d8" }}>deploy</span> opening PR #482 → quality gates running…</div>
        <div style={{ color: "#00dd92" }}>  ● 42/42 gates green · ready to merge</div>
      </div>
    </div>
  );
}

function MktFeatures() {
  const items = [
    { icon: "ph-hammer", title: "Build", body: "Describe business intent. Agents validate domain fit and generate code that follows your team's conventions — naming, tests, medallion layers.", tag: "Intent → code" },
    { icon: "ph-rocket-launch", title: "Deploy", body: "Every PR runs context-informed quality gates: documentation, code quality, test coverage, and Elementary data-quality checks.", tag: "Governed PRs" },
    { icon: "ph-pulse", title: "Operate", body: "Resolved incidents are captured as new skills and tests, preventing recurrence. The library compounds with every pipeline.", tag: "Improvement flywheel" },
  ];
  return (
    <section style={{ padding: "56px 32px", maxWidth: 1120, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <span className="ad-eyebrow" style={{ color: "var(--text-muted)" }}>The coordination layer</span>
        <h2 style={{ fontSize: 30, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "10px 0 0" }}>One loop: build, deploy, operate</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {items.map((it) => (
          <Card key={it.title} interactive padding={26}>
            <div style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--pacific-soft)", color: "var(--pacific)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 16 }}>
              <i className={"ph " + it.icon} />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 8px" }}>{it.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--text-secondary)", margin: "0 0 16px" }}>{it.body}</p>
            <Badge variant="pacific">{it.tag}</Badge>
          </Card>
        ))}
      </div>
    </section>
  );
}

function MktMetrics() {
  const stats = [
    { v: "10×", l: "faster delivery vs. hand-rolled pipelines" },
    { v: "100%", l: "lineage & governance coverage" },
    { v: "3 min", l: "from intent to a reviewable PR" },
    { v: "0", l: "institutional knowledge lost to role switches" },
  ];
  return (
    <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {stats.map((s) => (
          <div key={s.l}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 34, fontWeight: 600, color: "var(--pacific)", letterSpacing: "-0.02em" }}>{s.v}</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 6, lineHeight: 1.5 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MktCode() {
  return (
    <section style={{ padding: "56px 32px", maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }}>
      <div>
        <span className="ad-eyebrow" style={{ color: "var(--text-muted)" }}>Developer experience</span>
        <h2 style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em", color: "var(--text-primary)", margin: "10px 0 14px" }}>Declarative, version-controlled data</h2>
        <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--text-secondary)", margin: "0 0 20px" }}>
          Every data product is defined in code — testable, reproducible, and reviewable from dev to production. Agents generate it to your standards; you keep the diff.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Badge variant="navy">Git-native</Badge>
          <Badge variant="seafoam">Tested by default</Badge>
          <Badge variant="info">Fabric Lakehouse</Badge>
        </div>
      </div>
      <div style={{ background: "#0d1117", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", padding: "20px 22px", fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.75, overflowX: "auto" }}>
        <div style={{ color: "#4d5f6a" }}>-- fct_revenue_daily.sql</div>
        <div><span style={{ color: "#00dd92" }}>&#123;&#123;</span> config(</div>
        <div>    materialized=<span style={{ color: "#caf0f8" }}>'incremental'</span>,</div>
        <div>    unique_key=<span style={{ color: "#caf0f8" }}>'order_date'</span>,</div>
        <div>    tags=[<span style={{ color: "#caf0f8" }}>'governance:pii'</span>, <span style={{ color: "#caf0f8" }}>'tier:gold'</span>]</div>
        <div>) <span style={{ color: "#00dd92" }}>&#125;&#125;</span></div>
        <div>&nbsp;</div>
        <div><span style={{ color: "#00dd92" }}>select</span></div>
        <div>    date_trunc(<span style={{ color: "#caf0f8" }}>'day'</span>, created_at) <span style={{ color: "#00dd92" }}>as</span> order_date,</div>
        <div>    count(*)                        <span style={{ color: "#00dd92" }}>as</span> orders,</div>
        <div>    sum(amount_usd)                 <span style={{ color: "#00dd92" }}>as</span> revenue_usd</div>
        <div><span style={{ color: "#00dd92" }}>from</span> <span style={{ color: "#00b4d8" }}>&#123;&#123; ref('stg_orders') &#125;&#125;</span></div>
        <div><span style={{ color: "#00dd92" }}>where</span> status = <span style={{ color: "#caf0f8" }}>'completed'</span></div>
        <div><span style={{ color: "#00dd92" }}>group by</span> 1</div>
      </div>
    </section>
  );
}

function MktCTA() {
  return (
    <section style={{ padding: "16px 32px 64px", maxWidth: 1120, margin: "0 auto" }}>
      <div style={{ background: "linear-gradient(135deg, var(--navy) 0%, #061a3a 100%)", borderRadius: "var(--radius-xl)", padding: "48px 44px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 600, color: "#fff", letterSpacing: "-0.02em", margin: "0 0 8px" }}>Ready to accelerate?</h2>
          <p style={{ fontSize: 15, color: "var(--arctic)", margin: 0, maxWidth: 440 }}>Join engineering teams shipping governed, high-quality data products at scale.</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Button variant="accent" size="lg">Start free trial</Button>
          <Button size="lg" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}>Talk to sales</Button>
        </div>
      </div>
    </section>
  );
}

function MktFooter({ theme }) {
  const logo = theme === "dark" ? CDN + "wordmark-light.svg" : CDN + "wordmark-dark.svg";
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "28px 32px", maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
      <img src={logo} alt="Accelerate Data" style={{ height: 22, opacity: 0.7 }} />
      <p style={{ fontSize: 12, color: "var(--text-muted)", margin: 0 }}>© 2026 Accelerate Data. All rights reserved.</p>
      <p style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", margin: 0 }}>vibedata · v2.4.1</p>
    </footer>
  );
}

Object.assign(window, { MktNav, MktHero, MktFeatures, MktMetrics, MktCode, MktCTA, MktFooter });
