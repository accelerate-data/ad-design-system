Outlined mono chip for metadata, keys, applied filters, and tags. Quieter than Badge — use for technical labels.

```jsx
<Tag dotColor="var(--seafoam)">tier:gold</Tag>
<Tag onRemove={() => removeFilter("pii")}>governance:pii</Tag>
```

Renders in Geist Mono. Add `dotColor` for a status dot, `onRemove` for a removable filter chip.
