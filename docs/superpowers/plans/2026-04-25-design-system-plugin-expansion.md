# Design System Plugin Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the current `ad-design-system` plugin source into the umbrella `design-system` plugin with the renamed AD-owned skill plus upstream-attributed `component` and `design-screen` skills.

**Architecture:** Keep `plugin/` as the runtime plugin boundary. Store raw upstream source under `vendor/maxime-agent-skills/`, generate installed skill copies under `plugin/skills/`, and apply deterministic adapter rules through a repo-owned sync script. Treat upstream-derived skills as attributed generated output, while `applying-design-system` remains first-party AD-owned content.

**Tech Stack:** Markdown skills, JSON plugin manifests, Python `unittest`, Promptfoo smoke evals, GitHub Actions, `git`, optional `claude plugin validate plugin`.

---

## Source Contract

Implement against [docs/design/2026-04-25-ad-design-system-skill-expansion.md](../../design/2026-04-25-ad-design-system-skill-expansion.md).

The key decisions are:

- Rename plugin identity from `ad-design-system` to `design-system`.
- Keep the renamed AD-owned skill at `plugin/skills/applying-design-system/`.
- Vendor upstream `Maximepodgorski/agent-skills` source under `vendor/maxime-agent-skills/`.
- Generate `plugin/skills/component/` and `plugin/skills/design-screen/` from the vendored upstream source plus deterministic adapter transforms.
- Preserve upstream attribution, the upstream MIT license notice, and machine-readable upstream provenance.
- Keep Figma optional for the skills overall. `design-screen craft` may require Figma write capability, but missing Figma must route users to non-Figma `ship` guidance instead of blocking the whole skill.
- Add focused behavioral evals for plugin routing, upstream attribution, Codex/Claude guidance portability, and Figma-unavailable fallback behavior.
- Ensure the final plugin covers practical UX-engineering work: applying AD brand guidance, specifying and implementing components, reviewing component quality, composing screens from existing components, checking accessibility, handling responsive behavior and page states, and continuing without Figma.

## File Structure

Create:

- `scripts/sync_maxime_agent_skills.py` - syncs upstream source, writes provenance, regenerates upstream-derived plugin skills, and applies adapter transforms.
- `tests/test_sync_maxime_agent_skills.py` - unit tests for adapter transforms and provenance writing.
- `vendor/maxime-agent-skills/LICENSE` - upstream MIT license notice copied from upstream.
- `vendor/maxime-agent-skills/UPSTREAM.json` - exact upstream URL, branch, commit, included paths, sync timestamp, and adapter version.
- `vendor/maxime-agent-skills/component/**` - raw upstream `component` skill snapshot.
- `vendor/maxime-agent-skills/design-screen/**` - raw upstream `design-screen` skill snapshot.
- `plugin/skills/component/**` - generated adapted runtime skill.
- `plugin/skills/design-screen/**` - generated adapted runtime skill.
- `tests/evals/package.json` - pinned eval runner dependency and npm scripts.
- `tests/evals/providers/design-system-router.js` - deterministic local eval provider for routing and fallback smoke checks.
- `tests/evals/promptfooconfig.yaml` - focused smoke eval suite for the adopted design-system skills.
- `tests/evals/README.md` - how to run evals locally and in CI.
- `.github/workflows/sync-upstream-skills.yml` - weekly PR workflow for upstream refreshes.

Modify:

- `plugin/skills/applying-design-system/**` - renamed first-party AD-owned skill.
- `plugin/skills/applying-design-system/SKILL.md` - update frontmatter `name`.
- `plugin/.claude-plugin/plugin.json` - rename plugin to `design-system`, update description/keywords, bump version.
- `plugin/.codex-plugin/plugin.json` - rename plugin to `design-system`, set `interface.displayName` to `Design System`, update descriptions/default prompts, bump version.
- `plugin/AGENTS.md` - document vendor/generated boundaries, attribution, and renamed skill.
- `plugin/CLAUDE.md` - mirror Claude routing for renamed and generated skills.
- `plugin/README.md` - update install commands, layout, local symlinks, and current skills.
- `plugin/repo-map.json` - update manifests, skill inventory, vendor notes, and generated-source notes.
- `README.md` - update repo-level plugin identity, install command, workflow summary, and version note.
- `tests/test_skill_description.py` - update identity assertions and add runtime-content checks.
- `.github/workflows/version-bump-check.yml` - enforce both manifest versions, not only Claude.

Do not modify:

- `logo/` root brand assets.
- Root-level plugin manifests. This repo's plugin boundary remains `plugin/`.

---

### Task 1: Rename First-Party Skill and Plugin Identity

**Files:**
- Move the legacy AD-prefixed skill directory to `plugin/skills/applying-design-system/`
- Modify: `plugin/skills/applying-design-system/SKILL.md`
- Modify: `plugin/.claude-plugin/plugin.json`
- Modify: `plugin/.codex-plugin/plugin.json`
- Modify: `tests/test_skill_description.py`

- [ ] **Step 1: Write failing identity tests**

Replace `tests/test_skill_description.py` with this baseline. It intentionally expects the new runtime identity before implementation.

```python
from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
PLUGIN_DIR = ROOT / "plugin"
AD_SKILL_DIR = PLUGIN_DIR / "skills" / "applying-design-system"
AD_SKILL_PATH = AD_SKILL_DIR / "SKILL.md"
PLUGIN_NAME = "design-system"
AD_SKILL_NAME = "applying-design-system"
OLD_AD_SKILL_NAME = "applying" + "-ad-design-system"

REMOTE_COMPONENT_DESCRIPTION = """
Design system component workflow. Spec, document, implement, review, spec-review, and audit
DS components with Figma as primary input.
6 actions: spec, doc, dev, review, spec-review, audit.
Auto-activates on: "component", "spec component", "doc component",
"dev component", "review component", "spec-review component", "audit component",
"design system", "ds component", "component spec", "component doc", "component dev",
"component review", "component spec-review", "component audit".
"""


def frontmatter_field(path: Path, field: str) -> str:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0] != "---":
        raise AssertionError(f"{path} must start with YAML frontmatter")

    for line in lines[1:]:
        if line == "---":
            break
        if line.startswith(f"{field}: "):
            return line.split(f"{field}: ", 1)[1].strip()

    raise AssertionError(f"{path} frontmatter must include {field}")


class SkillDescriptionTests(unittest.TestCase):
    def test_skill_plugin_identity_uses_design_system_name(self):
        self.assertTrue(AD_SKILL_DIR.is_dir())
        self.assertFalse((PLUGIN_DIR / "skills" / OLD_AD_SKILL_NAME).exists())
        self.assertFalse((ROOT / "ad-frontend-design").exists())
        self.assertFalse((ROOT / "ad-design-system").exists())
        self.assertFalse((ROOT / "skills" / "ad-design-system").exists())
        self.assertFalse((ROOT / "skills").exists())
        self.assertEqual(AD_SKILL_NAME, frontmatter_field(AD_SKILL_PATH, "name"))

    def test_claude_and_codex_plugin_manifests_exist(self):
        for manifest_path in [
            ROOT / ".claude-plugin" / "plugin.json",
            ROOT / ".codex-plugin" / "plugin.json",
        ]:
            with self.subTest(manifest_path=manifest_path):
                self.assertFalse(manifest_path.exists())

        versions = set()
        for manifest_path in [
            PLUGIN_DIR / ".claude-plugin" / "plugin.json",
            PLUGIN_DIR / ".codex-plugin" / "plugin.json",
        ]:
            with self.subTest(manifest_path=manifest_path):
                manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
                self.assertEqual(PLUGIN_NAME, manifest["name"])
                self.assertEqual("./skills/", manifest["skills"])
                self.assertIn("design system", manifest["description"].lower())
                self.assertIn("version", manifest)
                versions.add(manifest["version"])

        self.assertEqual(1, len(versions))

    def test_codex_manifest_displays_design_system(self):
        manifest = json.loads(
            (PLUGIN_DIR / ".codex-plugin" / "plugin.json").read_text(encoding="utf-8")
        )
        self.assertEqual("Design System", manifest["interface"]["displayName"])
        self.assertIn("component", manifest["interface"]["longDescription"].lower())
        self.assertIn("screen", manifest["interface"]["longDescription"].lower())

    def test_ad_skill_description_does_not_conflict_with_component_skill(self):
        local = frontmatter_field(AD_SKILL_PATH, "description").lower()
        remote = REMOTE_COMPONENT_DESCRIPTION.lower()

        remote_activation_terms = [
            "component workflow",
            "ds component",
            "component spec",
            "component doc",
            "component dev",
            "component review",
            "figma",
        ]

        conflicts = [
            term for term in remote_activation_terms if term in local and term in remote
        ]

        self.assertEqual([], conflicts)

    def test_ad_skill_description_stays_brand_visual_specific(self):
        local = frontmatter_field(AD_SKILL_PATH, "description").lower()

        for required_term in ["accelerate data", "vibedata", "brand", "visual"]:
            with self.subTest(required_term=required_term):
                self.assertIn(required_term, local)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the focused test to verify failure**

Run:

```bash
python -m unittest tests.test_skill_description -v
```

Expected: FAIL because `plugin/skills/applying-design-system/` does not exist and manifests still use `ad-design-system`.

- [ ] **Step 3: Rename the skill directory**

Run:

```bash
git mv <legacy AD-prefixed skill directory> plugin/skills/applying-design-system
```

Update `plugin/skills/applying-design-system/SKILL.md` frontmatter:

```yaml
---
name: applying-design-system
description: Accelerate Data visual brand guidance for vibeData UI. Use for brand-compliant premium surfaces across product, marketing, docs, demos, and internal tools when the interface represents Accelerate Data.
---
```

- [ ] **Step 4: Update plugin manifests**

Set `plugin/.claude-plugin/plugin.json` to:

```json
{
  "name": "design-system",
  "description": "Design system guidance for Accelerate Data and vibeData interfaces, including brand-compliant visual direction, component workflows, and screen composition.",
  "version": "0.2.0",
  "author": {
    "name": "Accelerate Data"
  },
  "repository": "https://github.com/accelerate-data/ad-design-system",
  "license": "Elastic-2.0",
  "keywords": [
    "skills",
    "design-system",
    "brand",
    "component",
    "screen",
    "ui",
    "claude-code",
    "codex"
  ],
  "skills": "./skills/"
}
```

Set `plugin/.codex-plugin/plugin.json` to:

```json
{
  "name": "design-system",
  "version": "0.2.0",
  "description": "Design system guidance for Accelerate Data and vibeData interfaces, including brand-compliant visual direction, component workflows, and screen composition.",
  "author": {
    "name": "Accelerate Data"
  },
  "repository": "https://github.com/accelerate-data/ad-design-system",
  "license": "Elastic-2.0",
  "keywords": [
    "skills",
    "design-system",
    "brand",
    "component",
    "screen",
    "ui",
    "codex",
    "claude-code"
  ],
  "skills": "./skills/",
  "interface": {
    "displayName": "Design System",
    "shortDescription": "Design-system workflows and brand-compliant UI guidance.",
    "longDescription": "Design system guidance for Accelerate Data and vibeData interfaces, including brand-compliant visual direction, component specification and review workflows, and screen composition from existing components.",
    "developerName": "Accelerate Data",
    "category": "Design",
    "capabilities": [
      "Write"
    ],
    "defaultPrompt": [
      "Apply design system guidance to this interface.",
      "Review this screen for design system compliance.",
      "Specify or review a design system component."
    ],
    "brandColor": "#00B4D8"
  }
}
```

- [ ] **Step 5: Run the identity test to verify it passes**

Run:

```bash
python -m unittest tests.test_skill_description -v
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```bash
git add plugin/.claude-plugin/plugin.json plugin/.codex-plugin/plugin.json plugin/skills/applying-design-system tests/test_skill_description.py
git commit -m "feat: rename design system plugin identity"
```

---

### Task 2: Add Upstream Sync Script and Adapter Tests

**Files:**
- Create: `scripts/sync_maxime_agent_skills.py`
- Create: `tests/test_sync_maxime_agent_skills.py`

- [ ] **Step 1: Write failing sync-script tests**

Create `tests/test_sync_maxime_agent_skills.py`:

```python
import json
import tempfile
import unittest
from pathlib import Path

from scripts.sync_maxime_agent_skills import (
    ADAPTER_VERSION,
    apply_adapter_text,
    write_upstream_record,
)


class SyncMaximeAgentSkillsTests(unittest.TestCase):
    def test_adapter_rewrites_claude_md_guidance(self):
        source = "- **Adapt to project**: Read `CLAUDE.md` + codebase."

        result = apply_adapter_text(source, relative_path=Path("component/SKILL.md"))

        self.assertNotIn("Read `CLAUDE.md` + codebase", result)
        self.assertIn("Read repo agent guidance", result)
        self.assertIn("AGENTS.md for Codex", result)
        self.assertIn("CLAUDE.md for Claude", result)

    def test_adapter_rewrites_parallel_subagents(self):
        source = "Launch 4 subagents in parallel (use Task tool with `run_in_background` or parallel calls)."

        result = apply_adapter_text(
            source, relative_path=Path("component/references/actions/spec-review.md")
        )

        self.assertNotIn("Task tool", result)
        self.assertNotIn("run_in_background", result)
        self.assertIn("Use parallel agent review when available", result)
        self.assertIn("single-agent fallback", result)

    def test_adapter_keeps_figma_optional_for_screen_skill(self):
        source = '→ Warn: "Figma MCP not available. Continuing with text description."'

        result = apply_adapter_text(
            source, relative_path=Path("design-screen/SKILL.md")
        )

        self.assertIn("Figma MCP not available", result)
        self.assertIn("Continuing with text description", result)

    def test_adapter_rewrites_craft_missing_figma_to_ship_fallback(self):
        source = '| **E1** | `search_design_system` not available | "Figma MCP not available. Install: [link]" | Install Figma MCP |'

        result = apply_adapter_text(
            source, relative_path=Path("design-screen/references/actions/craft.md")
        )

        self.assertIn("Figma MCP write capability is unavailable", result)
        self.assertIn("skip craft and continue with `ship`", result)

    def test_write_upstream_record(self):
        with tempfile.TemporaryDirectory() as tmp:
            destination = Path(tmp) / "UPSTREAM.json"
            write_upstream_record(
                destination,
                repo_url="https://github.com/Maximepodgorski/agent-skills",
                branch="main",
                commit="92eb9b0e98ce31b41c521d1d3666f09886054be3",
                included_paths=["LICENSE", "component", "design-screen"],
                sync_timestamp="2026-04-25T00:00:00Z",
            )

            data = json.loads(destination.read_text(encoding="utf-8"))

        self.assertEqual("https://github.com/Maximepodgorski/agent-skills", data["repo_url"])
        self.assertEqual("main", data["branch"])
        self.assertEqual("92eb9b0e98ce31b41c521d1d3666f09886054be3", data["commit"])
        self.assertEqual(["LICENSE", "component", "design-screen"], data["included_paths"])
        self.assertEqual(ADAPTER_VERSION, data["adapter_version"])


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
python -m unittest tests.test_sync_maxime_agent_skills -v
```

Expected: FAIL with `ModuleNotFoundError: No module named 'scripts.sync_maxime_agent_skills'`.

- [ ] **Step 3: Create the sync script**

Create `scripts/sync_maxime_agent_skills.py`:

```python
#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import tempfile
from datetime import UTC, datetime
from pathlib import Path


REPO_URL = "https://github.com/Maximepodgorski/agent-skills"
DEFAULT_BRANCH = "main"
ADAPTER_VERSION = "2026-04-25.1"
INCLUDED_PATHS = ["LICENSE", "component", "design-screen"]


def apply_adapter_text(text: str, relative_path: Path) -> str:
    replacements = {
        "Read `CLAUDE.md` + codebase": (
            "Read repo agent guidance and codebase: use AGENTS.md for Codex, "
            "CLAUDE.md for Claude, and read both when both exist"
        ),
        "Read CLAUDE.md → project conventions, stack, patterns": (
            "Read repo agent guidance (AGENTS.md for Codex, CLAUDE.md for Claude) "
            "plus codebase conventions, stack, and patterns"
        ),
        "Project conventions (from CLAUDE.md + codebase patterns)": (
            "Project conventions (from repo agent guidance and codebase patterns)"
        ),
        "CLAUDE.md / .cursorrules / AGENTS.md → project conventions": (
            "AGENTS.md / CLAUDE.md / .cursorrules → project conventions"
        ),
        "Launch 4 subagents in parallel (use Task tool with `run_in_background` or parallel calls).": (
            "Use parallel agent review when available, one reviewer per perspective. "
            "If the active agent runtime has no parallel-agent facility, use the single-agent fallback "
            "and review each perspective sequentially."
        ),
        "Launch ALL perspectives as parallel sub-agents (single message, multiple Task tool calls).": (
            "Use parallel agent review when available, one reviewer per perspective. "
            "If unavailable, use the single-agent fallback and evaluate each perspective sequentially."
        ),
        "Deep adversarial analysis of a screen spec. Dynamic perspective selection based on screen type, parallel sub-agents, action-driven findings.": (
            "Deep adversarial analysis of a screen spec. Dynamic perspective selection based on screen type, "
            "parallel agent review when available, and a single-agent fallback for action-driven findings."
        ),
        '| **E1** | `search_design_system` not available | "Figma MCP not available. Install: [link]" | Install Figma MCP |': (
            '| **E1** | `search_design_system` not available | "Figma MCP write capability is unavailable. Skip craft and continue with `ship`." | Use the non-Figma `ship` path |'
        ),
        "{E1:} Figma MCP not available. Install: https://github.com/anthropics/claude-code/blob/main/docs/figma.md": (
            "{E1:} Figma MCP write capability is unavailable. Skip craft and continue with `ship`."
        ),
        "{E1:} Install Figma MCP, then re-run `/design-screen craft`": (
            "{E1:} Use `/design-screen ship` to continue without the Figma craft step."
        ),
        "- **Load figma-use skill** — MANDATORY before any `use_figma` call": (
            "- **Figma write helper** — when a runtime provides a Figma write helper, load it before any Figma write call"
        ),
        "`figma-use` skill | Loaded before any `use_figma` call | → Load it": (
            "Figma write helper | Loaded before any Figma write call when available | → Load it"
        ),
    }

    adapted = text
    for source, replacement in replacements.items():
        adapted = adapted.replace(source, replacement)

    if relative_path.name == "SKILL.md" and str(relative_path).split("/", 1)[0] in {
        "component",
        "design-screen",
    }:
        adapted = adapted.replace(
            "---\n",
            "---\n"
            "x-upstream-source: Maximepodgorski/agent-skills\n"
            f"x-adapter-version: {ADAPTER_VERSION}\n",
            1,
        )

    return adapted


def copy_tree(source: Path, destination: Path) -> None:
    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(source, destination)


def copy_file(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def write_upstream_record(
    destination: Path,
    *,
    repo_url: str,
    branch: str,
    commit: str,
    included_paths: list[str],
    sync_timestamp: str,
) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "repo_url": repo_url,
        "branch": branch,
        "commit": commit,
        "included_paths": included_paths,
        "sync_timestamp": sync_timestamp,
        "adapter_version": ADAPTER_VERSION,
    }
    destination.write_text(json.dumps(payload, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def clone_upstream(branch: str) -> tuple[Path, tempfile.TemporaryDirectory[str]]:
    tmp = tempfile.TemporaryDirectory(prefix="agent-skills-")
    root = Path(tmp.name)
    subprocess.run(
        ["git", "clone", "--depth", "1", "--branch", branch, REPO_URL, str(root)],
        check=True,
    )
    return root, tmp


def current_commit(repo: Path) -> str:
    result = subprocess.run(
        ["git", "-C", str(repo), "rev-parse", "HEAD"],
        check=True,
        text=True,
        capture_output=True,
    )
    return result.stdout.strip()


def sync(repo_root: Path, branch: str = DEFAULT_BRANCH) -> None:
    upstream_root, tmp = clone_upstream(branch)
    try:
        vendor_root = repo_root / "vendor" / "maxime-agent-skills"
        plugin_skills = repo_root / "plugin" / "skills"

        vendor_root.mkdir(parents=True, exist_ok=True)
        copy_file(upstream_root / "LICENSE", vendor_root / "LICENSE")
        copy_tree(upstream_root / "component", vendor_root / "component")
        copy_tree(upstream_root / "design-screen", vendor_root / "design-screen")

        write_upstream_record(
            vendor_root / "UPSTREAM.json",
            repo_url=REPO_URL,
            branch=branch,
            commit=current_commit(upstream_root),
            included_paths=INCLUDED_PATHS,
            sync_timestamp=datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z"),
        )

        for skill_name in ["component", "design-screen"]:
            source_dir = vendor_root / skill_name
            generated_dir = plugin_skills / skill_name
            copy_tree(source_dir, generated_dir)
            for markdown_path in generated_dir.rglob("*.md"):
                relative_path = markdown_path.relative_to(generated_dir.parent)
                adapted = apply_adapter_text(
                    markdown_path.read_text(encoding="utf-8"),
                    relative_path=relative_path,
                )
                markdown_path.write_text(adapted, encoding="utf-8")
    finally:
        tmp.cleanup()


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--branch", default=DEFAULT_BRANCH)
    parser.add_argument("--repo-root", default=Path(__file__).resolve().parents[1], type=Path)
    args = parser.parse_args()
    sync(args.repo_root, branch=args.branch)


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run adapter tests**

Run:

```bash
python -m unittest tests.test_sync_maxime_agent_skills -v
```

Expected: PASS.

- [ ] **Step 5: Commit**

Run:

```bash
git add scripts/sync_maxime_agent_skills.py tests/test_sync_maxime_agent_skills.py
git commit -m "test: cover upstream skill adapter"
```

---

### Task 3: Vendor Upstream Snapshot and Generate Runtime Skills

**Files:**
- Create: `vendor/maxime-agent-skills/**`
- Create: `plugin/skills/component/**`
- Create: `plugin/skills/design-screen/**`
- Modify: `tests/test_skill_description.py`

- [ ] **Step 1: Add generated-content tests**

Append these tests to `SkillDescriptionTests` in `tests/test_skill_description.py`:

```python
    def test_generated_upstream_skills_are_present(self):
        for skill_name in ["component", "design-screen"]:
            with self.subTest(skill_name=skill_name):
                skill_dir = PLUGIN_DIR / "skills" / skill_name
                self.assertTrue((skill_dir / "SKILL.md").is_file())
                self.assertTrue((skill_dir / "README.md").is_file())
                skill_text = (skill_dir / "SKILL.md").read_text(encoding="utf-8")
                self.assertIn("x-upstream-source: Maximepodgorski/agent-skills", skill_text)

    def test_upstream_provenance_and_license_are_present(self):
        vendor_dir = ROOT / "vendor" / "maxime-agent-skills"
        self.assertTrue((vendor_dir / "LICENSE").is_file())
        self.assertTrue((vendor_dir / "UPSTREAM.json").is_file())
        upstream = json.loads((vendor_dir / "UPSTREAM.json").read_text(encoding="utf-8"))
        self.assertEqual("https://github.com/Maximepodgorski/agent-skills", upstream["repo_url"])
        self.assertEqual(["LICENSE", "component", "design-screen"], upstream["included_paths"])
        self.assertIn("adapter_version", upstream)
        self.assertIn("MIT License", (vendor_dir / "LICENSE").read_text(encoding="utf-8"))

    def test_generated_skills_do_not_tell_codex_to_use_only_claude_md(self):
        generated_root = PLUGIN_DIR / "skills"
        offenders = []
        for skill_name in ["component", "design-screen"]:
            for path in (generated_root / skill_name).rglob("*.md"):
                text = path.read_text(encoding="utf-8")
                if "Read `CLAUDE.md` + codebase" in text:
                    offenders.append(str(path.relative_to(ROOT)))
                if "Read CLAUDE.md \u2192 project conventions" in text:
                    offenders.append(str(path.relative_to(ROOT)))
        self.assertEqual([], offenders)

    def test_design_screen_keeps_non_figma_path_when_figma_is_unavailable(self):
        craft_path = (
            PLUGIN_DIR
            / "skills"
            / "design-screen"
            / "references"
            / "actions"
            / "craft.md"
        )
        text = craft_path.read_text(encoding="utf-8")
        self.assertIn("Figma MCP write capability is unavailable", text)
        self.assertIn("continue with `ship`", text)

    def test_generated_skills_cover_ux_engineering_workflows(self):
        required_paths = [
            PLUGIN_DIR / "skills" / "component" / "references" / "actions" / "spec.md",
            PLUGIN_DIR / "skills" / "component" / "references" / "actions" / "dev.md",
            PLUGIN_DIR / "skills" / "component" / "references" / "actions" / "review.md",
            PLUGIN_DIR / "skills" / "component" / "references" / "principles" / "accessibility.md",
            PLUGIN_DIR / "skills" / "design-screen" / "references" / "actions" / "spec.md",
            PLUGIN_DIR / "skills" / "design-screen" / "references" / "actions" / "ship.md",
            PLUGIN_DIR / "skills" / "design-screen" / "references" / "principles" / "page-states.md",
            PLUGIN_DIR / "skills" / "design-screen" / "references" / "principles" / "responsive.md",
            PLUGIN_DIR / "skills" / "design-screen" / "references" / "principles" / "layout-patterns.md",
        ]

        for path in required_paths:
            with self.subTest(path=path):
                self.assertTrue(path.is_file())
```

- [ ] **Step 2: Run tests to verify failure**

Run:

```bash
python -m unittest tests.test_skill_description -v
```

Expected: FAIL because vendor and generated skills do not exist yet.

- [ ] **Step 3: Run the sync script**

Run:

```bash
python scripts/sync_maxime_agent_skills.py
```

Expected:

- `vendor/maxime-agent-skills/LICENSE` exists.
- `vendor/maxime-agent-skills/UPSTREAM.json` exists.
- `vendor/maxime-agent-skills/component/` exists.
- `vendor/maxime-agent-skills/design-screen/` exists.
- `plugin/skills/component/` exists.
- `plugin/skills/design-screen/` exists.

- [ ] **Step 4: Inspect generated adapter output**

Run:

```bash
rg -n "Read `CLAUDE.md` \\+ codebase|Read CLAUDE.md → project conventions|Task tool|run_in_background|figma-use" plugin/skills/component plugin/skills/design-screen
```

Expected: no matches for the old Claude-only or Claude Task-tool-specific instructions. If the command finds a match, update `scripts/sync_maxime_agent_skills.py`, rerun the script, and rerun tests.

- [ ] **Step 5: Run tests**

Run:

```bash
python -m unittest tests.test_sync_maxime_agent_skills tests.test_skill_description -v
```

Expected: PASS.

- [ ] **Step 6: Commit**

Run:

```bash
git add scripts/sync_maxime_agent_skills.py tests/test_skill_description.py vendor/maxime-agent-skills plugin/skills/component plugin/skills/design-screen
git commit -m "feat: generate upstream design system skills"
```

---

### Task 4: Update Repo Guidance and Plugin Docs

**Files:**
- Modify: `README.md`
- Modify: `plugin/AGENTS.md`
- Modify: `plugin/CLAUDE.md`
- Modify: `plugin/README.md`
- Modify: `plugin/repo-map.json`

- [ ] **Step 1: Update repo README**

Update `README.md` so the top-level repo accurately describes the post-expansion UX-engineer workflow:

```markdown
# ad-design-system

Accelerate Data's design system repo. Two distinct kinds of content live here:

1. **The `design-system` Claude/Codex plugin** under [`plugin/`](./plugin).
2. **Brand reference material** at the repo root — logo assets, brand book, theme configs, documentation. Maintained alongside the plugin but **not shipped with it**.
```

Update the install command:

```bash
claude marketplace add accelerate-data/plugin-marketplace
claude plugin install design-system@ad-internal-marketplace
```

Add this workflow summary under the plugin section:

```markdown
The expanded plugin supports UX-engineering work across three layers:

- `applying-design-system` — AD-owned brand application: colors, typography, spacing, logos, motion, layout tone.
- `component` — upstream-attributed component workflow: spec, docs, dev, review, spec-review, audit.
- `design-screen` — upstream-attributed screen workflow: compose screens from existing components, check responsive behavior and page states, then ship.

Use the root logo docs and brand book for source reference, but keep runtime skill guidance inside `plugin/`.
```

Update the version note to say both `plugin/.claude-plugin/plugin.json` and `plugin/.codex-plugin/plugin.json` carry the plugin version and CI enforces matching bumped versions.

- [ ] **Step 2: Update plugin guidance**

Update `plugin/AGENTS.md` to keep the existing sections and add these facts:

```markdown
## Generated Upstream Skills

`skills/component/` and `skills/design-screen/` are generated from `../vendor/maxime-agent-skills/` plus the deterministic adapter in `../scripts/sync_maxime_agent_skills.py`.

- Do not hand-edit generated upstream-derived skill content unless the change is a one-off emergency repair.
- Prefer changing `scripts/sync_maxime_agent_skills.py`, rerunning it, and reviewing the generated diff.
- Preserve upstream attribution from `Maximepodgorski/agent-skills`.
- Preserve `../vendor/maxime-agent-skills/LICENSE` and `../vendor/maxime-agent-skills/UPSTREAM.json`.

The AD-owned runtime skill is `skills/applying-design-system/`.
```

In the same file, update any legacy AD-prefixed skill references to `applying-design-system`.

Add this UX-engineering coverage rule:

```markdown
## UX Engineering Coverage

The plugin should give engineers enough guidance to build usable product UI, not just brand-colored UI:

- `applying-design-system` covers AD brand application, visual tone, logos, color, type, spacing, layout, and motion.
- `component` covers component spec, documentation, implementation, review, accessibility, token usage, and audit.
- `design-screen` covers screen composition from existing components, responsive behavior, page states, and implementation handoff.

When changing generated upstream-derived skills, keep this coverage intact and update evals if routing or fallback behavior changes.
```

- [ ] **Step 3: Update Claude routing**

Update `plugin/CLAUDE.md` skill list to include:

```markdown
- `skills/applying-design-system/SKILL.md` — brand-compliant UI for any Accelerate Data surface (product, marketing, docs, demos)
- `skills/component/SKILL.md` — attributed upstream component specification, documentation, implementation, review, spec-review, and audit workflow
- `skills/design-screen/SKILL.md` — attributed upstream screen composition workflow using existing design-system components
```

Also update old install-boundary wording from `ad-design-system` to `design-system` where it describes plugin identity, not repository name.

- [ ] **Step 4: Update plugin README**

Update `plugin/README.md` layout block to include:

```text
plugin/
├── .claude-plugin/plugin.json
├── .codex-plugin/plugin.json
├── skills/
│   ├── applying-design-system/
│   ├── component/
│   └── design-screen/
├── AGENTS.md
├── CLAUDE.md
├── repo-map.json
└── README.md
```

Update install commands:

```bash
claude marketplace add accelerate-data/plugin-marketplace
claude plugin install design-system@ad-internal-marketplace
```

Update local symlink examples:

```bash
mkdir -p ~/.claude/skills ~/.codex/skills

ln -s /absolute/path/to/ad-design-system/plugin/skills/applying-design-system \
  ~/.claude/skills/applying-design-system

ln -s /absolute/path/to/ad-design-system/plugin/skills/component \
  ~/.claude/skills/component

ln -s /absolute/path/to/ad-design-system/plugin/skills/design-screen \
  ~/.claude/skills/design-screen
```

Repeat the same three skill symlinks for `~/.codex/skills`.

Update current skills:

```markdown
- `applying-design-system` — AD-owned brand-compliant visual guidance for all Accelerate Data surfaces.
- `component` — upstream-attributed design-system component workflow.
- `design-screen` — upstream-attributed screen composition workflow.
```

Add this UX-engineer workflow table:

```markdown
## UX Engineering Workflows

| Need | Use |
|---|---|
| Apply AD brand tone, colors, typography, spacing, logos, and motion | `applying-design-system` |
| Specify, document, implement, or review a reusable component | `component` |
| Compose a screen from existing components and ship it | `design-screen` |
| Check accessibility, token usage, variants, and component API quality | `component review` or `component audit` |
| Check responsive behavior, loading/empty/error states, and layout composition | `design-screen review` |
| Continue without Figma | Use text/codebase mode; skip `design-screen craft` and continue with `design-screen ship` |
```

- [ ] **Step 5: Update repo map**

Update `plugin/repo-map.json` so:

- `applications[0].description` says the plugin ships three skills and lives under `plugin/`.
- `key_directories` includes `../vendor/maxime-agent-skills/`.
- `skills` contains `applying-design-system`, `component`, and `design-screen`.
- `notes_for_agents` includes the generated-content rule.
- `notes_for_agents` includes a UX-engineering coverage note covering brand application, component workflow, screen composition, accessibility, responsive behavior, and page states.

Use valid JSON and preserve relative paths from the `plugin/` directory.

- [ ] **Step 6: Run guidance checks**

Run:

```bash
python -m json.tool plugin/repo-map.json >/dev/null
rg -n "applying[-]ad[-]design[-]system|ad-design-system[@]ad-internal-marketplace" README.md plugin logo docs/design
python -m unittest tests.test_skill_description -v
```

Expected:

- `json.tool` exits 0.
- `rg` exits 1 with no stale live references.
- Tests pass.

- [ ] **Step 7: Commit**

Run:

```bash
git add README.md plugin/AGENTS.md plugin/CLAUDE.md plugin/README.md plugin/repo-map.json
git commit -m "docs: document design system plugin expansion"
```

---

### Task 5: Add Focused Promptfoo Smoke Evals

**Files:**
- Create: `tests/evals/package.json`
- Create: `tests/evals/providers/design-system-router.js`
- Create: `tests/evals/promptfooconfig.yaml`
- Create: `tests/evals/README.md`

- [ ] **Step 1: Create eval package metadata**

Create `tests/evals/package.json`:

```json
{
  "name": "ad-design-system-evals",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "eval": "promptfoo eval -c promptfooconfig.yaml"
  },
  "devDependencies": {
    "promptfoo": "0.121.5"
  }
}
```

- [ ] **Step 2: Create deterministic local eval provider**

Create `tests/evals/providers/design-system-router.js`:

```javascript
function route(prompt) {
  const text = prompt.toLowerCase();

  if (
    text.includes("brand-compliant") ||
    text.includes("logo usage") ||
    text.includes("accelerate data dashboard")
  ) {
    return [
      "skill: applying-design-system",
      "reason: request is about AD-owned visual brand compliance",
      "fallback: no special fallback needed",
      "attribution: AD-owned",
    ].join("\n");
  }

  if (
    text.includes("button component") ||
    text.includes("component spec") ||
    text.includes("spec-review") ||
    text.includes("accessibility") ||
    text.includes("keyboard")
  ) {
    return [
      "skill: component",
      "reason: request is about a design-system component workflow, including accessibility and token checks",
      "fallback: use text/codebase mode when Figma is unavailable; read AGENTS.md for Codex and CLAUDE.md for Claude when present",
      "attribution: upstream Maximepodgorski/agent-skills",
    ].join("\n");
  }

  if (
    text.includes("billing settings screen") ||
    text.includes("compose") ||
    text.includes("existing components") ||
    text.includes("responsive") ||
    text.includes("empty state") ||
    text.includes("loading state") ||
    text.includes("error state")
  ) {
    return [
      "skill: design-screen",
      "reason: request is about composing a screen from existing components, including responsive behavior and page states",
      "fallback: Figma write access unavailable, skip craft and continue with ship",
      "attribution: upstream Maximepodgorski/agent-skills",
    ].join("\n");
  }

  return [
    "skill: applying-design-system",
    "reason: default to AD-owned design-system guidance for generic AD UI requests",
    "fallback: no special fallback needed",
    "attribution: AD-owned",
  ].join("\n");
}

module.exports = {
  id: () => "design-system-router",
  callApi: async (prompt) => ({
    output: route(prompt),
  }),
};
```

- [ ] **Step 3: Create smoke eval suite**

Create `tests/evals/promptfooconfig.yaml`:

```yaml
description: Design system plugin takeover smoke evals

providers:
  - id: file://providers/design-system-router.js

prompts:
  - |
    You are evaluating the design-system plugin instructions.

    Installed skills:
    - applying-design-system: AD-owned brand-compliant visual guidance for Accelerate Data and vibeData surfaces.
    - component: upstream-attributed workflow from Maximepodgorski/agent-skills for design-system component spec, docs, dev, review, spec-review, and audit.
    - design-screen: upstream-attributed workflow from Maximepodgorski/agent-skills for composing screens from existing design-system components.

    Runtime rules:
    - Use AGENTS.md for Codex, CLAUDE.md for Claude, and read both when both exist.
    - Figma is optional for component and design-screen spec; continue from text/codebase context when unavailable.
    - design-screen craft requires Figma write capability. If unavailable, skip craft and continue with design-screen ship.
    - UX-engineering coverage includes brand application, component workflows, accessibility, responsive behavior, page states, and Figma-free implementation handoff.

    User request: {{request}}

    Respond with:
    skill: <skill name>
    reason: <why>
    fallback: <fallback behavior if relevant>
    attribution: <upstream or AD-owned>

tests:
  - vars:
      request: Review this Accelerate Data dashboard for brand-compliant colors, typography, and logo usage.
    assert:
      - type: contains
        value: "skill: applying-design-system"
      - type: contains
        value: "AD-owned"

  - vars:
      request: Spec a Button component from our design system. I do not have Figma available, but I can describe the states.
    assert:
      - type: contains
        value: "skill: component"
      - type: contains
        value: "text/codebase"
      - type: contains
        value: "upstream"

  - vars:
      request: Compose a billing settings screen from existing components and then build it. Figma write access is unavailable.
    assert:
      - type: contains
        value: "skill: design-screen"
      - type: contains
        value: "skip craft"
      - type: contains
        value: "ship"

  - vars:
      request: In Codex, implement component spec-review for a Modal and check the repo conventions.
    assert:
      - type: contains
        value: "skill: component"
      - type: not-contains
        value: "only CLAUDE.md"
      - type: contains
        value: "AGENTS.md"

  - vars:
      request: Review a form field component for keyboard accessibility, token usage, variants, and component API quality.
    assert:
      - type: contains
        value: "skill: component"
      - type: contains
        value: "accessibility"
      - type: contains
        value: "token"

  - vars:
      request: Compose a responsive onboarding screen using existing components, including loading state, empty state, and error state.
    assert:
      - type: contains
        value: "skill: design-screen"
      - type: contains
        value: "responsive"
      - type: contains
        value: "page states"
```

This is an intentionally small smoke suite. It verifies takeover-specific behavior instead of attempting to prove the whole upstream workflow.

- [ ] **Step 4: Document eval usage**

Create `tests/evals/README.md`:

````markdown
# Design System Evals

Focused Promptfoo smoke evals for the `design-system` plugin takeover.

These evals cover:

- Routing between `applying-design-system`, `component`, and `design-screen`.
- Upstream attribution for generated `component` and `design-screen` skills.
- Codex/Claude repo-guidance portability.
- Figma-unavailable fallback behavior.
- UX-engineer coverage for brand application, component workflow, screen composition, accessibility, responsive behavior, page states, and Figma-free fallback.

Run:

```bash
cd tests/evals
npm install
npm run eval
```

The suite is intentionally small. Unit tests and generated-content checks remain the source of truth for exact file content.
````

- [ ] **Step 5: Install eval dependencies and run evals**

Run:

```bash
cd tests/evals
npm install
npm run eval
```

Expected: all four eval cases pass.

- [ ] **Step 6: Commit**

Run:

```bash
git add tests/evals/package.json tests/evals/package-lock.json tests/evals/providers/design-system-router.js tests/evals/promptfooconfig.yaml tests/evals/README.md
git commit -m "test: add design system takeover evals"
```

---

### Task 6: Add Weekly Upstream Sync Workflow and Version Gate Fix

**Files:**
- Create: `.github/workflows/sync-upstream-skills.yml`
- Modify: `.github/workflows/version-bump-check.yml`

- [ ] **Step 1: Update version-bump workflow**

Modify `.github/workflows/version-bump-check.yml` so it reads both manifest versions and fails if:

- `plugin/.claude-plugin/plugin.json` and `plugin/.codex-plugin/plugin.json` differ in the PR.
- The PR version is equal to or lower than `origin/main` Claude manifest version.

Use this shell block for the check step:

```bash
CLAUDE_PR=$(jq -r .version plugin/.claude-plugin/plugin.json)
CODEX_PR=$(jq -r .version plugin/.codex-plugin/plugin.json)
MAIN=$(git show origin/main:plugin/.claude-plugin/plugin.json 2>/dev/null | jq -r '.version // empty' || echo "0.0.0")

if [ "$CLAUDE_PR" != "$CODEX_PR" ]; then
  echo "Plugin manifest versions must match."
  echo "  claude: $CLAUDE_PR"
  echo "  codex:  $CODEX_PR"
  exit 1
fi

LOWER=$(printf '%s\n%s\n' "$CLAUDE_PR" "$MAIN" | sort -V | head -1)
if [ "$CLAUDE_PR" = "$MAIN" ] || [ "$LOWER" = "$CLAUDE_PR" ]; then
  echo "plugin manifest version was not bumped or was downgraded."
  echo "  main: $MAIN"
  echo "  PR:   $CLAUDE_PR"
  exit 1
fi

echo "Version bumped: $MAIN -> $CLAUDE_PR"
```

- [ ] **Step 2: Create weekly sync workflow**

Create `.github/workflows/sync-upstream-skills.yml`:

```yaml
name: sync-upstream-skills

on:
  schedule:
    - cron: "0 9 * * 1"
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  sync-upstream-skills:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Regenerate upstream skills
        run: python scripts/sync_maxime_agent_skills.py

      - name: Run checks
        run: |
          git diff --check
          python -m unittest tests.test_sync_maxime_agent_skills tests.test_skill_description -v
          cd tests/evals
          npm ci
          npm run eval

      - name: Open pull request
        uses: peter-evans/create-pull-request@v6
        with:
          branch: chore/sync-upstream-design-system-skills
          title: "chore: sync upstream design system skills"
          commit-message: "chore: sync upstream design system skills"
          body: |
            Regenerates `component` and `design-screen` from `Maximepodgorski/agent-skills`.

            Review the generated runtime skill diff before merge because skill text is runtime behavior.
          labels: dependencies
```

- [ ] **Step 3: Run workflow syntax and tests locally**

Run:

```bash
python -m unittest tests.test_sync_maxime_agent_skills tests.test_skill_description -v
git diff --check
```

Expected: PASS and no whitespace errors.

- [ ] **Step 4: Commit**

Run:

```bash
git add .github/workflows/sync-upstream-skills.yml .github/workflows/version-bump-check.yml
git commit -m "ci: sync upstream design system skills"
```

---

### Task 7: Final Verification and Plugin Validation

**Files:**
- No planned source edits. Fix any failing check in the owning task's files.

- [ ] **Step 1: Run all Python tests**

Run:

```bash
python -m unittest discover -v
```

Expected: PASS.

- [ ] **Step 2: Run evals**

Run:

```bash
cd tests/evals
npm ci
npm run eval
```

Expected: PASS.

- [ ] **Step 3: Run repo diff checks**

Run:

```bash
git diff --check
python -m json.tool plugin/.claude-plugin/plugin.json >/dev/null
python -m json.tool plugin/.codex-plugin/plugin.json >/dev/null
python -m json.tool plugin/repo-map.json >/dev/null
python -m json.tool vendor/maxime-agent-skills/UPSTREAM.json >/dev/null
```

Expected: all commands exit 0.

- [ ] **Step 4: Validate plugin manifests when local validator is available**

Run:

```bash
claude plugin validate plugin
```

Expected: validator passes. If `claude` is not installed or the command is unavailable, record the exact command failure in the implementation summary and rely on JSON validation plus unit tests.

- [ ] **Step 5: Run targeted content checks**

Run:

```bash
rg -n "Read `CLAUDE.md` \\+ codebase|Read CLAUDE.md → project conventions|Task tool|run_in_background|figma-use|applying[-]ad[-]design[-]system|ad-design-system[@]ad-internal-marketplace" README.md plugin logo docs/design tests scripts vendor
```

Expected: no matches. If matches remain, update the relevant source or adapter and rerun the sync script.

- [ ] **Step 6: Inspect generated diff**

Run:

```bash
git status --short
git diff --stat
git diff -- plugin/.claude-plugin/plugin.json plugin/.codex-plugin/plugin.json plugin/AGENTS.md plugin/README.md plugin/repo-map.json
```

Expected: diff shows the intended identity, generated skills, vendor source, docs, tests, script, and workflows only.

- [ ] **Step 7: Commit any verification fixes**

If Step 1-5 required fixes, commit them:

```bash
git add .
git commit -m "fix: complete design system plugin verification"
```

If no fixes were required, do not create an empty commit.

---

## Self-Review Checklist

- [ ] Every design goal maps to a task:
  - Plugin identity rename: Task 1.
  - First-party skill rename: Task 1.
  - Upstream generated skills: Tasks 2 and 3.
  - Attribution, license, provenance: Tasks 2 and 3.
  - Codex `CLAUDE.md` adaptation: Tasks 2 and 3.
  - Figma optionality: Tasks 2 and 3.
  - Repo guidance: Task 4.
  - Focused takeover evals: Task 5.
  - Weekly sync workflow: Task 6.
  - Verification: Task 7.
- [ ] No task depends on files outside `plugin/`, `vendor/`, `scripts/`, `tests/`, `.github/`, or docs.
- [ ] Root brand assets under `logo/` remain untouched.
- [ ] Generated skill edits flow through `scripts/sync_maxime_agent_skills.py`.
- [ ] Both manifests keep the same version.
- [ ] The final branch has no root plugin manifests.
