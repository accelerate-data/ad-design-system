# Contrast findings — two prescribed combinations fail WCAG AA

**Found:** 27 July 2026, while building an investor-deck platform against this design system.
**Status:** open. Nothing in this repository has been changed; this is a report.

Both findings are *faithful readings of the source*, not misuse. An implementer following `SKILL.md`
and `tokens/colors.css` correctly arrives at inaccessible output, which is why they are worth fixing
here rather than in each consuming product.

All ratios below were computed twice independently — once by the implementing agent and once by a
reviewer — and spot-checked by hand against the WCAG 2.x relative-luminance formula. Alpha values are
composited against the surface beneath them, which is the step that makes the badge numbers so low.

---

## 1. `-soft` badge backgrounds have no documented foreground

`tokens/colors.css:45-50` defines five tinted backgrounds under the comment
"Tinted backgrounds for badges / soft states":

```css
--pacific-soft: rgba(0, 180, 216, 0.12);
--seafoam-soft: rgba(0, 221, 146, 0.12);
--navy-soft:    rgba(3, 4, 94, 0.08);
--warning-soft: rgba(245, 158, 11, 0.12);
--error-soft:   rgba(239, 68, 68, 0.12);
```

Nothing states what foreground to pair with them. The natural reading — put the matching saturated
colour on its own soft tint — fails AA in both themes. At 0.12 alpha the tint composites almost
entirely to the surface, so the text is effectively sitting on white in light mode. Badge text is
Micro (11px, weight 500), so the 4.5:1 threshold applies with no large-text exemption.

**Light theme, on `--bg-base`:**

| tone | pairing | ratio | |
|---|---|---|---|
| success | `#00c77f` on `--seafoam-soft` | **2.03:1** | fail |
| warning | `#d97706` on `--warning-soft` | **2.91:1** | fail |
| error | `#dc2626` on `--error-soft` | **4.13:1** | fail |
| info | `--ocean` on `--pacific-soft` | **4.33:1** | fail |
| neutral | | 7.61:1 | pass |

**Dark theme:** warning **4.37:1**, error **3.16:1**, info **2.92:1** all fail — info because
`--ocean` is dark-on-dark there. Success (6.13:1) and neutral (6.21:1) pass.

Seven of ten pairings fail. No darker semantic variant rescues the light theme: none of `#00c77f`,
`#f59e0b`, `#d97706`, `#ef4444`, `#dc2626` reaches 4.5:1 against white.

**What we did downstream**, offered as one possible shape rather than a recommendation for the system:
light uses `--text-primary` as the badge foreground for every tone with a 1px border in that tone's
saturated colour, letting the tint carry the semantic signal; dark uses the light tints (Arctic,
Seafoam, warning base) as foregrounds. Dark error is a deliberate exception — solid `--error-alt`
with white at 4.83:1 — because neither `--error` (3.75:1) nor `--error-alt` reaches 4.5:1 as
translucent text on dark and no brighter red exists in the palette.

Note the border does not solve it on its own: those saturated 1px borders compute 1.48:1 to 2.46:1
against the page in light, below the 3:1 for non-text, so a border alone cannot be the thing carrying
the tone.

**Suggested fix:** publish `-on-soft` companion values per theme, or document a safe foreground
alongside each `-soft` token.

---

## 2. Ghost buttons specify Pacific text at 2.46:1

`SKILL.md:168` — "Ghost: bg: transparent, text: Pacific, hover: Pacific/10% bg" — repeated at line
213, "Tertiary/cancel → Ghost (Pacific text)".

Pacific `#00b4d8` on a transparent background over white is **2.46:1**. It fails AA for the button
label in light mode. Dark is fine at 6.96:1 on Smoke.

This is the same figure that makes `--accent-contrast: var(--white)` wrong on Pacific fills
(2.46:1; Navy on Pacific is 7.20:1).

**What we did downstream:** `--text-link` (Ocean, 4.87:1 on white) for ghost text in light, Pacific
retained in dark. The same substitution fixed our focus ring, which had the identical problem —
`outline: 2px solid var(--accent)` is 2.46:1 on `--bg-base` and 2.20:1 on Pearl, under WCAG 1.4.11's
3:1 for non-text.

**Suggested fix:** specify ghost text per theme in `SKILL.md`, and add a note that Pacific is not a
safe foreground on light surfaces at any text size below 18px.

---

## 3. The system has no stated contrast policy

The only contrast-related line is `SKILL.md:294` — "Maintain same contrast hierarchy: primary >
secondary > muted > faint" — which is about visual hierarchy, not ratios.

That absence is the root of both findings above: the palette is specified precisely and the *pairings*
are not, so each consuming product re-derives them and can re-derive them wrongly.

**Suggested fix:** a short section stating the target (AA: 4.5:1 text, 3:1 non-text and focus
indicators), and a table of approved foreground/background pairs per theme. The values below are the
ones we verified as safe, offered as a starting point:

| token | light | dark |
|---|---|---|
| `--text-primary` | Navy on Pearl/white | Powder on Smoke |
| `--text-secondary` | `#444c5c` — 8.63:1 | `#90b4c8` — 7.80:1 |
| `--text-muted` | `#6b7280` on white — 4.83:1 | `#6b8899` on `#171c21` — 4.58:1 |
| `--text-link` | Ocean — 4.87:1 | Pacific — 6.96:1 |
| focus ring | Ocean — 4.87:1 | Pacific — 6.96:1 |

Two cautions from our own testing. `--text-muted` passes on `--bg-base` by 0.08 and **fails on raised
surfaces** — 4.22:1 on `#1e2329` and 3.76:1 on `#262c33` — so a muted label inside a card is below AA
even though the same token passes on the page. And Navy on the dark ramp computes 1.04:1 to 1.26:1,
so `--text-inverse` must never be paired with a dark surface; it is legible only over Powder or Pacific.
