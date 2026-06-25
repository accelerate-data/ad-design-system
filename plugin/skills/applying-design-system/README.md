# Vibedata Design System

The design system for **Vibedata** by **Accelerate Data** — the agentic coordination layer for data platforms. This project encodes the brand's visual language (color, type, spacing, motion, logos), a set of reusable React components, and high-fidelity recreations of the marketing site and the Studio product so design agents can produce on-brand interfaces, decks, and assets.

> **Brand personality:** the calm mastery and grounded authority of a senior data engineer. Precise, rational, deeply systems-minded. Governance over hype. Quiet confidence, subtly futuristic. The calm expert you turn to when data must be done right.

---

## Company & product context

- **Accelerate Data** is the company; **Vibedata** (one word) is the product — "the agentic coordination layer for data platforms."
- Positioning: *"Organizational data engineering standards, encoded and enforced."* Data teams lose weeks to **coordination tax** — intent lost between role switches, fix patterns never captured. Vibedata encodes org standards as **skills** so agents build, deploy, and operate pipelines with a team's accumulated knowledge.
- The product loop is **Build → Deploy → Operate**, an improvement flywheel where resolved incidents become new skills and tests.
- Technically it is **dbt-native on Microsoft Fabric** (Lakehouse, OneLake), with adapters, ingestion (dlt), semantic models (TMDL/DAX), and governance/quality (Elementary) as first-class concerns.

### Sources used to build this system
Stored for reference (you may not have access):
- **GitHub — brand & design system:** `accelerate-data/ad-design-system` — brand book PDF, logo asset tree + manifests (`logo/ASSETS_FOR_AI.md`), the `applying-design-system` skill (color/type/spacing/component spec), `gamma-theme.md`, and a reference marketing page (`sample/index.html`). Explore this repo for deeper brand fidelity.
- **GitHub — product context & copy:** `accelerate-data/vibedata-official` — the skill/plugin marketplace README with product positioning, the Build/Deploy/Operate model, and plugin catalog (`ad-migration`, `fabric-cli`, `vibedata-dbt-skills`, etc).
- **Fonts:** Geist & Geist Mono (woff2) from `vercel/geist-font` (OFL).
- **Logo CDN (canonical at runtime):** `http://assets.acceleratedata.ai/logo/` — always look up exact paths from the manifest; never pattern-interpolate.

---

## Content fundamentals

How Vibedata writes. Match this voice in every surface.

- **Tone:** calm, authoritative, systems-minded. Confident without hype. Reads like a senior engineer who has seen the failure modes and removed them.
- **Person:** address the reader as **you** ("Your data engineering standards, encoded and enforced"). The product/company is **we/Vibedata**. Agents are named by role in lowercase mono — `build-agent`, `ingestion-agent`, `ci`.
- **Casing:** sentence case for headings and buttons ("Get started", "Book a demo", "New model") — *not* Title Case. UPPERCASE only for tiny eyebrow labels and table headers, always with positive letter-spacing.
- **Sentence style:** short, declarative, precise. Lead with the outcome. Strip ambiguity. Favor concrete nouns (pipelines, lineage, quality gates, PRs) over abstractions.
- **Numbers & technical values:** always in **Geist Mono** with `tabular-nums` — counts, durations (`48s`), versions (`v2.4.1`), IDs, percentages, money. This is a core brand tell.
- **Vocabulary:** governed, governance, coordination layer, encoded/enforced, standards, skills, medallion (staging → intermediate → mart), tier (gold/silver), SCD2, quality gates, lineage, reviewable.
- **Emoji:** never. Not in product, not in marketing. Iconography carries meaning instead.
- **Punctuation:** use the middle dot `·` as a separator in metadata rows (`v2.4.1 · 48ms · 200 OK`). Em dashes for asides, used sparingly.

**Examples (on-brand):**
- "Your data engineering standards, encoded and enforced."
- "Every PR runs context-informed quality gates — documentation, code quality, test coverage, and data quality."
- "42 / 42 gates green · ready to merge."

**Avoid:** exclamation marks, hype words ("revolutionary", "magical"), Title Case buttons, emoji, decorative stats with no meaning.

---

## Visual foundations

### Color
- **Pacific `#00b4d8`** is the dominant brand color — primary CTAs, active states, links-on-hover, focus rings. **Navy `#03045e`** is sub-dominant — primary text, depth, grounding, the dark-gradient CTA. **Seafoam `#00dd92`** is the accent — success and positive highlight moments only, used sparingly.
- Secondary blues/teals (**Powder, Arctic, Ocean**) support graphics, borders, and code syntax. Neutrals are just two anchors — **Pearl `#f2f2f2`** (light) and **Smoke `#171c21`** (dark) — extended by a derived gray ramp for borders/text.
- **Rule:** color for meaning only; decorative color is noise. Pick one accent per context (Pacific *or* Seafoam, not both).
- Semantic: success = Seafoam (brand-aligned), warning = amber, error = red, info = Pacific. Soft 8–12% tints back badges and callouts.

### Typography
- **Geist** for everything UI; **Geist Mono** for data. Headlines are weight **600** with tight tracking (**-0.02em**); body is **400**; labels **500**. Scale: Display 32 / H1 24 / H2 18 / H3 16 / Body 14 / Small 13 / Caption 12 / Micro 11. Never decorative/display fonts.

### Spacing & layout
- Strict **4px grid** (4 / 8 / 12 / 16 / 24 / 32 / 48 …). Symmetrical padding. Generous whitespace in marketing; dense, content-driven grids in product. Clean geometric lines — no diagonals, no asymmetry, no surprise. Primary product nav is a fixed **240–280px sidebar**; secondary is a **56–64px sticky top bar**.

### Backgrounds & surfaces
- Flat, solid surfaces — **no busy patterns, textures, or loud gradients**. The *one* sanctioned gradient is the Navy→deep-navy CTA banner (`linear-gradient(135deg, #03045e, #061a3a)`). Light mode = white/Pearl; dark mode = Smoke base with `#1e2329` surfaces and `#262c33` elevated layers. Marketing prefers light; product/dev tools prefer dark. Code blocks are near-black (`#0d1117`) with Pacific/Seafoam/Powder syntax.

### Borders, radius & elevation
- **Borders are preferred over shadows.** Radii are sharp and technical: **sm 4 / md 6 / lg 8 / xl 12** — never 16px+ on small elements (feels juvenile). Cards: 1px border, 8px radius, *minimal* shadow (`0 1px 2px rgba(3,4,94,0.05)`) in light; border-only in dark. Floating elements step up to a soft `0 4px 12px`. A Pacific glow (`0 4px 16px rgba(0,180,216,0.25)`) is reserved for primary-button hover.

### Motion
- Steady and controlled — **no spring, no bounce.** Durations: micro 150ms (buttons/toggles), standard 200ms (dropdowns/tooltips), emphasis 250ms (modals). Default easing `cubic-bezier(0.25, 1, 0.5, 1)`. Hover = color/background/shadow shift, **never** transform/scale. Press states stay subtle (color change, not shrink). Respect `prefers-reduced-motion`.

### States
- **Hover:** Pacific text or soft Pacific-tint background; secondary buttons shift border + text to Pacific; cards gain elevation + Arctic border. **Focus:** Pacific border + 2px Pacific ring (20% in light, 30% in dark). **Error:** red border + 2px red ring. **Disabled:** opacity 0.5, `not-allowed`.

### Imagery
- Cool, precise, minimalist — dark blue/cyan palette, geometric, subtle futuristic technology aesthetic (data flows, network patterns, infrastructure). No warm/grainy stock. When no real asset exists, use a flat tinted placeholder rather than inventing imagery.

---

## Iconography

- **Phosphor Icons** (`@phosphor-icons/react` in product; `@phosphor-icons/web` via CDN in static artifacts and the cards/UI kits here). Use the **regular** weight consistently (light is acceptable if applied everywhere). Sizes: **16px** inline, **20px** standalone, **24px** navigation.
- **Icons clarify, never decorate** — if removing an icon loses no meaning, remove it. One weight throughout an interface.
- **No emoji. No unicode glyphs as icons.** (Small geometric SVGs — chevron, check, ×, ▲/▼ deltas — are hand-inlined inside a few components where bundling an icon font would be overkill; these match Phosphor's stroke feel.)
- **Brand marks** live in `assets/logos/` (see below) — these are logos, not UI icons; never recolor or stretch them. At runtime the canonical source is the logo CDN.

### Logo assets (`assets/logos/`)
The "AD" monogram: navy letterforms with a signature cyan→teal gradient swoosh. **light** = light strokes for dark backgrounds; **dark** = dark strokes for light backgrounds.
- `wordmark-{dark,light}.svg` — full "ACCELERATE DATA" wordmark.
- `lockup-{dark,light}.svg` — icon + wordmark stacked lockup.
- `mark-{dark,light}.svg` — the AD monogram alone (app icon, favicon, avatar).
- `icon-{dark,light}-256.png`, `avatar-400.png` — raster marks.

---

## Index / manifest

Root files
- `styles.css` — **the only file consumers link.** Pure `@import` list reaching every token + font file.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `elevation.css`, `motion.css`.
- `assets/fonts/` — Geist & Geist Mono woff2. `assets/logos/` — brand marks.
- `README.md` (this file) · `SKILL.md` (Agent-Skills-compatible entry).

Components (`window.VibedataDesignSystem_*`) — each has `.jsx` + `.d.ts` + `.prompt.md`
- `components/forms/` — **Button, IconButton, Input, Select, Checkbox, Switch**
- `components/feedback/` — **Badge, Alert**
- `components/data/` — **Card, StatCard, Avatar, Tag**
- `components/navigation/` — **Tabs**

Foundation cards (Design System tab) — `guidelines/cards/`
- Colors (6), Type (4), Spacing/radius/elevation (3), Brand (3).

UI kits — `ui_kits/`
- `marketing/` — the Vibedata landing page (light, theme-toggle). Real reference existed.
- `studio/` — the Vibedata Studio product app (dark): Overview, Build agent, Models catalog. Composed from documented patterns — see its README for the important caveat.

---

## Using this system
Link `styles.css`, then use the CSS custom properties (`var(--pacific)`, `var(--text-primary)`, `var(--space-4)`, `var(--radius-lg)`, `var(--font-mono)`, …). In React, read components from the compiled bundle: `const { Button } = window.VibedataDesignSystem_1cd9ed`. For deeper brand fidelity, explore the source repos linked above.
