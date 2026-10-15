# SegmentedTabs

A controlled, non-scrolling switch with 2 to 5 unique options:

```tsx
<SegmentedTabs options={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
    value={value} onChange={setValue} ariaLabel="Preview" />
```

Options may be disabled. Clicks, Left/Right arrows, Home and End emit the next enabled value; the parent decides when to update `value`. Keyboard focus skips disabled options. An unknown value selects nothing and hides the indicator; the first enabled option remains keyboard reachable. Duplicate values and unsupported option counts throw a clear configuration error.

The component does not filter data, fetch lists, paginate, or navigate. Colors use `--app-segmented-tabs-*` tokens and geometry uses modifier classes, with no inline styles. Demo: `/showcase/components/primitives`.
