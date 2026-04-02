# Logo Asset Exporter

This workspace includes a script that reads `logo-export-checklist.xlsx` and generates logo assets under `output/`.

## Required Source Files

The script only uses these masters from `sources/`:

- `icon-light.svg`
- `icon-dark.svg`
- `icon-monochrome.svg`
- `logo-light.svg`
- `logo-dark.svg`
- `logo-icon-lockup-light.svg`
- `logo-icon-lockup-dark.svg`

If any required source file is missing, the script fails fast and prints the missing file list.

## How Auto Color Expansion Works

Rows with `Logo Color = auto` are expanded into:

- `light`
- `dark`

To avoid overwrites, the filename is updated when needed:

- If the original filename already contains `-light` or `-dark`, it is kept as-is.
- Otherwise, `-light` or `-dark` is inserted before the file extension.

Examples:

- `icon.svg` -> `icon-light.svg`, `icon-dark.svg`
- `favicon-32x32.png` -> `favicon-32x32-light.png`, `favicon-32x32-dark.png`

## Supported Export Behaviors

- `SVG`: copies the selected source SVG.
- `PNG`: rasterizes with CairoSVG.
  - Supports `N×N`.
  - Supports `~(auto)×H` (aspect ratio preserved from SVG metadata).
  - Supports `216–350 × 216–350` by generating two files (`-216`, `-350`).
- `ICO`: builds multi-size favicon `.ico` from SVG rasterized sizes (e.g. `16,32,48`) using Pillow.

Special case:

- `safari-pinned-tab.svg` always uses `sources/icon-monochrome.svg`.

## Open Graph Rows

Rows requesting a `1200×630` PNG are intentionally skipped because no OG template is available.  
The script logs:

`SKIP OG requires template (no og-template provided): <row summary>`

## Run

Default run:

```bash
python generate_assets.py
```

Optional arguments:

```bash
python generate_assets.py \
  --output output \
  --sources sources \
  --excel logo-export-checklist.xlsx \
  --sheet "Export Checklist"
```

Dry run (no files written):

```bash
python generate_assets.py --dry-run
```

## Output Layout

Files are written to:

- `output/<Suggested Path>/<final filename>`

If path collisions still occur after color/range suffixing, deterministic numeric suffixes are added:

- `name.ext`, `name-2.ext`, `name-3.ext`, ...

## Manifest

After generation, the script writes:

- `output/ASSETS_MANIFEST.md`

The manifest includes:

- generation timestamp (ISO UTC)
- source spreadsheet name
- one table row per generated output file
- sorted rows by `Suggested Path`, then `Filename`

The manifest is intended to be committed to git together with generated assets.
