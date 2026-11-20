/* Painted scenes. Every scene is drawn as layered SVG in a 1440 x 900 box. */
window.SCENES = (() => {
  let seed = 7;
  const rnd = (a = 0, b = 1) => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return a + (((t ^ t >>> 14) >>> 0) / 4294967296) * (b - a); };
  const pick = a => a[(rnd() * a.length) | 0];
  const svg = (inner, d = 0, extra = '') => `<svg class="ly" data-d="${d}" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" ${extra}>${inner}</svg>`;
  const PINKS = ['#f4a3b8', '#ee8aa6', '#f7b9c6', '#e5768f', '#fbd0d6', '#ffe6ea'];
  const BLOOM = ['#f6b3c4', '#f39ab3', '#fbcbd6', '#e9809f', '#fde2e8', '#d9a0c8'];
  const BOUG = ['#d6336c', '#e64980', '#c2255c', '#f06595', '#a61e4d'];

  /* ---------- painting helpers ---------- */
  function tulips(n, y0, y1, s0, s1, x0 = -20, x1 = 1460) {
    const items = [];
    for (let i = 0; i < n; i++) items.push({ x: rnd(x0, x1), y: rnd(y0, y1), c: pick(PINKS) });
    items.sort((a, b) => a.y - b.y);
    return items.map(t => {
      const k = s0 + (s1 - s0) * (t.y - y0) / (y1 - y0);
      return `<g transform="translate(${t.x.toFixed(1)} ${t.y.toFixed(1)}) scale(${k.toFixed(2)})"><path d="M0 0 V60" stroke="#5f8a5a" stroke-width="2.4"/><path d="M0 50 C-14 40 -18 24 -16 12 C-8 22 -2 34 0 46Z" fill="#6f9a66"/><path d="M-10 -2 C-12 -16 -6 -26 0 -28 C6 -26 12 -16 10 -2 C6 4 -6 4 -10 -2Z" fill="${t.c}"/><path d="M-4 -26 C0 -18 0 -8 0 2" stroke="rgba(255,255,255,.4)" stroke-width="1.6" fill="none"/></g>`;
    }).join('');
  }
  function blooms(cx, cy, rx, ry, n, cols = BLOOM, r0 = 7, r1 = 18, op = .85) {
    let o = '';
    for (let i = 0; i < n; i++) {
      const a = rnd(0, Math.PI * 2), d = Math.sqrt(rnd());
      o += `<circle cx="${(cx + Math.cos(a) * rx * d).toFixed(1)}" cy="${(cy + Math.sin(a) * ry * d).toFixed(1)}" r="${rnd(r0, r1).toFixed(1)}" fill="${pick(cols)}" opacity="${(op * rnd(.6, 1)).toFixed(2)}"/>`;
    }
    return o;
  }
  function leaves(cx, cy, rx, ry, n, cols = ['#7f9a6f', '#8fae7c', '#6e8a62', '#a3bf8c']) { return blooms(cx, cy, rx, ry, n, cols, 10, 26, .9); }
  function willow(x, y, h) {
    let o = `<path d="M${x} ${y} C${x - 6} ${y - h * .4} ${x + 8} ${y - h * .7} ${x} ${y - h}" stroke="#6b5a4a" stroke-width="10" fill="none"/>`;
    o += leaves(x, y - h, 90, 50, 40, ['#9cb07a', '#b6c78f', '#86a06a']);
    for (let i = 0; i < 26; i++) { const sx = x + rnd(-95, 95), sy = y - h + rnd(-20, 30), L = rnd(60, h * .8); o += `<path d="M${sx.toFixed(0)} ${sy.toFixed(0)} q${rnd(-8, 8).toFixed(0)} ${(L / 2).toFixed(0)} ${rnd(-4, 4).toFixed(0)} ${L.toFixed(0)}" stroke="${pick(['#9cb07a', '#b6c78f', '#86a06a'])}" stroke-width="${rnd(3, 6).toFixed(1)}" stroke-linecap="round" fill="none" opacity=".9"/>`; }
    return o;
  }
  function swan(x, y, s, flip = 0) {
    const body = `<path d="M0 0 C18 -20 66 -20 92 -6 C72 12 22 12 0 0Z" fill="#fffaf5"/><path d="M8 -2 C30 -12 56 -12 76 -6" stroke="#eadfd8" stroke-width="2" fill="none"/><path d="M80 -8 C70 -34 92 -58 104 -46 C108 -40 104 -34 98 -38 C92 -44 84 -32 88 -10" stroke="#fffaf5" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M104 -46 l9 4 -9 2z" fill="#f08c3a"/><circle cx="100" cy="-46" r="1.6" fill="#2b2230"/>`;
    return `<g class="swan" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><g class="bob">${body}<g transform="scale(1 -1)" opacity=".22">${body}</g></g></g>`;
  }
  function lamp(x, y, h, lit = 1, id = '') {
    return `<g ${id ? `id="${id}"` : ''}><path d="M${x} ${y} V${y - h}" stroke="#2c2530" stroke-width="7"/><path d="M${x - 16} ${y} h32" stroke="#2c2530" stroke-width="8"/>
      <path d="M${x} ${y - h + 10} c0 -16 26 -16 30 -2" stroke="#2c2530" stroke-width="4" fill="none"/>
      <g transform="translate(${x + 30} ${y - h + 10})"><circle class="halo" r="60" fill="url(#lampGlow)" opacity="${lit}"/><path d="M-12 0 h24 l-4 28 h-16z" fill="#ffe2a0" class="pane" opacity="${.35 + lit * .65}"/><path d="M-15 0 h30 l-15 -10z" fill="#2c2530"/><path d="M-12 0 h24 l-4 28 h-16z" fill="none" stroke="#2c2530" stroke-width="2.5"/><path d="M-8 28 h16" stroke="#2c2530" stroke-width="4"/></g></g>`;
  }
  const gold = '#c9a050';

  /* ---------- shared defs ---------- */
  const defs = `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
    <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--s1)"/><stop offset=".6" style="stop-color:var(--s2)"/><stop offset="1" style="stop-color:var(--s3)"/></linearGradient>
    <linearGradient id="waterG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--s3)"/><stop offset=".5" style="stop-color:var(--s2)"/><stop offset="1" stop-color="#7d86b8"/></linearGradient>
    <radialGradient id="lampGlow"><stop offset="0" stop-color="#ffe7b0" stop-opacity=".9"/><stop offset="1" stop-color="#ffcf80" stop-opacity="0"/></radialGradient>
    <radialGradient id="warm"><stop offset="0" stop-color="#fff2d6" stop-opacity=".85"/><stop offset="1" stop-color="#ffe0b0" stop-opacity="0"/></radialGradient>
    <linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a77b5a"/><stop offset="1" stop-color="#7a543c"/></linearGradient>
    <linearGradient id="floorG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98c68"/><stop offset="1" stop-color="#8a6247"/></linearGradient>
    <pattern id="damask" width="60" height="80" patternUnits="userSpaceOnUse"><path d="M30 8 C40 20 40 34 30 42 C20 34 20 20 30 8Z M30 48 c6 6 6 14 0 22 c-6 -8 -6 -16 0 -22Z M0 40 c6 6 6 14 0 22 M60 40 c-6 6 -6 14 0 22" fill="#fff" opacity=".18"/></pattern>
    <pattern id="stripes" width="44" height="10" patternUnits="userSpaceOnUse"><rect width="22" height="10" fill="#fff" opacity=".16"/></pattern>
    <pattern id="tiles" width="80" height="40" patternUnits="userSpaceOnUse"><path d="M0 20 L40 0 L80 20 L40 40Z" fill="#efe6dc"/><path d="M40 0 L80 20 V0Z M0 0 V20 L40 0Z M0 40 V20 L40 40Z M80 40 V20 L40 40Z" fill="#6f6470"/></pattern>
    <pattern id="planks" width="160" height="40" patternUnits="userSpaceOnUse"><rect width="160" height="40" fill="url(#floorG)"/><path d="M0 0 H160 M0 20 H160 M60 0 V20 M130 20 V40" stroke="#6b4a36" stroke-width="1.4" opacity=".55"/></pattern>
    <pattern id="gingham" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff"/><rect width="8" height="16" fill="#e8a3b4" opacity=".5"/><rect width="16" height="8" fill="#e8a3b4" opacity=".5"/></pattern>
  </defs></svg>`;

  /* ---------- 0. the gate at sunrise ---------- */
  function gate() {
    seed = 11;
    const sky = `<rect width="1440" height="900" fill="url(#skyG)"/>`;
    const sun = `<circle class="sun" cx="380" cy="420" r="70" fill="#fff6dc"/><circle cx="380" cy="420" r="190" fill="url(#warm)"/>`;
    const clouds = blooms(400, 170, 260, 40, 40, ['#fff', '#fde8ee', '#f8dbe6'], 20, 46, .35) + blooms(1100, 230, 300, 50, 46, ['#fff', '#fde8ee', '#f8dbe6'], 20, 46, .3);
    const mtn = `<path d="M0 560 L160 470 L260 510 L420 420 L560 500 L700 440 L860 520 L1010 430 L1160 495 L1300 450 L1440 500 V900 H0Z" fill="#b8a3c8" opacity=".8"/><path d="M392 434 L420 420 L452 436 L430 440Z M984 442 L1010 430 L1036 444 L1012 446Z" fill="#fff" opacity=".75"/>`;
    const mist = `<rect y="470" width="1440" height="160" fill="#fff" opacity=".35"/><rect y="520" width="1440" height="60" fill="#fff" opacity=".3"/>`;
    const hills = `<path d="M0 640 C220 560 420 600 620 610 C860 622 1060 560 1440 600 V900 H0Z" fill="#9fb48f"/>
      <g transform="translate(170 548)"><rect x="0" y="24" width="96" height="52" fill="#f3e3d6"/><path d="M-8 28 L48 -6 L104 28Z" fill="#7a5b6c"/><rect x="18" y="40" width="14" height="16" fill="#ffd98a"/><rect x="62" y="40" width="14" height="16" fill="#ffd98a"/></g>
      ${leaves(320, 570, 30, 44, 14)}${leaves(1180, 576, 40, 50, 16)}${leaves(1250, 590, 28, 36, 10)}`;
    const gateSvg = `<g id="gateL"><g fill="none" stroke="#2f2433" stroke-width="5"><rect x="80" y="120" width="220" height="400"/><path d="M80 120 Q190 40 300 120"/><path d="M110 120 V520 M140 110 V520 M170 100 V520 M200 96 V520 M230 100 V520 M260 108 V520"/><circle cx="190" cy="300" r="34"/><path d="M168 300 c10 -16 34 -16 44 0 c-10 16 -34 16 -44 0" /></g></g>
      <g id="gateR"><g fill="none" stroke="#2f2433" stroke-width="5"><rect x="300" y="120" width="220" height="400"/><path d="M300 120 Q410 40 520 120"/><path d="M340 108 V520 M370 100 V520 M400 96 V520 M430 100 V520 M460 110 V520 M490 120 V520"/><circle cx="410" cy="300" r="34"/><path d="M388 300 c10 -16 34 -16 44 0 c-10 16 -34 16 -44 0"/></g></g>
      <rect x="40" y="60" width="40" height="460" fill="#d8cbc0"/><rect x="520" y="60" width="40" height="460" fill="#d8cbc0"/><rect x="34" y="52" width="52" height="14" fill="#c9bab0"/><rect x="514" y="52" width="52" height="14" fill="#c9bab0"/>
      <circle cx="60" cy="36" r="18" fill="#ffe3a6"/><circle cx="540" cy="36" r="18" fill="#ffe3a6"/>
      ${blooms(60, 120, 60, 60, 40, BOUG, 6, 13, .9)}${blooms(540, 140, 60, 70, 44, BOUG, 6, 13, .9)}`;
    return `<div class="stage">${svg(sky, 0)}${svg(sun + clouds, .05)}${svg(mtn, .1)}${svg(mist, .14)}${svg(hills, .22)}${svg(tulips(170, 640, 780, .45, .9), .4)}
      <div class="gate-wrap"><svg class="gate" viewBox="0 0 600 520" aria-hidden="true">${gateSvg}</svg></div>
      ${svg(tulips(56, 800, 940, 1.3, 2.4), .75, 'style="z-index:4"')}
      <div class="intro"><p class="tag">Sushma Somashekar · Designer, brand storyteller &amp; growth strategist</p><h1>Brands, meet <em>your people.</em></h1><p class="line">I help brands speak to the right people, and make the right people look at the brand.</p></div>
      <p class="hint">Scroll to open the gate ↓</p></div>`;
  }

  /* ---------- 1. the garden: butterflies = Darena ---------- */
  function garden() {
    seed = 23;
    const sky = `<rect width="1440" height="900" fill="url(#skyG)"/>` + blooms(1000, 160, 340, 60, 50, ['#fff', '#fdf0f3'], 20, 50, .45);
    const far = `<path d="M0 600 C260 540 520 580 760 560 C1000 540 1200 580 1440 560 V900 H0Z" fill="#a9c08f"/>
      <g transform="translate(980 470)"><rect x="0" y="40" width="210" height="110" fill="#f6ebe2"/><path d="M-14 46 L105 -18 L224 46Z" fill="#8c6b78"/><rect x="30" y="70" width="30" height="40" fill="#ffe1a0"/><rect x="150" y="70" width="30" height="40" fill="#ffe1a0"/><path d="M90 150 v-50 a15 15 0 0 1 30 0 v50" fill="#6f8c7e"/></g>
      <path d="M0 640 H1440" stroke="#fff" stroke-width="6" stroke-dasharray="2 22" opacity=".9"/>
      ${leaves(820, 560, 90, 40, 24)}`;
    // the big blossom tree with a swing, framing the left
    const tree = `<path d="M150 900 C170 760 140 640 210 520 C260 430 380 360 520 330 C600 312 700 320 760 340" stroke="#5e4a42" stroke-width="58" fill="none" stroke-linecap="round"/>
      <path d="M200 560 C140 470 90 420 20 400" stroke="#5e4a42" stroke-width="30" fill="none" stroke-linecap="round"/>
      ${blooms(380, 250, 420, 190, 760, BLOOM, 5, 15, .9)}${blooms(80, 330, 160, 120, 200, BLOOM, 5, 14, .9)}${blooms(760, 300, 160, 90, 120, ['#cf9fd6', '#dcb3e0', '#f2b9cb'], 8, 18, .85)}
      <g class="swing"><path d="M560 336 V640 M660 340 V640" stroke="#7a6a60" stroke-width="3"/><rect x="540" y="636" width="140" height="14" rx="3" fill="#8a6a50"/></g>`;
    const beds = blooms(720, 860, 760, 70, 360, ['#7f95d8', '#9fb1ee', '#f39ab3', '#ff9f68', '#ffd166', '#f7b9c6', '#b197fc'], 8, 18, .95) + leaves(720, 900, 760, 40, 120);
    return `<div class="stage">${svg(sky, 0)}${svg(far, .12)}
      <div class="ly bf-field" data-d=".2"></div>
      ${svg(tree, .3)}${svg(beds, .55, 'style="z-index:4"')}
      <button class="obj obj-html bf-obj" data-ids="darena" aria-label="Darena Health: the butterflies"><span class="bf-swarm"></span></button>
      <p class="scene-note" data-show=".3,.85">The first thing I grew: <b>Darena Health</b>. Tap the butterflies.</p></div>`;
  }

  /* ---------- 2. the lake, golden hour, with proof numbers ---------- */
  function lake() {
    seed = 31;
    const sky = `<rect width="1440" height="900" fill="url(#skyG)"/><circle cx="220" cy="520" r="60" fill="#fff4d6"/><circle cx="220" cy="520" r="240" fill="url(#warm)"/>` +
      blooms(900, 200, 420, 70, 70, ['#ffd1b3', '#fbb8c8', '#fff0e0'], 18, 50, .5);
    const mtn = `<path d="M300 560 L520 400 L640 470 L820 330 L960 430 L1100 360 L1300 470 L1440 420 V600 H300Z" fill="#c59bb8"/><path d="M780 360 L820 330 L870 370 L830 372Z M1070 380 L1100 360 L1140 390Z" fill="#fff" opacity=".85"/><path d="M820 330 L960 430 L1100 360 L1300 470 L1440 420 V600 H820Z" fill="#a9789f" opacity=".5"/>`;
    const shore = `${leaves(160, 560, 220, 60, 60)}${leaves(1280, 560, 220, 60, 60)}${willow(1240, 600, 260)}${willow(140, 610, 230)}
      <g transform="translate(330 560)"><path d="M0 40 Q140 -40 280 40" stroke="#c9bdb6" stroke-width="22" fill="none"/><path d="M0 40 Q140 -40 280 40" stroke="#e6dcd5" stroke-width="6" fill="none" transform="translate(0 -12)"/><path d="M60 22 v20 M110 6 v20 M170 6 v20 M220 22 v20" stroke="#c9bdb6" stroke-width="5"/></g>
      <g transform="translate(1010 470)"><path d="M0 40 Q60 -30 120 40Z" fill="#c98f9f"/><rect x="8" y="40" width="104" height="8" fill="#f2e8e4"/><path d="M16 48 v62 M44 48 v62 M76 48 v62 M104 48 v62" stroke="#f2e8e4" stroke-width="8"/><rect x="0" y="110" width="120" height="10" fill="#e6dcd5"/></g>
      ${blooms(1070, 590, 90, 26, 60, BLOOM, 5, 11, .9)}`;
    const water = `<rect y="590" width="1440" height="310" fill="url(#waterG)"/><g class="ripples" stroke="#fff" stroke-linecap="round" opacity=".5">${Array.from({ length: 34 }, () => { const x = rnd(0, 1400), y = rnd(610, 880), w = rnd(30, 120); return `<path d="M${x.toFixed(0)} ${y.toFixed(0)} h${w.toFixed(0)}" stroke-width="${rnd(1.5, 3).toFixed(1)}"/>`; }).join('')}</g>
      <path d="M160 600 L280 600 L240 900 L200 900Z" fill="#fff4d6" opacity=".25"/>
      ${Array.from({ length: 16 }, () => { const x = rnd(40, 1400), y = rnd(700, 880); return `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="26" ry="9" fill="#6f9a66" opacity=".9"/><path d="M${(x - 8).toFixed(0)} ${(y - 4).toFixed(0)} c4 -16 12 -16 16 0z" fill="${pick(['#f06595', '#f783ac', '#faa2c1'])}"/>`; }).join('')}`;
    const swans = `<g class="swans">${swan(560, 700, 1)}${swan(820, 760, 1.25, 1)}${swan(1010, 680, .8)}</g>`;
    const front = tulips(70, 830, 940, 1.4, 2.6, -40, 520) + tulips(60, 830, 940, 1.4, 2.6, 980, 1480);
    return `<div class="stage">${svg(sky, 0)}${svg(mtn, .08)}${svg(shore + water, .18)}
      ${svg(swans, .18, 'id="swans"')}${svg(front, .6, 'style="z-index:4"')}
      <div class="proof" data-show=".18,.92"><p class="tag">By the lake, a few numbers</p>
        <ul><li><b data-count="94">0</b><span>PageSpeed score I coded, up from 57</span></li><li><b data-count="16" data-suf="K">0</b><span>website visitors in seven months</span></li><li><b data-count="64">0</b><span>inquiries from website forms</span></li><li><b data-count="70" data-suf="K+">0</b><span>reel views for a luxury fan brand</span></li></ul></div></div>`;
  }

  /* ---------- 3. the house front: the door opens ---------- */
  function front() {
    seed = 41;
    const sky = `<rect width="1440" height="900" fill="url(#skyG)"/>`;
    const house = `<rect x="260" y="250" width="920" height="650" fill="#f4e9df"/><path d="M220 260 L720 60 L1220 260Z" fill="#8c6b78"/><rect x="240" y="250" width="960" height="18" fill="#e3d4c8"/>
      ${[340, 480, 900, 1040].map(x => `<g><rect x="${x}" y="330" width="90" height="140" rx="45" fill="#ffe0a3"/><path d="M${x + 45} 330 V470 M${x} 400 H${x + 90}" stroke="#e8d8cc" stroke-width="6"/><rect x="${x - 6}" y="470" width="102" height="12" fill="#d8c6b8"/></g>`).join('')}
      ${[340, 480, 900, 1040].map(x => `<g><rect x="${x}" y="570" width="90" height="140" rx="6" fill="#ffd894"/><path d="M${x + 45} 570 V710 M${x} 640 H${x + 90}" stroke="#e8d8cc" stroke-width="6"/><rect x="${x - 6}" y="710" width="102" height="12" fill="#d8c6b8"/>${blooms(x + 45, 722, 60, 12, 30, BLOOM, 4, 9, .95)}</g>`).join('')}
      <path d="M620 900 V600 A100 100 0 0 1 820 600 V900Z" fill="#e3d4c8"/>
      <g id="doorL"><path d="M640 900 V600 A80 80 0 0 1 720 520 V900Z" fill="#4f6f6a"/><path d="M660 880 V620 M700 880 V560" stroke="#3f5c58" stroke-width="4"/><circle cx="708" cy="740" r="5" fill="${gold}"/></g>
      <g id="doorR"><path d="M800 900 V600 A80 80 0 0 0 720 520 V900Z" fill="#4f6f6a"/><path d="M780 880 V620 M740 880 V560" stroke="#3f5c58" stroke-width="4"/><circle cx="732" cy="740" r="5" fill="${gold}"/></g>
      ${blooms(720, 500, 260, 60, 220, BOUG, 7, 16, .95)}${blooms(560, 620, 50, 160, 90, BOUG, 6, 14, .9)}${blooms(880, 620, 50, 160, 90, BOUG, 6, 14, .9)}
      ${lamp(590, 900, 300, .4)}${lamp(850, 900, 300, .4)}`;
    const path = `<path d="M560 900 L680 900 L700 880 L740 880 L760 900 L880 900Z" fill="#d8ccc2"/>` + tulips(60, 820, 940, 1.2, 2.2, -40, 420) + tulips(60, 820, 940, 1.2, 2.2, 1020, 1480);
    return `<div class="stage">${svg(sky, 0)}<div class="zoom">${svg(house, 0, 'id="housefront"')}<div class="doorlight"></div></div>${svg(path, .5, 'style="z-index:4"')}
      <p class="scene-note" data-show=".05,.5">Come inside. Every room keeps a project.</p></div>`;
  }

  /* ---------- 4. the rooms ---------- */
  function shell(wall, accent, pattern = 'damask', floor = 'planks', winX = 1120) {
    return `<rect width="1440" height="900" fill="${wall}"/><rect width="1440" height="900" fill="url(#${pattern})"/>
      <rect y="0" width="1440" height="34" fill="#fbf6f1"/><rect y="34" width="1440" height="8" fill="${accent}"/>
      <rect y="560" width="1440" height="200" fill="${accent}" opacity=".55"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${30 + i * 160}" y="590" width="130" height="140" fill="none" stroke="#fbf6f1" stroke-width="3" opacity=".7"/>`).join('')}
      <rect y="552" width="1440" height="10" fill="#fbf6f1"/><rect y="760" width="1440" height="140" fill="url(#${floor})"/><rect y="756" width="1440" height="10" fill="#fbf6f1"/>
      ${winX != null ? `<g transform="translate(${winX} 110)"><path d="M0 420 V90 A110 90 0 0 1 220 90 V420Z" fill="url(#skyG)"/><path d="M0 420 V90 A110 90 0 0 1 220 90 V420Z" fill="none" stroke="#fbf6f1" stroke-width="12"/><path d="M110 0 V420 M0 200 H220" stroke="#fbf6f1" stroke-width="7"/>${leaves(70, 400, 70, 30, 18)}${blooms(150, 400, 70, 26, 26, BLOOM, 5, 10)}
        <path d="M-40 -10 Q110 60 260 -10 L270 470 Q240 380 215 140 Q110 90 5 140 Q-20 380 -50 470Z" fill="${accent}" opacity=".95"/><path d="M-50 -14 H270" stroke="${gold}" stroke-width="8"/></g>` : ''}`;
  }
  const frame = (x, y, w, h, inner) => `<g transform="translate(${x} ${y})"><ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2}" ry="${h / 2}" fill="${gold}"/><ellipse cx="${w / 2}" cy="${h / 2}" rx="${w / 2 - 9}" ry="${h / 2 - 9}" fill="#f3ead8"/>${inner || ''}</g>`;
  const wallLamp = (x, y) => `<g transform="translate(${x} ${y})"><circle r="90" fill="url(#warm)"/><path d="M0 0 v30" stroke="${gold}" stroke-width="4"/><path d="M-22 0 h44 l-10 -34 h-24z" fill="#f7d9c4"/><path d="M-22 0 h44" stroke="${gold}" stroke-width="3"/></g>`;
  const glowRing = (cx, cy, r) => `<circle class="halo-obj" cx="${cx}" cy="${cy}" r="${r}" fill="url(#warm)"/>`;
  const obj = (ids, label, inner) => `<g class="obj" data-ids="${ids}" tabindex="0" role="button" aria-label="${label}">${inner}</g>`;

  function foyer() {
    seed = 51;
    const stairs = `<g>${Array.from({ length: 8 }, (_, i) => `<rect x="${1160 + i * 20}" y="${760 - (i + 1) * 46}" width="300" height="46" fill="#e9ddd3" stroke="#cdbdb0"/>`).join('')}<path d="M1150 720 L1330 360" stroke="#7a543c" stroke-width="10"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${1160 + i * 22} ${700 - i * 44} v60" stroke="#7a543c" stroke-width="4"/>`).join('')}</g>`;
    const mirror = `<g transform="translate(560 170)"><path d="M0 300 V110 A150 110 0 0 1 300 110 V300Z" fill="${gold}"/><path d="M14 294 V114 A136 98 0 0 1 286 114 V294Z" fill="#dfe7ea"/><path d="M60 120 L120 280 M140 110 L200 270" stroke="#fff" stroke-width="10" opacity=".5"/></g>`;
    const table = `<rect x="520" y="560" width="380" height="20" fill="#7a543c"/><path d="M540 580 C550 640 540 700 560 760 M880 580 C870 640 880 700 860 760" stroke="#7a543c" stroke-width="12" fill="none"/><path d="M560 600 Q710 640 860 600" stroke="#7a543c" stroke-width="6" fill="none"/>
      <g transform="translate(580 470)"><path d="M0 90 Q-10 40 20 30 Q50 40 40 90Z" fill="#f2e4dc"/>${blooms(20, 10, 46, 34, 40, BLOOM, 5, 11, .95)}</g>`;
    const keys = obj('nektar', 'Nektar Homes: the key bunch', `${glowRing(760, 548, 70)}<g transform="translate(760 540)"><circle r="16" fill="none" stroke="${gold}" stroke-width="5"/>
      <g transform="rotate(25)"><rect x="12" y="-3" width="40" height="7" rx="3" fill="${gold}"/><path d="M44 4 v6 h4 v-6 M36 4 v4" stroke="${gold}" stroke-width="3"/></g><g transform="rotate(140)"><rect x="12" y="-3" width="34" height="7" rx="3" fill="#b88a3e"/><circle cx="12" cy="0" r="8" fill="#b88a3e"/></g>
      <g transform="translate(-6 18)"><ellipse rx="11" ry="9" fill="#ffc93c"/><path d="M-4 -8 v16 M3 -8 v16" stroke="#3b2a1a" stroke-width="3"/><ellipse cx="-6" cy="-10" rx="7" ry="4" fill="#e7f5ff" opacity=".9"/><ellipse cx="6" cy="-10" rx="7" ry="4" fill="#e7f5ff" opacity=".9"/></g></g>`);
    const rug = `<ellipse cx="720" cy="840" rx="380" ry="46" fill="#c76b84" opacity=".85"/><ellipse cx="720" cy="840" rx="340" ry="34" fill="none" stroke="#f3d4dc" stroke-width="4"/>`;
    return shell('#cdd8c3', '#9fb39a', 'stripes', 'tiles', 180) + stairs + mirror + table + keys + rug + wallLamp(470, 300) + wallLamp(970, 300);
  }
  function drawing() {
    seed = 61;
    const fire = `<g transform="translate(140 400)"><rect width="300" height="360" fill="#f3ece6"/><rect x="-20" y="-10" width="340" height="24" fill="#e4d8ce"/><path d="M60 360 V200 A90 80 0 0 1 240 200 V360Z" fill="#3b2d33"/><path d="M110 360 c0 -60 40 -50 40 -100 c20 30 50 40 40 100Z" fill="#ff9f43"/><path d="M130 360 c0 -30 20 -30 20 -60 c10 20 30 30 20 60Z" fill="#ffd166"/></g>
      ${frame(200, 140, 180, 220, `<circle cx="90" cy="90" r="34" fill="#c9a6a0"/><path d="M40 190 Q90 110 140 190Z" fill="#7b8fb0"/>`)}`;
    const sofa = `<g transform="translate(470 520)"><path d="M0 220 V120 Q0 40 80 50 Q140 0 200 50 Q260 0 320 50 Q400 40 400 120 V220Z" fill="#c98aa0"/><rect x="-10" y="150" width="420" height="70" rx="20" fill="#d99db1"/><path d="M40 220 v30 M360 220 v30" stroke="#7a543c" stroke-width="10"/><ellipse cx="90" cy="140" rx="40" ry="28" fill="#f3d9b1"/><ellipse cx="310" cy="140" rx="40" ry="28" fill="#b9cbe0"/></g>`;
    const teapoy = `<ellipse cx="760" cy="740" rx="150" ry="22" fill="#000" opacity=".12"/><ellipse cx="760" cy="650" rx="140" ry="26" fill="#8a5d43"/><rect x="620" y="650" width="280" height="16" fill="#7a543c"/><path d="M660 666 C670 700 650 720 670 744 M860 666 C850 700 870 720 850 744 M760 666 V740" stroke="#7a543c" stroke-width="10" fill="none"/>
      <g transform="translate(860 616)"><path d="M0 0 h34 v10 q-2 14 -17 14 q-15 0 -17 -14z" fill="#fff"/><path d="M34 4 q10 0 8 8 q-2 6 -8 4" stroke="#fff" stroke-width="3" fill="none"/><ellipse cx="17" cy="26" rx="26" ry="5" fill="#fff"/><path d="M6 2 h22" stroke="#e599b0" stroke-width="2"/></g>`;
    const mag = obj('nexa', 'Nexa Avenue: the business magazine', `${glowRing(730, 630, 90)}<g transform="translate(680 600) skewX(-18) rotate(-6)"><rect width="110" height="44" fill="#f8f6ff"/><rect width="110" height="44" fill="none" stroke="#5a37c9" stroke-width="2"/><rect x="6" y="6" width="98" height="10" fill="#5a37c9"/><text x="55" y="14.5" font-size="8.5" text-anchor="middle" fill="#fff" font-family="Inter, sans-serif" font-weight="600" letter-spacing="1.5">BUSINESS</text><rect x="8" y="20" width="44" height="20" fill="#b49bff"/><path d="M58 24 h44 M58 30 h40 M58 36 h30" stroke="#8b80a8" stroke-width="2"/></g>`);
    return shell('#f1d3cf', '#d9a3a6', 'damask', 'planks', 1080) + fire + sofa + teapoy + mag + wallLamp(980, 260);
  }
  function study() {
    seed = 71;
    const shelf = `<g transform="translate(60 120)"><rect width="460" height="640" fill="#7a543c"/><rect x="16" y="16" width="428" height="608" fill="#5c3e2c"/>${[0, 1, 2, 3, 4].map(r => `<rect x="16" y="${140 + r * 120}" width="428" height="12" fill="#7a543c"/>` + (() => { let x = 22, o = ''; while (x < 430) { const w = rnd(14, 26), h = rnd(80, 112); if (!(r === 2 && x > 200 && x < 260)) o += `<rect x="${x.toFixed(0)}" y="${(140 + r * 120 - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${pick(['#9c4f5f', '#5b7a8c', '#c9a050', '#6f8a62', '#b77a8c', '#3e4f6b', '#d8b4a0'])}"/>`; x += w + 2; } return o; })()).join('')}</g>`;
    const journal = obj('kdp', 'KDP: the journal on the shelf', `${glowRing(300, 330, 80)}<g transform="translate(270 270) rotate(-12)"><rect width="40" height="110" rx="3" fill="#e97a9a"/><rect x="5" y="14" width="30" height="5" fill="${gold}"/><rect x="5" y="90" width="30" height="5" fill="${gold}"/><path d="M20 30 c-8 6 -8 16 0 22 c8 -6 8 -16 0 -22" fill="#fff" opacity=".8"/></g>`);
    const cal = obj('credtech', 'Credtech: the wall calendar', `${glowRing(700, 250, 80)}<g transform="translate(640 170)"><path d="M60 0 v12" stroke="#5c3e2c" stroke-width="3"/><rect y="12" width="120" height="150" rx="4" fill="#fffaf2" stroke="#d8c6b8" stroke-width="2"/><rect y="12" width="120" height="34" rx="4" fill="#c2255c"/><text x="60" y="36" text-anchor="middle" font-size="16" fill="#fff" font-family="Cormorant Garamond, serif" font-weight="600" letter-spacing="2">APRIL</text><text x="60" y="110" text-anchor="middle" font-size="58" fill="#3b2a3a" font-family="Cormorant Garamond, serif">4</text><circle cx="60" cy="92" r="36" fill="none" stroke="#e64980" stroke-width="3" stroke-dasharray="190 30"/><text x="60" y="148" text-anchor="middle" font-size="11" fill="#7a6a70" font-family="Inter, sans-serif" letter-spacing="1">PUNE · 2025</text></g>`);
    const desk = `<g transform="translate(760 520)"><rect width="520" height="24" fill="#8a5d43"/><rect x="10" y="24" width="160" height="140" fill="#7a543c"/><rect x="350" y="24" width="160" height="140" fill="#7a543c"/><rect x="26" y="50" width="128" height="40" fill="none" stroke="#5c3e2c" stroke-width="3"/><rect x="366" y="50" width="128" height="40" fill="none" stroke="#5c3e2c" stroke-width="3"/><circle cx="90" cy="70" r="4" fill="${gold}"/><circle cx="430" cy="70" r="4" fill="${gold}"/><path d="M20 164 v76 M500 164 v76" stroke="#7a543c" stroke-width="12"/>
      <g transform="translate(420 -60)"><rect x="0" y="40" width="26" height="20" rx="4" fill="#2c2530"/><path d="M14 40 C30 0 50 -30 70 -40 C56 -10 34 20 18 42" fill="#fff" stroke="#d8c6b8"/></g>${wallLamp(300, -150)}</g>`;
    const invite = obj('aira', 'Aira Wedding Planners: the wax-sealed invitation', `${glowRing(860, 505, 80)}<g transform="translate(800 470) rotate(-5)"><rect width="120" height="80" fill="#fffaf2" stroke="#e8d8cc"/><path d="M0 0 L60 44 L120 0" fill="none" stroke="#e8d8cc" stroke-width="2"/><circle cx="60" cy="44" r="13" fill="#b5476d"/><path d="M54 44 c4 -8 8 -8 12 0 c-4 8 -8 8 -12 0" fill="#e599b0"/></g>`);
    const letters = obj('letters', 'Kind words: the letters', `${glowRing(1010, 505, 80)}<g transform="translate(950 478)">${[0, 1, 2].map(i => `<rect x="${i * 6}" y="${-i * 7}" width="110" height="64" fill="${['#f7efe4', '#fbf4ea', '#fffaf2'][i]}" stroke="#e8d8cc" transform="rotate(${[-6, 3, -2][i]})"/>`).join('')}<path d="M8 20 h90 M8 30 h80 M8 40 h86" stroke="#b7a9b2" stroke-width="2" transform="translate(12 -14)"/><path d="M60 -20 v80" stroke="#e599b0" stroke-width="5"/><path d="M60 22 c-14 -16 -24 -4 -12 4 M60 22 c14 -16 24 -4 12 4" stroke="#e599b0" stroke-width="4" fill="none"/></g>`);
    return shell('#bcd0cc', '#8fadaa', 'stripes', 'planks', null) + shelf + journal + cal + desk + invite + letters + `<rect x="1300" y="140" width="110" height="300" fill="${gold}"/><rect x="1310" y="150" width="90" height="280" fill="#efe3c9"/>` + leaves(1355, 300, 30, 90, 30, ['#9cb07a', '#b6c78f']);
  }
  function dining() {
    seed = 81;
    const chand = `<g transform="translate(720 34)"><path d="M0 0 v120" stroke="${gold}" stroke-width="4"/><path d="M-160 170 Q0 240 160 170" stroke="${gold}" stroke-width="6" fill="none"/><path d="M-100 140 Q0 190 100 140" stroke="${gold}" stroke-width="5" fill="none"/>${[-160, -100, -40, 40, 100, 160].map((x, i) => `<g transform="translate(${x} ${i % 2 ? 150 : 170})"><rect x="-5" y="-30" width="10" height="30" fill="#fffaf2"/><path d="M0 -44 c-6 6 -6 12 0 14 c6 -2 6 -8 0 -14" fill="#ffc94d"/><circle cy="-36" r="34" fill="url(#warm)"/></g>`).join('')}${Array.from({ length: 12 }, (_, i) => `<circle cx="${-150 + i * 27}" cy="${200 + Math.sin(i / 1.8) * 10}" r="4" fill="#fff" opacity=".8"/>`).join('')}</g>`;
    const table = `<g transform="translate(240 560)"><path d="M0 0 H960 L1000 120 H-40Z" fill="#fffaf2"/><path d="M-40 120 H1000" stroke="#e8d8cc" stroke-width="4"/>${Array.from({ length: 16 }, (_, i) => `<path d="M${-40 + i * 65} 120 q32 22 65 0" fill="#fffaf2" stroke="#e8d8cc"/>`).join('')}<path d="M60 140 v60 M900 140 v60" stroke="#7a543c" stroke-width="14"/>
      ${[120, 300, 640, 820].map(x => `<ellipse cx="${x}" cy="40" rx="56" ry="14" fill="#fff" stroke="#e599b0" stroke-width="3"/><ellipse cx="${x}" cy="40" rx="30" ry="7" fill="#f6e8ec"/>`).join('')}
      ${[200, 740].map(x => `<g transform="translate(${x} -80)"><rect x="-4" y="40" width="8" height="70" fill="${gold}"/><rect x="-5" y="-10" width="10" height="50" fill="#fffaf2"/><path d="M0 -24 c-6 6 -6 12 0 14 c6 -2 6 -8 0 -14" fill="#ffc94d"/><circle cy="-16" r="40" fill="url(#warm)"/></g>`).join('')}
      ${blooms(470, 0, 70, 24, 40, BLOOM, 6, 13, .95)}</g>`;
    const chairs = [180, 1220].map(x => `<g transform="translate(${x} 470)"><path d="M0 0 Q40 -40 80 0 V200 H0Z" fill="#d9a3a6"/><path d="M0 0 Q40 -40 80 0 V200 H0Z" fill="none" stroke="#7a543c" stroke-width="8"/><path d="M0 200 v90 M80 200 v90" stroke="#7a543c" stroke-width="10"/></g>`).join('');
    const cake = obj('tasteables', 'Tasteables: the cupcake', `${glowRing(720, 520, 90)}<g transform="translate(720 560)"><ellipse cy="0" rx="80" ry="12" fill="#fffaf2" stroke="#e8d8cc" stroke-width="3"/><path d="M-6 0 v-6 h12 v6" fill="${gold}"/><path d="M0 6 v40 M-30 46 h60" stroke="${gold}" stroke-width="6"/>
      <path d="M-34 -10 L-26 -54 H26 L34 -10Z" fill="#ffc93c"/><path d="M-18 -10 L-14 -54 M0 -10 V-54 M18 -10 L14 -54" stroke="#e0a400" stroke-width="2"/><path d="M-40 -54 C-46 -76 -24 -88 -12 -80 C-10 -100 14 -102 16 -84 C34 -92 48 -72 40 -54Z" fill="#f7b9c6"/><path d="M-26 -66 c10 4 20 4 30 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/><circle cx="2" cy="-98" r="9" fill="#d6336c"/><path d="M2 -106 q4 -10 10 -12" stroke="#5f8a5a" stroke-width="2" fill="none"/>${[[-20, -70, '#74c0fc'], [10, -74, '#ffd43b'], [24, -62, '#63e6be'], [-6, -60, '#ff8787']].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="6" height="2.4" rx="1" fill="${c}"/>`).join('')}</g>`);
    return shell('#f2e3c0', '#d9bf8c', 'damask', 'planks', null) + frame(150, 120, 170, 210, `<path d="M30 160 Q85 60 140 160Z" fill="#9fb48f"/><circle cx="110" cy="70" r="16" fill="#ffd166"/>`) + frame(1120, 120, 170, 210, `<ellipse cx="85" cy="120" rx="44" ry="30" fill="#f4a3b8"/>${blooms(85, 110, 46, 34, 20, BLOOM, 5, 10)}`) + chand + chairs + table + cake;
  }
  function kitchen() {
    seed = 91;
    const tiles = `<rect x="0" y="260" width="1440" height="300" fill="#eef5f8"/>${Array.from({ length: 36 }, (_, i) => `<path d="M${i * 40} 260 V560" stroke="#cfe0e8" stroke-width="2"/>`).join('')}${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${260 + i * 40} H1440" stroke="#cfe0e8" stroke-width="2"/>`).join('')}`;
    const shelves = `<g transform="translate(120 160)"><rect width="440" height="12" fill="#8a5d43"/>${[30, 110, 190, 270, 350].map((x, i) => `<g transform="translate(${x} -70)"><rect width="56" height="70" rx="10" fill="#e7f5ff" opacity=".8" stroke="#a5c8d8" stroke-width="2"/><rect x="6" y="${20 + i * 3}" width="44" height="${44 - i * 3}" rx="6" fill="${['#ffd8a8', '#ffc9c9', '#d3f9d8', '#fff3bf', '#e5dbff'][i]}"/><rect x="10" y="-8" width="36" height="10" rx="3" fill="${gold}"/></g>`).join('')}</g>
      <g transform="translate(120 330)"><path d="M0 0 H440" stroke="#8a5d43" stroke-width="10"/>${[60, 180, 300, 400].map((x, i) => `<g transform="translate(${x} 0)"><path d="M0 0 v20" stroke="#5c3e2c" stroke-width="2"/><circle cy="${46 + i * 2}" r="${28 - i * 3}" fill="#c9774a"/><circle cy="${46 + i * 2}" r="${22 - i * 3}" fill="#e09a6a"/></g>`).join('')}</g>`;
    const counter = `<rect x="80" y="560" width="620" height="200" fill="#a8c6d4"/><rect x="70" y="548" width="640" height="18" fill="#efe6dc"/>${[100, 310, 520].map(x => `<rect x="${x}" y="590" width="170" height="150" fill="none" stroke="#86aabb" stroke-width="4"/><circle cx="${x + 85}" cy="610" r="5" fill="${gold}"/>`).join('')}
      <g transform="translate(480 470)"><rect width="110" height="80" rx="10" fill="#fff"/><rect y="40" width="110" height="40" fill="url(#gingham)"/></g>`;
    const curtain = `<g transform="translate(860 120)"><rect width="300" height="300" fill="url(#skyG)"/><rect width="300" height="300" fill="none" stroke="#fbf6f1" stroke-width="12"/><path d="M150 0 V300 M0 150 H300" stroke="#fbf6f1" stroke-width="7"/><path d="M-20 -10 H320 V70 Q260 100 150 60 Q40 100 -20 70Z" fill="url(#gingham)"/></g>`;
    const fridge = `<g transform="translate(1180 300)"><rect width="200" height="460" rx="60" fill="#bfe3d0"/><rect x="0" y="150" width="200" height="6" fill="#a4ccb8"/><rect x="170" y="60" width="10" height="70" rx="5" fill="#e6e6e6"/><rect x="170" y="190" width="10" height="110" rx="5" fill="#e6e6e6"/><circle cx="40" cy="220" r="12" fill="#ffd43b"/><rect x="60" y="300" width="40" height="30" fill="#fff" transform="rotate(-6 80 315)"/><path d="M66 308 h28 M66 316 h22" stroke="#9aa"/><path d="M20 460 v20 M180 460 v20" stroke="#8aa" stroke-width="10"/></g>`;
    const magnet = obj('holidaytribe', 'HolidayTribe: the surfing fridge magnet', `${glowRing(1290, 410, 70)}<g transform="translate(1290 400) rotate(-20)"><path d="M-40 18 q20 -14 40 0 q20 14 40 0 v10 h-80z" fill="#4dabf7"/><ellipse rx="34" ry="8" fill="#ff922b"/><path d="M-30 0 h60" stroke="#fff" stroke-width="2"/><g transform="translate(-2 -10)"><circle cy="-20" r="6" fill="#8d5b3a"/><path d="M0 -14 v14 M0 -8 l-12 -6 M0 -8 l12 4 M0 0 l-8 8 M0 0 l8 8" stroke="#8d5b3a" stroke-width="4" stroke-linecap="round"/></g></g>`);
    return shell('#cfe0e8', '#9fbfcc', 'stripes', 'tiles', null) + tiles + shelves + counter + curtain + fridge + magnet;
  }
  function dressing() {
    seed = 101;
    const wardrobe = obj('whims,cyub', 'WHIMS and C CYUB: the wardrobe', `${glowRing(400, 440, 220)}<g transform="translate(220 140)"><path d="M0 70 Q180 -30 360 70 V620 H0Z" fill="#8a5d43"/><path d="M20 80 Q180 -10 340 80 V600 H20Z" fill="#a77b5a"/>
      <g class="wd-l"><path d="M24 90 H176 V596 H24Z" fill="#b98c68"/><path d="M50 130 H150 V560 H50Z" fill="none" stroke="#8a5d43" stroke-width="5"/><circle cx="160" cy="360" r="7" fill="${gold}"/></g>
      <g transform="translate(184 90)"><rect width="152" height="506" fill="#5c3e2c"/><path d="M0 30 H152" stroke="${gold}" stroke-width="5"/>${[['#f7b9c6', 10], ['#b9cbe0', 46], ['#ffd8a8', 84], ['#d3c4ef', 118]].map(([c, x]) => `<path d="M${x + 14} 30 v12 M${x} 42 h28 l8 160 q-22 12 -44 0z" fill="${c}" stroke="${c}" stroke-width="2"/>`).join('')}</g>
      <path d="M-14 620 H374 v20 H-14Z" fill="#7a543c"/><path d="M150 26 q30 -30 60 0" stroke="${gold}" stroke-width="5" fill="none"/></g>`);
    const table = `<g transform="translate(760 330)"><ellipse cx="200" cy="120" rx="130" ry="150" fill="${gold}"/><ellipse cx="200" cy="120" rx="116" ry="136" fill="#e4ecf0"/><path d="M140 60 L200 200 M190 40 L250 180" stroke="#fff" stroke-width="12" opacity=".5"/>
      <rect x="0" y="240" width="400" height="24" fill="#f3e3e8"/><path d="M0 264 Q200 330 400 264 V420 H0Z" fill="#f7d6df"/><path d="M0 264 Q200 330 400 264" stroke="#fff" stroke-width="4" fill="none"/>${Array.from({ length: 10 }, (_, i) => `<path d="M${i * 40} 420 q20 16 40 0" fill="#f7d6df" stroke="#fff" stroke-width="2"/>`).join('')}
      ${[[40, '#e5dbff'], [80, '#ffd8e2']].map(([x, c]) => `<g transform="translate(${x} 200)"><rect x="-14" y="0" width="28" height="40" rx="8" fill="${c}" stroke="#fff" stroke-width="2"/><rect x="-5" y="-12" width="10" height="12" fill="${gold}"/></g>`).join('')}</g>`;
    const fan = obj('fanzart', 'Fanzart: the lace hand fan', `${glowRing(1020, 555, 80)}<g transform="translate(1020 570)"><path d="M0 0 L-70 -60 A92 92 0 0 1 70 -60Z" fill="#fffaf2" stroke="#e8d8cc" stroke-width="2"/>${Array.from({ length: 9 }, (_, i) => { const a = -140 + i * 12.5; const r = a * Math.PI / 180; return `<path d="M0 0 L${(Math.cos(r) * 92).toFixed(1)} ${(Math.sin(r) * 92).toFixed(1)}" stroke="#e599b0" stroke-width="1.6"/>`; }).join('')}${Array.from({ length: 12 }, (_, i) => { const r = (-140 + i * 9) * Math.PI / 180; return `<circle cx="${(Math.cos(r) * 80).toFixed(1)}" cy="${(Math.sin(r) * 80).toFixed(1)}" r="4" fill="none" stroke="#e599b0" stroke-width="1.4"/>`; }).join('')}<circle r="5" fill="${gold}"/><path d="M0 4 q-6 16 4 26" stroke="#e599b0" stroke-width="2" fill="none"/></g>`);
    const back = `<g transform="translate(1260 560)"><path d="M0 200 V40 A70 70 0 0 1 140 40 V200Z" fill="#fbf6f1"/><path d="M14 200 V44 A56 56 0 0 1 126 44 V200Z" fill="#4f6f6a"/><circle cx="110" cy="130" r="5" fill="${gold}"/></g><p></p>`;
    return shell('#ddd0e6', '#b8a3c8', 'damask', 'planks', null) + frame(560, 170, 140, 180, `<path d="M70 50 c-20 0 -30 20 -20 40 c10 20 40 20 40 0" fill="#f4a3b8"/>`) + wardrobe + table + fan + back + wallLamp(1180, 250);
  }

  /* ---------- 5. dusk: lamps, steps and the arched door ---------- */
  function dusk() {
    seed = 121;
    const sky = `<rect width="1440" height="900" fill="url(#skyG)"/><path d="M1180 120 a26 26 0 1 0 22 40 a20 20 0 1 1 -22 -40z" fill="#fff6dc"/>` + Array.from({ length: 70 }, () => `<circle class="tw" cx="${rnd(0, 1440).toFixed(0)}" cy="${rnd(0, 420).toFixed(0)}" r="${rnd(.8, 2).toFixed(1)}" fill="#fff" opacity="${rnd(.3, .9).toFixed(2)}"/>`).join('');
    const walls = `<path d="M0 900 V380 L360 420 V900Z" fill="#6a5f5a"/><path d="M1440 900 V380 L1080 420 V900Z" fill="#5e5450"/>${leaves(180, 420, 220, 90, 70, ['#4f6b4a', '#5f7b56', '#3f5a3c'])}${leaves(1260, 420, 220, 90, 70, ['#4f6b4a', '#5f7b56', '#3f5a3c'])}${blooms(220, 380, 240, 120, 260, BOUG, 6, 14, .95)}${blooms(1220, 380, 240, 120, 260, BOUG, 6, 14, .95)}`;
    const steps = Array.from({ length: 7 }, (_, i) => { const y = 900 - i * 56, w = 1000 - i * 70; return `<rect x="${720 - w / 2}" y="${y - 56}" width="${w}" height="56" fill="${i % 2 ? '#8d837c' : '#978d86'}"/><path d="M${720 - w / 2} ${y - 56} h${w}" stroke="#b1a69e" stroke-width="3"/>${blooms(720, y - 50, w / 2 - 20, 6, 24, BOUG, 3, 7, .9)}`; }).join('');
    const door = `<g transform="translate(600 300)"><path d="M-40 230 V90 A160 150 0 0 1 280 90 V230Z" fill="#efe3d6"/><path d="M0 230 V100 A120 110 0 0 1 240 100 V230Z" fill="#3f5c58"/><path d="M120 -6 V230" stroke="#2f4744" stroke-width="5"/><circle cx="104" cy="150" r="6" fill="${gold}"/><circle cx="136" cy="150" r="6" fill="${gold}"/>${blooms(120, 0, 220, 70, 200, BOUG, 6, 14, .95)}</g>`;
    const lamps = `<g class="dusk-lamps">${lamp(330, 720, 260, 1, 'l1')}${lamp(1080, 720, 260, 1, 'l2')}${lamp(520, 560, 200, 1, 'l3')}${lamp(900, 560, 200, 1, 'l4')}</g>
      <g transform="translate(330 470)"><g class="sign"><path d="M8 0 h150 l18 18 l-18 18 h-150z" fill="#fbf6f1"/><text x="80" y="24" text-anchor="middle" font-size="17" fill="#3a2440" font-family="Cormorant Garamond, serif" font-style="italic">This way to say hello</text></g></g>`;
    return `<div class="stage">${svg(sky, 0)}${svg(walls, .15)}${svg(door + steps, .25)}${svg(lamps, .35, 'style="z-index:3"')}
      <div class="contact" id="contact" data-show=".25,1.1"><p class="tag">The lamps are on</p><h2>Let's make something <em>lovely</em> together.</h2>
        <p>I'm open to roles and projects in branding, content and growth. Write to me, and I'll reply within a day.</p>
        <div class="cta"><a class="btn" href="mailto:sushma.somashekar082@gmail.com">Email me</a><a class="btn ghost" href="https://www.linkedin.com/in/sushma-somashekar-digital-marketing/" target="_blank" rel="noopener">LinkedIn</a><a class="btn ghost" href="../assets/Sushma-Somashekar-Resume.pdf" download>Résumé ↓</a></div>
        <p class="foot">Made by hand, with a lot of tulips. © 2026 Sushma Somashekar</p></div></div>`;
  }

  const ROOMS = [['Foyer', foyer], ['Drawing room', drawing], ['Study', study], ['Dining room', dining], ['Kitchen', kitchen], ['Dressing room', dressing]];
  return { defs, gate, garden, lake, front, dusk, rooms: () => ROOMS.map(([n, f]) => `<div class="room"><svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">${f()}</svg><span class="room-name">${n}</span></div>`).join('') };
})();
