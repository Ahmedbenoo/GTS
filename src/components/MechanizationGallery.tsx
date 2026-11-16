"use client";

import { useEffect, useRef, useState } from "react";
import type { TopicPart, TopicShot } from "@/lib/topics";
import { enOf } from "@/lib/en-map";
import { shotSrc } from "@/lib/photo";
import { Tx } from "./Tx";
import "./MechanizationGallery.module.css";

function photoLabel(label: string) {
  return `فتح صورة ${label} · Open photo ${enOf(label)}`;
}

function PartPhoto({ shot, width }: { shot: TopicShot; width: number }) {
  const src = shotSrc(shot.src, width);
  if (!shot.crop) return <img src={src} alt={shot.alt} decoding="async" />;
  return (
    <span className="gts-cell" style={{ "--col": shot.crop.col, "--row": shot.crop.row } as React.CSSProperties}>
      <img src={src} alt="" decoding="async" />
    </span>
  );
}

function usePerView() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    function measure() {
      const width = window.innerWidth;
      setCount(width >= 900 ? 4 : width >= 640 ? 2 : 1);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return count;
}

function Chevron({ dir }: { dir: "next" | "prev" }) {
  const points = dir === "next" ? "M14 5 L8 12 L14 19" : "M10 5 L16 12 L10 19";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={points} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Lightbox({
  shots,
  index,
  onIndex,
  onClose,
}: {
  shots: readonly TopicShot[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const shot = shots[index];
  const count = shots.length;

  useEffect(() => {
    dialogRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onIndex((index + 1) % count);
      if (event.key === "ArrowRight") onIndex((index - 1 + count) % count);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [count, index, onClose, onIndex]);

  if (!shot) return null;

  return (
    <div className={"gts-lightbox"} onClick={onClose}>
      <div
        ref={dialogRef}
        className="gts-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={shot.caption ?? shot.alt}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="gts-close" onClick={onClose}>
          <Tx text="إغلاق" />
        </button>
        <button
          type="button"
          className="gts-nav gts-nav-prev"
          aria-label="الصورة السابقة · Previous photo"
          onClick={() => onIndex((index - 1 + count) % count)}
        >
          <Chevron dir="prev" />
        </button>
        <figure className="gts-frame">
          {shot.crop ? <PartPhoto shot={shot} width={1800} /> : <img src={shotSrc(shot.src, 1600)} alt={shot.alt} decoding="async" />}
          <figcaption>
            <strong><Tx text={shot.caption ?? shot.alt} /></strong>
            <span>
              <span className="gts-ar">{index + 1} من {count}</span>
              <span className="gts-en">{index + 1} of {count}</span>
            </span>
          </figcaption>
        </figure>
        <button
          type="button"
          className="gts-nav gts-nav-next"
          aria-label="الصورة التالية · Next photo"
          onClick={() => onIndex((index + 1) % count)}
        >
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  );
}

export function PartsOwl({ shots }: { shots: readonly TopicShot[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <PartsSlider shots={shots} onOpen={setOpen} />
      {open !== null && (
        <Lightbox shots={shots} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </>
  );
}

function PartsSlider({
  shots,
  onOpen,
}: {
  shots: readonly TopicShot[];
  onOpen: (index: number) => void;
}) {
  const visible = usePerView();
  const [index, setIndex] = useState(0);
  const drag = useRef(0);
  const max = Math.max(0, shots.length - visible);
  const start = Math.min(index, max);

  function go(delta: number) {
    setIndex((current) => Math.min(max, Math.max(0, current + delta)));
  }

  return (
    <div className="gts-owl">
      <div className="gts-owl-row">
        <button type="button" className="gts-arrow" aria-label="الصورة السابقة · Previous photo" disabled={start === 0} onClick={() => go(-1)}>
          <Chevron dir="prev" />
        </button>
        <div
          className="gts-viewport"
          onPointerDown={(event) => {
            drag.current = event.clientX;
          }}
          onPointerUp={(event) => {
            const delta = event.clientX - drag.current;
            if (delta > 48) go(-1);
            else if (delta < -48) go(1);
          }}
        >
          <div className="gts-track" style={{ transform: `translateX(${start * (100 / visible)}%)` }}>
            {shots.map((shot, itemIndex) => (
              <button
                key={`${shot.src}-${shot.crop?.col ?? 0}-${shot.crop?.row ?? 0}-${itemIndex}`}
                type="button"
                className="gts-card"
                style={{ flexBasis: `${100 / visible}%` }}
                aria-label={photoLabel(shot.caption ?? shot.alt)}
                onClick={() => onOpen(itemIndex)}
              >
                <PartPhoto shot={shot} width={shot.crop ? 1800 : 720} />
                <span><Tx text={shot.caption ?? shot.alt} /></span>
              </button>
            ))}
          </div>
        </div>
        <button type="button" className="gts-arrow" aria-label="الصورة التالية · Next photo" disabled={start === max} onClick={() => go(1)}>
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  );
}

export function MechanizationGallery({ parts }: { kicker: string; title: string; text: string; parts: readonly TopicPart[] }) {
  const tractors = parts[0];
  const spares = parts[1];
  const [album, setAlbum] = useState<{ shots: readonly TopicShot[]; index: number } | null>(null);

  function open(shots: readonly TopicShot[], index: number) {
    setAlbum({ shots, index });
  }

  return (
    <>
      {tractors && (
        <section className="section section-light">
          <div className="wrap gts-split">
            <div className="gts-copy">
              <p className="kicker"><Tx text="المعدات" /></p>
              <span className="furrow" aria-hidden="true" />
              <h2 className="h2"><Tx text={tractors.title} /></h2>
              <p><Tx text={tractors.text} /></p>
              <p>
                <Tx text="من الجرار اللي يخدم الأرض، للحصادة اللي تلم المحصول. التشكيل بمقاسات وقدرات مختلفة، والتوريد والتركيب في الموقع حسب المساحة." />
              </p>
            </div>
            <div className="gts-trio">
              {tractors.images.map((shot, index) => (
                <button
                  key={shot.src}
                  type="button"
                  className={index === 0 ? "gts-shot gts-lead" : "gts-shot"}
                  aria-label={photoLabel(shot.caption ?? shot.alt)}
                  onClick={() => open(tractors.images, index)}
                >
                  <img src={shotSrc(shot.src, 960)} alt="" decoding="async" />
                  <span><Tx text={shot.caption ?? shot.alt} /></span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {spares && (
        <section className="section gts-parts">
          <div className="wrap">
            <header className="gts-parts-head">
              <p className="kicker"><Tx text="قطع الغيار" /></p>
              <span className="furrow" aria-hidden="true" />
              <h2 className="h2"><Tx text={spares.title} /></h2>
              <p><Tx text={spares.text} /></p>
            </header>
            <PartsSlider shots={spares.images} onOpen={(index) => open(spares.images, index)} />
          </div>
        </section>
      )}

      {album && (
        <Lightbox
          shots={album.shots}
          index={album.index}
          onIndex={(index) => setAlbum((current) => (current ? { ...current, index } : current))}
          onClose={() => setAlbum(null)}
        />
      )}
    </>
  );
}
