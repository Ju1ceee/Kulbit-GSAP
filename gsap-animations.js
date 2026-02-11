// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Main initialization function for all site animations
 * This allows us to separate logic for each section
 */
function initAnimations() {
    // Initialize specific section animations
    initPreloader(); // Run Preloader first
    initHeroAnimation();
    initScrambleText(); // Initialize Scramble effects
    initAmbassadorsAnimation();
    initStageSecondAnimation();
    initStagesAnimation();
    initProcessAnimation();
    initServicesAnimation();
    initBenefitsGraphAnimation();
    initBenefitsAnimationSequence();
    initBenefitsCirclesStyle();
    initBenefitsCardsAnimation();
    initStageBenefitsParallax(); // Parallax for previous section
    initTeamAnimation(); // Team section character animation
}

/**
 * ----------------------------------------------------------------------------------
 * Stage (Previous Section) Parallax Pinning
 * ----------------------------------------------------------------------------------
 * Pins the #stage-top-benefits section so the Benefits section slides over it.
 * Unpins (moves up) when Benefits section triggers (at 50% height).
 */
function initStageBenefitsParallax() {
    const stageSection = document.querySelector('#stage-top-benefits');
    // Find benefits section (using a known child if class 'benefits-section' isn't on the section tag)
    // Looking at HTML, benefits section seems to be the one containing .benefits-container or following #stage-top-benefits
    // Let's look for the next sibling of stageSection or use dashedLine check
    const benefitsSection = stageSection ? stageSection.nextElementSibling : null;

    if (!stageSection || !benefitsSection) return;

    ScrollTrigger.create({
        trigger: stageSection,
        start: "top top",
        endTrigger: benefitsSection,
        end: "top 50%", // Unpin when top of Benefits hits 50% of viewport
        pin: true,
        pinSpacing: false, // Allow overlap
        markers: false
    });
}


/**
 * ----------------------------------------------------------------------------------
 * Benefits Graph Animation
 * ----------------------------------------------------------------------------------
 * Animates the "drawing" of filled paths using clip-path.
 * Sequence: Dark Line -> White Line -> Gradient Fade In
 * Targets: .benefits-graph-svg.desktop-only
 */
function initBenefitsGraphAnimation() {
    // Select all desktop-only benefits graphs
    const graphs = document.querySelectorAll('.benefits-graph-svg.desktop-only');

    graphs.forEach((graph) => {
        // 1. Select Elements

        // The separate SVG containing the dark line (class .position-absolute-100)
        const lineSvgContainer = graph.querySelector('.position-absolute-100');

        // The main SVG containing gradient path and white path
        const mainSvg = graph.querySelector('svg:not(.position-absolute-100)');

        if (!lineSvgContainer || !mainSvg) return;

        // Inside mainSvg:
        // By inspection: 1st path is Gradient, 2nd path is White Fill
        const gradientPath = mainSvg.querySelector('path:nth-child(1)');
        const whitePath = mainSvg.querySelector('path:nth-child(2)');

        // Inside lineSvgContainer: Dark Line Path
        const darkPath = lineSvgContainer.querySelector('path');

        if (!gradientPath || !whitePath || !darkPath) return;

        // 2. Set Initial States
        // Hide Graphs initially as requested
        gsap.set(graph, { opacity: 0 }); // Hide the entire graph container

        /* 
        // TEMPORARILY DISABLED ANIMATION
        // Hide Gradient Path initially
        gsap.set(gradientPath, { opacity: 0 });

        // prepare clip-path for "drawing" effect on the filled paths
        const hiddenClip = "inset(0% 100% 0% 0%)";
        const visibleClip = "inset(0% 0% 0% 0%)";

        gsap.set(lineSvgContainer, { clipPath: hiddenClip, webkitClipPath: hiddenClip });
        gsap.set(whitePath, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

        // Create timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: graph,
                start: "top 75%",
                end: "bottom center",
                toggleActions: "play none none reverse",
                markers: false
            }
        });

        tl.to(lineSvgContainer, {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: 1.2,
            ease: "power2.inOut"
        });

        tl.to(whitePath, {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: 1.2,
            ease: "power2.inOut"
        }, "-=0.2");

        tl.to(gradientPath, {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
        }); 
        */
    });
}

/**
 * ----------------------------------------------------------------------------------
 * Benefits Animation Sequence
 * ----------------------------------------------------------------------------------
 * Coordinates the drawing of Dashed Line, Traditional Line, and appearance of Circles & Text.
 * Trigger: When Benefits section hits 30% viewport (top 70%).
 */
function initBenefitsAnimationSequence() {
    // 1. Select Elements
    const section = document.querySelector('.benefits'); // Assuming section class
    // Fallback if section class not found, find a common parent using a known element
    const dashedLine = document.querySelector('.benefits-dashed-line.desktop-only');
    const traditionalLine = document.querySelector('.traditional-line-svg.desktop-only');
    const circles = document.querySelectorAll('.benefits-circle[data-benefit-circle]'); // 1, 2, 3, 4, 5

    // Texts associated with Traditional Line
    const traditionalLineParent = traditionalLine ? traditionalLine.closest('.benefit-tradidional-line') : null;
    const textLegacy = traditionalLineParent ? traditionalLineParent.querySelector('.taditional-text') : null;
    const textNew = document.querySelector('.taditional-text.is-second');
    const kulbitText = document.querySelector('.kulbit-text-wrapper');
    const weeksLabel = document.querySelector('.benefits-week.if-four.desktop-only');
    const weekThreeLabel = document.querySelector('.benefits-week.is-three.desktop-only');
    const weekOneLabel = document.querySelector('.benefits-week.desktop-only:not(.is-two):not(.is-three):not(.if-four)');
    const weekTwoLabel = document.querySelector('.benefits-week.is-two.desktop-only');
    const cardsWrapper = document.querySelector('.benefits-cards-wrapper');
    const scrollMore = document.querySelector('.benefits-scroll-to-see-more.desktop-only');

    // Select color lines
    const colorLines = document.querySelectorAll('.benefits-color-line');

    if (!dashedLine || !traditionalLine) return;

    // Use loop to find specific circles easily
    const getCircle = (id) => document.querySelector(`.benefits-circle[data-benefit-circle="${id}"]`);

    // 2. Initial States
    // Lines: Hidden via clip-path
    const hiddenClip = "inset(0% 100% 0% 0%)";
    const visibleClip = "inset(0% 0% 0% 0%)";

    gsap.set(dashedLine, { clipPath: hiddenClip, webkitClipPath: hiddenClip });
    gsap.set(traditionalLine, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

    // Hide Kulbit Text & Text New
    if (kulbitText) gsap.set(kulbitText, { opacity: 0, y: 20 });
    if (textNew) gsap.set(textNew, { opacity: 0, y: 20 });

    // Hide Weeks Label
    if (weeksLabel) gsap.set(weeksLabel, { opacity: 0, y: 20 });
    if (weekThreeLabel) gsap.set(weekThreeLabel, { opacity: 0, y: 20 });
    if (weekOneLabel) gsap.set(weekOneLabel, { opacity: 0, y: 20 });
    if (weekTwoLabel) gsap.set(weekTwoLabel, { opacity: 0, y: 20 });

    // Hide Cards Wrapper & Scroll Indicator (use autoAlpha to match initBenefitsCardsAnimation)
    if (cardsWrapper) gsap.set(cardsWrapper, { autoAlpha: 0, y: 30 });
    if (scrollMore) gsap.set(scrollMore, { autoAlpha: 0, y: 20 });

    // Position Color Lines Left (Hidden)
    if (colorLines.length) gsap.set(colorLines, { xPercent: -101 });

    // Circles: Hidden (opacity 0)
    // User requested "appear with opacity".
    if (circles.length) gsap.set(circles, { opacity: 0 });

    // Texts: Hidden (opacity 0, y 20)
    // Only animate the FIRST text (textLegacy) for now
    if (textLegacy) gsap.set(textLegacy, { opacity: 0, y: 20 });


    // 3. Create Timeline (Scrubbed with Scroll)
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section, // Scroll through the entire section
            start: "top top", // Start when section hits top
            end: "bottom bottom", // End when section hits bottom
            scrub: 1, // Smooth scrubbing
            markers: false // Set to true for debugging if needed
        }
    });

    // Dashed line reversal handled by scrub automatically


    // --- Action 1: Draw Lines Together ---
    const lineDuration = 1.2; // Faster draw (User requested speed up)

    tl.to(dashedLine, {
        clipPath: visibleClip,
        webkitClipPath: visibleClip,
        duration: lineDuration,
        ease: "none" // Linear draw for consistent speed for circle timing
    }, "start");

    tl.to(traditionalLine, {
        clipPath: visibleClip,
        webkitClipPath: visibleClip,
        duration: lineDuration,
        ease: "none"
    }, "start");

    // --- Action 2: Show Circles as Line Passes ---
    // Timings adjusted earlier to sync with line position (fix "late" appearance)
    const fadeDur = 0.3; // Snappier fade

    // Circle 1: 0% (Immediately)
    tl.to(getCircle(1), { opacity: 1, duration: fadeDur }, "start");

    // Circle 2: ~20% (Earlie than 25%)
    tl.to(getCircle(2), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.18}`);

    // Circle 3: ~45% (Earlier than 50%)
    tl.to(getCircle(3), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.42}`);

    // Circle 4: ~70% (Earlier than 75%)
    tl.to(getCircle(4), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.68}`);

    // Circle 5: ~95% (Near End)
    tl.to(getCircle(5), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.92}`);


    // --- Action 3: Show Text & Label at End ---
    if (textLegacy) {
        tl.to(textLegacy, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${lineDuration}`); // Starts right after lines finish
    }

    if (weeksLabel) {
        tl.to(weeksLabel, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${lineDuration}`); // Sync with text
    }

    // --- Action 4: Slide Red Color Line from Left ---
    const redColorLine = document.querySelector('.benefits-color-line.is-red');
    if (redColorLine) {
        tl.to(redColorLine, {
            xPercent: 0,
            duration: 1,
            ease: "power2.out"
        }, `start+=${lineDuration + 0.5}`); // Starts 0.5s after lines finish (bigger gap)

        // Traditional Line: Smoothly repaint to white/10% opacity as Red Line appears
        if (traditionalLine) {
            const path = traditionalLine.querySelector('path');
            if (path) {
                tl.to(path, {
                    fill: "rgba(255, 255, 255, 0.1)", // White with 10% opacity
                    duration: 1,
                    ease: "power2.out"
                }, `start+=${lineDuration + 0.5}`); // Sync with Red Color Line
            }
        }

        // Circle 5: Turn White when Red Line finishes moving (arrives at 0%)
        const circle5 = getCircle(5);
        if (circle5) {
            tl.to(circle5, {
                borderColor: "#ffffff",
                duration: 0.5,
                ease: "power2.out"
            }, `start+=${lineDuration + 0.5 + 1}`);
        }
    }

    // --- Action 5: Slide Blue Color Line + Kulbit Text + Week 4-8 ---
    const blueLineStart = lineDuration + 0.5 + 1 + 0.5;
    const blueColorLine = document.querySelector('.benefits-color-line:not(.is-red)');
    if (blueColorLine) {
        tl.to(blueColorLine, {
            xPercent: 0,
            duration: 1,
            ease: "power2.out"
        }, `start+=${blueLineStart}`);

        // Circle 5: Revert to original color when Blue Line starts
        const circle5 = getCircle(5);
        if (circle5) {
            tl.to(circle5, {
                borderColor: "#363636",
                duration: 0.5,
                ease: "power2.out"
            }, `start+=${blueLineStart}`);
        }
    }

    // Kulbit Text: slide up + fade in (synced with blue line)
    if (kulbitText) {
        tl.to(kulbitText, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${blueLineStart}`);
    }

    // Week 4-8 Label: slide up + fade in (synced with blue line)
    if (weekThreeLabel) {
        tl.to(weekThreeLabel, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${blueLineStart}`);
    }

    // --- Action 6: Fade Out Traditional Text ---
    const phase2Start = blueLineStart + 1 + 0.5; // After blue line (1s) + gap
    if (textLegacy) {
        tl.to(textLegacy, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.in"
        }, `start+=${phase2Start}`);
    }

    // --- Action 7: Reverse-Draw Traditional Line (disappear) ---
    // Clip from left to right (opposite of initial draw)
    const reverseLineStart = phase2Start + 0.6 + 0.2; // After text fades + small gap
    if (traditionalLine) {
        tl.to(traditionalLine, {
            clipPath: hiddenClip,
            webkitClipPath: hiddenClip,
            duration: 1.2,
            ease: "none"
        }, `start+=${reverseLineStart}`);
    }

    // --- Action 8: Show Second Traditional Text (after reverse line) ---
    const secondTextStart = reverseLineStart + 1.2 + 0.3; // After line disappears + gap
    if (textNew) {
        tl.to(textNew, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${secondTextStart}`);
    }

    // --- Action 9: Draw Graph SVGs Sequentially + Show Week Labels ---
    // Select graph containers and their dark-line SVGs (.position-absolute-100 only)
    const graphContainers = document.querySelectorAll('.benefits-graph-svg.desktop-only');
    const graphSvgs = document.querySelectorAll('.benefits-graph-svg.desktop-only .position-absolute-100');

    // Show graph containers but hide the main SVG (gradient + white paths)
    const graphsStart = secondTextStart + 0.8 + 0.3; // After is-second text + gap
    if (graphContainers.length) {
        graphContainers.forEach(g => {
            const mainSvg = g.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg) gsap.set(mainSvg, { opacity: 0 });
            tl.set(g, { opacity: 1 }, `start+=${graphsStart}`);
        });
    }

    // Set dark-line SVGs initial clip-path (hidden)
    if (graphSvgs.length) {
        gsap.set(graphSvgs, { clipPath: hiddenClip, webkitClipPath: hiddenClip });
    }

    const graphDrawDuration = 1.0;
    const graphGap = 0.3;

    // Graph 1
    if (graphSvgs[0]) {
        tl.to(graphSvgs[0], {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: graphDrawDuration,
            ease: "power2.inOut"
        }, `start+=${graphsStart}`);
    }

    // Week 1: after graph 1
    const week1Start = graphsStart + graphDrawDuration;
    if (weekOneLabel) {
        tl.to(weekOneLabel, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, `start+=${week1Start}`);
    }

    // Graph 2: after graph 1 + gap
    const graph2Start = week1Start + graphGap;
    if (graphSvgs[1]) {
        tl.to(graphSvgs[1], {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: graphDrawDuration,
            ease: "power2.inOut"
        }, `start+=${graph2Start}`);
    }

    // Week 2-3: after graph 2
    const week2Start = graph2Start + graphDrawDuration;
    if (weekTwoLabel) {
        tl.to(weekTwoLabel, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, `start+=${week2Start}`);
    }

    // Graph 3: after graph 2 + gap
    const graph3Start = week2Start + graphGap;
    if (graphSvgs[2]) {
        tl.to(graphSvgs[2], {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: graphDrawDuration,
            ease: "power2.inOut"
        }, `start+=${graph3Start}`);
    }

    // --- Action 10: Show Cards Wrapper + Scroll Indicator + Complete Graph 1 + Circle 2 White ---
    const finalPhaseStart = graph3Start + graphDrawDuration + 0.3;

    // Show Cards Wrapper (autoAlpha resets visibility: hidden)
    if (cardsWrapper) {
        tl.to(cardsWrapper, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${finalPhaseStart}`);
    }

    // Show Scroll To See More
    if (scrollMore) {
        tl.to(scrollMore, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${finalPhaseStart}`);
    }

    // Complete Graph 1: Show white line + gradient (main SVG)
    const graph1Container = graphContainers[0];
    if (graph1Container) {
        const mainSvg1 = graph1Container.querySelector('svg:not(.position-absolute-100)');
        if (mainSvg1) {
            const whitePath1 = mainSvg1.querySelector('path:nth-child(2)');
            const gradientPath1 = mainSvg1.querySelector('path:nth-child(1)');

            // Show main SVG
            tl.set(mainSvg1, { opacity: 1 }, `start+=${finalPhaseStart}`);

            // Hide gradient initially, draw white line
            if (gradientPath1) gsap.set(gradientPath1, { opacity: 0 });
            if (whitePath1) gsap.set(whitePath1, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

            // Draw white line
            if (whitePath1) {
                tl.to(whitePath1, {
                    clipPath: visibleClip,
                    webkitClipPath: visibleClip,
                    duration: 1.0,
                    ease: "power2.inOut"
                }, `start+=${finalPhaseStart}`);
            }

            // Fade in gradient after white line
            if (gradientPath1) {
                tl.to(gradientPath1, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }, `start+=${finalPhaseStart + 0.8}`);
            }
        }
    }

    // Circle 2: change border to white after graph 1 completes
    const circle2 = getCircle(2);
    if (circle2) {
        tl.to(circle2, {
            borderColor: "#ffffff",
            duration: 0.5,
            ease: "power2.out"
        }, `start+=${finalPhaseStart + 1.0}`);
    }

    // --- Action 11: Cards Falling Sequence (Scrubbed) ---
    // Logic: As user scrolls, cards stacked behind move up as the front card falls away.

    const cardsStart = finalPhaseStart + 1.5; // Gap before cards start moving
    const cards = document.querySelectorAll('.benefits-card[data-benefit-card]');

    if (cards.length >= 3) {
        // --- Step 1: Card 1 falls, Card 2 -> Pos 1, Card 3 -> Pos 2 ---
        const step1Duration = 3; // Duration relative to scroll distance

        // Card 1: Falls down/left + fades out
        tl.to(cards[0], {
            xPercent: -50, // Move left
            yPercent: 50,  // Move down
            rotation: -10, // Slight tilt
            opacity: 0,
            duration: step1Duration,
            ease: "power1.inOut" // Smooth scrub
        }, `start+=${cardsStart}`);

        // Graph 2 + Circle 3 Sync Logic
        // As Card 2 moves to Pos 1:
        // 1. Draw White Line (during move)
        // 2. Fade Gradient + Circle 3 Border (AFTER move completes)
        const graph2 = document.querySelector('.benefits-graph-svg.is-two.desktop-only');
        if (graph2) {
            const mainSvg2 = graph2.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg2) {
                const whitePath2 = mainSvg2.querySelector('path:nth-child(2)');
                const gradientPath2 = mainSvg2.querySelector('path:nth-child(1)');

                // Initial setup
                tl.set(mainSvg2, { opacity: 1 }, `start+=${cardsStart}`);
                if (gradientPath2) gsap.set(gradientPath2, { opacity: 0 });
                if (whitePath2) gsap.set(whitePath2, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

                // Animate White Line (Sync with Card Move)
                if (whitePath2) {
                    tl.to(whitePath2, {
                        clipPath: visibleClip,
                        webkitClipPath: visibleClip,
                        duration: step1Duration,
                        ease: "power1.inOut"
                    }, `start+=${cardsStart}`);
                }

                // Animate Gradient + Circle 3 (DELAYED until after line finishes)
                const endOfStep1 = cardsStart + step1Duration;
                if (gradientPath2) {
                    tl.to(gradientPath2, {
                        opacity: 1,
                        duration: 0.8, // Smooth fade in
                        ease: "power2.out"
                    }, `start+=${endOfStep1}`);
                }

                // Circle 3: White Border at END of Step 1
                const circle3 = getCircle(3);
                if (circle3) {
                    tl.to(circle3, {
                        borderColor: "#ffffff",
                        duration: 0.5,
                        ease: "power2.out"
                    }, `start+=${endOfStep1}`);
                }
            }
        }

        // Card 2: Moves to Position 1 (Top Center)
        // Needs to animate 'top' to 0% because it started at 50%
        tl.to(cards[1], {
            xPercent: 0,
            top: "0%", // Move UP to top
            yPercent: 0, // Reset centering offset
            scale: 1,
            zIndex: 3, // Visual priority
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`)
            .to(cards[1].children, {
                opacity: 1,
                duration: step1Duration * 0.5
            }, `start+=${cardsStart}`);

        // Card 3: Moves to Position 2 (Right 50%)
        // Stays visually centered (top 50%, yPercent -50 assumed from initial state)
        tl.to(cards[2], {
            xPercent: 50,
            scale: 0.85,
            zIndex: 2,
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`);


        // --- Step 2: Card 2 falls, Card 3 -> Pos 1 ---
        // Add a GAP (pause) before Step 2 starts
        const pauseBetweenSteps = 2;
        const step2Start = cardsStart + step1Duration + pauseBetweenSteps;
        const step2Duration = 3;

        // Card 2: Falls down/left + fades out (RESTORED)
        tl.to(cards[1], {
            xPercent: -50,
            yPercent: 50,
            rotation: -10,
            opacity: 0,
            duration: step2Duration,
            ease: "power1.inOut"
        }, `start+=${step2Start}`);

        // Graph 3 + Circle 4 Sync Logic (Step 2)
        // Similar to Step 1: Draw during move, fill after move
        const graph3 = document.querySelector('.benefits-graph-svg.is-three.desktop-only');
        if (graph3) {
            const mainSvg3 = graph3.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg3) {
                const whitePath3 = mainSvg3.querySelector('path:nth-child(2)');
                const gradientPath3 = mainSvg3.querySelector('path:nth-child(1)');

                // Initial setup
                tl.set(mainSvg3, { opacity: 1 }, `start+=${step2Start}`);
                if (gradientPath3) gsap.set(gradientPath3, { opacity: 0 });
                if (whitePath3) gsap.set(whitePath3, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

                // Animate White Line (Sync with Card Move)
                if (whitePath3) {
                    tl.to(whitePath3, {
                        clipPath: visibleClip,
                        webkitClipPath: visibleClip,
                        duration: step2Duration,
                        ease: "power1.inOut"
                    }, `start+=${step2Start}`);
                }

                // Animate Gradient + Circle 4 (DELAYED until after line finishes)
                const endOfStep2 = step2Start + step2Duration;
                if (gradientPath3) {
                    tl.to(gradientPath3, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }, `start+=${endOfStep2}`);
                }

                // Circle 4: White Border at END of Step 2
                const circle4 = getCircle(4);
                if (circle4) {
                    tl.to(circle4, {
                        borderColor: "#ffffff",
                        duration: 0.5,
                        ease: "power2.out"
                    }, `start+=${endOfStep2}`);
                }
            }
        }

        // Card 3: Moves to Position 1 (Top Center)
        tl.to(cards[2], {
            xPercent: 0,
            top: "0%", // Move UP to top
            yPercent: 0, // Reset centering offset
            scale: 1,
            zIndex: 3,
            duration: step2Duration,
            ease: "power1.inOut"
        }, `start+=${step2Start}`)
            .to(cards[2].children, {
                opacity: 1,
                duration: step2Duration * 0.5
            }, `start+=${step2Start}`);
    }

}

/**
 * ----------------------------------------------------------------------------------
 * Benefits Circles Initial Style
 * ----------------------------------------------------------------------------------
 * Sets initial styles for benefits circles via JS to allow for future dynamic changes.
 * Circles 2-5 start with a dark border (#363636).
 */
function initBenefitsCirclesStyle() {
    // Select circles 2, 3, 4, 5 by attribute (excluding "1")
    const darkBorderCircles = document.querySelectorAll('.benefits-circle[data-benefit-circle]:not([data-benefit-circle="1"])');

    // Set initial border color
    gsap.set(darkBorderCircles, {
        borderColor: "#363636"
    });
}



/**
 * ----------------------------------------------------------------------------------
 * Benefits Cards & Scroll Indicator Animation
 * ----------------------------------------------------------------------------------
 * Animates the cards wrapper and "scroll to see more" indicator.
 * Effect: Fade in + Slide Up on scroll.
 * Also stacks cards on top of each other (via JS positioning).
 */
function initBenefitsCardsAnimation() {
    const cardsWrapper = document.querySelector('.benefits-cards-wrapper');
    const scrollIndicator = document.querySelector('.benefits-scroll-to-see-more.desktop-only');
    const cards = document.querySelectorAll('.benefits-card[data-benefit-card]');

    if (!cardsWrapper && !scrollIndicator) return;

    // --- Stack cards on top of each other ---
    if (cardsWrapper && cards.length > 0) {
        gsap.set(cardsWrapper, {
            position: "relative",
            overflow: "visible"
        });

        // Card configs: [z-index, xPercent, scale, vertically centered]
        const cardConfigs = [
            { zIndex: 3, xPercent: 0, scale: 1, centered: false },  // Card 1: on top, aligned top
            { zIndex: 2, xPercent: 50, scale: 0.85, centered: true },   // Card 2: shifted right 50%, centered
            { zIndex: 1, xPercent: 90, scale: 0.72, centered: true }    // Card 3: shifted right 90%, centered
        ];

        cards.forEach((card, index) => {
            const config = cardConfigs[index] || cardConfigs[cardConfigs.length - 1];
            gsap.set(card, {
                position: "absolute",
                top: config.centered ? "50%" : 0,
                left: 0,
                width: "100%",
                zIndex: config.zIndex,
                xPercent: config.xPercent,
                yPercent: config.centered ? -50 : 0,
                scale: config.scale,
                transformOrigin: config.centered ? "left center" : "left top"
            });

            // Set content opacity to 10% for cards 2 and 3 (index > 0)
            if (index > 0) {
                gsap.set(card.children, { opacity: 0.1 });
            }
        });
    }

    // --- Scroll Trigger Animation (RESET: User requested to remove falling effect for now) ---
    // Ready for rewrite.
    /*
    const section = document.querySelector('.benefits');

    // Create a timeline linked to the section's scroll progress
    // We rely on CSS position: sticky on the container, so we DON'T need pin: true here.
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section, // Scan through the whole section
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            // markers: true // Uncomment for debugging
        }
    });

    // Step 1: Card 1 falls away, Card 2 moves to front, Card 3 moves to second pos
    tl.to(cards[0], {
        xPercent: -100,
        yPercent: 100,
        rotation: -10,
        opacity: 0,
        duration: 1
    })
    .to(cards[1], {
        xPercent: 0,
        scale: 1,
        yPercent: 0, // Centered
        zIndex: 3, // Bring to front visually
        duration: 1
    }, "<") // Sync with Card 1
    .to(cards[1].children, {
        opacity: 1,
        duration: 0.5
    }, "<")
    .to(cards[2], {
        xPercent: 50,
        scale: 0.85,
        zIndex: 2,
        duration: 1
    }, "<");

    // Step 2: Card 2 falls away, Card 3 moves to front
    tl.to(cards[1], {
        xPercent: -100,
        yPercent: 100,
        rotation: -10,
        opacity: 0,
        duration: 1
    })
    .to(cards[2], {
        xPercent: 0,
        scale: 1,
        yPercent: 0,
        zIndex: 3,
        duration: 1
    }, "<")
    .to(cards[2].children, {
        opacity: 1,
        duration: 0.5
    }, "<");
    */
}


function initPreloader() {

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

        // --- Phase 3: Content Swap (Stage 2 -> Stage 3) ---
        // Line 100% -> 200%. Text 2 Grey, Text 3 White.
        tlSticky.to(progressBar, { x: "200%", duration: 1 }, "phase3");
        tlSticky.to([stage2Num, stage2Title], { color: "#404040", duration: 1 }, "phase3");
        tlSticky.to([stage3Num, stage3Title], { color: "#FDFCFC", duration: 1 }, "phase3");
        if (cardSquare) tlSticky.to(cardSquare, { backgroundColor: "#FDFCFC", duration: 1 }, "phase3");

        // --- Card Movement Logic (Phase 3) ---
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

    // --- Phase 1: Red Section (Steps 1-4) ---
    const stepsConfig = [
        { id: 1, barX: "-10%", dotIds: ["1-1"] }, // 90% visible
        { id: 2, barX: "-20%", dotIds: ["1-5"] }, // 80% visible
        { id: 3, barX: "-60%", dotIds: ["1-2", "1-3"] }, // 40% visible
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



/**
 * Ambassadors Section Animation
 * Sequential card reveal/exit
 */
function initAmbassadorsAnimation() {
    const section = document.querySelector('.our-ambassadors');
    // Select elements by data attributes as requested
    const wrapper = document.querySelector('[data-anim-ambassador-wrapper="true"]');
    const card1 = document.querySelector('[data-anim-ambassador="card-1"]');
    const card2 = document.querySelector('[data-anim-ambassador="card-2"]');
    const card3 = document.querySelector('[data-anim-ambassador="card-3"]');

    if (!section || !wrapper || !card1 || !card2 || !card3) return;


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


function initServicesAnimation() {
    const section = document.querySelector('.our-services');
    if (!section) return;

    const cardsWrapper = section.querySelector('.our-services-cards-wrapper');
    const mainWrapper = section.querySelector('.our-services-cards-main-wrapper');

    if (!cardsWrapper || !mainWrapper) return;

    // Use matchMedia to create responsive animations
    ScrollTrigger.matchMedia({
        // Desktop Only
        "(min-width: 992px)": function () {

            // Select ALL card wrappers (siblings)
            const allCards = section.querySelectorAll('.our-services-cards-wrapper');
            if (allCards.length < 5) {
                console.warn("Expected at least 5 service cards, found", allCards.length);
                return;
            }

            const card1 = allCards[0];
            const card5 = allCards[4];

            // Calculate distance to move
            // We want Card 5 to align with Card 1's initial position
            const getScrollAmount = () => {
                // Distance = difference in their current offsets relative to parent
                const dist = card5.offsetLeft - card1.offsetLeft;
                return -dist;
            };

            // --- Entry Animation: Slide Up & Fade In ---
            // Initial State
            gsap.set(mainWrapper, {
                y: "10rem",
                autoAlpha: 0
            });

            // Entry Trigger
            gsap.to(mainWrapper, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%", // Starts when section top hits 80% viewport
                    toggleActions: "play none none reverse", // Reverses when scrolling back up
                    markers: false
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    pin: false, // Relies on CSS sticky positioning
                    scrub: 1,
                    invalidateOnRefresh: true,
                    markers: false
                }
            });

            // Animate ALL cards to the left
            tl.to(allCards, {
                x: () => getScrollAmount(),
                ease: "none",
                duration: 1 // Normalized duration
            });

            // Add empty space at the end (20% of total scroll)
            // This ensures the animation finishes before the unpin (CSS end) happens
            tl.to({}, { duration: 0.2 });
        }
    });
}


// ****************************************************************************
// Team Section Animation
// ****************************************************************************

function initTeamAnimation() {
    const section = document.querySelector('.team');
    const teamHeading = document.querySelector('.team-head-right-second');

    if (!section || !teamHeading) return;

    // Elements to hide initially (team-head-left should remain visible)
    const teamHeadRight = document.querySelector('.team-head-right');
    const teamCards = document.querySelector('.team-cards-wrapper');
    const teamBottomSection = document.querySelector('.team-head-right-bottom');

    // Hide and position elements for entrance animation
    const elementsToHide = [teamHeadRight, teamCards].filter(el => el);
    gsap.set(elementsToHide, { opacity: 0, y: 50 }); // Start below and hidden

    // Hide team-head-right-bottom completely (will appear via scramble)
    if (teamBottomSection) {
        gsap.set(teamBottomSection, { opacity: 0 });
    }

    // Helper to recursively split text nodes into chars
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

    // Desktop only
    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {
        // Split text into character spans (only once)
        if (teamHeading.querySelectorAll('[data-anim-char="true"]').length === 0) {
            splitTextNodesRecursively(teamHeading);
        }

        // Select all character spans
        const chars = teamHeading.querySelectorAll('[data-anim-char="true"]');

        // Animate characters when section reaches 50% viewport (slower typing)
        gsap.to(chars, {
            opacity: 1,
            duration: 0.1, // Increased from 0.05 for slower typing
            stagger: 0.05, // Increased from 0.02 for slower typing
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom-=30%", // Start when section top is 30% into viewport from bottom
                end: "top top",           // End when section top reaches screen top
                scrub: true,
                markers: false
            }
        });
    });

    // After typing completes: move typed text up and fade out
    gsap.to(teamHeading, {
        y: -50,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
            trigger: section,
            start: "top top",       // Start when section reaches top
            end: "top top-=15%",    // Quick animation
            scrub: true,
            markers: false
        }
    });

    // Show team-head-right after typed text exits
    if (teamHeadRight) {
        gsap.to(teamHeadRight, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top top-=15%",  // Start right after typed text starts exiting
                end: "top top-=40%",    // Finish entrance
                scrub: true,
                markers: false
            }
        });
    }

    // Show team-cards-wrapper after team-head-right is fully visible
    if (teamCards) {
        gsap.to(teamCards, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top top-=40%",  // Start after team-head-right finishes
                end: "top top-=65%",    // Smooth entrance
                scrub: true,
                markers: false
            }
        });
    }


    // Move team-head-right-bottom up and fade out quickly (after gap)
    if (teamBottomSection) {
        gsap.fromTo(teamBottomSection,
            { opacity: 1, y: 0 },
            {
                y: -50,
                opacity: 0,
                ease: "power2.in",
                immediateRender: false, // Prevent rendering at start (keeps it hidden for scramble)
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=75%",  // Start after gap (was -65%)
                    end: "top top-=85%",    // Quick fade out
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    // Move team-cards-wrapper up by 14.125rem simultaneously
    if (teamCards) {
        gsap.fromTo(teamCards,
            { y: 0 },
            {
                y: "-14.125rem",  // Move up to -14.125rem (from 0)
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=75%",  // Start after a gap
                    end: "top top-=100%",   // Smooth upward movement
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    // Reveal team-blur-top when cards start moving up
    const teamBlurTop = document.querySelector('.team-blur-top');
    if (teamBlurTop) {
        gsap.set(teamBlurTop, { opacity: 0 }); // Hide initially

        // Fade in before grid wrappers start moving (during the gap)
        gsap.to(teamBlurTop, {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top-=100%",  // Start after cards finish moving
                end: "top top-=110%",    // End right before grid starts moving
                scrub: true,
                markers: false
            }
        });

        // Fade out as first wrapper disappears (so it doesn't overlay second wrapper)
        gsap.to(teamBlurTop, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top-=135%",  // Start near end of first wrapper fade
                end: "top top-=145%",    // Quick fade out after wrapper is gone
                scrub: true,
                markers: false
            }
        });
    }

    // Move both team-grid-wrapper elements up, fade out first wrapper
    const teamGridWrappers = gsap.utils.toArray('.team-grid-wrapper');
    if (teamGridWrappers.length === 2) {
        const firstWrapper = teamGridWrappers[0];
        const secondWrapper = teamGridWrappers[1];

        // Desktop only - calculate distance dynamically
        const mm = ScrollTrigger.matchMedia();
        mm.add("(min-width: 992px)", () => {
            // Calculate the distance: first wrapper's height + gap between them
            const firstRect = firstWrapper.getBoundingClientRect();
            const secondRect = secondWrapper.getBoundingClientRect();
            const distanceToMove = secondRect.top - firstRect.top; // Distance from first to second

            // Both wrappers move up by the calculated distance
            gsap.to([firstWrapper, secondWrapper], {
                y: `-=${distanceToMove}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=110%",  // Start after a gap (was -100%)
                    end: "top top-=140%",    // Smooth upward movement
                    scrub: true,
                    markers: false
                }
            });

            // First wrapper fades out during movement
            gsap.to(firstWrapper, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=110%",  // Same timing as movement (was -100%)
                    end: "top top-=140%",
                    scrub: true,
                    markers: false
                }
            });
        });
    }


    // Scramble text in team-head-right-bottom after main content appears
    if (teamBottomSection) {
        const teamBottomParagraph = teamBottomSection.querySelector('p');

        if (teamBottomParagraph) {
            // Helper to extract all text nodes including those in nested spans
            const getAllTextNodes = (root) => {
                const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
                const nodes = [];
                let n;
                while ((n = walker.nextNode())) {
                    if (n.textContent.trim().length > 0) {
                        nodes.push(n);
                    }
                }
                return nodes;
            };

            // Get all text nodes
            const textNodes = getAllTextNodes(teamBottomParagraph);
            const textItems = textNodes.map(node => ({
                node,
                text: node.textContent
            }));

            // Lock height to prevent layout shift
            const currentHeight = teamBottomSection.getBoundingClientRect().height;
            if (currentHeight > 0) {
                teamBottomSection.style.minHeight = `${currentHeight}px`;
            }

            // Clear all text initially
            textItems.forEach(item => item.node.textContent = "");

            // Create timeline for scramble effect
            const scrambleTl = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=40%",
                    once: true,
                    onEnter: () => {
                        // Make section visible when scramble starts
                        gsap.set(teamBottomSection, { opacity: 1 });
                        scrambleTl.play(0);
                    }
                }
            });

            // Animate each text node with scramble effect
            textItems.forEach((item, i) => {
                scrambleTl.to(
                    item.node,
                    {
                        duration: 0.8,
                        scrambleText: {
                            text: item.text,
                            chars: "01!<>-_\\/[]{}—=+*^?#",
                            revealDelay: 0,
                            speed: 0.6
                        }
                    },
                    i * 0.1  // Stagger each text node slightly
                );
            });
        }
    }

    // Fade out previous section's container as team section enters
    const previousSectionContainer = document.querySelector('.benefits .container.is-stiky-benefits');
    if (previousSectionContainer) {
        gsap.to(previousSectionContainer, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",      // Start immediately when team section enters viewport
                end: "top 15%",           // End when team section is at 85% of viewport (100% - 15% = 85%)
                scrub: true,
                markers: false
            }
        });
    }

    // Fade out team container as footer enters viewport
    const footer = document.querySelector('.footer');
    const teamContainer = section.querySelector('.container');
    if (footer && teamContainer) {
        gsap.to(teamContainer, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: footer,
                start: "top bottom",     // Start when footer enters viewport from bottom
                end: "top 50%",          // End when footer is at 50% viewport height
                scrub: true,
                markers: false
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", initAnimations);
