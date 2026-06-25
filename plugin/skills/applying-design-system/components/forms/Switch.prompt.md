Toggle switch for instant on/off settings (prefer over Checkbox when the change takes effect immediately).

```jsx
<Switch label="Dark mode" checked={dark} onChange={e => setDark(e.target.checked)} />
<Switch label="Auto-deploy" defaultChecked />
```

Pacific track when on, white knob slides 150ms with no bounce. 36×20px.
