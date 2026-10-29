"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { highlights, photos, whatsappLink } from "@/lib/content";
import { Pivot } from "./Mark";

const consult = "مرحبًا، حابب أطلب استشارة مجانية.";
const quote = "مرحبًا، حابب أطلب عرض سعر.";

export function Hero({ active }: { active: boolean }) {
  const orbRef = useRef<HTMLDivElement>(null);
  const base = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hovering = useRef(false);
  const kick = useRef<() => void>(() => {});

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      const here = current.current;
      const goal = target.current;
      here.x += (goal.x - here.x) * 0.18;
      here.y += (goal.y - here.y) * 0.18;
      orbRef.current?.style.setProperty(
        "transform",
        `translate3d(${here.x}px, ${here.y}px, 0)`,
      );
      const moving = Math.abs(goal.x - here.x) > 0.4 || Math.abs(goal.y - here.y) > 0.4;
      frame = hovering.current || moving ? requestAnimationFrame(tick) : 0;
    };
    kick.current = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    return () => cancelAnimationFrame(frame);
  }, []);

  function canTrack() {
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function onMove(event: MouseEvent<HTMLElement>) {
    if (!canTrack()) return;
    const orb = orbRef.current;
    if (!orb) return;
    if (!hovering.current) {
      hovering.current = true;
      orb.style.transform = "translate3d(0, 0, 0)";
      const rect = orb.getBoundingClientRect();
      base.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      current.current = { x: 0, y: 0 };
    }
    const hero = event.currentTarget.getBoundingClientRect();
    const pad = 28;
    const x = Math.min(Math.max(event.clientX, hero.left + pad), hero.right - pad);
    const y = Math.min(Math.max(event.clientY, hero.top + pad), hero.bottom - pad);
    target.current = { x: x - base.current.x, y: y - base.current.y };
    kick.current();
  }

  function onLeave() {
    hovering.current = false;
    target.current = { x: 0, y: 0 };
    kick.current();
  }

  return (
    <section
      id="top"
      className={active ? "hero booted" : "hero"}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="hero-media">
        <Image
          src={photos.hero}
          alt="جهاز ري محوري يرش محصولًا أخضر"
          fill
          priority
          sizes="100vw"
          className="ken"
        />
        <div className="hero-shade" />
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="kicker rise d1">مدينة 6 أكتوبر · هندسة زراعية متكاملة</p>
          <h1 className="display rise d2">
            <span className="line">حلول زراعية متكاملة</span>
            <span className="line gold">تحت سقف واحد</span>
          </h1>
          <p className="lead rise d3">
            توريد وتركيب وصيانة الري المحوري، والتنقيط، والرش. ومعاهم قطع الغيار،
            لوحات التحكم، وحلول الطاقة. كل ما تحتاجه أرضك من عنوان واحد.
          </p>
          <div className="hero-actions rise d4">
            <a
              className="btn btn-gold"
              href={whatsappLink(consult)}
              target="_blank"
              rel="noopener noreferrer"
            >
              استشارة مجانية
            </a>
            <a
              className="btn btn-ghost"
              href={whatsappLink(quote)}
              target="_blank"
              rel="noopener noreferrer"
            >
              عرض سعر
            </a>
          </div>
        </div>

        <div className="hero-orb-slot rise d5">
          <div className="hero-orb" ref={orbRef}>
            <div className="hero-orb-shift">
              <Pivot />
            </div>
          </div>
        </div>

        <dl className="hero-stats rise d6">
          {highlights.map((item) => (
            <div key={item.k}>
              <dt>{item.k}</dt>
              <dd>{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
