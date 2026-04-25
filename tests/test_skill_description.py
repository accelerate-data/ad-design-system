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
OLD_BRANDING_SKILL_PATH = "branding" + "/plugin/skills/" + AD_SKILL_NAME
OLD_MARKETPLACE_INSTALL = "ad-design-system" + "@ad-internal-marketplace"
OLD_BRANDING_LOGO_PREFIX = "branding" + "/logo/"
OLD_BRANDING_AI_DOC = OLD_BRANDING_LOGO_PREFIX + "ASSETS_FOR_AI.md"
OLD_BRANDING_DEVELOPER_DOC = OLD_BRANDING_LOGO_PREFIX + "ASSETS_FOR_DEVELOPERS.md"
MANIFEST_PATHS = [
    PLUGIN_DIR / ".claude-plugin" / "plugin.json",
    PLUGIN_DIR / ".codex-plugin" / "plugin.json",
]

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
        for manifest_path in MANIFEST_PATHS:
            with self.subTest(manifest_path=manifest_path):
                manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
                self.assertEqual(PLUGIN_NAME, manifest["name"])
                self.assertEqual("./skills/", manifest["skills"])
                self.assertIn("design system", manifest["description"].lower())
                self.assertIn("version", manifest)
                versions.add(manifest["version"])

        self.assertEqual(1, len(versions))

    def test_plugin_manifests_use_elastic_license_spdx_identifier(self):
        for manifest_path in MANIFEST_PATHS:
            with self.subTest(manifest_path=manifest_path):
                manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
                self.assertEqual("Elastic-2.0", manifest["license"])

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

    def test_generated_upstream_skills_are_present(self):
        for skill_name in ["component", "design-screen"]:
            with self.subTest(skill_name=skill_name):
                skill_dir = PLUGIN_DIR / "skills" / skill_name
                self.assertTrue((skill_dir / "SKILL.md").is_file())
                self.assertTrue((skill_dir / "README.md").is_file())
                skill_text = (skill_dir / "SKILL.md").read_text(encoding="utf-8")
                self.assertIn(
                    "x-upstream-source: Maximepodgorski/agent-skills", skill_text
                )

    def test_upstream_provenance_and_license_are_present(self):
        vendor_dir = ROOT / "vendor" / "maxime-agent-skills"
        self.assertTrue((vendor_dir / "LICENSE").is_file())
        self.assertTrue((vendor_dir / "UPSTREAM.json").is_file())
        upstream = json.loads(
            (vendor_dir / "UPSTREAM.json").read_text(encoding="utf-8")
        )
        self.assertEqual(
            "https://github.com/Maximepodgorski/agent-skills",
            upstream["repo_url"],
        )
        self.assertEqual(
            ["LICENSE", "component", "design-screen"], upstream["included_paths"]
        )
        self.assertIn("adapter_version", upstream)
        self.assertIn(
            "MIT License", (vendor_dir / "LICENSE").read_text(encoding="utf-8")
        )

    def test_installed_third_party_notice_includes_upstream_mit_license(self):
        notice_path = PLUGIN_DIR / "THIRD_PARTY_NOTICES.md"
        self.assertTrue(notice_path.is_file())

        notice = notice_path.read_text(encoding="utf-8")
        self.assertIn("Maximepodgorski/agent-skills", notice)
        self.assertIn("MIT License", notice)
        self.assertIn("Copyright", notice)

    def test_generated_skills_do_not_contain_forbidden_runtime_terms(self):
        forbidden_terms = [
            "Read `CLAUDE.md` + codebase",
            "Read CLAUDE.md \u2192 project conventions",
            "Task tool",
            "run_in_background",
            "figma-use",
            "skillNames",
        ]
        generated_root = PLUGIN_DIR / "skills"
        offenders = []

        for skill_name in ["component", "design-screen"]:
            for path in (generated_root / skill_name).rglob("*.md"):
                text = path.read_text(encoding="utf-8")
                for forbidden_term in forbidden_terms:
                    if forbidden_term in text:
                        offenders.append(
                            f"{path.relative_to(ROOT)} contains {forbidden_term}"
                        )

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

    def test_design_screen_readme_documents_non_figma_fallback(self):
        readme = (
            PLUGIN_DIR / "skills" / "design-screen" / "README.md"
        ).read_text(encoding="utf-8")

        self.assertNotIn("github.com/anthropics/claude-code", readme)
        self.assertNotIn("Run `/mcp` in Claude Code", readme)
        self.assertNotIn("Run `/mcp` to connect Figma", readme)
        self.assertIn("Figma integration is optional", readme)
        self.assertIn("text/codebase mode", readme)
        self.assertIn("Figma write capability available", readme)
        self.assertIn("Skip `craft`", readme)
        self.assertIn("`/design-screen ship`", readme)

    def test_generated_skills_cover_ux_engineering_workflows(self):
        required_paths = [
            PLUGIN_DIR / "skills" / "component" / "references" / "actions" / "spec.md",
            PLUGIN_DIR / "skills" / "component" / "references" / "actions" / "dev.md",
            PLUGIN_DIR
            / "skills"
            / "component"
            / "references"
            / "actions"
            / "review.md",
            PLUGIN_DIR
            / "skills"
            / "component"
            / "references"
            / "principles"
            / "accessibility.md",
            PLUGIN_DIR
            / "skills"
            / "design-screen"
            / "references"
            / "actions"
            / "spec.md",
            PLUGIN_DIR
            / "skills"
            / "design-screen"
            / "references"
            / "actions"
            / "ship.md",
            PLUGIN_DIR
            / "skills"
            / "design-screen"
            / "references"
            / "principles"
            / "page-states.md",
            PLUGIN_DIR
            / "skills"
            / "design-screen"
            / "references"
            / "principles"
            / "responsive.md",
            PLUGIN_DIR
            / "skills"
            / "design-screen"
            / "references"
            / "principles"
            / "layout-patterns.md",
        ]

        for path in required_paths:
            with self.subTest(path=path):
                self.assertTrue(path.is_file())

    def test_live_guidance_does_not_reference_stale_paths(self):
        plugin_guidance_paths = [
            path
            for path in PLUGIN_DIR.rglob("*")
            if path.suffix in {".md", ".json"} and path.is_file()
        ]
        paths = plugin_guidance_paths + [
            ROOT / "README.md",
            ROOT / "logo" / "ASSETS_FOR_DEVELOPERS.md",
            ROOT / "logo" / "ASSETS_FOR_AI.md",
            ROOT / "docs" / "design" / "2026-04-25-ad-design-system-skill-expansion.md",
        ]
        forbidden_strings = [
            OLD_AD_SKILL_NAME,
            OLD_BRANDING_SKILL_PATH,
            OLD_MARKETPLACE_INSTALL,
            OLD_BRANDING_LOGO_PREFIX,
            OLD_BRANDING_AI_DOC,
            OLD_BRANDING_DEVELOPER_DOC,
        ]

        for path in paths:
            with self.subTest(path=path):
                content = path.read_text(encoding="utf-8")
                for stale_string in forbidden_strings:
                    self.assertNotIn(stale_string, content)

    def test_repo_map_skill_paths_exist(self):
        repo_map = json.loads((PLUGIN_DIR / "repo-map.json").read_text(encoding="utf-8"))

        for skill in repo_map["skills"]:
            with self.subTest(skill=skill["name"], path=skill["path"]):
                self.assertTrue((PLUGIN_DIR / skill["path"]).is_dir())

            for reference_path in skill.get("references", []):
                with self.subTest(skill=skill["name"], reference=reference_path):
                    self.assertTrue((PLUGIN_DIR / reference_path).exists())

            for asset_path in skill.get("assets", []):
                with self.subTest(skill=skill["name"], asset=asset_path):
                    self.assertTrue((PLUGIN_DIR / asset_path).exists())

    def test_repo_map_lists_every_installed_skill_directory(self):
        repo_map = json.loads((PLUGIN_DIR / "repo-map.json").read_text(encoding="utf-8"))
        mapped_skill_paths = {skill["path"].rstrip("/") for skill in repo_map["skills"]}
        installed_skill_paths = {
            str(path.relative_to(PLUGIN_DIR))
            for path in (PLUGIN_DIR / "skills").iterdir()
            if (path / "SKILL.md").is_file()
        }

        self.assertEqual(installed_skill_paths, mapped_skill_paths)

    def test_readme_lists_generated_skill_inventory_and_notices(self):
        readme = (PLUGIN_DIR / "README.md").read_text(encoding="utf-8")

        for required_text in [
            "component",
            "design-screen",
            "THIRD_PARTY_NOTICES.md",
        ]:
            with self.subTest(required_text=required_text):
                self.assertIn(required_text, readme)

    def test_claude_guidance_mentions_every_installed_skill_directory(self):
        claude_guidance = (PLUGIN_DIR / "CLAUDE.md").read_text(encoding="utf-8")
        installed_skill_names = [
            path.name
            for path in sorted((PLUGIN_DIR / "skills").iterdir())
            if (path / "SKILL.md").is_file()
        ]

        for skill_name in installed_skill_names:
            with self.subTest(skill_name=skill_name):
                self.assertIn(skill_name, claude_guidance)


if __name__ == "__main__":
    unittest.main()
