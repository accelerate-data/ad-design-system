Underline tab bar for switching between views or panels within one screen.

```jsx
<Tabs
  defaultValue="models"
  onChange={setView}
  tabs={[
    { value: "models", label: "Models", badge: 124 },
    { value: "tests", label: "Tests", icon: <i className="ph ph-flask" /> },
    { value: "runs", label: "Runs" },
  ]}
/>
```

Active tab gets Pacific text + a 2px Pacific underline. Controlled via `value`/`onChange` or uncontrolled via `defaultValue`.
