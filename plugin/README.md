# Design System Plugin

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
│   ├── applying-design-system/
│   ├── component/
│   └── design-screen/
├── THIRD_PARTY_NOTICES.md
├── AGENTS.md
├── CLAUDE.md
├── repo-map.json
└── README.md
```

## Use in Claude

Install via the Accelerate Data internal marketplace:

```bash
claude marketplace add accelerate-data/plugin-marketplace
claude plugin install design-system@ad-internal-marketplace
```

The plugin manifest is at [`.claude-plugin/plugin.json`](./.claude-plugin/plugin.json).

For local development without a marketplace, symlink each skill directory into `~/.claude/skills`:

```bash
mkdir -p ~/.claude/skills

ln -s /absolute/path/to/ad-design-system/plugin/skills/applying-design-system \
  ~/.claude/skills/applying-design-system

ln -s /absolute/path/to/ad-design-system/plugin/skills/component \
  ~/.claude/skills/component

ln -s /absolute/path/to/ad-design-system/plugin/skills/design-screen \
  ~/.claude/skills/design-screen
```

The symlink name should match the skill directory name.

## Use in Codex

The Codex plugin manifest is at [`.codex-plugin/plugin.json`](./.codex-plugin/plugin.json).

For local development without a marketplace:

```bash
mkdir -p ~/.codex/skills

ln -s /absolute/path/to/ad-design-system/plugin/skills/applying-design-system \
  ~/.codex/skills/applying-design-system

ln -s /absolute/path/to/ad-design-system/plugin/skills/component \
  ~/.codex/skills/component

ln -s /absolute/path/to/ad-design-system/plugin/skills/design-screen \
  ~/.codex/skills/design-screen
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

- `applying-design-system` — brand-compliant visual guidance for all Accelerate Data surfaces.
- `component` — generated upstream-derived component workflow from Maximepodgorski/agent-skills.
- `design-screen` — generated upstream-derived screen workflow from Maximepodgorski/agent-skills.

## UX Engineering Workflows

| Need | Use |
|---|---|
| Apply AD brand tone, colors, typography, spacing, logos, and motion | `applying-design-system` |
| Specify, document, implement, or review a reusable component | `component` |
| Compose a screen from existing components and ship it | `design-screen` |
| Check accessibility, token usage, variants, and component API quality | `component review` or `component audit` |
| Check responsive behavior, loading/empty/error states, and layout composition | `design-screen review` |
| Continue without Figma | Use text/codebase mode; skip `design-screen craft` and continue with `design-screen ship` |

## License

This plugin subtree is licensed under Elastic License 2.0. See [LICENSE](./LICENSE).

Upstream-derived generated skills retain upstream MIT attribution in
[THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md). The source repo also keeps
the raw upstream snapshot under repo-root `vendor/`, which is not part of plugin
installs.
