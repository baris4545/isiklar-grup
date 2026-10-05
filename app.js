const header = document.getElementById('header');

if (header) {
  const forceScrolled =
    document.body.classList.contains('inner-page') &&
    !document.body.classList.contains('dark-hero-page');

  const updateHeader = () => {
    header.classList.toggle(
      'scrolled',
      window.scrollY > 60 || forceScrolled
    );
  };

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });
}


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  let previousOverflow = '';
  const background = [...document.querySelectorAll('main, footer, .floating-wa')];
  const closeMenu = (restoreFocus = false) => {
    if (!mobileMenu.classList.contains('open')) return;
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    header?.classList.remove('menu-open');
    document.body.classList.remove('mobile-menu-active');
    document.body.style.overflow = previousOverflow;
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Menüyü aç');
    background.forEach(el => el.inert = false);
    if (restoreFocus) menuBtn.focus();
  };
  menuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) { closeMenu(true); return; }
    previousOverflow = document.body.style.overflow;
    mobileMenu.classList.add('open');
    menuBtn.classList.add('open');
    header?.classList.add('menu-open');
    document.body.classList.add('mobile-menu-active');
    document.body.style.overflow = 'hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
    menuBtn.setAttribute('aria-label', 'Menüyü kapat');
    background.forEach(el => el.inert = true);
    mobileMenu.querySelector('a')?.focus();
  });
  mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', e => {
    if (!mobileMenu.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeMenu(true); }
    if (e.key === 'Tab') {
      const items = [menuBtn, ...mobileMenu.querySelectorAll('a[href]')];
      const index = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(index + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 980) closeMenu(); });
}

/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  revealElements.forEach(el => observer.observe(el));
}


/* =========================================================
   PROJECT VIDEO MODAL
========================================================= */

// Shared dialog behavior also covers service videos.
function initVideoDialog(ids, selector, sourceKey, nameKey) {
  const dialog = document.getElementById(ids[0]);
  const player = document.getElementById(ids[1]);
  const heading = document.getElementById(ids[2]);
  const close = document.getElementById(ids[3]);
  if (!dialog || !player || !heading || !close) return;
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-labelledby', ids[2]);
  player.setAttribute('preload', 'none');
  let opener, overflow = '';
  const closeDialog = () => {
    if (!dialog.classList.contains('open')) return;
    player.pause(); player.removeAttribute('src'); player.load();
    dialog.classList.remove('open'); dialog.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = overflow;
    opener?.focus();
  };
  document.querySelectorAll(selector).forEach(card => card.addEventListener('click', () => {
    opener = card; overflow = document.body.style.overflow;
    player.src = card.dataset[sourceKey]; heading.textContent = card.dataset[nameKey] || 'Proje';
    dialog.classList.add('open'); dialog.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; close.focus();
    player.play().catch(() => {});
  }));
  close.addEventListener('click', closeDialog);
  dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(); });
  document.addEventListener('keydown', e => {
    if (!dialog.classList.contains('open')) return;
    if (e.key === 'Escape') { e.preventDefault(); closeDialog(); }
    if (e.key === 'Tab') {
      // The browser owns the native media controls; keep focus inside the dialog.
      if (e.shiftKey && document.activeElement === close) { e.preventDefault(); player.focus(); }
    }
  });
  document.addEventListener('focusin', e => {
    if (dialog.classList.contains('open') && !dialog.contains(e.target)) close.focus();
  });
}
initVideoDialog(['videoModal', 'projectVideo', 'modalTitle', 'modalClose'], '[data-video]', 'video', 'name');
initVideoDialog(['serviceVideoModal', 'serviceVideoModalPlayer', 'serviceVideoModalTitle', 'serviceVideoModalClose'], '[data-service-video]', 'serviceVideo', 'serviceName');

/* =========================================================
   V8 INTERACTIVE SERVICES
========================================================= */

const serviceTabs = document.querySelectorAll('#serviceTabs a');
const serviceImage = document.getElementById('serviceImage');
const serviceCopy = document.getElementById('serviceCopy');

if (
  serviceTabs.length &&
  serviceImage &&
  serviceCopy
) {

  serviceTabs.forEach(tab => {

    const activate = () => {
      serviceTabs.forEach(t => t.classList.remove('active'));

      tab.classList.add('active');

      serviceImage.style.opacity = '0';

      setTimeout(() => {
        serviceImage.src = tab.dataset.image;

        serviceCopy.textContent =
          tab.dataset.copy || '';

        serviceImage.classList.toggle(
          'contain',
          tab.dataset.fit === 'contain'
        );

        serviceImage.style.opacity = '1';
      }, 160);
    };

    tab.addEventListener('mouseenter', activate);
    tab.addEventListener('focus', activate);
  });
}


/* =========================================================
   V8 PROJECT RAIL
========================================================= */

const projectRail = document.getElementById('projectRail');
const projectPrev = document.getElementById('projectPrev');
const projectNext = document.getElementById('projectNext');

if (projectRail) {

  const move = direction => {
    const card =
      projectRail.querySelector('.v8-project-card');

    const gap = 18;

    const amount =
      (card?.getBoundingClientRect().width || 700) + gap;

    projectRail.scrollBy({
      left: direction * amount,
      behavior: 'smooth'
    });
  };

  projectPrev?.addEventListener(
    'click',
    () => move(-1)
  );

  projectNext?.addEventListener(
    'click',
    () => move(1)
  );
}


/* =========================================================
   V8 HERO PARALLAX
========================================================= */

const heroParallax =
  document.getElementById('heroParallax');

if (heroParallax && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

  const updateParallax = () => {
    const y = Math.min(window.scrollY, 700);

    heroParallax.style.transform =
      `scale(1.04) translateY(${y * 0.045}px)`;
  };

  window.addEventListener(
    'scroll',
    updateParallax,
    { passive: true }
  );
}
/* =========================================================
   V9 PREMIUM INTERACTIONS
========================================================= */


/* Hero cinematic mouse movement — desktop only */

const premiumHero = document.getElementById('heroParallax');

if (premiumHero && window.matchMedia('(min-width: 981px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {

  const heroSection = premiumHero.closest('.v8-hero');

  if (heroSection) {

    heroSection.addEventListener('mousemove', e => {

      const rect = heroSection.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) / rect.width - 0.5;

      const y =
        (e.clientY - rect.top) / rect.height - 0.5;

      const scrollY = Math.min(window.scrollY, 700);

      premiumHero.style.transform =
        `scale(1.055)
         translate(${x * 8}px, ${scrollY * 0.045 + y * 6}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {

      const scrollY = Math.min(window.scrollY, 700);

      premiumHero.style.transform =
        `scale(1.04)
         translateY(${scrollY * 0.045}px)`;
    });
  }
}


/* Project rail mouse drag */

const premiumRail = document.getElementById('projectRail');

if (premiumRail) {

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  premiumRail.addEventListener('mousedown', e => {

    isDown = true;

    premiumRail.classList.add('dragging');

    startX = e.pageX - premiumRail.offsetLeft;
    scrollLeft = premiumRail.scrollLeft;
  });

  window.addEventListener('mouseup', () => {

    isDown = false;

    premiumRail.classList.remove('dragging');
  });

  premiumRail.addEventListener('mouseleave', () => {

    isDown = false;

    premiumRail.classList.remove('dragging');
  });

  premiumRail.addEventListener('mousemove', e => {

    if (!isDown) return;

    e.preventDefault();

    const x =
      e.pageX - premiumRail.offsetLeft;

    const walk =
      (x - startX) * 1.3;

    premiumRail.scrollLeft =
      scrollLeft - walk;
  });
}


// Navigation stays visible while scrolling so contact and menu controls remain reachable.
