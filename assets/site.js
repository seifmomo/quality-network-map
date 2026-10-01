/* ===========================================================
   Quality Network — page build + fade-in
   =========================================================== */

const $  = (s, c) => (c || document).querySelector(s);
const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
const esc = s => String(s).replace(/&(?!(amp|lt|gt|quot|#\d+);)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---- the five branches ---- */
$('#branches').innerHTML = MINDMAP.map(c => `
  <article class="branch" id="${c.id}">
    <div class="branch-lbl">
      <span class="no">${c.no}</span>
      <h2>${esc(c.title)}</h2>
      <p>${esc(c.note)}</p>
    </div>
    <div class="items">
      ${c.brands.map(b => {
        const slug = LOGO[b.b.toLowerCase()];
        const mark = slug
          ? `<img src="https://cdn.simpleicons.org/${slug}/206242" alt="" onerror="this.remove()">`
          : '';
        const line = b.with.length
          ? b.with.map(w => `<span>${esc(w)}</span>`).join('<i>/</i>')
          : '<span class="none">direct supply</span>';
        return `<div class="item">
          <span class="brand">${mark}${esc(b.b)}</span>
          <span class="partners">${line}</span>
        </div>`;
      }).join('')}
    </div>
  </article>`).join('');

/* ---- supply partners ---- */
$('#supTable').innerHTML = SUPPLY.map(s => `
  <div class="sup-row"><b>${esc(s.p)}</b><span>${s.for.map(esc).join(' &middot; ')}</span></div>`).join('');

/* ---- year ---- */
$('#yr').textContent = new Date().getFullYear();

/* ---- fade in once, then stop ---- */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  $$('[data-fade]').forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      io.unobserve(e.target);
    });
  }, {threshold: 0.12, rootMargin: '0px 0px -6% 0px'});
  $$('[data-fade]').forEach(el => io.observe(el));
}

/* ---- top bar shadow once scrolled ---- */
const bar = $('.bar');
const onScroll = () => bar.classList.toggle('stuck', window.scrollY > 8);
addEventListener('scroll', onScroll, {passive: true});
onScroll();