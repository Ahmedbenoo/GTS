import Image from "next/image";
import { Footer, WhatsFloat } from "./Footer";
import { ScrollMotion } from "./ScrollMotion";
import { Navbar } from "./Navbar";
import { whatsappLink } from "@/lib/content";
import type { Topic } from "@/lib/topics";

export function TopicPage({ topic }: { topic: Topic }) {
  return (
    <>
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="page-hero-media">
            <Image
              src={topic.image}
              alt={topic.alt}
              fill
              priority
              sizes="100vw"
              className="cover ken"
            />
            <div className="page-hero-shade" />
          </div>
          <div className="wrap page-hero-copy">
            <p className="kicker">{topic.en}</p>
            <h1>{topic.title}</h1>
            <p className="lead">{topic.lead}</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href={whatsappLink(topic.consult)} target="_blank" rel="noopener noreferrer">
                استشارة مجانية
              </a>
              <a className="btn btn-ghost" href={whatsappLink(topic.quote)} target="_blank" rel="noopener noreferrer">
                عرض سعر
              </a>
            </div>
          </div>
        </section>

        <section className="section section-forest">
          <div className="wrap">
            <header className="sec-head reveal">
              <p className="kicker">{topic.offersKicker}</p>
              <span className="furrow" aria-hidden="true" />
              <h2 className="h2">{topic.offersTitle}</h2>
              <p className="lead">{topic.offersText}</p>
            </header>
            <div className="topic-grid reveal-group">
              {topic.offers.map((item) => (
                <article key={item.num} className="topic-card">
                  <span>{item.num}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-light">
          <div className="wrap topic-split reveal-group">
            <figure className="topic-photo reveal-photo">
              <Image
                src={topic.image}
                alt=""
                fill
                sizes="(max-width: 980px) 100vw, 46vw"
                className="cover"
              />
            </figure>
            <div className="topic-copy">
              <p className="kicker">{topic.storyKicker}</p>
              <h2 className="h2">{topic.storyTitle}</h2>
              {topic.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="topic-points">
                {topic.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section section-dark">
          <div className="wrap">
            <header className="sec-head reveal">
              <p className="kicker">{topic.stepsKicker}</p>
              <span className="furrow" aria-hidden="true" />
              <h2 className="h2">{topic.stepsTitle}</h2>
            </header>
            <ol className="steps reveal-group">
              {topic.steps.map((step) => (
                <li key={step.num} className="step">
                  <span>{step.num}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-forest">
          <div className="wrap topic-cta reveal">
            <p className="kicker">{topic.label}</p>
            <h2 className="h2">{topic.ctaTitle}</h2>
            <p className="lead">{topic.ctaText}</p>
            <div className="hero-actions">
              <a className="btn btn-gold" href={whatsappLink(topic.consult)} target="_blank" rel="noopener noreferrer">
                كلمنا على واتساب
              </a>
              <a className="btn btn-ghost" href="/#contact">
                نموذج التواصل
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsFloat />
      <ScrollMotion />
    </>
  );
}
