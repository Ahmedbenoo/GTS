"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  company,
  marquee,
  photos,
  reasons,
  services,
  steps,
} from "@/lib/content";

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            {item}
            <i className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

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
    <header className="sec-head">
      <p className="kicker">{kicker}</p>
      <h2 className="h2">{title}</h2>
      {text ? <p className="lead">{text}</p> : null}
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
          <div className="services-visual">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.image + current.num}
                className="services-photo"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <Image
                  src={current.image}
                  alt={current.alt}
                  fill
                  sizes="(max-width: 980px) 100vw, 46vw"
                  className="cover"
                />
              </motion.div>
            </AnimatePresence>
            <span className="services-caption">{current.en}</span>
          </div>
          <div className="services-list">
            {services.map((service, index) => (
              <button
                key={service.num}
                type="button"
                className={index === active ? "service-item is-on" : "service-item"}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span className="service-num">{service.num}</span>
                <span>
                  <strong>{service.title}</strong>
                  <small>{service.text}</small>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section className="quote">
      <Image
        src={photos.quote}
        alt=""
        fill
        sizes="100vw"
        className="cover"
      />
      <div className="quote-shade" />
      <blockquote className="wrap">
        <p>
          كل نقطة مياه
          <br />
          تساهم في نجاح مشروعك.
        </p>
        <footer>GTS · مدينة 6 أكتوبر</footer>
      </blockquote>
    </section>
  );
}

export function Why() {
  return (
    <section className="section section-forest" id="why">
      <div className="wrap">
        <Head
          kicker="لماذا GTS"
          title="شريك فني قبل ما يكون مورد"
          text={company.intro}
        />
        <div className="reasons">
          {reasons.map((reason) => (
            <article key={reason.num} className="reason">
              <span>{reason.num}</span>
              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Systems() {
  return (
    <section className="section section-dark" id="systems">
      <div className="wrap">
        <Head
          kicker="الأنظمة"
          title="محوري للمساحات الواسعة. تنقيط ورش للدقة."
          text="النظام بيتختار على الأرض: مصدر المياه، المحصول، والمساحة. الصور هنا تعبيرية لشكل الأنظمة."
        />
        <div className="systems">
          <article className="system-card">
            <div className="system-media">
              <Image
                src={photos.hero}
                alt="ذراع ري محوري فوق حقل أخضر"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="cover"
              />
            </div>
            <div className="system-body">
              <p className="kicker">01</p>
              <h3>الري المحوري</h3>
              <p>
                أجهزة Center Pivot للتغطية الواسعة، مع توريد وتركيب وصيانة، ومتابعة
                الأجزاء اللي بتوقف الجهاز زي الجيربوكس.
              </p>
              <ul>
                <li>توريد وتركيب وتشغيل</li>
                <li>مناسب للمساحات الكبيرة</li>
                <li>صيانة وقطع غيار</li>
              </ul>
            </div>
          </article>
          <article className="system-card">
            <div className="system-media">
              <Image
                src={photos.rows}
                alt="خطوط محصول منتظمة"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="cover"
              />
            </div>
            <div className="system-body">
              <p className="kicker">02</p>
              <h3>التنقيط والرش</h3>
              <p>
                شبكات توصل المياه للنبات بدقة أعلى، مع لوحات تحكم تشغّل الدورة
                بشكل أوتوماتيكي.
              </p>
              <ul>
                <li>ري بالتنقيط</li>
                <li>ري بالرش</li>
                <li>تحكم أوتوماتيكي</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section section-light" id="process">
      <div className="wrap">
        <Head
          kicker="طريقة العمل"
          title="من المعاينة لحد ما الجهاز يشتغل"
        />
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.num} className="step">
              <span>{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
