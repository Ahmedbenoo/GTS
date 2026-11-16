"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { highlights, photos, quoteWa, whatsappLink } from "@/lib/content";
import { enOf } from "@/lib/en-map";
import { Pivot } from "./Mark";
import { Tx } from "./Tx";

function StatIcon({ name }: { name: string }) {
  const pen = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    width: 32,
    height: 32,
    className: "hero-stat-icon",
    style: { color: "var(--gold)" },
    "aria-hidden": true,
  };

  if (name === "محوري") {
    return (
      <svg {...pen}>
        <line x1="2.6" y1="7.4" x2="21.4" y2="7.4" />
        <line x1="2.6" y1="10.6" x2="21.4" y2="10.6" />
        <line x1="6.2" y1="7.4" x2="8.2" y2="10.6" />
        <line x1="11" y1="7.4" x2="13" y2="10.6" />
        <line x1="15.8" y1="7.4" x2="17.8" y2="10.6" />
        <line x1="5.4" y1="10.6" x2="5.4" y2="15.2" />
        <line x1="12" y1="10.6" x2="12" y2="15.2" />
        <line x1="18.6" y1="10.6" x2="18.6" y2="15.2" />
        <circle cx="5.4" cy="17.5" r="2.15" />
        <circle cx="12" cy="17.5" r="2.15" />
        <circle cx="18.6" cy="17.5" r="2.15" />
      </svg>
    );
  }

  if (name === "تنقيط / رش") {
    return (
      <svg {...pen}>
        <line x1="3" y1="5.2" x2="21" y2="5.2" />
        <path fill="currentColor" stroke="none" d="M6 7.2 8.3 13.8a2.3 2.3 0 1 1-4.6 0z" />
        <path fill="currentColor" stroke="none" d="M12 7.2 14.3 13.8a2.3 2.3 0 1 1-4.6 0z" />
        <path fill="currentColor" stroke="none" d="M18 7.2 20.3 13.8a2.3 2.3 0 1 1-4.6 0z" />
      </svg>
    );
  }

  if (name === "قطع الغيار") {
    return (
      <svg {...pen} stroke="none">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10.15 2h3.7l.5 2.2a7.2 7.2 0 0 1 1.9.8l2-1.05 2.6 2.6-1.05 2a7.2 7.2 0 0 1 .8 1.9l2.2.5v3.7l-2.2.5a7.2 7.2 0 0 1-.8 1.9l1.05 2-2.6 2.6-2-1.05a7.2 7.2 0 0 1-1.9.8l-.5 2.2h-3.7l-.5-2.2a7.2 7.2 0 0 1-1.9-.8l-2 1.05-2.6-2.6 1.05-2a7.2 7.2 0 0 1-.8-1.9L2 14.15v-3.7l2.2-.5a7.2 7.2 0 0 1 .8-1.9l-1.05-2 2.6-2.6 2 1.05a7.2 7.2 0 0 1 1.9-.8L10.15 2zm1.85 6.15a3.85 3.85 0 1 0 .01 7.7 3.85 3.85 0 0 0-.01-7.7z"
        />
      </svg>
    );
  }

  return (
    <svg {...pen}>
      <path d="M12 21s6-5.1 6-9.8A6 6 0 1 0 6 11.2C6 15.9 12 21 12 21z" />
      <circle cx="12" cy="11.1" r="2" />
    </svg>
  );
}

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
          <p className="hero-name rise d1">
            <span className="gts-ar">
              جي تي إس <span className="hero-rest">للاستثمار الزراعي</span>
            </span>
            <span className="gts-en">
              GTS <span className="hero-rest">Agricultural Investment</span>
            </span>
          </p>
          <p className="kicker rise d1">
            <Tx text="مدينة 6 أكتوبر · هندسة زراعية متكاملة" />
          </p>
          <h1 className="display rise d2">
            <span className="line">
              <Tx text="حلول زراعية متكاملة" />
            </span>
            <span className="line hero-white" style={{ color: "#fff" }}>
              <Tx text="تحت سقف واحد" />
            </span>
          </h1>
          <p className="lead rise d3">
            <Tx text="توريد وتركيب وصيانة الري المحوري، والتنقيط، والرش. ومعاهم قطع الغيار، لوحات التحكم، وحلول الطاقة. كل ما تحتاجه أرضك من عنوان واحد." />
          </p>
          <div className="hero-actions rise d4">
            <a
              className="btn btn-gold gts-lang-ar"
              href={whatsappLink(consult)}
              target="_blank"
              rel="noopener noreferrer"
            >
              استشارة مجانية
            </a>
            <a
              className="btn btn-gold gts-lang-en"
              href={whatsappLink(enOf(consult))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Free consultation
            </a>
            <a
              className="btn btn-ghost gts-lang-ar"
              href={whatsappLink(quote, quoteWa)}
              target="_blank"
              rel="noopener noreferrer"
            >
              عرض سعر
            </a>
            <a
              className="btn btn-ghost gts-lang-en"
              href={whatsappLink(enOf(quote), quoteWa)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Price quote
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
              <StatIcon name={item.k} />
              <dt><Tx text={item.k} /></dt>
              <dd><Tx text={item.v} /></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
