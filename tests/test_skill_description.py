from pathlib import Path
import json
import unittest


ROOT = Path(__file__).resolve().parents[1]
PLUGIN_DIR = ROOT / "plugin"
SKILL_DIR = PLUGIN_DIR / "skills" / "applying-ad-design-system"
SKILL_PATH = SKILL_DIR / "SKILL.md"
PLUGIN_NAME = "ad-design-system"
SKILL_NAME = "applying-ad-design-system"

REMOTE_COMPONENT_DESCRIPTION = """
Design system component workflow. Spec, document, implement, review, spec-review, and audit
DS components with Figma as primary input.
6 actions: spec, doc, dev, review, spec-review, audit.
Auto-activates on: "component", "spec component", "doc component",
"dev component", "review component", "spec-review component", "audit component",
"design system", "ds component", "component spec", "component doc", "component dev",
"component review", "component spec-review", "component audit".
"""


def frontmatter_description(path: Path) -> str:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0] != "---":
        raise AssertionError("SKILL.md must start with YAML frontmatter")

    for line in lines[1:]:
        if line == "---":
            break
        if line.startswith("description: "):
            return line.split("description: ", 1)[1].strip()

    raise AssertionError("SKILL.md frontmatter must include a description")


def frontmatter_name(path: Path) -> str:
    lines = path.read_text(encoding="utf-8").splitlines()
    if not lines or lines[0] != "---":
        raise AssertionError("SKILL.md must start with YAML frontmatter")

    for line in lines[1:]:
        if line == "---":
            break
        if line.startswith("name: "):
            return line.split("name: ", 1)[1].strip()

    raise AssertionError("SKILL.md frontmatter must include a name")


class SkillDescriptionTests(unittest.TestCase):
    def test_skill_plugin_identity_uses_design_system_name(self):
        self.assertTrue(SKILL_DIR.is_dir())
        self.assertFalse((ROOT / "ad-frontend-design").exists())
        self.assertFalse((ROOT / "ad-design-system").exists())
        self.assertFalse((ROOT / "skills" / "ad-design-system").exists())
        self.assertFalse((ROOT / "skills").exists())
        self.assertFalse((PLUGIN_DIR / "skills" / "ad-frontend-design").exists())
        self.assertEqual(SKILL_NAME, frontmatter_name(SKILL_PATH))

    def test_claude_and_codex_plugin_manifests_exist(self):
        for manifest_path in [
            ROOT / ".claude-plugin" / "plugin.json",
            ROOT / ".codex-plugin" / "plugin.json",
        ]:
            with self.subTest(manifest_path=manifest_path):
                self.assertFalse(manifest_path.exists())

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

    def test_design_system_description_does_not_conflict_with_component_skill(self):
        local = frontmatter_description(SKILL_PATH).lower()
        remote = REMOTE_COMPONENT_DESCRIPTION.lower()

        remote_activation_terms = [
            "design system",
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

    def test_design_system_description_stays_brand_visual_specific(self):
        local = frontmatter_description(SKILL_PATH).lower()

        for required_term in ["accelerate data", "vibedata", "brand", "visual"]:
            with self.subTest(required_term=required_term):
                self.assertIn(required_term, local)


if __name__ == "__main__":
    unittest.main()
