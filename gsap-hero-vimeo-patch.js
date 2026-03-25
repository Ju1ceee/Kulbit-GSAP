/**
 * Kulbit GSAP — патч для hero з Vimeo (.is-hero-vimeo).
 *
 * У базовому gsap-animations.js для .video-wrapper є margin-компенсація через
 * tl.to(bgVideo, { y: "-12rem" }) під margin-top: 12rem. Для Vimeo margin знятий CSS-ом,
 * тому тут y для bgVideo = 0.
 *
 * ВАЖЛИВО (горизонтальний «дрейф»): не анімуйте в одному scrubbed tl.to() разом
 * position/left/x з width/height. Webflow дає .video-wrapper { left: auto } — GSAP
 * інтерполює left/x від стартових значень до 50% / -50%, через це блок їде вліво-вправо.
 * Плюс одночасна зміна width і xPercent у scrub змінює зсув у px. Рішення: gsap.set()
 * для центрування (position + left + x) ДО таймлайну; у tl.to() лише height, width, minWidth, top.
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
        });

        tl.to(
          videoWrapper,
          {
            height: '100vh',
            width: '100vw',
            minWidth: '100vw',
            top: '0rem',
            ease: 'none',
            force3D: true,
          },
          0,
        );

        tl.to(bgVideo, { y: '0rem', ease: 'none' }, 0);
        tl.to(videoMask, { opacity: 0, ease: 'none' }, 0);
      },
      '(max-width: 991px)': function () {},
    });
  };
})();
