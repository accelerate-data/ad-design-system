Checkbox for multi-select and boolean opt-ins. Works controlled (`checked` + `onChange`) or uncontrolled (`defaultChecked`).

```jsx
<Checkbox label="Run quality gates on deploy" defaultChecked />
<Checkbox label="Notify on failure" checked={notify} onChange={e => setNotify(e.target.checked)} />
```

Fills Pacific with a white check when on. 18px box, 4px radius.
