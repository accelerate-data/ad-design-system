# ad-design-system

Accelerate Data's design system — brand assets and the `ad-design-system` Claude/Codex plugin.

This repo contains two distinct kinds of content:

## 1. Plugin source — [`plugin/`](./plugin)

The `ad-design-system` plugin for Claude Code and Codex. This subtree is what gets installed by users of the Accelerate Data marketplace:

```bash
claude marketplace add accelerate-data/plugin-marketplace
claude plugin install ad-design-system@ad-internal-marketplace
```

See [`plugin/README.md`](./plugin/README.md) for plugin-specific details.

The marketplace entry references this repo via `git-subdir` with `path: "plugin"`, so plugin installs do **not** include the brand assets listed below.

## 2. Brand reference material (repo root, not shipped with the plugin)

```
├── logo/                     # All logo assets by platform
│   ├── product/ui/           # Product UI icons and wordmarks (SVG + PNG)
│   ├── web/favicons/         # Favicons, PWA icons, Safari pinned tab
│   ├── marketing/social/     # Social media avatars
│   ├── marketplaces/         # Azure marketplace logos
│   ├── ops/email/            # Email template logos
│   ├── docs/                 # Documentation site logos
│   ├── archive/              # Source SVGs and previous exports
│   └── creation_scripts/     # Asset generation automation
├── gamma-theme.md            # Gamma presentation theme config
└── Accelerate Data - Brand Book.pdf
```

- The CDN (`http://assets.acceleratedata.ai/logo/`) is the authoritative runtime source; `logo/` mirrors what's there.
- These live at repo root so contributors maintaining the brand system have them available, but they are intentionally **excluded** from plugin installs. Do not reference them from inside `plugin/`.

## Quick references

- Color tokens: [`plugin/skills/ad-frontend-design/assets/colors.json`](./plugin/skills/ad-frontend-design/assets/colors.json)
- Logo usage guide: `logo/ASSETS_FOR_DEVELOPERS.md`
- Full design spec: [`plugin/skills/ad-frontend-design/SKILL.md`](./plugin/skills/ad-frontend-design/SKILL.md)
- CDN base URL: `http://assets.acceleratedata.ai/logo/`

## Development

### Enable the pre-commit hook (once per clone)

Blocks accidental commits of Anthropic API keys:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

### Plugin version

The plugin version lives in [`plugin/.claude-plugin/plugin.json`](./plugin/.claude-plugin/plugin.json). CI enforces a version bump on any PR that touches `plugin/**`.

### Regenerating logo assets

```bash
cd logo/creation_scripts
pip install -r requirements.txt
python generate_assets.py
```

## License

MIT. See [LICENSE](./LICENSE).
