(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const IMG = '../assets/img/', EMAIL = 'sushmasomashekar082@gmail.com';
  const { work, notes, quotes, darenaFilms } = window.SITE;
  const W = Object.fromEntries(work.map(w => [w.id, w]));
  const NAME = { darena: 'Darena Health', nexa: 'Nexa Avenue', cyub: 'C CYUB Clothing', fanzart: 'Fanzart', whims: 'WHIMS', tasteables: 'Tasteables', holidaytribe: 'HolidayTribe', aira: 'Aira Wedding Planners', kdp: 'KDP Books & Journals', credtech: 'Credtech Pune Chapter', nektar: 'Nektar Homes' };
  const GROWTH = ['darena', 'nexa'];
  const ORDER = SKYMAP.map(r => r[0]).filter(id => id !== 'me');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const short = id => (W[id].line || '').split('. ')[0].replace(/\.$/, '') + '.';
  const winText = id => (W[id].win || '').replace(/\s*Full story in the Featured section\.?/, '');
  const mouse = { x: innerWidth / 2, y: innerHeight / 2, nx: 0, ny: 0 };
  addEventListener('pointermove', e => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.nx = e.clientX / innerWidth - .5; mouse.ny = e.clientY / innerHeight - .5; }, { passive: true });

  /* ================= GALAXY ================= */
  const gc = $('#galaxy'), g = gc.getContext('2d'), hero = $('.hero'), heroIn = $('#hero-in');
  let off, twinkles = [], GW = 0, GH = 0, DPR = 1;
  function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  function buildGalaxy() {
    DPR = Math.min(devicePixelRatio || 1, innerWidth < 760 ? 1.5 : 2);
    GW = hero.clientWidth; GH = hero.clientHeight;
    gc.width = GW * DPR; gc.height = GH * DPR;
    const pad = 1.4, w = GW * pad * DPR, h = GH * pad * DPR;
    off = document.createElement('canvas'); off.width = w; off.height = h;
    const o = off.getContext('2d');
    o.fillStyle = '#030306'; o.fillRect(0, 0, w, h);
    const ang = -0.38, cx = w / 2, cy = h / 2, ca = Math.cos(ang), sa = Math.sin(ang), L = Math.hypot(w, h);
    const along = (t, d) => [cx + ca * t - sa * d, cy + sa * t + ca * d];
    // nebula clouds along the band
    const neb = [['rgba(120,80,200,', .16], ['rgba(70,90,170,', .09], ['rgba(240,190,140,', .07], ['rgba(150,90,220,', .12]];
    for (let i = 0; i < 26; i++) { const [x, y] = along((Math.random() - .5) * L * .9, gauss() * h * .07); const r = (.12 + Math.random() * .22) * Math.max(w, h); const [c, a] = neb[i % neb.length]; const gr = o.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, c + a + ')'); gr.addColorStop(1, c + '0)'); o.fillStyle = gr; o.fillRect(0, 0, w, h); }
    // glowing core
    for (let i = 0; i < 14; i++) { const [x, y] = along((Math.random() - .5) * L * .7, gauss() * h * .025); const r = (.05 + Math.random() * .1) * Math.max(w, h); const gr = o.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, 'rgba(255,236,240,.16)'); gr.addColorStop(1, 'rgba(255,236,240,0)'); o.fillStyle = gr; o.fillRect(0, 0, w, h); }
    // stars: dense in the band, sparse outside
    const N = Math.round((w * h) / (DPR * DPR) / (innerWidth < 760 ? 90 : 60));
    const COL = ['255,255,255', '210,225,255', '255,232,220', '230,215,255'];
    for (let i = 0; i < N; i++) {
      const inBand = Math.random() < .72; let x, y;
      if (inBand) [x, y] = along((Math.random() - .5) * L, gauss() * h * (Math.random() < .5 ? .05 : .11)); else { x = Math.random() * w; y = Math.random() * h; }
      const r = (Math.random() < .985 ? Math.random() * .8 + .2 : Math.random() * 1.4 + 1) * DPR;
      o.fillStyle = `rgba(${COL[(Math.random() * 4) | 0]},${(Math.random() * .7 + .25).toFixed(2)})`; o.beginPath(); o.arc(x, y, r, 0, 6.283); o.fill();
    }
    // dust lanes
    if ('filter' in o) { o.filter = `blur(${14 * DPR}px)`; for (let i = 0; i < 22; i++) { const [x, y] = along((Math.random() - .5) * L * .85, gauss() * h * .018); o.fillStyle = 'rgba(3,3,6,.6)'; o.beginPath(); o.ellipse(x, y, (40 + Math.random() * 140) * DPR, (6 + Math.random() * 16) * DPR, ang + (Math.random() - .5) * .3, 0, 6.283); o.fill(); } o.filter = 'none'; }
    twinkles = Array.from({ length: innerWidth < 760 ? 70 : 160 }, () => ({ x: Math.random() * GW, y: Math.random() * GH, r: Math.random() * 1.3 + .5, p: Math.random() * 6.28, s: .6 + Math.random() * 1.6, v: (.15 + Math.random() * .5) * (Math.random() < .5 ? 1 : .6) }));
  }
  let heroP = 0, heroVisible = true, mets = [], nextMet = 1500;
  function drawGalaxy(t) {
    if (heroVisible) {
      const ox = (off.width - GW * DPR) / 2, oy = (off.height - GH * DPR) / 2;
      const T = RM ? 0 : t / 1000, px = RM ? 0 : mouse.nx * 40 * DPR, py = RM ? 0 : mouse.ny * 30 * DPR;
      const sc = 1.03 + .03 * Math.sin(T / 9) + heroP * .7, rot = .05 * Math.sin(T / 23), dx = 50 * DPR * Math.sin(T / 31), dy = 18 * DPR * Math.cos(T / 27);
      g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1;
      g.fillStyle = '#030306'; g.fillRect(0, 0, gc.width, gc.height);
      g.translate(gc.width / 2, gc.height / 2); g.rotate(rot); g.scale(sc, sc); g.translate(-gc.width / 2 - ox - px + dx, -gc.height / 2 - oy - py + dy);
      g.globalAlpha = .88 + .12 * Math.sin(T / 5); g.drawImage(off, 0, 0); g.globalAlpha = 1; g.setTransform(DPR, 0, 0, DPR, 0, 0);
      const hr = hero.getBoundingClientRect();
      twinkles.forEach(s => {
        if (!RM) { s.x += s.v * .35; s.y -= s.v * .12; if (s.x > GW + 4) s.x = -4; if (s.y < -4) s.y = GH + 4; }
        const a = .35 + .65 * Math.abs(Math.sin(t / 1000 * s.s + s.p)), sx = s.x + mouse.nx * 70 * s.v, sy = s.y + mouse.ny * 50 * s.v;
        const d = Math.hypot(sx - mouse.x, sy - (mouse.y - hr.top)), near = FINE ? clamp(1 - d / 140) : 0;
        g.globalAlpha = clamp((RM ? .7 : a) + near * .6); g.fillStyle = '#fff'; g.beginPath(); g.arc(sx, sy, s.r * (1 + near * 1.3), 0, 6.283); g.fill();
      });
      g.globalAlpha = 1;
      // decorative meteors in the hero
      if (!RM && t > nextMet) { mets.push({ x: Math.random() * GW * .8, y: Math.random() * GH * .45, a: .35 + Math.random() * .35, t0: t, len: 120 + Math.random() * 140 }); nextMet = t + 2200 + Math.random() * 3800; }
      mets = mets.filter(m => {
        const k = (t - m.t0) / 900; if (k > 1) return false;
        const hx = m.x + Math.cos(m.a) * 520 * k, hy = m.y + Math.sin(m.a) * 520 * k, tx = hx - Math.cos(m.a) * m.len, ty = hy - Math.sin(m.a) * m.len;
        const gr = g.createLinearGradient(tx, ty, hx, hy); gr.addColorStop(0, 'rgba(255,236,210,0)'); gr.addColorStop(1, `rgba(255,246,230,${(.85 * Math.sin(k * Math.PI)).toFixed(2)})`);
        g.strokeStyle = gr; g.lineWidth = 1.6; g.lineCap = 'round'; g.beginPath(); g.moveTo(tx, ty); g.lineTo(hx, hy); g.stroke(); return true;
      });
    }
    if (!RM) requestAnimationFrame(drawGalaxy);
  }
  buildGalaxy(); requestAnimationFrame(drawGalaxy);
  let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { buildGalaxy(); if (RM) drawGalaxy(0); buildSky(); }, 200); });

  /* ================= ROTATING TITLE WORD ================= */
  const rw = $$('.rot i'); let ri = 0;
  if (rw.length && !RM) setInterval(() => { if (document.hidden) return; const cur = rw[ri]; cur.classList.replace('on', 'out'); setTimeout(() => cur.classList.remove('out'), 700); ri = (ri + 1) % rw.length; rw[ri].classList.add('on'); }, 2400);

  /* ================= COMET CURSOR ================= */
  const cc = $('#comet'), cx = cc.getContext('2d'), trail = [];
  function sizeComet() { const d = Math.min(devicePixelRatio || 1, 2); cc.width = innerWidth * d; cc.height = innerHeight * d; cx.setTransform(d, 0, 0, d, 0, 0); }
  if (FINE && !RM) {
    sizeComet(); addEventListener('resize', sizeComet);
    addEventListener('pointermove', e => { trail.push({ x: e.clientX, y: e.clientY, t: performance.now() }); }, { passive: true });
    (function comet() {
      const now = performance.now(); while (trail.length && now - trail[0].t > 260) trail.shift();
      cx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 1; i < trail.length; i++) { const a = trail[i - 1], b = trail[i], k = i / trail.length; cx.strokeStyle = `rgba(255,234,200,${k * .55})`; cx.lineWidth = k * 3; cx.lineCap = 'round'; cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke(); }
      if (trail.length) { const h = trail[trail.length - 1], gr = cx.createRadialGradient(h.x, h.y, 0, h.x, h.y, 10); gr.addColorStop(0, 'rgba(255,244,226,.9)'); gr.addColorStop(1, 'rgba(255,240,245,0)'); cx.fillStyle = gr; cx.beginPath(); cx.arc(h.x, h.y, 10, 0, 6.283); cx.fill(); }
      requestAnimationFrame(comet);
    })();
  } else cc.remove();

  /* ================= SCROLL: nav, hero fly-in, back to top ================= */
  const nav = $('#nav'), totop = $('.totop');
  function onScroll() {
    const y = scrollY, h = hero.offsetHeight;
    heroP = clamp(y / h); heroVisible = y < h;
    heroIn.style.opacity = 1 - clamp(heroP * 1.6); heroIn.style.transform = `translateY(${-heroP * 120}px) scale(${1 + heroP * .08})`;
    nav.classList.toggle('solid', y > h * .6); totop.classList.toggle('show', y > h * 1.2);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const secObs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) $$('.links a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-45% 0px -50% 0px' });
  ['work', 'wall', 'words', 'contact'].forEach(id => secObs.observe($('#' + id)));

  /* ================= NUMBERS WITH A SPARK ================= */
  function sparks(el) {
    if (RM) return; const r = el.getBoundingClientRect(), host = el.parentElement, hr = host.getBoundingClientRect();
    for (let i = 0; i < 12; i++) { const s = document.createElement('i'); s.className = 'sparkle'; const a = Math.random() * 6.28, d = 30 + Math.random() * 40; s.style.left = (r.right - hr.left - 6) + 'px'; s.style.top = (r.top - hr.top + 10) + 'px'; s.style.setProperty('--dx', Math.cos(a) * d + 'px'); s.style.setProperty('--dy', Math.sin(a) * d + 'px'); host.appendChild(s); setTimeout(() => s.remove(), 1000); }
  }
  function countUp(el, spark) {
    const to = +el.dataset.count, from = +(el.dataset.from || 0), dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || '', suf = el.dataset.suf || el.dataset.suffix || '', t0 = performance.now();
    const fmt = v => pre + (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + suf;
    if (RM) { el.textContent = fmt(to); return; }
    (function step(t) { const k = clamp((t - t0) / 1500); el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); else if (spark) sparks(el); })(t0);
  }
  const cObs = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; cObs.unobserve(e.target); countUp(e.target, true); }), { threshold: .6 });
  $$('[data-count]').forEach(el => cObs.observe(el));

  /* ================= LOGOS ================= */
  const LOGOS = ['darena', 'creating-conversion', 'nexa', 'credtech', 'kdp', 'cyub', 'fanzart', 'whims', 'tasteable', 'holidaytribe', 'aira', 'soundofc', 'hd-impact', 'gayle-charach'];
  const LOGO_ALT = { darena: 'Darena Health', 'creating-conversion': 'Creating Conversion', credtech: 'Credtech', kdp: 'Amazon KDP' };
  const lHTML = LOGOS.map(l => `<img src="${IMG}logos/${l}.webp" alt="${LOGO_ALT[l] || l.replace(/-/g, ' ')}" loading="lazy">`).join('') + `<img src="${IMG}nektar-logo-3.webp" alt="Nektar Homes" loading="lazy">`;
  $('#logos').innerHTML = lHTML + lHTML.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');

  /* ================= CONSTELLATIONS ================= */
  const skyEl = $('#sky'), svgEl = $('#sky-svg');
  let lit = new Set(); try { lit = new Set(JSON.parse(localStorage.getItem('lit') || '[]')); } catch (e) {}
  const litCount = () => ORDER.filter(id => lit.has(id)).length;
  const paintLit = () => { $('#lit-n').textContent = litCount(); };
  paintLit();
  function buildSky() {
    const phone = innerWidth <= 900, VW = phone ? 900 : 1600, VH = phone ? 1900 : 1000;
    svgEl.setAttribute('viewBox', `0 0 ${VW} ${VH}`);
    let o = `<defs><radialGradient id="starGlow"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="#ffeac4" stop-opacity=".35"/><stop offset="1" stop-color="#ffd6e2" stop-opacity="0"/></radialGradient></defs>`;
    // faint background stars in the sky box
    for (let i = 0; i < (phone ? 120 : 220); i++) o += `<circle cx="${(Math.random() * VW).toFixed(0)}" cy="${(Math.random() * VH).toFixed(0)}" r="${(Math.random() * 1.4 + .4).toFixed(1)}" fill="#fff" opacity="${(Math.random() * .4 + .1).toFixed(2)}"/>`;
    SKYMAP.forEach(([id, shape, label, x, y, s, mx, my, ms], i) => {
      const S = SHAPES[shape], px = (phone ? mx : x) / 100 * VW, py = (phone ? my : y) / 100 * VH, size = (phone ? ms : s) / 100 * VW, k = size / 200;
      const lines = S.ln.map(([a, b]) => { const [x1, y1] = S.st[a], [x2, y2] = S.st[b], len = Math.hypot(x2 - x1, y2 - y1).toFixed(1); return `<path class="ln" style="--len:${len}" d="M${x1} ${y1} L${x2} ${y2}" vector-effect="non-scaling-stroke"/>`; }).join('');
      const stars = S.st.map(([sx, sy], j) => `<circle class="glow" cx="${sx}" cy="${sy}" r="${(14 / Math.sqrt(k)).toFixed(1)}"/><circle class="st" cx="${sx}" cy="${sy}" r="${((j % 3 ? 2.2 : 3) / Math.sqrt(k)).toFixed(2)}"/>`).join('');
      const cat = S.flap ? `<path class="sil thin" d="${S.flap}"/><path class="sil stroke sig" d="${S.arcs}"/>` : '';
      const nm = `<text class="name" x="${px}" y="${(py + size * .58).toFixed(0)}" style="font-size:${phone ? 22 : 13}px">${label}</text>`;
      o += `<g class="cst${GROWTH.includes(id) ? ' big' : ''}${S.flap ? ' env' : ''}${lit.has(id) ? ' lit' : ''}" data-id="${id}" tabindex="0" role="button" aria-label="${label}: open project">
        <g transform="translate(${(px - size / 2).toFixed(1)} ${(py - size / 2).toFixed(1)}) scale(${k.toFixed(4)})"><rect x="-10" y="-10" width="220" height="230" fill="transparent" style="pointer-events:all"/><g class="float" style="--dur:${(10 + i % 5 * 2)}s;--del:${-i * 1.7}s"><path class="sil${S.stroke ? ' stroke' : ''}" d="${S.sil}"/>${cat}${lines}${stars}</g></g>${nm}</g>`;
    });
    svgEl.innerHTML = o;
    $$('.cst', svgEl).forEach(el => {
      el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') activate(el.dataset.id); });
      el.addEventListener('click', () => activate(el.dataset.id));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(el.dataset.id); } });
    });
    $$('.cst', svgEl).forEach(c => c.classList.toggle('on', c.dataset.id === current));
  }
  let current = null;
  function activate(id) {
    current = id;
    $$('.cst', svgEl).forEach(c => c.classList.toggle('on', c.dataset.id === id));
    openTab(id);
    if (id === 'me' || lit.has(id)) return;
    lit.add(id); try { localStorage.setItem('lit', JSON.stringify([...lit])); } catch (e) {}
    $(`.cst[data-id="${id}"]`, svgEl)?.classList.add('lit'); paintLit();
    const l = $('#lit'); l.classList.remove('pop'); void l.offsetWidth; l.classList.add('pop');
    chime(litCount());
    if (litCount() === ORDER.length) setTimeout(allLit, 900);
    paintList();
  }
  function allLit() {
    const c = $('.env', svgEl); c?.classList.add('ping'); setTimeout(() => c?.classList.remove('ping'), 4000);
    $('#n-body').innerHTML = `<p class="label">All 11 lit</p><h3 class="p-title">You lit up my whole sky.</h3><p class="note-txt">Thank you for exploring every corner. That curiosity is exactly what I bring to every brief. Shall we make something together?</p><div class="ctas"><a class="btn" href="#contact" data-close>Let's talk</a></div>`;
    setTimeout(() => openModal('m-note'), 1200);
  }
  buildSky();

  /* ---- project tab ---- */
  const tab = $('#tab');
  const STARB = '<span class="star-badge">★ Star project</span>';
  function openTab(id) {
    let html;
    if (id === 'me') html = `<p class="where">Send a signal</p><h3>Sushma Somashekar</h3><p>Designer, brand storyteller and growth strategist with 5+ years in design and marketing. I've worked across health tech, agencies, eCommerce, luxury and wedding brands, in India, Canada and the US.</p><ul><li>Branding, content and social media</li><li>Website design, hand-coded when needed</li><li>SEO, analytics and growth</li></ul><p style="margin-top:14px">Open to roles and projects in branding, content and growth. I reply within a day.</p><div class="ctas"><a class="btn" href="mailto:${EMAIL}">Email me</a><a class="btn ghost" href="https://www.linkedin.com/in/sushma-somashekar-digital-marketing/" target="_blank" rel="noopener">LinkedIn ↗</a><a class="btn ghost" href="../assets/Sushma-Somashekar-Resume.pdf" download>Résumé ↓</a></div>`;
    else {
      const w = W[id], res = winText(id).split(/(?<=\.)\s+/).filter(Boolean).slice(0, 3);
      html = `${w.logo ? `<img class="logo" src="${IMG}logos/${w.logo}.webp" alt="">` : ''}${id === 'darena' ? STARB : ''}<p class="where">${GROWTH.includes(id) ? 'Growth strategy' : 'Branding & content'}</p><h3>${NAME[id]}</h3><p>${short(id)}</p><ul>${res.map(r => `<li>${r}</li>`).join('')}</ul><div class="ctas"><button class="btn" data-full="${id}">View project</button><button class="btn ghost" data-quick="${id}">Quick look</button></div>`;
    }
    $('#tab-body').innerHTML = html; tab.classList.add('open'); tab.scrollTop = 0;
  }
  const closeTab = () => { tab.classList.remove('open'); current = null; $$('.cst.on', svgEl).forEach(c => c.classList.remove('on')); };
  tab.addEventListener('click', e => { if (e.target.closest('[data-close-tab]') || e.target.closest('a[href="#contact"]')) closeTab(); });
  document.addEventListener('click', e => { if (tab.classList.contains('open') && !tab.contains(e.target) && !e.target.closest('.cst') && !e.target.closest('.modal')) closeTab(); });
  new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) closeTab(); }), { threshold: 0 }).observe($('#work'));

  /* ---- list view ---- */
  function paintList() {
    $('#list').innerHTML = ORDER.map(id => `<button class="li" data-full="${id}">${id === 'darena' ? STARB : ''}<small>${GROWTH.includes(id) ? 'Growth strategy' : 'Branding & content'}${lit.has(id) ? ' · lit ✦' : ''}</small><span class="h3">${NAME[id]}</span><p>${short(id)}</p></button>`).join('');
  }
  paintList();
  $('#as-list').addEventListener('click', e => { const b = e.currentTarget, on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); b.textContent = on ? 'View as sky' : 'View as list'; $('#list').hidden = !on; skyEl.hidden = on; closeTab(); });

  /* ---- chime (only when music is on) ---- */
  let actx;
  function chime(n) {
    if (audio.paused) return;
    try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const t = actx.currentTime, notes = [523.25, 587.33, 659.25, 783.99, 880, 987.77];
      [0, .09].forEach((dt, i) => { const o = actx.createOscillator(), gN = actx.createGain(); o.type = 'sine'; o.frequency.value = notes[(n + i * 2) % notes.length]; gN.gain.setValueAtTime(0, t + dt); gN.gain.linearRampToValueAtTime(.12, t + dt + .02); gN.gain.exponentialRampToValueAtTime(.0001, t + dt + 1.2); o.connect(gN).connect(actx.destination); o.start(t + dt); o.stop(t + dt + 1.3); });
    } catch (e) {}
  }

  /* ================= MODALS ================= */
  function openModal(id) { $$('.modal.open').forEach(m => closeModal(m)); $('#' + id).classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeModal(m) { m.classList.remove('open'); $$('video', m).forEach(v => v.pause()); if (!$('.modal.open')) document.body.style.overflow = ''; }
  $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) closeModal(m); }));
  addEventListener('keydown', e => { if (e.key === 'Escape') { $$('.modal.open').forEach(closeModal); closeTab(); } });
  document.addEventListener('click', e => {
    const f = e.target.closest('[data-full]'), q = e.target.closest('[data-quick]');
    if (f) { e.preventDefault(); openFull(f.dataset.full); } else if (q) { e.preventDefault(); openQuick(q.dataset.quick); }
  });
  function openQuick(id) {
    const w = W[id], n = (notes[id] || [])[0];
    $('#q-body').innerHTML = `${w.logo ? `<img src="${IMG}logos/${w.logo}.webp" alt="" style="height:36px;width:auto;margin-bottom:16px">` : ''}<h3 class="p-title" style="font-size:28px">${NAME[id]}</h3><p class="k">What I did</p><p>${w.role}</p><p class="k">What I achieved</p><p>${winText(id)}</p>${n ? `<p style="margin-top:20px;font-style:italic;color:var(--muted)">“${n}”</p>` : ''}<div class="ctas"><button class="btn" data-full="${id}">View full project</button></div>`;
    openModal('m-quick');
  }
  const media = (m, alt) => m.type === 'video' ? `<video src="${m.src}" ${m.poster ? `poster="${m.poster}"` : ''} controls muted playsinline preload="none"></video>` : `<img src="${IMG + m.src}" alt="${alt}" loading="lazy">`;
  function openFull(id) {
    const w = W[id], i = ORDER.indexOf(id), nx = ORDER[(i + 1) % ORDER.length];
    const links = [...(w.link ? [[w.link[0], w.link[1]]] : []), ...(w.reels || [])];
    const extra = id === 'darena' ? `<h4 class="p-sec">The case, by the numbers</h4><div class="dc">${window.DARENA_CASE || ''}</div>` : '';
    $('#f-body').innerHTML = `<div class="f-head">${id === 'darena' ? STARB : ''}<p class="label">${GROWTH.includes(id) ? 'Growth strategy' : 'Branding & content'}</p></div><h2 class="p-title">${NAME[id]}</h2><p class="p-line">${w.line}</p><div class="chips">${(w.chips || []).map(c => `<span>${c}</span>`).join('')}</div>
      <p class="res">${winText(id)}</p>
      <div class="two-col"><div><p class="k">The brand</p><p>${w.about}</p></div><div><p class="k">What I did</p><p>${w.role}</p></div></div>
      ${w.pts ? `<p class="k">Highlights</p><ul class="pts">${w.pts.map(p => `<li>${p}</li>`).join('')}</ul>` : ''}
      ${links.length ? `<div class="plinks">${links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t} ↗</a>`).join('')}</div>` : ''}
      ${extra}<h4 class="p-sec">The work</h4><div class="gallery">${w.media.map(m => media(m, NAME[id])).join('')}</div>
      <div class="p-next"><button class="btn ghost" data-close>Back to the sky</button><button class="btn" data-full="${nx}">Next: ${NAME[nx]} →</button></div>`;
    openModal('m-full'); $('#m-full .sheet').scrollTop = 0;
    if (id === 'darena') initDarena($('#f-body'), $('#m-full .sheet'));
  }
  function initDarena(root, sheet) {
    const film = f => `<figure><video src="${f.src}" poster="${f.poster}" controls muted playsinline preload="none"></video><figcaption>${f.badge ? `<span class="badge">${f.badge}</span>` : ''}${f.title}. ${f.note}</figcaption></figure>`;
    const top = darenaFilms.find(f => f.slot === 'top'), dfs = $('.d-films', root);
    if (dfs && top) dfs.innerHTML = film(top);
    $$('.d-film-slot', root).forEach(el => { const f = darenaFilms.find(x => x.slot === el.dataset.slot); if (f) el.innerHTML = film(f); });
    $$('.ring', root).forEach(r => { r.style.setProperty('--v', r.dataset.from); r.classList.toggle('low', +r.dataset.from < 90); });
    $$('.cmp input', root).forEach(i => i.addEventListener('input', () => i.closest('.cmp').style.setProperty('--p', i.value + '%')));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target); const b = e.target; b.classList.add('in');
      $$('[data-count]', b).forEach(el => countUp(el, false));
      $$('.ring', b).forEach(r => {
        const from = +r.dataset.from, to = +r.dataset.to, el = $('b', r), t0 = performance.now();
        r.style.setProperty('--v', to);
        if (RM) { el.textContent = to; r.classList.toggle('low', to < 90); return; }
        (function step(t) { const k = clamp((t - t0) / 1800), v = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3))); el.textContent = v; r.classList.toggle('low', v < 90); if (k < 1) requestAnimationFrame(step); })(t0);
      });
    }), { root: sheet, threshold: .25 });
    $$('.b', root).forEach(b => io.observe(b));
  }

  /* ================= CONTENT WALL ================= */
  const wall = [];
  ['darena', 'cyub', 'fanzart', 'aira', 'nexa', 'nektar', 'kdp', 'credtech', 'holidaytribe', 'whims', 'tasteables'].forEach(id => {
    const m = W[id].media; let imgs = 0;
    m.forEach(x => { if (x.type === 'video' && !wall.some(v => v.m.type === 'video' && v.id === id)) wall.push({ id, m: x }); else if (x.type !== 'video' && imgs < 2) { wall.push({ id, m: x }); imgs++; } });
  });
  $('#wall-grid').innerHTML = wall.map((t, i) => `<figure class="tile" data-i="${i}">${t.m.type === 'video' ? `<video src="${t.m.src}" ${t.m.poster ? `poster="${t.m.poster}"` : ''} muted loop playsinline autoplay preload="metadata"></video><span class="play">▶ Reel</span>` : `<img src="${IMG + t.m.src}" alt="${NAME[t.id]}" loading="lazy">`}<figcaption>${NAME[t.id]}</figcaption></figure>`).join('');
  $$('.tile').forEach(el => {
    const v = $('video', el);
    el.addEventListener('pointermove', e => { if (!FINE || RM) return; const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; el.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-3px)`; });
    el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    el.addEventListener('click', () => { const t = wall[+el.dataset.i]; $('#v-body').innerHTML = t.m.type === 'video' ? `<video src="${t.m.src}" controls autoplay playsinline></video>` : `<img src="${IMG + t.m.src}" alt="${NAME[t.id]}">`; openModal('m-view'); });
  });

  const vObs = new IntersectionObserver(es => es.forEach(e => { const v = e.target; v.muted = true; if (e.isIntersecting && !RM) v.play().catch(() => {}); else v.pause(); }), { threshold: .25 });
  $$('.tile video').forEach(v => vObs.observe(v));

  /* ================= STAR NOTES ================= */
  const star = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 15.4l-5.6 4.1 2.1-6.7-5.5-4h6.8z"/></svg>';
  $('#notes').innerHTML = quotes.map((q, i) => `<button class="sn${i === 0 ? ' open' : ''}" aria-expanded="${i === 0}"><span class="top">${star}<span><b>${q[1]}</b><small>${q[2]}</small></span></span><span class="q"><p>“${q[0]}”</p></span></button>`).join('');
  $$('.sn').forEach(b => b.addEventListener('click', () => { const on = !b.classList.contains('open'); b.classList.toggle('open', on); b.setAttribute('aria-expanded', on); }));

  /* ================= SEND A SIGNAL ================= */
  const toast = (t) => { const el = $('#toast'); el.textContent = t; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2200); };
  $('#signal').addEventListener('click', e => {
    const r = e.currentTarget.getBoundingClientRect(), s = document.createElement('i'); s.className = 'signal';
    s.style.left = r.left + r.width / 2 + 'px'; s.style.top = r.top + 'px'; document.body.appendChild(s);
    requestAnimationFrame(() => { s.style.transform = `translate(${(Math.random() - .5) * 200}px, ${-r.top - 40}px)`; s.style.opacity = 0; });
    setTimeout(() => { s.remove(); location.href = 'mailto:' + EMAIL; }, RM ? 0 : 750);
  });
  $('#copy').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(EMAIL); toast('Copied ✨'); }
    catch (e) { const t = document.createElement('textarea'); t.value = EMAIL; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); toast('Copied ✨'); }
  });

  /* ================= MAKE A WISH: shooting stars ================= */
  const sh = $('#shoot');
  const wishes = Object.entries(notes).flatMap(([id, arr]) => arr.slice(1).map(t => [id, t]));
  function shoot() {
    if (document.hidden || $('.modal.open')) return setTimeout(shoot, 8000);
    const fromX = innerWidth * (.15 + Math.random() * .7), fromY = innerHeight * (.08 + Math.random() * .25), ang = 20 + Math.random() * 20;
    sh.style.left = fromX + 'px'; sh.style.top = fromY + 'px';
    sh.style.setProperty('--a', ang + 'deg'); sh.style.setProperty('--tx', Math.cos(ang * Math.PI / 180) * 420 + 'px'); sh.style.setProperty('--ty', Math.sin(ang * Math.PI / 180) * 420 + 'px');
    sh.classList.remove('go'); void sh.offsetWidth; sh.classList.add('go');
    setTimeout(() => sh.classList.remove('go'), 2700);
    setTimeout(shoot, 16000 + Math.random() * 14000);
  }
  sh.addEventListener('click', () => {
    sh.classList.remove('go');
    const [id, t] = wishes[(Math.random() * wishes.length) | 0];
    $('#n-body').innerHTML = `<p class="label">You caught a shooting star</p><h3 class="p-title" style="font-size:24px">A note about ${NAME[id]}</h3><p class="note-txt">“${t}”</p><div class="ctas"><button class="btn" data-full="${id}">See the project</button></div>`;
    openModal('m-note');
  });
  if (!RM) setTimeout(shoot, 6000);

  /* ================= MUSIC ================= */
  const audio = $('#audio'), mb = $('#music');
  mb.addEventListener('click', () => {
    if (audio.paused) { audio.volume = .45; audio.play().then(() => { mb.setAttribute('aria-pressed', 'true'); mb.setAttribute('aria-label', 'Pause music'); }).catch(() => {}); }
    else { audio.pause(); mb.setAttribute('aria-pressed', 'false'); mb.setAttribute('aria-label', 'Play music'); }
  });
})();
