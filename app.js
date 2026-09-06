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

  const openMenu = () => {
    mobileMenu.classList.add('open');
    menuBtn.classList.add('open');
    header?.classList.add('menu-open');

    document.body.classList.add('mobile-menu-active');
    document.body.style.overflow = 'hidden';

    menuBtn.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    menuBtn.classList.remove('open');
    header?.classList.remove('menu-open');

    document.body.classList.remove('mobile-menu-active');
    document.body.style.overflow = '';

    menuBtn.setAttribute('aria-expanded', 'false');
  };

  menuBtn.setAttribute('aria-expanded', 'false');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (
      window.innerWidth > 980 &&
      mobileMenu.classList.contains('open')
    ) {
      closeMenu();
    }
  });
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

const modal = document.getElementById('videoModal');
const video = document.getElementById('projectVideo');
const title = document.getElementById('modalTitle');

if (modal && video && title) {

  const openModal = card => {
    video.src = card.dataset.video;
    title.textContent = card.dataset.name || 'Proje';

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';

    video.play().catch(() => {});
  };

  const closeModal = () => {
    video.pause();
    video.removeAttribute('src');
    video.load();

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-video]').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  document
    .getElementById('modalClose')
    ?.addEventListener('click', closeModal);

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', e => {
    if (
      e.key === 'Escape' &&
      modal.classList.contains('open')
    ) {
      closeModal();
    }
  });
}


/* =========================================================
   WHATSAPP QUOTE FORM
========================================================= */

const quoteForm = document.getElementById('quoteForm');

if (quoteForm) {
  quoteForm.addEventListener('submit', e => {
    e.preventDefault();

    const fd = new FormData(quoteForm);

    const msg =
`Merhaba Işıklar Grup, web siteniz üzerinden proje hakkında bilgi almak istiyorum.

Ad Soyad: ${fd.get('name') || '-'}
Telefon: ${fd.get('phone') || '-'}
Proje/Hizmet: ${fd.get('service') || '-'}
Mesaj: ${fd.get('message') || '-'}`;

    window.open(
      `https://wa.me/905078080224?text=${encodeURIComponent(msg)}`,
      '_blank',
      'noopener'
    );
  });
}


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

if (heroParallax) {

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

if (premiumHero && window.matchMedia('(min-width: 981px)').matches) {

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


/* Header slight hide/show */

if (header) {

  let lastScroll = window.scrollY;

  window.addEventListener(
    'scroll',
    () => {

      const currentScroll = window.scrollY;

      if (
        currentScroll > lastScroll &&
        currentScroll > 180 &&
        !header.classList.contains('menu-open')
      ) {

        header.style.transform =
          'translateY(-100%)';

      } else {

        header.style.transform =
          'translateY(0)';
      }

      lastScroll = currentScroll;

    },
    { passive:true }
  );

  header.style.transition =
    'transform .35s ease, background .35s ease, box-shadow .35s ease';
}