Square icon-only button for toolbars, table rows, and compact actions where a label would be noise.

```jsx
<IconButton aria-label="Settings"><i className="ph ph-gear" /></IconButton>
<IconButton variant="primary" aria-label="Run"><i className="ph ph-play" /></IconButton>
```

Always pass `aria-label`. Variants: `secondary` (bordered, default), `ghost` (borderless), `primary` (Pacific). Sizes match Button: sm 32 / md 40 / lg 48.
