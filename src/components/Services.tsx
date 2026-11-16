"use client";

import { useState } from "react";
import Image from "next/image";
import { services } from "@/lib/content";
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

export function Services() {
  const [active, setActive] = useState(0);
  const current = services[active];

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
            <div key={current.image + current.num} className="services-photo">
              <Image
                src={current.image}
                alt={current.alt}
                fill
                sizes="(max-width: 980px) 100vw, 46vw"
                className="cover"
              />
            </div>
            <span className="services-caption">{current.en}</span>
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
    </section>
  );
}
