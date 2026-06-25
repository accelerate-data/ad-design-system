Inline callout for system messages, run results, and validation summaries.

```jsx
<Alert variant="success" title="Deploy passed" icon={<i className="ph ph-check-circle" />}>
  All 42 quality gates green. Promoted to production.
</Alert>
<Alert variant="error" title="Build failed" onDismiss={() => {}}>3 models have failing tests.</Alert>
```

Left accent border + soft tint by `variant` (info/success/warning/error). Pass `onDismiss` to show a close button.
