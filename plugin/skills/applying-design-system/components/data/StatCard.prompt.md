KPI tile for dashboards and overview screens. Value renders in Geist Mono with tabular figures; optional trend delta.

```jsx
<StatCard label="Avg query time" value="48" unit="ms" delta="9% faster" deltaDirection="up" icon={<i className="ph ph-lightning" />} />
<StatCard label="Failed runs" value={3} delta="2 more" deltaDirection="down" />
```

`deltaDirection="up"` is green (Seafoam), `down` is red. Lay several out in a grid for an overview row.
