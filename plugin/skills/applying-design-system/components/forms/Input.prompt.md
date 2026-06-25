Single-line text field with label, hint, and validation states for any form.

```jsx
<Input label="Pipeline name" placeholder="orders_daily" hint="lowercase, underscores only" />
<Input label="Email" error="Enter a valid email" iconLeft={<i className="ph ph-envelope" />} />
```

Focus shows a Pacific border + 2px ring; `error` swaps to red and hides `hint`. 40px tall. Pass through any native input attr (value, onChange, type, disabled).
