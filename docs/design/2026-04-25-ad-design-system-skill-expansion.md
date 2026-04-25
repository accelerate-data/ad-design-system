# Design System Plugin Expansion

**Date:** 2026-04-25
**Status:** Draft design
**Repository:** `ad-design-system`

## Problem

The current `ad-design-system` plugin provides one first-party brand compliance
skill under `plugin/skills/applying-ad-design-system/`. That keeps Accelerate
Data visual guidance available in Claude Code and Codex, but the target plugin
identity should be broader and less AD-prefixed: `design-system`.

Separately, `Maximepodgorski/agent-skills` provides two design-system workflow
skills that fit the same user intent:

- `component`: design-system component specification, documentation,
  implementation, review, and audit.
- `design-screen`: composition of screens from existing design-system
  components.

Those upstream skills are written as portable `SKILL.md` skills and explicitly
claim Codex compatibility, but the upstream repository is not a Claude or Codex
plugin. It also contains runtime references to `CLAUDE.md`, Figma MCP, and
parallel subagents that need deterministic adaptation before we expose the
skills through the Accelerate Data marketplace.

## Decision

Expand the existing plugin source into the umbrella `design-system` plugin for
Accelerate Data.

The repo can remain `ad-design-system` as the source location, but the plugin
identity should change:

- Marketplace name/id: `design-system`
- Codex display name: `Design System`
- Claude plugin name: `design-system`, because Claude has no separate
  display-name field.

The plugin will contain three runtime skills:

```text
plugin/
  skills/
    applying-ad-design-system/  # AD-owned brand compliance skill
    component/                  # generated from Maxime upstream + AD adapter
    design-screen/              # generated from Maxime upstream + AD adapter
```

`kickoff` from the upstream repository is deliberately excluded. It is a
project-context workflow, not a design-system workflow, and belongs in
`engineering-skills` or a standalone project-onboarding plugin.

## Goals

- Make `design-system` the single installed plugin for AD design-system work.
- Keep the GitHub source path stable unless we separately decide to rename the
  repository.
- Keep AD-owned brand compliance guidance as a first-class skill.
- Add portable component and screen-composition workflows without hand-editing
  vendored upstream files.
- Make upstream provenance obvious to future agents and maintainers.
- Keep Codex behavior correct when upstream text mentions `CLAUDE.md`.

## Non-goals

- Do not vendor upstream `kickoff` into the design-system plugin.
- Do not rename the GitHub repository as part of the first implementation.
- Do not require plugin installs to include root repo brand assets outside the
  `plugin/` subtree.
- Do not maintain a long-lived manual fork of upstream skill content.
- Do not add Promptfoo evals in the first implementation unless the skill
  content is materially rewritten.

## Source Layout

The repository keeps raw upstream content under a vendored source directory and
generates installed skill content from it.

```text
vendor/
  maxime-agent-skills/
    component/
    design-screen/
    kickoff/              # present only if sync pulls the full selected tree

plugin/
  skills/
    applying-ad-design-system/
    component/
    design-screen/
```

`vendor/maxime-agent-skills/` is raw upstream material. Agents must not edit it
directly unless explicitly asked to change the vendor snapshot.

`plugin/skills/component/` and `plugin/skills/design-screen/` are generated
installed skills. They are copied from upstream and then patched with the
Accelerate Data adapter transform.

## Why Generated Copies, Not Symlinks

Symlinks would keep upstream as the visible source of truth, but they do not
solve runtime adaptation. Once the plugin is installed into another project,
the active instructions are the installed `SKILL.md` files and their
references. A wrapper-level `AGENTS.md` note in this repo will not reliably
travel with or override those skill instructions.

Generated copies let the adapter changes live inside the skill content that
Claude and Codex actually load. The source of truth remains:

```text
raw upstream snapshot + deterministic AD adapter transform
```

This avoids manual drift while making the installed skills portable.

## Adapter Rules

The sync process applies small, deterministic patches to generated skill
content:

- Replace direct "read `CLAUDE.md`" guidance with repo-agent guidance:
  prefer `AGENTS.md` for Codex, prefer `CLAUDE.md` for Claude, and read both
  when both exist.
- Replace "generate `CLAUDE.md`" guidance only if it appears in included
  design-system skills. The generated output target must be agent-specific and
  must ask once if the target repo convention is unclear.
- Keep Figma MCP as optional for `component` and `design-screen spec`.
- Keep `design-screen craft` marked as requiring Figma MCP write capability.
- Map "Task tool" and "parallel subagents" wording to generic agent parallel
  review guidance with a single-agent fallback.
- Preserve upstream license notices and upstream skill authorship.

The adapter should not rewrite skill intent, design-system principles, or
workflow structure beyond portability fixes.

## Sync Workflow

Add a weekly GitHub Actions workflow that:

1. Checks out this repository.
2. Fetches `https://github.com/Maximepodgorski/agent-skills` at the default
   branch.
3. Copies selected upstream directories into `vendor/maxime-agent-skills/`.
4. Regenerates `plugin/skills/component/` and
   `plugin/skills/design-screen/`.
5. Applies the AD adapter transform.
6. Runs repository checks.
7. Opens a pull request when the generated output changes.

The workflow should not auto-push directly to `main`. A PR keeps upstream
changes reviewable, especially because skill text is runtime behavior.

## Manifest Impact

The first implementation will update both plugin manifests because runtime
skill content changes:

- `plugin/.claude-plugin/plugin.json`
- `plugin/.codex-plugin/plugin.json`

Both manifests must keep the same plugin version. The Codex manifest should
use `interface.displayName: "Design System"` so marketplace users see the
umbrella capability, while both Claude and Codex plugin names move to
`design-system`.

## Repository Guidance

Update `plugin/AGENTS.md` and `plugin/repo-map.json` when the implementation
adds the generated skills and vendor source. Guidance should make these
boundaries explicit:

- `vendor/maxime-agent-skills/` is vendored upstream source.
- `plugin/skills/component/` and `plugin/skills/design-screen/` are generated
  from upstream plus adapter patches.
- Agents must warn before editing generated or vendored skill content by hand.
- AD-owned skill content remains under
  `plugin/skills/applying-ad-design-system/`.

## Verification

Implementation verification should include:

- `git diff --check`
- Plugin manifest validation, if this repo has a local validator at that point.
- Existing Python tests under `tests/`.
- A targeted content check that no generated runtime skill tells Codex to use
  only `CLAUDE.md`.
- A manual install smoke test through the local marketplace after the
  marketplace entry points at the updated plugin version.

## Open Questions

- Should the existing skill directory be renamed from
  `applying-ad-design-system` to `brand-compliance`, or should we preserve the
  current skill name for routing stability?
- Should generated upstream skills carry a short AD-specific preamble at the
  top of each `SKILL.md`, or should adapter changes be inline only?
- Should the weekly sync use a small script committed in this repo, or keep the
  transform logic entirely inside the GitHub Actions workflow?
