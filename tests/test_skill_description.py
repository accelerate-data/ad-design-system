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
OLD_BRANDING_SKILL_PATH = "branding/plugin/skills/" + AD_SKILL_NAME
OLD_MARKETPLACE_INSTALL = "ad-design-system" + "@ad-internal-marketplace"
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

    def test_plugin_docs_do_not_reference_old_skill_path(self):
        for path in [
            PLUGIN_DIR / "README.md",
            PLUGIN_DIR / "CLAUDE.md",
            PLUGIN_DIR / "AGENTS.md",
            PLUGIN_DIR / "repo-map.json",
            ROOT / "logo" / "ASSETS_FOR_DEVELOPERS.md",
            ROOT / "logo" / "ASSETS_FOR_AI.md",
        ]:
            with self.subTest(path=path):
                self.assertNotIn(
                    OLD_AD_SKILL_NAME,
                    path.read_text(encoding="utf-8"),
                )
                self.assertNotIn(
                    OLD_BRANDING_SKILL_PATH,
                    path.read_text(encoding="utf-8"),
                )
                self.assertNotIn(
                    OLD_MARKETPLACE_INSTALL,
                    path.read_text(encoding="utf-8"),
                )

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


if __name__ == "__main__":
    unittest.main()
