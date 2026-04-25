function route(prompt) {
  const marker = "User request:";
  const request = prompt.includes(marker)
    ? prompt.slice(prompt.indexOf(marker) + marker.length)
    : prompt;
  const text = request.toLowerCase();

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
