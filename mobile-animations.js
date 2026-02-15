/**
 * Mobile-Specific Animations (max-width: 479px)
 * Handles interactions for mobile devices separate from desktop logic.
 */

// Register GSAP plugins (ensure they are loaded)
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

function initMobileAnimations() {
    if (window.hasInitMobileAnimations) return;
    window.hasInitMobileAnimations = true;

    // console.log("Initializing Mobile Animations...");

    // MatchMedia for Mobile Only (max-width: 479px)
    const mm = ScrollTrigger.matchMedia();

    mm.add("(max-width: 479px)", () => {
        // console.log("Mobile context active (<= 479px)");

        // --- Mobile Specific Animations Start Here ---

        // 1. Hero Section Mobile
        initMobileHero();

        // 2. Ambassadors Section Mobile
        initMobileAmbassadors();

        // 3. Process Section Mobile
        initMobileProcess();

        // 4. Team Section Mobile
        initMobileServices();

        // 5. Benefits Section Mobile
        initMobileBenefits();
        initMobileBenefitsCards();
        initMobileStageHeading();
        initMobileScrambleText();
        initMobileTeamAnimation();

        initMobileFooterParallax();

        // Mobile-only utilities
        initHeroVideoPause();
        initSmoothScrollMobile();
        initDynamicAnchorsMobile();
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
        markers: false
    });
}

function initMobileHero() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) {
        console.warn("Mobile Hero: .section-hero NOT found!");
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
        // Move content down (ends at 80% of scroll to leave gap)
        tl.to(heroContent, { y: "120%", ease: "none", duration: 0.8 }, 0);
    }

    if (heroGradient) {
        // Move gradient down (ends at 80%)
        tl.to(heroGradient, { y: "220%", ease: "none", duration: 0.8 }, 0);
    }

    if (videoElements.length > 0) {
        // Expand video height (ends at 80%)
        tl.to(videoElements, { height: "100vh", ease: "none", duration: 0.8 }, 0);
    }

    if (videoMask) {
        // Fade out video mask at the end (from 80% to 100%)
        // This creates the gap before next section arrives
        tl.to(videoMask, { opacity: 0, ease: "none", duration: 0.2 }, 0.8);
    }
}

function initMobileAmbassadors() {
    const section = document.querySelector('.our-ambassadors');
    const desktopLogos = document.querySelector('.flex-h.is-brands-logo');

    // Hide desktop logos immediately on mobile
    if (desktopLogos) gsap.set(desktopLogos, { display: "none" });

    if (!section) return;

    // Parent wrapper (to handle height and positioning)
    const wrapper = document.querySelector('.is-brands-logo-mobile');

    // Containers
    const container1 = document.querySelector('[data-anim-ambassadors="mobile-1"]');
    const container2 = document.querySelector('[data-anim-ambassadors="mobile-2"]');

    // Rows in Container 1
    const row1_1 = document.querySelector('[data-anim-ambassadors="mobile-1-1"]');
    const row1_2 = document.querySelector('[data-anim-ambassadors="mobile-1-2"]');

    // Rows in Container 2
    const row2_1 = document.querySelector('[data-anim-ambassadors="mobile-2-1"]');
    const row2_2 = document.querySelector('[data-anim-ambassadors="mobile-2-2"]');
    const row2_3 = document.querySelector('[data-anim-ambassadors="mobile-2-3"]');
    const row2_4 = document.querySelector('[data-anim-ambassadors="mobile-2-4"]');

    if (!container1 || !container2 || !wrapper) return;

    // --- Layout Setup for Overlap ---
    // 1. Set wrapper to relative and fixed height
    // Prevent layout collapse by forcing relative position and explicit height based on content
    const initialHeight = wrapper.offsetHeight || 300;
    gsap.set(wrapper, { position: "relative", height: initialHeight, display: "block" });

    // 2. Set Containers to Absolute (top left)
    gsap.set([container1, container2], {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    // 3. Set Rows to Absolute (so they occupy same space)
    const allRows = [row1_1, row1_2, row2_1, row2_2, row2_3, row2_4].filter(r => r);
    gsap.set(allRows, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    // --- Initial States ---
    const startY = 20;
    const exitY = -20;

    // Default: Hide everything first
    gsap.set([container2, row1_2, row2_2, row2_3, row2_4], { opacity: 0, y: startY, visibility: "hidden" });

    // Show start elements
    gsap.set(container1, { opacity: 1, y: 0, visibility: "visible" });
    gsap.set(row1_1, { opacity: 1, y: 0, visibility: "visible" });
    gsap.set(row2_1, { opacity: 1, y: 0, visibility: "visible" }); // Visible inside hidden container2

    // --- Timeline ---

    // Ensure scrollTrigger refreshes after layout changes
    ScrollTrigger.refresh();

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%", // Longer scroll distance for pinned sequence
            pin: true,
            pinSpacing: false, // Prevent empty space after pin
            scrub: true
        }
    });

    // Phase 1: Swap 1-1 with 1-2
    if (row1_1 && row1_2) {
        tl.to(row1_1, { opacity: 0, y: exitY, duration: 1 })
            .to(row1_2, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    // Phase 2: Swap Container 1 with Container 2
    tl.to(container1, { opacity: 0, y: exitY, duration: 1 }, "+=0.5");

    tl.set(container1, { visibility: "hidden" })
        .set(container2, { visibility: "visible" })
        .to(container2, { opacity: 1, y: 0, duration: 1 });

    // Phase 3: Sequential swaps in Container 2

    // 2-1 exits, 2-2 enters
    if (row2_1 && row2_2) {
        tl.to(row2_1, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_2, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    // 2-2 exits, 2-3 enters
    if (row2_3) {
        tl.to(row2_2, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_3, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    // 2-3 exits, 2-4 enters
    if (row2_4) {
        tl.to(row2_3, { opacity: 0, y: exitY, duration: 1 }, "+=0.5")
            .to(row2_4, { opacity: 1, y: 0, visibility: "visible", duration: 1 }, "<0.2");
    }

    // Add gap at the end to let the last animation be visible
    tl.to({}, { duration: 1.5 }, "+=1.5");
}

function initMobileProcess() {
    const section = document.querySelector('.proces');
    if (!section) return;

    const wrapper = section.querySelector('.process-info-red-wrapper');
    if (!wrapper) return;

    // --- Select Elements for SVG/Branding Animations ---
    const redMaskPath = document.getElementById('mask-path');
    const redFillLayer = document.getElementById('fill-layer');
    const blueMaskPath = document.getElementById('blue-mask-path');
    const blueFillLayer = document.getElementById('blue-fill-layer');
    const redMapSvg = section.querySelector('.map-svg');

    const infoSquare = section.querySelector('.process-info-square');
    const infoTitleWrapper = section.querySelector('.width-180-a-a');
    const infoTitle = section.querySelector('.process-info-title');
    const originalTitleText = infoTitle ? infoTitle.textContent : "Traditional Production House";

    // --- Select All Cards (1-12) ---
    const cards = {};
    for (let i = 1; i <= 12; i++) {
        cards[i] = section.querySelector(`[data-anim-process-desc="${i}"]`);
    }

    // --- Select Bars (1-8) ---
    const bars = {};
    for (let i = 1; i <= 8; i++) {
        bars[i] = section.querySelector(`[data-anim-process-bar-line="${i}"]`);
    }

    // --- Select Dots (Mapped manually based on design) ---
    const dots = {
        1: [section.querySelector('[data-anim-process-dot="1-1"]')],
        2: [section.querySelector('[data-anim-process-dot="1-5"]')],
        3: [section.querySelector('[data-anim-process-dot="1-2"]'), section.querySelector('[data-anim-process-dot="1-3"]')],
        4: [section.querySelector('[data-anim-process-dot="1-4"]')],
        5: [section.querySelector('[data-anim-process-dot="2-1"]')],
        6: [section.querySelector('[data-anim-process-dot="2-2"]')],
        7: [section.querySelector('[data-anim-process-dot="2-3"]'), section.querySelector('[data-anim-process-dot="2-4"]')],
        8: [section.querySelector('[data-anim-process-dot="2-5"]')],
        // 9-12 have no dots
    };

    // Filter out nulls from arrays
    for (let key in dots) {
        dots[key] = dots[key].filter(d => d);
    }

    // --- Setup Separate Timelines for Maps (Desktop Pattern) ---
    // Red Map Timeline
    let tlRedMap = gsap.timeline({ paused: true });

    // Hide entire Red Map container initially
    if (redMapSvg) gsap.set(redMapSvg, { autoAlpha: 0 });

    if (redMaskPath && redFillLayer && redMapSvg) {
        // Set up dash animation for line
        const redLength = redMaskPath.getTotalLength();
        gsap.set(redMaskPath, { strokeDasharray: redLength, strokeDashoffset: redLength });
        gsap.set(redFillLayer, { autoAlpha: 0 });

        // Show container and draw Line
        tlRedMap.to(redMapSvg, { autoAlpha: 1, duration: 0.1, ease: "none" });
        tlRedMap.to(redMaskPath, { strokeDashoffset: 0, duration: 0.8, ease: "none" }, "<");
        // Fade in Fill
        tlRedMap.to(redFillLayer, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
    }

    const playRedMap = () => { tlRedMap.play(); };
    const reverseRedMap = () => { tlRedMap.reverse(); };

    // Blue Map Timeline
    let tlBlueMap = gsap.timeline({ paused: true });
    if (blueMaskPath && blueFillLayer) {
        // Set up dash animation for line
        const blueLength = blueMaskPath.getTotalLength();
        gsap.set(blueMaskPath, { strokeDasharray: blueLength, strokeDashoffset: blueLength, autoAlpha: 1 });
        gsap.set(blueFillLayer, { autoAlpha: 0 });

        // Draw Line
        tlBlueMap.to(blueMaskPath, { strokeDashoffset: 0, duration: 0.8, ease: "none" });
        // Fade in Fill
        tlBlueMap.to(blueFillLayer, { autoAlpha: 1, duration: 0.05, ease: "power2.out" });
    }

    const playBlueMap = () => { tlBlueMap.play(); };
    const reverseBlueMap = () => {
        tlBlueMap.reverse();
    }

    // --- Layout Setup ---
    gsap.set(wrapper, { position: "relative", minHeight: "22rem", display: "block" });

    // Measure each odd-numbered card and position even cards accordingly
    const cardPositions = {};

    // First, position all odd cards at top: 0
    for (let i = 1; i <= 12; i += 2) {
        if (cards[i]) {
            gsap.set(cards[i], { position: "absolute", top: 0, left: 0, width: "100%", visibility: "visible", opacity: 0 });
            const height = cards[i].offsetHeight;
            cardPositions[i] = { top: 0 };
            cardPositions[i + 1] = { top: `${height - 2}px` }; // Even card overlaps by 2px
            gsap.set(cards[i], { visibility: "hidden" });
        }
    }

    // Now apply all positions with initial animation states
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

    // Initialize Bars & Dots
    const allBars = Object.values(bars).filter(b => b);
    const allDots = Object.values(dots).flat();

    if (allBars.length) gsap.set(allBars, { x: "-100%" });
    if (allDots.length) gsap.set(allDots, { autoAlpha: 0 });


    // --- Timeline ---
    ScrollTrigger.refresh();

    // Calculate duration based on steps. 6 phases.
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=800%",    // Extended for 6 phases + buffer
            pin: true,
            pinSpacing: false, // Prevent empty space after pin
            scrub: 1
        }
    });

    const exitY = "-2rem";
    const enterDuration = 1;
    const exitDuration = 0.8;
    const pauseDuration = 0.5;

    // Helper to Animate Step In
    const animateStepIn = (stepId, position = "<") => {
        if (!cards[stepId]) return;

        const card = cards[stepId];
        const bar = bars[stepId];
        const stepDots = dots[stepId];

        // determine bar target x based on logic
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

    // Helper to Animate Step Out
    const animateStepOut = (stepId, position = "<") => {
        if (!cards[stepId]) return;

        const card = cards[stepId];
        const stepDots = dots[stepId];

        tl.to(card, { opacity: 0, y: exitY, duration: exitDuration }, position);

        // Dots persist (no fade out)
        tl.set(card, { visibility: "hidden" });
    };


    // --- SEQUENCE ---

    // Phase 1: 1 & 2 Enter
    if (cards[1]) animateStepIn(1);

    tl.to({}, { duration: 0.2 });
    if (cards[2]) animateStepIn(2);

    tl.to({}, { duration: pauseDuration });


    // --- Swap 1&2 -> 3&4 ---
    // Ensure 1 and 2 exit TOGETHER
    if (cards[1] || cards[2]) {
        tl.addLabel("exit1-2");
        if (cards[1]) animateStepOut(1, "exit1-2");
        if (cards[2]) animateStepOut(2, "exit1-2"); // Strict sync
    }

    tl.to({}, { duration: 0.2 }); // Gap between Out and In

    if (cards[3]) { animateStepIn(3); }
    tl.to({}, { duration: 0.2 });
    if (cards[4]) { animateStepIn(4); }

    tl.to({}, { duration: pauseDuration });

    // === Trigger Red Map after Step 4 (all Phase 1 dots visible) ===
    tl.to({}, { duration: 0.1, onStart: playRedMap, onReverseComplete: reverseRedMap });

    // Pause before Phase 2 transition
    tl.to({}, { duration: 1 });


    // --- Swap 3&4 -> 5&6 ---
    if (cards[3] || cards[4]) {
        tl.addLabel("exit3-4");
        if (cards[3]) animateStepOut(3, "exit3-4");
        if (cards[4]) animateStepOut(4, "exit3-4");
    }

    // === Phase 2 Transition: Branding + Blue Map ===
    tl.addLabel("phase2Start", "+=0.1");

    // Fade Red Map
    if (redMapSvg) tl.to(redMapSvg, { autoAlpha: 0.2, duration: 1, ease: "none" }, "phase2Start");
    if (redFillLayer) tl.to(redFillLayer, { autoAlpha: 0, duration: 1, ease: "none" }, "phase2Start");

    // Fade Phase 1 Dots to 20%
    const phase1Dots = [...dots[1], ...dots[2], ...dots[3], ...dots[4]].filter(d => d);
    if (phase1Dots.length) {
        tl.to(phase1Dots, { autoAlpha: 0.2, duration: 1, ease: "none" }, "phase2Start");
    }

    // Branding: Square Color
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

    // Branding: Title Width
    if (infoTitleWrapper) tl.to(infoTitleWrapper, { width: "100%", duration: 0.5, ease: "none" }, "<");

    tl.to({}, { duration: 0.2 });
    if (cards[5]) { animateStepIn(5); }
    tl.to({}, { duration: 0.2 });
    if (cards[6]) { animateStepIn(6); }
    tl.to({}, { duration: pauseDuration });


    // --- Swap 5&6 -> 7&8 ---
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

    // === Trigger Blue Map after Step 8 (all Phase 2 dots visible) ===
    tl.to({}, { duration: 0.1, onStart: playBlueMap, onReverseComplete: reverseBlueMap });

    // Pause before Phase 3
    tl.to({}, { duration: 1 });


    // --- Swap 7&8 -> 9&10 (Icons) ---
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


    // --- Swap 9&10 -> 11&12 (Icons) ---
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


    // Final Gap
    tl.to({}, { duration: 65 });
}

function initMobileServices() {
    // console.log("Initializing Mobile Services Animation");
    const section = document.querySelector('.our-services');
    if (!section) return;

    // Elements to animate
    const textWrapper = section.querySelector('.flex-v.gap--48-48-34');
    const cardsWrapper = section.querySelector('.our-services-cards-main-wrapper');
    const container = section.querySelector('.container.is-stiky');

    if (!textWrapper || !cardsWrapper) return;

    // Create Timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top", // Start when section hits top
            end: "bottom bottom", // Animate over the full height of the section
            scrub: 0.1, // Slight smoothing
        }
    });

    // Ensure horizontal layout
    gsap.set(cardsWrapper, { display: "flex", flexWrap: "nowrap" });

    // 1. Text Wrapper slides up and fades out quickly (Phase 1)
    // Duration 1 part
    tl.to(textWrapper, {
        y: -50,
        autoAlpha: 0,
        duration: 1,
        ease: "power2.out"
    }, 0);

    // 2. Cards Wrapper slides up to top (Phase 1)
    // synchronized with text fade
    // 2. Cards Wrapper slides up to top (Phase 1)
    // synchronized with text fade
    tl.to(cardsWrapper, {
        y: () => {
            const containerRect = container.getBoundingClientRect();
            const cardsRect = cardsWrapper.getBoundingClientRect();
            // Calculate 0.5rem in pixels
            const offset = parseFloat(getComputedStyle(document.documentElement).fontSize) * -3;
            // Move to top + 0.5rem offset
            return -(cardsRect.top - containerRect.top) + offset;
        },
        duration: 3,
        ease: "power2.out"
    }, 0);

    const cards = section.querySelectorAll('.our-services-cards-wrapper');

    // 3. Horizontal Scroll (Phase 2)
    // Starts after Phase 1 (at time 1)
    // Duration 10 parts (much longer, so vertical feels fast)
    tl.to(cards, {
        x: () => {
            // Move left by total width minus viewport width (plus padding)
            // Animate the CARDS themselves
            return -(cardsWrapper.scrollWidth - window.innerWidth + 20);
        },
        duration: 10,
        ease: "none"
    }, ">"); // Starts immediately after previous tween completes
}


// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initMobileAnimations);

/**
 * ----------------------------------------------------------------------------------
 * Mobile Benefits Animation
 * ----------------------------------------------------------------------------------
 * Reveals all graph SVGs and the traditional line SVG simultaneously when the section appears.
 * Uses a clip-path wipe effect to simulate "drawing".
 */
/**
 * ----------------------------------------------------------------------------------
 * Mobile Benefits Animation
 * ----------------------------------------------------------------------------------
 * Sequence:
 * 1. Draw Dashed Line (Mobile) + Graphs + Traditional Line simultaneously.
 * 2. Reveal Circles 1, 2, 3 sequentially as the line "passes" them.
 * 3. Slide Color Lines (Blue & Red) from left (-100%) to position (0%).
 * 4. Reveal Text Elements (Week Labels, Traditional Text, Kulbit Text).
 */
function initMobileBenefits() {
    const section = document.querySelector('.benefits');
    if (!section) return;

    // --- 1. Select Elements ---

    // SVG Lines to Draw
    // Note: We target the <svg> or its surrounding wrapper if resizing is handled there
    const dashedLine = section.querySelector('.benefits-dashed-line.mobile-only svg');
    const graphSvgs = section.querySelectorAll('.benefits-graph-svg svg');
    const traditionalLineSvg = section.querySelectorAll('.traditional-line-svg svg');

    const drawTargets = [
        ...(dashedLine ? [dashedLine] : []),
        ...graphSvgs,
        ...traditionalLineSvg
    ];

    // Circles (1, 2, 3)
    const circles = [
        section.querySelector('.benefits-circle[data-benefit-circle="1"]'),
        section.querySelector('.benefits-circle[data-benefit-circle="2"]'),
        section.querySelector('.benefits-circle[data-benefit-circle="3"]')
    ].filter(el => el);

    // Color Lines (Red & Blue separate)
    const redLine = section.querySelector('.benefits-color-line.is-red');
    const blueLines = section.querySelectorAll('.benefits-color-line:not(.is-red)');

    // Text Elements
    // "Week 4-8", "Week 16+" are usually is-three and if-four. 
    // We target broadly to capture desktop-only labels if they are made visible on mobile or have mobile equivalents.
    const weekLabels = section.querySelectorAll('.benefits-week.is-three, .benefits-week.if-four');
    const traditionalText = section.querySelectorAll('.taditional-text'); // Targets legacy and new
    const kulbitText = section.querySelector('.kulbit-text-wrapper');

    const textTargets = [...weekLabels, ...traditionalText, ...(kulbitText ? [kulbitText] : [])];

    if (drawTargets.length === 0) return;

    // --- 2. Initial States ---

    const hiddenClip = "inset(0% 100% 0% 0%)";
    const visibleClip = "inset(0% 0% 0% 0%)";

    // Prepare Lines
    gsap.set(drawTargets, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

    // Prepare Circles
    gsap.set(circles, { opacity: 0 });

    // Prepare Color Lines (Off-screen Left)
    if (redLine) gsap.set(redLine, { xPercent: -101 });
    if (blueLines.length) gsap.set(blueLines, { xPercent: -101 });

    // Prepare Texts (Hidden & Offset)
    gsap.set(textTargets, { autoAlpha: 0, y: 20 });


    // --- 3. Animation Timeline ---

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top 75%", // Triggers when top of benefits section hits 75% of viewport
            markers: false
        }
    });

    // Step 1: Draw Lines (Simultaneously)
    // Duration: 1.5s
    tl.to(drawTargets, {
        clipPath: visibleClip,
        webkitClipPath: visibleClip,
        duration: 1.5,
        ease: "power2.out",
        stagger: 0
    });

    // Step 2: Reveal Circles (During Line Draw)
    // Timings are approximations to look like the line is triggering them.
    if (circles.length > 0) {
        // Circle 1: Early (0.2s)
        tl.to(circles[0], { opacity: 1, duration: 0.4 }, 0.2);

        // Circle 2: Mid (0.6s)
        if (circles[1]) tl.to(circles[1], { opacity: 1, duration: 0.4 }, 0.6);

        // Circle 3: Late (1.0s)
        if (circles[2]) tl.to(circles[2], { opacity: 1, duration: 0.4 }, 1.0);
    }

    // Step 3: Slide Red Color Line (Before Draw Ends)
    // Starts 0.2s before draw finishes
    if (redLine) {
        tl.to(redLine, {
            xPercent: 0,
            duration: 1.0,
            ease: "power2.out"
        }, "-=0.2");
    }

    // Step 4: Slide Blue Color Lines (After Red Starts)
    // Starts 0.4s after Red Line starts (Staggered)
    if (blueLines.length > 0) {
        tl.to(blueLines, {
            xPercent: 0,
            duration: 1.0,
            ease: "power2.out"
        }, "<+=0.4"); // Relative to previous tween (Red Line) start
    }

    // Step 5: Reveal Text (After Lines Arrive)
    // Starts immediately after lines finish
    tl.to(textTargets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    }, ">");
}

/**
 * ----------------------------------------------------------------------------------
 * Mobile Benefits Cards Animation
 * ----------------------------------------------------------------------------------
 * Logic:
 * - Cards are stacked (absolute position).
 * - Scroll triggers a sequence:
 *   1. Card 1 falls down (y: 100%), Card 2 scales up (0.5 -> 1).
 *   2. Card 2 falls down, Card 3 scales up (0.5 -> 1).
 * - Wrapper is pinned during this sequence.
 */
function initMobileBenefitsCards() {
    const section = document.querySelector('.benefits');
    const wrapper = document.querySelector('.benefits-cards-wrapper'); // The pinned container
    // We target cards by attribute to ensure correct order
    const card1 = wrapper.querySelector('[data-benefit-card="1"]');
    const card2 = wrapper.querySelector('[data-benefit-card="2"]');
    const card3 = wrapper.querySelector('[data-benefit-card="3"]');

    if (!wrapper || !card1 || !card2 || !card3) return;

    // --- 1. Initial Setup (Stacked Layout) ---
    // Ensure wrapper acts as a positioning context
    gsap.set(wrapper, {
        position: 'sticky',
        height: '100vh', // Ensure enough space or use original height? 
        // Original height is ~35rem. For pinning comfort, maybe keep it but pin trigger carefully.
        // Actually, sticky might conflict if we pin. Let's use GSAP pin.
        // But for absolute children, parent needs relative/absolute.
        overflow: 'visible' // Allow falling cards to be seen? Or hidden? User said "falls", usually implies dropping out.
    });

    // Cards Setup
    const cards = [card1, card2, card3];

    // Position cards absolutely on top of each other
    gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%', // Ensure they fill the wrapper
        transformOrigin: '50% 50%' // Center scaling
    });

    // Initial States
    // Card 1: Front
    gsap.set(card1, { zIndex: 3, scale: 1 });
    // Card 2: Middle (Small)
    gsap.set(card2, { zIndex: 2, scale: 0.5 });
    // Card 3: Back (Small)
    gsap.set(card3, { zIndex: 1, scale: 0.5 });


    // --- 2. Animation Timeline ---

    // --- 2. Animation Timeline ---

    // Manual Sticky Implementation to avoid "jumpy" pin spacers
    // 1. Make the section very tall to allow scrolling
    gsap.set(section, { height: "300vh", position: "sticky" });

    // 2. Make the content sticky so it stays in view while scrolling the tall section
    // Use the main content wrapper for this if possible, or the cards wrapper
    const stickyTarget = section.querySelector('.benefits-main-content-wrapper') || wrapper;

    gsap.set(stickyTarget, {
        position: "sticky",
        top: "0px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically if needed
        zIndex: 5
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom", // Scroll for the full height of the tall section
            pin: false, // DISABLE GSAP PIN
            scrub: 1,
            // markers: true 
        }
    });

    // Phase 1: Card 1 Falls, Card 2 Scales
    tl.to(card1, {
        yPercent: 150, // Move down out of view
        rotation: 5,   // Slight tilt for realism
        // opacity: 0, // REMOVED: User requested cards to stay visible
        duration: 1,
        ease: "power2.in"
    });

    tl.to(card2, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut"
    }, "<"); // Happen simultaneously with Card 1 drop

    // Phase 2: Card 2 Falls, Card 3 Scales
    tl.to(card2, {
        yPercent: 150,
        rotation: 5,
        // opacity: 0, // REMOVED: User requested cards to stay visible
        duration: 1,
        ease: "power2.in"
    });

    tl.to(card3, {
        scale: 1,
        duration: 1,
        ease: "power1.inOut"
    }, "<"); // Simultaneous
}

/**
 * ----------------------------------------------------------------------------------
 * Mobile Stage Pre-Heading Typewriter
 * ----------------------------------------------------------------------------------
 * Replicates the desktop typewriter effect for .stage-pre-heading
 */
function initMobileStageHeading() {
    const heading = document.querySelector('.stage-pre-heading');
    if (!heading) return;

    // Helper to recursively split text nodes into chars (Borrowed from desktop script)
    const splitTextNodesRecursively = (element) => {
        [...element.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                if (text.trim() === '') return;

                const newContent = document.createDocumentFragment();
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0'; // Start hidden
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

    // Prepare text (split into spans) if not already done
    if (heading.querySelectorAll('[data-anim-char="true"]').length === 0) {
        splitTextNodesRecursively(heading);
    }

    const chars = heading.querySelectorAll('[data-anim-char="true"]');

    // Animate
    gsap.to(chars, {
        opacity: 1,
        duration: 0.05,
        stagger: 0.02,
        ease: "none",
        scrollTrigger: {
            trigger: heading,
            start: "top 85%", // Slightly earlier on mobile
            markers: false
        }
    });
}

/**
 * ----------------------------------------------------------------------------------
 * Mobile Scramble Text Animation
 * ----------------------------------------------------------------------------------
 * Replicates the desktop scramble effect for [data-scramble="true"]
 */
function initMobileScrambleText() {
    const targets = document.querySelectorAll('[data-scramble="true"]');
    if (!targets.length) return;

    // Helpers
    const lockHeight = (el) => {
        const h = el.getBoundingClientRect().height;
        const w = el.getBoundingClientRect().width;
        if (h > 0) {
            el.style.height = `${h}px`;
            el.style.width = `${w}px`; // Lock width too if possible
            // el.style.overflow = "hidden"; // Optional, might clip wide chars
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

        // 1. Split text nodes
        const originalTextNodes = getAllTextNodes(el);
        const animNodes = [];
        originalTextNodes.forEach((n) => {
            const t = n.textContent || "";
            if (!t.trim().length) return;
            if (/^\s|\s$/.test(t)) {
                try {
                    const created = splitTextNode(n);
                    created.forEach((cn) => animNodes.push(cn));
                } catch (e) { console.warn("Split error", e); }
            } else {
                animNodes.push(n);
            }
        });

        // 2. Prepare nodes
        const items = animNodes
            .map((node) => ({ node, text: node.textContent || "" }))
            .filter((it) => it.text.trim().length);

        if (!items.length) return;

        items.forEach((it) => (it.node.textContent = ""));

        // Read attributes
        const startViewport = el.getAttribute("data-scramble-start") || "95%"; // Adjusted default for mobile
        const duration = parseFloat(el.getAttribute("data-scramble-duration") || "0.9");
        const stagger = parseFloat(el.getAttribute("data-scramble-stagger") || "0.06");

        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: el,
                start: `top ${startViewport}`, // Trigger earlier on mobile? 'top 95%' is standard
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

/**
 * ----------------------------------------------------------------------------------
 * Mobile Team Section Animation
 * ----------------------------------------------------------------------------------
 * Revealing the team heading text character-by-character on scroll
 */
function initMobileTeamAnimation() {
    const section = document.querySelector('.team');
    const teamHeading = section ? section.querySelector('.team-head-right-second') : null;

    if (!section || !teamHeading) return;

    // Elements to hide initially (matching desktop logic usually, but simplified for mobile if needed)
    // Looking at desktop initTeamAnimation: teamHeadRight, teamCards, teamBottomSection are hidden
    const teamHeadRight = section.querySelector('.team-head-right');
    const teamCards = section.querySelector('.team-cards-wrapper');
    const teamBottomSection = section.querySelector('.team-head-right-bottom');

    // Hide initially
    const elementsToHide = [teamHeadRight, teamCards].filter(el => el);
    gsap.set(elementsToHide, { opacity: 0, y: 30 }); // Slight slide up potential later or just hidden
    if (teamBottomSection) gsap.set(teamBottomSection, { opacity: 0 });

    // Helper to recursively split text nodes into chars (reused)
    const splitTextNodesRecursively = (element) => {
        [...element.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                if (text.trim() === '') return; // keep spaces but don't split empty

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

    // Split text if not already done
    if (teamHeading.querySelectorAll('[data-anim-char="true"]').length === 0) {
        splitTextNodesRecursively(teamHeading);
    }

    const chars = teamHeading.querySelectorAll('[data-anim-char="true"]');

    // Animate Characters
    gsap.to(chars, {
        opacity: 1,
        duration: 0.1,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: {
            trigger: section,
            // Adjust trigger points for mobile view
            start: "top 70%", // Start typing when section reaches 70% of viewport height
            end: "top top",   // Finish typing EXACTLY when section touches top of screen
            scrub: true,
            markers: false
        }
    });
}

/**
 * ----------------------------------------------------------------------------------
 * Mobile Footer Parallax
 * ----------------------------------------------------------------------------------
 * Footer slides OVER the Team section.
 * Team section content fades out, but background stays.
 */
function initMobileFooterParallax() {
    const teamSection = document.querySelector('.team');
    const footer = document.querySelector('.footer');

    if (!teamSection || !footer) return;

    // 1. Setup Z-Index & Margins
    // We want Team to be fixed at top ("Always Sticky")
    // And Footer to slide over it.
    // By disabling pinSpacing, Team becomes fixed and removed from flow.
    // We must push Footer down by Team's height so it starts visually below.
    const teamHeight = teamSection.offsetHeight;

    gsap.set(footer, {
        zIndex: 10,
        position: "relative",
        marginTop: teamHeight // compensating for fixed team
    });

    // Configurable gap before footer arrives
    const footerArrivalGap = 1100; // pixels of scroll where nothing happens before footer covers

    // Add EXTRA margin to footer to push it down further
    gsap.set(footer, {
        marginTop: teamHeight + footerArrivalGap
    });
    gsap.set(teamSection, {
        zIndex: 1,
        position: "relative" // Will be pinned to fixed
    });

    // 2. Content to Fade
    const teamContent = teamSection.querySelector('.container') || teamSection.children;

    // 3. Pin Team Section
    ScrollTrigger.create({
        trigger: teamSection,
        start: "top top", // Stick as soon as it hits top
        end: `+=${footer.offsetHeight + teamHeight + 1000 + footerArrivalGap}`, // Include gap so it stays pinned longer
        pin: true,
        pinSpacing: false,
        scrub: true,
    });

    // 4. Fade Content (General container)
    // We want specific text to move UP and fade out first
    const teamHeadLeft = teamSection.querySelector('.team-head-left');
    const teamHeadRightSecond = teamSection.querySelector('.team-head-right-second');

    // Create a timeline for the text exit sequence
    if (teamHeadLeft && teamHeadRightSecond) {
        const textExitTl = gsap.timeline({
            scrollTrigger: {
                trigger: teamSection, // Use section itself as trigger
                start: "top top+=50", // Start shortly after pinning (typing finishes at top top)
                end: `+=${footer.offsetHeight + teamHeight + 1000 + footerArrivalGap}`, // Include gap so timeline matches pin duration
                scrub: true
            }
        });

        // Team Head Left fades out FIRST and FAST
        textExitTl.to(teamHeadLeft, {
            opacity: 0,
            duration: 0.3,
            ease: "none"
        });

        // Team Head Right (Text) moves up and fades out SLOWER
        textExitTl.to(teamHeadRightSecond, {
            y: -100, // Move up
            opacity: 0,
            duration: 1,
            ease: "none"
        }, "<0.1"); // Start almost simultaneously but last longer


        // 5. Team Content Entry (Head Right + Cards + Blur)
        const teamHeadRight = teamSection.querySelector('.team-head-right');
        const teamCardsWrapper = teamSection.querySelector('.team-cards-wrapper');
        const teamGridWrapper = teamSection.querySelector('.team-grid-wrapper');
        const teamBlurTop = teamSection.querySelectorAll('.team-blur-top');

        // Configurable offset for team-grid-wrapper
        const teamGridWrapperOffset = "-70rem";

        // Initial States
        if (teamHeadRight) gsap.set(teamHeadRight, { y: 100, opacity: 0 });
        if (teamCardsWrapper) gsap.set(teamCardsWrapper, { y: 100, opacity: 0 });
        if (teamBlurTop.length) gsap.set(teamBlurTop, { opacity: 0 });

        // Animate Head Right (Offset -5rem)
        if (teamHeadRight) {
            textExitTl.to(teamHeadRight, {
                y: "-5rem",
                opacity: 1,
                duration: 1,
                ease: "none"
            }, ">-0.2");
        }

        // Animate Cards Wrapper (Offset -2rem - DIFFERENT offset as requested)
        if (teamCardsWrapper) {
            textExitTl.to(teamCardsWrapper, {
                y: "-20rem",
                opacity: 1,
                duration: 1,
                ease: "none"
            }, "<"); // Start with Head Right
        }

        // Reveal Blur - DISABLED per user request
        /*
        if (teamBlurTop.length) {
            textExitTl.to(teamBlurTop, {
                opacity: 1,
                duration: 1,
                ease: "none"
            }, "<");
        }
        */

        // 6. Phase 3: Swap (Head Right exits FAST, Cards take its place)
        if (teamHeadRight && teamCardsWrapper) {
            // Head Right exits VERY FAST
            textExitTl.to(teamHeadRight, {
                y: "-15rem", // Move further up (exit)
                opacity: 0,
                duration: 0.3, // VERY FAST exit
                ease: "none"
            }, ">+0.3"); // Small gap before this phase starts

            // Cards Wrapper moves into position
            // User requested "same offset" as the block disappearing (HeadRight was -5rem)
            textExitTl.to(teamCardsWrapper, {
                y: "-32rem",
                duration: 1,
                ease: "none"
            }, "<"); // Happen together

            // 7. Reveal Blur (After cards are in place) + Move Grid Wrapper
            if (teamBlurTop.length) {
                textExitTl.to(teamBlurTop, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "none"
                }, ">"); // Start after previous animations finish
            }

            if (teamGridWrapper) {
                textExitTl.to(teamGridWrapper, {
                    y: teamGridWrapperOffset,
                    duration: 4, // MUCH slower/longer duration relative to other steps
                    ease: "none"
                }, ">"); // Sequenced AFTER blur
            }

            // Add Empty Gap at End of Timeline (proportional to footerArrivalGap)
            // This ensures animation finishes, then stillness for a while before scroll ends
            textExitTl.to({}, { duration: 2 });
        }
    }

    // Fade out the REST of the content slowly as footer covers (e.g. cards if visible)
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

/**
 * Global Smooth Scroll for Anchor Links (Mobile Context)
 * Handles generic anchors and specfic IDs
 */
function initSmoothScrollMobile() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');


            // Skip empty or invalid hrefs
            if (!href || href === "#") return;

            // Runtime check: Ignore if desktop
            if (window.innerWidth >= 480) return;

            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();

                // Check if target is inside a pin-spacer (GSAP ScrollTrigger)
                // If so, scroll to the spacer's top (start of section)
                const pinSpacer = target.closest(".pin-spacer");
                const scrollTarget = pinSpacer || target;

                // 1. Try Lenis (if available globally)
                if (window.lenis) {
                    window.lenis.scrollTo(scrollTarget, { offset: 0, immediate: false });
                }
                // 2. Try GSAP ScrollToPlugin (if registered)
                else if (gsap.plugins.scrollTo) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: scrollTarget, offsetY: 0 },
                        ease: "power2.out"
                    });
                }
                // 3. Fallback to Native Smooth Scroll
                else {
                    scrollTarget.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}



/**
 * Initialize Dynamic Anchors (Mobile Context)
 * Calculates section positions after load/resize and places absolute divs as anchors.
 */
function initDynamicAnchorsMobile() {
    const anchorMap = {
        "Home": ".hero",
        "Clients": ".our-ambassadors",
        "Cases": ".cases",
        "Team": ".team",
        "What We Provide": ".our-services"
    };

    function updateAnchors() {
        // Remove existing dynamic anchors (handled by global script too, but safe to repeat)
        document.querySelectorAll('.dynamic-anchor').forEach(el => el.remove());

        // Runtime check: Ignore if desktop
        if (window.innerWidth >= 480) return;

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

// Initialize when DOM is ready
// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    initMobileAnimations();
});
