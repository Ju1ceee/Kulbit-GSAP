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
            initMobileScrambleText();
            initMobileTeamAnimation();
            initMobileFooterParallax();
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
                } catch (e) {  }
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

function initMobileTeamAnimation() {
    const section = document.querySelector('.team');
    const teamHeading = section ? section.querySelector('.team-head-right-second') : null;

    if (!section || !teamHeading) return;

    const teamHeadRight = section.querySelector('.team-head-right');
    const teamCards = section.querySelector('.team-cards-wrapper');
    const teamBottomSection = section.querySelector('.team-head-right-bottom');

    const elementsToHide = [teamHeadRight, teamCards].filter(el => el);
    gsap.set(elementsToHide, { opacity: 0, y: 30 }); 
    if (teamBottomSection) gsap.set(teamBottomSection, { opacity: 0 });

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

    if (teamHeading.querySelectorAll('[data-anim-char="true"]').length === 0) {
        splitTextNodesRecursively(teamHeading);
    }

    const chars = teamHeading.querySelectorAll('[data-anim-char="true"]');

    gsap.to(chars, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            
            start: "top 70%", 
            end: "top top",   
            scrub: true,
            markers: false
        }
    });
}

function initMobileFooterParallax() {
    const teamSection = document.querySelector('.team');
    const footer = document.querySelector('.footer');

    if (!teamSection || !footer) return;

    const teamHeight = teamSection.offsetHeight;

    gsap.set(footer, {
        zIndex: 10,
        position: "relative",
        marginTop: teamHeight 
    });

    const footerArrivalGap = 1100; 

    gsap.set(footer, {
        marginTop: teamHeight + footerArrivalGap
    });
    gsap.set(teamSection, {
        zIndex: 1,
        position: "relative" 
    });

    const teamContent = teamSection.querySelector('.container') || teamSection.children;

    ScrollTrigger.create({
        trigger: teamSection,
        start: "top top", 
        end: `+=${footer.offsetHeight + teamHeight + 1000 + footerArrivalGap}`, 
        pin: true,
        pinSpacing: false,
        scrub: true,
    });

    const teamHeadLeft = teamSection.querySelector('.team-head-left');
    const teamHeadRightSecond = teamSection.querySelector('.team-head-right-second');

    if (teamHeadLeft && teamHeadRightSecond) {
        const textExitTl = gsap.timeline({
            scrollTrigger: {
                trigger: teamSection, 
                start: "top top+=50", 
                end: `+=${footer.offsetHeight + teamHeight + 1000 + footerArrivalGap}`, 
                scrub: true
            }
        });

        textExitTl.to(teamHeadLeft, {
            opacity: 0,
            duration: 0.3,
            ease: "none"
        });

        textExitTl.to(teamHeadRightSecond, {
            y: -100, 
            opacity: 0,
            duration: 1,
            ease: "none"
        }, "<0.1"); 

        const teamHeadRight = teamSection.querySelector('.team-head-right');
        const teamCardsWrapper = teamSection.querySelector('.team-cards-wrapper');
        const teamGridWrapper = teamSection.querySelector('.team-grid-wrapper');
        const teamBlurTop = teamSection.querySelectorAll('.team-blur-top');

        const teamGridWrapperOffset = "-70rem";

        if (teamHeadRight) gsap.set(teamHeadRight, { y: 100, opacity: 0 });
        if (teamCardsWrapper) gsap.set(teamCardsWrapper, { y: 100, opacity: 0 });
        if (teamBlurTop.length) gsap.set(teamBlurTop, { opacity: 0 });

        if (teamHeadRight) {
            textExitTl.to(teamHeadRight, {
                y: "-5rem",
                opacity: 1,
                duration: 1,
                ease: "none"
            }, ">-0.2");
        }

        if (teamCardsWrapper) {
            textExitTl.to(teamCardsWrapper, {
                y: "-20rem",
                opacity: 1,
                duration: 1,
                ease: "none"
            }, "<"); 
        }

        if (teamHeadRight && teamCardsWrapper) {
            
            textExitTl.to(teamHeadRight, {
                y: "-15rem", 
                opacity: 0,
                duration: 0.3, 
                ease: "none"
            }, ">+0.3"); 

            textExitTl.to(teamCardsWrapper, {
                y: "-32rem",
                duration: 1,
                ease: "none"
            }, "<"); 

            if (teamBlurTop.length) {
                textExitTl.to(teamBlurTop, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "none"
                }, ">"); 
            }

            if (teamGridWrapper) {
                textExitTl.to(teamGridWrapper, {
                    y: teamGridWrapperOffset,
                    duration: 4, 
                    ease: "none"
                }, ">"); 
            }

            textExitTl.to({}, { duration: 2 });
        }
    }

    gsap.to(teamContent, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
            trigger: footer,
            start: "top bottom",
            end: "top top",
            scrub: true
        }
    });
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

                const pinSpacer = target.closest(".pin-spacer");
                const scrollTarget = pinSpacer || target;

                if (window.lenis) {
                    window.lenis.scrollTo(scrollTarget, { offset: 0, immediate: false });
                }
                
                else if (gsap.plugins.scrollTo) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: scrollTarget, offsetY: 0 },
                        ease: "power2.out"
                    });
                }
                
                else {
                    scrollTarget.scrollIntoView({ behavior: 'smooth' });
                }
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
        "what-we-provide": ".our-services"
    };

    function updateAnchors() {
        
        document.querySelectorAll('.dynamic-anchor').forEach(el => el.remove());

        for (const [id, selector] of Object.entries(anchorMap)) {
            const section = document.querySelector(selector);
            if (section) {
                const existingId = document.getElementById(id);
                if (existingId && !existingId.classList.contains('dynamic-anchor')) {
                    existingId.removeAttribute('id');
                }

                const rect = section.getBoundingClientRect();
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const absoluteTop = rect.top + scrollTop;

                const anchor = document.createElement('div');
                anchor.id = id;
                anchor.classList.add('dynamic-anchor');
                anchor.style.position = 'absolute';
                anchor.style.top = `${absoluteTop}px`;
                anchor.style.left = '0';
                anchor.style.width = '1px';
                anchor.style.height = '1px';
                anchor.style.visibility = 'hidden';
                anchor.style.pointerEvents = 'none';

                document.body.appendChild(anchor);
            }
        }
    }

    window.addEventListener('load', updateAnchors);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateAnchors, 200);
    });

    if (document.readyState === 'complete') {
        updateAnchors();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    ScrollTrigger.matchMedia({
        "(max-width: 991px)": function () {
            initMobileAnimations();
            initSmoothScrollMobile();
            initDynamicAnchorsMobile();
        }
    });
});

function initScrollDisableLogic() {
    const elements = document.querySelectorAll('[scroll-disable-element]');
    if (!elements.length) return;

    const checkScroll = () => {
        let isAnyVisible = false;
        elements.forEach(el => {
            const style = window.getComputedStyle(el);
            if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0') {
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
