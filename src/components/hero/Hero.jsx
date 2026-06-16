import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../../assets/profile.webp';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const image = imgRef.current;
    const hero = heroRef.current;
    if (!image || !hero) return;
    const tween = gsap.to(image, {
      filter: 'blur(20px)',
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    return () => tween.scrollTrigger?.kill();
  }, []);

  const heading = 'HUANG';
  const letters = heading.split('').map((char, index) => (
    <span key={index} className="letter" style={{ '--i': index }}>
      {char}
    </span>
  ));

  const makeInfo = (text, cls) =>
    text.split('').map((char, index) => (
      <span key={index} className={cls} style={{ '--j': index }}>
        {char}
      </span>
    ));

  return (
    <section ref={heroRef} className="hero-section">
      <h1 className="hero-word" aria-label="HUANG">{letters}</h1>
      <p className="hero-info hero-info-left">{makeInfo('黄镇涛', 'hero-info-char')}</p>
      <p className="hero-info hero-info-right">{makeInfo('吉林大学', 'hero-info-char')}</p>
      <img
        ref={imgRef}
        src={profileImg}
        alt="黄镇涛头像"
        className="hero-overlay-image"
      />
    </section>
  );
}
