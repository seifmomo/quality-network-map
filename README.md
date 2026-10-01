# Quality Network — Network / Data

A single, print-styled page that shows the **whole Quality Network mind map at once** —
nothing hidden behind slides, tabs or clicks.

Live: **https://seifmomo.github.io/quality-network-map/**

---

## What it shows

```
Quality
└── Network / Data
    ├── 01 Active / WiFi    Huawei · Cisco · Aruba · D-Link · TP-Link
    ├── 02 Industrial SW    Planet · Antaira · TrendNet · Huawei
    ├── 03 Passive          El Sweedy · Legrand · Leviton · Premium Line · Panduit
    │                       Datwyler · Pro Link · CommScope · Black Stone
    ├── 04 Rack             ACS · Pro-Rack · Black Stone · Mirsan · ESTAP
    └── 05 IP Telephone     Alcatel · Mitel · Grand Steem · Avaya
```

- **27 brands**, each with the distributor / supply partner it is supplied through
  (e.g. **Huawei → Redingtone / Metra / Mantrac**).
- **4 brands** have no partner in the map and are marked *direct supply*
  (D-Link, TP-Link, El Sweedy, ACS).
- **18 supply partners** are listed at the bottom with the branches each one serves.
- The brand-wall photo closes the page.

No statistics, no analysis, no marketing claims — the map and the range, only.

## Design notes

- **Light and print-like**: white paper, hairline rules, serif headings, green
  `#206242` as the single accent (taken from the original company website).
- **One scroll, everything visible** — the map is a spine with five branches, laid
  out like an org chart rather than a carousel.
- **Fade-in only**, once per section, then it never moves again. Honours
  `prefers-reduced-motion`.
- **Print / PDF ready** — `Ctrl + P` prints cleanly with no sticky header.

## Controls

| Action | How |
|--------|-----|
| Jump to a branch | Top navigation (or scroll) |
| Print / save as PDF | `Ctrl + P` → Save as PDF |

## Run locally

Open `index.html` in a browser — no build step, no dependencies.

```bash
python -m http.server 8000   # optional
```

## Project structure

```
.
├── index.html          # the page (header, map shell, supply table, contact)
├── assets/
│   ├── data.js         # all content — the mind map lives here
│   ├── style.css       # print-like styling + print rules
│   ├── site.js         # renders the map, supply table, fade-in
│   └── favicon.svg
└── img/
    └── brand-wall.jpg  # photo of the Quality Network brand wall
```

## Editing

Everything on the page is generated from `assets/data.js`. To add, remove or rename a
brand or partner, edit only that file:

```js
// assets/data.js
{
  id: 'active',
  no: '01',
  title: 'Active / WiFi',
  note: 'Core and access switching, wireless access points, routers, firewalls and PoE.',
  brands: [
    {b: 'Huawei', with: ['Redingtone', 'Metra', 'Mantrac']},
    {b: 'D-Link', with: []}      // empty array = "direct supply"
  ]
}
```

The supply-partner table at the bottom of the page is generated automatically from
those links — add a brand and its partner appears there too.

Brands listed in `LOGO` at the bottom of `data.js` automatically show their official
SVG logo (currently Huawei, Cisco and TP-Link); everything else is set in type.

Two spellings were normalised for consistency, without changing any link:
`Brand-Connection` → **Brand Connection**, and CommScope's `Silicon21 + Middle East`
→ **Silicon 21** + **Middle East**.

## Licence

© Egyptian Engineering Projects Co. — Quality. All rights reserved.
Brand names and logos are trademarks of their respective owners and appear here to
describe the supplied product range.