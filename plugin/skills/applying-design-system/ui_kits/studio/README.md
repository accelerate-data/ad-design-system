# Vibedata Studio — UI Kit

An interactive recreation of the **Vibedata Studio** product surface — the agentic coordination layer for data platforms (dbt on Microsoft Fabric). Dark mode is the default, per the design system's preference for developer tools.

## Files
- `index.html` — the assembled app shell with working sidebar navigation. Open this.
- `Shell.jsx` — `StudioSidebar` (grouped nav + user) and `StudioTopBar`.
- `Screens.jsx` — `OverviewScreen`, `BuildScreen` (the agent), `CatalogScreen` (model table), `PlaceholderScreen`.

## What it demonstrates
- **Overview** — StatCard row, recent-runs table with status badges, quality-gate progress card.
- **Build** — the agentic flow: a business-intent prompt → generated plan (matched skill, model, snapshot, tests, governance) → "Ready to review" PR. Click **Build** to run it.
- **Models** — searchable, tabbed catalog table using Tag/Badge/IconButton; filters by layer.
- Sidebar routing, top bar with branch badge, deploy action.

## Composition
Built entirely from the design system's components (`Button`, `IconButton`, `Input`, `Badge`, `Tag`, `StatCard`, `Card`, `Tabs`, `Avatar`) and tokens.

## Important note
The source repositories (`accelerate-data/*`) ship **skills, plugins, and brand assets — not the Studio app frontend**. No product UI code or screenshots were available. This kit is therefore a *plausible* product surface composed strictly from the documented design system, layout patterns (sidebar nav, dense data grids, split panels), and product copy/concepts (Build → Deploy → Operate, skills, governed PRs). Treat exact screen layouts as illustrative; the visual language, components, and tokens are authoritative. If the real Studio UI becomes available, recreate against it.
