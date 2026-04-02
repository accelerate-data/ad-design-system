# Vibedata Logo Assets — Developer Reference

> ## ⚠️ Light vs Dark — Which one do I want?
>
> These names describe the **color of the logo artwork**, not the page theme:
>
> | If your background is... | Use logo color... | Example filename     |
> |--------------------------|-------------------|----------------------|
> | Dark / colored           | `light`           | `icon-light-32.png`  |
> | Light / white            | `dark`            | `icon-dark-32.png`   |
>
> Think of it as: a **light logo** is white/light-colored strokes — it disappears on a
> white background and is readable on dark. A **dark logo** is the inverse.

> **Need a custom size or format?**
> Source SVGs (7 files: icon, logo, and lockup in light/dark/monochrome) are in
> `branding/logo/archive/svg_sources/`. Run `creation_scripts/generate_assets.py` to
> regenerate exports.

---

> **Hosted on CDN**
> All assets are served from `http://assets.acceleratedata.ai/logo/`
> Full URL = base + path + filename — e.g.:
> `http://assets.acceleratedata.ai/logo/product/ui/icon-dark-32.png`

---

## Quick Picks

Most common assets for new integrations:

| Filename | Path | Hosted URL | Format | Size | When to use |
|----------|------|------------|--------|------|-------------|
| `icon-dark-32.png` | `product/ui/` | `http://assets.acceleratedata.ai/logo/product/ui/icon-dark-32.png` | PNG | 32×32 | App icon on light/white backgrounds |
| `icon-light-32.png` | `product/ui/` | `http://assets.acceleratedata.ai/logo/product/ui/icon-light-32.png` | PNG | 32×32 | App icon on dark/colored backgrounds |
| `logo-dark-h32.svg` | `product/ui/` | `http://assets.acceleratedata.ai/logo/product/ui/logo-dark-h32.svg` | SVG | h=32px | Navbar/header on light backgrounds |
| `logo-light-h32.svg` | `product/ui/` | `http://assets.acceleratedata.ai/logo/product/ui/logo-light-h32.svg` | SVG | h=32px | Navbar/header on dark backgrounds |
| `favicon-dark.ico` | `web/favicons/` | `http://assets.acceleratedata.ai/logo/web/favicons/favicon-dark.ico` | ICO | 16/32/48 | Browser tab favicon (light-bg site) |
| `logo-light.svg` | `docs/assets/` | `http://assets.acceleratedata.ai/logo/docs/assets/logo-light.svg` | SVG | Vector | Docs site logo (on dark/colored header) |

---

## Design System Skill

The `branding/ad-frontend-design/` directory provides a complete frontend design system covering color tokens, typography scales, spacing, and component patterns. It enforces brand-compliant UI across product, marketing, docs, and demo surfaces. The skill also includes logo selection guidance with CDN integration for the assets listed above.

See [`branding/ad-frontend-design/SKILL.md`](../ad-frontend-design/SKILL.md) for the full specification.

---

## All Assets by Platform

<details>
<summary><strong>Web / Favicon</strong> (<code>web/favicons/</code>)</summary>

Add these to your `<head>` for full browser coverage. Use the `-dark` variants when your site has a light background; use `-light` for dark backgrounds.

| Filename | Format | Size | When to use |
|----------|--------|------|-------------|
| `favicon-dark.ico` | ICO | 16/32/48 | All-browser fallback, light-bg sites |
| `favicon-light.ico` | ICO | 16/32/48 | All-browser fallback, dark-bg sites |
| `icon-dark.svg` | SVG | Vector | Modern favicon (Chromium/Firefox), light-bg sites |
| `icon-light.svg` | SVG | Vector | Modern favicon (Chromium/Firefox), dark-bg sites |
| `favicon-16x16-dark.png` | PNG | 16×16 | Old browser fallback, light-bg |
| `favicon-16x16-light.png` | PNG | 16×16 | Old browser fallback, dark-bg |
| `favicon-32x32-dark.png` | PNG | 32×32 | HiDPI browser fallback, light-bg |
| `favicon-32x32-light.png` | PNG | 32×32 | HiDPI browser fallback, dark-bg |
| `apple-touch-icon.png` | PNG | 180×180 | iOS Safari home screen icon |
| `pwa-icon-192x192.png` | PNG | 192×192 | PWA manifest icon (small) |
| `pwa-icon-512x512.png` | PNG | 512×512 | PWA manifest icon (large/splash) |
| `safari-pinned-tab.svg` | SVG | Vector mask | Safari pinned tab (monochrome mask) |

</details>

<details>
<summary><strong>Product UI — Icons</strong> (<code>product/ui/icon-*</code>)</summary>

Square icon-only assets. Use `icon-dark-*` on light/white backgrounds and `icon-light-*` on dark/colored backgrounds. SVG is preferred; use a PNG size that matches your display density.

**Dark (for light backgrounds):**

| Filename | Format | Size |
|----------|--------|------|
| `icon-dark.svg` | SVG | Vector |
| `icon-dark-16.png` | PNG | 16×16 |
| `icon-dark-20.png` | PNG | 20×20 |
| `icon-dark-24.png` | PNG | 24×24 |
| `icon-dark-28.png` | PNG | 28×28 |
| `icon-dark-32.png` | PNG | 32×32 |
| `icon-dark-40.png` | PNG | 40×40 |
| `icon-dark-48.png` | PNG | 48×48 |
| `icon-dark-64.png` | PNG | 64×64 |
| `icon-dark-96.png` | PNG | 96×96 |
| `icon-dark-128.png` | PNG | 128×128 |
| `icon-dark-256.png` | PNG | 256×256 |
| `icon-dark-512.png` | PNG | 512×512 |

**Light (for dark/colored backgrounds):**

| Filename | Format | Size |
|----------|--------|------|
| `icon-light.svg` | SVG | Vector |
| `icon-light-16.png` | PNG | 16×16 |
| `icon-light-20.png` | PNG | 20×20 |
| `icon-light-24.png` | PNG | 24×24 |
| `icon-light-28.png` | PNG | 28×28 |
| `icon-light-32.png` | PNG | 32×32 |
| `icon-light-40.png` | PNG | 40×40 |
| `icon-light-48.png` | PNG | 48×48 |
| `icon-light-64.png` | PNG | 64×64 |
| `icon-light-96.png` | PNG | 96×96 |
| `icon-light-128.png` | PNG | 128×128 |
| `icon-light-256.png` | PNG | 256×256 |
| `icon-light-512.png` | PNG | 512×512 |

</details>

<details>
<summary><strong>Product UI — Logos (navbar/header)</strong> (<code>product/ui/logo-*-h*.svg</code>)</summary>

Wordmark-only logos sized by height. SVG is preferred; use the `@2x.png` raster fallback in email templates or environments where SVG is unsupported. Use `logo-dark-*` on light backgrounds, `logo-light-*` on dark backgrounds.

| Filename | Format | Height | Raster fallback (actual px) |
|----------|--------|--------|-----------------------------|
| `logo-dark-h20.svg` | SVG | 20px | — |
| `logo-dark-h24.svg` | SVG | 24px | `logo-dark-h24@2x.png` (512×48) |
| `logo-dark-h32.svg` | SVG | 32px | `logo-dark-h32@2x.png` (683×64) |
| `logo-dark-h40.svg` | SVG | 40px | — |
| `logo-dark-h48.svg` | SVG | 48px | `logo-dark-h48@2x.png` (1024×96) |
| `logo-dark-h64.svg` | SVG | 64px | `logo-dark-h64@2x.png` (1366×128) |
| `logo-dark-h80.svg` | SVG | 80px | — |
| `logo-dark-h96.svg` | SVG | 96px | `logo-dark-h96@2x.png` (2049×192) |
| `logo-dark-h128.svg` | SVG | 128px | `logo-dark-h128@2x.png` (2732×256) |
| `logo-light-h20.svg` | SVG | 20px | — |
| `logo-light-h24.svg` | SVG | 24px | `logo-light-h24@2x.png` (512×48) |
| `logo-light-h32.svg` | SVG | 32px | `logo-light-h32@2x.png` (683×64) |
| `logo-light-h40.svg` | SVG | 40px | — |
| `logo-light-h48.svg` | SVG | 48px | `logo-light-h48@2x.png` (1024×96) |
| `logo-light-h64.svg` | SVG | 64px | `logo-light-h64@2x.png` (1366×128) |
| `logo-light-h80.svg` | SVG | 80px | — |
| `logo-light-h96.svg` | SVG | 96px | `logo-light-h96@2x.png` (2049×192) |
| `logo-light-h128.svg` | SVG | 128px | `logo-light-h128@2x.png` (2732×256) |

</details>

<details>
<summary><strong>Product UI — Lockups (cards/sidebars)</strong> (<code>product/ui/logo-icon-lockup-*</code>)</summary>

Stacked icon+wordmark compositions for larger display contexts: cards, sidebars, onboarding screens. All files are SVG (vector). Use `-dark-` variants on light backgrounds, `-light-` on dark backgrounds.

| Filename | Format | Bounding box |
|----------|--------|--------------|
| `logo-icon-lockup-dark-48.svg` | SVG | 48×48 |
| `logo-icon-lockup-dark-64.svg` | SVG | 64×64 |
| `logo-icon-lockup-dark-80.svg` | SVG | 80×80 |
| `logo-icon-lockup-dark-96.svg` | SVG | 96×96 |
| `logo-icon-lockup-dark-128.svg` | SVG | 128×128 |
| `logo-icon-lockup-dark-160.svg` | SVG | 160×160 |
| `logo-icon-lockup-dark-192.svg` | SVG | 192×192 |
| `logo-icon-lockup-light-48.svg` | SVG | 48×48 |
| `logo-icon-lockup-light-64.svg` | SVG | 64×64 |
| `logo-icon-lockup-light-80.svg` | SVG | 80×80 |
| `logo-icon-lockup-light-96.svg` | SVG | 96×96 |
| `logo-icon-lockup-light-128.svg` | SVG | 128×128 |
| `logo-icon-lockup-light-160.svg` | SVG | 160×160 |
| `logo-icon-lockup-light-192.svg` | SVG | 192×192 |

</details>

<details>
<summary><strong>Docs Site</strong> (<code>docs/</code>)</summary>

Single asset for documentation sites (Mintlify, Docusaurus, etc.).

| Filename | Path | Format | When to use |
|----------|------|--------|-------------|
| `logo-light.svg` | `docs/assets/` | SVG | Docs site header logo (light artwork, for dark-bg header) |

</details>

<details>
<summary><strong>Marketing / Social</strong> (<code>marketing/</code>)</summary>

Profile picture / avatar asset optimized for social platforms.

| Filename | Path | Format | Size | When to use |
|----------|------|--------|------|-------------|
| `avatar-400.png` | `marketing/social/` | PNG | 400×400 | Twitter/X, LinkedIn, GitHub profile avatar |

</details>

<details>
<summary><strong>Ops / Email</strong> (<code>ops/</code>)</summary>

Email signature logo. Raster PNG because most email clients do not render SVG. This is a `@2x` file — set display dimensions to `width="341" height="32"` in your `<img>` tag.

| Filename | Path | Format | Actual px | Display size | When to use |
|----------|------|--------|-----------|--------------|-------------|
| `email-logo-h32@2x.png` | `ops/email/` | PNG | 683×64 | 341×32 | Email signature logo |

</details>

<details>
<summary><strong>Azure Marketplace</strong> (<code>marketplaces/azure/</code>)</summary>

Required and optional logo sizes for Azure Marketplace listings. All use the light (white) artwork variant, intended for display on Azure's dark/colored listing backgrounds.

| Filename | Format | Size | Azure requirement |
|----------|--------|------|-------------------|
| `azure-logo-small-48.png` | PNG | 48×48 | Small logo (optional, search results) |
| `azure-logo-medium-90.png` | PNG | 90×90 | Medium logo (optional, Azure portal) |
| `azure-logo-large-216.png` | PNG | 216×216 | Large logo (required) |
| `azure-logo-large-350.png` | PNG | 350×350 | Large logo alt size (required) |

</details>
