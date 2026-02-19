function initAnimations() {

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {

        initPreloader();
        initHeroAnimation();
        initScrambleText();
        initAmbassadorsAnimation();
        initStageSecondAnimation();
        initStagesAnimation();
        initProcessAnimation();
        initServicesAnimation();
        initBenefitsGraphAnimation();
        initBenefitsAnimationSequence();
        initBenefitsCirclesStyle();
        initBenefitsCardsAnimation();
        initStageBenefitsParallax();
        initTeamAnimation();
        initCasesAnimation();

        initSmoothScroll();

        initScrollDisableLogic();

        initHeroVideoPause();
    });
}

function initStageBenefitsParallax() {
    const stageSection = document.querySelector('#stage-top-benefits');

    const benefitsSection = stageSection ? stageSection.nextElementSibling : null;

    if (!stageSection || !benefitsSection) return;

    ScrollTrigger.create({
        trigger: stageSection,
        start: "top top",
        endTrigger: benefitsSection,
        end: "top 50%",
        pin: true,
        pinSpacing: false,
        markers: false
    });
}

function initBenefitsGraphAnimation() {

    const graphs = document.querySelectorAll('.benefits-graph-svg.desktop-only');

    graphs.forEach((graph) => {

        const lineSvgContainer = graph.querySelector('.position-absolute-100');

        const mainSvg = graph.querySelector('svg:not(.position-absolute-100)');

        if (!lineSvgContainer || !mainSvg) return;

        const gradientPath = mainSvg.querySelector('path:nth-child(1)');
        const whitePath = mainSvg.querySelector('path:nth-child(2)');

        const darkPath = lineSvgContainer.querySelector('path');

        if (!gradientPath || !whitePath || !darkPath) return;

        gsap.set(graph, { opacity: 0 });

    });
}

function initBenefitsAnimationSequence() {

    const section = document.querySelector('.benefits');

    const dashedLine = document.querySelector('.benefits-dashed-line.desktop-only');
    const traditionalLine = document.querySelector('.traditional-line-svg.desktop-only');
    const circles = document.querySelectorAll('.benefits-circle[data-benefit-circle]');

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

    const colorLines = document.querySelectorAll('.benefits-color-line');

    if (!dashedLine || !traditionalLine) return;

    const getCircle = (id) => document.querySelector(`.benefits-circle[data-benefit-circle="${id}"]`);

    const hiddenClip = "inset(0% 100% 0% 0%)";
    const visibleClip = "inset(0% 0% 0% 0%)";

    gsap.set(dashedLine, { clipPath: hiddenClip, webkitClipPath: hiddenClip });
    gsap.set(traditionalLine, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

    if (kulbitText) gsap.set(kulbitText, { opacity: 0, y: 20 });
    if (textNew) gsap.set(textNew, { opacity: 0, y: 20 });

    if (weeksLabel) gsap.set(weeksLabel, { opacity: 0, y: 20 });
    if (weekThreeLabel) gsap.set(weekThreeLabel, { opacity: 0, y: 20 });
    if (weekOneLabel) gsap.set(weekOneLabel, { opacity: 0, y: 20 });
    if (weekTwoLabel) gsap.set(weekTwoLabel, { opacity: 0, y: 20 });

    if (cardsWrapper) gsap.set(cardsWrapper, { autoAlpha: 0, y: 30 });
    if (scrollMore) gsap.set(scrollMore, { autoAlpha: 0, y: 20 });

    if (colorLines.length) gsap.set(colorLines, { xPercent: -101 });

    if (circles.length) gsap.set(circles, { opacity: 0 });

    if (textLegacy) gsap.set(textLegacy, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            markers: false
        }
    });

    const lineDuration = 1.2;

    tl.to(dashedLine, {
        clipPath: visibleClip,
        webkitClipPath: visibleClip,
        duration: lineDuration,
        ease: "none"
    }, "start");

    tl.to(traditionalLine, {
        clipPath: visibleClip,
        webkitClipPath: visibleClip,
        duration: lineDuration,
        ease: "none"
    }, "start");

    const fadeDur = 0.3;

    tl.to(getCircle(1), { opacity: 1, duration: fadeDur }, "start");

    tl.to(getCircle(2), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.18}`);

    tl.to(getCircle(3), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.42}`);

    tl.to(getCircle(4), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.68}`);

    tl.to(getCircle(5), { opacity: 1, duration: fadeDur }, `start+=${lineDuration * 0.92}`);

    if (textLegacy) {
        tl.to(textLegacy, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${lineDuration}`);
    }

    if (weeksLabel) {
        tl.to(weeksLabel, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${lineDuration}`);
    }

    const redColorLine = document.querySelector('.benefits-color-line.is-red');
    if (redColorLine) {
        tl.to(redColorLine, {
            xPercent: 0,
            duration: 1,
            ease: "power2.out"
        }, `start+=${lineDuration + 0.5}`);

        if (traditionalLine) {
            const path = traditionalLine.querySelector('path');
            if (path) {
                tl.to(path, {
                    fill: "rgba(255, 255, 255, 0.1)",
                    duration: 1,
                    ease: "power2.out"
                }, `start+=${lineDuration + 0.5}`);
            }
        }

        const circle5 = getCircle(5);
        if (circle5) {
            tl.to(circle5, {
                borderColor: "#ffffff",
                duration: 0.5,
                ease: "power2.out"
            }, `start+=${lineDuration + 0.5 + 1}`);
        }
    }

    const blueLineStart = lineDuration + 0.5 + 1 + 0.5;
    const blueColorLine = document.querySelector('.benefits-color-line:not(.is-red)');
    if (blueColorLine) {
        tl.to(blueColorLine, {
            xPercent: 0,
            duration: 1,
            ease: "power2.out"
        }, `start+=${blueLineStart}`);

        const circle5 = getCircle(5);
        if (circle5) {
            tl.to(circle5, {
                borderColor: "#363636",
                duration: 0.5,
                ease: "power2.out"
            }, `start+=${blueLineStart}`);
        }
    }

    if (kulbitText) {
        tl.to(kulbitText, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${blueLineStart}`);
    }

    if (weekThreeLabel) {
        tl.to(weekThreeLabel, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${blueLineStart}`);
    }

    const phase2Start = blueLineStart + 1 + 0.5;
    if (textLegacy) {
        tl.to(textLegacy, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            ease: "power2.in"
        }, `start+=${phase2Start}`);
    }

    const reverseLineStart = phase2Start + 0.6 + 0.2;
    if (traditionalLine) {
        tl.to(traditionalLine, {
            clipPath: hiddenClip,
            webkitClipPath: hiddenClip,
            duration: 1.2,
            ease: "none"
        }, `start+=${reverseLineStart}`);
    }

    const secondTextStart = reverseLineStart + 1.2 + 0.3;
    if (textNew) {
        tl.to(textNew, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${secondTextStart}`);
    }

    const graphContainers = document.querySelectorAll('.benefits-graph-svg.desktop-only');
    const graphSvgs = document.querySelectorAll('.benefits-graph-svg.desktop-only .position-absolute-100');

    const graphsStart = secondTextStart + 0.8 + 0.3;
    if (graphContainers.length) {
        graphContainers.forEach(g => {
            const mainSvg = g.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg) gsap.set(mainSvg, { opacity: 0 });
            tl.set(g, { opacity: 1 }, `start+=${graphsStart}`);
        });
    }

    if (graphSvgs.length) {
        gsap.set(graphSvgs, { clipPath: hiddenClip, webkitClipPath: hiddenClip });
    }

    const graphDrawDuration = 1.0;
    const graphGap = 0.3;

    if (graphSvgs[0]) {
        tl.to(graphSvgs[0], {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: graphDrawDuration,
            ease: "power2.inOut"
        }, `start+=${graphsStart}`);
    }

    const week1Start = graphsStart + graphDrawDuration;
    if (weekOneLabel) {
        tl.to(weekOneLabel, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, `start+=${week1Start}`);
    }

    const graph2Start = week1Start + graphGap;
    if (graphSvgs[1]) {
        tl.to(graphSvgs[1], {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: graphDrawDuration,
            ease: "power2.inOut"
        }, `start+=${graph2Start}`);
    }

    const week2Start = graph2Start + graphDrawDuration;
    if (weekTwoLabel) {
        tl.to(weekTwoLabel, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, `start+=${week2Start}`);
    }

    const graph3Start = week2Start + graphGap;
    if (graphSvgs[2]) {
        tl.to(graphSvgs[2], {
            clipPath: visibleClip,
            webkitClipPath: visibleClip,
            duration: graphDrawDuration,
            ease: "power2.inOut"
        }, `start+=${graph3Start}`);
    }

    const finalPhaseStart = graph3Start + graphDrawDuration + 0.3;

    if (cardsWrapper) {
        tl.to(cardsWrapper, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${finalPhaseStart}`);
    }

    if (scrollMore) {
        tl.to(scrollMore, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        }, `start+=${finalPhaseStart}`);
    }

    const graph1Container = graphContainers[0];
    if (graph1Container) {
        const mainSvg1 = graph1Container.querySelector('svg:not(.position-absolute-100)');
        if (mainSvg1) {
            const whitePath1 = mainSvg1.querySelector('path:nth-child(2)');
            const gradientPath1 = mainSvg1.querySelector('path:nth-child(1)');

            tl.set(mainSvg1, { opacity: 1 }, `start+=${finalPhaseStart}`);

            if (gradientPath1) gsap.set(gradientPath1, { opacity: 0 });
            if (whitePath1) gsap.set(whitePath1, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

            if (whitePath1) {
                tl.to(whitePath1, {
                    clipPath: visibleClip,
                    webkitClipPath: visibleClip,
                    duration: 1.0,
                    ease: "power2.inOut"
                }, `start+=${finalPhaseStart}`);
            }

            if (gradientPath1) {
                tl.to(gradientPath1, {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out"
                }, `start+=${finalPhaseStart + 0.8}`);
            }
        }
    }

    const circle2 = getCircle(2);
    if (circle2) {
        tl.to(circle2, {
            borderColor: "#ffffff",
            duration: 0.5,
            ease: "power2.out"
        }, `start+=${finalPhaseStart + 1.0}`);
    }

    const cardsStart = finalPhaseStart + 1.5;
    const cards = document.querySelectorAll('.benefits-card[data-benefit-card]');

    if (cards.length >= 3) {

        const step1Duration = 3;

        tl.to(cards[0], {
            xPercent: -50,
            yPercent: 50,
            rotation: -10,
            opacity: 0,
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`);

        const graph2 = document.querySelector('.benefits-graph-svg.is-two.desktop-only');
        if (graph2) {
            const mainSvg2 = graph2.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg2) {
                const whitePath2 = mainSvg2.querySelector('path:nth-child(2)');
                const gradientPath2 = mainSvg2.querySelector('path:nth-child(1)');

                tl.set(mainSvg2, { opacity: 1 }, `start+=${cardsStart}`);
                if (gradientPath2) gsap.set(gradientPath2, { opacity: 0 });
                if (whitePath2) gsap.set(whitePath2, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

                if (whitePath2) {
                    tl.to(whitePath2, {
                        clipPath: visibleClip,
                        webkitClipPath: visibleClip,
                        duration: step1Duration,
                        ease: "power1.inOut"
                    }, `start+=${cardsStart}`);
                }

                const endOfStep1 = cardsStart + step1Duration;
                if (gradientPath2) {
                    tl.to(gradientPath2, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }, `start+=${endOfStep1}`);
                }

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

        tl.to(cards[1], {
            xPercent: 0,
            top: "0%",
            yPercent: 0,
            scale: 1,
            zIndex: 3,
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`)
            .to(cards[1].children, {
                opacity: 1,
                duration: step1Duration * 0.5
            }, `start+=${cardsStart}`);

        tl.to(cards[2], {
            xPercent: 50,
            scale: 0.85,
            zIndex: 2,
            duration: step1Duration,
            ease: "power1.inOut"
        }, `start+=${cardsStart}`);

        const pauseBetweenSteps = 2;
        const step2Start = cardsStart + step1Duration + pauseBetweenSteps;
        const step2Duration = 3;

        tl.to(cards[1], {
            xPercent: -50,
            yPercent: 50,
            rotation: -10,
            opacity: 0,
            duration: step2Duration,
            ease: "power1.inOut"
        }, `start+=${step2Start}`);

        const graph3 = document.querySelector('.benefits-graph-svg.is-three.desktop-only');
        if (graph3) {
            const mainSvg3 = graph3.querySelector('svg:not(.position-absolute-100)');
            if (mainSvg3) {
                const whitePath3 = mainSvg3.querySelector('path:nth-child(2)');
                const gradientPath3 = mainSvg3.querySelector('path:nth-child(1)');

                tl.set(mainSvg3, { opacity: 1 }, `start+=${step2Start}`);
                if (gradientPath3) gsap.set(gradientPath3, { opacity: 0 });
                if (whitePath3) gsap.set(whitePath3, { clipPath: hiddenClip, webkitClipPath: hiddenClip });

                if (whitePath3) {
                    tl.to(whitePath3, {
                        clipPath: visibleClip,
                        webkitClipPath: visibleClip,
                        duration: step2Duration,
                        ease: "power1.inOut"
                    }, `start+=${step2Start}`);
                }

                const endOfStep2 = step2Start + step2Duration;
                if (gradientPath3) {
                    tl.to(gradientPath3, {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out"
                    }, `start+=${endOfStep2}`);
                }

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

        tl.to(cards[2], {
            xPercent: 0,
            top: "0%",
            yPercent: 0,
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

function initBenefitsCirclesStyle() {

    const darkBorderCircles = document.querySelectorAll('.benefits-circle[data-benefit-circle]:not([data-benefit-circle="1"])');

    gsap.set(darkBorderCircles, {
        borderColor: "#363636"
    });
}

function initBenefitsCardsAnimation() {
    const cardsWrapper = document.querySelector('.benefits-cards-wrapper');
    const scrollIndicator = document.querySelector('.benefits-scroll-to-see-more.desktop-only');
    const cards = document.querySelectorAll('.benefits-card[data-benefit-card]');

    if (!cardsWrapper && !scrollIndicator) return;

    if (cardsWrapper && cards.length > 0) {
        gsap.set(cardsWrapper, {
            position: "relative",
            overflow: "visible"
        });

        const cardConfigs = [
            { zIndex: 3, xPercent: 0, scale: 1, centered: false },
            { zIndex: 2, xPercent: 50, scale: 0.85, centered: true },
            { zIndex: 1, xPercent: 90, scale: 0.72, centered: true }
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

            if (index > 0) {
                gsap.set(card.children, { opacity: 0.1 });
            }
        });
    }

}

function initPreloader() {

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

    const soundBtn = document.querySelector('.sound-btn');

    if (!wrapper || !zero || !precentContainer || !centerSquare) return;

    const root = document.documentElement;
    const cssVar = (name, fallback) => {
        const v = getComputedStyle(root).getPropertyValue(name).trim();
        return v || fallback;
    };

    const C_WHITE = cssVar("--white", "#ffffff");
    const C_BLUE = cssVar("--blue", "#0066ff");
    const C_PINK = cssVar("--pink", "#ff3ea5");

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
    if (soundBtn) gsap.set(soundBtn, { autoAlpha: 0 });

    const counter = { p: 0 };
    const updateCounter = () => {
        zero.textContent = String(Math.round(counter.p));
    };

    const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" }
    });

    tl.to(counter, {
        p: 100,
        duration: 2.3,
        ease: "none",
        onUpdate: updateCounter
    }, 0);

    if (logo) tl.to(logo, { autoAlpha: 1, duration: 0.3 }, 0.0);
    if (sq1 && sq2) {
        tl.to(sq1, { autoAlpha: 1, x: "-5.8125rem", y: "-4.0625rem", duration: 0.3 }, 0.0);
        tl.to(sq2, { autoAlpha: 1, x: "5.8125rem", y: "4.0625rem", duration: 0.3 }, 0.0);
    }

    if (sq1 && sq2) {
        tl.to(sq1, { x: "11.5rem", duration: 0.3 }, 0.3);
        tl.to(sq2, { x: "-11.5rem", duration: 0.3 }, 0.3);
    }

    if (sq1 && sq2) {
        tl.to(sq1, { x: "6.775rem", y: "0rem", duration: 0.3 }, 0.6);
        tl.to(sq2, { x: "-6.775rem", y: "0rem", duration: 0.3 }, 0.6);
    }

    tl.to(centerSquare, { width: "16.5625rem", height: "16.5625rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (logo) tl.to(logo, { width: "9.5625rem", height: "11.0625rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (sq1) tl.to(sq1, { width: "2.69rem", height: "2.69rem", x: "13.87rem", y: "0rem", duration: 0.4, ease: "power3.inOut" }, 0.9);
    if (sq2) tl.set(sq2, { autoAlpha: 0 }, 1.0);

    if (sq1) {
        tl.set(sq1, { zIndex: 6 }, 1.3);
        tl.to(sq1, { x: "0rem", y: "0rem", width: "16.5625rem", height: "16.5625rem", backgroundColor: C_BLUE, duration: 0.3, ease: "power2.inOut" }, 1.3);
    }
    if (logo) tl.set(logo, { zIndex: 7 }, 1.3);
    if (masks.length) tl.set(masks, { autoAlpha: 0 }, 1.3);

    tl.set(centerSquare, { backgroundColor: C_BLUE }, 1.6);
    if (logo) tl.to(logo, { autoAlpha: 0, duration: 0.3 }, 1.6);
    if (sq1) tl.to(sq1, { autoAlpha: 0, duration: 0.3 }, 1.6);

    tl.to(centerSquare, {
        height: "0rem",
        autoAlpha: 0,
        duration: 0.15,
        ease: "power2.inOut"
    }, 1.9);

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

        if (soundBtn) {
            tl.to(soundBtn, { autoAlpha: 1, duration: 0.1, ease: "power2.out" }, 2.3);
        }

        button.addEventListener("click", () => {
            window.scrollTo(0, 0);
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

function initScrambleText() {

    const targets = document.querySelectorAll('[data-scramble="true"]');
    if (!targets.length) return;

    const lockHeight = (el) => {
        const h = el.getBoundingClientRect().height;
        const w = el.getBoundingClientRect().width;
        if (h > 0) {
            el.style.height = `${h}px`;
            el.style.width = `${w}px`;
            el.style.overflow = "hidden";
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
                const created = splitTextNode(n);
                created.forEach((cn) => animNodes.push(cn));
            } else {
                animNodes.push(n);
            }
        });

        const items = animNodes
            .map((node) => ({ node, text: node.textContent || "" }))
            .filter((it) => it.text.trim().length);

        if (!items.length) return;

        items.forEach((it) => (it.node.textContent = ""));

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

function initHeroAnimation() {

    const section = document.querySelector('.hero');
    if (!section) return;

    const contentWrapper = section.querySelector('[data-anim-hero="text-block"]');
    const videoWrapper = section.querySelector('[data-anim-hero="video-wrapper"]');
    const bgVideo = section.querySelector('[data-anim-hero="video-block"]');
    const leftGradient = section.querySelector('[data-anim-hero="text-gradient"]');
    const videoMask = section.querySelector('[data-anim-hero="video-mask"]');

    ScrollTrigger.matchMedia({

        "(min-width: 992px)": function () {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=200%",
                    scrub: true,
                    markers: false,
                }
            });

            tl.to(contentWrapper, { y: "150vh", ease: "none" }, 0);
            tl.to(leftGradient, { y: "150vh", ease: "none" }, 0);

            gsap.set(videoWrapper, {
                willChange: "width, height, transform",
                force3D: true,
                backfaceVisibility: "hidden"
            });

            tl.to(videoWrapper, {
                height: "100vh",
                width: "100vw",
                minWidth: "100vw",

                position: "absolute",

                left: "50%",
                x: "-50%",

                top: "0rem",

                ease: "none",
                force3D: true
            }, 0);

            tl.to(bgVideo, { y: "-12rem", ease: "none" }, 0);

            tl.to(videoMask, { opacity: 0, ease: "none" }, 0);
        },

        "(max-width: 991px)": function () {

        }
    });
}

function initStageSecondAnimation() {

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
            start: "top 80%",
            markers: false
        }
    });
}

function initStagesAnimation() {
    const section = document.querySelector('.stages');
    if (!section) return;

    const progressBar = document.querySelector('[data-anim-stage-progress="progress-stages"]');
    const mainCard = document.querySelector('[data-anim-stage="main-card"]');
    const secondCard = document.querySelector('[data-anim-stage="second-wrapper"]');

    if (!progressBar || !mainCard || !secondCard) return;

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {

        gsap.set(progressBar, { x: "-100%" });
        gsap.set([mainCard, secondCard], { y: "10rem", opacity: 0 });

        const tlEntry = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 50%",
                end: "top top",
                scrub: true,
                markers: false
            }
        });

        const stage1Num = section.querySelector('[data-anim-stage-text="num-1"]');
        const stage1Title = section.querySelector('[data-anim-stage-text="title-1"]');
        const stage2Num = section.querySelector('[data-anim-stage-text="num-2"]');
        const stage2Title = section.querySelector('[data-anim-stage-text="title-2"]');
        const stage3Num = section.querySelector('[data-anim-stage-text="num-3"]');
        const stage3Title = section.querySelector('[data-anim-stage-text="title-3"]');

        gsap.set([stage1Num, stage1Title, stage2Num, stage2Title, stage3Num, stage3Title], { color: "#404040" });

        tlEntry.to(mainCard, { y: "0rem", opacity: 1, duration: 1 }, "step1");
        tlEntry.to(progressBar, { x: "0%", duration: 1 }, "step1");
        tlEntry.to([stage1Num, stage1Title], { color: "#FDFCFC", duration: 1 }, "step1");

        tlEntry.to(secondCard, { y: "0rem", opacity: 0.3, duration: 1 }, "step2-=0.5");

        const tlSticky = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                markers: false
            }
        });

        const card1 = section.querySelector('[data-anim-card="1"]');
        const card2 = section.querySelector('[data-anim-card="2"]');
        const card3 = section.querySelector('[data-anim-card="3"]');
        const cardSquare = section.querySelector('[data-anim-stage="square"]');

        if (card3) gsap.set(card3, { opacity: 0 });

        tlSticky.to({}, { duration: 2.0 });

        tlSticky.to(progressBar, { x: "100%", duration: 1 }, "phase2");
        tlSticky.to([stage1Num, stage1Title], { color: "#404040", duration: 1 }, "phase2");
        tlSticky.to([stage2Num, stage2Title], { color: "#FDFCFC", duration: 1 }, "phase2");
        if (cardSquare) tlSticky.to(cardSquare, { backgroundColor: "#62B0FF", duration: 1 }, "phase2");

        if (card1 && card2 && card3) {

            tlSticky.to(card1, { y: "-3.5rem", opacity: 0, duration: 0.3 }, "phase2");

            tlSticky.to(card2, { y: "-7.5rem", duration: 0.7 }, "phase2+=0.3");
            tlSticky.to(card3, { y: "-7.5rem", duration: 0.7 }, "phase2+=0.3");
            tlSticky.to(card3, { opacity: 1, duration: 0.3 }, "phase2+=0.3");

            tlSticky.to(card1, { y: "15rem", duration: 0.1 }, "phase2+=1");
            tlSticky.set(card1, { zIndex: 10 }, "phase2+=1");
        }

        tlSticky.to({}, { duration: 1.5 });

        tlSticky.to(progressBar, { x: "200%", duration: 1 }, "phase3");
        tlSticky.to([stage2Num, stage2Title], { color: "#404040", duration: 1 }, "phase3");
        tlSticky.to([stage3Num, stage3Title], { color: "#FDFCFC", duration: 1 }, "phase3");
        if (cardSquare) tlSticky.to(cardSquare, { backgroundColor: "#FDFCFC", duration: 1 }, "phase3");

        if (card1 && card2 && card3) {

            tlSticky.to(card2, { y: "-11rem", opacity: 0, duration: 0.3 }, "phase3");

            tlSticky.to(card3, { y: "-15rem", duration: 0.7 }, "phase3+=0.3");
            tlSticky.to(card1, { y: "7.5rem", opacity: 1, duration: 0.7 }, "phase3+=0.3");
        }

        tlSticky.to({}, { duration: 1 });

        const targetNumber = mainCard.querySelector('[data-stage-target="number"]');
        const targetHeading = mainCard.querySelector('[data-stage-target="heading"]');
        const targetParagraph = mainCard.querySelector('[data-stage-target="paragraph"]');
        const targetImage = mainCard.querySelector('[data-stage-target="image"]');

        const sourceNumber2 = document.querySelector('[data-stage-source="number-2"]');
        const sourceHeading2 = document.querySelector('[data-stage-source="heading-2"]');
        const sourceParagraph2 = document.querySelector('[data-stage-source="paragraph-2"]');
        const sourceImage2 = document.querySelector('[data-stage-source="image-2"]');

        const stage1NumberText = targetNumber ? targetNumber.textContent : "";
        const stage1HeadingSpan = targetHeading && targetHeading.querySelector('span') ? targetHeading.querySelector('span').textContent : "";
        const stage1ParagraphText = targetParagraph ? targetParagraph.textContent : "";

        const sensitiveTypewriter = (timeline, target, fromText, toText, label) => {

            const eraseProxy = { len: fromText.length };

            timeline.to(eraseProxy, {
                len: 0,
                duration: 0.5,
                ease: "none",
                onUpdate: () => {
                    target.textContent = fromText.substring(0, Math.round(eraseProxy.len));
                }
            }, label);

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

        if (targetHeading) gsap.set(targetHeading, { minHeight: "2.6em" });
        if (targetParagraph) gsap.set(targetParagraph, { minHeight: "5.2em" });

        const tlPhase2 = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top-=800",
                end: "bottom bottom",
                toggleActions: "play none none reverse",
                scrub: false,
                markers: false
            }
        });

        if (targetNumber && sourceNumber2) {
            sensitiveTypewriter(tlPhase2, targetNumber, stage1NumberText, sourceNumber2.textContent, "phase2");
        }

        if (targetHeading && sourceHeading2) {
            const targetSpan = targetHeading.querySelector('span');
            const sourceSpan = sourceHeading2.querySelector('span');
            if (targetSpan && sourceSpan) {
                sensitiveTypewriter(tlPhase2, targetSpan, stage1HeadingSpan, sourceSpan.textContent, "phase2");
            }
        }

        if (targetParagraph && sourceParagraph2) {
            const parent = targetParagraph.parentElement;
            if (parent) tlPhase2.set(parent, { height: parent.offsetHeight, overflow: "hidden" }, "phase2");

            sensitiveTypewriter(tlPhase2, targetParagraph, stage1ParagraphText, sourceParagraph2.textContent, "phase2");

            if (parent) tlPhase2.set(parent, { height: "auto", overflow: "visible" }, "phase2+=1.4");
        }

        if (targetImage && sourceImage2) {
            tlPhase2.to(targetImage, { opacity: 0, duration: 0.2 }, "phase2");
            tlPhase2.add(() => {
                targetImage.src = sourceImage2.src;
                targetImage.srcset = sourceImage2.srcset;
            }, "phase2+=0.2");
            tlPhase2.to(targetImage, { opacity: 1, duration: 0.2 }, "phase2+=0.25");
        }

        const tlPhase3 = gsap.timeline({ paused: true });

        tlSticky.to({}, {
            duration: 0.1,
            onStart: () => tlPhase3.play(),
            onReverseComplete: () => tlPhase3.reverse()
        }, "phase3");

        const sourceNumber3 = document.querySelector('[data-stage-source="number-3"]');
        const sourceHeading3 = document.querySelector('[data-stage-source="heading-3"]');
        const sourceParagraph3 = document.querySelector('[data-stage-source="paragraph-3"]');
        const sourceImage3 = document.querySelector('[data-stage-source="image-3"]');

        if (targetNumber && sourceNumber3 && sourceNumber2) {
            sensitiveTypewriter(tlPhase3, targetNumber, sourceNumber2.textContent, sourceNumber3.textContent, "phase3");
        }

        if (targetHeading && sourceHeading3 && sourceHeading2) {
            const targetSpan = targetHeading.querySelector('span');
            const sourceSpan3 = sourceHeading3.querySelector('span');
            const sourceSpan2 = sourceHeading2.querySelector('span');

            if (targetSpan && sourceSpan3 && sourceSpan2) {

                tlPhase3.set(targetHeading, { height: targetHeading.offsetHeight, overflow: "hidden" }, "phase3");

                sensitiveTypewriter(tlPhase3, targetSpan, sourceSpan2.textContent, sourceSpan3.textContent, "phase3");

                tlPhase3.set(targetHeading, { height: "auto", overflow: "visible" }, "phase3+=1.35");
            }
        }

        if (targetParagraph && sourceParagraph3 && sourceParagraph2) {
            const parent = targetParagraph.parentElement;
            if (parent) tlPhase3.set(parent, { height: parent.offsetHeight, overflow: "hidden" }, "phase3");

            sensitiveTypewriter(tlPhase3, targetParagraph, sourceParagraph2.textContent, sourceParagraph3.textContent, "phase3");

            if (parent) tlPhase3.set(parent, { height: "auto", overflow: "visible" }, "phase3+=1.4");
        }

        if (targetImage && sourceImage3) {
            tlPhase3.to(targetImage, { opacity: 0, duration: 0.2 }, "phase3");
            tlPhase3.add(() => {
                targetImage.src = sourceImage3.src;
                targetImage.srcset = sourceImage3.srcset;
            }, "phase3+=0.2");
            tlPhase3.to(targetImage, { opacity: 1, duration: 0.2 }, "phase3+=0.25");
        }

        tlSticky.to({}, { duration: 0.5 });

    });
}

function initProcessAnimation() {
    const section = document.querySelector('.proces');
    if (!section) return;

    const descriptions = section.querySelectorAll('[data-anim-process-desc]');
    const dots = section.querySelectorAll('[data-anim-process-dot]');
    const processBarLines = section.querySelectorAll('[data-anim-process-bar-line]');

    if (descriptions.length) {
        gsap.set(descriptions, {
            autoAlpha: 0,
            y: "3.5rem"
        });
    }

    if (dots.length) {
        gsap.set(dots, {
            autoAlpha: 0
        });
    }

    if (processBarLines.length) {
        gsap.set(processBarLines, {
            x: "-100%"
        });
    }

    const blueWrapper = section.querySelector('.process-info-blue-wrapper');
    if (blueWrapper) {
        gsap.set(blueWrapper, { autoAlpha: 0 });
    }

    const phase3Descs = section.querySelectorAll('[data-anim-process-desc="9"], [data-anim-process-desc="10"], [data-anim-process-desc="11"], [data-anim-process-desc="12"]');
    if (phase3Descs.length) {
        gsap.set(phase3Descs, { y: "3.5rem", autoAlpha: 0 });
    }

    const animateMap = (trigger, maskPathId, fillLayerId) => {
        const maskPath = document.getElementById(maskPathId);
        const fillLayer = document.getElementById(fillLayerId);

        if (!maskPath || !fillLayer) return;

        const length = maskPath.getTotalLength();

        gsap.set(maskPath, {
            strokeDasharray: length,
            strokeDashoffset: length,
            autoAlpha: 0
        });
        gsap.set(fillLayer, { opacity: 0 });

    };

    const redMap = section.querySelector('.map-svg');
    if (redMap) animateMap(redMap, 'mask-path', 'fill-layer');

    const blueMap = section.querySelector('.map-svg-blue');
    if (blueMap) animateMap(blueMap, 'blue-mask-path', 'blue-fill-layer');

    const tlProcess = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=300%",
            scrub: 1,
            trackMarkers: false,

            pin: section.querySelector('[data-proces-anim-container="true"]') || true
        }
    });

    const stepsConfig = [
        { id: 1, barX: "-10%", dotIds: ["1-1"] },
        { id: 2, barX: "-20%", dotIds: ["1-5"] },
        { id: 3, barX: "-60%", dotIds: ["1-2", "1-3"] },
        { id: 4, barX: "-80%", dotIds: ["1-4"] }
    ];

    stepsConfig.forEach((step) => {
        const desc = section.querySelector(`[data-anim-process-desc="${step.id}"]`);
        const barLine = section.querySelector(`[data-anim-process-bar-line="${step.id}"]`);

        const dots = [];
        step.dotIds.forEach(did => {
            const d = section.querySelector(`[data-anim-process-dot="${did}"]`);
            if (d) dots.push(d);
        });

        if (desc) {

            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            });

            const label = `step${step.id}-details`;

            if (barLine) {
                tlProcess.to(barLine, {
                    x: step.barX,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            if (dots.length) {
                tlProcess.to(dots, {
                    autoAlpha: 1,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            tlProcess.to({}, { duration: 0.5 });
        }
    });

    const redMaskPath = document.getElementById('mask-path');
    const redFillLayer = document.getElementById('fill-layer');

    let tlMap = gsap.timeline({ paused: true });

    if (redMaskPath && redFillLayer) {

        tlMap.to(redMaskPath, {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "none"
        });

        tlMap.to(redFillLayer, {
            autoAlpha: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    }

    const playRedMap = () => {
        tlMap.play();
    };

    const reverseRedMap = () => {
        tlMap.reverse();
    };

    tlProcess.to({}, {
        duration: 0.1,
        onStart: playRedMap,
        onReverseComplete: reverseRedMap
    });

    tlProcess.to({}, { duration: 12 });

    const phase1Descs = section.querySelectorAll('[data-anim-process-desc="1"], [data-anim-process-desc="2"], [data-anim-process-desc="3"], [data-anim-process-desc="4"]');
    const dotsWrapper1 = section.querySelector('[data-anim-process-dots="1"]');
    const redMapSvg = section.querySelector('.map-svg');

    if (phase1Descs.length) {
        tlProcess.to(phase1Descs, {
            y: "-5rem",
            autoAlpha: 0,
            duration: 1,
            ease: "none"
        }, "+=0.2");
    }

    if (dotsWrapper1) {

        const childDots = dotsWrapper1.querySelectorAll('[data-anim-process-dot]');
        if (childDots.length) {
            tlProcess.to(childDots, {
                autoAlpha: 0.2,
                duration: 1,
                ease: "none"
            }, "<");
        }
    }

    if (redMapSvg) {
        tlProcess.to(redMapSvg, {
            autoAlpha: 0.2,
            duration: 1,
            ease: "none"
        }, "<");
    }

    if (redFillLayer) {
        tlProcess.to(redFillLayer, {
            autoAlpha: 0,
            duration: 1,
            ease: "none"
        }, "<");
    }

    if (blueWrapper) {
        tlProcess.to(blueWrapper, {
            autoAlpha: 1,
            duration: 0.1,
            ease: "none"
        }, "+=0.1");
    }

    const stepsConfigPhase2 = [
        { id: 5, barX: "-70%", dotIds: ["2-1"] },
        { id: 6, barX: "-60%", dotIds: ["2-2"] },
        { id: 7, barX: "-10%", dotIds: ["2-3", "2-4"] },
        { id: 8, barX: "-20%", dotIds: ["2-5"] }
    ];

    stepsConfigPhase2.forEach((step) => {
        const desc = section.querySelector(`[data-anim-process-desc="${step.id}"]`);
        const barLine = section.querySelector(`[data-anim-process-bar-line="${step.id}"]`);

        const dots = [];
        step.dotIds.forEach(did => {
            const d = section.querySelector(`[data-anim-process-dot="${did}"]`);
            if (d) dots.push(d);
        });

        if (desc) {

            let position = "+=0.2";
            if (step.id === 5) {
                tlProcess.add("phase2Start", "+=0.2");
                position = "phase2Start";
            }

            tlProcess.to(desc, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "none"
            }, position);

            const label = `step${step.id}-details`;
            if (barLine) {
                tlProcess.to(barLine, {
                    x: step.barX,
                    duration: 1,
                    ease: "none"
                }, label);
            }

            if (dots.length) {
                tlProcess.to(dots, {
                    autoAlpha: 1,
                    duration: 1,
                    ease: "none"
                }, label);
            }
        }
    });

    const infoSquare = section.querySelector('.process-info-square');
    const infoTitleWrapper = section.querySelector('.width-180-a-a');
    const infoTitle = section.querySelector('.process-info-title');
    const originalTitleText = "Traditional Production House";

    if (infoTitleWrapper) {
        tlProcess.to(infoTitleWrapper, {
            width: "14rem",
            duration: 0.5,
            ease: "none"
        }, "phase2Start");
    }

    tlProcess.to(infoSquare, {
        backgroundColor: "#ffffff",
        duration: 0.5,
        ease: "none",
        onStart: () => {
            if (infoTitle) {

                infoTitle.innerHTML = '<span id="brand-s1" style="color:#62B0FF"></span><br><span id="brand-s2" style="color:#ffffff"></span>';

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

            if (infoTitle) infoTitle.textContent = originalTitleText;
        }
    }, "<");

    const blueMaskPath = document.getElementById('blue-mask-path');
    const blueFillLayer = document.getElementById('blue-fill-layer');

    let tlBlueMap = gsap.timeline({ paused: true });

    if (blueMaskPath && blueFillLayer) {

        tlBlueMap.to(blueMaskPath, {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "none"
        });

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

    tlProcess.to({}, {
        duration: 0.1,
        onStart: playBlueMap,
        onReverseComplete: reverseBlueMap
    });

    tlProcess.to({}, { duration: 12 });

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
        }, "+=0.5");
    }

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

    tlProcess.to({}, { duration: 25 });

}

function initAmbassadorsAnimation() {
    const section = document.querySelector('.our-ambassadors');

    const wrapper = document.querySelector('[data-anim-ambassador-wrapper="true"]');
    const card1 = document.querySelector('[data-anim-ambassador="card-1"]');
    const card2 = document.querySelector('[data-anim-ambassador="card-2"]');
    const card3 = document.querySelector('[data-anim-ambassador="card-3"]');

    const cardText1 = document.querySelector('[data-anim-ambassador="card-text-1"]');
    const cardText2 = document.querySelector('[data-anim-ambassador="card-text-2"]');

    if (!section || !wrapper || !card1 || !card2 || !card3) return;

    const cardHeight = card1.offsetHeight || 516;
    gsap.set(wrapper, { height: cardHeight });

    gsap.set([card1, card2, card3], {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%"
    });

    gsap.set([card2, card3], { y: "100%", opacity: 0 });

    if (cardText2) {
        gsap.set(cardText2, { y: "100%", opacity: 0 });
    }

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

                scrub: true,
                markers: false
            }
        });

        tl.to(card1, { y: "-100%", duration: 1 });
        tl.to(card1, { opacity: 0, duration: 0.3 }, "<");

        if (cardText1) {

            tl.to(cardText1, { y: "-100%", opacity: 0, duration: 0.3 }, "<");
        }

        tl.to(card2, { y: "0%", opacity: 1, duration: 1 }, "-=0.5");

        if (cardText2) {

            tl.to(cardText2, { y: "0%", opacity: 1, duration: 1 }, "<+=0.5");
        }

        tl.to({}, { duration: 0.5 });

        tl.to(card2, { y: "-100%", opacity: 0, duration: 1 });

        tl.to(card3, { y: "0%", opacity: 1, duration: 1 }, "-=0.5");

    });
}

function initServicesAnimation() {
    const section = document.querySelector('.our-services');
    if (!section) return;

    const cardsWrapper = section.querySelector('.our-services-cards-wrapper');
    const mainWrapper = section.querySelector('.our-services-cards-main-wrapper');

    if (!cardsWrapper || !mainWrapper) return;

    ScrollTrigger.matchMedia({

        "(min-width: 992px)": function () {

            const allCards = section.querySelectorAll('.our-services-cards-wrapper');
            if (allCards.length < 5) {

                return;
            }

            const card1 = allCards[0];
            const card5 = allCards[4];

            const getScrollAmount = () => {

                const dist = card5.offsetLeft - card1.offsetLeft;
                return -dist;
            };

            gsap.set(mainWrapper, {
                y: "10rem",
                autoAlpha: 0
            });

            gsap.to(mainWrapper, {
                y: "0rem",
                autoAlpha: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    markers: false
                }
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    pin: false,
                    scrub: 1,
                    invalidateOnRefresh: true,
                    markers: false
                }
            });

            tl.to(allCards, {
                x: () => getScrollAmount(),
                ease: "none",
                duration: 1
            });

            tl.to({}, { duration: 0.2 });
        }
    });
}

function initTeamAnimation() {
    const section = document.querySelector('.team');
    const teamHeading = document.querySelector('.team-head-right-second');

    if (section) gsap.set(section, { height: "1000vh" });

    if (!section || !teamHeading) return;

    const teamHeadRight = document.querySelector('.team-head-right');
    const teamCards = document.querySelector('.team-cards-wrapper');
    const teamBottomSection = document.querySelector('.team-head-right-bottom');
    const footer = document.querySelector('.footer');

    // 1. Initial configuration
    if (section) gsap.set(section, { height: "250vh" }); // Reduced from 1000vh to remove dead space

    const elementsToHide = [teamHeadRight, teamCards].filter(el => el);
    gsap.set(elementsToHide, { opacity: 0, y: 50 });

    if (teamBottomSection) {
        gsap.set(teamBottomSection, { opacity: 0 });
    }

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

    const mm = ScrollTrigger.matchMedia();

    mm.add("(min-width: 992px)", () => {

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
                start: "top bottom-=30%",
                end: "top top",
                scrub: true,
                markers: false
            }
        });
    });

    gsap.to(teamHeading, {
        y: -50,
        opacity: 0,
        ease: "power2.in",
        scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "top top-=15%",
            scrub: true,
            markers: false
        }
    });

    if (teamHeadRight) {
        gsap.to(teamHeadRight, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top top-=15%",
                end: "top top-=40%",
                scrub: true,
                markers: false
            }
        });
    }

    if (teamCards) {
        gsap.to(teamCards, {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top top-=40%",
                end: "top top-=65%",
                scrub: true,
                markers: false
            }
        });
    }

    if (teamBottomSection) {
        gsap.fromTo(teamBottomSection,
            { opacity: 1, y: 0 },
            {
                y: -50,
                opacity: 0,
                ease: "power2.in",
                immediateRender: false,
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=75%",
                    end: "top top-=85%",
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    if (teamCards) {
        gsap.fromTo(teamCards,
            { y: 0 },
            {
                y: "-14.125rem",
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=75%",
                    end: "top top-=100%",
                    scrub: true,
                    markers: false
                }
            }
        );
    }

    const teamBlurTop = document.querySelector('.team-blur-top');
    if (teamBlurTop) {
        gsap.set(teamBlurTop, { opacity: 0 });

        gsap.to(teamBlurTop, {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top-=100%",
                end: "top top-=110%",
                scrub: true,
                markers: false
            }
        });

        gsap.to(teamBlurTop, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top-=135%",
                end: "top top-=145%",
                scrub: true,
                markers: false
            }
        });
    }

    const teamGridWrappers = gsap.utils.toArray('.team-grid-wrapper');
    if (teamGridWrappers.length === 2) {
        const firstWrapper = teamGridWrappers[0];
        const secondWrapper = teamGridWrappers[1];

        const mm = ScrollTrigger.matchMedia();
        mm.add("(min-width: 992px)", () => {

            const firstRect = firstWrapper.getBoundingClientRect();
            const secondRect = secondWrapper.getBoundingClientRect();
            const distanceToMove = secondRect.top - firstRect.top;

            gsap.to([firstWrapper, secondWrapper], {
                y: `-=${distanceToMove}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=110%",
                    end: "top top-=140%",
                    scrub: true,
                    markers: false
                }
            });

            gsap.to(firstWrapper, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=110%",
                    end: "top top-=140%",
                    scrub: true,
                    markers: false
                }
            });
        });
    }

    if (teamBottomSection) {
        const teamBottomParagraph = teamBottomSection.querySelector('p');

        if (teamBottomParagraph) {

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

            const textNodes = getAllTextNodes(teamBottomParagraph);
            const textItems = textNodes.map(node => ({
                node,
                text: node.textContent
            }));

            const currentHeight = teamBottomSection.getBoundingClientRect().height;
            if (currentHeight > 0) {
                teamBottomSection.style.minHeight = `${currentHeight}px`;
            }

            textItems.forEach(item => item.node.textContent = "");

            const scrambleTl = gsap.timeline({
                paused: true,
                scrollTrigger: {
                    trigger: section,
                    start: "top top-=40%",
                    once: true,
                    onEnter: () => {

                        gsap.set(teamBottomSection, { opacity: 1 });
                        scrambleTl.play(0);
                    }
                }
            });

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
                    i * 0.1
                );
            });
        }
    }

    const previousSectionContainer = document.querySelector('.benefits .container.is-stiky-benefits');
    if (previousSectionContainer) {
        gsap.to(previousSectionContainer, {
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top 15%",
                scrub: true,
                markers: false
            }
        });
    }

    if (footer) {
        // Initial state: Pushed down by 100vh
        gsap.set(footer, { y: "100vh", autoAlpha: 1 });

        // Reveal animation: Slide up to y: 0
        gsap.to(footer, {
            y: 0,
            duration: 1, // Slower duration for a smooth slide up
            ease: "none", // Linear or slight ease
            scrollTrigger: {
                trigger: section,
                start: "bottom bottom", // Start exactly when section bottom hits viewport bottom
                end: "+=100%", // Scroll distance for the footer reveal
                scrub: true, // Scrub the reveal to scroll position
                markers: false
            }
        });
    }
}

function initSmoothScroll() {
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

function initDynamicAnchors() {
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
        "(min-width: 992px)": function () {
            initAnimations();
            initDynamicAnchors();
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

function initHeroVideoPause() {
    const video = document.getElementById('my-custom-video');
    const nextSection = document.querySelector('.our-ambassadors');

    if (!video || !nextSection) return;

    ScrollTrigger.create({
        trigger: nextSection,
        start: "top top",
        onEnter: () => video.pause(),
        onLeaveBack: () => video.play(),
        markers: false
    });
}

function initCasesAnimation() {
    const section = document.querySelector('.cases');
    if (!section) return;

    const progressLine = section.querySelector('.progress-bar-cases-anim .progress-bar-white-line');
    const textCase = section.querySelector('.text-case');
    const textSubtitle = section.querySelector('.text-size-16.text-style-uppercase.is-case');
    const card1 = section.querySelector('[data-case-video="1"]');
    const card3 = section.querySelector('[data-case-video="3"]');

    // ── Prepare text-case: split into spans, hide via gsap.set ───────────
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


    // ── Initial card / bar states ─────────────────────────────────────────
    if (progressLine) gsap.set(progressLine, { xPercent: -100 });
    if (card1) gsap.set(card1, { height: '80vh', overflow: 'hidden', opacity: 0, y: 80 });
    if (card3) gsap.set(card3, { height: 0, overflow: 'hidden', opacity: 0 });

    // ── Progress bar: own trigger — full at top-top ───────────────────────
    if (progressLine) {
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


    // ── TL1: same range as progress bar (top bottom → top top) ───────────
    // 1 unit = 10% of that range. Text @ 20%, card1 @ 35%.
    const D = 10;

    const tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: 1,
            markers: false
        }
    });

    // text-case chars: reveal letter-by-letter from 20% to 27%
    if (textChars.length) {
        const charStagger = (D * 0.07) / textChars.length;
        tl1.to(textChars, {
            opacity: 1,
            duration: 0.001,
            stagger: charStagger,
            ease: 'none'
        }, D * 0.20);
    }

    // card1: slide up + opacity from 35% to 43%
    if (card1) {
        tl1.to(card1, { opacity: 1, y: 0, ease: 'power2.out', duration: D * 0.08 }, D * 0.35);
    }

    // ── TL2: card swap — starts after 10% gap past progress bar 100% ─────
    // progress bar 100% = 'top top'. 10% gap = 10% of viewport further down.
    // 'top -10%' = section top is 10% of viewport above viewport top.
    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top -50%',
            end: 'top -80%',
            scrub: 1,
            markers: false,
            onEnter: () => {
                if (!card1) return;
                // Pause the Vimeo iframe inside card1
                const iframe = card1.querySelector('iframe.vimeo-iframe');
                if (iframe) {
                    iframe.contentWindow.postMessage(
                        JSON.stringify({ method: 'pause' }), '*'
                    );
                }
                // The inline script sets display:none after 200ms — reset that first
                const poster = card1.querySelector('.video-poster');
                if (poster) {
                    poster.style.display = '';
                    poster.style.opacity = '1';
                    poster.style.transition = 'none';
                }
                const playBtn = card1.querySelector('.vide-case-button');
                if (playBtn) {
                    playBtn.style.display = '';
                    playBtn.style.opacity = '1';
                    playBtn.style.transition = 'none';
                }
            }
        }
    });

    if (card1 && card3) {
        // card1: height-only collapse, opacity stays 1
        tl2.to(card1, { height: 0, ease: 'power2.inOut', duration: 1 }, 0);
        // card3: instant opacity then height grows
        tl2.set(card3, { opacity: 1 }, 0);
        tl2.to(card3, { height: '80vh', ease: 'power2.inOut', duration: 1 }, 0);
        // After card3 is full, slide up 3.5rem
        tl2.to(card3, { y: '-3.5rem', ease: 'power2.out', duration: 0.6 });
    }

}
