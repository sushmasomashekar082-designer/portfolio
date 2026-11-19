/* Creative Canvas: Sushma Somashekar
   To add a video to a project, add to its media list:
   { type: 'video', src: '../assets/video/your-file.mp4', poster: '../assets/img/your-poster.webp' }
   To use your own music, put an mp3 at assets/audio/track.mp3 and set MUSIC_FILE below. */
const MUSIC_FILE = null; // e.g. '../assets/audio/track.mp3'

(() => {
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isDesk = () => window.innerWidth > 760;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const IMG = '../assets/img/';

  /* ================= DATA ================= */
  const work = [
    { id: 'cyub', name: 'C CYUB', full: 'C CYUB Clothing', em: 'Clothing', lay: 'q', logo: 'cyub', chips: ['Co-Founder', 'Branding', 'eCommerce'],
      line: 'A sustainable clothing brand, built from scratch. Nine months later, it was on national TV.',
      about: 'A homegrown sustainable clothing brand based in Bangalore.',
      role: 'Co-founded and ran the brand: sourcing, R&D, investment calls, brand kit, photoshoots, social media, influencer marketing and the eCommerce website.',
      pts: ['Managed branding initiatives and digital campaigns to boost market reach.', 'Developed effective social media promotions and influencer marketing strategies.', 'Website optimization and product marketing for improved online sales.'],
      win: 'Celebrities reached out and featured us. Within 9 months, our clothing was on Bigg Boss Kannada, South India\'s biggest reality show.',
      reels: [['Instagram profile', 'https://www.instagram.com/c_cyubofficial/']],
      media: [{ src: 'cyub-p15.webp' }, { src: 'cyub-p03.webp' }, { src: 'cyub-p09.webp' }, { src: 'cyub-feed.webp', wide: true }, { src: 'cyub-p17.webp' }, { src: 'cyub-p01.webp' }, { src: 'cyub-p02.webp' }, { src: 'cyub-p04.webp' }, { src: 'cyub-p05.webp' }, { src: 'cyub-p06.webp' }, { src: 'cyub-p07.webp' }, { src: 'cyub-p08.webp' }, { src: 'cyub-p10.webp' }, { src: 'cyub-p11.webp' }, { src: 'cyub-p12.webp' }, { src: 'cyub-p13.webp' }, { src: 'cyub-p14.webp' }, { src: 'cyub-p16.webp' }, { src: 'cyub-p18.webp' }] },
    { id: 'fanzart', name: 'Fanzart', em: 'Luxury fans', lay: 'w', logo: 'fanzart', chips: ['Creating Conversion', 'Reels', 'Campaigns'],
      line: 'Luxury designer fans, a monsoon series and a Rakshabandhan campaign called #SilentPromises.',
      about: 'A luxury designer fan brand with over 130 models and a strong presence across India.',
      role: 'Social media calendar, creative campaigns, reels, carousels and grid designs for product launches and Environment Day.',
      win: '#SilentPromises was well received by the Executive Director. Reels for the brand passed 70K views.',
      pts: ['Created high-performing Reels for an international designer fan brand, achieving 70K+ collective views.', 'Managed and strategized for 6+ eCommerce & luxury brands, developing roadmaps, editorial calendars, and influencer marketing campaigns.', 'Executed creative marketing initiatives, enhancing brand storytelling and audience engagement.'],
      link: ['creatingconversion.com', 'https://creatingconversion.com/'],
      reels: [['#SilentPromises reel 1', 'https://www.instagram.com/reel/Cwjl7lfyVvl/'], ['#SilentPromises reel 2', 'https://www.instagram.com/reel/CwktAaHSXoP/'], ['Environment Day reel', 'https://www.instagram.com/reel/CtHBtwmu0t8/'], ['Product reel', 'https://www.instagram.com/reel/Cwuv8NEyzGo/'], ['Launch reel', 'https://www.instagram.com/reel/Csqx2c2NbVI/'], ['Launch carousel', 'https://www.instagram.com/p/CstbLFfyRf_/']],
      media: [{ src: 'fanzart-feed-2.webp', wide: true }, { src: 'fanzart-feed-1.webp', wide: true }] },
    { id: 'whims', name: 'WHIMS', em: 'Slow fashion', lay: 'b', logo: 'whims', chips: ['Creating Conversion', 'Content', 'Launch'],
      line: 'A slow fashion label talking to a young, conscious audience. Bold reds, quiet confidence.',
      about: 'A newly launched sustainable clothing brand focused on degrowth, capsule wardrobes and circular systems.',
      role: 'Research, website content, product descriptions, stories, reels and the launch roadmap.',
      win: 'A brand voice built for a young audience, and the Diwali 2023 campaign.',
      reels: [['Instagram profile', 'https://www.instagram.com/whims.change/']],
      media: [{ src: 'whims-1.webp' }, { src: 'whims-4.webp' }, { src: 'whims-2.webp' }, { src: 'whims-3.webp' }, { src: 'whims-5.webp' }, { src: 'whims-6.webp' }] },
    { id: 'tasteables', name: 'Tasteables', em: 'Home chefs', lay: 'b', logo: 'tasteable', chips: ['Creating Conversion', 'Australia', 'Stories'],
      line: 'Bright, hungry stories for an Australian home chef app. Every dish feels like an invitation.',
      about: 'An Australian home chef app focused on gourmet, home-cooked experiences.',
      role: 'Launch roadmap, website content, social media calendar, creative concepts and story designs.',
      win: 'A bold, colourful story system in yellow, green and orange that makes people hungry to join.',
      reels: [['Instagram profile', 'https://www.instagram.com/tasteableaus/']],
      media: [{ src: 'tasteables-s1.webp' }, { src: 'tasteables-s2.webp' }, { src: 'tasteables-s3.webp' }, { src: 'tasteables-s4.webp' }, { src: 'tasteables-s5.webp' }, { src: 'tasteables-s6.webp' }, { src: 'tasteable-1.webp' }, { src: 'tasteable-2.webp' }, { src: 'tasteable-3.webp' }] },
    { id: 'holidaytribe', name: 'Holiday', em: 'Tribe', lay: 'd', logo: 'holidaytribe', chips: ['Creating Conversion', 'Travel', 'Reels'],
      line: 'Bali, in 24 seconds. Travel reels that make you want to pack tonight.',
      about: 'A holiday company curating travel experiences.',
      role: 'Reel creation, social media creatives and campaigns.',
      win: 'Short, cinematic reels that sell the feeling of a place, not just the itinerary.',
      media: [{ type: 'video', src: '../assets/video/holidaytribe-1.mp4', poster: '../assets/img/holidaytribe-1-poster.webp' }, { type: 'video', src: '../assets/video/holidaytribe-2.mp4', poster: '../assets/img/holidaytribe-2-poster.webp' }] },
    { id: 'ckc', name: 'crash.club', em: 'by CKC', lay: 't', chips: ['Creating Conversion', 'Launch roadmap'],
      line: 'A launch roadmap for a new brand: the plan before the noise.',
      about: 'crash.club by CKC, a brand preparing for launch.',
      role: 'Launch roadmap and strategy deck (slides 2, 6 and 21 to 29).',
      win: 'A clear, step-by-step plan to take the brand from idea to launch.',
      reels: [['View the roadmap', 'https://docs.google.com/presentation/d/1FTEAFbQQ5ajgmG0ceJWyemZPJykkEQjLHPCrRelODHk/edit?usp=drive_link']],
      media: [] },
    { id: 'aira', name: 'Aira', em: 'Weddings', lay: 'a', logo: 'aira', chips: ['Luxury weddings', 'Mood boards', 'Reels'],
      line: 'Wedding themes and mood boards, full of colour and calm.',
      about: 'An end-to-end luxury wedding planning company based in Bangalore.',
      role: 'Theme presentations and mood boards. Content across Instagram, Meta, Pinterest and YouTube.',
      win: 'Organic engagement up 6.5%, with 2K+ new organic followers in 3 months.',
      pts: ['Increased organic engagement by 6.5%, driving community growth of 2K+ organic followers in 3 months.', 'Developed digital storytelling strategies, enhancing brand perception and audience retention.', 'Created mood boards and visual themes for weddings, ensuring cohesive and aesthetic event branding.'],
      link: ['airaweddingplanners.com', 'https://airaweddingplanners.com/'],
      reels: [['Reel 1', 'https://www.instagram.com/reel/CsEBOOvrtI6/'], ['Reel 2', 'https://www.instagram.com/reel/CsLxXHwMj_R/'], ['Reel 3', 'https://www.instagram.com/reel/Cp7j9p7D_dx/'], ['Stories set 1', 'https://www.instagram.com/stories/highlights/17986096486862581/'], ['Stories set 2', 'https://www.instagram.com/stories/highlights/17918990339610700/']],
      media: [{ src: 'aira-mood-2.webp', wide: true }, { src: 'aira-mood-1.webp' }, { src: 'aira-feed.webp', wide: true }, { src: 'aira-posts.webp' }] },
    { id: 'nexa', name: 'Nexa', em: 'Avenue', lay: 'a', logo: 'nexa', chips: ['Canada', 'Brand identity', 'WordPress'],
      line: 'A Canadian consultancy brand built from the ground up, for teams that work across borders.',
      about: 'A Toronto business consultancy specialising in change management and intercultural coaching for multinational teams.',
      role: 'As the sole designer and content writer: branding, WordPress web design and copy, social media and company presentations.',
      win: 'LinkedIn reached 21,404 impressions, 990 reactions and a 10.98% engagement rate. Instagram reached 5,600 organic users.',
      pts: ['Increased Instagram engagement, reaching 5,600 organic users with content such as 184 Reels and 92 posts.', 'Boosted LinkedIn reach, achieving 21,404 impressions, 990 reactions, and a 10.98% engagement rate.', 'Executed high-impact content strategies, driving leadership recognition, optimized digital presence using analytics-driven insights.'],
      link: ['nexaavenue.com', 'https://www.nexaavenue.com/'],
      reels: [['Reel 2', 'https://www.instagram.com/reel/DEKw8RTRYl7/'], ['Reel 3', 'https://www.instagram.com/reel/C5ZzZD7Pror/']],
      media: [{ src: 'nexa-web.webp', wide: true }, { src: 'nexa-feed.webp', wide: true }, { src: 'nexa-may.webp' }] },
    { id: 'soundofc', name: 'Sound of C', em: 'Toronto', lay: 'w', logo: 'soundofc', chips: ['Canada', 'Print', 'Presentations'],
      line: 'A Canadian brand, in warm caramel and calm white. Social creatives, presentations and journals.',
      about: 'The Sound of C, a Canadian brand.',
      role: 'Social media creatives, presentations and journals. The tri-fold brochure is shown here; the rest is private.',
      win: '"I would definitely recommend Sushma for any visual or branding." Meryl Schroyen, Entrepreneur',
      media: [{ src: 'soundofc-1.webp', wide: true }, { src: 'soundofc-2.webp', wide: true }] },
    { id: 'kdp', name: 'KDP', em: 'Books & journals', lay: 'a', chips: ['Self-published', 'Covers', 'Illustration'],
      line: 'A blank page, turned into books. Journals, colouring books and covers, published on Amazon.',
      about: 'My own studio of books, journals and colouring books on Amazon KDP.',
      role: 'Concept, covers, interiors, illustration and mockups.',
      win: 'A shelf of my own: adventure journals, mindset journals and colouring books for kids.',
      media: [{ src: 'kdp-5.webp', wide: true }, { src: 'kdp-1a.webp' }, { src: 'kdp-3a.webp' }, { src: 'kdp-2a.webp' }, { src: 'kdp-7.webp' }, { src: 'kdp-4.webp' }, { src: 'kdp-1b.webp', wide: true }, { src: 'kdp-2b.webp' }, { src: 'kdp-3.webp' }, { src: 'kdp-8.webp' }] },
    { id: 'credtech', name: 'Credtech', em: 'Pune Chapter', lay: 'a', chips: ['Events', 'Print', 'Big screen'],
      line: 'One event, every touchpoint. From invites to the big screen, all in two months.',
      about: 'An edtech company in Bangalore. Pune Chapter 2025, on April 4, was one of its flagship events.',
      role: 'Big-screen editorials, speaker cards, invites, certificates, cue cards, wrappers, the floor plan and decor mood boards.',
      win: 'A complete event identity, designed and delivered in two months.',
      media: [{ src: 'credtech-screen.webp', wide: true }, { src: 'credtech-2.webp' }, { src: 'credtech-1b.webp', wide: true }, { src: 'credtech-speaker.webp' }, { src: 'credtech-3.webp' }, { src: 'credtech-4.webp' }, { src: 'credtech-1.webp' }, { src: 'credtech-cue.webp' }, { src: 'credtech-wrapper.webp' }, { src: 'credtech-floor.webp', wide: true }] },
    { id: 'nektar', name: 'Nektar', em: 'Homes', lay: 'a', chips: ['Brand identity', 'Logo', 'Reels', 'Print'],
      line: 'Curated stays in the heart of Bangalore. A honey-gold identity, a bee and a home that hums.',
      about: 'Nektar Homes offers curated stay experiences in the heart of Bangalore.',
      role: 'Brand kit (logo, colours and fonts), a one-page flyer and reels.',
      win: 'A warm, memorable identity built around a playful bee and a gold-and-earth palette.',
      media: [{ src: 'nektar-kit-3.webp', wide: true }, { type: 'video', src: '../assets/video/nektar-reel.mp4', poster: '../assets/img/nektar-reel-poster.webp' }, { src: 'nektar-logo-3.webp' }, { src: 'nektar-kit-2.webp' }, { src: 'nektar-kit-4.webp', wide: true }, { src: 'nektar-kit-5.webp' }, { src: 'nektar-kit-6.webp' }, { src: 'nektar-flyer.webp' }, { type: 'video', src: '../assets/video/nektar-clip.mp4', poster: '../assets/img/nektar-clip-poster.webp' }, { src: 'nektar-kit-7.webp' }] },
    { id: 'darena', name: 'Darena', em: 'Health', lay: 'a', chips: ['USA', 'Website revamp', 'Email'],
      line: 'A full website revamp and newsletters people actually open. Health IT, made human.',
      about: 'A US health tech company focused on Health IT, MIPS compliance and simpler healthcare operations.',
      role: 'As Branding & Marketing Associate: redesigned and hand-coded the homepage and product pages, rebuilt the site on shared CSS and reusable HTML, refreshed the brand, and wrote blogs and newsletters for two audiences.',
      win: 'Homepage speed 59 → 91. 16K visitors, 46,083 emails and 64 inquiries in seven months. Full story in the Featured section.',
      link: ['darena.health', 'https://darena.health'],
      media: [{ type: 'video', src: '../assets/video/darena-pages.mp4', poster: '../assets/img/darena-pages-poster.webp', wide: true }, { type: 'video', src: '../assets/video/darena-mips10.mp4', poster: '../assets/img/darena-mips10-poster.webp', wide: true }, { src: 'darena-web.webp', wide: true }, { src: 'darena-blog.webp' }, { src: 'darena-blog-2.webp' }, { src: 'darena-blog-3.webp' }] }
  ];
  const byId = Object.fromEntries(work.map((w, i) => [w.id, i]));
  const GROWTH = ['darena', 'nexa'];
  const OBJ = { darena: ['butterfly', '#ff8a5b', '#ffd36e'], nexa: ['globe', '#b49bff', '#5a37c9'], cyub: ['button', '#ff7a7a', '#b8324a'], fanzart: ['fan', '#ffb547', '#c4581f'], whims: ['hanger', '#ff6b6b', '#e4e9f3'], tasteables: ['cupcake', '#ff9ad5', '#ffd9a0'], holidaytribe: ['suitcase', '#4fd1c5', '#1f7a8c'], ckc: ['plane', '#e4e9f3', '#8fa3d9'], aira: ['flower', '#ff9ad5', '#ffe27a'], soundofc: ['note', '#e3b78a', '#8a5a3b'], kdp: ['book', '#7ec8ff', '#2c5fa8'], credtech: ['mic', '#c3cde6', '#56607a'], nektar: ['bee', '#ffcf4a', '#3a2a10'] };
  function icon(t, a, b) {
    const s = {
      butterfly: `<ellipse cx="15" cy="17" rx="11" ry="12" fill="${a}"/><ellipse cx="33" cy="17" rx="11" ry="12" fill="${a}"/><ellipse cx="16" cy="33" rx="9" ry="9" fill="${b}"/><ellipse cx="32" cy="33" rx="9" ry="9" fill="${b}"/><rect x="22.5" y="10" width="3" height="30" rx="1.5" fill="#2a2440"/>`,
      globe: `<circle cx="24" cy="24" r="19" fill="${b}"/><circle cx="24" cy="24" r="19" fill="none" stroke="${a}" stroke-width="2"/><ellipse cx="24" cy="24" rx="8" ry="19" fill="none" stroke="${a}" stroke-width="1.6"/><path d="M5 24h38M8 14h32M8 34h32" stroke="${a}" stroke-width="1.4"/>`,
      button: `<circle cx="24" cy="24" r="19" fill="${a}"/><circle cx="24" cy="24" r="14" fill="none" stroke="${b}" stroke-width="2"/><circle cx="19" cy="19" r="2.6" fill="${b}"/><circle cx="29" cy="19" r="2.6" fill="${b}"/><circle cx="19" cy="29" r="2.6" fill="${b}"/><circle cx="29" cy="29" r="2.6" fill="${b}"/>`,
      fan: `<g class="spin"><path d="M24 24 C20 12 26 3 32 6 C36 9 32 18 24 24Z" fill="${a}"/><path d="M24 24 C36 24 42 32 37 37 C33 40 26 34 24 24Z" fill="${a}"/><path d="M24 24 C17 34 7 34 7 28 C8 23 17 22 24 24Z" fill="${a}"/></g><circle cx="24" cy="24" r="4.5" fill="${b}"/>`,
      hanger: `<path d="M24 8 a4 4 0 1 1 4 4 c-2 0-4 1-4 4 v2" fill="none" stroke="${b}" stroke-width="2.4" stroke-linecap="round"/><path d="M24 18 L5 34 h38 Z" fill="none" stroke="${a}" stroke-width="3" stroke-linejoin="round"/>`,
      cupcake: `<path d="M12 26 h24 l-4 16 h-16 Z" fill="${b}"/><path d="M15 28v12M21 28v13M27 28v13M33 28v12" stroke="#00000022" stroke-width="1.4"/><path d="M10 27 C8 18 16 12 24 12 C32 12 40 18 38 27 Z" fill="${a}"/><circle cx="24" cy="10" r="4" fill="#ff4d6d"/>`,
      suitcase: `<rect x="16" y="9" width="16" height="8" rx="3" fill="none" stroke="${b}" stroke-width="2.6"/><rect x="7" y="15" width="34" height="25" rx="5" fill="${a}"/><path d="M17 15v25M31 15v25" stroke="${b}" stroke-width="2"/><circle cx="35" cy="22" r="3" fill="#ffd36e"/>`,
      plane: `<path d="M5 25 L43 8 L33 41 L24 30 Z" fill="${a}"/><path d="M24 30 L43 8 L20 27 Z" fill="${b}"/><path d="M20 27 L22 38 L24 30 Z" fill="${b}"/>`,
      flower: `<g fill="${a}"><ellipse cx="24" cy="12" rx="7" ry="10"/><ellipse cx="24" cy="36" rx="7" ry="10"/><ellipse cx="12" cy="24" rx="10" ry="7"/><ellipse cx="36" cy="24" rx="10" ry="7"/></g><g fill="${a}" opacity=".7" transform="rotate(45 24 24)"><ellipse cx="24" cy="12" rx="6" ry="9"/><ellipse cx="24" cy="36" rx="6" ry="9"/><ellipse cx="12" cy="24" rx="9" ry="6"/><ellipse cx="36" cy="24" rx="9" ry="6"/></g><circle cx="24" cy="24" r="6" fill="${b}"/>`,
      note: `<path d="M19 34 V10 l18 -4 v24" fill="none" stroke="${a}" stroke-width="3.2" stroke-linejoin="round"/><ellipse cx="14" cy="35" rx="6.5" ry="5" fill="${a}"/><ellipse cx="32" cy="31" rx="6.5" ry="5" fill="${a}"/><path d="M19 15 l18 -4" stroke="${b}" stroke-width="3"/>`,
      book: `<path d="M24 12 C18 8 10 8 5 10 V38 C10 36 18 36 24 40 Z" fill="${a}"/><path d="M24 12 C30 8 38 8 43 10 V38 C38 36 30 36 24 40 Z" fill="${b}"/><path d="M9 16c4-1 8-1 11 1M9 21c4-1 8-1 11 1M28 17c3-2 7-2 11-1" stroke="#ffffff66" stroke-width="1.4" fill="none"/>`,
      mic: `<rect x="17" y="5" width="14" height="24" rx="7" fill="${a}"/><path d="M12 22 a12 12 0 0 0 24 0" fill="none" stroke="${b}" stroke-width="2.6"/><path d="M24 34v7M17 42h14" stroke="${b}" stroke-width="2.6" stroke-linecap="round"/><path d="M19 12h10M19 17h10" stroke="${b}" stroke-width="1.4"/>`,
      bee: `<ellipse cx="17" cy="15" rx="8" ry="6" fill="#ffffffcc" transform="rotate(-25 17 15)"/><ellipse cx="29" cy="14" rx="8" ry="6" fill="#ffffffaa" transform="rotate(25 29 14)"/><ellipse cx="24" cy="28" rx="15" ry="11" fill="${a}"/><path d="M18 18v20M26 17v22" stroke="${b}" stroke-width="3.4"/><circle cx="36" cy="26" r="1.8" fill="${b}"/>`
    };
    return `<svg viewBox="0 0 48 48" aria-hidden="true">${s[t]}</svg>`;
  }
  // Bonus coin notes. DRAFTS for Sushma to edit: why I chose it, what I learnt, a fun fact.
  const notes = {
    darena: ['Health IT is complex. I wanted to make it feel human.', 'When the website is slow, learn to fix it yourself. So I hand-coded the new pages.', 'MyMipsScore went from 57 to 94 on PageSpeed. My proudest number.'],
    nexa: ['My first brand across an ocean, for a consultancy in Toronto.', 'Time zones are a design problem too. Analytics told me what to post next.', '184 reels and 92 posts. My camera roll has not recovered.'],
    cyub: ['A friend and I wanted clothes that felt good and did good. So we started our own label.', 'Founding teaches you everything at once: sourcing, R&D, investor calls, photoshoots and the website.', 'Nine months in, our clothes were on Bigg Boss Kannada.'],
    fanzart: ['Making a luxury fan feel emotional is a fun challenge.', 'A festival story can sell a ceiling fan. #SilentPromises proved it.', 'Reels for a fan brand passed 70K views. The fans really did blow up.'],
    whims: ['Slow fashion and capsule wardrobes. A cause I already believed in.', 'For a young, conscious audience, say less and mean more.', 'I wrote the launch roadmap before the brand had even launched.'],
    tasteables: ['An Australian home chef app. Food, stories and a new market.', 'Every dish should feel like an invitation, not a menu.', 'Writing about food on an empty stomach is a real job hazard.'],
    holidaytribe: ['Travel content is pure feeling. I wanted to capture that.', 'Show the moment, not the itinerary.', 'Bali, in 24 seconds. Proof you can travel through an editing timeline.'],
    ckc: ['A brand before launch is a blank canvas. My favourite kind.', 'A good roadmap is a story with dates.', 'The plan came before the noise.'],
    aira: ['Weddings are colour, style and emotion in one day. I did this on weekends, for joy.', 'A mood board is a promise of how a day will feel.', '2K+ new organic followers in 3 months.'],
    soundofc: ['A Canadian brand that trusted me with creatives, decks and journals.', 'Not every good piece of work needs an audience.', 'The brochure is the only piece I can show you. The rest is a secret.'],
    kdp: ['After a layoff, I wanted to make something fully mine.', 'When one door closes, design a new cover.', 'I am a published author of journals and colouring books.'],
    credtech: ['One big event, every touchpoint, two months.', 'Print has no undo button. Check the file five times.', 'Pune Chapter 2025 ran on my designs, from invites to the big screen.'],
    nektar: ['A home stay brand that needed a face from scratch.', 'A brand kit is a promise of consistency.', 'Logo, flyer and reels: a whole brand that hums like a bee.']
  };


  const chapters = [
    { title: 'C CYUB', years: '2022', line: 'Co-founding a sustainable clothing brand, all the way to national TV.', ids: ['cyub'], c1: '#ff7a7a', c2: '#b8324a', size: 30 },
    { title: 'Creating Conversion', years: '2023', line: 'Agency life: five brands, one curious designer.', ids: ['fanzart', 'whims', 'tasteables', 'holidaytribe', 'ckc'], c1: '#ffb547', c2: '#c4581f', size: 46, ring: true },
    { title: 'Aira Weddings', years: '2022 to 2023', line: 'Mood boards and wedding themes, on weekends.', ids: ['aira'], c1: '#ff9ad5', c2: '#a8327a', size: 26 },
    { title: 'Nexa Avenue & Sound of C', years: '2023 to 2025 · Canada', line: 'Across the ocean, building brands for Canadian founders.', ids: ['nexa', 'soundofc'], c1: '#b49bff', c2: '#5a37c9', size: 40 },
    { title: 'Amazon KDP', years: '2025', line: 'A blank page, turned into books and journals.', ids: ['kdp'], c1: '#5fe0c9', c2: '#127a72', size: 24 },
    { title: 'Credtech & Nektar Homes', years: '2025', line: 'Events and identities: every touchpoint, end to end.', ids: ['credtech', 'nektar'], c1: '#ffe066', c2: '#b88a00', size: 36 },
    { title: 'Darena Health', years: '2025 to now · USA', line: 'Health IT, made human. A website revamp and the numbers to prove it.', ids: ['darena'], c1: '#7cc8ff', c2: '#2457b8', size: 42, ring: true }
  ];

  const quotes = [
    ['Sushma played a key role in building our brand Nexa Avenue from the ground up. She created a strong brand identity, helping us establish a solid online presence.', 'Sabine MacDonald', 'CEO & Founder, Nexa Avenue · Toronto'],
    ['The logo she created truly feels like me in every sense of the word. Sushma knows her clients and customizes her work based on their need.', 'Gayle Charach', 'Life Coach · Winnipeg'],
    ['She has an incredible ability to sense the essence of the music and translate it into compelling visuals that truly enhance the experience.', 'Peter MacDonald', 'Music Producer · Toronto'],
    ['Sushma is an absolute expert when it comes to branding and design! She has the ability to translate abstract ideas into visually compelling designs.', 'Hadi Diallo', 'Business Coach · Toronto']
  ];

  const mediaEl = (m, alt, extra = '', controls = false) => m.type === 'video'
    ? `<video src="${m.src}" ${m.poster ? `poster="${m.poster}"` : ''} muted loop playsinline preload="none" ${controls ? 'controls autoplay' : 'data-auto'} ${extra}></video>`
    : `<img src="${IMG + m.src}" alt="${alt}" loading="lazy" ${extra}>`;

  /* ================= LOADER ================= */
  const finishLoad = () => {
    $('.loader').classList.add('done');
    document.body.classList.remove('is-loading');
    document.body.classList.add('ready');
  };
  const startLoad = () => setTimeout(finishLoad, RM ? 0 : 1100);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startLoad); else startLoad();

  /* ================= STARFIELD ================= */
  const cv = $('#sky'), ctx = cv.getContext('2d');
  let W, H, stars = [], shooters = [], sparks = [];
  const m = { x: 0, y: 0, tx: 0, ty: 0 };
  function size() {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    stars = Array.from({ length: Math.round(W * H / 2600) }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + .2,
      z: Math.random() * .8 + .2, p: Math.random() * 6.3, s: Math.random() * .02 + .004
    }));
  }
  size(); addEventListener('resize', size);
  addEventListener('pointermove', e => { m.tx = e.clientX / W - .5; m.ty = e.clientY / H - .5; });
  addEventListener('click', e => {
    if (RM || e.target.closest('a,button,.panel-media,.tile,.case,.journey,.b')) return;
    for (let i = 0; i < 22; i++) { const a = Math.random() * 6.3, v = Math.random() * 2.6 + .6; sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v, l: 1, r: Math.random() * 1.6 + .6 }); }
  });

  /* ================= SCROLL STATE ================= */
  let sy = scrollY, lastSy = sy, vel = 0, dir = 1;
  addEventListener('scroll', () => { sy = scrollY; }, { passive: true });

  /* ================= CURSOR ================= */
  const cur = $('.cursor'); const cp = { x: -100, y: -100, tx: -100, ty: -100 };
  if (FINE) {
    addEventListener('pointermove', e => { cp.tx = e.clientX; cp.ty = e.clientY; });
    document.addEventListener('pointerover', e => {
      const t = e.target.closest('.panel-media,.tile');
      cur.classList.toggle('big', !!t);
    });
  }

  /* ================= HERO ================= */
  const floats = $$('.hero-float .f');

  /* ================= MARQUEES ================= */
  let marquees = [];
  const initMarquees = () => marquees = $$('[data-marquee]').map(el => ({ el, x: 0, base: el.dataset.marquee === 'slow' ? .35 : .7 }));

  /* ================= WORK ================= */
  const track = $('#work-track'), workSec = $('#work');
  track.innerHTML = work.map((w, i) => [w, i]).filter(([w]) => !GROWTH.includes(w.id)).map(([w, i], n) => {
    const media = w.media.slice(0, { a: 2, b: 3, c: 1, d: 2, w: 1, t: 0, q: 3 }[w.lay]);
    return `<article class="panel">
      <div class="panel-text">
        <span class="panel-num">${String(n + 1).padStart(2, '0')}</span>
        <h3>${w.name}<br><em>${w.em}</em></h3>
        <p>${w.line}</p>
        <div class="chips">${w.chips.map(c => `<span>${c}</span>`).join('')}</div>
        <div class="panel-act"><button class="open-btn" data-i="${i}">View project <span>→</span></button><button class="coin-btn" data-coin="${w.id}" aria-label="Bonus coin: ${w.name}"><span class="c-ico"></span></button></div>
      </div>
      <div class="panel-media lay-${w.lay}" data-i="${i}" role="button" tabindex="0" aria-label="Open ${w.full || w.name + ' ' + w.em}">
        ${w.lay === 't' ? `<div class="type-art">${w.name}<em>${w.em}</em></div>` : ''}${media.map((mm, k) => `<div class="pm${mm.contain ? ' pm-c' : ''}" data-par="${(k % 2 ? -1 : 1) * (0.05 + k * 0.03)}">${mediaEl(mm, (w.full || w.name) + ' work')}</div>`).join('')}
      </div>
    </article>`;
  }).join('');
  $('#work-total').textContent = String(work.length - GROWTH.length).padStart(2, '0');
  $$('[data-i="NEXA_I"]').forEach(b => b.dataset.i = byId.nexa);
  const panels = $$('.panel', track), pms = $$('.pm', track), countEl = $('#work-count');
  function sizeWork() {
    if (isDesk()) workSec.style.height = (track.scrollWidth - innerWidth + innerHeight) + 'px';
    else workSec.style.height = '';
  }
  addEventListener('resize', sizeWork); addEventListener('load', sizeWork); sizeWork();

  /* ================= WALL ================= */
  const all = [];
  const skipWall = ['credtech-floor.webp', 'credtech-wrapper.webp', 'kdp-mock-1.webp', 'nektar-kit-2.webp'];
  const pools = work.map((w, wi) => w.media.filter(mm => !skipWall.includes(mm.src)).map(mm => ({ ...mm, brand: w.full || (w.name + ' ' + w.em), i: wi })));
  for (let r = 0; pools.some(p => p.length); r++) pools.forEach(p => { if (p.length) all.push(p.shift()); });
  const wallCols = $('#wall-cols');
  const colN = 4, cols = Array.from({ length: colN }, () => []);
  all.forEach((t, k) => cols[k % colN].push(t));
  wallCols.innerHTML = cols.map((c, ci) => `<div class="wall-col" data-speed="${[.08, -.06, .12, -.04][ci]}">${c.map(t =>
    `<div class="tile" data-i="${t.i}">${mediaEl(t, t.brand + ' work')}${t.type === 'video' ? '<span class="play">▶</span>' : ''}<span class="cap">${t.brand}</span></div>`).join('')}</div>`).join('');
  const wallColEls = $$('.wall-col'), wallSec = $('#wall');

  /* ================= DARENA FILMS =================
     Add a screen recording: put the MP4 in assets/video/ and add a line below.
     slot 'top' shows it at the start of the Darena section; 'mips10-before' and 'mips10' sit side by side in the MIPS Guide comparison. */
  const darenaFilms = [
    { slot: 'top', src: '../assets/video/darena-pages.mp4', poster: '../assets/img/darena-pages-poster.webp', url: 'darena.health', title: 'Homepage and MyMipsScore page', note: 'Designed and hand-coded by me. Live since August 31.' },
    { slot: 'mips10-before', badge: 'Before', src: '../assets/video/darena-mips10-before.mp4', poster: '../assets/img/darena-mips10-before-poster.webp', url: 'darena.health', title: 'The old guide', note: 'Text-heavy, no hierarchy, no visual interest.' },
    { slot: 'mips10', badge: 'After', src: '../assets/video/darena-mips10.mp4', poster: '../assets/img/darena-mips10-poster.webp', url: 'darena.health', title: 'My redesign', note: 'Clear steps, visual structure and a faster page.' }
  ];
  darenaFilms.forEach(f => {
    const host = f.slot === 'top' ? $('#d-films') : $(`[data-slot="${f.slot}"]`); if (!host) return;
    host.insertAdjacentHTML('beforeend', `<figure class="d-film${f.badge ? ' has-badge ' + f.badge.toLowerCase() : ''}">${f.badge ? `<span class="d-badge">${f.badge}</span>` : ''}<div class="d-browser"><span class="dots"><i></i><i></i><i></i></span><span class="url">${f.url}</span></div><video src="${f.src}" poster="${f.poster}" muted loop playsinline preload="none" data-auto aria-label="${f.title} screen recording"></video><figcaption><b>${f.title}</b> ${f.note}</figcaption></figure>`);
  });
  $$('.cmp input').forEach(r => r.addEventListener('input', () => r.parentNode.style.setProperty('--p', r.value + '%')));

  const vio = new IntersectionObserver(es => es.forEach(en => {
    const v = en.target; if (en.isIntersecting) { if (v.preload === 'none') v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
  }), { threshold: .2 });
  $$('video[data-auto]').forEach(v => vio.observe(v));

  /* ================= QUOTES ================= */
  const qHTML = quotes.map(q => `<figure class="quote"><p>“${q[0]}”</p><b>${q[1]}</b><small>${q[2]}</small></figure>`).join('');
  $('.words-track').innerHTML = qHTML + qHTML;

  /* ================= MAIN LOOP ================= */
  function frame(t) {
    // velocity
    vel += ((sy - lastSy) - vel) * .1; if (sy !== lastSy) dir = sy > lastSy ? 1 : -1; lastSy = sy;
    m.x += (m.tx - m.x) * .06; m.y += (m.ty - m.y) * .06;

    // stars
    ctx.clearRect(0, 0, W, H);
    for (const s of stars) {
      const a = RM ? .8 : .55 + Math.sin(t * s.s * .1 + s.p) * .45;
      let y = (s.y - sy * s.z * .2) % H; if (y < 0) y += H;
      const x = s.x + m.x * s.z * 30;
      ctx.fillStyle = `rgba(228,233,243,${a})`;
      ctx.beginPath(); ctx.arc(x, y + m.y * s.z * 30, s.r, 0, 6.3); ctx.fill();
    }
    if (!RM) {
      if (Math.random() < .005) shooters.push({ x: Math.random() * W * .8 + W * .2, y: Math.random() * H * .4, len: Math.random() * 120 + 80, v: Math.random() * 6 + 8, l: 1 });
      shooters = shooters.filter(s => s.l > 0);
      for (const s of shooters) {
        const g = ctx.createLinearGradient(s.x, s.y, s.x + s.len, s.y - s.len * .45);
        g.addColorStop(0, `rgba(255,255,255,${s.l})`); g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = g; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.len, s.y - s.len * .45); ctx.stroke();
        s.x -= s.v; s.y += s.v * .45; s.l -= .012;
      }
      sparks = sparks.filter(p => p.l > 0);
      for (const p of sparks) { ctx.fillStyle = `rgba(240,244,252,${p.l})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.l, 0, 6.3); ctx.fill(); p.x += p.vx; p.y += p.vy; p.vx *= .96; p.vy *= .96; p.l -= .018; }
    }

    if (!RM) {
      // cursor
      if (FINE) { cp.x += (cp.tx - cp.x) * .2; cp.y += (cp.ty - cp.y) * .2; cur.style.transform = `translate(${cp.x}px,${cp.y}px)`; }

      // hero floats
      if (sy < innerHeight * 1.2) floats.forEach(f => {
        const d = +f.dataset.depth;
        f.style.transform = `translate3d(${m.x * d * -60}px, ${m.y * d * -60 - sy * d * .35}px, 0) rotate(${(d - 1) * 6}deg)`;
      });

      // marquees
      marquees.forEach(q => {
        q.x -= (q.base + Math.abs(vel) * .25) * dir;
        const half = q.el.scrollWidth / 2;
        if (q.x <= -half) q.x += half; if (q.x > 0) q.x -= half;
        q.el.style.transform = `translate3d(${q.x}px,0,0)`;
      });

      // horizontal work
      if (isDesk()) {
        const top = workSec.offsetTop, max = track.scrollWidth - innerWidth;
        const p = Math.min(Math.max((sy - top) / (workSec.offsetHeight - innerHeight), 0), 1);
        track.style.transform = `translate3d(${-p * max}px,0,0)`;
        countEl.textContent = String(Math.min(work.length, Math.round(p * (work.length - 1)) + 1)).padStart(2, '0');
        pms.forEach(el => {
          const r = el.parentElement.getBoundingClientRect();
          const off = (r.left + r.width / 2 - innerWidth / 2);
          el.style.transform = `translate3d(${off * +el.dataset.par}px, ${off * +el.dataset.par * .4}px, 0)`;
        });
      }

      // wall parallax
      const wr = wallSec.getBoundingClientRect();
      if (wr.top < innerHeight && wr.bottom > 0) {
        const rel = (wr.top + wr.height / 2) - innerHeight / 2;
        wallColEls.forEach(c => c.style.transform = `translate3d(0,${rel * +c.dataset.speed}px,0)`);
      }
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ================= CASE OVERLAY ================= */
  const cs = $('#case');
  function openCase(i, ev) {
    const w = work[i];
    $('#case-kicker').textContent = `Project ${String(+i + 1).padStart(2, '0')} · ${w.chips.join(' · ')}`;
    $('#case-title').innerHTML = `${w.name} <em>${w.em}</em>`;
    $('#case-about').textContent = w.about; $('#case-role').textContent = w.role; $('#case-win').textContent = w.win;
    const cc = $('#case-coin'); cc.dataset.coin = w.id; cc.hidden = !notes[w.id]; cc.classList.toggle('got', got.has(w.id));
    $('#case-pts').innerHTML = w.pts ? `<h4>Highlights</h4><ul>${w.pts.map(p => `<li>${p}</li>`).join('')}</ul>` : '';
    $('#case-media').innerHTML = w.media.map(mm => mediaEl(mm, (w.full || w.name) + ' work', mm.wide ? 'class="wide"' : '', true)).join('');
    $('#case-link').innerHTML = w.link ? `<a href="${w.link[1]}" target="_blank" rel="noopener">Visit ${w.link[0]} ↗</a>` : '';
    $('#case-reels').innerHTML = (w.reels || []).map(r => `<a href="${r[1]}" target="_blank" rel="noopener">${r[0].startsWith('View') || r[0].startsWith('Instagram') ? r[0] : 'View on Instagram: ' + r[0]} ↗</a>`).join('');
    if (ev && ev.clientX) { cs.style.setProperty('--cx', ev.clientX + 'px'); cs.style.setProperty('--cy', ev.clientY + 'px'); }
    cs.classList.add('open'); cs.setAttribute('aria-hidden', 'false'); document.body.classList.add('lock');
    $('.case-scroll').scrollTop = 0; setTimeout(() => $('.case-close').focus(), 400);
    cur.classList.remove('big');
  }
  function closeCase() { $$('#case-media video').forEach(v => v.pause()); cs.classList.remove('open'); cs.setAttribute('aria-hidden', 'true'); document.body.classList.remove('lock'); }
  document.addEventListener('click', e => {
    const t = e.target.closest('.open-btn,.panel-media,.tile'); if (t) openCase(t.dataset.i, e);
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.panel-media')) { e.preventDefault(); openCase(e.target.dataset.i); }
    if (e.key === 'Escape') { closeCase(); closeJourney(); }
  });
  $('.case-close').addEventListener('click', closeCase);

  /* ================= BONUS COINS ================= */
  let got = new Set();
  try { got = new Set(JSON.parse(localStorage.getItem('coins') || '[]')); } catch (e) {}
  const noteEl = $('#note');
  $('#coin-t').textContent = Object.keys(notes).length;
  function paintCoins() {
    $('#coin-n').textContent = got.size;
    $$('[data-coin]').forEach(b => b.classList.toggle('got', got.has(b.dataset.coin)));
    const cc = $('#case-coin'); if (cc.dataset.coin) cc.classList.toggle('got', got.has(cc.dataset.coin));
  }
  function openNote(id) {
    if (id === '_help') {
      $('#note-brand').textContent = 'Bonus coins'; $('#note-title').textContent = 'Little notes, hidden in plain sight';
      $('#note-body').innerHTML = `<dd>Every project hides a coin. Open one to read why I chose it and what it taught me. You have ${got.size} of ${Object.keys(notes).length}.</dd>`;
      noteEl.classList.add('help');
    } else {
      const w = work[byId[id]], n = notes[id]; if (!n) return;
      noteEl.classList.remove('help');
      $('#note-brand').textContent = w.full || (w.name + ' ' + w.em);
      $('#note-title').textContent = got.has(id) ? 'You found this one already' : 'You found a bonus coin';
      $('#note-body').innerHTML = `<dt>Why I chose it</dt><dd>${n[0]}</dd><dt>What I learnt</dt><dd>${n[1]}</dd><dt>Fun fact</dt><dd>${n[2]}</dd>`;
      got.add(id); try { localStorage.setItem('coins', JSON.stringify([...got])); } catch (e) {}
      paintCoins();
    }
    noteEl.classList.remove('open'); void noteEl.offsetWidth; noteEl.classList.add('open'); noteEl.setAttribute('aria-hidden', 'false');
    setTimeout(() => $('.note-close').focus(), 200);
  }
  function closeNote() { if (!noteEl.classList.contains('open')) return false; noteEl.classList.remove('open'); noteEl.setAttribute('aria-hidden', 'true'); return true; }
  document.addEventListener('click', e => {
    const c = e.target.closest('[data-coin],#case-coin'); if (c) { e.stopPropagation(); openNote(c.dataset.coin); return; }
    if (e.target === noteEl || e.target.closest('.note-close')) closeNote();
  }, true);
  $('#coins').addEventListener('click', () => openNote('_help'));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && closeNote()) e.stopImmediatePropagation(); }, true);
  paintCoins();

  /* ================= WHERE AM I ================= */
  const SECS = [['cosmos', 'The tree'], ['growth', 'Growth world'], ['branding', 'Branding world'], ['wall', 'The wall'], ['contact', 'Say hello']].map(([id, l]) => [$('#' + id), id, l]);
  let curSec = '';
  function whereAmI() {
    const y = innerHeight * .45; let pick = SECS[0];
    for (const s of SECS) if (s[0].getBoundingClientRect().top <= y) pick = s;
    if (pick[1] === curSec) return; curSec = pick[1];
    $('#here').textContent = pick[2];
    $$('[data-sec]').forEach(a => a.classList.toggle('on', a.dataset.sec === curSec));
  }
  addEventListener('scroll', () => requestAnimationFrame(whereAmI), { passive: true }); whereAmI();

  /* ================= JOURNEY ================= */
  const heart = $('#heart'), jr = $('#journey'), scrim = $('#scrim');
  $$('.j-steps li').forEach((li, k) => li.style.transitionDelay = (0.25 + k * 0.07) + 's');
  function openJourney() { jr.classList.add('open'); scrim.classList.add('on'); jr.setAttribute('aria-hidden', 'false'); heart.setAttribute('aria-expanded', 'true'); document.body.classList.add('lock'); setTimeout(() => $('.journey-close').focus(), 300); }
  function closeJourney() { if (!jr.classList.contains('open')) return; jr.classList.remove('open'); scrim.classList.remove('on'); jr.setAttribute('aria-hidden', 'true'); heart.setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock'); }
  heart.addEventListener('click', openJourney);
  $('.journey-close').addEventListener('click', closeJourney);
  scrim.addEventListener('click', closeJourney);
  $$('[data-close]', jr).forEach(a => a.addEventListener('click', closeJourney));

  /* ================= IMPACT ================= */
  const fmt = (n, dec) => dec ? n.toFixed(dec) : Math.round(n).toLocaleString('en-US');
  function count(el) {
    const to = +el.dataset.count, dec = +(el.dataset.dec || 0), pre = el.dataset.prefix || '', suf = el.dataset.suffix || '';
    if (RM) { el.textContent = pre + fmt(to, dec) + suf; return; }
    const st = performance.now();
    (function step(n) { const p = Math.min((n - st) / 1800, 1), e = 1 - Math.pow(1 - p, 4); el.textContent = pre + fmt(to * e, dec) + suf; if (p < 1) requestAnimationFrame(step); })(st);
  }
  function ring(fig) {
    const from = +fig.dataset.from, to = +fig.dataset.to, c = $('.fg', fig), b = $('b', fig), L = 326.7;
    c.style.strokeDashoffset = L * (1 - from / 100);
    setTimeout(() => {
      c.style.strokeDashoffset = L * (1 - to / 100);
      const st = performance.now();
      (function step(n) { const p = Math.min((n - st) / 2000, 1), e = 1 - Math.pow(1 - p, 4); b.textContent = Math.round(from + (to - from) * e); if (p < 1) requestAnimationFrame(step); })(st);
    }, 500);
  }
  const io = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    const b = en.target; b.classList.add('in');
    $$('[data-count]', b).forEach(count); $$('.ring', b).forEach(ring);
    io.unobserve(b);
  }), { threshold: .25 });
  $$('.b').forEach((b, k) => { b.style.transitionDelay = (k % 4) * 80 + 'ms'; io.observe(b); });

  /* ================= MAGNET ================= */
  $$('.magnet').forEach(el => {
    if (!FINE || RM) return;
    el.addEventListener('pointermove', e => { const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });

  /* ================= SOUND ================= */
  const sBtn = $('#sound'); let actx, master, playing = false, timers = [], audioEl;
  function startGenerative() {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    master = actx.createGain(); master.gain.value = 0;
    // soft reverb from generated impulse
    const verb = actx.createConvolver(), len = actx.sampleRate * 4, ir = actx.createBuffer(2, len, actx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
    verb.buffer = ir;
    const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 1400;
    master.connect(lp); lp.connect(verb); verb.connect(actx.destination); lp.connect(actx.destination);
    master.gain.linearRampToValueAtTime(.32, actx.currentTime + 3);
    const chords = [[261.6, 329.6, 392, 493.9], [220, 261.6, 329.6, 392], [174.6, 220, 261.6, 329.6], [196, 246.9, 293.7, 329.6]];
    const penta = [523.3, 587.3, 659.3, 784, 880, 1046.5];
    let ci = 0;
    const pad = () => {
      const now = actx.currentTime;
      chords[ci % 4].forEach(f => {
        [-4, 4].forEach(det => {
          const o = actx.createOscillator(), g = actx.createGain();
          o.type = 'sine'; o.frequency.value = f / 2; o.detune.value = det;
          g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(.05, now + 2.5); g.gain.linearRampToValueAtTime(0, now + 8.5);
          o.connect(g); g.connect(master); o.start(now); o.stop(now + 9);
        });
      });
      ci++;
    };
    const chime = () => {
      const now = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
      o.type = 'triangle'; o.frequency.value = penta[Math.floor(Math.random() * penta.length)];
      g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(.06, now + .02); g.gain.exponentialRampToValueAtTime(.0001, now + 3);
      o.connect(g); g.connect(master); o.start(now); o.stop(now + 3.2);
    };
    pad(); timers.push(setInterval(pad, 7000));
    const loopChime = () => { chime(); timers.push(setTimeout(loopChime, 900 + Math.random() * 2600)); };
    timers.push(setTimeout(loopChime, 1500));
  }
  function stopGenerative() {
    timers.forEach(t => { clearInterval(t); clearTimeout(t); }); timers = [];
    if (master) { const g = master; g.gain.cancelScheduledValues(actx.currentTime); g.gain.setValueAtTime(g.gain.value, actx.currentTime); g.gain.linearRampToValueAtTime(0, actx.currentTime + 1.2); setTimeout(() => g.disconnect(), 1500); }
  }
  sBtn.addEventListener('click', () => {
    playing = !playing;
    sBtn.setAttribute('aria-pressed', playing); sBtn.setAttribute('aria-label', playing ? 'Pause background music' : 'Play background music');
    $('.sound-label', sBtn).textContent = playing ? 'Sound on' : 'Sound off';
    if (MUSIC_FILE) {
      audioEl = audioEl || Object.assign(new Audio(MUSIC_FILE), { loop: true, volume: .5 });
      playing ? audioEl.play() : audioEl.pause();
    } else { playing ? startGenerative() : stopGenerative(); }
  });


  /* ================= COSMOS ================= */
  const gal = $('#galaxy'), gx = gal.getContext('2d'), cosSec = $('#cosmos'), intro = $('.cosmos-intro'), sys = $('#system'), cap = $('#system-caption');
  const orbitsSvg = $('#orbits'), planetsEl = $('#planets'), perch = $('#perch'), bino = $('#bino'), scope = $('#scope'), sc1 = $('#sc1'), sc2 = $('#sc2'), worldsEl = $('#worlds');
  const clamp01 = v => Math.min(Math.max(v, 0), 1);
  const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t); };
  let GW, GH, gstars = [], ORB = [], K = .38, pScale = 1, hoverPause = false, WORLD = 'growth';
  const ringsFor = w => w === 'growth' ? [1, 3] : [0, 1, 2, 3];
  function drawOrbits() { orbitsSvg.innerHTML = ringsFor(WORLD).map(k => `<ellipse cx="${GW / 2}" cy="${GH / 2}" rx="${ORB[k]}" ry="${ORB[k] * K}"/>`).join(''); }
  const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
  function gsize() {
    const d = Math.min(devicePixelRatio || 1, 2); GW = gal.clientWidth; GH = gal.clientHeight;
    gal.width = GW * d; gal.height = GH * d; gx.setTransform(d, 0, 0, d, 0, 0);
    const N = GW < 760 ? 4200 : 9000; gstars = [];
    const cols = ['255,236,214', '255,224,190', '214,200,255', '190,205,255', '150,185,255', '255,160,215', '255,255,255'];
    for (let i = 0; i < N; i++) {
      const arm = i % 3, r = Math.pow(Math.random(), 1.5) * 1.05;
      const ang = r * 5.2 + arm * (Math.PI * 2 / 3) + gauss() * (.45 - r * .2);
      const sc = .05 + r * .08;
      const x = Math.cos(ang) * r + gauss() * sc, y = Math.sin(ang) * r + gauss() * sc;
      const ci = r < .18 ? (Math.random() < .6 ? 0 : 1) : r < .5 ? (Math.random() < .5 ? 2 : 3) : (Math.random() < .12 ? 5 : Math.random() < .5 ? 4 : 6);
      gstars.push({ x, y, s: Math.random() * 1.6 + .4, c: cols[ci], a: Math.random() * .6 + .4 });
    }
    // orbits
    const mob = GW < 760; pScale = mob ? .62 : 1; K = mob ? .55 : .38;
    const sunR = (mob ? 32 : Math.min(55, GW * .04));
    const Rmax = Math.min(GW * .46, (GH * .40) / K), R0 = sunR + (mob ? 22 : 50);
    ORB = [0, 1, 2, 3].map(i => R0 + i * (Rmax - R0) / 3);
    drawOrbits();
  }

  // brand objects on orbits, in two worlds
  const brandIds = work.filter(w => !GROWTH.includes(w.id)).map(w => w.id);
  const layout = [{ id: 'darena', world: 'growth', ring: 1, a: .8 }, { id: 'nexa', world: 'growth', ring: 3, a: 3.9 }];
  let q = 0; [2, 3, 3, 3].forEach((n, r) => { for (let s = 0; s < n; s++) { const id = brandIds[q++]; if (id) layout.push({ id, world: 'brand', ring: r, a: s * Math.PI * 2 / n + r * .9 }); } });
  const OB = layout.map(o => {
    const w = work[byId[o.id]], [type, c1, c2] = OBJ[o.id];
    const b = document.createElement('button'); b.className = 'obj obj-' + type; b.innerHTML = icon(type, c1, c2);
    b.setAttribute('aria-label', 'Open ' + (w.full || w.name + ' ' + w.em));
    const lab = document.createElement('div'); lab.className = 'p-label'; lab.innerHTML = `${w.full || w.name + ' ' + w.em}<small>${w.chips[0]}</small>`;
    planetsEl.append(b, lab);
    const show = v => { lab.classList.toggle('show', v); hoverPause = v; };
    b.addEventListener('mouseenter', () => show(true)); b.addEventListener('mouseleave', () => show(false));
    b.addEventListener('focus', () => show(true)); b.addEventListener('blur', () => show(false));
    b.addEventListener('click', e => openCase(byId[o.id], e));
    return { ...o, el: b, lab, v: .00009 / Math.sqrt(o.ring + 1), size: o.world === 'growth' ? 66 : 48 };
  });
  function setWorld(w) {
    WORLD = w; worldsEl.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.dataset.w === w));
    OB.forEach(o => { const off = o.world !== w; o.el.classList.toggle('off', off); o.el.tabIndex = off ? -1 : 0; if (off) o.lab.classList.remove('show'); });
    sys.dataset.world = w; drawOrbits();
  }
  worldsEl.addEventListener('click', e => { const b = e.target.closest('button'); if (b) setWorld(b.dataset.w); });
  function closeCard() {}
  $('#sun').addEventListener('click', () => openJourney());
  if (!FINE) cap.innerHTML = '<b>Tap an object</b> to open the brand.';
  gsize(); setWorld('growth'); addEventListener('resize', gsize);

  let lastT = performance.now();
  function cosmos(t) {
    const dt = Math.min(t - lastT, 50); lastT = t;
    const r = cosSec.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      const p = clamp01(-r.top / (r.height - innerHeight));
      // galaxy
      gx.clearRect(0, 0, GW, GH);
      const ga = 1 - smooth(.42, .68, p);
      if (ga > 0) {
        const zoom = 1 + Math.pow(p / .62, 3) * 26;
        const R = Math.max(GW * .62, GH * .9) * zoom, rot = RM ? 0 : t * .000025, cx = GW / 2, cy = GH / 2;
        const tilt = -.35, ct = Math.cos(tilt), st = Math.sin(tilt), cr = Math.cos(rot), sr = Math.sin(rot);
        const core = gx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(R * .35, Math.max(GW, GH)));
        const cf = ga / Math.sqrt(zoom); core.addColorStop(0, `rgba(255,236,214,${.6 * cf})`); core.addColorStop(.3, `rgba(190,170,255,${.2 * cf})`); core.addColorStop(1, 'rgba(0,0,0,0)');
        gx.fillStyle = core; gx.fillRect(0, 0, GW, GH);
        for (const s of gstars) {
          let x = s.x * cr - s.y * sr, y = (s.x * sr + s.y * cr) * .42;
          const X = cx + (x * ct - y * st) * R, Y = cy + (x * st + y * ct) * R;
          if (X < -4 || X > GW + 4 || Y < -4 || Y > GH + 4) continue;
          const sz = s.s * (1 + (zoom - 1) * .06);
          gx.fillStyle = `rgba(${s.c},${s.a * ga})`; gx.fillRect(X, Y, sz, sz);
        }
      }
      // intro
      const io_ = 1 - smooth(.09, .19, p);
      intro.style.opacity = io_; intro.style.transform = `translateY(${-p * 60}px)`; intro.style.visibility = io_ < .01 ? 'hidden' : '';
      // the cat lifts her binoculars, then we look through them
      const lift = smooth(.04, .16, p);
      bino.style.transform = `rotate(${-24 * lift}deg)`;
      perch.style.opacity = 1 - smooth(.2, .3, p); perch.style.transform = `translateY(${smooth(.16, .32, p) * 30}%)`;
      perch.style.visibility = p > .31 ? 'hidden' : '';
      const so = smooth(.17, .23, p) * (1 - smooth(.5, .58, p));
      scope.style.opacity = so; scope.style.visibility = so < .01 ? 'hidden' : '';
      if (so > 0) {
        const base = Math.min(GW, GH), r = base * (.2 + Math.pow(smooth(.22, .56, p), 2) * 1.5), off = r * .62;
        sc1.setAttribute('cx', GW / 2 - off); sc2.setAttribute('cx', GW / 2 + off); sc1.setAttribute('cy', GH / 2); sc2.setAttribute('cy', GH / 2);
        sc1.setAttribute('r', r); sc2.setAttribute('r', r);
      }
      // system
      const sv = smooth(.5, .86, p);
      sys.style.opacity = sv; sys.style.transform = `scale(${.25 + .75 * sv}) rotate(${(1 - sv) * -25}deg)`;
      sys.classList.toggle('live', sv > .9);
      cap.style.opacity = smooth(.86, .95, p);
      worldsEl.style.opacity = smooth(.8, .92, p); worldsEl.style.pointerEvents = sv > .9 ? '' : 'none';
      if (sv > 0) {
        const cx = GW / 2, cy = GH / 2;
        OB.forEach(o => {
          if (!RM && !hoverPause) o.a += o.v * dt;
          const R = ORB[o.ring], sn = Math.sin(o.a), x = cx + Math.cos(o.a) * R, y = cy + sn * R * K;
          const depth = .82 + .18 * (sn + 1) / 2, sz = o.size * pScale * depth;
          o.el.style.width = o.el.style.height = sz + 'px';
          o.el.style.transform = `translate(${x - sz / 2}px,${y - sz / 2}px)`;
          o.el.style.zIndex = sn > 0 ? 8 : 3;
          o.lab.style.left = x + 'px'; o.lab.style.top = (y - sz / 2 + 10) + 'px';
        });
      }
    }
    requestAnimationFrame(cosmos);
  }
  requestAnimationFrame(cosmos);

  /* ================= QUICK VIEW ================= */
  const exp = [
    ['Darena Health', 'Branding & Marketing Associate · USA', ['Redesigned and hand-coded the homepage and product pages. Homepage speed 59 → 91, MyMipsScore 57 → 94.', '16K website visitors and 64 inquiries from website forms, April to October 2026.', '46,083 emails across 62 campaigns. Open rate 22% → 34%.'], 'Apr 2025 to now'],
    ['Credtech', 'Sales & Marketing Manager · Bangalore', ['Event design for Pune Chapter 2025: big screen, print and decor.'], 'Mar to Apr 2025'],
    ['Amazon KDP', 'Author & designer · Self-published', ['Books, journals and colouring books.'], '2025'],
    ['Nektar Homes', 'Brand identity · Freelance', ['Brand kit, logo, flyer and reels.'], '2025'],
    ['Nexa Avenue & Sound of C', 'Digital Marketing Manager · Toronto, Canada', ['Increased Instagram engagement, reaching 5,600 organic users with content such as 184 Reels and 92 posts.', 'Boosted LinkedIn reach, achieving 21,404 impressions, 990 reactions, and a 10.98% engagement rate.', 'Executed high-impact content strategies, driving leadership recognition, optimized digital presence using analytics-driven insights.'], 'Nov 2023 to Mar 2025'],
    ['Creating Conversion', 'Social Media Manager & Content Writer · Bangalore, remote', ['Created high-performing Reels for an international designer fan brand, achieving 70K+ collective views.', 'Managed and strategized for 6+ eCommerce & luxury brands, developing roadmaps, editorial calendars, and influencer marketing campaigns.', 'Executed creative marketing initiatives, enhancing brand storytelling and audience engagement.'], 'Feb to Oct 2023'],
    ['Aira Wedding Planners', 'Social Media Manager & Design Assistant · Bangalore, freelance', ['Increased organic engagement by 6.5%, driving community growth of 2K+ organic followers in 3 months.', 'Developed digital storytelling strategies, enhancing brand perception and audience retention.', 'Created mood boards and visual themes for weddings, ensuring cohesive and aesthetic event branding.'], 'Dec 2022 to Mar 2023'],
    ['C CYUB Clothing', 'Co-Founder · Bangalore', ['Managed branding initiatives and digital campaigns to boost market reach.', 'Developed effective social media promotions and influencer marketing strategies.', 'Website optimization and product marketing for improved online sales.'], 'Jan 2022 to Jan 2023'],
    ['Freelance', 'Video Editor · Bangalore, remote', ['Edited wedding videos and VR content using Adobe Premiere Pro.'], 'Jun 2021 to Mar 2022']
  ];
  $('#q-exp').innerHTML = exp.map(e => `<li><div><b>${e[0]}</b><span>${e[1]}</span><ul>${e[2].map(p => `<li>${p}</li>`).join('')}</ul></div><time>${e[3]}</time></li>`).join('');
  const quick = $('#quick'), qBtn = $('#quick-btn');
  function openQuick() { quick.classList.add('open'); scrim.classList.add('on'); quick.setAttribute('aria-hidden', 'false'); qBtn.setAttribute('aria-expanded', 'true'); document.body.classList.add('lock'); setTimeout(() => $('.quick-close').focus(), 300); }
  function closeQuick() { if (!quick.classList.contains('open')) return; quick.classList.remove('open'); scrim.classList.remove('on'); quick.setAttribute('aria-hidden', 'true'); qBtn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('lock'); }
  qBtn.addEventListener('click', openQuick); $('.quick-close').addEventListener('click', closeQuick); scrim.addEventListener('click', closeQuick);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeQuick(); closeCard(); } });

  /* ================= LOGOS ================= */
  const logos = ['cyub', 'fanzart', 'whims', 'tasteable', 'holidaytribe', 'aira', 'nexa', 'soundofc', 'gayle-charach', 'hd-impact'];
  const lHTML = logos.map(l => `<img src="../assets/img/logos/${l}.webp" alt="${l.replace('-', ' ')} logo" class="${['cyub', 'tasteable', 'soundofc', 'aira'].includes(l) ? 'sq' : ''}">`).join('');
  $('#logos-track').innerHTML = lHTML + lHTML;

  initMarquees();
  $('#year').textContent = new Date().getFullYear();
})();
