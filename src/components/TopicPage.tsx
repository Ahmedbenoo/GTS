import Image from "next/image";
import { EnergyGallery } from "./EnergyGallery";
import { Footer, WhatsFloat } from "./Footer";
import { MechanizationGallery } from "./MechanizationGallery";
import { PartsShowcase } from "./PartsShowcase";
import { PivotSection } from "./PivotSection";
import { ScrollMotion } from "./ScrollMotion";
import { Navbar } from "./Navbar";
import { quoteWa, whatsappLink } from "@/lib/content";
import { enOf } from "@/lib/en-map";
import { shotSrc } from "@/lib/photo";
import type { Topic } from "@/lib/topics";
import { breadcrumbJsonLd } from "@/lib/site";
import { Tx } from "./Tx";
import "./mech-after.module.css";

export function TopicPage({ topic }: { topic: Topic }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(topic.label, topic.href)) }}
      />
      <Navbar />
      <main>
        <section className="page-hero">
          <div className="page-hero-media">
            {(topic.heroImage ?? topic.image).startsWith("/irrigation-photos/") ? (
              <img
                src={shotSrc(topic.heroImage ?? topic.image, 1920)}
                alt={topic.heroAlt ?? topic.alt}
                fetchPriority="high"
                decoding="async"
                className="cover ken"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectPosition: topic.imagePosition ?? "center",
                }}
              />
            ) : (
              <Image
                src={topic.heroImage ?? topic.image}
                alt={topic.heroAlt ?? topic.alt}
                fill
                priority
                sizes="100vw"
                className="cover ken"
                style={topic.imagePosition ? { objectPosition: topic.imagePosition } : undefined}
              />
            )}
            <div className="page-hero-shade" />
          </div>
          <div className="wrap page-hero-copy">
            <p className="kicker">{topic.en}</p>
            <h1><Tx text={topic.title} /></h1>
            <p className="lead"><Tx text={topic.lead} /></p>
            <div className="hero-actions">
              <a className="btn btn-gold gts-lang-ar" href={whatsappLink(topic.consult)} target="_blank" rel="noopener noreferrer">
                استشارة مجانية
              </a>
              <a className="btn btn-gold gts-lang-en" href={whatsappLink(enOf(topic.consult))} target="_blank" rel="noopener noreferrer">
                Free consultation
              </a>
              <a className="btn btn-ghost gts-lang-ar" href={whatsappLink(topic.quote, quoteWa)} target="_blank" rel="noopener noreferrer">
                عرض سعر
              </a>
              <a className="btn btn-ghost gts-lang-en" href={whatsappLink(enOf(topic.quote), quoteWa)} target="_blank" rel="noopener noreferrer">
                Price quote
              </a>
            </div>
          </div>
        </section>

        <section className="section section-forest">
          <div className="wrap">
            <header className="sec-head reveal">
              <p className="kicker"><Tx text={topic.offersKicker} /></p>
              <span className="furrow" aria-hidden="true" />
              <h2 className="h2"><Tx text={topic.offersTitle} /></h2>
              <p className="lead"><Tx text={topic.offersText} /></p>
            </header>
            {topic.offers.length > 0 ? (
              <div className="topic-grid reveal-group">
                {topic.offers.map((item) => (
                  <article key={item.num} className="topic-card">
                    <span>{item.num}</span>
                    <h3><Tx text={item.title} /></h3>
                    <p><Tx text={item.text} /></p>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        {topic.gallery && topic.gallery.length > 0 && <EnergyGallery shots={topic.gallery} />}

        {topic.href === "/irrigation" && <PivotSection />}

        {topic.parts && topic.parts.length > 0 &&
          (topic.href === "/mechanization" ? (
            <MechanizationGallery
              kicker={topic.partsKicker ?? ""}
              title={topic.partsTitle ?? ""}
              text={topic.partsText ?? ""}
              parts={topic.parts}
            />
          ) : (
            <PartsShowcase
              kicker={topic.partsKicker ?? ""}
              title={topic.partsTitle ?? ""}
              text={topic.partsText ?? ""}
              parts={topic.parts}
            />
          ))}

        {topic.storyImage ? (
          <section className="section gts-band">
            <div className="wrap gts-grid reveal-group">
              <figure className="gts-photo reveal-photo">
                <img src={shotSrc(topic.storyImage, 1400)} alt={topic.storyAlt ?? ""} decoding="async" loading="lazy" />
              </figure>
              <div className="gts-story-copy">
                <p className="kicker"><Tx text={topic.storyKicker} /></p>
                <span className="furrow" aria-hidden="true" />
                <h2 className="h2"><Tx text={topic.storyTitle} /></h2>
                {topic.story.map((paragraph) => (
                  <p key={paragraph}><Tx text={paragraph} /></p>
                ))}
                <ul className="gts-points">
                  {topic.points.map((point) => (
                    <li key={point}><Tx text={point} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ) : (
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
                <p className="kicker"><Tx text={topic.storyKicker} /></p>
                <h2 className="h2"><Tx text={topic.storyTitle} /></h2>
                {topic.story.map((paragraph) => (
                  <p key={paragraph}><Tx text={paragraph} /></p>
                ))}
                <ul className="topic-points">
                  {topic.points.map((point) => (
                    <li key={point}><Tx text={point} /></li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        <section className="section section-dark">
          <div className="wrap">
            <header className="sec-head reveal">
              <p className="kicker"><Tx text={topic.stepsKicker} /></p>
              <span className="furrow" aria-hidden="true" />
              <h2 className="h2"><Tx text={topic.stepsTitle} /></h2>
            </header>
            <ol className="steps reveal-group">
              {topic.steps.map((step) => (
                <li key={step.num} className="step">
                  <span>{step.num}</span>
                  <h3><Tx text={step.title} /></h3>
                  <p><Tx text={step.text} /></p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-forest">
          <div className="wrap topic-cta reveal">
            <p className="kicker"><Tx text={topic.label} /></p>
            <h2 className="h2"><Tx text={topic.ctaTitle} /></h2>
            <p className="lead"><Tx text={topic.ctaText} /></p>
            <div className="hero-actions">
              <a className="btn btn-gold gts-lang-ar" href={whatsappLink(topic.consult)} target="_blank" rel="noopener noreferrer">
                كلمنا على واتساب
              </a>
              <a className="btn btn-gold gts-lang-en" href={whatsappLink(enOf(topic.consult))} target="_blank" rel="noopener noreferrer">
                Message us on WhatsApp
              </a>
              <a className="btn btn-ghost" href="/#contact">
                <Tx text="نموذج التواصل" />
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
