# AD Design System Plugin

Shared plugin for Accelerate Data's design system, used by Claude Code and Codex.

**Maintenance rule:** This file contains durable repository guidance, not volatile inventory. If a fact is easy to rediscover from the tree or will go stale when files move, keep it in `repo-map.json` instead.

## Instruction Hierarchy

Use this precedence when maintaining agent guidance:

1. `AGENTS.md` — canonical, cross-agent source of truth
2. Skill-local references under `skills/<skill>/` (e.g., `component-examples.md`)
3. `CLAUDE.md` — Claude-specific adapter and routing

For Codex, `AGENTS.md` is the repo-local instruction surface. Do not add a separate Codex adapter file unless Codex introduces a real supported convention for one.

## Plugin Scope

This plugin ships **only** the contents of the `plugin/` subdirectory. Non-plugin content at the repo root (`logo/`, brand book, `gamma-theme.md`) is brand reference material and is intentionally excluded from plugin installs.

- Root manifests: `.claude-plugin/plugin.json` and `.codex-plugin/plugin.json`
- Canonical skill content: `skills/`

## Agent Startup Context

Read `repo-map.json` before any non-trivial task. It is the primary index for structure and current skill inventory.

## Maintenance Rules

| Artifact | Update when |
|---|---|
| `AGENTS.md` | A fact is durable, cross-cutting, and not obvious from the tree |
| `repo-map.json` | Any structural entry becomes stale: manifests, skills, or key docs |
| `CLAUDE.md` | Claude-specific routing or adapter behavior changes |
| `.claude-plugin/plugin.json` + `.codex-plugin/plugin.json` | Bump `version` on any skill change; CI enforces this |

Update stale guidance in the same change that introduces the structural change.

## Skill Ownership

This plugin owns only the skills that physically live under `skills/`.

- Do not add references that require files outside `plugin/`. A plugin install does not include the parent repo's `logo/` tree or brand book.
- If a skill needs support material, place it under that skill directory.
- CDN-hosted assets (e.g., `http://assets.acceleratedata.ai/logo/`) are the canonical source for logos in any runtime context.

## Local Development Pattern

For direct local use without a marketplace, symlink individual skill directories from `skills/<skill-name>` into:

- `~/.claude/skills/<skill-name>`
- `~/.codex/skills/<skill-name>`

Keep the symlink name identical to the skill directory name.

## Markdown Discipline

- All `.md` files should pass `markdownlint` before committing.
- Do not add mid-sentence hard wraps just for line length unless a repo markdownlint config enables `MD013`.

## Conventions

- Keep all skill directories under `skills/`.
- Avoid adding product-specific assumptions or external path dependencies to the shared skill.
- The design skill is framework-agnostic — do not lock it to React/Tailwind in the canonical text.
