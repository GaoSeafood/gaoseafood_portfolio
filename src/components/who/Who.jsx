import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Who.css";
import claude from "../../assets/claude.svg";
import robot from "../../assets/robot.webp";
import tiktok from "../../assets/抖音.webp";
import jimeng from "../../assets/即梦.webp";
import openai from "../../assets/openai.svg";
import aftereffects from "../../assets/AfterEffect.webp";
import capcut from "../../assets/剪映.webp";
import orientalpearl from "../../assets/东方明珠.webp";

gsap.registerPlugin(ScrollTrigger);
if (ScrollTrigger.isTouch) {
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function Who() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const whoRef = useRef(null);
  const heroRef = useRef(null);
  const afterRef = useRef(null);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const who = whoRef.current;
    const hero = heroRef.current;
    const after = afterRef.current;
    if (!wrap || !track || !who || !hero || !after) return;

    const PALETTE = [
      "#010101",
      "#ff4e47",
      "#9B5DE5",
      "#00C2FF",
      "#00D68F",
      "#FFD166",
    ];
    const COVER = 0.95;
    const BREATH = 24;

    const getMaxCapPx = () => {
      const w = window.innerWidth;
      if (w >= 1280) return 1200;
      if (w >= 1024) return 720;
      if (w >= 768) return 560;
      return 420;
    };

    const computeMetrics = () => {
      gsap.set(who, { scaleY: 1, y: 0, transformOrigin: "50% 0%" });
      const whoH = who.getBoundingClientRect().height;
      const cs = getComputedStyle(hero);
      const padTop = parseFloat(cs.paddingTop) || 0;
      const padBot = parseFloat(cs.paddingBottom) || 0;
      const heroInnerH = hero.getBoundingClientRect().height - padTop - padBot;
      const capPx = getMaxCapPx();
      const targetH = Math.min(heroInnerH * COVER, capPx);
      const sFinal = targetH / Math.max(1, whoH);
      const yFinal = (heroInnerH - whoH * sFinal) / 2;
      gsap.set(who, { scaleY: 0.001, y: BREATH, transformOrigin: "50% 0%" });
      return { sFinal: Math.max(1, sFinal), yFinal };
    };

    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const setSizes = () => {
      after.style.height = distance() + "px";
    };

    gsap.set(who, { scaleY: 0.001, y: BREATH, transformOrigin: "50% 0%" });
    gsap.set(track, { x: 0 });

    let metrics = computeMetrics();

    const stIntro = ScrollTrigger.create({
      trigger: wrap,
      start: "top 92%",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        const p = gsap.utils.clamp(0, 1, self.progress);
        const s = gsap.utils.interpolate(0.001, metrics.sFinal, p);
        const y = gsap.utils.interpolate(BREATH, metrics.yFinal, p);
        const snap = gsap.utils.snap(0.001);
        gsap.set(who, { scaleY: snap(s), y: Math.round(y) });
      },
    });

    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        metrics = computeMetrics();
        setSizes();
        requestAnimationFrame(() =>
          requestAnimationFrame(() => ScrollTrigger.refresh())
        );
      });
    }

    ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: () => "+=" + distance(),
      onToggle: (self) => wrap.classList.toggle("is-scrolling", self.isActive),
    });

    const tweenH = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => "+=" + distance(),
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    gsap.set(wrap, { backgroundColor: PALETTE[0], color: "#fff" });
    const panels = Array.from(track.querySelectorAll(".panel"));

    for (let i = 0; i < Math.min(panels.length - 1, PALETTE.length - 1); i++) {
      const from = PALETTE[i],
        to = PALETTE[i + 1],
        nextPanel = panels[i + 1];
      gsap.fromTo(
        wrap,
        { backgroundColor: from },
        {
          backgroundColor: to,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: nextPanel,
            containerAnimation: tweenH,
            start: "left center",
            end: "left left",
            scrub: true,
          },
        }
      );
    }

    const dist = distance();
    if (dist > 0) {
      gsap.to(wrap, {
        backgroundColor: "#010101",
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: wrap,
          start: () => "top top+=" + (distance() * 0.7),
          end: () => "top top+=" + distance(),
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }

    const mm = gsap.matchMedia();

    mm.add(
      { isMobile: "(max-width: 768px)", isDesktop: "(min-width: 769px)" },
      (mq) => {
        const { isMobile } = mq.conditions;
        const AMP = isMobile ? 1.4 : 2.0;
        const common = { ease: "none", force3D: true };

        gsap.fromTo(
          ".p1 .s1",
          { xPercent: 40 * AMP, rotation: -6, scale: 0.98 },
          {
            xPercent: -40 * AMP,
            rotation: 6,
            scale: 1.02,
            ...common,
            scrollTrigger: {
              trigger: ".p1",
              containerAnimation: tweenH,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".p1 .s2",
          { xPercent: 60 * AMP, rotation: -8, scale: 0.96 },
          {
            xPercent: -20 * AMP,
            rotation: 8,
            scale: 1.04,
            ...common,
            scrollTrigger: {
              trigger: ".p1",
              containerAnimation: tweenH,
              start: "left center",
              end: "right center",
              scrub: true,
            },
          }
        );

        const P2_START = "left 120%";
        const P2_END = "right -8%";
        gsap.set([".p2 .s1", ".p2 .s2", ".p2 .s3"], {
          transformOrigin: "50% 50%",
        });

        gsap.fromTo(
          ".p2 .s1",
          { yPercent: -12 * AMP, xPercent: -14, rotation: -16, scale: 0.93 },
          {
            yPercent: 56 * AMP,
            xPercent: 16,
            rotation: 18,
            scale: 1.12,
            ...common,
            scrollTrigger: {
              trigger: ".p2",
              containerAnimation: tweenH,
              start: P2_START,
              end: P2_END,
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".p2 .s2",
          { yPercent: 42 * AMP, xPercent: -10, rotation: -18, scale: 0.96 },
          {
            yPercent: -24 * AMP,
            xPercent: 28,
            rotation: 32,
            scale: 1.08,
            ...common,
            scrollTrigger: {
              trigger: ".p2",
              containerAnimation: tweenH,
              start: P2_START,
              end: P2_END,
              scrub: true,
            },
          }
        );
        gsap.fromTo(
          ".p2 .s3",
          { yPercent: 4 * AMP, xPercent: 16, rotation: -12, scale: 0.97 },
          {
            yPercent: 46 * AMP,
            xPercent: -22,
            rotation: 14,
            scale: 1.07,
            ...common,
            scrollTrigger: {
              trigger: ".p2",
              containerAnimation: tweenH,
              start: P2_START,
              end: P2_END,
              scrub: true,
            },
          }
        );

        const P3_H_START = "left 92%";
        const P3_H_END = "right 8%";
        gsap.set([".p3 .s1", ".p3 .s2", ".p3 .s3"], {
          transformOrigin: "50% 50%",
        });

        gsap.fromTo(
          ".p3 .s1",
          { rotation: 0, xPercent: 0 },
          {
            rotation: 360,
            xPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".p3",
              containerAnimation: tweenH,
              start: P3_H_START,
              end: P3_H_END,
              scrub: true,
            },
          }
        );

        const tlPastaH = gsap.timeline({
          scrollTrigger: {
            trigger: ".p3",
            containerAnimation: tweenH,
            start: P3_H_START,
            end: P3_H_END,
            scrub: true,
          },
          defaults: { ease: "none" },
        });
        tlPastaH
          .to(
            ".p3 .s2",
            { xPercent: -32 * AMP, yPercent: 6 * AMP, rotation: 6 },
            0
          )
          .to(
            ".p3 .s2",
            { xPercent: -84 * AMP, yPercent: 18 * AMP, rotation: 12 },
            0.45
          );

        gsap.fromTo(
          ".p3 .s3",
          { yPercent: 6 * AMP, xPercent: 0, rotation: -2 },
          {
            yPercent: -28 * AMP,
            xPercent: 34,
            rotation: 14,
            ease: "none",
            scrollTrigger: {
              trigger: ".p3",
              containerAnimation: tweenH,
              start: P3_H_START,
              end: P3_H_END,
              scrub: true,
            },
          }
        );

        const vertStart = () => tweenH.scrollTrigger?.end || 0;
        const vertEnd = () => vertStart() + window.innerHeight * 1.5;
        const F = isMobile ? 1.2 : 1.0;

        gsap.to(".p3 .s1", {
          rotation: "+=160",
          xPercent: "+=10",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            id: "p3-vertical-openai",
            start: vertStart,
            end: vertEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".p3 .s2", {
          xPercent: () => `-=${28 * F}`,
          yPercent: () => `+=${10 * F}`,
          rotation: "+=8",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            id: "p3-vertical-tiktok",
            start: vertStart,
            end: vertEnd,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(".p3 .s3", {
          xPercent: "+=30",
          yPercent: "-=24",
          rotation: "+=18",
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            id: "p3-vertical-orientalpearl",
            start: vertStart,
            end: vertEnd,
            scrub: true,
          },
        });
      }
    );

    const ro = new ResizeObserver(() => {
      setSizes();
      metrics = computeMetrics();
      ScrollTrigger.refresh();
    });
    ro.observe(track);
    ro.observe(hero);

    window.addEventListener("load", () => {
      setSizes();
      metrics = computeMetrics();
      ScrollTrigger.refresh();
    });

    setSizes();
    ScrollTrigger.refresh();

    return () => {
      stIntro.kill();
      tweenH.scrollTrigger?.kill();
      ScrollTrigger.getById("p3-vertical-openai")?.kill();
      ScrollTrigger.getById("p3-vertical-tiktok")?.kill();
      ScrollTrigger.getById("p3-vertical-orientalpearl")?.kill();
      ro.disconnect();
      mm.revert();
    };
  }, []);

  return (
    <section className="who-wrap" ref={wrapRef}>
      <div className="who-sticky">
        <div className="who-track" ref={trackRef}>
          <section className="panel hero" ref={heroRef}>
            <svg
              className="who-svg"
              viewBox="0 0 1000 300"
              preserveAspectRatio="xMidYMin meet"
              ref={whoRef}
            >
              <text
                x="50%"
                y="0"
                textAnchor="middle"
                dominantBaseline="text-before-edge"
                fontFamily="'Zalando Sans Expanded', sans-serif"
                fontWeight="900"
                fontSize="250"
                fill="currentColor"
              >
                WHO?
              </text>
            </svg>
          </section>

          <section className="panel p1">
            <div className="panel-copy">
              <h2 className="panel-hl">一半是视频编导，<br />一半是AI极客</h2>
              <p className="panel-sl">
                用内容策划，帮助品牌扩大营销声量
                <br />用AI工具，帮助公司降本增效
              </p>
            </div>
            <div className="stickers">
              <img className="sticker s1" alt="" src={claude} />
              <img className="sticker s2" alt="" src={robot} />
            </div>
          </section>

          <section className="panel p2">
            <div className="panel-copy">
              <h2 className="panel-hl">立足内容，<br />助力生意增长</h2>
              <p className="panel-sl">
                懂内容，懂生意，懂用户
                <br />多平台打造爆款营销视频
              </p>
            </div>
            <div className="stickers">
              <img className="sticker s1" alt="" src={aftereffects} />
              <img className="sticker s2" alt="" src={capcut} />
              <img className="sticker s3" alt="" src={jimeng} />
            </div>
          </section>

          <section className="panel p3">
            <div className="panel-copy">
              <h2 className="panel-hl">把AI死磕到底，<br />让效率超越极限</h2>
              <p className="panel-sl">
                从零打造AIGC全链路提效工具
                <br />用AI技术将内容生产效率提升80%
              </p>
            </div>
            <div className="stickers">
              <img className="sticker s1" alt="" src={openai} />
              <img className="sticker s2" alt="" src={tiktok} />
              <img className="sticker s3" alt="" src={orientalpearl} />
            </div>
          </section>
        </div>
      </div>

      <div className="who-after-spacer" ref={afterRef} />
    </section>
  );
}
