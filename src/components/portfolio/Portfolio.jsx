import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Portfolio.css";
import tuhu1Icon from "../../assets/tuhu1.png";
import tuhu2Icon from "../../assets/tuhu2.png";
import meituanIcon from "../../assets/meituan.png";
import wenhuaIcon from "../../assets/wenhua.png";
import aiVideoIcon from "../../assets/ai-video.png";
import tool1Icon from "../../assets/tool1.png";
import tool2Icon from "../../assets/tool2.png";
import tool3Icon from "../../assets/tool3.png";
import tool4Icon from "../../assets/tool4.png";
import caibeikeIcon from "../../assets/caibeike.png";
import caibeike1 from "../../assets/caibeike-1.png";
import caibeike2 from "../../assets/caibeike-2.png";
import aiWorkflow from "../../assets/ai-workflow.png";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

/* ---------- ICONS ---------- */
const RepoIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58l-.02-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.39-1.33-1.76-1.33-1.76-1.09-.74.09-.73.09-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.77-1.6-2.67-.3-5.48-1.34-5.48-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.64.24 2.86.12 3.16.77.84 1.23 1.91 1.23 3.22 0 4.62-2.82 5.65-5.5 5.95.43.37.82 1.1.82 2.23l-.01 3.3c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const LiveIcon = () => (
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- DATA ---------- */
const PROJECTS = [
  {
    id: 1,
    title: "途虎加盟店宣传视频，互动量700+",
    icon: tuhu1Icon,
    caseTitle: "影视人转行首月盈利，看县城连开4家途虎背后的爆款B端策划",
    desc: "针对三四线城市「无经验」潜在加盟商的痛点，策划「影视人跨界」真实素人案例。通过「反差感钩子、去广告化大白话叙事、喜报式视觉」，打消受众对经验、盈利和地域的疑虑，成功将品牌加盟支持体系转化为高信任度的创富故事。",
    result: "双料第一：互动数据位列当月发布视频第一，且打破历史纪录，位列历代同系列视频第一。单条视频互动量突破700+。",
    color: "#D4746E",
    video: "/videos/1.mp4",
    link: null,
    linkLabel: "视频号：途虎养车工场店",
  },
  {
    id: 2,
    title: "途虎KOL营销视频，数据量当月第一",
    icon: tuhu2Icon,
    caseTitle: "借力「冷门」品牌打出实力王炸：单条互动2000+的B端标杆软文策划",
    desc: "针对途虎拿下法系双品牌原厂授权事件进行B端KOL视频策划。面对品牌市占率低的行业劣势，逆向以「法系车公认难修、主机厂标准严苛」为切入点，将事件包装为对途虎维修实力的权威认证。通过「事实+情绪趋势」的双度标题与行业壁垒拆解，去广告化提振现有加盟商信心并吸引潜在加盟商。",
    result: "断崖式第一：虽为营销软文，但数据位列该KOL当月发布作品第一。跻身该KOL历史最热作品前12名，互动量突破2000+。",
    color: "#C9443A",
    video: "/videos/2.mp4",
    link: "https://v.douyin.com/xDrGo5ZfkW4/",
    linkLabel: "抖音：汽服胡司令",
  },
  {
    id: 4,
    title: "美团半价洗浴活动Vlog营销视频，创账号单月数据最高",
    icon: meituanIcon,
    caseTitle: "反差感引爆5000+互动：用「骑手团建」破局刻板印象的C端场景营销",
    desc: "负责美团「全国半价洗浴」新活动的节点宣传。面对潜在受众对洗浴中心的「认知门槛与刻板印象」，巧妙利用美团天然的「外卖骑手」资产，策划了一场「外卖站点洗浴中心团建」的反差感Vlog。通过「兄弟们今天不跑单」的打工人爽感标题与高性价比体验场景，将复杂的活动优惠转化为高娱乐性、强代入感的公域爆款。",
    result: "月度数据王：视频发布后迅速引爆，成为该官方账号近1个月内数据表现最好的视频。单条互动量引爆5000+。",
    color: "#E8961E",
    video: "/videos/4.mp4",
    link: "https://v.douyin.com/boaO1CM9u_w/",
    linkLabel: "抖音：辣椒油",
  },
  {
    id: 7,
    title: "从0到1孵化AI情感号，斩获10000播放",
    icon: aiVideoIcon,
    caseTitle: "跑通AIGC内容生产全工作流：首作即获万级播放的情感共鸣类AI账号孵化",
    desc: "敏锐捕捉AIGC内容创作红利与平台流量扶持期，独立负责一个AI短视频账号的冷启动。通过深度调研头部同类账号，精准确立「解构大众共性痛点、提供高价值情绪按摩」的账号定位。从0到1搭建了包含「高赞评论情感洞察→AI全脚本与素材生成→模板化剪辑包装→AI封面与标题生产」的全链路可持续内容生产工作流。",
    result: "新号首发即爆：成功跑通全闭环工作流，首个作品即斩获近10,000次播放量，获300+真实点赞，验证了AI生成内容在公域的情感穿透力与商业可行性。",
    color: "#8B5CF6",
    video: "/videos/7.mp4",
    link: "https://www.douyin.com/video/7643800318848797986",
    linkLabel: "抖音：数字遗迹档案局",
  },
  {
    id: 3,
    title: "美团骑手年终盘点视频，AE特效打造第一视角",
    icon: meituanIcon,
    caseTitle: "第一视角视效创新：打破传统盘点，用3D动效串联的暖心B端叙事",
    desc: "负责美团骑手年终关怀与荣誉盘点视频的创意与包装。面对散乱的新闻素材，打破冷冰冰的第三方视角，独创「骑手第一视角滑手机」的串联概念。通过「口播+手部动作+后期视效」将新闻转化为手机弹窗，并跨软件使用AE攻克技术难点，实现细腻的3D图层翻转特效。",
    result: "视觉体验升级：用低成本、高创意的技术方案，打破常规企业年终盘点的枯燥感。视频互动量突破300+。",
    color: "#F5A623",
    video: "/videos/3.mp4",
    link: null,
    linkLabel: "视频号：美团Meituan",
  },
  {
    id: 5,
    title: "浙江卫视文化达人视频，引发20万+微信强裂变",
    icon: wenhuaIcon,
    caseTitle: "精准撬动微信熟人社交裂变：斩获20万+互动的传统文化爆款节点营销",
    desc: "负责浙江卫视新媒体矩阵文化达人IP的内容规划。敏锐捕捉「龙年龙月龙日龙时」这一罕见民俗节点，针对视频号核心中老年群体「热衷祈福、喜好传统文化、高频转发表达祝福」的社交心理进行精准定制。通过「奇特天文现象设问+龙王开会趣味梗+开春美好诗歌祈福」的结构，将生冷的农历纪法科普包装为极具情绪价值的情感寄托。",
    result: "现象级公域引爆：视频单条互动量狂飙突破20万+，断层式矩阵第一，展现了极强的圈层穿透力。",
    color: "#C9A060",
    video: "/videos/5.mp4",
    link: null,
    linkLabel: "视频号：傅少九",
  },
  {
    id: 6,
    title: "Z视介2周年庆广告片，成功投放线下地标大屏",
    icon: wenhuaIcon,
    caseTitle: "技术攻坚破局异形巨幕：斩获商圈大屏联播与千级互动的3D视效营销",
    desc: "负责浙江卫视「Z视介」2周年线下大屏联动的线上视效大片策划与全流程后期制作。面对杂乱的无人机原始素材，独立攻克三大技术难点：动态三维追踪抠像解决高空环绕贴面广告透视；PS智能修图与AE图层覆盖完美剔除环境树木遮挡；3D骨骼关节绑定让静态Logo实现动态奔跑并呼应平台新功能。",
    result: "线下地标霸屏：成功投放杭州中心商圈户外巨幅大屏循环播放。浙江卫视官方视频号同步发布，互动数据逼近1000+。",
    color: "#E07B5A",
    video: "/videos/6.mp4",
    link: null,
    linkLabel: "视频号：浙江卫视",
  },
  {
    id: 8,
    title: "VideCoding全流程AI创作工具，视频创作提效70%",
    icon: null,
    caseTitle: "重构内容生产力：从零设计全链路 AI 化可视化画布，一键打通剪映草稿工程",
    desc: "针对短视频创作跨工具、流程碎片的痛点，独立设计并研发了一款全流程 AI 辅助的可视化节点画布。打破传统文本 AI 局限，打通了「选题脑暴➡️A/B-Roll 脚本提取 ➡️ 素材批量生成回填 ➡️ 一键生成剪映草稿工程 ➡️ 全套发布物料生成」的闭环数据流。将 AI 创作从「文字交互」升级为「工业级资产交付」。",
    result: "• 生产力颠覆性提升：将过去数小时的视频策划与素材筹备，缩短至数分钟内一键生成剪映初稿。\n• 工程级技术壁垒：实现了 AI 自动绑定素材并直接输出可二次编辑的剪映草稿工程文件。",
    color: "#4A8C6F",
    link: null,
    linkLabel: null,
    images: [aiWorkflow],
  },
  {
    id: 9,
    title: "彩贝壳亲子游推文营销，转化50+位中产家长",
    icon: null,
    caseTitle: "精算型parental营销：把「玩泥巴」包装成「自然课堂」的高转化推文策划",
    desc: "负责面向「江浙沪中产父母」的亲子短途游产品推文。精准洞察受众「既要性价比与省心、又要教育意义、还要朋友圈人设」的痛点。标题以「避暑痛点+极低价拳头产品」强吸睛；正文采用模块化结构，将非遗、大巴接送等亮点标签化前置。通过场景化文案，将「玩泥巴/玩水」逆向包装为「农夫大作战/野外生存课堂」，精准贩卖教育与情绪体验。",
    result: "高质阅读：推文精准触达垂直亲子圈层，单篇阅读量突破7000+。精准转化：深度触动家长痛点，成功逆向拉动50+位中产家长高意向咨询。",
    color: "#6A9EC0",
    link: "https://mp.weixin.qq.com/s/o8Hl2Ddo7u6rkQjFPHAa-Q",
    linkLabel: "原文链接",
    images: [caibeike1, caibeike2],
  },
];

const PIN_FACTOR = 1.6;

const getAbbr = (title) => {
  const i = title.indexOf("，");
  return i > -1 ? title.slice(0, i) : title;
};

/* ---------- SWIPEABLE CAROUSEL ---------- */
function SwipeableCarousel({ items, type = "image" }) {
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const trackRef = useRef(null);
  const dragRef = useRef({ active: false, startX: 0, currentX: 0 });
  const clickedRef = useRef(false);
  const autoRef = useRef(null);

  const count = items?.length || 0;

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    if (count > 1) {
      autoRef.current = setInterval(() => setIdx((i) => (i + 1) % count), 3000);
    }
  }, [count]);

  useEffect(() => {
    resetAuto();
    return () => clearInterval(autoRef.current);
  }, [resetAuto]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || dragRef.current.active) return;
    el.style.transition = "transform 0.3s ease";
    el.style.transform = `translateX(-${idx * 100}%)`;
  }, [idx]);

  useEffect(() => {
    if (lightbox === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox]);

  const onStart = (clientX) => {
    clickedRef.current = true;
    dragRef.current = { active: true, startX: clientX, currentX: clientX };
    if (trackRef.current) trackRef.current.style.transition = "none";
    clearInterval(autoRef.current);
  };

  const onMove = (clientX) => {
    if (!dragRef.current.active) return;
    dragRef.current.currentX = clientX;
    const diff = clientX - dragRef.current.startX;
    if (Math.abs(diff) > 5) clickedRef.current = false;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(-${idx * 100}% + ${diff}px))`;
    }
  };

  const onEnd = () => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const diff = dragRef.current.currentX - dragRef.current.startX;
    const w = trackRef.current?.offsetWidth || 300;
    const threshold = w * 0.2;
    let newIdx = idx;
    if (diff < -threshold) newIdx = Math.min(count - 1, idx + 1);
    else if (diff > threshold) newIdx = Math.max(0, idx - 1);
    setIdx(newIdx);
    if (trackRef.current) {
      trackRef.current.style.transition = "transform 0.3s ease";
      trackRef.current.style.transform = `translateX(-${newIdx * 100}%)`;
    }
    resetAuto();
  };

  const handleClick = () => {
    if (clickedRef.current && type === "image") {
      setLightbox(idx);
    }
  };

  if (!count) return null;

  return (
    <>
      <div
        className={`pf-carousel-swipe${type === "image" ? " pf-carousel-clickable" : ""}`}
        onTouchStart={(e) => onStart(e.touches[0].clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
        onTouchEnd={onEnd}
        onMouseDown={(e) => { e.preventDefault(); onStart(e.clientX); }}
        onMouseMove={(e) => onMove(e.clientX)}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        onClick={handleClick}
      >
        <div className="pf-carousel-track" ref={trackRef}>
          {items.map((item, i) => (
            <div key={i} className={`pf-carousel-slide${type === "tool" ? " pf-tool-slide" : ""}`}>
              {type === "image" ? (
                <img src={item} alt="" />
              ) : (
                <>
                  <img src={item.icon} alt="" />
                  <span>{item.label}</span>
                </>
              )}
            </div>
          ))}
        </div>
        {count > 1 && (
          <div className="pf-carousel-dots" onClick={(e) => e.stopPropagation()}>
            {items.map((_, i) => (
              <button
                key={i}
                className={`pf-dot${i === idx ? " active" : ""}`}
                onClick={() => { setIdx(i); resetAuto(); }}
                aria-label={`第${i + 1}张`}
              />
            ))}
          </div>
        )}
      </div>

      {lightbox !== null && createPortal(
        <div className="pf-lightbox" onClick={() => setLightbox(null)}>
          <button className="pf-lightbox-close" onClick={() => setLightbox(null)} aria-label="关闭">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <img
            src={items[lightbox]}
            alt=""
            className="pf-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}

/* ---------- CARD NAVIGATOR ---------- */
function CardNav({ currentIdx, titles, onSelect, visible }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={`pf-nav${visible ? " visible" : ""}`}>
      {titles.map((t, i) => (
        <div
          key={i}
          className="pf-nav-hit"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className={`pf-nav-line${i === currentIdx ? " active" : ""}`}
            onClick={() => onSelect(i)}
          />
          {hovered === i && <span className="pf-nav-tooltip">{getAbbr(t)}</span>}
        </div>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [navVisible, setNavVisible] = useState(false);
  const [inPortfolio, setInPortfolio] = useState(false);
  const navTimerRef = useRef(null);
  const frontRef = useRef(0);
  const stRef = useRef(null);
  const cooldownRef = useRef(false);
  const cooldownTimerRef = useRef(null);

  const showNav = useCallback(() => {
    if (!inPortfolio) return;
    setNavVisible(true);
    clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => setNavVisible(false), 1500);
  }, [inPortfolio]);

  const scrollToCard = useCallback((idx) => {
    const st = stRef.current;
    const stage = stageRef.current;
    if (!st || !stage) return;
    const H = stage.clientHeight;
    const target = st.start + idx * H * PIN_FACTOR;
    window.scroll(0, target);
    setNavVisible(false);
    clearTimeout(navTimerRef.current);
  }, []);

  useEffect(() => {
    const onWheel = () => showNav();
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onWheel, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onWheel);
      clearTimeout(navTimerRef.current);
    };
  }, [showNav]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e) => {
      if (!inPortfolio) return;
      if (cooldownRef.current) { e.preventDefault(); return; }

      const st = stRef.current;
      if (!st) return;
      const H = stage.clientHeight;
      const step = H * PIN_FACTOR;

      const dir = e.deltaY > 0 ? 1 : -1;
      if (dir > 0 && frontRef.current >= PROJECTS.length - 1) return;
      if (dir < 0 && frontRef.current <= 0) return;
      if (window.scrollY < st.start - H * 0.2 || window.scrollY > st.end + H * 0.2) return;
      const entryEnd = st.start + step * 0.25;
      if (dir > 0 && window.scrollY < entryEnd) return;

      e.preventDefault();
      showNav();

      cooldownRef.current = true;
      clearTimeout(cooldownTimerRef.current);
      cooldownTimerRef.current = setTimeout(() => { cooldownRef.current = false; }, 800);

      const newIdx = frontRef.current + dir;
      frontRef.current = newIdx;
      setCurrentIdx(newIdx);
      window.scroll(0, st.start + newIdx * step);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(cooldownTimerRef.current);
      cooldownRef.current = false;
    };
  }, [inPortfolio, showNav]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInPortfolio(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const videos = stageRef.current?.querySelectorAll("video");
    if (!videos) return;
    videos.forEach((v) => v.pause());
  }, [currentIdx]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    if (!root || !stage) return;

    const gctx = gsap.context(() => {
      const introEl = root.querySelector(".pf-intro");
      if (introEl) {
        const getEnd = () => introEl.offsetHeight * 0.9;
        gsap.fromTo(
          introEl,
          { y: 0, opacity: 1 },
          {
            y: -28,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: () => "+=" + getEnd(),
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      const cardsEls = gsap.utils.toArray(".pf-card");
      const cards = cardsEls.filter((el) => el instanceof HTMLElement);

      const LAYER_OFFSET = 26,
        SCALE_STEP = 0.012,
        ROT_X_DESK = 18,
        ROT_X_MOB = 12,
        ROT_Z = 3.5,
        LIFT_IN_VH = 0.12,
        LIFT_OUT_VH = 1.0;

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (mq) => {
          const H = () => stage.clientHeight;
          const ROTX = mq.conditions.reduce
            ? 0
            : mq.conditions.desktop
            ? ROT_X_DESK
            : ROT_X_MOB;
          const LAYER = mq.conditions.mobile ? 18 : LAYER_OFFSET;

          cards.forEach((card, i) => {
            gsap.set(card, {
              y: i * LAYER,
              scale: 1 - i * SCALE_STEP,
              zIndex: cards.length - i,
              rotateX: 0,
              rotateZ: 0,
              z: 0.01,
              transformOrigin: "50% 100%",
              force3D: true,
              backfaceVisibility: "hidden",
            });
          });

          const stepIn = () => H() * (mq.conditions.mobile ? 0.14 : LIFT_IN_VH);
          const stepOut = () => H() * (mq.conditions.mobile ? 1.0 : LIFT_OUT_VH);
          const SEG = 1;
          const t = (i) => i * SEG;

          function setFront(idx) {
            cards.forEach((card, i) => {
              card.classList.toggle("is-front", i === idx);
            });
          }
          setFront(0);
          frontRef.current = 0;
          setCurrentIdx(0);

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: stage,
              pin: stage,
              pinReparent: true,
              start: "top top",
              end: () => "+=" + (cards.length - 1) * H() * PIN_FACTOR,
              scrub: 0.6,
              anticipatePin: mq.conditions.mobile ? 2 : 1,
              invalidateOnRefresh: true,
              snap: {
                snapTo: (v) => Math.round(v * (cards.length - 1)) / (cards.length - 1),
                duration: 0.2,
              },
            },
            onUpdate: () => {
              const newFront = Math.min(
                cards.length - 1,
                Math.max(0, Math.round(tl.time() / SEG))
              );
              if (frontRef.current !== newFront) {
                frontRef.current = newFront;
                setCurrentIdx(newFront);
              }
              setFront(newFront);
            },
          });
          stRef.current = tl.scrollTrigger;

          cards.forEach((card, i) => {
            if (i > 0) {
              tl.to(
                card,
                {
                  y: (i - 1) * (LAYER * 0.35),
                  scale: 1,
                  rotateX: 0,
                  rotateZ: 0,
                  opacity: 1,
                  duration: SEG,
                },
                t(i - 1)
              );
            }
            if (i < cards.length - 1) {
              tl.to(
                card,
                {
                  y: i * LAYER - stepIn(),
                  rotateX: ROTX,
                  rotateZ: i % 2 ? -ROT_Z : ROT_Z,
                  opacity: 0.7,
                  duration: SEG * 0.45,
                },
                t(i)
              );
              tl.to(card, { '--shadow-o': 1, duration: SEG * 0.45 }, t(i));
              tl.to(
                card,
                {
                  y: i * LAYER - (stepIn() + stepOut()),
                  opacity: 0.45,
                  duration: SEG * 0.55,
                },
                t(i) + SEG * 0.45
              );
            }
          });

          return () => {
            tl.kill();
            stRef.current = null;
          };
        }
      );

      return () => mm.revert();
    }, root);

    return () => gctx.revert();
  }, []);

  return (
    <section className="portfolio" ref={rootRef} aria-label="作品集">
      <div className="pf-intro-wrap">
        <div className="pf-intro">
          <h2 className="pf-ih">精选作品案例</h2>
          <p className="pf-id">
            营销视频 | AI工具搭建 | 新媒体运营
          </p>
        </div>
      </div>

      <div className="pf-stage" ref={stageRef}>
        {PROJECTS.map((p) => (
          <article
            className={`pf-card${(p.video || p.images || p.tools) ? " has-video" : ""}`}
            key={p.id}
            style={{ "--accent": p.color }}
          >
            <div className="pf-card-col pf-card-left">
              <header className="pf-header">
                <h3 className="pf-title">
                  {p.titleBreak
                    ? <>{p.titleBreak}<br />{p.title.replace(p.titleBreak, "").trim()}</>
                    : p.title.includes("：")
                    ? <>{p.title.split("：")[0]}：<br />{p.title.split("：").slice(1).join("：")}</>
                    : p.title.includes("，")
                    ? <>{p.title.split("，")[0]}<br />{p.title.split("，").slice(1).join("，")}</>
                    : p.title}
                </h3>
                {p.icon && !p.video && (
                  <img
                    className="pf-brand"
                    src={p.icon}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </header>

              <div className="pf-card-body">
                {p.desc && (
                  <div className="pf-copy">
                    <span className="pf-section-label">📝 案例简介</span>
                    <span className="pf-section-text">{p.desc}</span>
                  </div>
                )}
                {!p.desc && p.copy && (
                  <div className="pf-copy">
                    <span className="pf-section-text">{p.copy}</span>
                  </div>
                )}
                {p.result && (
                  <div className="pf-result">
                    <span className="pf-section-label">🏆 核心成果</span>
                    <span className="pf-section-text">{p.result}</span>
                  </div>
                )}
              </div>

              <div className="pf-card-bottom">
                {p.video && (
                  <a
                    className="pf-hd-btn"
                    href="https://pan.baidu.com/s/1PlJvxzfa-6wbZgfbAc4Uhg?pwd=5ify"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><path d="M8 12l4 4 4-4"/><path d="M12 8v8"/>
                    </svg>
                    网盘链接
                  </a>
                )}
                <div className="pf-actions">
                  {p.link && (
                    <a
                      className="pf-channel-tag pf-channel-link"
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`查看${p.title}`}
                    >
                      <span>{p.linkLabel || "查看"}</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                    </a>
                  )}
                  {!p.link && p.linkLabel && (
                    <span className="pf-channel-tag">{p.linkLabel}</span>
                  )}
                </div>
              </div>
            </div>

            {p.video && (
              <div className="pf-card-col pf-card-right">
                <div className="pf-video-wrap">
                  <video
                    className="pf-video"
                    src={p.video}
                    controls
                    playsInline
                    preload="metadata"
                    poster=""
                  />
                </div>
              </div>
            )}

            {(p.images || p.tools) && (
              <div className="pf-card-col pf-card-right">
                <div className="pf-demo pf-demo-media">
                  {p.images ? (
                    <SwipeableCarousel items={p.images} type="image" />
                  ) : (
                    <SwipeableCarousel items={p.tools} type="tool" />
                  )}
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
      <div className="pf-nav-zone" onMouseEnter={() => showNav()} />
      <CardNav
        currentIdx={currentIdx}
        titles={PROJECTS.map((p) => p.title)}
        onSelect={scrollToCard}
        visible={navVisible && inPortfolio}
      />
      <div className="pf-scroll-hint" onClick={() => {
        const reveal = document.querySelector(".footer-reveal");
        if (reveal) window.scrollTo({ top: reveal.offsetTop, behavior: "smooth" });
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
        <span>联系我</span>
      </div>
    </section>
  );
}
