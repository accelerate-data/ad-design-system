# Design System Evals

Focused Promptfoo smoke evals for the `design-system` plugin takeover.

These evals cover:

- Routing between `applying-design-system`, `component`, and `design-screen`.
- Upstream attribution for generated `component` and `design-screen` skills.
- Codex/Claude repo-guidance portability.
- Figma-unavailable fallback behavior.
- UX-engineer coverage for brand application, component workflow, screen
  composition, accessibility, responsive behavior, page states, and Figma-free
  fallback.

Run:

```bash
cd tests/evals
npm install
npm run eval
```

The suite is intentionally small. Unit tests and generated-content checks remain
the source of truth for exact file content.
