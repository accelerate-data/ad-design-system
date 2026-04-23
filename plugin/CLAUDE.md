# CLAUDE.md

Claude-specific routing for the `ad-design-system` plugin. Canonical guidance lives in [`AGENTS.md`](./AGENTS.md). Read it first.

## Plugin purpose

Ships Accelerate Data's design system as a Claude Code skill. Brand-compliant, premium UI guidance for vibeData product, marketing, docs, and demos.

## Skills

Use these plugin-local skills when requests match:

- `skills/applying-ad-design-system/SKILL.md` — brand-compliant UI for any Accelerate Data surface (product, marketing, docs, demos)

## Plugin boundary

The plugin only ships the contents of `plugin/` (this directory). Non-plugin brand material at the parent repo root is **not** available at runtime. Do not reference `../logo/` or `../gamma-theme.md` from inside `skills/`.

For logo assets at runtime, prefer the canonical CDN paths documented in `skills/applying-ad-design-system/SKILL.md` (`http://assets.acceleratedata.ai/logo/`) over any local copies.
