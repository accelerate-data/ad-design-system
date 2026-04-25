#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import tempfile
from datetime import UTC, datetime
from pathlib import Path


REPO_URL = "https://github.com/Maximepodgorski/agent-skills"
DEFAULT_BRANCH = "main"
ADAPTER_VERSION = "2026-04-25.1"
INCLUDED_PATHS = ["LICENSE", "component", "design-screen"]
UPSTREAM_SOURCE = "Maximepodgorski/agent-skills"


PARALLEL_AGENT_REPLACEMENT = (
    "Use parallel agent review when available, one reviewer per perspective. "
    "If the active agent runtime has no parallel-agent facility, use the "
    "single-agent fallback and review each perspective sequentially."
)
ADAPTER_REPLACEMENTS = {
    "Read `CLAUDE.md` + codebase": (
        "Read repo agent guidance and codebase: use AGENTS.md for Codex, "
        "CLAUDE.md for Claude, and read both when both exist"
    ),
    "Read CLAUDE.md -> project conventions, stack, patterns": (
        "Read repo agent guidance (AGENTS.md for Codex, CLAUDE.md for Claude) "
        "plus codebase conventions, stack, and patterns"
    ),
    "Read CLAUDE.md \u2192 project conventions, stack, patterns": (
        "Read repo agent guidance (AGENTS.md for Codex, CLAUDE.md for Claude) "
        "plus codebase conventions, stack, and patterns"
    ),
    "Project conventions (from CLAUDE.md + codebase patterns)": (
        "Project conventions (from repo agent guidance and codebase patterns)"
    ),
    "CLAUDE.md / .cursorrules / AGENTS.md -> project conventions": (
        "AGENTS.md / CLAUDE.md / .cursorrules -> project conventions"
    ),
    "CLAUDE.md / .cursorrules / AGENTS.md \u2192 project conventions": (
        "AGENTS.md / CLAUDE.md / .cursorrules \u2192 project conventions"
    ),
    (
        "Launch 4 subagents in parallel (use Task tool with "
        "`run_in_background` or parallel calls)."
    ): (
        "Use parallel agent review when available, one reviewer per perspective. "
        "If the active agent runtime has no parallel-agent facility, use the "
        "single-agent fallback and review each perspective sequentially."
    ),
    (
        "Launch ALL perspectives as parallel sub-agents "
        "(single message, multiple Task tool calls)."
    ): (
        "Use parallel agent review when available, one reviewer per perspective. "
        "If unavailable, use the single-agent fallback and evaluate each "
        "perspective sequentially."
    ),
    (
        "- **Parallel execution:** All perspectives run simultaneously "
        "(single message, multiple Task calls)"
    ): PARALLEL_AGENT_REPLACEMENT,
    (
        "> **Agent:** Load this file when `spec-review` triggers. "
        "Launch 4 parallel subagents, one per perspective. Consolidate "
        "results into a single report."
    ): (
        "> **Agent:** Load this file when `spec-review` triggers. "
        f"{PARALLEL_AGENT_REPLACEMENT} Consolidate results into a single report."
    ),
    (
        "Deep adversarial analysis of a screen spec. Dynamic perspective "
        "selection based on screen type, parallel sub-agents, action-driven "
        "findings."
    ): (
        "Deep adversarial analysis of a screen spec. Dynamic perspective "
        "selection based on screen type, parallel agent review when available, "
        "and a single-agent fallback for action-driven findings."
    ),
    (
        '| **E1** | `search_design_system` not available | "Figma MCP not '
        'available. Install: [link]" | Install Figma MCP |'
    ): (
        '| **E1** | `search_design_system` not available | "Figma MCP write '
        'capability is unavailable. skip craft and continue with `ship`." | '
        "Use the non-Figma `ship` path |"
    ),
    (
        "{E1:} Figma MCP not available. Install: "
        "https://github.com/anthropics/claude-code/blob/main/docs/figma.md"
    ): (
        "{E1:} Figma MCP write capability is unavailable. skip craft and "
        "continue with `ship`."
    ),
    "{E1:} Install Figma MCP, then re-run `/design-screen craft`": (
        "{E1:} Use `/design-screen ship` to continue without the Figma craft step."
    ),
    "- **Load figma-use skill** \u2014 MANDATORY before any `use_figma` call": (
        "- **Figma write helper** - when a runtime provides a Figma write helper, "
        "load it before any Figma write call"
    ),
    "`figma-use` skill | Loaded before any `use_figma` call | -> Load it": (
        "Figma write helper | Loaded before any Figma write call when available | -> Load it"
    ),
    "`figma-use` skill | Loaded before any `use_figma` call | \u2192 Load it": (
        "Figma write helper | Loaded before any Figma write call when available | \u2192 Load it"
    ),
}


FIGMA_WRITE_HELPER_REPLACEMENT = (
    "> **Agent:** Load this file when `craft` triggers. Use a runtime-provided "
    "Figma write helper when available before any Figma write call."
)
ADAPTER_PATTERN_REPLACEMENTS = [
    (
        re.compile(
            r"\*\*Launch 4 subagents in parallel\*\* "
            r"\(use Task tool with `run_in_background` or parallel calls\)\. "
            r"Each subagent receives the full spec content and reviews from its "
            r"assigned perspective\."
        ),
        PARALLEL_AGENT_REPLACEMENT,
    ),
    (
        re.compile(
            r"\*\*Launch ALL perspectives as parallel sub-agents\*\* "
            r"\(single message, multiple Task tool calls\)\."
        ),
        PARALLEL_AGENT_REPLACEMENT,
    ),
    (
        re.compile(
            r"Launch ALL perspectives as parallel sub-agents "
            r"\(single message, multiple Task tool calls\)\."
        ),
        PARALLEL_AGENT_REPLACEMENT,
    ),
    (
        re.compile(
            r"- \*\*Parallel execution:\*\* All perspectives run simultaneously "
            r"\(single message, multiple Task calls\)"
        ),
        PARALLEL_AGENT_REPLACEMENT,
    ),
    (
        re.compile(
            r"> \*\*Agent:\*\* Load this file when `spec-review` triggers\. "
            r"Launch 4 parallel subagents, one per perspective\. Consolidate "
            r"results into a single report\."
        ),
        (
            "> **Agent:** Load this file when `spec-review` triggers. "
            f"{PARALLEL_AGENT_REPLACEMENT} Consolidate results into a single report."
        ),
    ),
    (
        re.compile(
            r"Launch 4 subagents in parallel "
            r"\(use Task tool with `run_in_background` or parallel calls\)\."
        ),
        PARALLEL_AGENT_REPLACEMENT,
    ),
    (
        re.compile(
            r"> \*\*Agent:\*\* Load this file when `craft` triggers\. "
            r"Also load the `figma-use` skill "
            r"\(MANDATORY before any `use_figma` call\)\. "
            r"Always pass `skillNames: \"figma-use\"` in every "
            r"`use_figma` call\."
        ),
        FIGMA_WRITE_HELPER_REPLACEMENT,
    ),
    (
        re.compile(r"Via `use_figma` \(follow figma-use skill patterns\):"),
        "Via a runtime-provided Figma write helper when available:",
    ),
    (
        re.compile(
            r"These are handled by the `figma-use` skill \u2014 load it before "
            r"writing any `use_figma` code\. Key constraints the agent must "
            r"respect:"
        ),
        (
            "Use runtime-provided Figma write helper patterns before writing "
            "any Figma automation code. Key constraints the agent must respect:"
        ),
    ),
    (
        re.compile(
            r"- \*\*`skillNames: \"figma-use\"`\*\* \u2014 pass in every "
            r"`use_figma` call \(logging parameter\)"
        ),
        (
            "- Use the runtime helper's required logging or attribution "
            "parameter when that helper exposes one."
        ),
    ),
]
STABLE_UPSTREAM_RECORD_FIELDS = [
    "repo_url",
    "branch",
    "commit",
    "included_paths",
    "adapter_version",
]


def apply_adapter_text(text: str, relative_path: Path) -> str:
    adapted = text
    for source, replacement in ADAPTER_REPLACEMENTS.items():
        adapted = adapted.replace(source, replacement)
    for pattern, replacement in ADAPTER_PATTERN_REPLACEMENTS:
        adapted = pattern.sub(replacement, adapted)

    if _needs_upstream_frontmatter(relative_path, adapted):
        adapted = _add_upstream_frontmatter(adapted)

    return adapted


def _needs_upstream_frontmatter(relative_path: Path, text: str) -> bool:
    return (
        relative_path.name == "SKILL.md"
        and relative_path.parts
        and relative_path.parts[0] in {"component", "design-screen"}
        and "x-upstream-source:" not in text
    )


def _add_upstream_frontmatter(text: str) -> str:
    upstream_lines = (
        f"x-upstream-source: {UPSTREAM_SOURCE}\n"
        f"x-adapter-version: {ADAPTER_VERSION}\n"
    )
    if text.startswith("---\n"):
        return text.replace("---\n", f"---\n{upstream_lines}", 1)
    return f"---\n{upstream_lines}---\n{text}"


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
    payload = build_upstream_record(
        repo_url=repo_url,
        branch=branch,
        commit=commit,
        included_paths=included_paths,
        sync_timestamp=sync_timestamp,
    )
    payload = _preserve_existing_sync_timestamp(destination, payload)
    destination.write_text(
        json.dumps(payload, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )


def write_third_party_notices(
    destination: Path,
    *,
    upstream_source: str,
    repo_url: str,
    included_paths: list[str],
    license_text: str,
) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    content = "\n".join(
        [
            "# Third-Party Notices",
            "",
            "This plugin includes generated runtime skill content derived from "
            f"`{upstream_source}`.",
            "",
            "## Maximepodgorski/agent-skills",
            "",
            f"- Upstream repository: {repo_url}",
            f"- Included paths: {', '.join(included_paths)}",
            "- Runtime copies: `skills/component/`, `skills/design-screen/`",
            "",
            "The upstream content is licensed under the MIT License:",
            "",
            "```text",
            license_text.strip(),
            "```",
            "",
        ]
    )
    destination.write_text(content, encoding="utf-8")


def build_upstream_record(
    *,
    repo_url: str,
    branch: str,
    commit: str,
    included_paths: list[str],
    sync_timestamp: str,
) -> dict[str, object]:
    return {
        "repo_url": repo_url,
        "branch": branch,
        "commit": commit,
        "included_paths": included_paths,
        "sync_timestamp": sync_timestamp,
        "adapter_version": ADAPTER_VERSION,
    }


def _preserve_existing_sync_timestamp(
    destination: Path, payload: dict[str, object]
) -> dict[str, object]:
    if not destination.exists():
        return payload

    try:
        existing = json.loads(destination.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return payload

    if not isinstance(existing, dict):
        return payload

    same_snapshot = all(
        existing.get(field) == payload.get(field)
        for field in STABLE_UPSTREAM_RECORD_FIELDS
    )
    if same_snapshot:
        payload["sync_timestamp"] = existing.get(
            "sync_timestamp", payload["sync_timestamp"]
        )

    return payload


def clone_upstream(branch: str) -> tuple[Path, tempfile.TemporaryDirectory[str]]:
    tmp = tempfile.TemporaryDirectory(prefix="agent-skills-")
    upstream_root = Path(tmp.name)
    subprocess.run(
        [
            "git",
            "clone",
            "--depth",
            "1",
            "--branch",
            branch,
            REPO_URL,
            str(upstream_root),
        ],
        check=True,
    )
    return upstream_root, tmp


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
        plugin_skills_root = repo_root / "plugin" / "skills"

        vendor_root.mkdir(parents=True, exist_ok=True)
        copy_file(upstream_root / "LICENSE", vendor_root / "LICENSE")
        license_text = (vendor_root / "LICENSE").read_text(encoding="utf-8")

        for skill_name in ["component", "design-screen"]:
            copy_tree(upstream_root / skill_name, vendor_root / skill_name)
            generated_dir = plugin_skills_root / skill_name
            copy_tree(vendor_root / skill_name, generated_dir)
            _adapt_markdown_tree(generated_dir, plugin_skills_root)

        write_upstream_record(
            vendor_root / "UPSTREAM.json",
            repo_url=REPO_URL,
            branch=branch,
            commit=current_commit(upstream_root),
            included_paths=INCLUDED_PATHS,
            sync_timestamp=_sync_timestamp(),
        )
        write_third_party_notices(
            repo_root / "plugin" / "THIRD_PARTY_NOTICES.md",
            upstream_source=UPSTREAM_SOURCE,
            repo_url=REPO_URL,
            included_paths=INCLUDED_PATHS,
            license_text=license_text,
        )
    finally:
        tmp.cleanup()


def _adapt_markdown_tree(root: Path, relative_root: Path) -> None:
    for markdown_path in root.rglob("*.md"):
        relative_path = markdown_path.relative_to(relative_root)
        adapted = apply_adapter_text(
            markdown_path.read_text(encoding="utf-8"),
            relative_path=relative_path,
        )
        markdown_path.write_text(adapted, encoding="utf-8")


def _sync_timestamp() -> str:
    return datetime.now(UTC).replace(microsecond=0).isoformat().replace("+00:00", "Z")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--branch", default=DEFAULT_BRANCH)
    parser.add_argument(
        "--repo-root",
        default=Path(__file__).resolve().parents[1],
        type=Path,
    )
    args = parser.parse_args()

    sync(args.repo_root, branch=args.branch)


if __name__ == "__main__":
    main()
