(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const IMG = '../assets/img/';
  const { work, notes, darenaFilms } = window.SITE;
  const W = Object.fromEntries(work.map(w => [w.id, w]));
  const NAME = { darena: 'Darena Health', nexa: 'Nexa Avenue' };

  /* ---------- time of day: night by default ---------- */
  const root = document.documentElement, tb = $('#time');
  const setTime = t => { root.dataset.time = t; tb.querySelector('.lbl').textContent = t === 'night' ? 'Day' : 'Night'; tb.setAttribute('aria-label', t === 'night' ? 'Switch to day' : 'Switch to night'); try { localStorage.setItem('cityTime', t); } catch (e) {} };
  let saved = 'night'; try { saved = localStorage.getItem('cityTime') || 'night'; } catch (e) {}
  setTime(saved);
  tb.addEventListener('click', () => setTime(root.dataset.time === 'night' ? 'day' : 'night'));

  /* ---------- painting ---------- */
  let seed = 3;
  const rnd = (a = 0, b = 1) => { seed = (seed * 16807) % 2147483647; return a + (seed / 2147483647) * (b - a); };
  const svg = (inner, f, defs = '') => `<svg class="ly" data-f="${f}" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">${defs ? `<defs>${defs}</defs>` : ''}${inner}</svg>`;
  function windows(x, y, w, h, gx = 16, gy = 22, p = .45, cls = 'win') {
    let o = '';
    for (let yy = y + 12; yy < y + h - 14; yy += gy) for (let xx = x + 10; xx < x + w - 14; xx += gx) if (rnd() < p) o += `<rect class="${cls}" x="${xx.toFixed(0)}" y="${yy.toFixed(0)}" width="${(gx * .5).toFixed(0)}" height="${(gy * .5).toFixed(0)}"/>`;
    return o;
  }
  const lampPost = (x, y, h) => `<g><path d="M${x} ${y} V${y - h}" stroke="#1c1830" stroke-width="7"/><path d="M${x - 14} ${y} h28" stroke="#1c1830" stroke-width="7"/><path d="M${x - 34} ${y - h + 14} Q${x} ${y - h - 16} ${x + 34} ${y - h + 14}" stroke="#1c1830" stroke-width="4" fill="none"/>
    ${[-34, 34].map(dx => `<g transform="translate(${x + dx} ${y - h + 14})"><circle class="lampglow" r="70" fill="url(#glow)"/><path d="M-9 0 h18 l-3 20 h-12z" fill="#ffe2a0"/><path d="M-11 0 h22 l-11 -8z" fill="#1c1830"/></g>`).join('')}</g>`;

  // 0. sky extras
  seed = 5;
  const sky = svg(`<g class="stars">${Array.from({ length: 140 }, () => `<circle class="tw" cx="${rnd(0, 1440).toFixed(0)}" cy="${rnd(0, 430).toFixed(0)}" r="${rnd(.6, 1.8).toFixed(1)}" fill="#fff" opacity="${rnd(.35, .95).toFixed(2)}"/>`).join('')}</g>
    <g class="aurora" filter="url(#blur)"><path d="M-100 210 C200 120 420 260 700 170 C980 80 1200 220 1540 140 L1540 260 C1200 330 980 200 700 290 C420 380 200 240 -100 330Z" fill="url(#au1)"/><path d="M-100 120 C260 60 520 170 820 100 C1080 40 1300 120 1540 70 L1540 150 C1300 200 1080 120 820 180 C520 250 260 140 -100 200Z" fill="url(#au2)"/><path d="M200 280 C500 220 700 320 1000 250 C1200 200 1340 260 1500 230 L1500 300 C1340 330 1200 280 1000 330 C700 400 500 300 200 350Z" fill="url(#au3)"/></g>
    <g class="stars"><path d="M1230 110 a34 34 0 1 0 28 54 a27 27 0 1 1 -28 -54z" fill="#fff6dc"/><circle cx="1240" cy="140" r="90" fill="url(#glow)" opacity=".35"/></g>
    <g class="sun"><circle cx="720" cy="560" r="300" fill="url(#sunglow)"/><circle cx="720" cy="560" r="62" fill="#fff4d8"/></g>
    <g class="clouds" filter="url(#soft)">${Array.from({ length: 9 }, () => { const x = rnd(0, 1440), y = rnd(60, 300); return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${rnd(90, 200).toFixed(0)}" ry="${rnd(18, 36).toFixed(0)}" fill="#fff"/><ellipse cx="${(x + 60).toFixed(0)}" cy="${(y - 14).toFixed(0)}" rx="${rnd(50, 110).toFixed(0)}" ry="${rnd(18, 30).toFixed(0)}" fill="#fff"/>`; }).join('')}</g>`, .05,
    `<filter id="blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="16"/></filter><filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
     <linearGradient id="au1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6cf5c2" stop-opacity="0"/><stop offset=".5" stop-color="#5ef0b5" stop-opacity=".55"/><stop offset="1" stop-color="#a77bff" stop-opacity="0"/></linearGradient>
     <linearGradient id="au2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff8fc7" stop-opacity="0"/><stop offset=".5" stop-color="#c38bff" stop-opacity=".45"/><stop offset="1" stop-color="#6cf5c2" stop-opacity="0"/></linearGradient>
     <linearGradient id="au3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ae8ff" stop-opacity="0"/><stop offset=".5" stop-color="#7ae8ff" stop-opacity=".35"/><stop offset="1" stop-color="#ff8fc7" stop-opacity="0"/></linearGradient>
     <radialGradient id="glow"><stop offset="0" stop-color="#ffe2a8" stop-opacity=".85"/><stop offset="1" stop-color="#ffcf80" stop-opacity="0"/></radialGradient>
     <radialGradient id="sunglow"><stop offset="0" stop-color="#ffe6b8" stop-opacity=".95"/><stop offset=".5" stop-color="#ffb98a" stop-opacity=".4"/><stop offset="1" stop-color="#ff9a8a" stop-opacity="0"/></radialGradient>
     <linearGradient id="teal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f5b69"/><stop offset="1" stop-color="#083945"/></linearGradient>
     <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff1c8" stop-opacity=".55"/><stop offset="1" stop-color="#fff1c8" stop-opacity="0"/></linearGradient>`);

  // 1. far skyline: a domed heritage building, a crowned tower and the rest
  seed = 9;
  let far = '';
  for (let x = -20; x < 1460;) { const w = rnd(40, 90), h = rnd(120, 260); far += `<rect class="fill-far" x="${x.toFixed(0)}" y="${(600 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${(h + 40).toFixed(0)}"/>` + windows(x, 600 - h, w, h, 14, 20, .22); x += w + rnd(-6, 8); }
  far += `<g class="fill-far" transform="translate(70 430)"><rect x="0" y="60" width="260" height="120"/><rect x="100" y="30" width="60" height="40"/><path d="M96 34 Q130 -40 164 34Z"/><path d="M128 -16 v-18" stroke="var(--far)" stroke-width="4"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${14 + i * 27}" y="80" width="8" height="90" fill="var(--sk3)" opacity=".35"/>`).join('')}</g>`;
  far += `<g class="fill-far" transform="translate(1180 220)"><rect x="0" y="40" width="90" height="380"/><path d="M-6 44 L45 -10 L96 44Z"/><path d="M45 -10 v-34" stroke="var(--far)" stroke-width="5"/>${windows(0, 40, 90, 360, 14, 20, .35)}</g>`;
  const farL = svg(far, .22);

  // 2. the metro viaduct with a purple train
  seed = 13;
  const metro = svg(`<rect class="fill-mid" x="-40" y="500" width="1520" height="26" opacity=".95"/><rect x="-40" y="496" width="1520" height="6" fill="#8d7bc4" opacity=".6"/>${Array.from({ length: 9 }, (_, i) => `<rect class="fill-mid" x="${i * 180 + 40}" y="520" width="26" height="200"/>`).join('')}
    <g class="train"><g transform="translate(0 458)">${[0, 1, 2, 3].map(i => `<g transform="translate(${i * 152} 0)"><rect width="148" height="38" rx="10" fill="#7d4fc4"/><rect y="28" width="148" height="6" fill="#c9b6ff"/>${[12, 44, 76, 108].map(x => `<rect class="win" x="${x}" y="8" width="24" height="14" rx="3"/>`).join('')}</g>`).join('')}<circle class="lampglow" cx="604" cy="22" r="26" fill="url(#glow)"/></g></g>`, .5);

  // 3. MG Road buildings and the two billboards
  seed = 21;
  let mid = '';
  const blds = [[-20, 470, 200], [180, 520, 120], [300, 470, 470], [770, 540, 90], [860, 480, 380], [1240, 430, 220]];
  blds.forEach(([x, y, w], i) => { mid += `<rect class="fill-mid" x="${x}" y="${y}" width="${w}" height="${780 - y}"/>` + (i === 1 ? Array.from({ length: 3 }, (_, k) => `<path class="win" d="M${x + 14 + k * 36} 640 v-30 a12 12 0 0 1 24 0 v30z"/>`).join('') : windows(x, y, w, 780 - y, 22, 30, .5)); mid += `<rect x="${x}" y="${y}" width="${w}" height="6" fill="#000" opacity=".25"/>`; });
  const lights = (x0, x1, y) => { let o = ''; for (let x = x0 + 40; x < x1; x += 110) o += `<g class="bblight"><path d="M${x} ${y} v-22 h18" stroke="#2a2440" stroke-width="4" fill="none"/><path d="M${x + 6} ${y - 18} L${x - 40} ${y + 220} L${x + 90} ${y + 220} L${x + 30} ${y - 18}Z" fill="url(#cone)"/><rect x="${x + 12}" y="${y - 28}" width="16" height="10" rx="3" fill="#ffe6a8"/></g>`; return o; };
  const darena = `<g class="bb" data-id="darena" tabindex="0" role="button" aria-label="Darena Health billboard">
    <path d="M380 470 v-30 M680 470 v-30" stroke="#2a2440" stroke-width="10"/><rect x="340" y="432" width="380" height="8" fill="#2a2440"/>
    <g class="panel"><rect x="330" y="200" width="400" height="236" rx="8" fill="url(#teal)"/><rect x="330" y="200" width="400" height="236" rx="8" fill="none" stroke="#2a2440" stroke-width="8"/>
      <rect x="360" y="232" width="22" height="22" rx="5" fill="#f08a3c"/><text x="392" y="252" font-family="Inter, sans-serif" font-weight="700" font-size="30" fill="#fff" letter-spacing="-.5">darena</text>
      <text x="360" y="300" font-family="Playfair Display, serif" font-style="italic" font-size="30" fill="#fff">Health IT, made human.</text>
      <text x="360" y="352" font-family="Inter, sans-serif" font-weight="700" font-size="40" fill="#ffd27a">57 → 94</text><text x="360" y="374" font-family="Inter, sans-serif" font-size="13" fill="#cfe7ea" letter-spacing="1">PAGESPEED, CODED BY ME</text>
      <text x="560" y="352" font-family="Inter, sans-serif" font-weight="700" font-size="40" fill="#fff">16K</text><text x="560" y="374" font-family="Inter, sans-serif" font-size="13" fill="#cfe7ea" letter-spacing="1">VISITORS · 64 INQUIRIES</text>
      <rect x="360" y="396" width="140" height="24" rx="12" fill="#f08a3c"/><text x="430" y="413" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600" font-size="12" fill="#fff">Tap to explore</text></g>${lights(330, 730, 200)}</g>`;
  const nexa = `<g class="bb" data-id="nexa" tabindex="0" role="button" aria-label="Nexa Avenue billboard">
    <path d="M920 480 v-30 M1150 480 v-30" stroke="#2a2440" stroke-width="10"/><rect x="890" y="444" width="290" height="8" fill="#2a2440"/>
    <g class="panel"><rect x="880" y="250" width="310" height="198" rx="8" fill="#f8f4ff"/><rect x="880" y="250" width="310" height="198" rx="8" fill="none" stroke="#2a2440" stroke-width="8"/>
      <image href="${IMG}logos/nexa.webp" x="925" y="266" width="220" height="74" preserveAspectRatio="xMidYMid meet"/>
      <text x="1035" y="368" text-anchor="middle" font-family="Playfair Display, serif" font-style="italic" font-size="20" fill="#3c2a7a">Built for teams across borders.</text>
      <text x="1035" y="410" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="28" fill="#5a37c9">21,404</text><text x="1035" y="430" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" fill="#6b5a92" letter-spacing="1">LINKEDIN IMPRESSIONS</text></g>${lights(880, 1190, 250)}</g>`;
  const midL = svg(mid + darena + nexa, 1);

  // 4. the street: trees, lamps, traffic, the road sign and an auto rickshaw
  seed = 33;
  const tree = (x, s) => `<g transform="translate(${x} 760) scale(${s})"><path d="M0 0 C-4 -50 6 -90 0 -120" stroke="#2b2230" stroke-width="12" fill="none"/>${Array.from({ length: 16 }, () => `<ellipse class="fill-tree" cx="${rnd(-110, 110).toFixed(0)}" cy="${rnd(-200, -120).toFixed(0)}" rx="${rnd(30, 60).toFixed(0)}" ry="${rnd(22, 40).toFixed(0)}"/>`).join('')}</g>`;
  const cars = Array.from({ length: 7 }, (_, i) => { const back = i % 2, y = back ? 806 : 852, d = rnd(6, 11).toFixed(1), dl = (-rnd(0, 11)).toFixed(1), c = ['#e8e2f0', '#c94f6d', '#4d6fa8', '#f2c14e', '#2b2b3a'][i % 5];
    return `<g class="car${back ? ' back' : ''}" style="--d:${d}s;--dl:${dl}s"><g transform="translate(0 ${y})"><rect x="0" y="-22" width="70" height="22" rx="8" fill="${c}"/><rect x="12" y="-36" width="42" height="16" rx="6" fill="${c}"/><rect x="18" y="-32" width="30" height="10" rx="3" fill="#9fb3d6" opacity=".7"/><circle cx="16" cy="0" r="7" fill="#111"/><circle cx="54" cy="0" r="7" fill="#111"/>
      ${back ? `<rect x="-2" y="-16" width="6" height="6" rx="2" fill="#fff6d0"/><ellipse class="lampglow" cx="-30" cy="-12" rx="40" ry="8" fill="url(#glow)"/><rect x="66" y="-16" width="6" height="6" rx="2" fill="#ff4d4d"/>` : `<rect x="66" y="-16" width="6" height="6" rx="2" fill="#fff6d0"/><ellipse class="lampglow" cx="100" cy="-12" rx="40" ry="8" fill="url(#glow)"/><rect x="-2" y="-16" width="6" height="6" rx="2" fill="#ff4d4d"/>`}</g></g>`; }).join('');
  const sign = `<g transform="translate(1010 560)"><path d="M20 100 V220 M200 100 V220" stroke="#5b6170" stroke-width="7"/><rect width="220" height="108" rx="8" fill="#1f6b46" stroke="#fff" stroke-width="4"/><text x="110" y="28" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" fill="#d8f0e2" letter-spacing="2">WELCOME TO</text><text x="110" y="64" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="32" fill="#fff">MG Road</text><text x="110" y="94" text-anchor="middle" font-family="Noto Sans Kannada, sans-serif" font-weight="600" font-size="20" fill="#fff">ಎಂ.ಜಿ. ರಸ್ತೆ</text></g>`;
  const auto = `<g transform="translate(110 900) scale(1.5)"><g class="auto"><path d="M0 -14 V-60 Q2 -78 30 -80 H96 Q118 -78 120 -58 V-14Z" fill="#1d1d1d"/><path d="M4 -58 Q8 -74 30 -76 H94 Q114 -74 116 -58Z" fill="#f2c230"/><path d="M8 -52 H72 V-24 H8Z" fill="#3a8a4a"/><path d="M76 -52 H114 V-14 H76Z" fill="#3a8a4a"/><rect x="82" y="-48" width="26" height="16" rx="3" fill="#9fc6d6" opacity=".6"/><circle cx="20" cy="-6" r="10" fill="#111"/><circle cx="104" cy="-6" r="10" fill="#111"/><circle cx="20" cy="-6" r="4" fill="#777"/><circle cx="104" cy="-6" r="4" fill="#777"/><circle cx="122" cy="-30" r="5" fill="#fff6d0"/><ellipse class="lampglow" cx="160" cy="-26" rx="50" ry="12" fill="url(#glow)"/></g></g>`;
  const street = svg(`<rect class="fill-road" x="-400" y="760" width="2240" height="700"/><rect x="-40" y="752" width="1520" height="14" fill="#8a8299" opacity=".55"/><path d="M-40 830 H1480" stroke="#e8e2f0" stroke-width="3" stroke-dasharray="30 26" opacity=".6"/>
    ${tree(40, 1)}${tree(560, .9)}${tree(1360, 1.05)}${lampPost(260, 760, 210)}${lampPost(820, 760, 210)}${lampPost(1290, 760, 210)}${sign}${cars}${auto}`, 1.25);

  $('#layers').innerHTML = sky + farL + metro + midL + street;
  const layers = $$('#layers .ly');

  /* ---------- camera ---------- */
  const card = $('#card'), intro = $('#intro'), hint = $('#hint'), scene = $('#top');
  const BOX = { darena: [330, 200, 400, 270], nexa: [880, 250, 310, 230] };
  const fit = () => { const w = innerWidth, h = innerHeight, k = Math.max(w / 1440, h / 900); return { w, h, k, ox: (w - 1440 * k) / 2, oy: h - 900 * k }; };
  function shot(id, F) {
    if (!id) return { tx: 0, ty: 0, s: 1 };
    if (id === 'intro') return { tx: 0, ty: F.h * .42, s: 1 };
    if (id === 'wide') { const s = 1.2, px = F.ox + 720 * F.k, py = F.oy + 720 * F.k; return { tx: F.w / 2 - s * px, ty: F.h * .62 - s * py, s }; }
    const [x, y, bw, bh] = BOX[id], pw = bw * F.k, ph = bh * F.k;
    const s = Math.max(1, Math.min(F.w * (F.w < 700 ? .9 : .5) / pw, F.h * .5 / ph));
    const px = F.ox + (x + bw / 2) * F.k, py = F.oy + (y + bh / 2) * F.k;
    return { tx: F.w / 2 - s * px, ty: F.h * (F.w < 700 ? .36 : .4) - s * py, s };
  }
  const KEYS = [[0, 'intro'], [.04, 'intro'], [.14, null], [.28, 'darena'], [.46, 'darena'], [.6, 'nexa'], [.8, 'nexa'], [.95, 'wide']];
  const ease = t => t * t * (3 - 2 * t), clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  let focus = null;
  function camera() {
    const F = fit(), top = scene.offsetTop, len = scene.offsetHeight - innerHeight, p = clamp((scrollY - top) / len);
    let i = 0; while (i < KEYS.length - 2 && p > KEYS[i + 1][0]) i++;
    const [t0, a] = KEYS[i], [t1, b] = KEYS[i + 1], t = ease(clamp((p - t0) / (t1 - t0)));
    const A = shot(a, F), B = shot(b, F);
    const s = A.s + (B.s - A.s) * t, tx = A.tx + (B.tx - A.tx) * t, ty = A.ty + (B.ty - A.ty) * t;
    layers.forEach(l => { const f = +l.dataset.f, sf = 1 + (s - 1) * f; l.style.transform = `translate3d(${(tx * f).toFixed(1)}px,${(ty * f).toFixed(1)}px,0) scale(${sf.toFixed(4)})`; });
    intro.style.opacity = 1 - clamp((p - .02) / .08); intro.style.transform = `translateY(${-p * 500}px)`; hint.style.opacity = 1 - clamp(p / .04);
    const now = (p > .3 && p < .5) ? 'darena' : (p > .63 && p < .84) ? 'nexa' : null;
    if (now !== focus) { focus = now; $$('.bb').forEach(b => b.classList.toggle('focus', b.dataset.id === now)); if (now) { card.innerHTML = cardHTML(now); card.classList.add('on'); } else card.classList.remove('on'); }
  }
  const short = id => (W[id].line || '').split('. ')[0].replace(/\.$/, '') + '.';
  const cardHTML = id => `<p class="where">MG Road · ${id === 'darena' ? 'Billboard 1 of 2' : 'Billboard 2 of 2'}</p><h3>${NAME[id]}</h3><p>${short(id)}</p><div class="two"><button data-q="${id}">Quick look</button><button class="main" data-f="${id}">Explore</button></div>`;
  addEventListener('scroll', camera, { passive: true }); addEventListener('resize', camera); camera();

  /* ---------- quick look and explore ---------- */
  const open = id => { $('#' + id).classList.add('open'); document.body.style.overflow = 'hidden'; };
  const close = m => { m.classList.remove('open'); $$('video', m).forEach(v => v.pause()); if (!$('.modal.open')) document.body.style.overflow = ''; };
  $$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m || e.target.closest('[data-close]')) close(m); }));
  addEventListener('keydown', e => { if (e.key === 'Escape') $$('.modal.open').forEach(close); });
  const win = id => (W[id].win || '').replace(/\s*Full story in the Featured section\.?/, '');
  function quick(id) {
    const w = W[id];
    $('#q').innerHTML = `${w.logo ? `<img src="${IMG}logos/${w.logo}.webp" alt="" style="height:40px;margin-bottom:10px">` : ''}<h2 class="nm">${NAME[id]}</h2><p class="k">What I did</p><p>${w.role}</p><p class="k">What I achieved</p><p>${win(id)}</p>${notes[id] ? `<p style="margin-top:16px;font-family:var(--serif);font-style:italic;color:#6a5a72">“${notes[id][0]}”</p>` : ''}<button class="btn" data-f="${id}">Explore the full project →</button>`;
    open('quick');
  }
  const media = m => m.type === 'video' ? `<video src="${m.src}" ${m.poster ? `poster="${m.poster}"` : ''} controls muted playsinline preload="none"></video>` : `<img src="${IMG + m.src}" alt="" loading="lazy">`;
  function full(id) {
    const w = W[id], links = [...(w.link ? [[w.link[0], w.link[1]]] : []), ...(w.reels || [])];
    const extra = id === 'darena' ? `<h3 class="h4">Screen recordings</h3><div class="films">${darenaFilms.map(f => `<figure class="${f.slot === 'top' ? 'wide' : ''}"><video src="${f.src}" poster="${f.poster}" controls muted playsinline preload="none"></video><figcaption>${f.badge ? f.badge + ': ' : ''}${f.title}. ${f.note}</figcaption></figure>`).join('')}</div>
      <h3 class="h4">PageSpeed proof</h3><div class="films">${[['ps-mymips-before.webp', 'MyMipsScore, before'], ['ps-mymips-after.webp', 'MyMipsScore, after: 57 → 94'], ['ps-mips10-before.webp', 'MIPS guide, before'], ['ps-mips10-after.webp', 'MIPS guide, after']].map(([s, c]) => `<figure><img src="${IMG + s}" alt="${c}" loading="lazy"><figcaption>${c}</figcaption></figure>`).join('')}</div>` : '';
    $('#f').innerHTML = `<p class="k" style="margin:0">MG Road</p><h2 class="nm">${NAME[id]}</h2><p style="font-family:var(--serif);font-style:italic;font-size:20px;margin-top:10px">${w.line}</p><div class="chips">${(w.chips || []).map(c => `<span>${c}</span>`).join('')}</div>
      <p class="k">The brand</p><p>${w.about}</p><p class="k">What I did</p><p>${w.role}</p>${w.pts ? `<p class="k">Highlights</p><ul style="padding-left:18px">${w.pts.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}<p class="win">${win(id)}</p>
      ${links.length ? `<div class="links">${links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t} ↗</a>`).join('')}</div>` : ''}${extra}<h3 class="h4">The work</h3><div class="gallery">${w.media.map(media).join('')}</div>`;
    $$('.modal.open').forEach(close); open('full'); $('#full .sheet').scrollTop = 0;
  }
  document.addEventListener('click', e => {
    const q = e.target.closest('[data-q]'), f = e.target.closest('[data-f]:not(svg)'), bb = e.target.closest('.bb');
    if (q) quick(q.dataset.q); else if (f && f.tagName === 'BUTTON') full(f.dataset.f); else if (bb) quick(bb.dataset.id);
  });
  $$('.bb').forEach(b => b.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); quick(b.dataset.id); } }));
})();
