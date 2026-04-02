# vd-design-system

Accelerate Data / VibeData design system — the single source of truth for brand assets, color tokens, typography, and frontend component guidelines.

## Structure

```
├── ad-frontend-design/    # Frontend design system (colors, typography, components)
│   ├── SKILL.md           # Full design system specification
│   ├── component-examples.md
│   └── assets/            # Color tokens (JSON) and local logo copies
├── logo/                  # All logo assets by platform
│   ├── product/ui/        # Product UI icons and wordmarks (SVG + PNG)
│   ├── web/favicons/      # Favicons, PWA icons, Safari pinned tab
│   ├── marketing/social/  # Social media avatars
│   ├── marketplaces/      # Azure marketplace logos
│   ├── ops/email/         # Email template logos
│   ├── docs/              # Documentation site logos
│   ├── archive/           # Source SVGs and previous exports
│   └── creation_scripts/  # Asset generation automation
├── sample/                # Brand application demo
├── gamma-theme.md         # Gamma presentation theme config
└── Accelerate Data - Brand Book.pdf
```

## Quick Start

- **Color tokens**: `ad-frontend-design/assets/colors.json`
- **Logo usage guide**: `logo/ASSETS_FOR_DEVELOPERS.md`
- **Full design spec**: `ad-frontend-design/SKILL.md`
- **CDN base URL**: `http://assets.acceleratedata.ai/logo/`

## Regenerating Logo Assets

```bash
cd logo/creation_scripts
pip install -r requirements.txt
python generate_assets.py
```
