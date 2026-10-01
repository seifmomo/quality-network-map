/* ===========================================================
   Quality Network — behaviour + page rendering
   =========================================================== */
(() => {
  'use strict';

  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const PAGE = document.body.dataset.page || 'home';
  const esc  = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const file = id => id + '.html';

  const ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const BIG   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
  const PHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>';

  /* ---------------- search index (built from data.js) ---------------- */
  const TOTAL = MINDMAP.reduce((n, m) => n + m.brands.length, 0);

  const searchData = (() => {
    const brands = new Map();
    MINDMAP.forEach(m => m.brands.forEach(b => {
      if (!brands.has(b.b)) brands.set(b.b, {name: b.b, branches: [], partners: new Set()});
      const e = brands.get(b.b);
      if (!e.branches.some(x => x.id === m.id)) e.branches.push({id: m.id, title: m.title});
      b.with.forEach(w => e.partners.add(w));
    }));
    return {
      brands: [...brands.values()].map(e => ({...e, partners: [...e.partners].sort()})),
      partners: SUPPLY.map(s => ({name: s.p, brands: s.brands.slice(), branches: s.serves.map(c => c.title)})),
      branches: MINDMAP.map(m => ({name: m.title, id: m.id, no: m.no, count: m.brands.length}))
    };
  })();

  const search = q => {
    const t = q.trim().toLowerCase();
    if (!t) return null;
    const has = s => String(s).toLowerCase().includes(t);
    return {
      branches: searchData.branches.filter(x => has(x.name) || has(x.no)).slice(0, 6),
      brands:   searchData.brands.filter(x => has(x.name) || x.partners.some(has) || x.branches.some(b => has(b.title))).slice(0, 8),
      partners: searchData.partners.filter(x => has(x.name) || x.brands.some(has) || x.branches.some(has)).slice(0, 8)
    };
  };

  const alsoIn = name => {
    const e = searchData.brands.find(x => x.name === name);
    if (!e) return '';
    const others = e.branches.filter(b => b.id !== PAGE);
    if (!others.length) return '';
    return `<div class="also">Also in ${others.map(o =>
      `<a href="${file(o.id)}#focus=${encodeURIComponent(name)}">${esc(o.title)}</a>`).join(', ')}</div>`;
  };

  /* ---------------- brand mark ---------------- */
  const markFor = brand => {
    const si = LOGO[brand.toLowerCase()];
    return si
      ? `<img class="lg" src="https://cdn.simpleicons.org/${si}/0B1512" alt="${esc(brand)}" loading="lazy">`
      : `<span class="mark">${esc(brand.slice(0, 2).toUpperCase())}</span>`;
  };
  const withChips = list => list.length
    ? `<div class="chips">${list.map(w => `<button type="button" class="chip act" data-partner="${esc(w)}">${esc(w)}</button>`).join('')}</div>`
    : `<div class="chips"><span class="chip none">Direct supply — no distributor</span></div>`;

  const brandCard = b => `
    <article class="bcard" data-name="${esc(b.b)}" data-hay="${esc(b.b + ' ' + b.with.join(' '))}" data-fade>
      <div class="top">${markFor(b.b)}<div><h3>${esc(b.b)}</h3><div class="wl">brand</div></div></div>
      ${withChips(b.with)}
      <div class="link">
        ${b.with.length ? `<span>Supplied by <b>${b.with.length}</b> partner${b.with.length > 1 ? 's' : ''}</span>`
                        : `<span>Supplied <b>directly</b> by Quality</span>`}
      </div>
      ${alsoIn(b.b)}
    </article>`;

  const supplyCard = s => `
    <article class="scard" data-name="${esc(s.p)}" data-hay="${esc(s.p + ' ' + s.brands.join(' ') + ' ' + s.serves.map(c => c.title).join(' '))}" data-fade>
      <h3>${esc(s.p)}</h3>
      <div class="srv">${s.serves.map(c => `<a href="${file(c.id)}">${esc(c.title)}</a>`).join('')}</div>
      <div class="br"><i>Brands</i><b>${s.brands.map(esc).join(' · ')}</b></div>
    </article>`;

  /* cols: [{label, title, dir}]  rows: {lead, verb, on, dir, items:[{label}]}  links: [{a, b}] */
  const DIRECT_ROW = 'Quality — direct';
  const matrix = (cols, rows, links) => {
    const anyDir = cols.some(c => c.dir);
    return `
    <div class="mtxwrap" data-fade>
      <table class="mtx">
        <thead><tr><th class="lead">${esc(rows.lead)}</th>${cols.map(c =>
          `<th${c.dir ? ' class="dir"' : ''} title="${esc(c.title || c.label)}">${esc(c.label)}${c.dir ? ' ◆' : ''}</th>`).join('')}</tr></thead>
        <tbody>
          ${rows.items.map(r => `
            <tr${r.label === DIRECT_ROW ? ' class="dir"' : ''}>
              <th class="lead">${esc(r.label)}</th>
              ${cols.map(c => {
                const on = links.some(l => l.a === r.label && l.b === c.label);
                return `<td title="${esc(on ? `${r.label} ${rows.verb} ${c.label}` : '')}"><i class="dot${on ? ' on' : ''}"></i></td>`;
              }).join('')}
            </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div class="legend">
      <span><i></i>${esc(rows.on)}</span>
      ${rows.items.some(r => r.label === DIRECT_ROW) ? `<span><i class="dir"></i>${esc(DIRECT_ROW)}</span>` : ''}
      ${anyDir ? '<span><i class="dir" style="border-radius:50%"></i>Column marked ◆ is supplied straight by Quality</span>' : ''}
    </div>`;
  };

  /* ---------------- shell ---------------- */
  $('#bar').innerHTML = `
    <div class="bar-in">
      <a href="index.html" aria-label="Quality Network home"><img class="logo" src="img/quality-logo.png" alt="Quality"></a>
      <span class="brand">Network / Data</span>
      <nav>${TABS.filter(t => t.id !== 'home')
        .map(t => `<a href="${t.file}"${t.id === PAGE ? ' class="on"' : ''}>${esc(t.label)}</a>`).join('')}</nav>
      <label class="bsearch">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        <input id="barq" type="search" autocomplete="off" placeholder="Search" aria-label="Search brands and partners">
      </label>
      <a class="tel" href="tel:${COMPANY.tel}">${PHONE}${esc(COMPANY.phone)}</a>
      <button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
    </div>`;

  $('#mob').innerHTML = TABS.map(t =>
    `<a href="${t.file}"${t.id === PAGE ? ' class="on"' : ''}><span>${esc(t.label)}</span><i>${esc(t.sub)}</i></a>`).join('');

  const GH  = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>';
  const LI  = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.84 0-2.12 1.43-2.12 2.9V21h-4V9Z"/></svg>';

  $('#foot').innerHTML = `
    <div class="foot-in">
      <div><b>Quality — ${esc(COMPANY.branch)}</b><br>${esc(COMPANY.address)}</div>
      <div style="display:flex;gap:18px;flex-wrap:wrap">
        <a href="tel:${COMPANY.tel}">${esc(COMPANY.phone)}</a>
        <a href="mailto:${COMPANY.email}">${esc(COMPANY.email)}</a>
        <a href="${COMPANY.site}" target="_blank" rel="noopener">qualityegypt.com</a>
      </div>
    </div>
    <div class="credit">
      <span>Made by <span class="who">${esc(AUTHOR.name)}</span></span>
      <span class="dot"></span>
      <span>for Quality Egyptian Engineering Projects</span>
      <span class="soc">
        <a href="${AUTHOR.github}" target="_blank" rel="noopener">${GH} GitHub</a>
        <a href="${AUTHOR.linkedin}" target="_blank" rel="noopener">${LI} LinkedIn</a>
      </span>
    </div>`;

  /* ---------------- search UI ---------------- */
  const SRES = document.createElement('div');
  SRES.className = 'sres';
  SRES.hidden = true;
  document.body.appendChild(SRES);

  let activeInput = null;
  const closeRes = () => { SRES.hidden = true; SRES.innerHTML = ''; activeInput = null; };

  const srow = (href, kind, title, meta) =>
    `<a class="srow" href="${href}"><span class="sk">${kind}</span><b>${title}</b><span class="sm">${meta}</span></a>`;

  const renderResults = (q, input) => {
    const r = search(q);
    if (!r) { closeRes(); return; }
    const out = [];
    if (r.branches.length) out.push('<div class="sgrp">Branches</div>' + r.branches.map(x =>
      srow(file(x.id), esc(x.no), esc(x.name), `${x.count} brands`)).join(''));
    if (r.brands.length) out.push('<div class="sgrp">Brands</div>' + r.brands.map(x =>
      srow(file(x.branches[0].id) + '#focus=' + encodeURIComponent(x.name), 'brand', esc(x.name),
        (x.partners.length ? esc(x.partners.join(' · ')) : 'direct supply') + ' · ' + x.branches.map(b => esc(b.title)).join(', '))).join(''));
    if (r.partners.length) out.push('<div class="sgrp">Partners</div>' + r.partners.map(x =>
      srow('supply.html#focus=' + encodeURIComponent(x.name), 'partner', esc(x.name),
        `${x.brands.length} brands · ${x.branches.map(esc).join(', ')}`)).join(''));
    if (!out.length) out.push(`<div class="snone">No match for “${esc(q)}”.</div>`);
    SRES.innerHTML = out.join('');
    SRES.hidden = false;
    const box = input.getBoundingClientRect();
    SRES.style.top = (box.bottom + 8) + 'px';
    SRES.style.left = Math.max(12, Math.min(box.left, innerWidth - Math.max(box.width, 340) - 12)) + 'px';
    SRES.style.width = Math.max(box.width, 340) + 'px';
    activeInput = input;
  };

  const initSearch = (input, onChange) => {
    if (!input) return;
    input.addEventListener('input', () => { renderResults(input.value, input); onChange && onChange(input.value); });
    input.addEventListener('focus', () => { if (input.value.trim()) renderResults(input.value, input); });
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') { input.value = ''; closeRes(); onChange && onChange(''); input.blur(); }
      if (e.key === 'ArrowDown') { const a = $('.srow', SRES); if (a) { e.preventDefault(); a.focus(); } }
      if (e.key === 'Enter') { const a = $('.srow', SRES); if (a) { e.preventDefault(); location.href = a.getAttribute('href'); } }
    });
  };

  SRES.addEventListener('click', e => { if (e.target.closest('.srow')) closeRes(); });
  addEventListener('scroll', () => { if (!SRES.hidden) closeRes(); }, {passive: true});
  addEventListener('resize', () => { if (!SRES.hidden) closeRes(); }, {passive: true});
  document.addEventListener('click', e => {
    if (activeInput && !SRES.contains(e.target) && e.target !== activeInput) closeRes();
  });
  addEventListener('keydown', e => {
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) {
      const i = $('#heroq') || $('#barq');
      if (i) { e.preventDefault(); i.focus(); }
    }
  });

  /* cards / matrix switch */
  const toggle = () => `<div class="viewtoggle">
      <button class="on" data-set="cards">Cards</button>
      <button data-set="matrix">Matrix</button>
    </div>`;

  /* ---------------- home ---------------- */
  if (PAGE === 'home') {
    const rows = [
      ...MINDMAP.map(m => ({
        href: file(m.id), ix: m.no, title: m.title,
        n: `${m.brands.length} ${m.brands.length === 1 ? 'brand' : 'brands'}`,
        tags: m.brands.map(b => b.b).join(' · ')
      })),
      {href: 'supply.html', ix: '06', title: 'Supply partners',
       n: `${SUPPLY.length} partners`, tags: SUPPLY.slice(0, 8).map(s => s.p).join(' · ') + ' …'},
      {href: 'contact.html', ix: '07', title: 'Contact', n: 'Cairo, Egypt',
       tags: `${COMPANY.phone} · ${COMPANY.email}`}
    ];

    $('#nodes').innerHTML = rows.map((r, i) => `
      <a class="row" href="${r.href}" data-hay="${esc(r.title + ' ' + r.tags)}" data-fade style="transition-delay:${120 + i * 55}ms">
        <span class="ix">${r.ix}</span>
        <span class="nm"><b>${esc(r.title)}</b><i>${esc(r.n)}</i></span>
        <span class="tags">${esc(r.tags)}</span>
        <span class="arw">${ARROW}</span>
      </a>`).join('');

    const insight = $('#insight');
    if (insight) insight.textContent =
      `${TOTAL} brand entries across ${MINDMAP.length} branches, supplied by ${SUPPLY.length} partners — ${DIRECT.length} brands bought directly from Quality.`;

    $('#bandcount').textContent = `${SUPPLY.length} partners behind the five branches`;
    $('#bandchips').innerHTML = SUPPLY.map(s => `<span class="chip">${esc(s.p)}</span>`).join('');

    $('#ov').innerHTML = MINDMAP.map(m => `
      <div class="ov-col" data-fade>
        <h3>${esc(m.title)} <i>${m.no}</i></h3>
        <ul>${m.brands.map(b => `<li><b>${esc(b.b)}</b><span class="${b.with.length ? '' : 'none'}">${b.with.length ? b.with.map(esc).join(' · ') : 'direct supply'}</span></li>`).join('')}</ul>
        <a class="more" href="${file(m.id)}">Open tab ${BIG}</a>
      </div>`).join('');
  }

  /* ---------------- branch tabs ---------------- */
  const branch = MINDMAP.find(m => m.id === PAGE);
  if (branch) {
    const i = MINDMAP.indexOf(branch);
    const prev = MINDMAP[(i - 1 + MINDMAP.length) % MINDMAP.length];
    const next = MINDMAP[(i + 1) % MINDMAP.length];

    $('#phero').innerHTML = `
      <div class="wrap phero-in">
        <div>
          <div class="crumb"><a href="index.html">Network / Data</a> <span>/</span> <span>${esc(branch.title)}</span></div>
          <h1>${esc(branch.title)}</h1>
          <p class="blurb">${esc(branch.blurb)}</p>
          <p class="note">${esc(branch.note)}</p>
        </div>
        <div class="no">${branch.no}</div>
      </div>`;

    $('#body').innerHTML = `
      <section class="section tight">
        <div class="wrap">
          <div class="sechead" style="display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap">
            <div>
              <span class="eyebrow" data-fade>Brands</span>
              <h2 data-fade>${esc(branch.title)} brands and their supplier</h2>
            </div>
            ${toggle()}
          </div>

          <div class="filterbar" id="filterbar" hidden></div>

          <div id="cards" data-view="cards">
            <div class="grid g3">${branch.brands.map(brandCard).join('')}</div>
          </div>

          <div id="matrix" data-view="matrix" hidden>
            ${matrix(
              branch.brands.map(b => ({label: b.b, title: b.b, dir: !b.with.length})),
              {
                lead: 'Supplier', verb: 'supplies', on: 'Partner supplies this brand',
                items: [
                  ...[...new Set(branch.brands.flatMap(b => b.with))].sort().map(p => ({label: p})),
                  {label: DIRECT_ROW}
                ]
              },
              [
                ...branch.brands.flatMap(b => b.with.map(w => ({a: w, b: b.b}))),
                ...branch.brands.filter(b => !b.with.length).map(b => ({a: DIRECT_ROW, b: b.b}))
              ]
            )}
          </div>
        </div>
      </section>

      <section class="section alt">
        <div class="wrap">
          <div class="sechead">
            <span class="eyebrow" data-fade>Supply chain</span>
            <h2 data-fade>Who supplies this branch</h2>
            <p data-fade>Every partner below is linked to at least one brand in ${esc(branch.title)}.</p>
          </div>
          <div class="grid g3">
            ${SUPPLY.filter(s => s.serves.some(c => c.id === branch.id)).map(supplyCard).join('') ||
              '<p class="muted">Every brand in this branch is supplied directly by Quality.</p>'}
          </div>
        </div>
      </section>

      <section class="section">
        <div class="wrap pn">
          <a href="${file(prev.id)}">${BIG.replace('<svg', '<svg style="transform:rotate(180deg)"')}
            <span><small>Previous tab</small><b>${esc(prev.title)}</b></span></a>
          <a class="next" href="${file(next.id)}">
            <span><small>Next tab</small><b>${esc(next.title)}</b></span>${BIG}</a>
        </div>
      </section>`;
  }

  /* ---------------- supply tab ---------------- */
  if (PAGE === 'supply') {
    $('#phero').innerHTML = `
      <div class="wrap phero-in">
        <div>
          <div class="crumb"><a href="index.html">Network / Data</a> <span>/</span> <span>Supply partners</span></div>
          <h1>Supply partners</h1>
          <p class="blurb">The distributor and supplier network behind every Quality branch.</p>
          <p class="note">${SUPPLY.length} partners, each mapped to the brands and branches it serves. Direct-supply brands carry no partner.</p>
        </div>
        <div class="no">06</div>
      </div>`;

    $('#body').innerHTML = `
      <section class="section tight">
        <div class="wrap">
          <div class="sechead" style="display:flex;align-items:flex-end;justify-content:space-between;gap:18px;flex-wrap:wrap">
            <div>
              <span class="eyebrow" data-fade>All partners</span>
              <h2 data-fade>Who supplies which branch</h2>
            </div>
            ${toggle()}
          </div>

          <div class="filterbar" id="filterbar" hidden></div>

          <div id="pcards" data-view="cards"><div class="grid g3">${SUPPLY.map(supplyCard).join('')}</div></div>

          <div data-view="matrix" hidden>
            ${matrix(
              MINDMAP.map(m => ({label: m.title, title: m.title})),
              {
                lead: 'Partner', verb: 'supplies brands in', on: 'Partner supplies that branch',
                items: SUPPLY.map(s => ({label: s.p}))
              },
              SUPPLY.flatMap(s => s.serves.flatMap(c =>
                c.brands.filter(b => b.with.includes(s.p)).map(() => ({a: s.p, b: c.title}))))
            )}
          </div>
        </div>
      </section>

      <section class="section alt" id="direct">
        <div class="wrap">
          <div class="sechead">
            <span class="eyebrow" data-fade>Direct supply</span>
            <h2 data-fade>${DIRECT.length} brands supplied directly by Quality</h2>
            <p data-fade>No distributor in between — straight from Quality to the project.</p>
          </div>
          <div class="chips" data-fade>${DIRECT.map(d => `<span class="chip">${esc(d)}</span>`).join('')}</div>
        </div>
      </section>

      <section class="section" id="insights">
        <div class="wrap">
          <span class="eyebrow" data-fade>Insights</span>
          <h2 data-fade style="margin-top:14px">Where the supply chain is exposed</h2>
          <p class="muted" data-fade style="max-width:62ch;margin-top:10px">Brands with a single distributor depend on that one partner. Worth a second source, or a buffer stock.</p>
          <div class="sslist" data-fade>${(() => {
            const single = MINDMAP.flatMap(m => m.brands.map(b => ({...b, branch: m.title})))
              .filter(b => b.with.length === 1);
            return single.map(b => `<div class="ssitem"><b>${esc(b.b)}</b><span>only ${esc(b.with[0])} · ${esc(b.branch)}</span></div>`).join('')
              || '<div class="ssitem"><b>None</b><span>every brand has more than one route</span></div>';
          })()}</div>

          <h2 data-fade style="margin-top:46px;font-size:clamp(1.3rem,2.6vw,1.8rem)">Partner coverage</h2>
          <div class="cov" data-fade>${SUPPLY.slice().sort((a, b) => b.serves.length - a.serves.length).map(s => `
            <div class="cov-row"><b>${esc(s.p)}</b><span>${esc(s.serves.map(c => c.title).join(' · '))} — ${s.brands.length} brand${s.brands.length > 1 ? 's' : ''}</span></div>`).join('')}</div>
        </div>
      </section>`;
  }

  /* ---------------- contact tab ---------------- */
  if (PAGE === 'contact') {
    $('#phero').innerHTML = `
      <div class="wrap phero-in">
        <div>
          <div class="crumb"><a href="index.html">Network / Data</a> <span>/</span> <span>Contact</span></div>
          <h1>Contact</h1>
          <p class="blurb">Talk to the Network / Data team in Cairo.</p>
        </div>
        <div class="no">07</div>
      </div>`;

    $('#body').innerHTML = `
      <section class="section tight">
        <div class="wrap g2" style="display:grid;gap:14px">
          <div class="cbox" data-fade><div class="ic">${PHONE}</div><b>Phone</b>
            <a href="tel:${COMPANY.tel}" style="font-size:1.3rem;font-weight:750">${esc(COMPANY.phone)}</a></div>
          <div class="cbox" data-fade><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/></svg></div><b>Email</b>
            <a href="mailto:${COMPANY.email}" style="font-size:1.3rem;font-weight:750">${esc(COMPANY.email)}</a></div>
          <div class="cbox" data-fade><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg></div><b>Address</b>
            <p style="font-size:1.02rem">${esc(COMPANY.address)}</p></div>
          <div class="cbox" data-fade><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></svg></div><b>Website</b>
            <a href="${COMPANY.site}" target="_blank" rel="noopener" style="font-size:1.3rem;font-weight:750">qualityegypt.com</a></div>
        </div>
      </section>

      <section class="section alt">
        <div class="wrap form" data-fade>
          <span class="eyebrow">Send a message</span>
          <h2 style="font-size:clamp(1.4rem,3vw,2rem);margin:14px 0 18px">Request a quotation</h2>
          <form id="qf" novalidate>
            <div class="grid g2">
              <div class="f"><label>Name</label><input name="name" required autocomplete="name"><span class="msg">Please enter your name.</span></div>
              <div class="f"><label>Company</label><input name="company" autocomplete="organization"></div>
              <div class="f"><label>Email</label><input name="email" type="email" required autocomplete="email"><span class="msg">Please enter a valid email.</span></div>
              <div class="f"><label>Branch</label><select name="branch">${MINDMAP.map(m => `<option>${esc(m.title)}</option>`).join('')}<option>Supply partners</option><option>Other</option></select></div>
            </div>
            <div class="f"><label>Message</label><textarea name="message" required placeholder="Scope, quantities, delivery location…"></textarea><span class="msg">Please add a short message.</span></div>
            <button class="btn btn-p" type="submit">Send message
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3 3 10.5l7 3 3 7L21 3Z"/></svg></button>
            <p class="muted" style="font-size:.78rem;margin-top:14px" id="qnote">Demonstration form — nothing is sent. Email ${esc(COMPANY.email)}.</p>
          </form>
        </div>
      </section>`;

    const form = $('#qf');
    if (form) form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;
      $$('.f', form).forEach(f => {
        const inp = $('input,textarea', f);
        if (!inp || !inp.required) return;
        const v = inp.value.trim();
        const bad = inp.type === 'email' ? !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) : !v;
        f.classList.toggle('invalid', bad);
        if (bad) ok = false;
      });
      if (!ok) return;
      $('#qnote').innerHTML = `Thank you — this is a demo form, so nothing was sent. Please email <a href="mailto:${COMPANY.email}" style="color:var(--em)">${esc(COMPANY.email)}</a> or call ${esc(COMPANY.phone)}.`;
      form.reset();
    });
  }

  /* ---------------- bar appears only after the hero ---------------- */
  const bar = $('#bar'), hero = $('.hero'), mob = $('#mob'), burger = $('.burger');

  const sync = () => {
    if (PAGE === 'home' && hero) {
      /* hero fully scrolled past → bar slides in */
      const end = hero.offsetTop + hero.offsetHeight;
      document.body.classList.toggle('bar-on', scrollY >= end - 2);
    } else {
      document.body.classList.add('bar-on');
    }
    bar.classList.toggle('stuck', scrollY > 8);
  };
  sync();
  addEventListener('scroll', sync, {passive: true});
  addEventListener('resize', sync, {passive: true});

  burger.addEventListener('click', () => {
    const open = mob.classList.toggle('on');
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', open);
  });

  /* scroll progress */
  const prog = $('#prog');
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (scrollY / h) * 100 : 0) + '%';
  };
  addEventListener('scroll', onScroll, {passive: true});
  onScroll();

  /* ---------------- cards / matrix view ---------------- */
  const panels = $$('[data-view]');
  const setView = v => {
    panels.forEach(p => { p.hidden = p.dataset.view !== v; });
    $$('.viewtoggle button').forEach(b => b.classList.toggle('on', b.dataset.set === v));
    try { history.replaceState(null, '', v === 'cards' ? location.pathname : '#' + v); } catch (e) { /* file:// */ }
  };
  $$('.viewtoggle button').forEach(b => b.addEventListener('click', () => setView(b.dataset.set)));
  if (location.hash === '#matrix') setView('matrix');

  /* ---------------- search + filter wiring ---------------- */
  const heroq = $('#heroq'), barq = $('#barq');
  const target = PAGE === 'home' ? $('#nodes') : (branch ? $('#cards') : (PAGE === 'supply' ? $('#pcards') : null));
  const cardSel = PAGE === 'home' ? '.row' : (branch ? '.bcard' : '.scard');
  const label = PAGE === 'home' ? 'sections' : (branch ? 'brands' : 'partners');
  const filterbar = $('#filterbar');

  const applyFilter = q => {
    if (!target) return;
    const t = q.trim().toLowerCase();
    const items = $$(cardSel, target);
    items.forEach(c => {
      c.hidden = !!t && !(c.dataset.hay || '').toLowerCase().includes(t);
      if (!c.hidden) c.classList.add('in');
    });
    if (!filterbar) return;
    const n = items.filter(c => !c.hidden).length;
    filterbar.hidden = !t;
    if (t) filterbar.innerHTML = `<span><b>${n}</b> of ${items.length} ${label} shown</span><button type="button" class="fclear">Clear</button>`;
  };

  if (filterbar) filterbar.addEventListener('click', e => {
    if (e.target.closest('.fclear')) {
      [heroq, barq].forEach(i => { if (i) i.value = ''; });
      applyFilter(''); closeRes();
    }
  });

  initSearch(barq, applyFilter);
  initSearch(heroq, applyFilter);
  if (heroq) heroq.placeholder = `Search ${searchData.brands.length} brands, ${searchData.partners.length} partners…`;

  /* hero quick chips */
  $$('.chip.q').forEach(btn => btn.addEventListener('click', () => {
    if (btn.dataset.go) { location.href = btn.dataset.go; return; }
    const q = btn.dataset.q || '';
    const input = heroq || barq;
    if (input) { input.value = q; input.focus(); renderResults(q, input); applyFilter(q); }
  }));

  /* click a partner chip → spotlight that partner's brands */
  document.addEventListener('click', e => {
    const chip = e.target.closest('.chip.act');
    if (!chip) return;
    const q = chip.dataset.partner || '';
    const input = heroq || barq;
    if (input) { input.value = q; applyFilter(q); }
    if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
    if (barq && PAGE !== 'home') { barq.focus(); renderResults(q, barq); }
    else if (input) renderResults(q, input);
  });

  /* rotating hero line */
  const hl = $('#heroline');
  if (hl && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const phrases = [
      hl.textContent.trim(),
      `${TOTAL} brand entries across ${MINDMAP.length} branches`,
      `${SUPPLY.length} supply partners behind the brands`,
      `${DIRECT.length} brands supplied directly by Quality`
    ];
    let k = 0;
    setInterval(() => {
      k = (k + 1) % phrases.length;
      hl.classList.add('swap');
      setTimeout(() => { hl.textContent = phrases[k]; hl.classList.remove('swap'); }, 260);
    }, 3600);
  }

  /* #focus= highlights a brand / partner card */
  const fm = location.hash.match(/^#focus=(.+)$/);
  if (fm) {
    const name = decodeURIComponent(fm[1]);
    const el = $$('.bcard,.scard').find(c => c.dataset.name === name);
    if (el) {
      el.hidden = false;
      el.classList.add('in', 'flash');
      setTimeout(() => el.scrollIntoView({behavior: 'smooth', block: 'center'}), 160);
    }
  }

  /* ---------------- reveal once ---------------- */
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('[data-fade]').forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); }
      });
    }, {rootMargin: '0px 0px -6% 0px', threshold: .06});
    $$('[data-fade]').forEach((el, i) => { el.style.transitionDelay = (i % 7) * 60 + 'ms'; io.observe(el); });
  }
})();