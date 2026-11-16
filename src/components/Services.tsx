"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services } from "@/lib/content";
import { enOf } from "@/lib/en-map";
import { Tx } from "./Tx";

function Head({
  kicker,
  title,
  text,
}: {
  kicker: string;
  title: string;
  text?: string;
}) {
  return (
    <header className="sec-head reveal">
      <p className="kicker"><Tx text={kicker} /></p>
      <span className="furrow" aria-hidden="true" />
      <h2 className="h2"><Tx text={title} /></h2>
      {text ? <p className="lead"><Tx text={text} /></p> : null}
    </header>
  );
}

function Chevron({ dir }: { dir: "next" | "prev" }) {
  const points = dir === "next" ? "M14 5 L8 12 L14 19" : "M10 5 L16 12 L10 19";
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={points} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ServiceLightbox({
  index,
  onIndex,
  onClose,
}: {
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onIndexRef = useRef(onIndex);
  const onCloseRef = useRef(onClose);
  const shot = services[index];
  const count = services.length;
  onIndexRef.current = onIndex;
  onCloseRef.current = onClose;

  useEffect(() => {
    dialogRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "ArrowLeft") onIndexRef.current((index + 1) % count);
      if (event.key === "ArrowRight") onIndexRef.current((index - 1 + count) % count);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [count, index]);

  if (!shot) return null;

  return (
    <div className="svc-lightbox" onClick={onClose}>
      <div
        ref={dialogRef}
        className="svc-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={shot.alt}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="svc-close" onClick={onClose}>
          <Tx text="إغلاق" />
        </button>
        <button
          type="button"
          className="svc-nav svc-nav-prev"
          aria-label="الصورة السابقة · Previous photo"
          onClick={() => onIndex((index - 1 + count) % count)}
        >
          <Chevron dir="prev" />
        </button>
        <figure className="svc-frame">
          <span className="svc-shot">
            <Image src={shot.image} alt={shot.alt} fill sizes="90vw" className="svc-contain" />
          </span>
          <figcaption>
            <strong><Tx text={shot.title} /></strong>
            <span>
              <span className="gts-ar">{index + 1} من {count}</span>
              <span className="gts-en">{index + 1} of {count}</span>
            </span>
          </figcaption>
        </figure>
        <button
          type="button"
          className="svc-nav svc-nav-next"
          aria-label="الصورة التالية · Next photo"
          onClick={() => onIndex((index + 1) % count)}
        >
          <Chevron dir="next" />
        </button>
      </div>
    </div>
  );
}

export function Services() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const current = services[active];

  function show(index: number) {
    setOpen(index);
    setActive(index);
  }

  return (
    <section className="section section-light" id="services">
      <div className="wrap">
        <Head
          kicker="الخدمات"
          title="كل ما تحتاجه الأرض في مكان واحد"
          text="من الجهاز نفسه لحد آخر قطعة غيار. GTS بتغطي دورة الري كاملة: توريد، تركيب، تشغيل، وصيانة."
        />
        <div className="services-layout">
          <div className="services-visual reveal reveal-photo">
            <button
              key={current.image + current.num}
              type="button"
              className="services-photo"
              data-fit={current.fit}
              aria-label={`فتح صورة ${current.title} · Open photo ${enOf(current.title)}`}
              onClick={() => setOpen(active)}
            >
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(max-width: 980px) 100vw, 46vw"
                className="cover"
              />
              <span className="services-caption">{current.en}</span>
            </button>
          </div>
          <div className="services-list reveal-group">
            {services.map((service, index) => (
              <button
                key={service.num}
                type="button"
                className="service-item"
                data-on={index === active ? "true" : undefined}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="service-num">{service.num}</span>
                <span>
                  <strong><Tx text={service.title} /></strong>
                  <small><Tx text={service.text} /></small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {open !== null ? <ServiceLightbox index={open} onIndex={show} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}
