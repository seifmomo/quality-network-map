# Quality Network — Network / Data

[![Live site](https://img.shields.io/badge/live%20site-seifmomo.github.io-10B981?style=flat-square)](https://seifmomo.github.io/quality-network-map/)
[![Repo](https://img.shields.io/badge/repo-seifmomo%2Fquality--network--map-2f9e6b?style=flat-square)](https://github.com/seifmomo/quality-network-map)
[![Pages](https://img.shields.io/badge/sections-8%20tabs-FF7A33?style=flat-square)](#the-eight-tabs)

### ➜ **Live: https://seifmomo.github.io/quality-network-map/**

A modern dark site for the **Quality Network / Data** division. Every section lives in its own
tab (page), and the home hero carries a large centred selector menu that folds away into a slim
top bar as soon as you scroll.

| Tab | Page | Contents |
| --- | --- | --- |
| Home | `index.html` | Centred section menu, at-a-glance strip, full map overview, brand wall |
| Active / WiFi | `active.html` | Huawei, Cisco, Aruba, D-Link, TP-Link |
| Industrial SW | `industrial.html` | Planet, Antaira, TrendNet, Huawei iMaster |
| Passive | `passive.html` | Legrand, Leviton, Panduit, Datwyler, CommScope, Pro Link, Black Stone, El Sweedy, Premium Line |
| Rack | `rack.html` | ACS, Pro-Rack, Black Stone, Mirsan, ESTAP |
| IP Telephone | `phone.html` | Alcatel, Mitel, Grand Steem, Avaya |
| Supply partners | `supply.html` | All 18 partners + the branches each one serves |
| Contact | `contact.html` | Phone, email, address, website, enquiry form |

**5 branches · 27 brand entries · 18 supply partners · 4 direct-supply brands**

---

## The eight tabs

Every tab is a real page, so it opens in its own browser tab and each URL can be shared or
bookmarked directly. The top bar and the previous/next links move between tabs in one click.

## The hero selector

The home hero shows all sections as large centred cards. Scrolling (or pressing `Esc`,
`↓` / `PageDown`) collapses the hero menu and brings the slim top bar back in — the sections
stay one scroll away via the bar.

## Layout

```
index.html  active.html  industrial.html  passive.html
rack.html   phone.html   supply.html      contact.html
assets/data.js    all content — the single source of truth
assets/app.js     rendering, tab bar, hero collapse, fades, form
assets/style.css  design system
img/brand-wall.jpg
```

## Design

- Deep near-black background with emerald → orange accents, hairline borders, glass cards.
- Gradient display type, generous spacing, one-shot fade-in on scroll.
- No build step: static HTML + CSS + vanilla JS, works straight from `file://`.
- Respects `prefers-reduced-motion`; print styles included.

## Content

Transcribed from the Quality Network mind map (`Quality → Network / Data`). Spellings kept as
supplied (`Grand Steem`, `El Con Novd`, `Intepris / E-Kit`); `Brand-Connection` normalised to
`Brand Connection` and `Silicon21 + Middle East` split into `Silicon 21` and `Middle East`.

## Licence

© Quality Egyptian Engineering Projects Co. — Cairo, Egypt.