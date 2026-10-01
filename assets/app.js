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

  /* ---------------- brand mark ---------------- */
  const markFor = brand => {
    const si = LOGO[brand.toLowerCase()];
    return si
      ? `<img class="lg" src="https://cdn.simpleicons.org/${si}/0B1512" alt="${esc(brand)}" loading="lazy">`
      : `<span class="mark">${esc(brand.slice(0, 2).toUpperCase())}</span>`;
  };
  const withChips = list => list.length
    ? `<div class="chips">${list.map(w => `<span class="chip">${esc(w)}</span>`).join('')}</div>`
    : `<div class="chips"><span class="chip none">Direct supply — no distributor</span></div>`;

  const brandCard = b => `
    <article class="bcard" data-fade>
      <div class="top">${markFor(b.b)}<div><h3>${esc(b.b)}</h3><div class="wl">brand</div></div></div>
      ${withChips(b.with)}
      <div class="link">
        ${b.with.length ? `<span>Supplied by <b>${b.with.length}</b> partner${b.with.length > 1 ? 's' : ''}</span>`
                        : `<span>Supplied <b>directly</b> by Quality</span>`}
      </div>
    </article>`;

  const supplyCard = s => `
    <article class="scard" data-fade>
      <h3>${esc(s.p)}</h3>
      <div class="srv">${s.serves.map(c => `<a href="${file(c.id)}">${esc(c.title)}</a>`).join('')}</div>
      <div class="br"><i>Brands</i><b>${s.brands.map(esc).join(' · ')}</b></div>
    </article>`;

  /* ---------------- shell ---------------- */
  $('#bar').innerHTML = `
    <div class="bar-in">
      <a href="index.html" aria-label="Quality Network home"><img class="logo" src="img/quality-logo.png" alt="Quality"></a>
      <span class="brand">Network / Data</span>
      <nav>${TABS.filter(t => t.id !== 'home')
        .map(t => `<a href="${t.file}"${t.id === PAGE ? ' class="on"' : ''}>${esc(t.label)}</a>`).join('')}</nav>
      <a class="tel" href="tel:${COMPANY.tel}">${PHONE}${esc(COMPANY.phone)}</a>
      <button class="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i><i></i></button>
    </div>`;

  $('#mob').innerHTML = TABS.map(t =>
    `<a href="${t.file}"${t.id === PAGE ? ' class="on"' : ''}><span>${esc(t.label)}</span><i>${esc(t.sub)}</i></a>`).join('');

  $('#foot').innerHTML = `
    <div class="foot-in">
      <div><b>Quality — ${esc(COMPANY.branch)}</b><br>${esc(COMPANY.address)}</div>
      <div style="display:flex;gap:18px;flex-wrap:wrap">
        <a href="tel:${COMPANY.tel}">${esc(COMPANY.phone)}</a>
        <a href="mailto:${COMPANY.email}">${esc(COMPANY.email)}</a>
        <a href="${COMPANY.site}" target="_blank" rel="noopener">qualityegypt.com</a>
      </div>
    </div>`;

  /* ---------------- home ---------------- */
  if (PAGE === 'home') {
    $('#hphone').textContent = COMPANY.phone;

    const nodes = [
      ...MINDMAP.map(m => ({
        href: file(m.id), ix: m.no, title: m.title, n: m.brands.length,
        meta: m.brands.reduce((a, b) => a + b.with.length, 0) + ' supply links',
        list: m.brands.slice(0, 4).map(b => b.b),
        more: m.brands.length > 4 ? `+${m.brands.length - 4}` : ''
      })),
      {href: 'supply.html', ix: '06', title: 'Supply partners', n: SUPPLY.length,
        meta: 'across all five branches', list: SUPPLY.slice(0, 4).map(s => s.p), more: `+${SUPPLY.length - 4}`},
      {href: 'contact.html', ix: '07', title: 'Contact', n: 0,
        meta: 'Cairo, Egypt', list: [COMPANY.phone, COMPANY.email], more: ''}
    ];

    $('#nodes').innerHTML = nodes.map(x => `
      <a class="node" href="${x.href}" data-fade>
        <span class="cnt">${String(x.n).padStart(2, '0')}</span>
        <span class="top"><span class="ix">${x.ix}</span><span class="arw">${ARROW}</span></span>
        <h3>${esc(x.title)}</h3>
        <div class="meta">${esc(x.meta)}</div>
        <div class="list">${x.list.map(v => `<span>${esc(v)}</span>`).join('')}${x.more ? `<span>${x.more}</span>` : ''}</div>
      </a>`).join('');

    $('#strip').innerHTML = [
      [MINDMAP.length, 'branches'],
      [BRAND_COUNT, 'brand entries'],
      [SUPPLY.length, 'supply partners'],
      [DIRECT.length, 'direct brands']
    ].map(([n, l]) => `<div data-fade><b class="grad">${n}</b><span>${l}</span></div>`).join('');

    $('#ov').innerHTML = MINDMAP.map(m => `
      <div class="ov-col" data-fade>
        <h3>${esc(m.title)} <i>${m.no}</i></h3>
        <ul>${m.brands.map(b => `<li><b>${esc(b.b)}</b><span class="${b.with.length ? '' : 'none'}">${b.with.length ? b.with.map(esc).join(' · ') : 'direct supply'}</span></li>`).join('')}</ul>
        <a class="more" href="${file(m.id)}">Open tab ${BIG}</a>
      </div>`).join('');

    /* --- connector lines: hub → every node --- */
    const tree = $('#tree'), svg = $('#lines'), hub = $('.hub');
    const draw = () => {
      const box = tree.getBoundingClientRect();
      const hb  = hub.getBoundingClientRect();
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      svg.setAttribute('width', box.width);
      svg.setAttribute('height', box.height);
      const x0 = hb.left - box.left + hb.width / 2;
      const y0 = hb.bottom - box.top;
      svg.innerHTML = $$('.node', tree).map((n, i) => {
        const nb = n.getBoundingClientRect();
        const x1 = nb.left - box.left + nb.width / 2;
        const y1 = nb.top - box.top;
        const dy = Math.max(24, (y1 - y0) * .55);
        const p = `M${x0},${y0} C${x0},${y0 + dy} ${x1},${y1 - dy} ${x1},${y1}`;
        return `<path d="${p}" style="--len:900;animation-delay:${.3 + i * .07}s" data-i="${i}"></path>`;
      }).join('');
    };
    const redraw = () => requestAnimationFrame(draw);
    addEventListener('resize', redraw);
    addEventListener('load', redraw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
    $$('.node', tree).forEach((n, i) => {
      n.addEventListener('mouseenter', () => { const p = $(`path[data-i="${i}"]`, svg); if (p) p.classList.add('hot'); });
      n.addEventListener('mouseleave', () => { const p = $(`path[data-i="${i}"]`, svg); if (p) p.classList.remove('hot'); });
    });
    draw();
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
          <div class="strip" style="margin-bottom:22px">
            ${[
              [branch.brands.length, 'brands here'],
              [branch.brands.filter(b => !b.with.length).length, 'direct supply'],
              [new Set(branch.brands.flatMap(b => b.with)).size, 'supply partners'],
              [branch.no, 'branch no.']
            ].map(([n, l]) => `<div data-fade><b class="grad">${n}</b><span>${l}</span></div>`).join('')}
          </div>
          <div class="grid g3">${branch.brands.map(brandCard).join('')}</div>
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
      <section class="section tight"><div class="wrap grid g3">${SUPPLY.map(supplyCard).join('')}</div></section>
      <section class="section alt">
        <div class="wrap">
          <div class="sechead">
            <span class="eyebrow" data-fade>Direct supply</span>
            <h2 data-fade>${DIRECT.length} brands supplied directly by Quality</h2>
            <p data-fade>No distributor in between — straight from Quality to the project.</p>
          </div>
          <div class="chips" data-fade>${DIRECT.map(d => `<span class="chip">${esc(d)}</span>`).join('')}</div>
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

  /* ---------------- bar + hero collapse ---------------- */
  const bar = $('#bar'), hero = $('.hero'), mob = $('#mob'), burger = $('.burger');
  const TOP = 40;

  const sync = () => {
    if (PAGE === 'home') {
      const down = scrollY > TOP;
      document.body.classList.toggle('bar-on', down);
      if (hero) hero.classList.toggle('sunk', down);
    } else {
      document.body.classList.add('bar-on');
    }
    bar.classList.toggle('stuck', scrollY > 8);
  };
  sync();
  addEventListener('scroll', sync, {passive: true});

  /* any key press folds the hero menu back into the bar */
  addEventListener('keydown', e => {
    if (['Escape', 'ArrowDown', 'PageDown'].includes(e.key)) {
      scrollTo({top: TOP + 140, behavior: 'smooth'});
    }
  });

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