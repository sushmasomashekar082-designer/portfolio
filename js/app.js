(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const IMG = 'assets/img/', EMAIL = 'sushmasomashekar082@gmail.com';
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

  /* ================= HERO: one spiral galaxy, then an eclipse ================= */
  const gc = $('#galaxy'), g = gc.getContext('2d'), hero = $('#hero-pin'), heroSec = $('.hero'), heroIn = $('#hero-in');
  let GW = 0, GH = 0, DPR = 1, spiral = null, neb = null, bgStars = [];
  let heroP = 0, heroVisible = true, ovP = 0;
  function gauss() { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }
  const smooth = (a, b, x) => { const k = clamp((x - a) / (b - a)); return k * k * (3 - 2 * k); };

  // a face-on spiral, pre-rendered once; it is tilted and spun at draw time
  function makeSpiral(S) {
    const c = document.createElement('canvas'); c.width = c.height = S; const o = c.getContext('2d'), R = S / 2, k = S / 1400;
    o.globalCompositeOperation = 'lighter';
    const N = S > 1100 ? 90000 : 42000;
    for (let i = 0; i < N; i++) {
      const t = Math.pow(Math.random(), .75), arm = i % 2, diffuse = Math.random() < .3;
      const r = t * R * .94 + gauss() * R * .018;
      let th = arm * Math.PI + 3.1 * Math.log(1 + t * 11) + gauss() * (diffuse ? 1.2 : .12 + .1 * t);
      const x = R + Math.cos(th) * r, y = R + Math.sin(th) * r;
      const warm = clamp(1 - t * 2.2), a = (diffuse ? .07 : .26) * (1.1 - t * .55);
      o.fillStyle = `rgba(${Math.round(150 + 105 * warm)},${Math.round(190 + 55 * warm)},${Math.round(225 + 15 * warm)},${a.toFixed(3)})`;
      const s = (.8 + Math.random() * 1.6) * k * (diffuse ? 1.6 : 1); o.fillRect(x, y, s, s);
    }
    // a few bright stars along the arms
    for (let i = 0; i < 420; i++) { const t = Math.random(), arm = i % 2, th = arm * Math.PI + 3.1 * Math.log(1 + t * 11) + gauss() * .2, r = t * R * .9; o.fillStyle = `rgba(235,245,255,${(.25 + Math.random() * .5).toFixed(2)})`; const s = (1 + Math.random() * 1.6) * k; o.fillRect(R + Math.cos(th) * r, R + Math.sin(th) * r, s, s); }
    // soft core
    const gr = o.createRadialGradient(R, R, 0, R, R, R * .3); gr.addColorStop(0, 'rgba(255,246,232,.75)'); gr.addColorStop(.3, 'rgba(210,225,240,.22)'); gr.addColorStop(1, 'rgba(120,160,200,0)'); o.fillStyle = gr; o.fillRect(0, 0, S, S);
    // glow pass: a blurred copy underneath the sharp one
    const out = document.createElement('canvas'); out.width = out.height = S; const q = out.getContext('2d');
    if ('filter' in q) { q.filter = `blur(${Math.round(S / 70)}px)`; q.globalAlpha = .9; q.drawImage(c, 0, 0); q.filter = 'none'; q.globalAlpha = 1; }
    q.globalCompositeOperation = 'lighter'; q.drawImage(c, 0, 0);
    return out;
  }
  // the arrival scene: a cool nebula band, drawn once
  function makeNebula(w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h; const o = c.getContext('2d');
    o.fillStyle = '#020304'; o.fillRect(0, 0, w, h);
    const ang = -0.12, cx = w / 2, cy = h * .52, ca = Math.cos(ang), sa = Math.sin(ang), L = Math.hypot(w, h);
    const along = (t, d) => [cx + ca * t - sa * d, cy + sa * t + ca * d];
    const COLS = [['rgba(90,150,165,', .32], ['rgba(190,210,220,', .2], ['rgba(60,110,130,', .28], ['rgba(240,214,170,', .07]];
    for (let i = 0; i < 34; i++) { const [x, y] = along((Math.random() - .5) * L * .95, gauss() * h * .09); const r = (.08 + Math.random() * .2) * Math.max(w, h); const [col, a] = COLS[i % COLS.length]; const gr = o.createRadialGradient(x, y, 0, x, y, r); gr.addColorStop(0, col + a + ')'); gr.addColorStop(1, col + '0)'); o.fillStyle = gr; o.fillRect(0, 0, w, h); }
    if ('filter' in o) { o.filter = `blur(${Math.round(w / 90)}px)`; for (let i = 0; i < 26; i++) { const [x, y] = along((Math.random() - .5) * L * .9, gauss() * h * .1); o.fillStyle = 'rgba(2,3,4,.55)'; o.beginPath(); o.ellipse(x, y, (.04 + Math.random() * .1) * w, (.02 + Math.random() * .05) * h, ang + gauss() * .4, 0, 6.283); o.fill(); } o.filter = 'none'; }
    const N = Math.round(w * h / 900);
    for (let i = 0; i < N; i++) { const inB = Math.random() < .7; let x, y; if (inB) [x, y] = along((Math.random() - .5) * L, gauss() * h * .1); else { x = Math.random() * w; y = Math.random() * h; } o.fillStyle = `rgba(225,238,245,${(Math.random() * .6 + .15).toFixed(2)})`; const s = Math.random() < .97 ? .6 + Math.random() : 1.6 + Math.random() * 1.6; o.fillRect(x, y, s * DPR * .8, s * DPR * .8); }
    return c;
  }
  function buildGalaxy() {
    DPR = Math.min(devicePixelRatio || 1, innerWidth < 760 ? 1.5 : 2);
    GW = hero.clientWidth; GH = hero.clientHeight; gc.width = GW * DPR; gc.height = GH * DPR;
    if (!spiral) spiral = makeSpiral(innerWidth < 760 ? 1000 : 1500);
    neb = makeNebula(Math.round(GW * DPR * 1.2), Math.round(GH * DPR * 1.2));
    bgStars = Array.from({ length: innerWidth < 760 ? 70 : 140 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * .9 + .3, a: Math.random() * .5 + .15, d: Math.random() }));
  }
  function drawGalaxy(t) {
    if (heroVisible) {
      const T = RM ? 0 : t / 1000, p = heroP, W = gc.width, H = gc.height, mx = RM ? 0 : mouse.nx, my = RM ? 0 : mouse.ny;
      g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.fillStyle = '#020304'; g.fillRect(0, 0, W, H);
      const a1 = 1 - smooth(.42, .7, p), a2 = smooth(.4, .78, p);
      // far stars, barely moving
      if (a1 > 0) { g.fillStyle = '#fff'; bgStars.forEach(s => { g.globalAlpha = s.a * a1; g.fillRect((s.x * GW + mx * 8 * s.d) * DPR, (s.y * GH + my * 6 * s.d) * DPR, s.r * DPR, s.r * DPR); }); g.globalAlpha = 1; }
      // scene 2: the arrival, an eclipse against a nebula
      if (a2 > 0) {
        const sc = 1.18 - .18 * smooth(.4, 1, p);
        g.globalAlpha = a2 * (1 - .55 * ovP); g.save(); g.translate(W / 2 - mx * 14 * DPR, H / 2 - my * 10 * DPR); g.scale(sc, sc); g.drawImage(neb, -neb.width / 2, -neb.height / 2); g.restore();
        const pr = Math.min(W, H) * .085 * (1 - .3 * ovP), px = W * .5, py = H * .5, fx = px + pr * .62, fy = py - pr * .1;
        // the star behind the planet, with a horizontal flare
        let gr = g.createRadialGradient(fx, fy, 0, fx, fy, pr * 3.2); gr.addColorStop(0, 'rgba(255,252,244,.95)'); gr.addColorStop(.12, 'rgba(230,242,250,.5)'); gr.addColorStop(1, 'rgba(120,170,190,0)'); g.fillStyle = gr; g.fillRect(fx - pr * 4, fy - pr * 4, pr * 8, pr * 8);
        gr = g.createLinearGradient(fx - W * .3, 0, fx + W * .3, 0); gr.addColorStop(0, 'rgba(220,240,250,0)'); gr.addColorStop(.5, 'rgba(240,248,255,.7)'); gr.addColorStop(1, 'rgba(220,240,250,0)'); g.fillStyle = gr; g.fillRect(fx - W * .3, fy - 1 * DPR, W * .6, 2 * DPR);
        // the planet, lit from behind on its right edge
        g.beginPath(); g.arc(px, py, pr, 0, 6.283); gr = g.createRadialGradient(px - pr * .35, py, pr * .2, px, py, pr); gr.addColorStop(0, '#0b0e12'); gr.addColorStop(1, '#151a20'); g.fillStyle = gr; g.fill();
        g.save(); g.clip(); gr = g.createRadialGradient(fx + pr * .5, fy, pr * .6, fx + pr * .5, fy, pr * 1.25); gr.addColorStop(0, 'rgba(235,245,250,.75)'); gr.addColorStop(.35, 'rgba(160,190,205,.18)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); g.fillStyle = gr; g.fillRect(px - pr, py - pr, pr * 2, pr * 2); g.restore();
        // two small moons
        [[-.95, -1.85, .14], [-2.3, .55, .07]].forEach(([dx, dy, r]) => { g.beginPath(); g.arc(px + dx * pr, py + dy * pr, r * pr, 0, 6.283); g.fillStyle = '#0d1116'; g.fill(); g.strokeStyle = 'rgba(210,230,240,.35)'; g.lineWidth = DPR; g.beginPath(); g.arc(px + dx * pr, py + dy * pr, r * pr, -.9, .9); g.stroke(); });
        g.globalAlpha = 1;
      }
      // scene 1: the galaxy turns slowly; scrolling flies you into it
      if (a1 > 0 && spiral) {
        const D = Math.min(GW * .82, GH * 1.15) * DPR, approach = 1 + .035 * (1 - Math.cos(T / 14)), fly = 1 + Math.pow(p, 2.2) * 9;
        g.save(); g.globalAlpha = a1; g.globalCompositeOperation = 'lighter';
        g.translate(W / 2 - mx * 22 * DPR, H * .5 - my * 16 * DPR); g.rotate(-.42 + mx * .03); g.scale(1, .56 + my * .03); g.rotate(T * .03);
        const s = D * approach * fly / spiral.width; g.scale(s, s); g.drawImage(spiral, -spiral.width / 2, -spiral.height / 2);
        g.restore(); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
      }
    }
    if (!RM) requestAnimationFrame(drawGalaxy);
  }
  buildGalaxy(); requestAnimationFrame(drawGalaxy);
  let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { buildGalaxy(); if (RM) drawGalaxy(0); buildSky(); }, 200); });

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


  /* ================= OVERVIEW: stats rise out of the planet and line up ================= */
  const ovEl = $('#ov'), ovLis = $$('.ov-stats li'), ovTxt = $$('.ov-t');
  function measureOv() {
    const pin = hero.getBoundingClientRect(), cx = pin.left + pin.width / 2, cy = pin.top + pin.height / 2;
    ovLis.forEach(li => { const t = li.style.transform; li.style.transform = 'none'; const r = li.getBoundingClientRect(); li.style.transform = t; li.style.setProperty('--dx', (cx - (r.left + r.width / 2)).toFixed(0) + 'px'); li.style.setProperty('--dy', (cy - (r.top + r.height / 2)).toFixed(0) + 'px'); });
  }
  function paintOv() {
    const v = ovP;
    ovEl.style.setProperty('--ov', v.toFixed(3));
    ovEl.classList.toggle('live', v > .02);
    ovLis.forEach((li, i) => {
      const e = smooth(.04 + i * .1, .4 + i * .1, v);
      li.style.setProperty('--e', e.toFixed(3));
      const b = $('b', li); if (e > .55 && !b.dataset.done) { b.dataset.done = 1; countUp(b, true); }
    });
    ovTxt.forEach((t, i) => { const k = smooth(.42 + i * .1, .72 + i * .1, v); t.style.opacity = k; t.style.transform = `translateY(${((1 - k) * 24).toFixed(1)}px)`; });
  }
  measureOv(); addEventListener('resize', () => setTimeout(measureOv, 220)); addEventListener('load', measureOv);

  /* ================= SCROLL: nav, hero fly-in, back to top ================= */
  const nav = $('#nav'), totop = $('.totop');
  function onScroll() {
    const y = scrollY, h = heroSec.offsetHeight, run = Math.max(1, h - innerHeight);
    heroP = clamp(y / (run * .5)); ovP = RM ? 1 : clamp((y / run - .5) / .38); heroVisible = y < h;
    paintOv();
    // pinned hero: the words separate and fly past the camera
    const p = RM ? 0 : heroP, e = p * p;
    $('#h-a').style.transform = `translate3d(${-e * 34}vw, ${-e * 8}vh, 0) scale(${1 + e * 1.6})`;
    $('#h-b').style.transform = `translate3d(${e * 34}vw, ${e * 10}vh, 0) scale(${1 + e * 2.2})`;
    $('#h-a').style.opacity = $('#h-b').style.opacity = 1 - clamp(p * 1.25);
    $('#h-a').style.filter = $('#h-b').style.filter = `blur(${(e * 10).toFixed(1)}px)`;
    $('#h-label').style.transform = `translateY(${-p * 30}vh)`; $('#h-label').style.opacity = 1 - clamp(p * 2.2);
    $('#h-lede').style.transform = `translateY(${p * 22}vh)`; $('#h-lede').style.opacity = 1 - clamp(p * 2);
    $('#h-ctas').style.transform = `translateY(${p * 30}vh)`; $('#h-ctas').style.opacity = 1 - clamp(p * 2.4);
    $('#h-ctas').style.pointerEvents = p > .3 ? 'none' : '';
    $('.scroll-cue').style.opacity = 1 - clamp(p * 4);
    nav.classList.toggle('solid', y > run * .8); totop.classList.toggle('show', y > h);
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
  $$('[data-count]').forEach(el => { if (!el.closest('.ov')) cObs.observe(el); });

  /* ================= LOGOS ================= */
  const LOGOS = ['darena', 'creating-conversion', 'nexa', 'credtech', 'kdp', 'cyub', 'fanzart', 'whims', 'tasteable', 'aira', 'soundofc', 'hd-impact', 'gayle-charach'];
  const LOGO_ALT = { darena: 'Darena Health', 'creating-conversion': 'Creating Conversion', credtech: 'Credtech', kdp: 'Amazon KDP' };
  const lHTML = LOGOS.map(l => `<img src="${IMG}logos/${l}.webp" alt="${LOGO_ALT[l] || l.replace(/-/g, ' ')}" loading="lazy">`).join('') + `<img src="${IMG}nektar-logo-3.webp" alt="Nektar Homes" loading="lazy">`;
  $('#logos').innerHTML = lHTML + lHTML.replace(/alt="[^"]*"/g, 'alt="" aria-hidden="true"');

  /* ================= CONSTELLATIONS ================= */
  const skyEl = $('#sky'), svgEl = $('#sky-svg');
  let lit = new Set(); try { lit = new Set(JSON.parse(localStorage.getItem('lit') || '[]')); } catch (e) {}
  const litCount = () => ORDER.filter(id => lit.has(id)).length;
  const paintLit = () => { $('#lit-n').textContent = litCount(); };
  paintLit();
  /* ---- constellation chapters: one at a time, drawn as you scroll ---- */
  const STARB = '<span class="star-badge">★ Star project</span>';
  const CH = ORDER, chText = $('#ch-text'), chMap = $('#ch-map');
  let current = null, leaveT, chI = -1;
  const queueLeave = () => {}, placeTab = () => {};
  function buildSky() {
    let o = `<defs><radialGradient id="starGlow"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".35" stop-color="#ffeac4" stop-opacity=".35"/><stop offset="1" stop-color="#ffeac4" stop-opacity="0"/></radialGradient></defs>`;
    CH.forEach((id, i) => {
      const row = SKYMAP.find(r => r[0] === id), S = SHAPES[row[1]];
      const lines = S.ln.map(([a, b], j) => { const [x1, y1] = S.st[a], [x2, y2] = S.st[b], len = Math.hypot(x2 - x1, y2 - y1).toFixed(1); return `<path class="ln" style="--len:${len};--i:${(j / S.ln.length).toFixed(3)}" d="M${x1} ${y1} L${x2} ${y2}"/>`; }).join('');
      const stars = S.st.map(([x, y], j) => `<g class="sg" style="--i:${(j / S.st.length).toFixed(3)}"><circle class="glow" cx="${x}" cy="${y}" r="10"/><circle class="st" cx="${x}" cy="${y}" r="${j % 3 ? 2.4 : 3.2}"/></g>`).join('');
      o += `<g class="chp${lit.has(id) ? ' lit' : ''}" data-id="${id}" transform="translate(20 20)"><path class="sil${S.stroke ? ' stroke' : ''}" d="${S.sil}"/>${lines}${stars}</g>`;
    });
    svgEl.setAttribute('viewBox', '0 0 240 240'); svgEl.innerHTML = o;
    chText.innerHTML = CH.map((id, i) => {
      const w = W[id], res = winText(id).split(/(?<=\.)\s+/).filter(Boolean)[0] || '';
      return `<div class="cht" data-i="${i}"><p class="ch-n">${String(i + 1).padStart(2, '0')} <span>/ ${CH.length}</span></p>${id === 'darena' ? STARB : ''}<p class="label">${GROWTH.includes(id) ? 'Growth strategy' : 'Branding & content'}</p><h3 class="ch-name">${NAME[id]}</h3><p class="ch-line">${short(id)}</p>${res ? `<p class="ch-res">${res}</p>` : ''}<div class="ctas"><button class="btn" data-full="${id}">View project</button><button class="btn ghost" data-quick="${id}">Quick look</button></div></div>`;
    }).join('');
    const pts = CH.map(id => { const r = SKYMAP.find(x => x[0] === id); return [r[3], r[4]]; });
    chMap.innerHTML = `<p class="ch-map-t">Star map</p><div class="ch-map-in"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts.map(p => p.join(',')).join(' ')}"/></svg>${CH.map((id, i) => `<button class="mp${lit.has(id) ? ' lit' : ''}" data-go="${i}" style="left:calc(10px + (100% - 20px) * ${pts[i][0] / 100});top:calc(10px + (100% - 20px) * ${pts[i][1] / 100})" aria-label="Go to ${NAME[id]}"><span>${NAME[id]}</span></button>`).join('')}</div>`;
    chI = -1; updateChapters();
  }
  function chRun() { return Math.max(1, skyEl.offsetHeight - innerHeight); }
  function updateChapters() {
    if (skyEl.hidden) return;
    const r = skyEl.getBoundingClientRect(), P = clamp(-r.top / chRun()) * CH.length, i = Math.min(CH.length - 1, Math.floor(P)), q = P >= CH.length ? 1 : P - i;
    const groups = $$('.chp', svgEl), texts = $$('.cht', chText), last = i === CH.length - 1;
    const out = last ? 0 : clamp((q - .86) / .14), qq = RM ? 1 : q;
    groups.forEach((gEl, k) => { const on = k === i; gEl.style.opacity = on ? 1 - out : 0; if (on) gEl.style.setProperty('--q', qq.toFixed(3)); });
    texts.forEach((t, k) => { const on = k === i, v = on ? clamp((qq - .42) / .16) * (1 - out) : 0; t.style.opacity = v; t.style.transform = `translateY(${(1 - v) * 18}px)`; t.classList.toggle('show', on && v > .5); });
    if (i !== chI) { chI = i; current = CH[i]; svgEl.dataset.full = CH[i]; $$('.mp', chMap).forEach((m, k) => m.classList.toggle('on', k === i)); }
    if (qq > .6) markLit(CH[i]);
  }
  addEventListener('scroll', updateChapters, { passive: true });
  chMap.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (!b) return; const top = scrollY + skyEl.getBoundingClientRect().top + chRun() * ((+b.dataset.go + .7) / CH.length); scrollTo({ top, behavior: RM ? 'auto' : 'smooth' }); });
  function activate(id) { markLit(id); }
  function markLit(id) {
    if (lit.has(id)) return;
    lit.add(id); try { localStorage.setItem('lit', JSON.stringify([...lit])); } catch (e) {}
    $(`.chp[data-id="${id}"]`, svgEl)?.classList.add('lit'); $(`.mp[data-go="${CH.indexOf(id)}"]`, chMap)?.classList.add('lit'); paintLit();
    const l = $('#lit'); l.classList.remove('pop'); void l.offsetWidth; l.classList.add('pop');
    chime(litCount());
    if (litCount() === ORDER.length) setTimeout(allLit, 900);
    paintList();
  }
  function allLit() {
    $('#n-body').innerHTML = `<p class="label">All 11 lit</p><h3 class="p-title">You lit up my whole sky.</h3><p class="note-txt">Thank you for exploring every corner. That curiosity is exactly what I bring to every brief. Shall we make something together?</p><div class="ctas"><a class="btn" href="#contact" data-close>Let's talk</a></div>`;
    setTimeout(() => openModal('m-note'), 1200);
  }
  buildSky();

  /* ---- project tab ---- */
  const tab = $('#tab');
  function openTab(id) {
    let html;
    if (id === 'me') html = `<p class="where">Send a signal</p><h3>Sushma Somashekar</h3><p>Designer, brand storyteller and growth strategist with 5+ years in design and marketing. I've worked remotely with health tech, agency, eCommerce, luxury and wedding brands across India, Canada and the US.</p><ul><li>Branding, content and social media</li><li>Website design, custom coded when needed</li><li>SEO, analytics and growth</li></ul><p style="margin-top:14px">Open to roles and projects in branding, content and growth. I reply within a day.</p><div class="ctas"><a class="btn" href="mailto:${EMAIL}">Email me</a><a class="btn ghost" href="https://www.linkedin.com/in/sushma-somashekar-digital-marketing/" target="_blank" rel="noopener">LinkedIn ↗</a><a class="btn ghost" href="assets/Sushma-Somashekar-Resume.pdf" download>Résumé ↓</a></div>`;
    else {
      const w = W[id], res = winText(id).split(/(?<=\.)\s+/).filter(Boolean).slice(0, 3);
      html = `${w.logo ? `<img class="logo" src="${IMG}logos/${w.logo}.webp" alt="">` : ''}${id === 'darena' ? STARB : ''}<p class="where">${GROWTH.includes(id) ? 'Growth strategy' : 'Branding & content'}</p><h3>${NAME[id]}</h3><p>${short(id)}</p><ul>${res.map(r => `<li>${r}</li>`).join('')}</ul><div class="ctas"><button class="btn" data-full="${id}">View project</button><button class="btn ghost" data-quick="${id}">Quick look</button></div>`;
    }
    $('#tab-body').innerHTML = html; tab.classList.add('open'); tab.scrollTop = 0;
  }
  const closeTab = () => { clearTimeout(leaveT); tab.classList.remove('open'); current = null; skyEl.classList.remove('focus'); $$('.cst.on', svgEl).forEach(c => c.classList.remove('on')); };
  tab.addEventListener('pointerenter', () => clearTimeout(leaveT));
  tab.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') queueLeave(); });
  addEventListener('scroll', () => { if (current) placeTab(); }, { passive: true });
  tab.addEventListener('click', e => { if (e.target.closest('[data-close-tab]') || e.target.closest('a[href="#contact"]')) closeTab(); });
  document.addEventListener('click', e => { if (tab.classList.contains('open') && !tab.contains(e.target) && !e.target.closest('.cst') && !e.target.closest('.modal')) closeTab(); });
  new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) closeTab(); }), { threshold: 0 }).observe($('#work'));

  /* ---- list view ---- */
  function paintList() {
    const cover = id => { const m = (W[id].media || []).find(x => x.type !== 'video') || (W[id].media || []).find(x => x.poster); return m ? (m.type === 'video' ? m.poster : IMG + m.src) : ''; };
    $('#list').innerHTML = `<div class="rail" id="rail">${ORDER.map(id => `<button class="li" data-full="${id}"><span class="li-img">${cover(id) ? `<img src="${cover(id)}" alt="" loading="lazy">` : ''}</span><span class="li-b">${id === 'darena' ? STARB : ''}<small>${GROWTH.includes(id) ? 'Growth strategy' : 'Branding & content'}${lit.has(id) ? ' · lit ✦' : ''}</small><span class="h3">${NAME[id]}</span><p>${short(id)}</p></span></button>`).join('')}</div><div class="rail-nav"><button class="icon" data-rail="-1" aria-label="Previous projects">←</button><button class="icon" data-rail="1" aria-label="Next projects">→</button></div>`;
  }
  paintList();
  $('#as-list').addEventListener('click', e => { const b = e.currentTarget, on = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', on); b.textContent = on ? 'View as sky' : 'View as list'; $('#list').hidden = !on; skyEl.hidden = on; closeTab(); if (!on) updateChapters(); });

  document.addEventListener('click', e => { const b = e.target.closest('[data-rail]'); if (b) $('#rail').scrollBy({ left: +b.dataset.rail * Math.min(innerWidth * .8, 960), behavior: 'smooth' }); });

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
    if (f) { e.preventDefault(); const id = f.dataset.full; if ($('#m-full').classList.contains('open')) openFull(id); else warp(e.clientX, e.clientY, () => openFull(id)); } else if (q) { e.preventDefault(); openQuick(q.dataset.quick); }
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
    $('#m-full .sheet').onscroll = null; openModal('m-full'); $('#m-full .sheet').scrollTop = 0;
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
    if (RM) return;
    // living charts: lines and bars draw with your scroll, and cards drift into place
    const bs = $$('.b', root); bs.forEach(b => b.classList.add('live'));
    const live = () => { const sh = sheet.getBoundingClientRect(); bs.forEach(b => { const r = b.getBoundingClientRect(); b.style.setProperty('--sp', clamp((sh.bottom - r.top) / Math.min(r.height + 160, sh.height * .85)).toFixed(3)); }); };
    sheet.onscroll = live; live();
  }

  /* ================= WARP into a project ================= */
  const wc = $('#warp'), wx = wc.getContext('2d');
  function warp(x, y, done) {
    if (RM) return done();
    const d = Math.min(devicePixelRatio || 1, 2); wc.width = innerWidth * d; wc.height = innerHeight * d; wx.setTransform(d, 0, 0, d, 0, 0);
    if (!x && !y) { x = innerWidth / 2; y = innerHeight / 2; }
    const N = innerWidth < 760 ? 140 : 260, st = Array.from({ length: N }, () => ({ a: Math.random() * 6.283, r: 4 + Math.random() * 60, v: .6 + Math.random() * 1.4 }));
    const t0 = performance.now(); let opened = false; wc.classList.add('on');
    (function fr(t) {
      const k = (t - t0) / 820, sp = k * k * 2600;
      wx.fillStyle = `rgba(3,3,6,${Math.min(.9, .25 + k)})`; wx.fillRect(0, 0, innerWidth, innerHeight);
      st.forEach(s => {
        const r1 = s.r + sp * s.v * .9, r0 = s.r + sp * s.v * .55;
        wx.strokeStyle = `rgba(255,${236 - (s.v * 20 | 0)},${200 + (s.v * 30 | 0)},${Math.min(1, .3 + k)})`; wx.lineWidth = 1 + s.v * k * 1.6;
        wx.beginPath(); wx.moveTo(x + Math.cos(s.a) * r0, y + Math.sin(s.a) * r0); wx.lineTo(x + Math.cos(s.a) * r1, y + Math.sin(s.a) * r1); wx.stroke();
      });
      if (k > .78 && !opened) { opened = true; done(); }
      if (k < 1) requestAnimationFrame(fr); else { wc.classList.remove('on'); setTimeout(() => wx.clearRect(0, 0, innerWidth, innerHeight), 400); }
    })(t0);
  }

  /* ================= DEEP SPACE: depth layers + fly-through camera ================= */
  const dc = $('#deep'), dx = dc.getContext('2d');
  let deep = [], DW = 0, DH = 0, lastY = scrollY, vel = 0;
  function sizeDeep() {
    const d = Math.min(devicePixelRatio || 1, 2); DW = innerWidth; DH = innerHeight; dc.width = DW * d; dc.height = DH * d; dx.setTransform(d, 0, 0, d, 0, 0);
    deep = Array.from({ length: innerWidth < 760 ? 90 : 170 }, () => ({ x: (Math.random() - .5) * 2.4, y: (Math.random() - .5) * 2.4, z: Math.random(), w: Math.random() < .12 }));
  }
  const DEPTH = 2600; // pixels of scroll per full trip through the field
  function drawDeep() {
    const y = scrollY; vel += ((y - lastY) - vel) * .2; lastY = y;
    if (y > innerHeight * .5) {
      dx.clearRect(0, 0, DW, DH);
      const cam = (y / DEPTH) % 1, cx = DW / 2 + mouse.nx * -30, cy = DH / 2 + mouse.ny * -20, f = Math.max(DW, DH) * .5, streak = clamp(Math.abs(vel) / 60, 0, 1);
      // soft nebula layers, each at its own scroll speed
      [[.08, 'rgba(120,80,200,.07)', .3], [.16, 'rgba(240,190,140,.04)', .7], [.05, 'rgba(70,90,170,.05)', .5]].forEach(([k, c, ox]) => {
        const ny = (DH * 1.5 - (y * k) % (DH * 3)), nx = DW * ox, gr = dx.createRadialGradient(nx, ny, 0, nx, ny, DW * .55);
        gr.addColorStop(0, c); gr.addColorStop(1, 'rgba(0,0,0,0)'); dx.fillStyle = gr; dx.fillRect(0, 0, DW, DH);
      });
      deep.forEach(s => {
        let z = s.z - cam; z = z - Math.floor(z); z = .04 + z * .96; // fly-through: stars come toward the camera as you scroll
        const px = cx + s.x / z * f * .5, py = cy + s.y / z * f * .5; if (px < -20 || px > DW + 20 || py < -20 || py > DH + 20) return;
        const near = 1 - z, r = (.3 + near * 1.9) * (s.w ? 1.4 : 1), a = clamp(.15 + near * .9);
        if (false) { const z2 = z + .02 * streak * Math.sign(vel || 1), qx = cx + s.x / z2 * f * .5, qy = cy + s.y / z2 * f * .5; dx.strokeStyle = `rgba(255,246,230,${a * .8})`; dx.lineWidth = r; dx.beginPath(); dx.moveTo(qx, qy); dx.lineTo(px, py); dx.stroke(); }
        dx.globalAlpha = a; dx.fillStyle = s.w ? '#ffe9c4' : '#fff'; dx.beginPath(); dx.arc(px, py, r, 0, 6.283); dx.fill(); dx.globalAlpha = 1;
      });
    }
    if (!RM) requestAnimationFrame(drawDeep);
  }
  sizeDeep(); addEventListener('resize', sizeDeep); requestAnimationFrame(drawDeep);

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

  // trim the masonry to its shortest column so the bottom edge lines up
  const wallEl = $('#wall-grid'), wallClip = document.createElement('div');
  wallClip.className = 'wrap wall-clip'; wallEl.before(wallClip); wallClip.append(wallEl); wallEl.classList.remove('wrap');
  function trimWall() {
    wallClip.style.maxHeight = 'none'; const top = wallEl.getBoundingClientRect().top, cols = {};
    $$('.tile', wallEl).forEach(t => { const r = t.getBoundingClientRect(), k = Math.round(r.left); cols[k] = Math.max(cols[k] || 0, r.bottom - top); });
    const v = Object.values(cols); if (v.length > 1) wallClip.style.maxHeight = Math.round(Math.min(...v) + 40) + 'px';
  }
  let wT; const queueTrim = () => { clearTimeout(wT); wT = setTimeout(trimWall, 120); };
  $$('.tile img', wallEl).forEach(i => { i.loading = 'eager'; i.addEventListener('load', queueTrim); });
  $$('.tile video', wallEl).forEach(v => v.addEventListener('loadedmetadata', queueTrim));
  addEventListener('resize', queueTrim); addEventListener('load', queueTrim); queueTrim();
  const vObs = new IntersectionObserver(es => es.forEach(e => { const v = e.target; v.muted = true; if (e.isIntersecting && !RM) v.play().catch(() => {}); else v.pause(); }), { threshold: .25 });
  $$('.tile video').forEach(v => vObs.observe(v));

  /* ================= STAR NOTES ================= */
  const star = '<svg class="star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.7L12 15.4l-5.6 4.1 2.1-6.7-5.5-4h6.8z"/></svg>';
  const qt = (q, cls) => `<figure class="qt${cls}">${star}<blockquote>“${q[0]}”</blockquote><figcaption><b>${q[1]}</b><small>${q[2]}</small></figcaption></figure>`;
  $('#notes').innerHTML = qt(quotes[0], ' feature') + `<div class="qcols">${quotes.slice(1).map(q => qt(q, '')).join('')}</div>`;

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

  /* ================= FALLING METEORS: fun notes ================= */
  const sh = $('#shoot'); let noteI = Math.floor(Math.random() * ORDER.length);
  function shoot() {
    if (document.hidden || $('.modal.open')) return setTimeout(shoot, 6000);
    const x0 = innerWidth * (.1 + Math.random() * .55), y0 = -40, dist = innerHeight * .9, ang = 58 + Math.random() * 14, r = ang * Math.PI / 180;
    sh.style.setProperty('--x0', x0 + 'px'); sh.style.setProperty('--y0', y0 + 'px');
    sh.style.setProperty('--x1', x0 + Math.cos(r) * dist / Math.sin(r) + 'px'); sh.style.setProperty('--y1', y0 + dist + 'px');
    sh.style.setProperty('--a', ang + 'deg');
    sh.classList.remove('go'); void sh.offsetWidth; sh.classList.add('go');
    setTimeout(() => sh.classList.remove('go'), 9200);
    setTimeout(shoot, 18000 + Math.random() * 10000);
  }
  sh.addEventListener('click', () => {
    sh.classList.remove('go');
    const id = ORDER[noteI++ % ORDER.length], n = notes[id] || [];
    $('#n-body').innerHTML = `<p class="label">You caught a meteor · ${NAME[id]}</p><p class="fun-note">${n[2] || ''}</p><p class="k">Takeaway</p><p class="note-txt">${n[1] || ''}</p><div class="ctas"><button class="btn" data-full="${id}">See the project</button></div>`;
    openModal('m-note');
  });
  if (!RM) setTimeout(shoot, 4000);

  /* ================= SATELLITES: mission logs ================= */
  let logI = 0;
  function missionLog() {
    const id = ORDER[logI % ORDER.length], n = String(logI % ORDER.length + 1).padStart(2, '0'), logs = (notes[id] || []).slice(1);
    $('#n-body').innerHTML = `<p class="label">Mission log ${n} of ${ORDER.length}</p><h3 class="p-title" style="font-size:24px">${NAME[id]}</h3><ol class="mlog">${logs.map((t, i) => `<li><span>Entry ${i + 1}</span>${t}</li>`).join('')}</ol><div class="ctas"><button class="btn" data-full="${id}">See the project</button><button class="btn ghost" id="next-log">Next transmission →</button></div>`;
    logI++; openModal('m-note');
  }
  $$('.sat').forEach(s => s.addEventListener('click', e => { e.stopPropagation(); missionLog(); }));
  document.addEventListener('click', e => { if (e.target.closest('#next-log')) missionLog(); });

  /* ================= BLACK HOLE RESUME ================= */
  const bh = $('#bh');
  bh.addEventListener('click', e => {
    if (RM || bh.classList.contains('eat')) return;
    e.preventDefault(); bh.classList.add('eat');
    const r = $('.bh-core', bh).getBoundingClientRect(), cxp = r.left + r.width / 2, cyp = r.top + r.height / 2;
    for (let i = 0; i < 26; i++) {
      const p = document.createElement('i'); p.className = 'bh-p'; const a = Math.random() * 6.28, d = 140 + Math.random() * 260;
      p.style.left = cxp + Math.cos(a) * d + 'px'; p.style.top = cyp + Math.sin(a) * d + 'px'; document.body.appendChild(p);
      requestAnimationFrame(() => requestAnimationFrame(() => { p.style.transform = `translate(${-Math.cos(a) * d}px, ${-Math.sin(a) * d}px) rotate(${360 + Math.random() * 360}deg) scale(.1)`; p.style.opacity = 0; }));
      setTimeout(() => p.remove(), 1300);
    }
    setTimeout(() => { const a = document.createElement('a'); a.href = bh.href; a.download = ''; document.body.appendChild(a); a.click(); a.remove(); toast('Résumé incoming ✨'); }, 1000);
    setTimeout(() => bh.classList.remove('eat'), 1800);
  });

  /* ================= MUSIC ================= */
  const audio = $('#audio'), mb = $('#music');
  mb.addEventListener('click', () => {
    if (audio.paused) { audio.volume = .45; audio.play().then(() => { mb.setAttribute('aria-pressed', 'true'); mb.setAttribute('aria-label', 'Pause music'); }).catch(() => {}); }
    else { audio.pause(); mb.setAttribute('aria-pressed', 'false'); mb.setAttribute('aria-label', 'Play music'); }
  });
})();
