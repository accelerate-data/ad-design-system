const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../..");
const PLUGIN = path.join(ROOT, "plugin");

function readPluginFile(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function pluginEvidence() {
  const claudeManifest = JSON.parse(
    readPluginFile("plugin/.claude-plugin/plugin.json"),
  );
  const codexManifest = JSON.parse(
    readPluginFile("plugin/.codex-plugin/plugin.json"),
  );
  const applyingSkill = readPluginFile(
    "plugin/skills/applying-design-system/SKILL.md",
  );
  const componentSkill = readPluginFile("plugin/skills/component/SKILL.md");
  const designScreenSkill = readPluginFile("plugin/skills/design-screen/SKILL.md");
  const designScreenReadme = readPluginFile(
    "plugin/skills/design-screen/README.md",
  );
  const designScreenCraft = readPluginFile(
    "plugin/skills/design-screen/references/actions/craft.md",
  );

  return {
    claudeManifest,
    codexManifest,
    applyingSkill,
    componentSkill,
    designScreenSkill,
    designScreenReadme,
    designScreenCraft,
    pluginTreeExists: fs.existsSync(PLUGIN),
  };
}

function hasAll(text, terms) {
  return terms.every((term) => text.includes(term));
}

function missingEvidence(message) {
  return [
    "skill: missing-plugin-evidence",
    `reason: ${message}`,
    "fallback: fail eval until plugin files match takeover behavior",
    "attribution: unknown",
  ].join("\n");
}

function route(prompt) {
  const marker = "User request:";
  const request = prompt.includes(marker)
    ? prompt.slice(prompt.indexOf(marker) + marker.length)
    : prompt;
  const text = request.toLowerCase();
  const evidence = pluginEvidence();

  if (
    evidence.claudeManifest.name !== "design-system" ||
    evidence.codexManifest.name !== "design-system" ||
    evidence.codexManifest.interface.displayName !== "Design System" ||
    !evidence.pluginTreeExists
  ) {
    return missingEvidence("plugin manifests do not expose the design-system plugin");
  }

  if (
    text.includes("brand-compliant") ||
    text.includes("logo usage") ||
    text.includes("accelerate data dashboard")
  ) {
    if (
      !hasAll(evidence.applyingSkill, ["name: applying-design-system", "brand"])
    ) {
      return missingEvidence("applying-design-system skill lacks brand evidence");
    }
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
    if (
      !hasAll(evidence.componentSkill, [
        "name: component",
        "x-upstream-source: Maximepodgorski/agent-skills",
        "AGENTS.md for Codex",
        "text input",
        "codebase analysis",
      ])
    ) {
      return missingEvidence("component skill lacks portable upstream evidence");
    }
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
    if (
      !hasAll(evidence.designScreenSkill, [
        "name: design-screen",
        "x-upstream-source: Maximepodgorski/agent-skills",
      ]) ||
      !hasAll(evidence.designScreenCraft, [
        "Figma MCP write capability is unavailable",
        "continue with `ship`",
      ]) ||
      !hasAll(evidence.designScreenReadme, [
        "Figma write capability available",
        "Skip `craft`",
        "`/design-screen ship`",
      ])
    ) {
      return missingEvidence("design-screen skill lacks Figma-free ship fallback");
    }
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

module.exports = class DesignSystemRouterProvider {
  id() {
    return "design-system-router";
  }

  async callApi(prompt) {
    return {
      output: route(prompt),
    };
  }
};
