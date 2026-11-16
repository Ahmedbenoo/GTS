"use client";

import { useState } from "react";
import type { TopicShot } from "@/lib/topics";
import { shotSrc } from "@/lib/photo";
import { Tx } from "./Tx";
import "./EnergyGallery.module.css";

export function EnergyGallery({ shots }: { shots: readonly TopicShot[] }) {
  const [active, setActive] = useState(0);
  const shot = shots[active] ?? shots[0];
  if (!shot) return null;

  return (
    <section className="section gts-gen">
      <div className="wrap gts-gen-split">
        <div className="gts-gen-copy">
          <p className="kicker"><Tx text="المولدات" /></p>
          <span className="furrow" aria-hidden="true" />
          <h2 className="h2"><Tx text="المولد يتظبط على حمل الري، مش على شكل الكتالوج" /></h2>
          <p>
            <Tx text="قبل الاختيار بنحسب حمل التشغيل: بيفوت ولا تنقيط ولا رش، وعدد ساعات الشغل، والكهرباء الموجودة في الأرض. المجموعة بتطلع بالمقاس ده، ومعاها لوحة التحكم اللي بتشغّل الدورة." />
          </p>
          <p>
            <Tx text="فيه المفتوح لما المحرك يبقى ظاهر للصيانة، والصامت لما الشغل جنب سكن أو مخزن، والمتنقل اللي يتسحب من موقع لموقع. التركيب في الأرض، ولو وقف، الغيار من نفس العنوان." />
          </p>
          <ul className="gts-gen-points">
            <li><Tx text="المقاس على الحمل، مش على التخمين" /></li>
            <li><Tx text="مفتوح، صامت، ومتنقل" /></li>
            <li><Tx text="لوحة التحكم جزء من التوريد" /></li>
            <li><Tx text="صيانة وقطع غيار في الموقع" /></li>
          </ul>
        </div>
        <div className="gts-gen-stage">
          <figure className="gts-gen-lead">
            <img src={shotSrc(shot.src, 1280)} alt={shot.alt} decoding="async" />
            <figcaption><Tx text={shot.caption ?? shot.alt} /></figcaption>
          </figure>
          <div className="gts-gen-thumbs" role="tablist" aria-label="أشكال المولدات · Generator types">
            {shots.map((item, index) => (
              <button
                key={item.src}
                type="button"
                role="tab"
                aria-selected={index === active}
                className="gts-gen-thumb"
                data-on={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
              >
                <img src={shotSrc(item.src, 320)} alt="" decoding="async" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
