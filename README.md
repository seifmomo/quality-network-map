# Quality Network — Network / Data

[![Live site](https://img.shields.io/badge/live%20site-seifmomo.github.io-0F7A52?style=flat-square)](https://seifmomo.github.io/quality-network-map/)
[![Repo](https://img.shields.io/badge/repo-seifmomo%2Fquality--network--map-2f9e6b?style=flat-square)](https://github.com/seifmomo/quality-network-map)
[![Tabs](https://img.shields.io/badge/sections-7%20tabs%20%2B%20home-F26522?style=flat-square)](#the-tabs)

### ➜ **Live: https://seifmomo.github.io/quality-network-map/**

![Quality Network / Data — home tab](img/preview.png)

A clean white-canvas site for the **Quality Network / Data** division.
Every section is its own tab (page). The home hero is deliberately plain: the Quality logo,
a line that rotates, a **search field**, three quick chips, and a **list of the seven sections** —
then the top bar slides in only once the hero has been scrolled past.

| Tab | Page | Contents |
| --- | --- | --- |
| Home | `index.html` | Logo hero, section list, the whole map (27 brands in 5 columns), partners band, brand wall |
| Active / WiFi | `active.html` | Huawei, Cisco, Aruba, D-Link, TP-Link |
| Industrial SW | `industrial.html` | Planet, Antaira, TrendNet, Huawei iMaster |
| Passive | `passive.html` | Legrand, Leviton, Panduit, Datwyler, CommScope, Pro Link, Black Stone, El Sweedy, Premium Line |
| Rack | `rack.html` | ACS, Pro-Rack, Black Stone, Mirsan, ESTAP |
| IP Telephone | `phone.html` | Alcatel, Mitel, Grand Steem, Avaya |
| Supply partners | `supply.html` | All 18 partners + the branches each one serves |
| Contact | `contact.html` | Phone, email, address, website, enquiry form |

**5 branches · 27 brand entries · 18 supply partners · 4 direct-supply brands**

---

## Two ways to read each section

Every branch tab (and the Supply partners tab) has a **Cards ⇄ Matrix** switch in the header.

- **Cards** — one card per brand: its supply partner chips, or a *direct supply* marker.
- **Matrix** — brands as columns, suppliers as rows, a green dot on every linked cell, so the
  shape of the supply network is visible at a glance. Columns marked `◆` are supplied straight by
  Quality, and a **Quality — direct** row collects them at the bottom.

The state is shareable: `active.html#matrix` opens that tab straight into the matrix.
Hovering a row highlights the whole line.

---

## The home hero

1. The **Quality logo** sits centred at the top (`img/quality-logo.png`).
2. A **rotating one-liner** (27 entries · 18 partners · 5 branches · 4 direct) that pauses on
   hover and stays static under `prefers-reduced-motion`.
3. A **search field** — `Search 25 brands, 18 partners…` — then three **quick chips**:
   *Who supplies Huawei?* · *Single-source risks* · *Direct brands*.
4. A **clean list of the seven sections** — number, name, count and the brands inside, each row a
   full-width link that slides slightly and grows a green edge on hover. Typing in the search
   **filters these rows live**.
5. The whole hero fits one screen (≈820 px tall), with no headings or clutter.
6. The **top bar stays hidden while the hero is on screen** and slides down only after the hero
   has been fully scrolled past, so navigation never interrupts the first view. Scrolling back up
   hides it again.

Straight after the hero comes a one-line **insight sentence**, the map itself — all 27 brand
entries in five branch columns — and a **partners band** listing all 18 supply partners with a
link into the Supply partners tab.

## Search & click-to-answer

- **Search** sits in the top bar on every page (and the hero on home). Press `/` to focus it,
  `Esc` to clear. Results are grouped **Branches / Brands / Partners** — searching `Huawei` finds
  the brand *and* the four partners that supply it; `Universe` finds the partner and its four
  brands.
- On a branch or partner tab the search also **filters the visible cards** and shows an
  `n of m shown` counter with a Clear button.
- **Click any supply-partner chip** on a brand card to spotlight that partner's brands.
- Brands that span branches — **Huawei** and **Black Stone** — carry an **“Also in …”** link.
- Landing on `active.html#focus=Huawei` (or any `#focus=` brand/partner) highlights and scrolls
  to that card.

## Insights

Computed live from `data.js`, so they cannot drift from the map:

- Home carries a single sentence — `27 brand entries across 5 branches, supplied by 18 partners —
  4 brands bought directly from Quality.`
- **Supply partners** tab ends with **Single-source risk** (brands with only one distributor) and
  **Partner coverage** (which branches each partner serves).


## Credit

Built by **Seif Eldin** — footer links to
[GitHub](https://github.com/seifmomo) and
[LinkedIn](https://www.linkedin.com/in/seif-said-a9441b366).

## The tabs

Every tab is a real page: it opens in its own browser tab, the URL can be shared or
bookmarked, and each page ends with **previous / next tab** links. The bar marks the current
tab.

## Layout

```
index.html  active.html  industrial.html  passive.html
rack.html   phone.html   supply.html      contact.html
assets/data.js             content — the single source of truth
assets/app.js              rendering, bar, hero, search, insights, reveals, form
assets/style.css           design system
assets/icon.svg            tab icon — Quality swoosh on white
assets/apple-touch-icon.png
img/quality-logo.png       Quality logo (dark, for the white UI)
img/brand-wall.jpg
img/preview.png            home preview for this README
img/og.png                 1200×630 social share card
robots.txt  sitemap.xml    crawler + indexing
```

## Share & SEO

Each page carries a canonical URL, `theme-color`, Open Graph and Twitter-card tags pointing at
`img/og.png`, so links preview cleanly in WhatsApp and LinkedIn. The home page also embeds
JSON-LD (`Organization` + `WebSite`).


## Design

- White canvas, emerald `#0F7A52` / `#12B981` accent with a warm `#F26522` highlight.
- Hairline `#E3E9E6` borders, soft shadows, glass-free and print-friendly.
- Motion: logo pop-in, staggered row reveals, hover slide + accent edge, animated active-tab
  underline, smooth bar slide-down, scroll-progress line, one-shot fade-in on scroll.
- No build step, no dependencies: static HTML + CSS + vanilla JS.
- `prefers-reduced-motion` respected; print stylesheet included.

## Content

Transcribed from the Quality Network mind map (`Quality → Network / Data`). Spellings kept as
supplied (`Grand Steem`, `El Con Novd`, `Intepris / E-Kit`); `Brand-Connection` normalised to
`Brand Connection` and `Silicon21 + Middle East` split into `Silicon 21` and `Middle East`.

## Licence

© Quality Egyptian Engineering Projects Co. — Cairo, Egypt.