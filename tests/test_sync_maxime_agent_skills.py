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


if __name__ == "__main__":
    unittest.main()
