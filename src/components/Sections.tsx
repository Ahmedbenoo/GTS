import Image from "next/image";
import { company, marquee, photos, reasons, steps } from "@/lib/content";
import { Tx } from "./Tx";

export function Marquee() {
  const row = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span className="marquee-item" key={`${item}-${index}`}>
            <Tx text={item} />
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
    <header className="sec-head reveal">
      <p className="kicker"><Tx text={kicker} /></p>
      <span className="furrow" aria-hidden="true" />
      <h2 className="h2"><Tx text={title} /></h2>
      {text ? <p className="lead"><Tx text={text} /></p> : null}
    </header>
  );
}

export function Quote() {
  return (
    <section className="quote">
      <div className="quote-drift" aria-hidden="true">
        <Image
          src={photos.quote}
          alt=""
          fill
          sizes="100vw"
          className="cover"
        />
      </div>
      <div className="quote-shade" />
      <blockquote className="wrap reveal">
        <p>
          <Tx text="كل نقطة مياه" />
          <br />
          <Tx text="تساهم في نجاح مشروعك." />
        </p>
        <footer><Tx text="GTS · مدينة 6 أكتوبر" /></footer>
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
        <div className="reasons reveal-group">
          {reasons.map((reason) => (
            <article key={reason.num} className="reason">
              <span>{reason.num}</span>
              <h3><Tx text={reason.title} /></h3>
              <p><Tx text={reason.text} /></p>
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
        <div className="systems reveal-group">
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
              <h3><Tx text="الري المحوري" /></h3>
              <p>
                <Tx text="أجهزة Center Pivot للتغطية الواسعة، مع توريد وتركيب وصيانة، ومتابعة الأجزاء اللي بتوقف الجهاز زي الجيربوكس." />
              </p>
              <ul>
                <li><Tx text="توريد وتركيب وتشغيل" /></li>
                <li><Tx text="مناسب للمساحات الكبيرة" /></li>
                <li><Tx text="صيانة وقطع غيار" /></li>
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
              <h3><Tx text="التنقيط والرش" /></h3>
              <p>
                <Tx text="شبكات توصل المياه للنبات بدقة أعلى، مع لوحات تحكم تشغّل الدورة بشكل أوتوماتيكي." />
              </p>
              <ul>
                <li><Tx text="ري بالتنقيط" /></li>
                <li><Tx text="ري بالرش" /></li>
                <li><Tx text="تحكم أوتوماتيكي" /></li>
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
        <ol className="steps reveal-group">
          {steps.map((step) => (
            <li key={step.num} className="step">
              <span>{step.num}</span>
              <h3><Tx text={step.title} /></h3>
              <p><Tx text={step.text} /></p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
