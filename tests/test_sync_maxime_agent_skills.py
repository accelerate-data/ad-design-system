import json
import tempfile
import unittest
from pathlib import Path

import scripts.sync_maxime_agent_skills as sync_script
from scripts.sync_maxime_agent_skills import (
    ADAPTER_VERSION,
    apply_adapter_text,
    write_upstream_record,
)


FORBIDDEN_RUNTIME_TERMS = [
    "Task calls",
    "Task tool",
    "run_in_background",
    "figma-use",
    "skillNames",
    "Launch 4 parallel subagents",
]


class SyncMaximeAgentSkillsTests(unittest.TestCase):
    def test_adapter_rewrites_claude_md_guidance(self):
        source = "- **Adapt to project**: Read `CLAUDE.md` + codebase."

        result = apply_adapter_text(source, relative_path=Path("component/SKILL.md"))

        self.assertNotIn("Read `CLAUDE.md` + codebase", result)
        self.assertIn("Read repo agent guidance", result)
        self.assertIn("AGENTS.md for Codex", result)
        self.assertIn("CLAUDE.md for Claude", result)

    def test_adapter_rewrites_parallel_subagents(self):
        source = (
            "Launch 4 subagents in parallel (use Task tool with "
            "`run_in_background` or parallel calls)."
        )

        result = apply_adapter_text(
            source, relative_path=Path("component/references/actions/spec-review.md")
        )

        self.assertNotIn("Task tool", result)
        self.assertNotIn("run_in_background", result)
        self.assertIn("Use parallel agent review when available", result)
        self.assertIn("single-agent fallback", result)

    def test_adapter_rewrites_bold_component_parallel_subagents_upstream_variant(self):
        source = (
            "**Launch 4 subagents in parallel** (use Task tool with "
            "`run_in_background` or parallel calls). Each subagent receives the "
            "full spec content and reviews from its assigned perspective."
        )

        result = apply_adapter_text(
            source, relative_path=Path("component/references/actions/spec-review.md")
        )

        for forbidden_term in FORBIDDEN_RUNTIME_TERMS:
            with self.subTest(forbidden_term=forbidden_term):
                self.assertNotIn(forbidden_term, result)
        self.assertIn("Use parallel agent review when available", result)
        self.assertIn("single-agent fallback", result)

    def test_adapter_rewrites_bold_parallel_subagents_upstream_variant(self):
        source = (
            "**Launch ALL perspectives as parallel sub-agents** "
            "(single message, multiple Task tool calls)."
        )

        result = apply_adapter_text(
            source,
            relative_path=Path("design-screen/references/actions/spec-review.md"),
        )

        for forbidden_term in FORBIDDEN_RUNTIME_TERMS:
            with self.subTest(forbidden_term=forbidden_term):
                self.assertNotIn(forbidden_term, result)
        self.assertIn("Use parallel agent review when available", result)
        self.assertIn("single-agent fallback", result)

    def test_adapter_rewrites_design_screen_multiple_task_calls_variant(self):
        source = (
            "- **Parallel execution:** All perspectives run simultaneously "
            "(single message, multiple Task calls)"
        )

        result = apply_adapter_text(
            source,
            relative_path=Path("design-screen/references/actions/spec-review.md"),
        )

        for forbidden_term in FORBIDDEN_RUNTIME_TERMS:
            with self.subTest(forbidden_term=forbidden_term):
                self.assertNotIn(forbidden_term, result)
        self.assertIn("Use parallel agent review when available", result)
        self.assertIn("single-agent fallback", result)

    def test_adapter_rewrites_component_agent_parallel_subagents_note(self):
        source = (
            "> **Agent:** Load this file when `spec-review` triggers. "
            "Launch 4 parallel subagents, one per perspective. Consolidate "
            "results into a single report."
        )

        result = apply_adapter_text(
            source, relative_path=Path("component/references/actions/spec-review.md")
        )

        for forbidden_term in FORBIDDEN_RUNTIME_TERMS:
            with self.subTest(forbidden_term=forbidden_term):
                self.assertNotIn(forbidden_term, result)
        self.assertIn("Use parallel agent review when available", result)
        self.assertIn("single-agent fallback", result)

    def test_adapter_keeps_figma_optional_for_screen_skill(self):
        source = '-> Warn: "Figma MCP not available. Continuing with text description."'

        result = apply_adapter_text(
            source, relative_path=Path("design-screen/SKILL.md")
        )

        self.assertIn("Figma MCP not available", result)
        self.assertIn("Continuing with text description", result)

    def test_adapter_rewrites_craft_missing_figma_to_ship_fallback(self):
        source = (
            '| **E1** | `search_design_system` not available | "Figma MCP not '
            'available. Install: [link]" | Install Figma MCP |'
        )

        result = apply_adapter_text(
            source, relative_path=Path("design-screen/references/actions/craft.md")
        )

        self.assertIn("Figma MCP write capability is unavailable", result)
        self.assertIn("skip craft and continue with `ship`", result)

    def test_adapter_rewrites_figma_use_upstream_agent_line(self):
        source = (
            "> **Agent:** Load this file when `craft` triggers. Also load the "
            "`figma-use` skill (MANDATORY before any `use_figma` call). Always "
            'pass `skillNames: "figma-use"` in every `use_figma` call.'
        )

        result = apply_adapter_text(
            source, relative_path=Path("design-screen/references/actions/craft.md")
        )

        self.assertNotIn("figma-use", result)
        self.assertNotIn("skillNames", result)
        self.assertIn("Figma write helper", result)

    def test_adapter_rewrites_current_figma_use_craft_lines(self):
        source = "\n".join(
            [
                "Via `use_figma` (follow figma-use skill patterns):",
                (
                    "These are handled by the `figma-use` skill — load it "
                    "before writing any `use_figma` code. Key constraints the "
                    "agent must respect:"
                ),
                (
                    '- **`skillNames: "figma-use"`** — pass in every '
                    "`use_figma` call (logging parameter)"
                ),
            ]
        )

        result = apply_adapter_text(
            source, relative_path=Path("design-screen/references/actions/craft.md")
        )

        self.assertNotIn("figma-use", result)
        self.assertNotIn("skillNames", result)
        self.assertIn("Figma write helper", result)
        self.assertIn("runtime-provided", result)

    def test_adapter_rewrites_design_screen_readme_figma_guidance(self):
        source = "\n".join(
            [
                (
                    "| Figma MCP connected to your agent | Run `/mcp` in "
                    'Claude Code — should show "figma" as connected |'
                ),
                '| "Figma MCP not available" | Run `/mcp` to connect Figma |',
            ]
        )

        result = apply_adapter_text(source, relative_path=Path("design-screen/README.md"))

        self.assertNotIn("Claude Code", result)
        self.assertNotIn("Run `/mcp` to connect Figma", result)
        self.assertIn("Figma write capability available", result)
        self.assertIn("Skip `craft`", result)
        self.assertIn("`/design-screen ship`", result)

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

        self.assertEqual(
            "https://github.com/Maximepodgorski/agent-skills", data["repo_url"]
        )
        self.assertEqual("main", data["branch"])
        self.assertEqual(
            "92eb9b0e98ce31b41c521d1d3666f09886054be3", data["commit"]
        )
        self.assertEqual(
            ["LICENSE", "component", "design-screen"], data["included_paths"]
        )
        self.assertEqual("2026-04-25T00:00:00Z", data["sync_timestamp"])
        self.assertEqual(ADAPTER_VERSION, data["adapter_version"])

    def test_write_upstream_record_preserves_timestamp_when_snapshot_matches(self):
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
            write_upstream_record(
                destination,
                repo_url="https://github.com/Maximepodgorski/agent-skills",
                branch="main",
                commit="92eb9b0e98ce31b41c521d1d3666f09886054be3",
                included_paths=["LICENSE", "component", "design-screen"],
                sync_timestamp="2026-04-25T01:00:00Z",
            )

            data = json.loads(destination.read_text(encoding="utf-8"))

        self.assertEqual("2026-04-25T00:00:00Z", data["sync_timestamp"])

    def test_sync_adapts_fake_upstream_and_preserves_stable_upstream_record(self):
        with tempfile.TemporaryDirectory() as tmp:
            tmp_root = Path(tmp)
            upstream = tmp_root / "upstream"
            repo_root = tmp_root / "repo"
            self._write_fake_upstream(upstream)

            cleanup = _NoopCleanup()
            original_clone_upstream = sync_script.clone_upstream
            original_current_commit = sync_script.current_commit
            original_sync_timestamp = sync_script._sync_timestamp
            timestamps = iter(["2026-04-25T00:00:00Z", "2026-04-25T01:00:00Z"])

            try:
                sync_script.clone_upstream = lambda branch: (upstream, cleanup)
                sync_script.current_commit = (
                    lambda repo: "92eb9b0e98ce31b41c521d1d3666f09886054be3"
                )
                sync_script._sync_timestamp = lambda: next(timestamps)

                sync_script.sync(repo_root)
                first_upstream = json.loads(
                    (
                        repo_root / "vendor" / "maxime-agent-skills" / "UPSTREAM.json"
                    ).read_text(encoding="utf-8")
                )
                sync_script.sync(repo_root)
                second_upstream = json.loads(
                    (
                        repo_root / "vendor" / "maxime-agent-skills" / "UPSTREAM.json"
                    ).read_text(encoding="utf-8")
                )
            finally:
                sync_script.clone_upstream = original_clone_upstream
                sync_script.current_commit = original_current_commit
                sync_script._sync_timestamp = original_sync_timestamp

            generated_root = repo_root / "plugin" / "skills"
            generated_markdown = "\n".join(
                path.read_text(encoding="utf-8")
                for path in generated_root.rglob("*.md")
            )
            third_party_notice = (
                repo_root / "plugin" / "THIRD_PARTY_NOTICES.md"
            ).read_text(encoding="utf-8")

        for forbidden_term in FORBIDDEN_RUNTIME_TERMS:
            with self.subTest(forbidden_term=forbidden_term):
                self.assertNotIn(forbidden_term, generated_markdown)
        self.assertEqual(first_upstream, second_upstream)
        self.assertEqual("2026-04-25T00:00:00Z", second_upstream["sync_timestamp"])
        self.assertIn("Maximepodgorski/agent-skills", third_party_notice)
        self.assertIn("MIT License", third_party_notice)
        self.assertIn("Copyright", third_party_notice)

    def _write_fake_upstream(self, upstream: Path) -> None:
        (upstream / "component" / "references" / "actions").mkdir(parents=True)
        (upstream / "design-screen" / "references" / "actions").mkdir(parents=True)
        (upstream / "LICENSE").write_text(
            "MIT License\n\nCopyright (c) 2025 Maxime Podgorski\n",
            encoding="utf-8",
        )
        (upstream / "component" / "SKILL.md").write_text(
            "\n".join(
                [
                    "---",
                    "name: component",
                    "---",
                    "Launch 4 subagents in parallel (use Task tool with "
                    "`run_in_background` or parallel calls).",
                    "",
                ]
            ),
            encoding="utf-8",
        )
        (upstream / "component" / "references" / "actions" / "review.md").write_text(
            (
                "**Launch ALL perspectives as parallel sub-agents** "
                "(single message, multiple Task tool calls).\n"
                "- **Parallel execution:** All perspectives run simultaneously "
                "(single message, multiple Task calls)\n"
                "> **Agent:** Load this file when `spec-review` triggers. "
                "Launch 4 parallel subagents, one per perspective. Consolidate "
                "results into a single report.\n"
                "**Launch 4 subagents in parallel** (use Task tool with "
                "`run_in_background` or parallel calls). Each subagent receives "
                "the full spec content and reviews from its assigned perspective.\n"
            ),
            encoding="utf-8",
        )
        (upstream / "design-screen" / "SKILL.md").write_text(
            "\n".join(
                [
                    "---",
                    "name: design-screen",
                    "---",
                    '-> Warn: "Figma MCP not available. Continuing with text description."',
                    "",
                ]
            ),
            encoding="utf-8",
        )
        (upstream / "design-screen" / "references" / "actions" / "craft.md").write_text(
            (
                "> **Agent:** Load this file when `craft` triggers. Also load the "
                "`figma-use` skill (MANDATORY before any `use_figma` call). Always "
                'pass `skillNames: "figma-use"` in every `use_figma` call.\n'
                "Via `use_figma` (follow figma-use skill patterns):\n"
                "These are handled by the `figma-use` skill — load it before "
                "writing any `use_figma` code. Key constraints the agent must "
                "respect:\n"
                '- **`skillNames: "figma-use"`** — pass in every `use_figma` '
                "call (logging parameter)\n"
            ),
            encoding="utf-8",
        )


class _NoopCleanup:
    def cleanup(self) -> None:
        pass


if __name__ == "__main__":
    unittest.main()
