/* Sushma Somashekar portfolio: midnight sky interactions */
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Starfield canvas ---------- */
  const canvas = document.getElementById('sky');
  const ctx = canvas.getContext('2d');
  let W, H, DPR, stars = [], shooters = [], sparks = [];
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const count = Math.round((W * H) / 3200);
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      depth: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.005,
      tint: Math.random() < 0.12 ? 'warm' : 'silver'
    }));
  }

  function spawnShooter() {
    shooters.push({
      x: Math.random() * W * 0.8 + W * 0.2,
      y: Math.random() * H * 0.4,
      len: Math.random() * 120 + 80,
      v: Math.random() * 6 + 8,
      life: 1
    });
  }

  function burst(x, y) {
    for (let i = 0; i < 18; i++) {
      const a = Math.random() * Math.PI * 2, s = Math.random() * 2.4 + 0.6;
      sparks.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, r: Math.random() * 1.6 + 0.6 });
    }
  }

  let scrollY = 0;
  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    mouse.x += (mouse.tx - mouse.x) * 0.05;
    mouse.y += (mouse.ty - mouse.y) * 0.05;

    for (const s of stars) {
      const tw = reduceMotion ? 0.8 : 0.55 + Math.sin(t * s.speed * 0.1 + s.phase) * 0.45;
      let x = s.x + mouse.x * s.depth * 18;
      let y = (s.y - scrollY * s.depth * 0.15) % H; if (y < 0) y += H;
      y += mouse.y * s.depth * 18;
      ctx.beginPath();
      ctx.arc(x, y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.tint === 'warm' ? `rgba(255,236,214,${tw})` : `rgba(223,229,240,${tw})`;
      ctx.fill();
      if (s.r > 1.15) {
        ctx.fillStyle = `rgba(223,229,240,${tw * 0.12})`;
        ctx.beginPath(); ctx.arc(x, y, s.r * 4, 0, Math.PI * 2); ctx.fill();
      }
    }

    if (!reduceMotion) {
      if (Math.random() < 0.004) spawnShooter();
      shooters = shooters.filter(s => s.life > 0);
      for (const s of shooters) {
        const g = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y - s.len * 0.45);
        g.addColorStop(0, `rgba(255,255,255,${s.life})`);
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len, s.y - s.len * 0.45); ctx.stroke();
        s.x -= s.v; s.y += s.v * 0.45; s.life -= 0.012;
      }
      sparks = sparks.filter(p => p.life > 0);
      for (const p of sparks) {
        ctx.fillStyle = `rgba(235,240,250,${p.life})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2); ctx.fill();
        p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.life -= 0.018;
      }
    }
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
  window.addEventListener('pointermove', e => {
    mouse.tx = (e.clientX / W - 0.5) * 2;
    mouse.ty = (e.clientY / H - 0.5) * 2;
  });
  // A little subtle chaos: click empty sky to scatter silver sparks
  window.addEventListener('click', e => {
    if (reduceMotion) return;
    if (e.target.closest('a, button, dialog, .card, input')) return;
    burst(e.clientX, e.clientY);
  });
  requestAnimationFrame(draw);

  /* ---------- Nav ---------- */
  const nav = document.getElementById('nav');
  const toggle = nav.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('open', !open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }));

  /* ---------- Traits constellation ---------- */
  const traits = [
    { name: 'Always asks why', x: 90, y: 300, text: 'Every brief starts with a question. The answer shapes the idea, the words and the look.' },
    { name: 'Creative', x: 230, y: 170, text: 'Ideas arrive at odd hours, usually with a colour palette attached.' },
    { name: 'Artistic', x: 380, y: 260, text: 'A fashion design background means I see texture, rhythm and balance in every layout.' },
    { name: 'Out of the box', x: 500, y: 110, text: 'If the usual answer is obvious, I go looking for the unusual one.' },
    { name: 'Loves colour', x: 620, y: 270, text: 'Red feels powerful. The moon feels calm. I pick each shade for the feeling it carries.' },
    { name: 'Loves style', x: 760, y: 160, text: 'Style is not decoration. It is how a brand walks into the room.' },
    { name: 'Subtle chaos', x: 860, y: 330, text: 'Calm on the surface, a little wild underneath. The kind of detail that hits your heart.' },
    { name: 'Breaks the glass ceiling', x: 560, y: 430, text: 'From fashion student to brand builder to marketing lead, across four countries. Limits are just a starting line.' }
  ];
  const links = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[4,7],[2,7]];
  const wrap = document.getElementById('constellation');
  const svg = document.getElementById('constellation-lines');
  const card = document.getElementById('trait-card');
  const tTitle = document.getElementById('trait-title');
  const tText = document.getElementById('trait-text');

  svg.innerHTML = links.map(([a, b]) =>
    `<line x1="${traits[a].x}" y1="${traits[a].y}" x2="${traits[b].x}" y2="${traits[b].y}"/>`).join('');

  const btns = traits.map((tr, i) => {
    const b = document.createElement('button');
    b.className = 'star-btn' + (i === 0 ? ' active' : '');
    b.style.left = (tr.x / 10) + '%';
    b.style.top = (tr.y / 5.2) + '%';
    b.innerHTML = `<span class="dot"></span><span>${tr.name}</span>`;
    const show = () => {
      btns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      card.style.opacity = 0;
      setTimeout(() => { tTitle.textContent = tr.name; tText.textContent = tr.text; card.style.opacity = 1; }, 150);
    };
    b.addEventListener('mouseenter', show);
    b.addEventListener('focus', show);
    b.addEventListener('click', show);
    wrap.appendChild(b);
    return b;
  });

  /* ---------- Work ---------- */
  const IMG = 'assets/img/';
  const work = [
    {
      n: '01', name: 'C CYUB Clothing', cats: ['branding', 'social', 'web'], tags: ['Co-Founder', 'Branding', 'eCommerce'],
      thumb: 'cyub-feed.webp', imgs: [['cyub-feed.webp', 'wide']],
      short: 'A sustainable clothing brand built from scratch, from logo to TV screen.',
      about: 'A homegrown sustainable clothing brand based in Bangalore.',
      role: 'Ran the brand as the main person: sourcing, R&D and investment calls. Designed the brand kit, organised photoshoots, ran social media and influencer marketing, and managed the eCommerce website.',
      win: 'Celebrities reached out and featured us. Within 9 months, we secured a sponsorship spot on Bigg Boss Kannada, the biggest reality show in South India.'
    },
    {
      n: '02', name: 'Fanzart', cats: ['social'], tags: ['Luxury', 'Reels', 'Campaigns'], contain: true,
      thumb: 'fanzart-grid.webp', imgs: [['fanzart-grid.webp', '']],
      short: 'A luxury designer fan brand, and a campaign called #SilentPromises.',
      about: 'A luxury designer fan brand with over 130 models and a strong presence across India.',
      role: 'Built the social media calendar and creative campaigns. Created #SilentPromises for Rakshabandhan 2023, plus reels, carousels and grid designs for product launches.',
      win: 'The campaign was well received by the Executive Director. Introduced a monsoon-themed series for dual rotation blade fans.'
    },
    {
      n: '03', name: 'WHIMS', cats: ['social', 'branding'], tags: ['Sustainable fashion', 'Content', 'Launch'],
      thumb: 'whims-3.webp', imgs: [['whims-1.webp', ''], ['whims-2.webp', ''], ['whims-3.webp', '']],
      short: 'A slow fashion label speaking to a young, conscious audience.',
      about: 'A newly launched sustainable clothing brand focused on degrowth, capsule wardrobes and circular systems.',
      role: 'Researched the market, wrote website content and product descriptions, designed stories and reels, and managed the launch roadmap.',
      win: 'Shaped a brand voice that attracts a young audience, and led the Diwali 2023 campaign.'
    },
    {
      n: '04', name: 'Tasteable', cats: ['social'], tags: ['Food app', 'Australia', 'Stories'],
      thumb: 'tasteable-2.webp', imgs: [['tasteable-1.webp', ''], ['tasteable-2.webp', ''], ['tasteable-3.webp', '']],
      short: 'Bright, hungry stories for a gourmet food app in Australia.',
      about: 'An Australian food app focused on delivering gourmet experiences.',
      role: 'Built the launch roadmap, website content, social media calendar and creative concepts, including story designs.',
      win: 'A bold, colourful story system that makes every dish feel like an invitation.'
    },
    {
      n: '05', name: 'Aira Wedding Planners', cats: ['social', 'branding'], tags: ['Luxury weddings', 'Mood boards'],
      thumb: 'aira-theme.webp', imgs: [['aira-theme.webp', 'wide'], ['aira-moodboard.webp', 'wide']],
      short: 'Mood boards and wedding themes, full of colour and calm.',
      about: 'An end-to-end luxury wedding planning company based in Bangalore.',
      role: 'Created theme presentations and mood boards. Managed content across Instagram, Meta, Pinterest and YouTube.',
      win: 'Organic engagement up 6.5%, with 2K+ new organic followers in 3 months.'
    },
    {
      n: '06', name: 'Nexa Avenue', cats: ['branding', 'web', 'social'], tags: ['Brand identity', 'WordPress', 'LinkedIn'],
      thumb: 'nexa-web.webp', imgs: [['nexa-web.webp', 'wide'], ['nexa-posts.webp', '']],
      short: 'A consultancy brand built from scratch, one border at a time.',
      about: 'A business consultancy specialising in change management and intercultural coaching for multinational teams.',
      role: 'As the sole designer and content writer: branding, WordPress web design and copy, social media and company presentations.',
      win: 'LinkedIn reached 21,404 impressions, 990 reactions and a 10.98% engagement rate. Instagram reached 5,600 organic users.',
      link: ['nexaavenue.com', 'https://www.nexaavenue.com/']
    },
    {
      n: '07', name: 'Darena Health', cats: ['web', 'branding'], tags: ['Health tech', 'Squarespace', 'Email'],
      thumb: 'darena-blog.webp', imgs: [['darena-web.webp', 'wide'], ['darena-blog.webp', '']],
      short: 'A full website revamp and newsletters that people actually open.',
      about: 'A health tech company focused on Health IT, MIPS compliance and simpler healthcare operations.',
      role: 'Rebuilt the Squarespace site with shared CSS and custom code, redefined the brand identity, and wrote blogs and newsletters for two audiences.',
      win: 'Homepage speed score went from 59 to 91. Newsletter open rates grew from 22% to 34% in 3 months. 64 inquiries in seven months.'
    }
  ];

  const grid = document.getElementById('work-grid');
  grid.innerHTML = work.map((w, i) => `
    <button class="card reveal" data-i="${i}" data-cats="${w.cats.join(' ')}" aria-label="Open ${w.name} case study">
      <div class="thumb${w.contain ? ' contain' : ''}"><img src="${IMG + w.thumb}" alt="${w.name} work sample" loading="lazy"></div>
      <div class="meta">
        <span class="num">BRAND ${w.n}</span>
        <h3>${w.name}</h3>
        <p>${w.short}</p>
        <div class="tags">${w.tags.map(t => `<span>${t}</span>`).join('')}</div>
      </div>
    </button>`).join('');

  document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const f = chip.dataset.filter;
    grid.querySelectorAll('.card').forEach(c => c.classList.toggle('hide', f !== 'all' && !c.dataset.cats.includes(f)));
  }));

  const modal = document.getElementById('modal');
  grid.addEventListener('click', e => {
    const c = e.target.closest('.card'); if (!c) return;
    const w = work[c.dataset.i];
    document.getElementById('modal-kicker').textContent = 'Brand ' + w.n;
    document.getElementById('modal-title').textContent = w.name;
    document.getElementById('modal-about').textContent = w.about;
    document.getElementById('modal-role').textContent = w.role;
    document.getElementById('modal-win').textContent = w.win;
    document.getElementById('modal-gallery').innerHTML = w.imgs.map(([src, cls]) =>
      `<img src="${IMG + src}" class="${cls}" alt="${w.name} work sample">`).join('');
    document.getElementById('modal-link').innerHTML = w.link
      ? `<a href="${w.link[1]}" target="_blank" rel="noopener">Visit ${w.link[0]} ↗</a>` : '';
    modal.showModal();
  });
  modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

  /* ---------- Count-up stats ---------- */
  const fmt = n => n.toLocaleString('en-US');
  function countUp(el) {
    const to = +el.dataset.to, from = +(el.dataset.from || 0), suf = el.dataset.suffix || '';
    if (reduceMotion) { el.textContent = fmt(to) + suf; return; }
    const dur = 1600, start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(from + (to - from) * e)) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      const num = en.target.querySelector('.num[data-to]');
      if (num) countUp(num);
      io.unobserve(en.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 70 + 'ms';
    io.observe(el);
  });

  /* ---------- Testimonials ---------- */
  const quotes = [...document.querySelectorAll('.quote')];
  const dots = document.querySelector('.quote-dots');
  let qi = 0, qTimer;
  quotes.forEach((q, i) => {
    const d = document.createElement('button');
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', 'Testimonial ' + (i + 1));
    d.setAttribute('aria-selected', i === 0);
    d.addEventListener('click', () => { showQuote(i); restart(); });
    dots.appendChild(d);
  });
  function showQuote(i) {
    qi = i;
    quotes.forEach((q, k) => q.classList.toggle('active', k === i));
    [...dots.children].forEach((d, k) => d.setAttribute('aria-selected', k === i));
  }
  function restart() {
    clearInterval(qTimer);
    if (!reduceMotion) qTimer = setInterval(() => showQuote((qi + 1) % quotes.length), 7000);
  }
  restart();

  document.getElementById('year').textContent = new Date().getFullYear();
})();
