(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // sticky nav
  const nav = $('#nav');
  const onScroll = () => nav.classList.toggle('is-stuck', scrollY > 20);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  // mobile menu
  const burger = $('#burger'), menu = $('#menu');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    nav.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open);
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  // marquee: duplicate for seamless loop
  const track = $('#marquee');
  track.innerHTML += track.innerHTML;
  $$('img', track).slice(track.children.length / 2).forEach(i => i.alt = '');

  // tabs
  $$('.tab').forEach(t => t.addEventListener('click', () => {
    $$('.tab').forEach(x => { x.classList.remove('is-on'); x.setAttribute('aria-selected', 'false'); });
    $$('.panel').forEach(p => p.classList.remove('is-on'));
    t.classList.add('is-on'); t.setAttribute('aria-selected', 'true');
    $('#' + t.dataset.tab).classList.add('is-on');
  }));

  // FAQ: one open at a time
  $$('.acc details').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) $$('.acc details').forEach(o => o !== d && (o.open = false));
  }));

  // reveal on scroll + counters
  const count = el => {
    const end = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in'); io.unobserve(e.target);
  }), { threshold: .12 });
  $$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 80 + 'ms'; io.observe(el); });
  const io2 = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { $$('[data-count]', e.target).forEach(count); io2.unobserve(e.target); }
  }), { threshold: .4 });
  io2.observe($('.stats'));

  // active nav link
  const links = $$('.nav__links a[href^="#"]:not(.btn)');
  const so = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('is-on', l.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach(s => so.observe(s));

  // contact form -> opens email client (static-site friendly)
  const form = $('#form'), note = $('#note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(form);
    const bad = ['name', 'phone'].filter(k => !String(f.get(k)).trim());
    $$('input,textarea', form).forEach(i => i.classList.remove('is-err'));
    bad.forEach(k => $(`[name=${k}]`, form).classList.add('is-err'));
    if (bad.length) { note.textContent = 'Please add your name and phone number.'; return; }
    const body = `Name: ${f.get('name')}\nPhone: ${f.get('phone')}\nEmail: ${f.get('email')}\nInterest: ${f.get('topic')}\n\n${f.get('msg')}`;
    location.href = `mailto:info@solarclubpk.com?subject=${encodeURIComponent('Solar Club enquiry – ' + f.get('topic'))}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Opening your email app… you can also WhatsApp us anytime.';
  });

  $('#yr').textContent = new Date().getFullYear();
})();
