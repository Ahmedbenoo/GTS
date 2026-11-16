import type { TopicPart } from "@/lib/topics";
import { shotSrc } from "@/lib/photo";
import { Tx } from "./Tx";
import "./PartsShowcase.module.css";

export function PartsShowcase({
  kicker,
  title,
  text,
  parts,
}: {
  kicker: string;
  title: string;
  text: string;
  parts: readonly TopicPart[];
}) {
  return (
    <section className="section section-dark gts-irr">
      <div className="wrap">
        <header className="sec-head">
          <p className="kicker"><Tx text={kicker} /></p>
          <span className="furrow" aria-hidden="true" />
          <h2 className="h2"><Tx text={title} /></h2>
          <p className="lead"><Tx text={text} /></p>
        </header>
        <div className="gts-irr-list">
          {parts.map((part, index) => (
            <article key={part.title} className="gts-irr-card">
              <div className="gts-irr-photos" data-count={part.images.length}>
                {part.images.map((shot) => (
                  <figure key={shot.src} className="gts-irr-photo">
                    <img src={shotSrc(shot.src, 960)} alt={shot.alt} data-fit={shot.fit ?? "contain"} decoding="async" loading="lazy" />
                  </figure>
                ))}
              </div>
              <div className="gts-irr-copy">
                <span className="gts-irr-num">{String(index + 1).padStart(2, "0")}</span>
                <h3><Tx text={part.title} /></h3>
                <p><Tx text={part.text} /></p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
