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
          <h2 className="h2"><Tx text="اختَر المولد حسب حمل الري، مش حسب شكله في الكتالوج" /></h2>
          <p>
            <Tx text="قبل الاختيار، نحسب حمل التشغيل بناءً على نوع نظام الري—تنقيط أو رش—وعدد ساعات التشغيل والقدرة الكهربائية المتاحة في الموقع. بعدها نحدد قدرة المولد المناسبة، مع لوحة التحكم اللازمة لتشغيل النظام." />
          </p>
          <p>
            <Tx text="نوفر مولدات مفتوحة لسهولة الوصول إلى المحرك والصيانة، ومولدات صامتة للمواقع القريبة من المنازل أو المخازن، ومولدات متنقلة لنقلها بين المواقع. ونساعدك في تحديد أنسب مكان للتركيب حسب طبيعة موقعك." />
          </p>
          <ul className="gts-gen-points">
            <li><Tx text="قدرة مناسبة للحمل، لا للتخمين" /></li>
            <li><Tx text="خيارات مفتوحة، صامتة، ومتنقلة" /></li>
            <li><Tx text="لوحة التحكم ضمن التوريد" /></li>
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
