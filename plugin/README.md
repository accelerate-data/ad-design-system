# AD Design System Plugin

Accelerate Data's design system — shared as a plugin for Claude Code and Codex.

This directory is the plugin source. It lives inside the `ad-design-system` repository, alongside non-plugin brand assets (`logo/`, brand book, Gamma theme) that stay at the repo root and are **not** included in plugin installs.

- Claude marketplaces should point to this directory via `git-subdir` with `path: "plugin"`.
- Codex marketplaces should do the same.
- The canonical skill content lives under [`skills/`](./skills).

## Layout

```text
plugin/
├── .claude-plugin/plugin.json
├── .codex-plugin/plugin.json
├── skills/
│   └── applying-ad-design-system/
├── AGENTS.md
├── CLAUDE.md
├── repo-map.json
└── README.md
```

## Use in Claude

Install via the Accelerate Data internal marketplace:

```bash
claude marketplace add accelerate-data/plugin-marketplace
claude plugin install ad-design-system@ad-internal-marketplace
```

The plugin manifest is at [`.claude-plugin/plugin.json`](./.claude-plugin/plugin.json).

For local development without a marketplace, symlink each skill directory into `~/.claude/skills`:

```bash
mkdir -p ~/.claude/skills

ln -s /absolute/path/to/ad-design-system/plugin/skills/applying-ad-design-system \
  ~/.claude/skills/applying-ad-design-system
```

The symlink name should match the skill directory name.

## Use in Codex

The Codex plugin manifest is at [`.codex-plugin/plugin.json`](./.codex-plugin/plugin.json).

For local development without a marketplace:

```bash
mkdir -p ~/.codex/skills

ln -s /absolute/path/to/ad-design-system/plugin/skills/applying-ad-design-system \
  ~/.codex/skills/applying-ad-design-system
```

## Development Notes

- Keep all skill directories under `skills/`.
- Keep skill assets, scripts, references, and agents inside the owning skill directory.
- Avoid cross-repo relative paths. A plugin install must be self-contained within `plugin/`.
- Do not reference `../logo/` or other repo-root assets from inside `skills/` — plugin installs only see this directory.

### Git Hooks

The parent repo provides a pre-commit hook under `.githooks/pre-commit` to block accidental commits of Anthropic API keys. Enable it once per clone:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-commit
```

## Current Skills

- `applying-ad-design-system` — brand-compliant visual guidance for all Accelerate Data surfaces.
