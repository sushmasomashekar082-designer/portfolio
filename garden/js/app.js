(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IMG = '../assets/img/';
  const { work, notes, quotes, darenaFilms } = window.SITE;
  const W = Object.fromEntries(work.map(w => [w.id, w]));
  const NAME = { darena: 'Darena Health', nexa: 'Nexa Avenue', cyub: 'C CYUB Clothing', fanzart: 'Fanzart', whims: 'WHIMS', tasteables: 'Tasteables', holidaytribe: 'HolidayTribe', aira: 'Aira Wedding Planners', kdp: 'KDP Books & Journals', credtech: 'Credtech Pune Chapter', nektar: 'Nektar Homes' };
  const WHERE = { darena: 'The garden', nektar: 'The foyer', nexa: 'The drawing room', kdp: 'The study', credtech: 'The study', aira: 'The study', tasteables: 'The dining room', holidaytribe: 'The kitchen', whims: 'The dressing room', cyub: 'The dressing room', fanzart: 'The dressing room' };
  const ORDER = ['darena', 'nektar', 'nexa', 'kdp', 'credtech', 'aira', 'tasteables', 'holidaytribe', 'whims', 'cyub', 'fanzart'];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

  const pop = $('#pop'); let popFor = null, popTimer = 0, popY = 0;

  /* ---------- build ---------- */
  $('#defs').innerHTML = SCENES.defs;
  $$('[data-scene]').forEach(s => { s.innerHTML = SCENES[s.dataset.scene](); });
  $('#strip').innerHTML = SCENES.rooms();
  const scenes = $$('.scene');
  const sizeScenes = () => scenes.forEach(s => { s.style.height = (s.dataset.h / 100 * innerHeight) + 'px'; });
  sizeScenes();

  // butterflies roaming the garden, which gather into the Darena swarm
  const BCOL = [['#ffc58a', '#e8742f'], ['#a5d8ff', '#4dabf7'], ['#ffc9de', '#e64980'], ['#ffe08a', '#f08c00'], ['#d0bfff', '#7950f2']];
  const field = $('.bf-field'), flies = [];
  for (let i = 0; i < 9; i++) {
    const b = document.createElement('div'), [c1, c2] = BCOL[i % BCOL.length];
    b.className = 'bf'; b.style.setProperty('--c1', c1); b.style.setProperty('--c2', c2); b.innerHTML = '<i></i><i></i>';
    b.querySelectorAll('i').forEach(x => x.style.animationDelay = (-Math.random()).toFixed(2) + 's');
    field.appendChild(b); flies.push({ el: b, x: .08 + Math.random() * .84, y: .25 + Math.random() * .45, ph: Math.random() * 6, a: Math.random() * 6.28, r: .25 + Math.random() * .6 });
  }
  const swarm = $('.bf-swarm');
  [[.5, .45], [.28, .3], [.72, .28], [.18, .65], [.82, .62], [.45, .12], [.58, .8]].forEach(([x, y], i) => {
    const b = document.createElement('b'), [c1, c2] = BCOL[i % BCOL.length];
    b.style.cssText = `left:${x * 100}%;top:${y * 100}%;--c1:${c1};--c2:${c2};animation-delay:${-i * .4}s;transform:scale(${i ? .8 : 1.15})`;
    b.innerHTML = '<i></i><i></i>'; swarm.appendChild(b);
  });

  /* ---------- sky through the day ---------- */
  const SKY = [
    [0, [159, 180, 230], [247, 198, 208], [255, 217, 176]],
    [.18, [140, 192, 240], [206, 226, 244], [255, 236, 214]],
    [.34, [150, 160, 222], [250, 192, 172], [255, 202, 142]],
    [.5, [130, 120, 196], [246, 160, 160], [255, 184, 120]],
    [.82, [110, 96, 170], [238, 140, 150], [255, 170, 110]],
    [.9, [34, 32, 74], [92, 72, 124], [222, 124, 112]],
    [1, [22, 22, 56], [60, 48, 98], [176, 98, 108]]];
  const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  function setSky(g) {
    let k = 0; while (k < SKY.length - 2 && g > SKY[k + 1][0]) k++;
    const [t0, ...A] = SKY[k], [t1, ...B] = SKY[k + 1], t = clamp((g - t0) / (t1 - t0));
    const root = document.documentElement.style;
    ['--s1', '--s2', '--s3'].forEach((v, i) => root.setProperty(v, `rgb(${lerp(A[i], B[i], t)})`));
  }

  /* ---------- scroll ---------- */
  const strip = $('#strip'), line = $('#pathline');
  const counted = new Set();
  function countUp(el) {
    if (counted.has(el)) return; counted.add(el);
    const to = +el.dataset.count, suf = el.dataset.suf || '', t0 = performance.now();
    const step = t => { const k = clamp((t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))) + suf; if (k < 1) requestAnimationFrame(step); };
    RM ? (el.textContent = to + suf) : requestAnimationFrame(step);
  }
  let lastY = -1;
  function onScroll() {
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    const g = clamp(y / max);
    setSky(g); line.style.transform = `scaleX(${g})`;
    scenes.forEach(s => {
      const top = s.offsetTop, h = s.offsetHeight - vh, p = clamp((y - top) / h);
      if (y + vh < top || y > top + s.offsetHeight) return;
      s.style.setProperty('--p', p);
      if (!s.classList.contains('rooms')) $$('.ly[data-d]', s).forEach(l => { const d = +l.dataset.d; l.style.transform = `translate3d(0,${(p * d * 220).toFixed(1)}px,0) scale(${(1 + p * d * .35).toFixed(4)})`; });
      $$('[data-show]', s).forEach(el => { const [a, b] = el.dataset.show.split(',').map(Number); const on = p >= a && p <= b; el.classList.toggle('on', on); if (on) $$('[data-count]', el).forEach(countUp); });
      const id = s.id;
      if (id === 'top') {
        const gt = smooth(0, .55, p);
        $('#gateL').style.transform = `scaleX(${1 - gt * .82})`; $('#gateR').style.transform = `scaleX(${1 - gt * .82})`;
        $('.gate-wrap', s).style.opacity = 1 - smooth(.5, .85, p);
        const intro = $('.intro', s); intro.style.opacity = 1 - smooth(.05, .4, p); intro.style.transform = `translateY(${-p * 120}px)`;
        $('.hint', s).style.opacity = 1 - smooth(0, .12, p);
      } else if (id === 'garden') {
        s._k = smooth(.12, .34, p); $('.bf-obj', s).classList.toggle('on', s._k > .98);
      } else if (id === 'lake') {
        $('.swans', s).setAttribute('transform', `translate(${(-p * 260).toFixed(1)} 0)`);
      } else if (id === 'front') {
        const o = smooth(.12, .42, p);
        $('#doorL').style.transform = `scaleX(${1 - o * .9})`; $('#doorR').style.transform = `scaleX(${1 - o * .9})`;
        $('.zoom', s).style.transform = `scale(${1 + Math.pow(smooth(.3, 1, p), 2) * 7})`;
        $('.doorlight', s).style.opacity = smooth(.42, .8, p);
      } else if (id === 'house') {
        const span = strip.scrollWidth - innerWidth;
        strip.style.transform = `translate3d(${(-smooth(0, 1, p) * span).toFixed(1)}px,0,0)`;
        $('.room-hint', s).style.opacity = p < .02 || p > .98 ? 0 : 1;
      } else if (id === 'dusk') {
        const lit = smooth(.05, .3, p);
        $$('.halo', s).forEach((h, i) => h.setAttribute('opacity', clamp(lit * 1.6 - i * .15)));
      }
    });
    if (pop.classList.contains('show') && Math.abs(y - popY) > 40) hidePop();
    lastY = y;
  }
  function flutter(t) {
    const gs = $('#garden'), k = gs._k || 0, field = $('.bf-field');
    const fr = field.getBoundingClientRect(), tr = $('.bf-obj').getBoundingClientRect();
    const cx = tr.left + tr.width / 2 - fr.left, cy = tr.top + tr.height / 2 - fr.top;
    flies.forEach((f, i) => {
      const tt = t / 1000 + f.ph;
      const rx = f.x * fr.width + Math.sin(tt * .6) * 70, ry = f.y * fr.height + Math.sin(tt * 1.2) * 30;
      const gx = cx + Math.cos(f.a) * tr.width * f.r * .5, gy = cy + Math.sin(f.a) * tr.height * f.r * .5;
      const x = rx + (gx - rx) * k, y = ry + (gy - ry) * k;
      f.el.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${(Math.sin(tt) * 16).toFixed(1)}deg)`;
      f.el.style.opacity = k > .98 ? 0 : 1;
    });
    if (!RM) requestAnimationFrame(flutter);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { sizeScenes(); onScroll(); });
  onScroll(); requestAnimationFrame(flutter);

  /* ---------- pressed flowers ---------- */
  let got = new Set();
  try { got = new Set(JSON.parse(localStorage.getItem('gflowers') || '[]')); } catch (e) {}
  const paintFlowers = () => { $('#fcount').textContent = `${[...got].filter(x => ORDER.includes(x)).length}/${ORDER.length}`; };
  function earn(id) {
    if (!ORDER.includes(id) || got.has(id)) return;
    got.add(id); try { localStorage.setItem('gflowers', JSON.stringify([...got])); } catch (e) {}
    paintFlowers(); const f = $('#flowers'); f.classList.remove('pop-in'); void f.offsetWidth; f.classList.add('pop-in');
    if (ORDER.every(x => got.has(x))) setTimeout(() => { closeAll(); openModal('thanks'); }, 1400);
    paintIndex();
  }
  $('#flowers').addEventListener('click', () => openModal('index'));
  paintFlowers();

  /* ---------- popover on objects ---------- */
  const short = id => (W[id].line || '').split('. ')[0].replace(/\.$/, '') + '.';
  function popHTML(ids) {
    if (ids[0] === 'letters') return `<div class="row"><h3>Kind words</h3><p>Letters from the people I've worked with.</p><div class="two"><button class="main" data-act="letters">Read the letters</button></div></div>`;
    return ids.map(id => `<div class="row"><h3>${NAME[id]}</h3><p>${short(id)}</p><div class="two"><button data-act="quick" data-id="${id}">Quick look</button><button class="main" data-act="full" data-id="${id}">Full story</button></div></div>`).join('');
  }
  function showPop(el) {
    clearTimeout(popTimer);
    if (popFor && popFor !== el) popFor.classList.remove('active');
    popFor = el; el.classList.add('active');
    pop.innerHTML = popHTML(el.dataset.ids.split(','));
    const r = el.getBoundingClientRect(), pw = Math.min(270, innerWidth - 32);
    pop.style.width = pw + 'px';
    let x = r.right + 12; if (x + pw > innerWidth - 16) x = r.left - pw - 12; if (x < 16) x = clamp(r.left + r.width / 2 - pw / 2, 16, innerWidth - pw - 16);
    const ph = pop.offsetHeight || 150;
    let yy = r.top + r.height / 2 - ph / 2; if (x === clamp(r.left + r.width / 2 - pw / 2, 16, innerWidth - pw - 16)) yy = r.bottom + 10 + ph > innerHeight - 16 ? r.top - ph - 10 : r.bottom + 10;
    pop.style.left = x + 'px'; pop.style.top = clamp(yy, 70, innerHeight - ph - 16) + 'px';
    pop.classList.add('show'); popY = scrollY;
  }
  function hidePop() { pop.classList.remove('show'); if (popFor) popFor.classList.remove('active'); popFor = null; }
  const later = () => { clearTimeout(popTimer); popTimer = setTimeout(hidePop, 320); };
  $$('.obj').forEach(el => {
    el.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') showPop(el); });
    el.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') later(); });
    el.addEventListener('click', e => { e.stopPropagation(); popFor === el && pop.classList.contains('show') && e.pointerType !== 'mouse' ? hidePop() : showPop(el); });
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPop(el); } });
  });
  pop.addEventListener('pointerenter', () => clearTimeout(popTimer));
  pop.addEventListener('pointerleave', e => { if (e.pointerType === 'mouse') later(); });
  document.addEventListener('click', e => { if (!pop.contains(e.target)) hidePop(); });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-act]'); if (!b) return;
    hidePop(); const id = b.dataset.id;
    if (b.dataset.act === 'quick') openQuick(id); else if (b.dataset.act === 'full') openFull(id); else if (b.dataset.act === 'letters') openModal('letters');
  });

  /* ---------- modals ---------- */
  function openModal(id) { const m = $('#' + id); m.classList.add('open'); m.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; setTimeout(() => $('.x', m)?.focus({ preventScroll: true }), 50); }
  function closeModal(m) { m.classList.remove('open'); m.setAttribute('aria-hidden', 'true'); $$('video', m).forEach(v => v.pause()); if (!$('.modal.open')) document.body.style.overflow = ''; }
  const closeAll = () => $$('.modal.open').forEach(closeModal);
  $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) { closeModal(m); const go = e.target.closest('a[href="#dusk"]'); if (go) { e.preventDefault(); goDusk(); } } }));
  addEventListener('keydown', e => { if (e.key === 'Escape') { hidePop(); closeAll(); } });
  function goDusk() { const s = $('#dusk'); scrollTo({ top: s.offsetTop + (s.offsetHeight - innerHeight) * .5, behavior: RM ? 'auto' : 'smooth' }); }

  const winText = id => (W[id].win || '').replace(/\s*Full story in the Featured section\.?/, '');
  function openQuick(id) {
    const w = W[id], n = (notes[id] || [])[0];
    $('#q-body').innerHTML = `${w.logo ? `<img class="q-logo" src="${IMG}logos/${w.logo}.webp" alt="">` : `<p class="script">${WHERE[id]}</p>`}
      <h2 class="q-name">${NAME[id]}</h2><p class="q-sub">${(w.chips || []).join(' · ')}</p>
      <p class="q-k">What I did</p><p class="q-v">${w.role}</p>
      <p class="q-k">What I achieved</p><p class="q-v">${winText(id)}</p>
      ${n ? `<p class="q-journal">“${n}”</p>` : ''}
      <div class="q-actions"><button class="btn" data-full="${id}">See the full story →</button><button class="btn ghost" data-close>Back to the walk</button></div>`;
    closeAll(); openModal('quick'); earn(id);
  }
  $('#quick').addEventListener('click', e => { const b = e.target.closest('[data-full]'); if (b) openFull(b.dataset.full); });

  const media = (m, alt) => m.type === 'video'
    ? `<video src="${m.src}" ${m.poster ? `poster="${m.poster}"` : ''} controls muted playsinline preload="none"></video>`
    : `<img src="${IMG + m.src}" alt="${alt}" loading="lazy">`;
  const PS = [['ps-home-after.webp', 'Homepage', 'After my rebuild'], ['ps-mymips-before.webp', 'MyMipsScore page', 'Before', 'Before'], ['ps-mymips-after.webp', 'MyMipsScore page', 'After: 57 → 94', 'After'], ['ps-mips10-before.webp', 'MIPS 10-step guide', 'Before', 'Before'], ['ps-mips10-after.webp', 'MIPS 10-step guide', 'After', 'After']];
  function openFull(id) {
    const w = W[id], i = ORDER.indexOf(id), nx = ORDER[(i + 1) % ORDER.length];
    const links = [...(w.link ? [[w.link[0] + ' ↗', w.link[1]]] : []), ...(w.reels || []).map(([t, u]) => [t + ' ↗', u])];
    let extra = '';
    if (id === 'darena') {
      extra = `<h3 class="s-sec">Screen recordings</h3><div class="films">${darenaFilms.map(f => `<figure class="${f.slot === 'top' ? 'wide' : ''}"><video src="${f.src}" poster="${f.poster}" controls muted playsinline preload="none"></video><figcaption>${f.badge ? `<span class="badge">${f.badge}</span>` : ''}<b>${f.title}.</b> ${f.note}</figcaption></figure>`).join('')}</div>
        <h3 class="s-sec">PageSpeed proof</h3><div class="films">${PS.map(([src, t, c, b]) => `<figure class="${b ? '' : 'wide'}"><img src="${IMG + src}" alt="PageSpeed result: ${t}, ${c}" loading="lazy"><figcaption>${b ? `<span class="badge">${b}</span>` : ''}<b>${t}.</b> ${c}</figcaption></figure>`).join('')}</div>`;
    }
    $('#s-body').innerHTML = `<div class="s-head"><p class="script">${WHERE[id]}</p><h2 class="s-name">${NAME[id]}</h2><p class="q-journal" style="border:0;padding:0;margin-top:12px;font-size:20px">${w.line}</p><div class="chips">${(w.chips || []).map(c => `<span>${c}</span>`).join('')}</div></div>
      <div class="s-grid"><div><h4>The brand</h4><p>${w.about}</p></div><div><h4>What I did</h4><p>${w.role}</p></div>
        ${w.pts ? `<div style="grid-column:1/-1"><h4>Highlights</h4><ul>${w.pts.map(p => `<li>${p}</li>`).join('')}</ul></div>` : ''}
        <p class="win">${winText(id)}</p></div>
      ${links.length ? `<div class="links">${links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`).join('')}</div>` : ''}
      ${extra}
      <h3 class="s-sec">The work</h3><div class="gallery">${w.media.map(m => media(m, NAME[id])).join('')}</div>
      <div class="s-next"><button class="btn ghost" data-close>Back to the walk</button><button class="btn" data-next="${nx}">Next: ${NAME[nx]} →</button></div>`;
    closeAll(); openModal('story'); $('#story .sheet').scrollTop = 0; earn(id);
  }
  $('#story').addEventListener('click', e => { const b = e.target.closest('[data-next]'); if (b) openFull(b.dataset.next); });

  $('#letter-grid').innerHTML = quotes.map(q => `<figure class="letter"><p>“${q[0]}”</p><p class="sig">${q[1]}</p><small>${q[2]}</small></figure>`).join('');
  function paintIndex() {
    $('#index-grid').innerHTML = ORDER.map(id => `<div class="ix${got.has(id) ? ' got' : ''}"><span class="where">${WHERE[id]}${got.has(id) ? ' · found' : ''}</span><h3>${NAME[id]}</h3><p>${short(id)}</p><div class="two"><button data-act="quick" data-id="${id}">Quick look</button><button class="main" data-act="full" data-id="${id}">Full story</button></div></div>`).join('')
      + `<div class="ix"><span class="where">The study</span><h3>Kind words</h3><p>Letters from the people I've worked with.</p><div class="two"><button class="main" data-act="letters">Read the letters</button></div></div>`;
  }
  paintIndex();
  $('#skip').addEventListener('click', () => openModal('index'));

  /* ---------- music ---------- */
  const audio = $('#audio'), mb = $('#music');
  mb.addEventListener('click', () => {
    if (audio.paused) { audio.volume = .45; audio.play().then(() => { mb.setAttribute('aria-pressed', 'true'); mb.setAttribute('aria-label', 'Pause music'); }).catch(() => {}); }
    else { audio.pause(); mb.setAttribute('aria-pressed', 'false'); mb.setAttribute('aria-label', 'Play music'); }
  });
})();
