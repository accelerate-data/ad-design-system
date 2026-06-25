Primary action button for Vibedata surfaces — use for any clickable action, choosing the variant by importance.

```jsx
<Button variant="primary" onClick={save}>Save changes</Button>
<Button variant="secondary" iconLeft={<i className="ph ph-plus" />}>New model</Button>
<Button variant="ghost" size="sm">Cancel</Button>
```

Variants: `primary` (Pacific, main action), `secondary` (outlined), `ghost` (Pacific text), `accent` (Seafoam, for positive/highlight moments — use sparingly), `danger` (destructive). Sizes: `sm` 32px, `md` 40px, `lg` 48px. No bounce on hover — only color/shadow shifts.
