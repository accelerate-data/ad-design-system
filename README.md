# ad-design-system

Accelerate Data's design system repo. Two distinct kinds of content live here:

1. **The `design-system` Claude/Codex plugin** under [`plugin/`](./plugin).
2. **Brand reference material** at the repo root — logo assets, brand book, theme configs, documentation. Maintained alongside the plugin but **not shipped with it**.

---

## 1. Plugin source — [`plugin/`](./plugin)

The `design-system` plugin for Claude Code and Codex. This subtree is what gets installed by users of the Accelerate Data marketplace:

```bash
claude marketplace add accelerate-data/plugin-marketplace
claude plugin install design-system@ad-internal-marketplace
```

See [`plugin/README.md`](./plugin/README.md) for plugin-specific details.

The expanded plugin supports UX-engineering work across three layers:

- `applying-design-system` — AD-owned brand application: colors, typography, spacing, logos, motion, layout tone.
- `component` — upstream-attributed component workflow: spec, docs, dev, review, spec-review, accessibility checks, audit.
- `design-screen` — upstream-attributed screen workflow: compose screens from existing components, check responsive behavior and page states, continue without Figma when needed, then ship.

Use the root logo docs and brand book for source reference, but keep runtime skill guidance inside `plugin/`.

The marketplace entry references this repo via `git-subdir` with `path: "plugin"`, so plugin installs do **not** include any of the content below.

---

## 2. Brand reference material (repo root, not shipped with the plugin)

### Documentation

| Doc | Audience | Purpose |
|---|---|---|
| [`logo/ASSETS_FOR_AI.md`](./logo/ASSETS_FOR_AI.md) | LLM agents, automation | Machine-readable manifest of every logo asset (path, CDN URL, dimensions, background-color fit). Use this over pattern-interpolation when an agent needs to pick a logo. |
| [`logo/ASSETS_FOR_DEVELOPERS.md`](./logo/ASSETS_FOR_DEVELOPERS.md) | Developers integrating logos | Quick-picks table and the "light vs dark" cheat sheet (the name describes artwork color, not page theme). |
| [`logo/creation_scripts/README.md`](./logo/creation_scripts/README.md) | Brand maintainers | How `generate_assets.py` reads `logo-export-checklist.xlsx` and produces the full export tree from the 7 source SVGs. |
| [`gamma-theme.md`](./gamma-theme.md) | Anyone making Gamma decks | Brand-aligned color, text, and background values to paste into Gamma's theme builder. |
| [`Accelerate Data - Brand Book.pdf`](./Accelerate%20Data%20-%20Brand%20Book.pdf) | All brand consumers | Authoritative brand guidelines — the source of truth that everything else distills. |

### Asset tree

```
├── logo/
│   ├── ASSETS_FOR_AI.md               # LLM-readable manifest
│   ├── ASSETS_FOR_DEVELOPERS.md       # Developer quick-reference
│   ├── product/ui/                    # Product UI icons and wordmarks (SVG + PNG)
│   ├── web/favicons/                  # Favicons, PWA icons, Safari pinned tab
│   ├── marketing/social/              # Social media avatars
│   ├── marketplaces/                  # Azure marketplace logos
│   ├── ops/email/                     # Email template logos
│   ├── docs/                          # Documentation site logos
│   ├── archive/                       # Source SVGs and previous exports
│   └── creation_scripts/              # Asset generation automation (see its own README)
├── gamma-theme.md
└── Accelerate Data - Brand Book.pdf
```

### CDN

The CDN is the authoritative runtime source for logos; the `logo/` tree mirrors what lives there.

```
http://assets.acceleratedata.ai/logo/
```

Full URL = base + path from `ASSETS_FOR_AI.md` / `ASSETS_FOR_DEVELOPERS.md`.

**Rule:** always look up a logo path from the manifest. Do not construct URLs by pattern interpolation.

---

## Development

### Enable the pre-commit hook (once per clone)

Blocks accidental commits of Anthropic API keys:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

### Plugin version

The plugin version lives in both [`plugin/.claude-plugin/plugin.json`](./plugin/.claude-plugin/plugin.json) and [`plugin/.codex-plugin/plugin.json`](./plugin/.codex-plugin/plugin.json). CI enforces matching bumped versions on any PR that touches `plugin/**` (see [`.github/workflows/version-bump-check.yml`](./.github/workflows/version-bump-check.yml)).

### Regenerating logo assets

See [`logo/creation_scripts/README.md`](./logo/creation_scripts/README.md) for details. Short version:

```bash
cd logo/creation_scripts
pip install -r requirements.txt
python generate_assets.py
```

---

## License

MIT. See [LICENSE](./LICENSE).
