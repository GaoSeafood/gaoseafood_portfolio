import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import "./Footer.css";

function useShanghaiTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Shanghai",
      }),
    []
  );
  return fmt.format(now);
}

function Eyes() {
  const rootRef = useRef(null);
  const L = useRef(null);
  const R = useRef(null);
  const [msg, setMsg] = useState("I'm watching you.");

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !L.current || !R.current) return;

    const fine = matchMedia("(pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let max = 8;
    const setLx = gsap.quickSetter(L.current, "x", "px");
    const setLy = gsap.quickSetter(L.current, "y", "px");
    const setRx = gsap.quickSetter(R.current, "x", "px");
    const setRy = gsap.quickSetter(R.current, "y", "px");

    const eyeBox = L.current.parentElement.getBoundingClientRect();
    max = Math.floor(Math.min(eyeBox.width, eyeBox.height) * 0.35);

    const centerOf = (el) => {
      const b = el.getBoundingClientRect();
      return { x: b.left + b.width / 2, y: b.top + b.height / 2 };
    };

    const moveTo = (cx, cy, setX, setY, tx, ty) => {
      const dx = tx - cx,
        dy = ty - cy;
      const ang = Math.atan2(dy, dx);
      const dist = Math.min(max, Math.hypot(dx, dy) * 0.15);
      const x = Math.cos(ang) * dist;
      const y = Math.sin(ang) * dist;
      setX(x);
      setY(y);
      return { x, y };
    };

    const setMsgSafe = (next) =>
      setMsg((prev) => (prev === next ? prev : next));

    let rafId = 0;
    let lastEvt = null;
    let busy = false;
    let blinkTO = null;
    let moodTO = null;
    let onTap = null;
    let idleTl = null;

    const tick = () => {
      const lEl = L.current?.parentElement;
      const rEl = R.current?.parentElement;
      if (!lEl || !rEl) return;

      if (lastEvt) {
        const cL = centerOf(lEl);
        const cR = centerOf(rEl);
        const { x: lx } = moveTo(cL.x, cL.y, setLx, setLy, lastEvt.clientX, lastEvt.clientY);
        const { x: rx } = moveTo(cR.x, cR.y, setRx, setRy, lastEvt.clientX, lastEvt.clientY);

        const opposing = Math.sign(lx) !== Math.sign(rx);
        const between = lastEvt.clientX > cL.x && lastEvt.clientX < cR.x;
        const someDeflection = Math.abs(lx) + Math.abs(rx) > max * 0.4;

        if (fine) {
          setMsgSafe(
            opposing && between && someDeflection
              ? "You're making me cross-eyed."
              : "I'm watching you."
          );
        } else {
          const eyeGap = Math.max(24, (cR.x - cL.x) * 0.25);
          let next = "I'm watching you.";
          if (opposing && between && someDeflection) {
            next = "You're making me cross-eyed.";
          } else if (lastEvt.clientX < cL.x - eyeGap) {
            next = "Looking left…";
          } else if (lastEvt.clientX > cR.x + eyeGap) {
            next = "Looking right…";
          }
          setMsgSafe(next);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      lastEvt = e;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      setMsgSafe("Where did you go?");
      gsap.to([L.current, R.current], {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      cancelAnimationFrame(rafId);
      rafId = 0;
      lastEvt = null;
    };

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    } else {
      idleTl = gsap
        .timeline({
          repeat: -1,
          yoyo: true,
          defaults: { ease: "sine.inOut", duration: 1.6 },
        })
        .to([L.current, R.current], {
          x: gsap.utils.random(-max, max),
          y: gsap.utils.random(-max, max),
        })
        .to([L.current, R.current], {
          x: gsap.utils.random(-max, max),
          y: gsap.utils.random(-max, max),
        });

      onTap = (e) => {
        idleTl.pause();
        lastEvt = e;
        window.addEventListener("pointermove", onMove, { passive: true });
        if (!rafId) rafId = requestAnimationFrame(tick);
        setTimeout(() => {
          window.removeEventListener("pointermove", onMove);
          lastEvt = null;
          onLeave();
          idleTl.resume();
        }, 1000);
      };
      window.addEventListener("pointerdown", onTap);
    }

    const scheduleBlink = () => {
      if (reduced) return;
      blinkTO = setTimeout(() => {
        if (busy) { scheduleBlink(); return; }
        busy = true;
        root.classList.add("blink");
        setTimeout(() => {
          root.classList.remove("blink");
          busy = false;
          scheduleBlink();
        }, 140);
      }, gsap.utils.random(2400, 5200));
    };
    scheduleBlink();

    const applySquint = (dur = 700) => {
      if (busy || reduced) return;
      busy = true;
      root.classList.add("mood-squint");
      setTimeout(() => {
        root.classList.remove("mood-squint");
        busy = false;
      }, dur);
    };

    const scheduleMood = () => {
      if (reduced) return;
      moodTO = setTimeout(() => {
        if (!busy) applySquint();
        scheduleMood();
      }, gsap.utils.random(6000, 11000));
    };
    scheduleMood();

    if (!rafId) rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (onTap) window.removeEventListener("pointerdown", onTap);
      if (blinkTO) clearTimeout(blinkTO);
      if (moodTO) clearTimeout(moodTO);
      idleTl && idleTl.kill();
    };
  }, []);

  return (
    <div className="eyes-wrap" ref={rootRef} aria-live="polite">
      <div className="eyes">
        <div className="eye">
          <div className="pupil" ref={L} />
        </div>
        <div className="eye">
          <div className="pupil" ref={R} />
        </div>
      </div>
      <p className="eyes-caption">{msg}</p>
    </div>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [text]);
  return (
    <button className="copy-btn" onClick={handle} aria-label={`复制 ${text}`}>
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      )}
    </button>
  );
}

export default function Footer() {
  const shTime = useShanghaiTime();

  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;

    const CLICK_VH = 30;

    const update = () => {
      const doc = document.documentElement;
      const vh = window.innerHeight;
      const remaining = doc.scrollHeight - (window.scrollY + vh);
      const revealVH = Math.max(0, Math.min(100, 100 - (remaining / vh) * 100));
      footer.style.setProperty("--reveal", `${revealVH}vh`);
      footer.classList.toggle("is-active", revealVH >= CLICK_VH);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const contacts = [
    { label: "手机", value: "13728579338" },
    { label: "邮箱", value: "1529225347@qq.com" },
    { label: "微信", value: "TomaGao1994" },
  ];

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner container">
        <div className="cta-left">
          <h2 className="cta-title">
            把创意变成能落地的
            <span className="underline">视觉故事</span>
          </h2>
          <p className="meta">Based in Shanghai</p>
        </div>

        <div className="cta-right">
          <div className="contact-list">
            {contacts.map((c) => (
              <div className="contact-row" key={c.label}>
                <span className="contact-label">{c.label}</span>
                <span className="contact-value">{c.value}</span>
                <CopyButton text={c.value} />
              </div>
            ))}
          </div>
          <div className="time">
            <span className="lab">Shanghai</span>
            <span className="val">{shTime}</span>
          </div>
        </div>

        <div className="divider" aria-hidden="true" />

        <div className="footer-byline">
          <span className="byline-star spinning-star">✦</span>
          Build with Claude Code · Shipped on Vercel
          <span className="byline-star spinning-star">✦</span>
        </div>

        <Eyes />
      </div>
    </footer>
  );
}
