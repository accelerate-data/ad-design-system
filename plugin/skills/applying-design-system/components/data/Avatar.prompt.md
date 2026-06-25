Round user/entity avatar. Shows an image when `src` loads, otherwise tinted initials derived from `name`.

```jsx
<Avatar name="Dana Ortiz" src="/people/dana.jpg" />
<Avatar name="CI Bot" size={28} />
```

Tint is chosen deterministically from the name across three brand soft-tints. Fully round.
