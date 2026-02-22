function initMobileAnimations() {

    const mm = ScrollTrigger.matchMedia();

    mm.add("(max-width: 991px)", () => {

        const mmMobile = ScrollTrigger.matchMedia();
        mmMobile.add("(max-width: 479px)", () => {

            initMobileHero();

            initMobileAmbassadors();

            initMobileProcess();

            initMobileServices();

            initMobileBenefits();
            initMobileBenefitsCards();
            initMobileStageHeading();
            initMobileStagesAnimation();
            initMobileScrambleText();
            initMobileTeamAnimation();
            initMobileCasesAnimation();

        });

        initHeroVideoPause();

        initScrollDisableLogic();
    });
}

function initHeroVideoPause() {
    const video = document.getElementById('my-custom-video');
    const nextSection = document.querySelector('.our-ambassadors');

    if (!video || !nextSection) return;

    ScrollTrigger.create({
        trigger: nextSection,
        start: "top top",
        onEnter: () => {
            video.pause();
        },
        onLeaveBack: () => {
            video.play();
        },
        markers: false
    });
}

function initMobileHero() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) {

        return;
    }

    const heroContent = document.querySelector('.hero-content-wrapper');
    const heroGradient = document.querySelector('.hero-left-gradient');
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoMask = document.querySelector('.video-mask');

    const videoElements = [videoWrapper, videoMask].filter(el => el);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    if (heroContent) {

        tl.to(heroContent, { y: "120%", ease: "none", duration: 0.8 }, 0);
    }

    if (heroGradient) {

        tl.to(heroGradient, { y: "220%", ease: "none", duration: 0.8 }, 0);
    }

    if (videoElements.length > 0) {

        tl.to(videoElements, { height: "100vh", ease: "none", duration: 0.8 }, 0);
    }

    if (videoMask) {

        tl.to(videoMask, { opacity: 0, ease: "none", duration: 0.2 }, 0.8);
    }
}

function initMobileAmbassadors() {
    const section = document.querySelector('.our-ambassadors');
    const desktopLogos = document.querySelector('.flex-h.is-brands-logo');

    if (desktopLogos) gsap.set(desktopLogos, { display: "none" });

    if (!section) return;

    const wrapper = document.querySelector('.is-brands-logo-mobile');

    const container1 = document.querySelector('[data-anim-ambassadors="mobile-1"]');
    const container2 = document.querySelector('[data-anim-ambassadors="mobile-2"]');

    const row1_1 = document.querySelector('[data-anim-ambassadors="mobile-1-1"]');
    const row1_2 = document.querySelector('[data-anim-ambassadors="mobile-1-2"]');

    const row2_1 = document.querySelector('[data-anim-ambassadors="mobile-2-1"]');
    const row2_2 = document.querySelector('[data-anim-ambassadors="mobile-2-2"]');
    const row2_3 = document.querySelector('[data-anim-ambassadors="mobile-2-3"]');
    const row2_4 = document.querySelector('[data-anim-ambassadors="mobile-2-4"]');

    if (!container1 || !container2 || !wrapper) return;

    const initialHeight = wrapper.offsetHeight || 300;
    gsap.set(wrapper, { position: "relative", height: initialHeight, display: "block" });

    gsap.set([container1, container2], {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    const allRows = [row1_1, row1_2, row2_1, row2_2, row2_3, row2_4].filter(r => r);
    gsap.set(allRows, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    const startY = 20;
    const exitY = -20;

    gsap.set([container2, row1_2, row2_2, row2_3, row2_4], { opacity: 0, y: startY, visibility: "hidden" });

    gsap.set(container1, { opacity: 1, y: 0, visibility: "visible" });
    gsap.set(row1_1, { opacity: 1, y: 0, visibility: "visible" });
    gsap.set(row2_1, { opacity: 1, y: 0, visibility: "visible" });

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            pin: true,
            pinSpacing: false,
            scrub: true
        }
    });

    if (row1_1 && row1_2) {
        tl.to(row1_1, { opacity: 0, y: exitY, duration: 1 })
            .to(row1_2, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    tl.to(container1, { opacity: 0, y: exitY, duration: 1 }, "+=0.5");

    tl.set(container1, { visibility: "hidden" })
        .set(container2, { visibility: "visible" })
        .to(container2, { opacity: 1, y: 0, duration: 1 });

    if (row2_1 && row2_2) {
        tl.to(row2_1, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_2, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    if (row2_3) {
        tl.to(row2_2, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_3, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    if (row2_4) {
        tl.to(row2_3, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_4, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    tl.to({}, { duration: 1.5 }, "+=1.5");
}

function initMobileProcess() {
    const section = document.querySelector('.proces');
    if (!section) return;

    const wrapper = section.querySelector('.process-info-red-wrapper');
    if (!wrapper) return;

    const redMaskPath = document.getElementById('mask-path');
    const redFillLayer = document.getElementById('fill-layer');
    const blueMaskPath = document.getElementById('blue-mask-path');
    const blueFillLayer = document.getElementById('blue-fill-layer');
    const redMapSvg = section.querySelector('.map-svg');

    const infoSquare = section.querySelector('.process-info-square');
    const infoTitleWrapper = section.querySelector('.width-180-a-a');
    const infoTitle = section.querySelector('.process-info-title');
    const originalTitleText = infoTitle ? infoTitle.textContent : "Traditional Production House";

    const cards = {};
    for (let i = 1; i <= 12; i++) {
        cards[i] = section.querySelector(`[data-anim-process-desc="${i}"]`);
    }

    const bars = {};
    for (let i = 1; i <= 8; i++) {
        bars[i] = section.querySelector(`[data-anim-process-bar-line="${i}"]`);
    }

    const dots = {
        1: [section.querySelector('[data-anim-process-dot="1-1"]')],
        2: [section.querySelector('[data-anim-process-dot="1-5"]')],
        3: [section.querySelector('[data-anim-process-dot="1-2"]'), section.querySelector('[data-anim-process-dot="1-3"]')],
        4: [section.querySelector('[data-anim-process-dot="1-4"]')],
        5: [section.querySelector('[data-anim-process-dot="2-1"]')],
        6: [section.querySelector('[data-anim-process-dot="2-2"]')],
        7: [section.querySelector('[data-anim-process-dot="2-3"]'), section.querySelector('[data-anim-process-dot="2-4"]')],
        8: [section.querySelector('[data-anim-process-dot="2-5"]')],

    };

    for (let key in dots) {
        dots[key] = dots[key].filter(d => d);
    }

    let tlRedMap = gsap.timeline({ paused: true });

    if (redMapSvg) gsap.set(redMapSvg, { autoAlpha: 0 });

    if (redMaskPath && redFillLayer && redMapSvg) {

        const redLength = redMaskPath.getTotalLength();
        gsap.set(redMaskPath, { strokeDasharray: redLength, strokeDashoffset: redLength });
        gsap.set(redFillLayer, { autoAlpha: 0 });

        tlRedMap.to(redMapSvg, { autoAlpha: 1, duration: 0.1, ease: "none" });
        tlRedMap.to(redMaskPath, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, "<");

        tlRedMap.to(redFillLayer, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
    }

    const playRedMap = () => { tlRedMap.play(); };
    const reverseRedMap = () => { tlRedMap.reverse(); };

    let tlBlueMap = gsap.timeline({ paused: true });
    if (blueMaskPath && blueFillLayer) {

        const blueLength = blueMaskPath.getTotalLength();
        gsap.set(blueMaskPath, { strokeDasharray: blueLength, strokeDashoffset: blueLength, autoAlpha: 1 });
        gsap.set(blueFillLayer, { autoAlpha: 0 });

        tlBlueMap.to(blueMaskPath, { strokeDashoffset: 0, duration: 0.8, ease: "none" });

        tlBlueMap.to(blueFillLayer, { autoAlpha: 1, duration: 0.05, ease: "power2.out" });
    }

    const playBlueMap = () => { tlBlueMap.play(); };
    const reverseBlueMap = () => {
        tlBlueMap.reverse();
    }

    gsap.set(wrapper, { position: "relative", minHeight: "22rem", display: "block" });

    const cardPositions = {};

    for (let i = 1; i <= 12; i += 2) {
        if (cards[i]) {
            gsap.set(cards[i], { position: "absolute", top: 0, left: 0, width: "100%", visibility: "visible", opacity: 0 });
            const height = cards[i].offsetHeight;
            cardPositions[i] = { top: 0 };
            cardPositions[i + 1] = { top: `${height - 2}px` };
            gsap.set(cards[i], { visibility: "hidden" });
        }
    }

    for (let i = 1; i <= 12; i++) {
        if (cards[i] && cardPositions[i]) {
            gsap.set(cards[i], {
                position: "absolute",
                top: cardPositions[i].top,
                left: 0,
                width: "100%",
                opacity: 0,
                y: "2rem",
                visibility: "hidden"
            });
        }
    }

    const allBars = Object.values(bars).filter(b => b);
    const allDots = Object.values(dots).flat();

    if (allBars.length) gsap.set(allBars, { x: "-100%" });
    if (allDots.length) gsap.set(allDots, { autoAlpha: 0 });

    ScrollTrigger.refresh();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=800%",
            pin: true,
            pinSpacing: false,
            scrub: 1
        }
    });

    const exitY = "-2rem";
    const enterDuration = 1;
    const exitDuration = 0.8;
    const pauseDuration = 0.5;

    const animateStepIn = (stepId, position = "<") => {
        if (!cards[stepId]) return;

        const card = cards[stepId];
        const bar = bars[stepId];
        const stepDots = dots[stepId];

        let barX = "0%";
        if (stepId <= 4) {
            if (stepId === 1) barX = "-10%";
            if (stepId === 2) barX = "-20%";
            if (stepId === 3) barX = "-60%";
            if (stepId === 4) barX = "-80%";
        } else if (stepId <= 8) {
            if (stepId === 5) barX = "-70%";
            if (stepId === 6) barX = "-60%";
            if (stepId === 7) barX = "-10%";
            if (stepId === 8) barX = "-20%";
        } else {
            barX = "0%";
        }

        tl.to(card, { opacity: 1, y: 0, visibility: "visible", duration: enterDuration }, position);

        if (bar) {
            tl.to(bar, { x: barX, duration: enterDuration }, "<");
        }
        if (stepDots && stepDots.length) {
            tl.to(stepDots, { autoAlpha: 1, duration: enterDuration }, "<");
        }
    };

    const animateStepOut = (stepId, position = "<") => {
        if (!cards[stepId]) return;

        const card = cards[stepId];
        const stepDots = dots[stepId];

        tl.to(card, { opacity: 0, y: exitY, duration: exitDuration }, position);

        tl.set(card, { visibility: "hidden" });
    };

    if (cards[1]) animateStepIn(1);

    tl.to({}, { duration: 0.2 });
    if (cards[2]) animateStepIn(2);

    tl.to({}, { duration: pauseDuration });

    if (cards[1] || cards[2]) {
        tl.addLabel("exit1-2");
        if (cards[1]) animateStepOut(1, "exit1-2");
        if (cards[2]) animateStepOut(2, "exit1-2");
    }

    tl.to({}, { duration: 0.2 });

    if (cards[3]) { animateStepIn(3); }
    tl.to({}, { duration: 0.2 });
    if (cards[4]) { animateStepIn(4); }

    tl.to({}, { duration: pauseDuration });

    tl.to({}, { duration: 0.1, onStart: playRedMap, onReverseComplete: reverseRedMap });

    tl.to({}, { duration: 1 });

    if (cards[3] || cards[4]) {
        tl.addLabel("exit3-4");
        if (cards[3]) animateStepOut(3, "exit3-4");
        if (cards[4]) animateStepOut(4, "exit3-4");
    }

    tl.addLabel("phase2Start", "+=0.1");

    if (redMapSvg) tl.to(redMapSvg, { autoAlpha: 0.2, duration: 1, ease: "none" }, "phase2Start");
    if (redFillLayer) tl.to(redFillLayer, { autoAlpha: 0, duration: 1, ease: "none" }, "phase2Start");

    const phase1Dots = [...dots[1], ...dots[2], ...dots[3], ...dots[4]].filter(d => d);
    if (phase1Dots.length) {
        tl.to(phase1Dots, { autoAlpha: 0.2, duration: 1, ease: "none" }, "phase2Start");
    }

    if (infoSquare) tl.to(infoSquare, {
        backgroundColor: "#ffffff", duration: 0.5, ease: "none",
        onStart: () => {
            if (infoTitle) {
                infoTitle.innerHTML = '<span id="brand-s1-mobile" style="color:#62B0FF">KULBIT</span> <span id="brand-s2-mobile" style="color:#ffffff">AI-Elevated Production</span>';
                gsap.to("#brand-s1-mobile", { duration: 1, scrambleText: { text: "KULBIT", chars: "upperCase", speed: 0.3 } });
                gsap.to("#brand-s2-mobile", { duration: 1.5, delay: 0.2, scrambleText: { text: "AI-Elevated Production", chars: "upperCase", speed: 0.3 } });
            }
        },
        onReverseComplete: () => {
            if (infoTitle) infoTitle.textContent = originalTitleText;
        }
    }, "phase2Start");

    if (infoTitleWrapper) tl.to(infoTitleWrapper, { width: "100%", duration: 0.5, ease: "none" }, "<");

    tl.to({}, { duration: 0.2 });
    if (cards[5]) { animateStepIn(5); }
    tl.to({}, { duration: 0.2 });
    if (cards[6]) { animateStepIn(6); }
    tl.to({}, { duration: pauseDuration });

    if (cards[5] || cards[6]) {
        tl.addLabel("exit5-6");
        if (cards[5]) animateStepOut(5, "exit5-6");
        if (cards[6]) animateStepOut(6, "exit5-6");
    }
    tl.to({}, { duration: 0.2 });
    if (cards[7]) { animateStepIn(7); }
    tl.to({}, { duration: 0.2 });
    if (cards[8]) { animateStepIn(8); }
    tl.to({}, { duration: pauseDuration });

    tl.to({}, { duration: 0.1, onStart: playBlueMap, onReverseComplete: reverseBlueMap });

    tl.to({}, { duration: 1 });

    if (cards[7] || cards[8]) {
        tl.addLabel("exit7-8");
        if (cards[7]) animateStepOut(7, "exit7-8");
        if (cards[8]) animateStepOut(8, "exit7-8");
    }
    tl.to({}, { duration: 0.2 });
    if (cards[9]) { animateStepIn(9); }
    tl.to({}, { duration: 0.2 });
    if (cards[10]) { animateStepIn(10); }
    tl.to({}, { duration: pauseDuration });

    if (cards[9] || cards[10]) {
        tl.addLabel("exit9-10");
        if (cards[9]) animateStepOut(9, "exit9-10");
        if (cards[10]) animateStepOut(10, "exit9-10");
    }
    tl.to({}, { duration: 0.2 });
    if (cards[11]) { animateStepIn(11); }
    tl.to({}, { duration: 0.2 });
    if (cards[12]) { animateStepIn(12); }
    tl.to({}, { duration: pauseDuration });

    tl.to({}, { duration: 65 });
}

function initMobileServices() {

    const section = document.querySelector('.our-services');
    if (!section) return;

    const textWrapper = section.querySelector('.flex-v.gap--48-48-34');
    const cardsWrapper = section.querySelector('.our-services-cards-main-wrapper');
    const container = section.querySelector('.container.is-stiky');

    if (!textWrapper || !cardsWrapper) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.1,
        }
    });

    gsap.set(cardsWrapper, { display: "flex", flexWrap: "nowrap" });

    tl.to(textWrapper, {
        y: -50,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out"
    }, 0);

    tl.to(cardsWrapper, {
        y: () => {
            const containerRect = container.getBoundingClientRect();
            const cardsRect = cardsWrapper.getBoundingClientRect();

            const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * -3;

            return -(cardsRect.top - containerRect.top) + offset;
        },
        duration: 3,
        ease: "power2.out"
    }, 0);

    const cards = section.querySelectorAll('.our-services-cards-wrapper');

    tl.to(cards, {
        x: () => {

            return -(cardsWrapper.scrollWidth - window.innerWidth + 20);
        },
        duration: 10,
        ease: "none"
    }, ">");
}

function initMobileBenefits() {
    const section = document.querySelector('.benefits');
    if (!section) return;

    const dashedLine = section.querySelector('.benefits-dashed-line.mobile-only svg');
    const graphSvgs = section.querySelectorAll('.benefits-graph-svg svg');
    const traditionalLineSvg = section.querySelectorAll('.traditional-line-svg svg');

    const drawTargets = [
        ...(dashedLine ? [dashedLine] : []),
        ...graphSvgs,
        ...traditionalLineSvg
    ];

    const circles = [
        section.querySelector('.benefits-circle[data-benefit-circle="1"]'),
        section.querySelector('.benefits-circle[data-benefit-circle="2"]'),
        section.querySelector('.benefits-circle[data-benefit-circle="3"]')
    ].filter(el => el);

    const redLine = section.querySelector('.benefits-color-line.is-red');
    const blueLines = section.querySelectorAll('.benefits-color-line:not(.is-red)');

    const weekLabels = section.querySelectorAll('.benefits-week.is-three, .benefits-week.if-four');
    const traditionalText = section.querySelectorAll('.taditional-text');
    const kulbitText = section.querySelector('.kulbit-text-wrapper');

    const textTargets = [...weekLabels, ...traditionalText, ...(kulbitText ? [kulbitText] : [])];

    if (drawTargets.length === 0) return;

    const hiddenClip = "inset(0% 100% 0% 0%)";
    const visibleClip = "inset(0% 0% 0% 0%)";

    gsap.set(drawTargets, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

    gsap.set(circles, { opacity: 0 });

    if (redLine) gsap.set(redLine, { xPercent: -101 });
    if (blueLines.length) gsap.set(blueLines, { xPercent: -101 });

    gsap.set(textTargets, { autoAlpha: 0, y: 20 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 75%",
            markers: false
        }
    });

    tl.to(drawTargets, {
        clipPath: visibleClip,
        webkitClipPath: visibleClip,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0
    });

    if (circles.length > 0) {

        tl.to(circles[0], { opacity: 1, duration: 0.4 }, 0.2);

        if (circles[1]) tl.to(circles[1], { opacity: 1, duration: 0.4 }, 0.6);

        if (circles[2]) tl.to(circles[2], { opacity: 1, duration: 0.4 }, 1.0);
    }

    if (redLine) {
        tl.to(redLine, {
            xPercent: 0,
            duration: 1.0,
            ease: "power2.out"
        }, "-=0.2");
    }

    if (blueLines.length > 0) {
        tl.to(blueLines, {
            xPercent: 0,
            duration: 1.0,
            ease: "power2.out"
        }, "<+=0.4");
    }

    tl.to(textTargets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, ">");
}

function initMobileBenefitsCards() {
    const section = document.querySelector('.benefits');
    const wrapper = document.querySelector('.benefits-cards-wrapper');

    const card1 = wrapper.querySelector('[data-benefit-card="1"]');
    const card2 = wrapper.querySelector('[data-benefit-card="2"]');
    const card3 = wrapper.querySelector('[data-benefit-card="3"]');

    if (!wrapper || !card1 || !card2 || !card3) return;

    gsap.set(wrapper, {
        position: 'sticky',
        height: '100vh',

        overflow: 'visible'
    });

    const cards = [card1, card2, card3];

    gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transformOrigin: '50% 50%'
    });

    gsap.set(card1, { zIndex: 3, scale: 1 });

    gsap.set(card2, { zIndex: 2, scale: 0.5 });

    gsap.set(card3, { zIndex: 1, scale: 0.5 });

    gsap.set(section, { height: "300vh", position: "sticky" });

    const stickyTarget = section.querySelector('.benefits-main-content-wrapper') || wrapper;

    gsap.set(stickyTarget, {
        position: "sticky",
        top: "0px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 5
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: false,
            scrub: 1,

        }
    });

    tl.to(card1, {
        yPercent: 150,
        rotation: 5,

        duration: 1,
        ease: "power2.in"
    });

    tl.to(card2, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut"
    }, "<");

    tl.to(card2, {
        yPercent: 150,
        rotation: 5,

        duration: 1,
        ease: "power2.in"
    });

    tl.to(card3, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut"
    }, "<");
}

function initMobileStageHeading() {
    const heading = document.querySelector('.stage-pre-heading');
    if (!heading) return;

    const splitTextNodesRecursively = (element) => {
        [...element.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                if (text.trim() === '') return;

                const newContent = document.createDocumentFragment();
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0';
                    span.style.transition = 'none';
                    span.dataset.animChar = "true";
                    newContent.appendChild(span);
                });
                element.replaceChild(newContent, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                splitTextNodesRecursively(child);
            }
        });
    };

    if (heading.querySelectorAll('[data-anim-char="true"]').length === 0) {
        splitTextNodesRecursively(heading);
    }

    const chars = heading.querySelectorAll('[data-anim-char="true"]');

    gsap.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            markers: false
        }
    });
}

function initMobileScrambleText() {
    const targets = document.querySelectorAll('[data-scramble="true"]');
    if (!targets.length) return;

    const lockHeight = (el) => {
        const h = el.getBoundingClientRect().height;
        const w = el.getBoundingClientRect().width;
        if (h > 0) {
            el.style.height = `${h}px`;
            el.style.width = `${w}px`;

        }
    };

    const splitTextNode = (node) => {
        const t = node.textContent || "";
        if (!t.length) return [];
        const m = t.match(/^(\s*)([\s\S]*?)(\s*)$/);
        const lead = m ? m[1] : "";
        const core = m ? m[2] : t;
        const trail = m ? m[3] : "";
        if (!core.trim().length) return [];
        const parent = node.parentNode;
        if (!parent) return [];
        const coreNode = document.createTextNode(core);
        const leadNode = lead ? document.createTextNode(lead) : null;
        const trailNode = trail ? document.createTextNode(trail) : null;
        if (leadNode) {
            node.textContent = lead;
            parent.insertBefore(coreNode, node.nextSibling);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
        } else {
            parent.insertBefore(coreNode, node);
            if (trailNode) parent.insertBefore(trailNode, coreNode.nextSibling);
            parent.removeChild(node);
        }
        return [coreNode];
    };

    const getAllTextNodes = (root) => {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        return nodes;
    };

    targets.forEach((el) => {
        lockHeight(el);

        const originalTextNodes = getAllTextNodes(el);
        const animNodes = [];
        originalTextNodes.forEach((n) => {
            const t = n.textContent || "";
            if (!t.trim().length) return;
            if (/^\s|\s$/.test(t)) {
                try {
                    const created = splitTextNode(n);
                    created.forEach((cn) => animNodes.push(cn));
                } catch (e) { }
            } else {
                animNodes.push(n);
            }
        });

        const items = animNodes
            .map((node) => ({ node, text: node.textContent || "" }))
            .filter((it) => it.text.trim().length);

        if (!items.length) return;

        items.forEach((it) => (it.node.textContent = ""));

        const startViewport = el.getAttribute("data-scramble-start") || "95%";
        const duration = parseFloat(el.getAttribute("data-scramble-duration") || "0.9");
        const stagger = parseFloat(el.getAttribute("data-scramble-stagger") || "0.06");

        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: el,
                start: `top ${startViewport}`,
                once: true,
                onEnter: () => tl.play(0),
            },
        });

        items.forEach((it, i) => {
            tl.to(
                it.node,
                {
                    duration,
                    scrambleText: {
                        text: it.text,
                        chars: "01!<>-_\\/[]{}—=+*^?#",
                        revealDelay: 0,
                        speed: 0.6,
                    },
                },
                i * stagger
            );
        });
    });
}

function initMobileStagesAnimation() {
    const section = document.querySelector('.stages');
    if (!section) return;

    const secondWrapper = section.querySelector('[data-anim-stage="second-wrapper"]');
    if (!secondWrapper) return;

    const card1 = secondWrapper.querySelector('[data-anim-card="1"]');
    const card2 = secondWrapper.querySelector('[data-anim-card="2"]');
    const card3 = secondWrapper.querySelector('[data-anim-card="3"]');

    if (!card1 && !card2 && !card3) return;

    // Individual move distances per card (in rem)
    const card1Rem = 2.5;
    const card2Rem = 5;
    const card3Rem = 3.5;

    // Convert rem to px for GSAP
    const remToPx = (rem) => rem * parseFloat(getComputedStyle(document.documentElement).fontSize);

    // The total extra scroll distance needed for the animation (3 steps × 60vh each)
    const scrollPerStep = window.innerHeight * 0.6;
    const totalScroll = scrollPerStep * 3;

    // ─── Sticky-scroll wrapper pattern ───────────────────────────────────────
    // Wrap .stages in a spacer div that is tall enough to hold the animation.
    // The section itself stays sticky inside it, so the next section only
    // scrolls in AFTER the animation is complete.
    const sectionHeight = section.offsetHeight;

    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
        position: -webkit-sticky;
        position: sticky;
        top: 1.5rem;
        height: ${sectionHeight + totalScroll}px;
    `;

    // Insert wrapper before section, then move section inside it
    section.parentNode.insertBefore(wrapper, section);
    wrapper.appendChild(section);

    // Ensure the section is sticky inside the wrapper
    section.style.position = 'sticky';
    section.style.top = '0';
    // ─────────────────────────────────────────────────────────────────────────

    // Set initial states — cards start at y:0, fully visible
    const cards = [card1, card2, card3].filter(Boolean);
    gsap.set(cards, { y: 0, opacity: 1 });

    // Master timeline scrubbed to scroll — trigger is the WRAPPER, not the section
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `bottom bottom`,
            scrub: 1,
            markers: false
        }
    });

    // Step 1 (0 → 1/3 of scroll): each card moves up by its own distance, card 1 fades out
    if (card1) tl.to(card1, { y: `-=${remToPx(card1Rem)}`, duration: 1, ease: "none" }, 0);
    if (card2) tl.to(card2, { y: `-=${remToPx(card2Rem)}`, duration: 1, ease: "none" }, 0);
    if (card3) tl.to(card3, { y: `-=${remToPx(card3Rem)}`, duration: 1, ease: "none" }, 0);

    if (card1) {
        tl.to(card1, { opacity: 0, duration: 0.5, ease: "none" }, 0.5);
    }

    // Step 2 (1/3 → 2/3 of scroll): each card moves up again, card 2 fades out
    if (card1) tl.to(card1, { y: `-=${remToPx(card1Rem)}`, duration: 1, ease: "none" }, 1);
    if (card2) tl.to(card2, { y: `-=${remToPx(card2Rem)}`, duration: 1, ease: "none" }, 1);
    if (card3) tl.to(card3, { y: `-=${remToPx(card3Rem)}`, duration: 1, ease: "none" }, 1);

    if (card2) {
        tl.to(card2, { opacity: 0, duration: 0.5, ease: "none" }, 1.5);
    }

    // Step 3 (2/3 → end of scroll): each card moves up one final time
    if (card1) tl.to(card1, { y: `-=${remToPx(card1Rem)}`, duration: 1, ease: "none" }, 2);
    if (card2) tl.to(card2, { y: `-=${remToPx(card2Rem)}`, duration: 1, ease: "none" }, 2);
    if (card3) tl.to(card3, { y: `-=${remToPx(card3Rem)}`, duration: 1, ease: "none" }, 2);

    // ─── Text / Image swap (same as desktop) ─────────────────────────────────
    const mainCard = section.querySelector('[data-anim-stage="main-card"]');
    if (!mainCard) return;

    // Lock the main card and every child element's dimensions so nothing
    // reflows during text/image swaps
    mainCard.style.height = mainCard.offsetHeight + 'px';
    mainCard.style.overflow = 'hidden';

    mainCard.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) el.style.width = rect.width + 'px';
        if (rect.height > 0) el.style.height = rect.height + 'px';
        el.style.overflow = 'hidden';
    });

    const targetNumber = mainCard.querySelector('[data-stage-target="number"]');
    const targetHeading = mainCard.querySelector('[data-stage-target="heading"]');
    const targetParagraph = mainCard.querySelector('[data-stage-target="paragraph"]');
    const targetImage = mainCard.querySelector('[data-stage-target="image"]');

    const sourceNumber2 = section.querySelector('[data-stage-source="number-2"]');
    const sourceHeading2 = section.querySelector('[data-stage-source="heading-2"]');
    const sourceParagraph2 = section.querySelector('[data-stage-source="paragraph-2"]');
    const sourceImage2 = section.querySelector('[data-stage-source="image-2"]');

    const sourceNumber3 = section.querySelector('[data-stage-source="number-3"]');
    const sourceHeading3 = section.querySelector('[data-stage-source="heading-3"]');
    const sourceParagraph3 = section.querySelector('[data-stage-source="paragraph-3"]');
    const sourceImage3 = section.querySelector('[data-stage-source="image-3"]');

    // Stage line text elements (show/hide per step)
    const stage1Num = section.querySelector('[data-anim-stage-text="num-1"]');
    const stage1Title = section.querySelector('[data-anim-stage-text="title-1"]');
    const stage2Num = section.querySelector('[data-anim-stage-text="num-2"]');
    const stage2Title = section.querySelector('[data-anim-stage-text="title-2"]');
    const stage3Num = section.querySelector('[data-anim-stage-text="num-3"]');
    const stage3Title = section.querySelector('[data-anim-stage-text="title-3"]');

    // Lock dimensions of every element that changes text so nothing reflows
    const lockDimensions = (el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.width > 0) el.style.width = rect.width + 'px';
        if (rect.height > 0) el.style.height = rect.height + 'px';
        el.style.overflow = 'hidden';
    };
    [targetNumber, targetHeading, targetParagraph, stage1Num, stage1Title].forEach(lockDimensions);

    // Stage label texts per stage (read directly from the hidden source elements)
    const labelTexts = {
        1: {
            num: stage1Num ? stage1Num.textContent : '',
            title: stage1Title ? stage1Title.textContent : ''
        },
        2: {
            num: stage2Num ? stage2Num.textContent : '',
            title: stage2Title ? stage2Title.textContent : ''
        },
        3: {
            num: stage3Num ? stage3Num.textContent : '',
            title: stage3Title ? stage3Title.textContent : ''
        }
    };

    // Hide the is-second / is-3 duplicates — we only animate stage1Num/Title
    [stage2Num, stage2Title, stage3Num, stage3Title].filter(Boolean)
        .forEach(el => { el.style.display = 'none'; });

    // Helper: rewrite the visible num/title via typewriter to the target stage's text
    const showStageLabel = (stageIndex) => {
        const texts = labelTexts[stageIndex];
        if (!texts) return;
        if (stage1Num) typewriter(stage1Num, stage1Num.textContent, texts.num);
        if (stage1Title) typewriter(stage1Title, stage1Title.textContent, texts.title);
    };

    // Initial state is already stage 1 — no animation needed

    // Snapshot original stage-1 content
    const orig = {
        number: targetNumber ? targetNumber.textContent : "",
        headingSpan: (targetHeading && targetHeading.querySelector('span'))
            ? targetHeading.querySelector('span').textContent : "",
        paragraph: targetParagraph ? targetParagraph.textContent : "",
        imageSrc: targetImage ? targetImage.src : "",
        imageSrcset: targetImage ? targetImage.srcset : ""
    };

    // Helper: typewriter erase → retype on a DOM text node / element
    const typewriter = (target, fromText, toText) => {
        const tl = gsap.timeline();
        const eraseProxy = { len: fromText.length };
        tl.to(eraseProxy, {
            len: 0, duration: 0.4, ease: "none",
            onUpdate: () => { target.textContent = fromText.substring(0, Math.round(eraseProxy.len)); }
        });
        const typeProxy = { len: 0 };
        tl.to(typeProxy, {
            len: toText.length, duration: 0.6, ease: "none",
            onUpdate: () => { target.textContent = toText.substring(0, Math.round(typeProxy.len)); }
        });
        return tl;
    };

    // Helper: crossfade image swap
    const swapImage = (img, newSrc, newSrcset) => {
        if (!img) return;
        gsap.to(img, {
            opacity: 0, duration: 0.2, onComplete: () => {
                img.src = newSrc;
                if (newSrcset) img.srcset = newSrcset;
                gsap.to(img, { opacity: 1, duration: 0.2 });
            }
        });
    };

    // Helper: swap all content for a given stage
    const swapToStage = (num, headingSpan, paragraph, imgSrc, imgSrcset, stageIndex) => {
        if (targetNumber) typewriter(targetNumber, targetNumber.textContent, num);
        if (targetHeading) {
            const sp = targetHeading.querySelector('span');
            if (sp) typewriter(sp, sp.textContent, headingSpan);
        }
        if (targetParagraph) typewriter(targetParagraph, targetParagraph.textContent, paragraph);
        swapImage(targetImage, imgSrc, imgSrcset);

        // Rewrite stage line labels via typewriter
        showStageLabel(stageIndex);
    };

    // The wrapper scroll is divided into 3 equal thirds.
    // Step boundary 1 = at 1/3 of wrapper height from top of wrapper
    // Step boundary 2 = at 2/3 of wrapper height from top of wrapper
    const wrapperH = sectionHeight + totalScroll;
    const step1Offset = wrapperH / 3;
    const step2Offset = (wrapperH / 3) * 2;

    // ── Swap content the instant a card becomes fully invisible ──────────────
    // We hook into the main scrubbed timeline's onUpdate to watch card opacity.
    // The moment card1 opacity reaches 0 → swap to stage 2.
    // The moment card2 opacity reaches 0 → swap to stage 3.
    // Flags prevent repeated swaps on the same crossing.
    let stage2Swapped = false;
    let stage3Swapped = false;

    tl.eventCallback('onUpdate', () => {
        const card1Opacity = card1 ? gsap.getProperty(card1, 'opacity') : 1;
        const card2Opacity = card2 ? gsap.getProperty(card2, 'opacity') : 1;
        const isForward = tl.scrollTrigger ? tl.scrollTrigger.direction === 1 : true;

        // Card 1 fully gone → swap to stage 2
        if (isForward && !stage2Swapped && card1Opacity <= 0) {
            stage2Swapped = true;
            stage3Swapped = false;
            if (sourceNumber2 && sourceHeading2 && sourceParagraph2 && sourceImage2) {
                swapToStage(
                    sourceNumber2.textContent,
                    sourceHeading2.querySelector('span') ? sourceHeading2.querySelector('span').textContent : sourceHeading2.textContent,
                    sourceParagraph2.textContent,
                    sourceImage2.src, sourceImage2.srcset,
                    2
                );
            }
        }

        // Card 2 fully gone → swap to stage 3
        if (isForward && !stage3Swapped && card2Opacity <= 0) {
            stage3Swapped = true;
            if (sourceNumber3 && sourceHeading3 && sourceParagraph3 && sourceImage3) {
                swapToStage(
                    sourceNumber3.textContent,
                    sourceHeading3.querySelector('span') ? sourceHeading3.querySelector('span').textContent : sourceHeading3.textContent,
                    sourceParagraph3.textContent,
                    sourceImage3.src, sourceImage3.srcset,
                    3
                );
            }
        }

        // Scrolling back: card 2 reappears → restore stage 2
        if (!isForward && stage3Swapped && card2Opacity > 0) {
            stage3Swapped = false;
            if (sourceNumber2 && sourceHeading2 && sourceParagraph2 && sourceImage2) {
                swapToStage(
                    sourceNumber2.textContent,
                    sourceHeading2.querySelector('span') ? sourceHeading2.querySelector('span').textContent : sourceHeading2.textContent,
                    sourceParagraph2.textContent,
                    sourceImage2.src, sourceImage2.srcset,
                    2
                );
            }
        }

        // Scrolling back: card 1 reappears → restore stage 1
        if (!isForward && stage2Swapped && card1Opacity > 0) {
            stage2Swapped = false;
            swapToStage(
                orig.number, orig.headingSpan, orig.paragraph,
                orig.imageSrc, orig.imageSrcset,
                1
            );
        }
    });
    // ─────────────────────────────────────────────────────────────────────────
}

function initMobileTeamAnimation() {
    const section = document.querySelector('.team');
    if (!section) return;

    // ── ✏️ CONFIGURABLE: distance grids move upward ───────────────────────
    const GRID_MOVE_REM = '120rem'; // ← змінюй цей рядок
    // ─────────────────────────────────────────────────────────────────────

    const headLeft = section.querySelector('.team-head-left');
    const headRight = section.querySelector('.team-head-right');
    const headRightSecond = section.querySelector('.team-head-right-second');
    const cardsWrapper = section.querySelector('.team-cards-wrapper');
    const blurTop = section.querySelectorAll('.team-blur-top');
    const gridWrappers = section.querySelectorAll('[data-team-move="1"], [data-team-move="2"]');

    // ── Section stays sticky (never fixed) ───────────────────────────────
    // The parent provides the extra scroll height; section sticks at top.
    gsap.set(section, { position: 'sticky', top: 0 });
    const parent = section.parentElement;
    if (parent) gsap.set(parent, { minHeight: '1200vh' });

    // ── Initial states ────────────────────────────────────────────────────
    if (headRight) gsap.set(headRight, { opacity: 0, y: 60 });
    if (cardsWrapper) gsap.set(cardsWrapper, { opacity: 0, y: 60 });
    if (headRightSecond) gsap.set(headRightSecond, { opacity: 0 });
    if (blurTop.length) gsap.set(blurTop, { opacity: 0 });

    // ── Split headRightSecond into char spans for typewriter ─────────────
    const chars = [];
    if (headRightSecond) {
        const wrapChars = (node) => {
            [...node.childNodes].forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    const text = child.textContent;
                    if (!text) return;
                    const frag = document.createDocumentFragment();
                    [...text].forEach(ch => {
                        const s = document.createElement('span');
                        s.textContent = ch;
                        s.style.opacity = '0';
                        frag.appendChild(s);
                        chars.push(s);
                    });
                    child.replaceWith(frag);
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    wrapChars(child);
                }
            });
        };
        wrapChars(headRightSecond);
    }

    // ── Scrub timeline — trigger on parent, NO pin ────────────────────────
    const D = 10;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: parent || section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
            markers: false
        }
    });

    // A) team-head-left slides up + fades out
    if (headLeft) {
        tl.to(headLeft, { y: -60, opacity: 0, duration: D * 0.15, ease: 'power2.in' }, 0);
        tl.set(headLeft, { display: 'none' }, D * 0.15);
    }

    // B) headRightSecond becomes visible, chars type in one by one
    if (headRightSecond) {
        tl.set(headRightSecond, { opacity: 1 }, D * 0.15);
        if (chars.length) {
            const charStagger = (D * 0.38) / chars.length;
            tl.to(chars, { opacity: 1, duration: 0.001, stagger: charStagger, ease: 'none' }, D * 0.15);
        }
    }

    // C) headRightSecond: quick fade out
    if (headRightSecond) {
        tl.to(headRightSecond, { opacity: 0, duration: D * 0.07, ease: 'power2.in' }, D * 0.55);
    }

    // D) team-head-right slides from bottom + opacity
    if (headRight) {
        tl.to(headRight, { opacity: 1, y: 0, duration: D * 0.12, ease: 'power2.out' }, D * 0.65);
    }

    // E) team-cards-wrapper with small delay
    if (cardsWrapper) {
        tl.to(cardsWrapper, { opacity: 1, y: 0, duration: D * 0.12, ease: 'power2.out' }, D * 0.72);
    }

    // F) team-blur-top fades in — small gap after cards wrapper
    if (blurTop.length) {
        tl.to(blurTop, { opacity: 1, duration: D * 0.08, ease: 'power2.out' }, D * 0.82);
    }

    // G) data-team-move grids scroll upward — faster movement, earlier start
    if (gridWrappers.length) {
        tl.to(gridWrappers, {
            y: `-${GRID_MOVE_REM}`,
            duration: D * 0.15, // Faster check
            ease: 'none'
        }, D * 0.85);
    }

    // H) Hold logic — big gap at the end where nothing happens (animation finished)
    // The previous total duration was around D (10). Adding D * 1.5 (15) makes total ~25.
    // So animation takes ~40% of scroll, rest is empty scroll.
    tl.to({}, { duration: D * 0.15 });
}

function initSmoothScrollMobile() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (!href || href === "#") return;

            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                // Small delay to ensure Webflow doesn't override
                setTimeout(() => {
                    const pinSpacer = target.closest(".pin-spacer");
                    const scrollTarget = pinSpacer || target;

                    // If it's the Home anchor or hero section, scroll to absolute top
                    if (targetId.toLowerCase() === 'home' || target.classList.contains('hero')) {
                        if (window.lenis) {
                            window.lenis.scrollTo(0, { offset: 0, immediate: false });
                        } else if (gsap.plugins.scrollTo) {
                            gsap.to(window, { duration: 1, scrollTo: 0, ease: "power2.out" });
                        } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        return;
                    }

                    // Calculate direction based on target's position relative to the viewport.
                    // If top is positive, the target is below us (scrolling down).
                    const targetRectTop = scrollTarget.getBoundingClientRect().top;
                    const isScrollingDown = targetRectTop > 0;

                    // Get header height for offset, apply only if scrolling DOWN
                    const header = document.querySelector('.header');
                    const offsetAmount = (header && isScrollingDown) ? header.offsetHeight : 0;

                    if (window.lenis) {
                        // Lenis offset is negative to scroll less
                        window.lenis.scrollTo(scrollTarget, { offset: -offsetAmount, immediate: false });
                    }

                    else if (gsap.plugins.scrollTo) {
                        gsap.to(window, {
                            duration: 1,
                            scrollTo: { y: scrollTarget, offsetY: offsetAmount },
                            ease: "power2.out"
                        });
                    }

                    else {
                        // Native smooth scroll fallback with conditional offset
                        const targetPosition = targetRectTop + window.scrollY - offsetAmount;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    });
}

function initDynamicAnchorsMobile() {
    const anchorMap = {
        "Home": ".hero",
        "Clients": ".our-ambassadors",
        "Cases": ".cases",
        "Team": ".team",
        "what-we-provide": ".our-services",
        "Footer": ".footer"
    };

    // Note: This must run BEFORE GSAP ScrollTriggers are initialized so that the anchor is
    // placed before any pin-spacers are created. That way it naturally tracks the true top.
    document.querySelectorAll('.dynamic-anchor').forEach(el => el.remove());

    for (const [id, selector] of Object.entries(anchorMap)) {
        const section = document.querySelector(selector);
        if (section) {
            const existingId = document.getElementById(id);
            if (existingId && !existingId.classList.contains('dynamic-anchor')) {
                existingId.removeAttribute('id');
            }

            const anchor = document.createElement('div');
            anchor.id = id;
            anchor.classList.add('dynamic-anchor');
            // Insert in document flow with 0 height so it naturally tracks page resizes
            anchor.style.cssText = 'position: relative; top: 0; left: 0; width: 100%; height: 0; visibility: hidden; pointer-events: none; opacity: 0;';

            section.parentNode.insertBefore(anchor, section);
        }
    }
}

function initMobileMenuClose() {
    const menuWrapper = document.querySelector('.menu-wrapper');
    const burgerBtn = document.querySelector('.burger-button');

    if (!menuWrapper || !burgerBtn) return;

    // 1. Listen for clicks on links or buttons inside the menu
    const interactables = menuWrapper.querySelectorAll('a, button, [role="button"]');
    interactables.forEach(el => {
        el.addEventListener('click', () => {
            burgerBtn.click();
        });
    });

    // 2. Listen for clicks on the background (wrapper itself)
    menuWrapper.addEventListener('click', (e) => {
        // If the user clicked directly on the wrapper (the empty background)
        // and not on a child element, close the menu
        if (e.target === menuWrapper) {
            burgerBtn.click();
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {

    ScrollTrigger.matchMedia({
        "(max-width: 991px)": function () {
            if (typeof initPreloader === 'function') initPreloader();
            // Generate anchors BEFORE animations so they are outside GSAP pin-spacers
            initDynamicAnchorsMobile();
            initMobileAnimations();
            initSmoothScrollMobile();
            initMobileMenuClose();
        }
    });
});

function initScrollDisableLogic() {
    const elements = document.querySelectorAll('[scroll-disable-element]');
    if (!elements.length) return;

    elements.forEach(el => {
        el.dataset.scrollLocked = 'false';
        el.dataset.prevOpacity = '0';
    });

    const checkScroll = () => {
        let isAnyVisible = false;
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            const opacity = parseFloat(style.opacity || '1');
            const display = style.display;
            const visibility = style.visibility;

            let isLocked = el.dataset.scrollLocked === 'true';

            if (display === 'none' || visibility === 'hidden' || opacity === 0) {
                isLocked = false;
            } else if (opacity > 0.95) {
                isLocked = true;
            } else {
                const prevOpacity = parseFloat(el.dataset.prevOpacity || '0');
                if (opacity < prevOpacity) {
                    // Element is fading out — instantly unlock scroll
                    isLocked = false;
                } else if (opacity > prevOpacity) {
                    // Element is fading in — instantly lock scroll
                    isLocked = true;
                }
            }

            el.dataset.prevOpacity = opacity;
            el.dataset.scrollLocked = isLocked ? 'true' : 'false';

            if (isLocked) {
                isAnyVisible = true;
            }
        });

        if (isAnyVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    const observer = new MutationObserver(checkScroll);
    elements.forEach(el => {
        observer.observe(el, { attributes: true, attributeFilter: ['style', 'class'] });
    });

    checkScroll();
}

function initMobileCasesAnimation() {
    const section = document.querySelector('.cases');
    if (!section) return;

    const progressLine = section.querySelector('.progress-bar-cases-anim .progress-bar-white-line');
    const textCase = section.querySelector('.text-case');
    const card1 = section.querySelector('[data-case-video="1"], [data-case-video="2"]');
    // On mobile: wrappers by order — explicitly set to 1, 3, 2 as requested
    const allCards = [
        section.querySelector('[data-case-video="1"]'),
        section.querySelector('[data-case-video="3"]'),
        section.querySelector('[data-case-video="2"]')
    ].filter(el => el !== null);

    // ── Progress bar: top bottom → top top (same logic as desktop) ────────
    if (progressLine) {
        gsap.set(progressLine, { xPercent: -100 });
        gsap.to(progressLine, {
            xPercent: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
                markers: false
            }
        });
    }

    // ── text-case: split into chars, reveal at 20% of progress bar ────────
    let textChars = [];
    if (textCase) {
        const raw = textCase.textContent;
        textCase.textContent = '';
        [...raw].forEach(ch => {
            const s = document.createElement('span');
            s.textContent = ch;
            textCase.appendChild(s);
            textChars.push(s);
        });
        gsap.set(textChars, { opacity: 0 });
    }

    if (textChars.length) {
        const D = 10;
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top top',
                scrub: 1,
                markers: false
            }
        });
        const charStagger = (D * 0.07) / textChars.length;
        tl.to(textChars, {
            opacity: 1,
            duration: 0.001,
            stagger: charStagger,
            ease: 'none'
        }, D * 0.20);
    }

    // ── Cards: each slides in from bottom + opacity, one after another ────
    allCards.forEach((card, i) => {
        gsap.set(card, { opacity: 0, y: 60 });
        ScrollTrigger.create({
            trigger: card,
            start: 'top 85%',
            markers: false,
            onEnter: () => {
                gsap.to(card, {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out'
                });
            },
            onLeaveBack: () => {
                // Pause video and show poster when scrolling back up past the card
                const iframe = card.querySelector('iframe');
                const poster = card.querySelector('.video-poster');
                const button = card.querySelector('.vide-case-button');

                if (poster) gsap.set(poster, { display: '', opacity: 1, pointerEvents: 'auto' });
                if (button) gsap.set(button, { display: '', opacity: 1, pointerEvents: 'auto' });
                if (iframe && iframe.contentWindow) {
                    iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
                }

                // Hide the card again
                gsap.to(card, {
                    opacity: 0,
                    y: 60,
                    duration: 0.5,
                    ease: 'power2.in'
                });
            }
        });
    });

    // ── Global trigger: when .our-services reaches top, pause all videos ──
    const servicesSection = document.querySelector('.our-services');
    if (servicesSection) {
        ScrollTrigger.create({
            trigger: servicesSection,
            start: 'top top',
            onEnter: () => {
                // Pause all videos
                document.querySelectorAll('iframe').forEach(iframe => {
                    if (iframe.contentWindow) {
                        iframe.contentWindow.postMessage(JSON.stringify({ method: 'pause' }), '*');
                    }
                });

                // Show all posters and play buttons
                document.querySelectorAll('.video-poster').forEach(poster => {
                    gsap.set(poster, { display: '', opacity: 1, pointerEvents: 'auto' });
                });
                document.querySelectorAll('.vide-case-button').forEach(btn => {
                    gsap.set(btn, { display: '', opacity: 1, pointerEvents: 'auto' });
                });
            }
        });
    }
}
