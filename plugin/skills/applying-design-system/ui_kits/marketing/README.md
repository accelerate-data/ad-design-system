# Marketing Site — UI Kit

A faithful recreation of the **Vibedata** (Accelerate Data) marketing homepage, composed from the design system's components and tokens. Based on the brand's reference marketing page (`sample/index.html` in `accelerate-data/ad-design-system`) and product copy from `accelerate-data/vibedata-official`.

## Files
- `index.html` — the assembled, interactive landing page (light/dark toggle). Open this.
- `Sections.jsx` — section components: `MktNav`, `MktHero` (+ `HeroConsole`), `MktFeatures`, `MktMetrics`, `MktCode`, `MktCTA`, `MktFooter`.

## What it demonstrates
- Sticky nav with theme-aware logo + Button/IconButton usage
- Hero with product console mock, eyebrow, balanced headline, CTAs
- Build → Deploy → Operate feature cards (Card + Badge)
- Metric band in Geist Mono
- dbt code showcase with brand syntax colors
- Navy-gradient CTA banner + footer wordmark

## Notes
- Light mode is the brand-preferred default for marketing.
- Logos resolve from `../../assets/logos/`. Icons via Phosphor (CDN).
- No actual product app frontend exists in the source repos; this kit recreates the documented **marketing** surface only.
