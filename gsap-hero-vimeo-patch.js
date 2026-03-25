/**
 * Kulbit GSAP — патч для hero з Vimeo (.is-hero-vimeo).
 *
 * У базовому gsap-animations.js для .video-wrapper є margin-компенсація через
 * tl.to(bgVideo, { y: "-12rem" }) під margin-top: 12rem. Для Vimeo margin знятий CSS-ом,
 * замість цього нижче — вертикальний зсув y на блоці відео (0 → -22vh під scrub), щоб у фіналі підтягнути кадр вгору.
 *
 * ВАЖЛИВО (горизонтальний «дрейф»): не анімуйте в одному scrubbed tl.to() разом
 * position/left/x з width/height. Webflow дає .video-wrapper { left: auto } — GSAP
 * інтерполює left/x від стартових значень до 50% / -50%, через це блок їде вліво-вправо.
 * Плюс одночасна зміна width і xPercent у scrub змінює зсув у px. Рішення: gsap.set()
 * для центрування (position + left + x) ДО таймлайну; у tl.to() лише height, width, minWidth.
 *
 * Вертикаль: .video-wrapper у Webflow прив’язаний знизу (bottom: 0), висота 122vh. Якщо в кінці
 * скролу форсувати top: 0 у scrub-твіні, з bottom конфліктує інтерполяція — зверху з’являється
 * «чорна смуга». Тримаємо bottom: 0 + top: auto й лише зменшуємо height; додатково зсуваємо
 * [.hero-bg-video]: на початку скролу y = 0 (без смуги). До кінця scrub — y у мінус (піднімаємо кадр),
 * щоб при 100vh не з’являлась чорна смуга зверху. Не використовувати позитивний стартовий y.
 */
(function () {
  var orig = window.initHeroAnimation;
  if (typeof orig !== 'function') return;

  window.initHeroAnimation = function () {
    var section = document.querySelector('.hero');
    if (!section) return;

    var bgVideo = section.querySelector('[data-anim-hero="video-block"]');
    if (!bgVideo || !bgVideo.classList.contains('is-hero-vimeo')) {
      return orig();
    }

    var contentWrapper = section.querySelector('[data-anim-hero="text-block"]');
    var videoWrapper = section.querySelector('[data-anim-hero="video-wrapper"]');
    var leftGradient = section.querySelector('[data-anim-hero="text-gradient"]');
    var videoMask = section.querySelector('[data-anim-hero="video-mask"]');

    ScrollTrigger.matchMedia({
      '(min-width: 992px)': function () {
        var tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=200%',
            scrub: true,
            markers: false,
          },
        });

        tl.to(contentWrapper, { y: '150vh', ease: 'none' }, 0);
        tl.to(leftGradient, { y: '150vh', ease: 'none' }, 0);

        gsap.set(videoWrapper, {
          willChange: 'width, height, transform',
          force3D: true,
          backfaceVisibility: 'hidden',
          position: 'absolute',
          left: '50%',
          xPercent: -50,
          bottom: '0',
          top: 'auto',
        });

        tl.fromTo(
          videoWrapper,
          {
            height: '122vh',
          },
          {
            height: '100vh',
            width: '100vw',
            minWidth: '100vw',
            ease: 'none',
            force3D: true,
          },
          0,
        );

        tl.fromTo(
          bgVideo,
          {
            y: 0,
          },
          {
            y: '-22vh',
            ease: 'none',
          },
          0,
        );
        tl.to(videoMask, { opacity: 0, ease: 'none' }, 0);
      },
      '(max-width: 991px)': function () {},
    });
  };
})();
