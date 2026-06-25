Styled dropdown for picking one option from a short list. Wraps a native `<select>`, so it stays accessible and keyboard-friendly.

```jsx
<Select label="Materialization" defaultValue="incremental">
  <option value="table">table</option>
  <option value="incremental">incremental</option>
  <option value="view">view</option>
</Select>
```

40px tall, custom chevron, Pacific focus ring. Pass `value`/`onChange` for controlled use.
