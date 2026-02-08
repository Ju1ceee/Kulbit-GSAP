// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Main initialization function for all site animations
 * This allows us to separate logic for each section
 */
function initAnimations() {
    console.log("Initializing GSAP Animations...");

    // Initialize specific section animations
    initPreloader(); // Run Preloader first
    initHeroAnimation();
    initScrambleText(); // Initialize Scramble effects
    // initAmbassadorsAnimation();
    initAmbassadorsAnimationV2();
    initStageSecondAnimation();
    initStagesAnimation();
    initProcessAnimation();
    initServicesAnimation();
    initBenefitsAnimation();
    initTeamAnimation();
}

/**
 * Initializes the Preloader Animation
 * Selects elements via [data-anim-preloader] attributes
 */
function initPreloader() {
    console.log("Initializing Preloader...");

    // Helper to select by attribute
    const $ = (v) => document.querySelector(`[data-anim-preloader="${v}"]`);
    const $$ = (v) => document.querySelectorAll(`[data-anim-preloader="${v}"]`);

    const wrapper = $("wrapper");
    const button = $("button");
    const mainText = $("main-text");
    const secondTexts = $$("precent-second-text");
    const zero = $("zero-precent");
    const precentContainer = $("precent-container");
    const centerSquare = $("center-square");
    const logo = $("logo");
    const masks = $$("mask-square");
    const sq1 = $("small-square-one");
    const sq2 = $("small-square-two");
    const marquee = $("marquee-text");

    if (!wrapper || !zero || !precentContainer || !centerSquare) return;

    const root = document.documentElement;
    const cssVar = (name, fallback) => {
        const v = getComputedStyle(root).getPropertyValue(name).trim();
        return v || fallback;
    };

    const C_WHITE = cssVar("--white", "#ffffff");
    const C_BLUE = cssVar("--blue", "#0066ff");
    const C_PINK = cssVar("--pink", "#ff3ea5");

    // --- Initial state ---
    gsap.set(wrapper, { autoAlpha: 1, pointerEvents: "all" });
    gsap.set(precentContainer, { width: "8.3125rem" });
    gsap.set(centerSquare, {
        width: "8.0625rem",
        height: "8.0625rem",
        backgroundColor: C_WHITE,
        willChange: "transform,width,height,background-color"
    });

    if (logo) gsap.set(logo, { autoAlpha: 0, zIndex: 3, willChange: "transform,opacity,width,height" });
    if (masks.length) {
        gsap.set(masks, { backgroundColor: C_WHITE, autoAlpha: 1, zIndex: 5 });
    }
    if (sq1) gsap.set(sq1, { autoAlpha: 0, backgroundColor: C_PINK, zIndex: 1, willChange: "transform,opacity,background-color" });
    if (sq2) gsap.set(sq2, { autoAlpha: 0, zIndex: 1, willChange: "transform,opacity" });
    if (marquee) gsap.set(marquee, { x: "0rem", autoAlpha: 0, willChange: "transform" });
    if (mainText) gsap.set(mainText, { autoAlpha: 0, y: "100%" });
    if (secondTexts.length) {
        gsap.set(secondTexts, { autoAlpha: 0, y: "2.5rem" });
    }
    if (button) gsap.set(button, { autoAlpha: 0 });

    // --- Fake percent counter ---
    const counter = { p: 0 };
    const updateCounter = () => {
        zero.textContent = String(Math.round(counter.p));
    };

    // --- Timeline ---
    const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" }
    });

    // 0–100%: Digits (approx 2.3s)
    tl.to(counter, {
        p: 100,
        duration: 2.3,
        ease: "none",
        onUpdate: updateCounter
    }, 0);

    // 0.0s - 0.3s: Reveal Logo/Squares
    if (logo) tl.to(logo, { autoAlpha: 1, duration: 0.3 }, 0.0);
    if (sq1 && sq2) {
        tl.to(sq1, { autoAlpha: 1, x: "-5.8125rem", y: "-4.0625rem", duration: 0.3 }, 0.0);
        tl.to(sq2, { autoAlpha: 1, x: "5.8125rem", y: "4.0625rem", duration: 0.3 }, 0.0);
    }

    // 0.3s - 0.6s: Horizontal Sweep
    if (sq1 && sq2) {
        tl.to(sq1, { x: "11.5rem", duration: 0.3 }, 0.3);
        tl.to(sq2, { x: "-11.5rem", duration: 0.3 }, 0.3);
    }

    // 0.6s - 0.9s: Smooth Alignment (6.775rem)
    if (sq1 && sq2) {
        tl.to(sq1, { x: "6.775rem", y: "0rem", duration: 0.3 }, 0.6);
        tl.to(sq2, { x: "-6.775rem", y: "0rem", duration: 0.3 }, 0.6);
    }

    // 0.9s - 1.3s: Scaling
    tl.to(centerSquare, { width: "16.5625rem", height: "16.5625rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (logo) tl.to(logo, { width: "9.5625rem", height: "11.0625rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (sq1) tl.to(sq1, { width: "2.69rem", height: "2.69rem", x: "13.87rem", y: "0rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (sq2) tl.set(sq2, { autoAlpha: 0 }, 1.0);

    // 1.3s - 1.6s: Fill Effect
    if (sq1) {
        tl.set(sq1, { zIndex: 6 }, 1.3);
        tl.to(sq1, { x: "0rem", y: "0rem", width: "16.5625rem", height: "16.5625rem", backgroundColor: C_BLUE, duration: 0.3, ease: "power2.inOut" }, 1.3);
    }
    if (logo) tl.set(logo, { zIndex: 7 }, 1.3);
    if (masks.length) tl.set(masks, { autoAlpha: 0 }, 1.3);

    // 1.6s: Fade Out
    tl.set(centerSquare, { backgroundColor: C_BLUE }, 1.6);
    if (logo) tl.to(logo, { autoAlpha: 0, duration: 0.3 }, 1.6);
    if (sq1) tl.to(sq1, { autoAlpha: 0, duration: 0.3 }, 1.6);

    // 1.9s: Collapse
    tl.to(centerSquare, {
        height: "0rem",
        autoAlpha: 0,
        duration: 0.15,
        ease: "power2.inOut"
    }, 1.9);

    // 2.05s: Final Reveal
    tl.to(precentContainer, {
        width: "108.75rem",
        duration: 0.25,
        ease: "power3.inOut"
    }, 2.05);

    if (secondTexts.length) {
        tl.to(secondTexts, {
            autoAlpha: 1,
            y: "0rem",
            duration: 0.2,
            ease: "power3.out"
        }, 2.2);
    }
    if (mainText) {
        tl.to(mainText, {
            autoAlpha: 1,
            y: "0%",
            duration: 0.2,
            ease: "power3.out"
        }, 2.2);
    }
    if (button) {
        tl.to(button, { autoAlpha: 1, duration: 0.1, ease: "power2.out" }, 2.3);

        // Manual Exit Logic
        button.addEventListener("click", () => {
            gsap.to(wrapper, {
                autoAlpha: 0,
                duration: 0.5,
                onComplete: () => {
                    gsap.set(wrapper, { display: "none", pointerEvents: "none" });
                }
            });
        });
    }

    updateCounter();
}

/**
 * Initializes Scramble Text Effect
 * Targets elements with [data-scramble="true"]
 */
function initScrambleText() {
    console.log("Initializing Scramble Text...");

    const targets = document.querySelectorAll('[data-scramble="true"]');
    if (!targets.length) return;

    // Helpers
    const lockHeight = (el) => {
        const h = el.getBoundingClientRect().height;
        if (h > 0) el.style.minHeight = `${h}px`;
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

        // 1. Split text nodes to isolate pure text from whitespace
        const originalTextNodes = getAllTextNodes(el);
        const animNodes = [];
        originalTextNodes.forEach((n) => {
            const t = n.textContent || "";
            if (!t.trim().length) return;
            if (/^\s|\s$/.test(t)) {
                const created = splitTextNode(n);
                created.forEach((cn) => animNodes.push(cn));
            } else {
                animNodes.push(n);
            }
        });

        // 2. Prepare nodes for animation (clear text initially)
        const items = animNodes
            .map((node) => ({ node, text: node.textContent || "" }))
            .filter((it) => it.text.trim().length);

        if (!items.length) return;

        items.forEach((it) => (it.node.textContent = ""));

        // Read attributes for config
        const startViewport = el.getAttribute("data-scramble-start") || "85%";
        const duration = parseFloat(el.getAttribute("data-scramble-duration") || "0.9");
        const stagger = parseFloat(el.getAttribute("data-scramble-stagger") || "0.06");

        const tl = gsap.timeline({
            paused: true,
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: el,
                start: `bottom ${startViewport}`,
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
 * Helper function to create a standardized scroll trigger
 * @param {string|Element} trigger - The element to trigger the animation
 * @param {Function} onEnter - Callback when the section hits the top
 */
function createSectionTrigger(trigger, onEnter) {
    ScrollTrigger.create({
        trigger: trigger,
        start: "top top", // Starts when the top of the element hits the top of the viewport
        markers: false, // Debug markers: enable to see start/end points
        onEnter: onEnter,
        // Optional: Reset logic if needed when scrolling back
        // onLeaveBack: () => { ... } 
    });
}

// --- Section Specific Animations ---


function initHeroAnimation() {
    // Select Section
    const section = document.querySelector('.hero');
    if (!section) return;

    // Select Elements via Attributes
    const contentWrapper = section.querySelector('[data-anim-hero="text-block"]');
    const videoWrapper = section.querySelector('[data-anim-hero="video-wrapper"]');
    const bgVideo = section.querySelector('[data-anim-hero="video-block"]');
    const leftGradient = section.querySelector('[data-anim-hero="text-gradient"]');
    const videoMask = section.querySelector('[data-anim-hero="video-mask"]');

    console.log("Initializing Hero Animation", { contentWrapper, videoWrapper, bgVideo, leftGradient, videoMask });

    // Use matchMedia to create responsive animations
    ScrollTrigger.matchMedia({
        // Desktop Only
        "(min-width: 992px)": function () {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%", // Extended duration: 2x screen height
                    scrub: true,       // Smooth scrubbing matching scrollbar
                    markers: false,     // Debug markers
                }
            });

            // 1. Hero Content & Left Gradient move down out of screen
            // Using 150% to ensure it's fully off-screen if it's large
            tl.to(contentWrapper, { y: "150vh", ease: "none" }, 0);
            tl.to(leftGradient, { y: "150vh", ease: "none" }, 0);

            // 2. Video Wrapper resizes to Full Viewport
            // Safari Fixes: 
            // 1. Centering: Use left: 50% + x: -50% to ensure it grows from center (prevents side gaps/black bars).
            // 2. Jitter: force3D, willChange.

            // Ensure initial centering state if not already set by CSS, generally safe to set properties to prepare for animation
            // Note: We use 'fromTo' or strictly 'to' if we trust the start state. 
            // To be safe against layout flow, we ensure it's positioned absolutely relative to the section/body context if possible, 
            // but here we just enforce centering properties during the tween.

            gsap.set(videoWrapper, {
                willChange: "width, height, transform",
                force3D: true,
                backfaceVisibility: "hidden"
            });

            tl.to(videoWrapper, {
                height: "100vh",
                width: "100vw",     // Full viewport width
                minWidth: "100vw",

                // Centering Logic to prevent side bars:
                position: "absolute", // decoupled from flow to avoid pushing content? Or just relative? 
                // User reported 'trembling', absolute is smoother.
                // Start 'auto' might satisfy flow, but 'absolute' at end is needed? 
                // Safest is to rely on transform centering if parent is full width.
                left: "50%",
                x: "-50%",

                top: "0rem", // Ensure it hits the top

                ease: "none",
                force3D: true
            }, 0);

            // 3. Hero BG Video moves from 0rem (default) to -12rem
            tl.to(bgVideo, { y: "-12rem", ease: "none" }, 0);

            // 4. Video Mask fades out
            tl.to(videoMask, { opacity: 0, ease: "none" }, 0);
        },

        // Tablet & Mobile
        "(max-width: 991px)": function () {
            // No specific scroll animation for mobile yet
        }
    });
}


function initAmbassadorsAnimation() {
    const section = document.querySelector('.our-ambassadors');
    if (!section) return;

    const progressBarLine = section.querySelector('.progress-bar-white-line');

    console.log("Initializing Ambassadors Animation", { progressBarLine });

    if (progressBarLine) {
        gsap.fromTo(progressBarLine,
            { x: "-100%" },
            {
                x: "0%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom", // Starts when section enters viewport
                    end: "top top",      // Ends when section hits top of viewport
                    scrub: true,
                    markers: false
                }
            }
        );
    }
}

function initStageSecondAnimation() {
    // Select by the specific class requested
    const heading = document.querySelector('.stage-pre-heading');

    if (!heading) return;

    // Helper to recursively split text nodes into chars
    const splitTextNodesRecursively = (element) => {
        // ChildNodes returns a live NodeList, so we convert to array to avoid issues when replacing
        [...element.childNodes].forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                const text = child.textContent;
                // If text is just whitespace, ignore or keep as is? 
                // We'll preserve spaces but only animate non-space chars effectively by splitting them too
                if (text.trim() === '') return;

                const newContent = document.createDocumentFragment();
                text.split('').forEach(char => {
                    const span = document.createElement('span');
                    span.textContent = char;
                    span.style.opacity = '0'; // Start hidden
                    span.style.transition = 'none'; // Ensure no CSS transition conflicts
                    span.dataset.animChar = "true"; // Mark for animation
                    newContent.appendChild(span);
                });
                element.replaceChild(newContent, child);
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                splitTextNodesRecursively(child);
            }
        });
    };

    // 4. Wrap in MatchMedia for Desktop Only enforcement
    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {
        console.log("Initializing Stage Second Animation (Typewriter) [Desktop]");

        // 1. Prepare text (split into spans) - Only do this on desktop match to avoid hiding text on mobile
        // Note: This logic runs once when matching. Reverting completely on resize requires manual cleanup, 
        // but for now this ensures it only runs if we are on desktop.
        if (heading.querySelectorAll('[data-anim-char="true"]').length === 0) {
            splitTextNodesRecursively(heading);
        }

        // 2. Select all those new spans
        const chars = heading.querySelectorAll('[data-anim-char="true"]');

        // 3. Animate them
        gsap.to(chars, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.02,
            ease: "none",
            scrollTrigger: {
                trigger: heading,
                start: "top 80%",
                markers: false
            }
        });
    });
}

function initStagesAnimation() {
    const section = document.querySelector('.stages');
    if (!section) return;

    // Select elements via Attributes
    const progressBar = document.querySelector('[data-anim-stage-progress="progress-stages"]');
    const mainCard = document.querySelector('[data-anim-stage="main-card"]');
    const secondCard = document.querySelector('[data-anim-stage="second-wrapper"]');

    if (!progressBar || !mainCard || !secondCard) return;

    console.log("Initializing Stages Animation");

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {
        // Initial States
        gsap.set(progressBar, { x: "-100%" });
        gsap.set([mainCard, secondCard], { y: "10rem", opacity: 0 });

        // --- Timeline 1: ENTRY (Phase 1) ---
        // Starts when section is at 50% viewport, ends when it hits top.
        const tlEntry = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 50%",
                end: "top top",
                scrub: true,
                markers: false
            }
        });

        // Select Text Elements (Phase 1 Phase 2 Phase 3) via Attributes
        const stage1Num = section.querySelector('[data-anim-stage-text="num-1"]');
        const stage1Title = section.querySelector('[data-anim-stage-text="title-1"]');
        const stage2Num = section.querySelector('[data-anim-stage-text="num-2"]');
        const stage2Title = section.querySelector('[data-anim-stage-text="title-2"]');
        const stage3Num = section.querySelector('[data-anim-stage-text="num-3"]');
        const stage3Title = section.querySelector('[data-anim-stage-text="title-3"]');

        // Initial Color Setup (Grey #404040)
        gsap.set([stage1Num, stage1Title, stage2Num, stage2Title, stage3Num, stage3Title], { color: "#404040" });

        // --- Timeline 1: ENTRY (Phase 1) ---
        // Line: -100% to 0%. Text 1 -> White.
        tlEntry.to(mainCard, { y: "0rem", opacity: 1, duration: 1 }, "step1");
        tlEntry.to(progressBar, { x: "0%", duration: 1 }, "step1");
        tlEntry.to([stage1Num, stage1Title], { color: "#FDFCFC", duration: 1 }, "step1");

        // 2. Second Card enters (visually distinct but part of setup)
        // User requested opacity 30% (0.3) for the first stage
        tlEntry.to(secondCard, { y: "0rem", opacity: 0.3, duration: 1 }, "step2-=0.5");


        // --- Timeline 2: STICKY SCROLL (Phases 2 & 3 Scrubbed) ---
        const tlSticky = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                markers: false
            }
        });

        // Select Secondary Cards via Attribute
        const card1 = section.querySelector('[data-anim-card="1"]');
        const card2 = section.querySelector('[data-anim-card="2"]');
        const card3 = section.querySelector('[data-anim-card="3"]');
        const cardSquare = section.querySelector('[data-anim-stage="square"]'); // Refactored to attribute

        // Initial setup: Card 3 hidden
        if (card3) gsap.set(card3, { opacity: 0 });

        // Pause after Phase 1
        tlSticky.to({}, { duration: 2.0 });

        // Phase 2: Line 0% -> 100%. Text 1 Grey, Text 2 White.
        // Card Shuffle: CLEANED FOR STEP-BY-STEP REWRITE
        tlSticky.to(progressBar, { x: "100%", duration: 1 }, "phase2");
        tlSticky.to([stage1Num, stage1Title], { color: "#404040", duration: 1 }, "phase2");
        tlSticky.to([stage2Num, stage2Title], { color: "#FDFCFC", duration: 1 }, "phase2");
        if (cardSquare) tlSticky.to(cardSquare, { backgroundColor: "#62B0FF", duration: 1 }, "phase2");

        // Step 2 Logic:
        if (card1 && card2 && card3) {
            // 1. Card 1 Moves UP 3.5rem and Fades Out ALMOST INSTANTLY (0.3s)
            tlSticky.to(card1, { y: "-3.5rem", opacity: 0, duration: 0.3 }, "phase2");

            // 2. ONLY AFTER (+=0.3s), Card 2 & 3 Move UP
            tlSticky.to(card2, { y: "-7.5rem", duration: 0.7 }, "phase2+=0.3");
            tlSticky.to(card3, { y: "-7.5rem", duration: 0.7 }, "phase2+=0.3");
            tlSticky.to(card3, { opacity: 1, duration: 0.3 }, "phase2+=0.3"); // Starts appearing after Card 1 is gone

            // 3. Reset Card 1 (safe to do at end of phase)
            // Previous duration total ~1s (0.3 + 0.7)
            tlSticky.to(card1, { y: "15rem", duration: 0.1 }, "phase2+=1");
            tlSticky.set(card1, { zIndex: 10 }, "phase2+=1");
        }

        // Pause between phases
        tlSticky.to({}, { duration: 1.5 });

        // Phase 3: Line 100% -> 200%. Text 2 Grey, Text 3 White.
        tlSticky.to(progressBar, { x: "200%", duration: 1 }, "phase3");
        tlSticky.to([stage2Num, stage2Title], { color: "#404040", duration: 1 }, "phase3");
        tlSticky.to([stage3Num, stage3Title], { color: "#FDFCFC", duration: 1 }, "phase3");
        if (cardSquare) tlSticky.to(cardSquare, { backgroundColor: "#FDFCFC", duration: 1 }, "phase3");

        // Step 3 Logic:
        if (card1 && card2 && card3) {
            // 1. Card 2 Moves UP 3.5rem (further) and Fades Out FAST (0.3s)
            tlSticky.to(card2, { y: "-11rem", opacity: 0, duration: 0.3 }, "phase3");

            // 2. ONLY AFTER (+=0.3s), Card 3 Moves UP & Card 1 Enters
            tlSticky.to(card3, { y: "-15rem", duration: 0.7 }, "phase3+=0.3");
            tlSticky.to(card1, { y: "7.5rem", opacity: 1, duration: 0.7 }, "phase3+=0.3");
        }

        // Add padding at end
        tlSticky.to({}, { duration: 1 });




        // Select Targets (Main Card)
        const targetNumber = mainCard.querySelector('[data-stage-target="number"]');
        const targetHeading = mainCard.querySelector('[data-stage-target="heading"]');
        const targetParagraph = mainCard.querySelector('[data-stage-target="paragraph"]');
        const targetImage = mainCard.querySelector('[data-stage-target="image"]');

        // Select Sources (Stage 2 Card)
        const sourceNumber2 = document.querySelector('[data-stage-source="number-2"]');
        const sourceHeading2 = document.querySelector('[data-stage-source="heading-2"]');
        const sourceParagraph2 = document.querySelector('[data-stage-source="paragraph-2"]');
        const sourceImage2 = document.querySelector('[data-stage-source="image-2"]');

        // Initialize Fixed Heights (using data from DOM before any changes)
        // We capture explicitly the "Stage 1" text from the elements themselves as they are on load
        // to use as 'fromText' for Phase 2.
        const stage1NumberText = targetNumber ? targetNumber.textContent : "";
        const stage1HeadingSpan = targetHeading && targetHeading.querySelector('span') ? targetHeading.querySelector('span').textContent : "";
        const stage1ParagraphText = targetParagraph ? targetParagraph.textContent : "";

        // Helper: Typewriter with Explicit From/To
        const sensitiveTypewriter = (timeline, target, fromText, toText, label) => {
            // 1. Erase (Animating from 'fromText' length down to 0)
            // We need to simulate erasing the "fromText". 
            // Problem: The target might currently hold 'fromText' OR something else if reversed.
            // But since we are using independent timelines, we must simply strictly animate the content.
            // Actually, for the "Erase" visual to work, the element effectively needs to show 'fromText' shrinking.

            const eraseProxy = { len: fromText.length };

            timeline.to(eraseProxy, {
                len: 0,
                duration: 0.5,
                ease: "none",
                onUpdate: () => {
                    target.textContent = fromText.substring(0, Math.round(eraseProxy.len));
                }
            }, label);

            // 2. Type (Animating from 0 up to 'toText' length)
            const typeProxy = { len: 0 };

            timeline.to(typeProxy, {
                len: toText.length,
                duration: 0.8,
                ease: "none",
                onUpdate: () => {
                    target.textContent = toText.substring(0, Math.round(typeProxy.len));
                }
            }, label + "+=0.5");
        };

        // Initialize Fixed Heights to prevent layout shift (Twitch fix)
        // Heading: 2 lines (1.3 line-height * 2 = 2.6em)
        // Paragraph: 4 lines (1.3 line-height * 4 = 5.2em)
        if (targetHeading) gsap.set(targetHeading, { minHeight: "2.6em" });
        if (targetParagraph) gsap.set(targetParagraph, { minHeight: "5.2em" });

        // --- Phase 2: Content Swap (Stage 1 -> Stage 2) ---
        // Trigger: ~800px down (Moved earlier to sync with start of movement)
        const tlPhase2 = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top-=800",
                end: "bottom bottom",
                toggleActions: "play none none reverse", // Fixed: Don't reverse when leaving bottom
                scrub: false,
                markers: false
            }
        });

        // Phase 2 Number: Stage 1 -> Stage 2
        if (targetNumber && sourceNumber2) {
            sensitiveTypewriter(tlPhase2, targetNumber, stage1NumberText, sourceNumber2.textContent, "phase2");
        }

        // Phase 2 Heading: Stage 1 -> Stage 2
        if (targetHeading && sourceHeading2) {
            const targetSpan = targetHeading.querySelector('span');
            const sourceSpan = sourceHeading2.querySelector('span');
            if (targetSpan && sourceSpan) {
                sensitiveTypewriter(tlPhase2, targetSpan, stage1HeadingSpan, sourceSpan.textContent, "phase2");
            }
        }

        // Phase 2 Paragraph: Stage 1 -> Stage 2
        if (targetParagraph && sourceParagraph2) {
            const parent = targetParagraph.parentElement;
            if (parent) tlPhase2.set(parent, { height: parent.offsetHeight, overflow: "hidden" }, "phase2");

            sensitiveTypewriter(tlPhase2, targetParagraph, stage1ParagraphText, sourceParagraph2.textContent, "phase2");

            if (parent) tlPhase2.set(parent, { height: "auto", overflow: "visible" }, "phase2+=1.4");
        }

        // Phase 2 Image
        if (targetImage && sourceImage2) {
            tlPhase2.to(targetImage, { opacity: 0, duration: 0.2 }, "phase2");
            tlPhase2.add(() => {
                targetImage.src = sourceImage2.src;
                targetImage.srcset = sourceImage2.srcset;
            }, "phase2+=0.2");
            tlPhase2.to(targetImage, { opacity: 1, duration: 0.2 }, "phase2+=0.25");
        }


        // --- Phase 3: Content Swap (Stage 2 -> Stage 3) ---
        // Trigger: Synced with 'phase3' label in tlSticky
        const tlPhase3 = gsap.timeline({ paused: true });

        // Sync with Main Timeline
        // We add this trigger to tlSticky to play Phase 3 text effect exactly when the phase starts
        tlSticky.to({}, {
            duration: 0.1,
            onStart: () => tlPhase3.play(),
            onReverseComplete: () => tlPhase3.reverse()
        }, "phase3");

        const sourceNumber3 = document.querySelector('[data-stage-source="number-3"]');
        const sourceHeading3 = document.querySelector('[data-stage-source="heading-3"]');
        const sourceParagraph3 = document.querySelector('[data-stage-source="paragraph-3"]');
        const sourceImage3 = document.querySelector('[data-stage-source="image-3"]');

        // Phase 3 Number: Stage 2 -> Stage 3
        if (targetNumber && sourceNumber3 && sourceNumber2) {
            sensitiveTypewriter(tlPhase3, targetNumber, sourceNumber2.textContent, sourceNumber3.textContent, "phase3");
        }

        // Phase 3 Heading: Stage 2 -> Stage 3
        if (targetHeading && sourceHeading3 && sourceHeading2) {
            const targetSpan = targetHeading.querySelector('span');
            const sourceSpan3 = sourceHeading3.querySelector('span');
            const sourceSpan2 = sourceHeading2.querySelector('span'); // Source for 'fromText'

            if (targetSpan && sourceSpan3 && sourceSpan2) {
                // Lock height logic for Phase 3
                tlPhase3.set(targetHeading, { height: targetHeading.offsetHeight, overflow: "hidden" }, "phase3");

                sensitiveTypewriter(tlPhase3, targetSpan, sourceSpan2.textContent, sourceSpan3.textContent, "phase3");

                tlPhase3.set(targetHeading, { height: "auto", overflow: "visible" }, "phase3+=1.35");
            }
        }

        // Phase 3 Paragraph: Stage 2 -> Stage 3
        if (targetParagraph && sourceParagraph3 && sourceParagraph2) {
            const parent = targetParagraph.parentElement;
            if (parent) tlPhase3.set(parent, { height: parent.offsetHeight, overflow: "hidden" }, "phase3");

            sensitiveTypewriter(tlPhase3, targetParagraph, sourceParagraph2.textContent, sourceParagraph3.textContent, "phase3");

            if (parent) tlPhase3.set(parent, { height: "auto", overflow: "visible" }, "phase3+=1.4");
        }

        // Phase 3 Image: Stage 2 -> Stage 3
        if (targetImage && sourceImage3) {
            tlPhase3.to(targetImage, { opacity: 0, duration: 0.2 }, "phase3");
            tlPhase3.add(() => {
                targetImage.src = sourceImage3.src;
                targetImage.srcset = sourceImage3.srcset;
            }, "phase3+=0.2");
            tlPhase3.to(targetImage, { opacity: 1, duration: 0.2 }, "phase3+=0.25");
        }

        // Add padding at the end for future phases
        // Reduced end spacer
        tlSticky.to({}, { duration: 0.5 });

    });
}

function initProcessAnimation() {
    const section = document.querySelector('.proces');
    if (!section) return;

    // Select Elements via Attributes
    const descriptions = section.querySelectorAll('[data-anim-process-desc]');
    const dots = section.querySelectorAll('[data-anim-process-dot]');
    const processBarLines = section.querySelectorAll('[data-anim-process-bar-line]');

    console.log("Initializing Process Animation", { descriptions, dots, processBarLines });

    // Initial States
    // 1. Descriptions: Hidden, shifted down 3.5rem
    if (descriptions.length) {
        gsap.set(descriptions, {
            autoAlpha: 0,
            y: "3.5rem"
        });
    }

    // 2. Dots: Hidden
    if (dots.length) {
        gsap.set(dots, {
            autoAlpha: 0
        });
    }

    // 3. Process Bar Lines: Shifted -100%
    if (processBarLines.length) {
        gsap.set(processBarLines, {
            x: "-100%"
        });
    }

    // 4. Blue Wrapper: Initially Hidden
    const blueWrapper = section.querySelector('.process-info-blue-wrapper');
    if (blueWrapper) {
        gsap.set(blueWrapper, { autoAlpha: 0 });
    }

    // 5. Phase 3 Descriptions: Initially Hidden (Steps 9-12)
    const phase3Descs = section.querySelectorAll('[data-anim-process-desc="9"], [data-anim-process-desc="10"], [data-anim-process-desc="11"], [data-anim-process-desc="12"]');
    if (phase3Descs.length) {
        gsap.set(phase3Descs, { y: "3.5rem", autoAlpha: 0 });
    }

    // 3. SVG Map Animations
    const animateMap = (trigger, maskPathId, fillLayerId) => {
        const maskPath = document.getElementById(maskPathId);
        const fillLayer = document.getElementById(fillLayerId);

        if (!maskPath || !fillLayer) return;

        const length = maskPath.getTotalLength();

        // Initial State via GSAP (0% state)
        gsap.set(maskPath, {
            strokeDasharray: length,
            strokeDashoffset: length,
            autoAlpha: 0 // Hide completely to prevent artifacting
        });
        gsap.set(fillLayer, { opacity: 0 });

        // Temporarily disabled: awaiting specific trigger
        return;

        /*
        // Animation Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger,
                start: "top 70%", // Start when top of SVG is at 70% viewport
                toggleActions: "play none none none", // Play once
                markers: false
            }
        });

        // 1. Draw Line (2s linear)
        tl.to(maskPath, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "none"
        });

        // 2. Fade in Fill (0.4s ease-out)
        tl.to(fillLayer, {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
        });
        */
    };

    // Red Map
    const redMap = section.querySelector('.map-svg');
    if (redMap) animateMap(redMap, 'mask-path', 'fill-layer');

    // Blue Map
    const blueMap = section.querySelector('.map-svg-blue');
    if (blueMap) animateMap(blueMap, 'blue-mask-path', 'blue-fill-layer');


    // --- Main Sequential Timeline (Scrubbed) ---
    const tlProcess = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",     // Start at top of section
            end: "+=300%",        // Extend scroll distance
            scrub: 1,             // Smooth scrubbing
            trackMarkers: false,  // Debug
            // Pin the container specifically, or fallback to section (true)
            pin: section.querySelector('[data-proces-anim-container="true"]') || true
        }
    });

    // Configuration for each step
    const stepsConfig = [
        { id: 1, barX: "-10%", dotIds: ["1-1"] }, // 90% visible
        { id: 2, barX: "-20%", dotIds: ["1-5"] }, // 80% visible
        { id: 3, barX: "-60%", dotIds: ["1-2", "1-3"] }, // 40% visible (Two dots)
        { id: 4, barX: "-80%", dotIds: ["1-4"] }  // 20% visible
    ];

    stepsConfig.forEach((step) => {
        const desc = section.querySelector(`[data-anim-process-desc="${step.id}"]`);
        const barLine = section.querySelector(`[data-anim-process-bar-line="${step.id}"]`);

        // Select all dots for this step
        const dots = [];
        step.dotIds.forEach(did => {
            const d = section.querySelector(`[data-anim-process-dot="${did}"]`);
            if (d) dots.push(d);
        });

        if (desc) {
            // 1. Description: Fade/Move In
            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            });

            // 2. Bar Line
            const label = `step${step.id}-details`;

            if (barLine) {
                tlProcess.to(barLine, {
                    x: step.barX,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            // 3. Dots (one or multiple)
            if (dots.length) {
                tlProcess.to(dots, {
                    autoAlpha: 1,
                    duration: 1, // Sync with bar
                    ease: "none"
                }, label);
            }

            // Add a small spacer/pause after each step for separation during scrub
            tlProcess.to({}, { duration: 0.5 });
        }
    });

    // --- Red Map Animation (First Map) ---
    // Triggered automatically after Step 4. Reverses on scroll back.
    const redMaskPath = document.getElementById('mask-path');
    const redFillLayer = document.getElementById('fill-layer');

    // Create a standalone timeline for the map so we can play/reverse it
    let tlMap = gsap.timeline({ paused: true });

    if (redMaskPath && redFillLayer) {
        // Draw Line (Faster: 0.8s)
        tlMap.to(redMaskPath, {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "none"
        });

        // Fade in Fill (Instantly after line)
        tlMap.to(redFillLayer, {
            autoAlpha: 1,
            duration: 0.2, // Almost instant snap
            ease: "power2.out"
        }); // No overlap, strict sequence
    }

    const playRedMap = () => {
        tlMap.play();
    };

    const reverseRedMap = () => {
        tlMap.reverse();
    };

    // Trigger logic:
    // onStart (forward): Plays map
    // onReverseComplete (backward): Reverses map (when dot drops from 100% -> 99%)
    // Trigger logic:
    // onStart (forward): Plays map
    // onReverseComplete (backward): Reverses map (when dot drops from 100% -> 99%)
    tlProcess.to({}, {
        duration: 0.1, // Small duration to establish a timeline presence
        onStart: playRedMap,
        onReverseComplete: reverseRedMap
    });

    // Spacer: Large Pause (Empty Scrolls) before Phase 1 Exit
    // Cards & Map stay visible for a while before disappearing
    tlProcess.to({}, { duration: 12 });

    // --- Phase 1 Exit Animation (Transition to Phase 2) ---
    // Occurs as we continue scrolling DOWN after the map has triggered

    // Select Elements for Phase 1 Exit
    const phase1Descs = section.querySelectorAll('[data-anim-process-desc="1"], [data-anim-process-desc="2"], [data-anim-process-desc="3"], [data-anim-process-desc="4"]');
    const dotsWrapper1 = section.querySelector('[data-anim-process-dots="1"]');
    const redMapSvg = section.querySelector('.map-svg');

    // 1. Descriptions 1-4: Move Up + Fade Out
    if (phase1Descs.length) {
        tlProcess.to(phase1Descs, {
            y: "-5rem",
            autoAlpha: 0,
            duration: 1, // Normalized scrub duration
            ease: "none"
        }, "+=0.2"); // Start shortly after map triggers
    }

    // 2. Dots & Map: Fade to 20%
    if (dotsWrapper1) {
        // Target all dots inside wrapper 1
        const childDots = dotsWrapper1.querySelectorAll('[data-anim-process-dot]');
        if (childDots.length) {
            tlProcess.to(childDots, {
                autoAlpha: 0.2,
                duration: 1,
                ease: "none"
            }, "<"); // Sync with descriptions
        }
    }

    // 3. Map SVG to 20%, Fill to 0%
    if (redMapSvg) {
        tlProcess.to(redMapSvg, {
            autoAlpha: 0.2, // Entire SVG (including lines) to 20%
            duration: 1,
            ease: "none"
        }, "<");
    }

    if (redFillLayer) {
        tlProcess.to(redFillLayer, {
            autoAlpha: 0, // Fill goes completely transparent
            duration: 1,
            ease: "none"
        }, "<");
    }

    // --- Phase 2: Blue Section (Steps 5-8) ---
    // Start fading them in sequentially

    // Reveal Blue Wrapper instantly
    if (blueWrapper) {
        tlProcess.to(blueWrapper, {
            autoAlpha: 1,
            duration: 0.1,
            ease: "none"
        }, "+=0.1"); // Small offset after Phase 1 exit
    }

    const stepsConfigPhase2 = [
        { id: 5, barX: "-70%", dotIds: ["2-1"] },
        { id: 6, barX: "-60%", dotIds: ["2-2"] },
        { id: 7, barX: "-10%", dotIds: ["2-3", "2-4"] }, // Two dots for step 7
        { id: 8, barX: "-20%", dotIds: ["2-5"] }
    ];

    stepsConfigPhase2.forEach((step) => {
        const desc = section.querySelector(`[data-anim-process-desc="${step.id}"]`);
        const barLine = section.querySelector(`[data-anim-process-bar-line="${step.id}"]`);

        // Select all dots for this step
        const dots = [];
        step.dotIds.forEach(did => {
            const d = section.querySelector(`[data-anim-process-dot="${did}"]`);
            if (d) dots.push(d);
        });

        if (desc) {
            // Determine position: Start of Phase 2 (Step 5)
            let position = "+=0.2";
            if (step.id === 5) {
                tlProcess.add("phase2Start", "+=0.2");
                position = "phase2Start";
            }

            // 1. Description: Fade/Move In
            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            }, position);

            // 2. Bar Line
            const label = `step${step.id}-details`;
            if (barLine) {
                tlProcess.to(barLine, {
                    x: step.barX,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            // 3. Dots (one or multiple)
            if (dots.length) {
                tlProcess.to(dots, {
                    autoAlpha: 1,
                    duration: 1,
                    ease: "none"
                }, label);
            }
        }
    });

    // --- Branding Transition (Title & Square) ---
    // Triggered after Step 8 is fully visible
    // --- Branding Transition (Title & Square) ---
    // Triggered after Step 8 is fully visible
    const infoSquare = section.querySelector('.process-info-square');
    const infoTitleWrapper = section.querySelector('.width-180-a-a');
    const infoTitle = section.querySelector('.process-info-title');
    const originalTitleText = "Traditional Production House";

    // 1. Expand Width
    if (infoTitleWrapper) {
        tlProcess.to(infoTitleWrapper, {
            width: "14rem",
            duration: 0.5,
            ease: "none"
        }, "phase2Start"); // Sync with Step 5
    }

    // 2. Change Square Color & Trigger Scramble
    tlProcess.to(infoSquare, {
        backgroundColor: "#ffffff",
        duration: 0.5,
        ease: "none",
        onStart: () => {
            if (infoTitle) {
                // Prepare structure for split color/text
                infoTitle.innerHTML = '<span id="brand-s1" style="color:#62B0FF"></span><br><span id="brand-s2" style="color:#ffffff"></span>';

                // Play Scramble Effect (Non-scrubbed/Forward only for effect)
                // We use global gsap.to to animate the newly created elements
                gsap.to("#brand-s1", {
                    duration: 1,
                    scrambleText: { text: "KULBIT", chars: "upperCase", speed: 0.3, revealDelay: 0 }
                });
                gsap.to("#brand-s2", {
                    duration: 1.5,
                    delay: 0.2,
                    scrambleText: { text: "AI-Elevated Production", chars: "upperCase", speed: 0.3, revealDelay: 0 }
                });
            }
        },
        onReverseComplete: () => {
            // Revert Text backward
            if (infoTitle) infoTitle.textContent = originalTitleText;
        }
    }, "<"); // Sync with width change

    // --- Blue Map Animation (Second Map) ---
    // Triggered automatically after Step 8.
    const blueMaskPath = document.getElementById('blue-mask-path');
    const blueFillLayer = document.getElementById('blue-fill-layer');

    // Create timeline for Blue Map
    let tlBlueMap = gsap.timeline({ paused: true });

    if (blueMaskPath && blueFillLayer) {
        // Draw Line (0.8s)
        tlBlueMap.to(blueMaskPath, {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "none"
        });

        // Fade in Fill (Instant)
        tlBlueMap.to(blueFillLayer, {
            autoAlpha: 1,
            duration: 0.05,
            ease: "power2.out"
        });
    }

    const playBlueMap = () => {
        tlBlueMap.play();
    };

    const reverseBlueMap = () => {
        tlBlueMap.reverse();
    };

    // Trigger Blue Map at end of Phase 2
    tlProcess.to({}, {
        duration: 0.1, // Short duration trigger
        onStart: playBlueMap,
        onReverseComplete: reverseBlueMap
    });

    // Spacer: Large Pause (Empty Scrolls) before Phase 2 Exit
    tlProcess.to({}, { duration: 12 });

    // --- Phase 2 Exit Animation (New) ---
    // Hide Descriptions 5-8 ONLY (Map and Dots stay visible)
    const descriptionsPhase2 = [];
    [5, 6, 7, 8].forEach(id => {
        const d = section.querySelector(`[data-anim-process-desc="${id}"]`);
        if (d) descriptionsPhase2.push(d);
    });

    if (descriptionsPhase2.length) {
        tlProcess.to(descriptionsPhase2, {
            autoAlpha: 0,
            y: "-5rem",
            duration: 1,
            ease: "none"
        }, "+=0.5"); // Wait a bit after map starts
    }


    // --- Phase 3: Icons (Steps 9-12) ---
    const stepsConfigPhase3 = [9, 10, 11, 12];

    stepsConfigPhase3.forEach((id) => {
        const desc = section.querySelector(`[data-anim-process-desc="${id}"]`);
        if (desc) {
            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            }, "+=0.2");
        }
    });

    // Spacer: Large Pause at the very end (Empty Scroll buffer)
    tlProcess.to({}, { duration: 25 });

}

function initServicesAnimation() {
    const section = document.querySelector('[data-anim-services="section"]');
    const track = document.querySelector('[data-anim-services="track"]');
    const cards = document.querySelectorAll('[data-anim-services="card"]');

    if (!section || !track || !cards.length) return;

    console.log("Initializing Services Animation (Horizontal Scroll)");

    // Horizontal Scroll Trigger
    // We want to pin the section and move the track left.
    // Movement distance = (Card Width + Gap) * (Number of Cards - 1)

    // Use matchMedia to ensure it only runs on desktop/landscape if needed, 
    // or generally, but let's assume global as user didn't specify mobile.
    // Usually horizontal scroll is desktop-first. Webflow often stacks on mobile.
    // Let's wrap in matchMedia for safety if typical breaks are used (992px).

    ScrollTrigger.matchMedia({
        "(min-width: 992px)": function () {

            // Function to calculate precise movement so exact card alignment happens
            const getScrollAmount = () => {
                const cardWidth = cards[0].offsetWidth;
                const trackStyle = window.getComputedStyle(track);
                const gap = parseFloat(trackStyle.getPropertyValue("column-gap")) || parseFloat(trackStyle.getPropertyValue("gap")) || 86; // Fallback approx 5.38rem

                // Move so the last card reaches the first card's position? 
                // "next cards stop at the same place where the initial card stands"
                // This means moving 1 unit shifts card 2 to card 1. 2 units shifts card 3 to card 1.
                // Total distance = (N-1) units.
                return (cardWidth + gap) * (cards.length - 1);
            };

            const scrollAmount = getScrollAmount();

            gsap.to(track, {
                x: () => -getScrollAmount(), // Move left by total distance
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    pin: true,
                    // Use a sticky container inside if preferred, but pin: section works well.
                    // If visual issues, pin: section.querySelector('.is-stiky')?
                    // Let's try pinning the section first as it contains the sticky wrapper.
                    pin: true,
                    start: "top top",
                    end: () => "+=" + getScrollAmount(), // Scroll distance matches movement distance? Or scale it?
                    // User might want it slower. Let's multiply by a factor (e.g. 1.5 or 2) for usability.
                    // But "stop at same place" relates to positioning, not speed.
                    // Creating an 'end' value usually defines speed. 
                    // Let's stick to 1:1 or 1:1.5 mapping. 
                    // Let's use "+=" + (scrollAmount * 2) to make it slower/smoother?
                    // User said: "next cards stop at same place". That's positioning.
                    // Let's start with a reasonable duration.
                    end: () => "+=" + (getScrollAmount() + window.innerHeight),
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        }
    });
}

function initBenefitsAnimation() {
    const section = document.querySelector('.benefits');
    if (!section) return;

    createSectionTrigger(section, () => {
        console.log("Benefits Animation Triggered");
    });
}

function initTeamAnimation() {
    const section = document.querySelector('.team');
    if (!section) return;

    createSectionTrigger(section, () => {
        console.log("Team Animation Triggered");
    });
}

function initAmbassadorsAnimationV2() {
    const section = document.querySelector('.our-ambassadors');
    // Select elements by data attributes as requested
    const wrapper = document.querySelector('[data-anim-ambassador-wrapper="true"]');
    const card1 = document.querySelector('[data-anim-ambassador="card-1"]');
    const card2 = document.querySelector('[data-anim-ambassador="card-2"]');
    const card3 = document.querySelector('[data-anim-ambassador="card-3"]');

    if (!section || !wrapper || !card1 || !card2 || !card3) return;

    console.log("Initializing Ambassadors Card Animation V2");

    // SETUP:
    const cardHeight = card1.offsetHeight || 516;
    gsap.set(wrapper, { height: cardHeight });

    gsap.set([card1, card2, card3], {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    gsap.set([card2, card3], { y: "100%", opacity: 0 });

    if (section.querySelector('.progress-bar-white-line')) {
        gsap.fromTo(section.querySelector('.progress-bar-white-line'),
            { x: "-100%" },
            {
                x: "0%",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top top",
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                // pin: true, // REMOVED: Using CSS sticky instead
                scrub: true,
                markers: false
            }
        });

        // Loop sequence

        // Card 1 Exit
        tl.to(card1, { y: "-100%", opacity: 0, duration: 1 });

        // Card 2 Enter (starts before Card 1 finishes)
        tl.to(card2, { y: "0%", opacity: 1, duration: 1 }, "-=0.5");
        // Pause
        tl.to({}, { duration: 0.5 });
        // Card 2 Exit
        tl.to(card2, { y: "-100%", opacity: 0, duration: 1 });

        // Card 3 Enter (starts before Card 2 finishes)
        tl.to(card3, { y: "0%", opacity: 1, duration: 1 }, "-=0.5");

        // Card 3 stays (No exit, no hold)
        // tl.to({}, { duration: 0.5 }); // REMOVED to avoid empty space at end
    });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initAnimations);
